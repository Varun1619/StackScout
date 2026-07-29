import type { ToolDetailData } from "@/lib/types";
import { categoryColor } from "@/lib/categoryStyle";
import { Chip } from "./Chip";

function SectionHeading({ children }: { children: string }) {
  return <h2 className="eyebrow mb-4">{children}</h2>;
}

function LinkRow({
  title,
  note,
  url,
}: {
  title: string;
  note: string;
  url: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg border border-border bg-card p-3 transition-all hover:border-[var(--category-accent)] hover:-translate-y-0.5"
    >
      <p className="font-medium text-sm text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground mt-1">{note}</p>
    </a>
  );
}

export function ToolDetail({ tool }: { tool: ToolDetailData }) {
  const accent = categoryColor(tool.category);

  return (
    <article
      className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xl shadow-black/40"
      style={{ "--category-accent": accent } as React.CSSProperties}
    >
      <div className="h-1" style={{ background: "var(--category-accent)" }} />
      <div className="p-6 sm:p-10 space-y-12">
        {/* Chips row */}
        <div className="flex flex-wrap gap-2">
          <Chip variant="accent">{tool.category}</Chip>
          <Chip>{tool.difficulty}</Chip>
          <Chip>In demand</Chip>
        </div>

        {/* Emoji + name + tagline */}
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="text-5xl sm:text-6xl leading-none">
              {tool.emoji}
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-semibold text-foreground">
              {tool.name}
            </h1>
          </div>
          <p
            className="text-lg sm:text-xl font-display"
            style={{ color: "var(--category-accent)" }}
          >
            {tool.tagline}
          </p>
        </div>

        {/* What it is */}
        <section>
          <SectionHeading>What it is</SectionHeading>
          <p className="text-foreground/90 leading-relaxed">{tool.whatItIs}</p>
        </section>

        {/* Why it matters now */}
        <section>
          <SectionHeading>Why it matters now</SectionHeading>
          <p className="text-foreground/90 leading-relaxed">
            {tool.whyItMatters}
          </p>
        </section>

        {/* Architecture */}
        <section>
          <SectionHeading>How it&apos;s built &amp; how it works</SectionHeading>
          <p className="text-foreground/90 leading-relaxed mb-6">
            {tool.architecture.overview}
          </p>

          <div className="flex flex-wrap items-center gap-2 mb-8">
            {tool.architecture.flow.map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2">
                  <span
                    className="font-mono text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shrink-0"
                    style={{
                      background: "var(--category-accent)",
                      color: "var(--background)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground/90">{step}</span>
                </div>
                {i < tool.architecture.flow.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="font-mono text-muted-foreground"
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {tool.architecture.components.map((component) => (
              <div
                key={component.name}
                className="rounded-lg border border-border bg-secondary p-4"
              >
                <p className="font-display font-medium text-foreground mb-1">
                  {component.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {component.role}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Key features */}
        <section>
          <SectionHeading>Key features</SectionHeading>
          <div className="flex flex-wrap gap-2">
            {tool.keyFeatures.map((feature) => (
              <Chip key={feature}>{feature}</Chip>
            ))}
          </div>
        </section>

        {/* When to use */}
        <section>
          <SectionHeading>When to reach for it</SectionHeading>
          <p className="text-foreground/90 leading-relaxed">
            {tool.whenToUse}
          </p>
        </section>

        {/* Example project */}
        <section>
          <SectionHeading>In the wild — a project using it</SectionHeading>
          <div
            className="rounded-xl border-l-4 bg-secondary p-5 space-y-4"
            style={{ borderColor: "var(--category-accent)" }}
          >
            <p className="font-display text-lg text-foreground">
              {tool.exampleProject.title}
            </p>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="eyebrow mb-1">Problem</p>
                <p className="text-foreground/90">
                  {tool.exampleProject.problem}
                </p>
              </div>
              <div>
                <p className="eyebrow mb-1">{tool.name}&apos;s job</p>
                <p className="text-foreground/90">
                  {tool.exampleProject.tool_role}
                </p>
              </div>
              <div>
                <p className="eyebrow mb-1">Payoff</p>
                <p className="text-foreground/90">
                  {tool.exampleProject.outcome}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {tool.exampleProject.stack.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
          </div>
        </section>

        {/* Papers + Projects */}
        <section className="grid sm:grid-cols-2 gap-8">
          <div>
            <SectionHeading>Papers</SectionHeading>
            <div className="space-y-3">
              {tool.papers.map((paper) => (
                <LinkRow
                  key={paper.url}
                  title={paper.title}
                  note={paper.note}
                  url={paper.url}
                />
              ))}
            </div>
          </div>
          <div>
            <SectionHeading>Projects</SectionHeading>
            <div className="space-y-3">
              {tool.projects.map((project) => (
                <LinkRow
                  key={project.url}
                  title={project.name}
                  note={project.note}
                  url={project.url}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Companies */}
        <section>
          <SectionHeading>Companies</SectionHeading>
          <div className="flex flex-wrap gap-2">
            {tool.companies.map((company) => (
              <Chip key={company} variant="accent">
                {company}
              </Chip>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section>
          <SectionHeading>Start learning</SectionHeading>
          <div className="flex flex-col gap-2">
            {tool.resources.map((resource) => (
              <a
                key={resource.url}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium underline underline-offset-4 w-fit"
                style={{ color: "var(--category-accent)" }}
              >
                {resource.title}
              </a>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
