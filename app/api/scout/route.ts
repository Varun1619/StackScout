import { NextRequest, NextResponse } from "next/server";
import { getOrGenerateTodaysTool } from "@/lib/getTodaysTool";

export const maxDuration = 300;

async function handleScout(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const expected = `Bearer ${process.env.CRON_SECRET}`;

  if (!process.env.CRON_SECRET || authHeader !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Temporary diagnostic: ?debug=key returns a safe fingerprint of the
  // ANTHROPIC_API_KEY the runtime actually sees (never the key itself).
  if (request.nextUrl.searchParams.get("debug") === "key") {
    const key = process.env.ANTHROPIC_API_KEY ?? "";
    return NextResponse.json({
      present: key.length > 0,
      length: key.length,
      trimmedLength: key.trim().length,
      prefix: key.slice(0, 12),
      suffix: key.trim().slice(-4),
    });
  }

  try {
    const tool = await getOrGenerateTodaysTool();
    return NextResponse.json(tool);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to generate today's tool: ${message}` },
      { status: 502 },
    );
  }
}

// Vercel Cron sends a GET request with the Authorization header auto-populated
// from the CRON_SECRET env var. POST is supported for manual triggers.
export async function GET(request: NextRequest) {
  return handleScout(request);
}

export async function POST(request: NextRequest) {
  return handleScout(request);
}
