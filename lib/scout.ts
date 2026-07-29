import Anthropic from "@anthropic-ai/sdk";
import { ToolSchema, type ToolPayload } from "./schema";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY?.trim(),
});

const SCHEMA_FOR_PROMPT = `{
  "name": "string",
  "category": "Data Engineering | AI Engineering | Data Science",
  "tagline": "one punchy line",
  "emoji": "one emoji",
  "what_it_is": "2 plain sentences",
  "why_it_matters": "2 sentences on why it's in demand right now",
  "difficulty": "Beginner | Intermediate | Advanced",
  "architecture": {
    "overview": "2 sentences on how it's structured / how it works internally",
    "components": [{ "name": "string", "role": "what this piece does" }],
    "flow": ["step 1", "step 2", "step 3"]
  },
  "key_features": ["string"],
  "when_to_use": "1 sentence",
  "example_project": {
    "title": "a concrete, realistic project name",
    "problem": "the problem it solves",
    "tool_role": "exactly how THIS tool is used inside the project",
    "stack": ["other tools alongside it"],
    "outcome": "the result / payoff"
  },
  "papers": [{ "title": "string", "note": "one line", "url": "https://..." }],
  "projects": [{ "name": "string", "note": "one line", "url": "https://..." }],
  "companies": ["string"],
  "resources": [{ "title": "string", "url": "https://..." }]
}`;

function buildPrompt(excludeNames: string[]): string {
  const excludeList =
    excludeNames.length > 0 ? excludeNames.join(", ") : "(none yet)";

  return `You are StackScout, an expert scout of tools & technologies for data professionals.

Pick exactly ONE tool, framework, platform, library, or technology that is heavily used
OR much-needed in TODAY'S job market for Data Engineers, AI Engineers, or Data
Scientists. Favor things trending or in high demand right now. Rotate across the three
roles over time; surprise the reader with something genuinely worth learning.

Do NOT pick any already shown: ${excludeList}.

Use web search to gather CURRENT, REAL info: recent papers/write-ups, active projects,
and companies known to use it. Prefer real URLs from your search. For "architecture",
describe how the tool is actually built and how data/requests move through it. For
"example_project", give a concrete, realistic project and state EXACTLY how this tool is
used inside it.

Respond with ONLY a JSON object wrapped in <json></json> tags, no prose outside. Do your
reasoning silently. Use this schema: ${SCHEMA_FOR_PROMPT}`;
}

function extractJsonBlock(text: string): unknown {
  const match = text.match(/<json>([\s\S]*?)<\/json>/);
  if (!match) {
    throw new Error("No <json> block found in model response");
  }
  return JSON.parse(match[1].trim());
}

// Trim oversized arrays to the schema's limits rather than failing
// validation — the limits are presentation guidance, and a generation
// with one extra feature or company is still perfectly good content.
function clampArrays(data: unknown): unknown {
  if (typeof data !== "object" || data === null) {
    return data;
  }
  const d = data as Record<string, unknown>;
  const slice = (value: unknown, max: number) =>
    Array.isArray(value) ? value.slice(0, max) : value;

  d.key_features = slice(d.key_features, 5);
  d.papers = slice(d.papers, 3);
  d.projects = slice(d.projects, 3);
  d.companies = slice(d.companies, 6);
  d.resources = slice(d.resources, 3);

  const arch = d.architecture;
  if (typeof arch === "object" && arch !== null) {
    const a = arch as Record<string, unknown>;
    a.components = slice(a.components, 6);
    a.flow = slice(a.flow, 8);
  }
  return d;
}

async function callClaude(prompt: string): Promise<string> {
  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: prompt },
  ];
  const baseParams = {
    model: "claude-sonnet-5",
    max_tokens: 8000,
    tools: [
      {
        type: "web_search_20250305" as const,
        name: "web_search" as const,
        max_uses: 4,
      },
    ],
  };

  let response = await anthropic.messages.create({ ...baseParams, messages });
  const texts: string[] = [];

  // The API can pause a long web-search turn (stop_reason "pause_turn").
  // Continue by sending the paused assistant message back unchanged.
  let continuations = 0;
  for (;;) {
    texts.push(
      ...response.content
        .filter((block): block is Anthropic.TextBlock => block.type === "text")
        .map((block) => block.text),
    );
    if (response.stop_reason !== "pause_turn" || continuations >= 3) {
      break;
    }
    messages.push({
      role: "assistant",
      content: response.content as Anthropic.ContentBlockParam[],
    });
    response = await anthropic.messages.create({ ...baseParams, messages });
    continuations++;
  }

  return texts.join("\n");
}

export async function scoutTool(excludeNames: string[]): Promise<ToolPayload> {
  const prompt = buildPrompt(excludeNames);

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const text = await callClaude(prompt);
      const parsed = clampArrays(extractJsonBlock(text));
      const result = ToolSchema.safeParse(parsed);
      if (result.success) {
        return result.data;
      }
      if (attempt === 1) {
        throw new Error(
          `Zod validation failed after retry: ${result.error.message}`,
        );
      }
    } catch (err) {
      if (attempt === 1) {
        throw err instanceof Error
          ? err
          : new Error("Unknown error during scoutTool()");
      }
    }
  }

  throw new Error("scoutTool() failed to produce a valid tool");
}
