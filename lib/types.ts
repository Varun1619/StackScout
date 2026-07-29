import type { Tool as PrismaTool } from "@prisma/client";

export interface ArchitectureComponent {
  name: string;
  role: string;
}

export interface ArchitectureData {
  overview: string;
  components: ArchitectureComponent[];
  flow: string[];
}

export interface ExampleProjectData {
  title: string;
  problem: string;
  tool_role: string;
  stack: string[];
  outcome: string;
}

export interface LinkItem {
  title: string;
  note: string;
  url: string;
}

export interface ProjectItem {
  name: string;
  note: string;
  url: string;
}

export interface ResourceItem {
  title: string;
  url: string;
}

export interface ToolDetailData {
  name: string;
  category: string;
  tagline: string;
  emoji: string;
  whatItIs: string;
  whyItMatters: string;
  difficulty: string;
  architecture: ArchitectureData;
  keyFeatures: string[];
  whenToUse: string;
  exampleProject: ExampleProjectData;
  papers: LinkItem[];
  projects: ProjectItem[];
  companies: string[];
  resources: ResourceItem[];
  featuredDate: string;
  discoveredAt: Date | string;
}

export function toToolDetailData(tool: PrismaTool): ToolDetailData {
  return {
    name: tool.name,
    category: tool.category,
    tagline: tool.tagline,
    emoji: tool.emoji,
    whatItIs: tool.whatItIs,
    whyItMatters: tool.whyItMatters,
    difficulty: tool.difficulty,
    architecture: tool.architecture as unknown as ArchitectureData,
    keyFeatures: tool.keyFeatures as unknown as string[],
    whenToUse: tool.whenToUse,
    exampleProject: tool.exampleProject as unknown as ExampleProjectData,
    papers: tool.papers as unknown as LinkItem[],
    projects: tool.projects as unknown as ProjectItem[],
    companies: tool.companies as unknown as string[],
    resources: tool.resources as unknown as ResourceItem[],
    featuredDate: tool.featuredDate,
    discoveredAt: tool.discoveredAt,
  };
}

export interface LibraryCardData {
  name: string;
  category: string;
  tagline: string;
  emoji: string;
  difficulty: string;
  featuredDate: string;
  discoveredAt: string;
}

export function toLibraryCardData(tool: PrismaTool): LibraryCardData {
  return {
    name: tool.name,
    category: tool.category,
    tagline: tool.tagline,
    emoji: tool.emoji,
    difficulty: tool.difficulty,
    featuredDate: tool.featuredDate,
    discoveredAt: tool.discoveredAt.toISOString(),
  };
}
