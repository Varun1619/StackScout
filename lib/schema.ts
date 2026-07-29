import { z } from "zod";

export const CATEGORIES = [
  "Data Engineering",
  "AI Engineering",
  "Data Science",
] as const;

export const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"] as const;

export const ArchitectureComponentSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
});

export const ArchitectureSchema = z.object({
  overview: z.string().min(1),
  components: z.array(ArchitectureComponentSchema).min(1).max(6),
  flow: z.array(z.string().min(1)).min(4).max(8),
});

export const ExampleProjectSchema = z.object({
  title: z.string().min(1),
  problem: z.string().min(1),
  tool_role: z.string().min(1),
  stack: z.array(z.string().min(1)).min(1),
  outcome: z.string().min(1),
});

export const PaperSchema = z.object({
  title: z.string().min(1),
  note: z.string().min(1),
  url: z.string().url(),
});

export const ProjectSchema = z.object({
  name: z.string().min(1),
  note: z.string().min(1),
  url: z.string().url(),
});

export const ResourceSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
});

export const ToolSchema = z.object({
  name: z.string().min(1),
  category: z.enum(CATEGORIES),
  tagline: z.string().min(1),
  emoji: z.string().min(1),
  what_it_is: z.string().min(1),
  why_it_matters: z.string().min(1),
  difficulty: z.enum(DIFFICULTIES),
  architecture: ArchitectureSchema,
  key_features: z.array(z.string().min(1)).min(3).max(5),
  when_to_use: z.string().min(1),
  example_project: ExampleProjectSchema,
  papers: z.array(PaperSchema).min(2).max(3),
  projects: z.array(ProjectSchema).min(2).max(3),
  companies: z.array(z.string().min(1)).min(4).max(6),
  resources: z.array(ResourceSchema).min(2).max(3),
});

export type ToolPayload = z.infer<typeof ToolSchema>;
