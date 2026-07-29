import { prisma } from "./prisma";
import { scoutTool } from "./scout";
import { todayString } from "./today";
import type { Tool } from "@prisma/client";

export async function getOrGenerateTodaysTool(): Promise<Tool> {
  const featuredDate = todayString();

  const existing = await prisma.tool.findUnique({ where: { featuredDate } });
  if (existing) {
    return existing;
  }

  const existingNames = (
    await prisma.tool.findMany({ select: { name: true } })
  ).map((t) => t.name);

  const payload = await scoutTool(existingNames);

  return prisma.tool.upsert({
    where: { featuredDate },
    create: {
      name: payload.name,
      category: payload.category,
      tagline: payload.tagline,
      emoji: payload.emoji,
      whatItIs: payload.what_it_is,
      whyItMatters: payload.why_it_matters,
      difficulty: payload.difficulty,
      architecture: payload.architecture,
      keyFeatures: payload.key_features,
      whenToUse: payload.when_to_use,
      exampleProject: payload.example_project,
      papers: payload.papers,
      projects: payload.projects,
      companies: payload.companies,
      resources: payload.resources,
      featuredDate,
    },
    update: {},
  });
}
