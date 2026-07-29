"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { LibraryCardData } from "@/lib/types";
import { categoryColor, CATEGORIES_LIST } from "@/lib/categoryStyle";
import { EmptyState } from "./EmptyState";

const FILTERS = ["All", ...CATEGORIES_LIST];

export function LibraryGrid({ tools }: { tools: LibraryCardData[] }) {
  const [filter, setFilter] = useState<string>("All");

  const filtered = useMemo(
    () =>
      filter === "All" ? tools : tools.filter((t) => t.category === filter),
    [tools, filter],
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = f === filter;
          const accent = f === "All" ? "var(--primary)" : categoryColor(f);
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="font-mono text-xs uppercase tracking-wide px-3 py-1.5 rounded-full border transition-colors"
              style={{
                borderColor: active ? accent : "var(--border)",
                color: active ? accent : "var(--muted-foreground)",
                background: active
                  ? "color-mix(in oklch, " + accent + " 14%, transparent)"
                  : "transparent",
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="No tools discovered in this category yet." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tool) => (
            <Link
              key={tool.name}
              href={`/tool/${encodeURIComponent(tool.name)}`}
              className="group rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-[var(--category-accent)] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30"
              style={
                {
                  "--category-accent": categoryColor(tool.category),
                } as React.CSSProperties
              }
            >
              <div className="h-1" style={{ background: "var(--category-accent)" }} />
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{tool.emoji}</span>
                  <span
                    className="font-mono text-[10px] uppercase tracking-wide"
                    style={{ color: "var(--category-accent)" }}
                  >
                    {tool.category}
                  </span>
                </div>
                <p className="font-display font-medium text-foreground group-hover:text-[var(--category-accent)] transition-colors">
                  {tool.name}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {tool.tagline}
                </p>
                <p className="font-mono text-[10px] text-muted-foreground pt-1">
                  {tool.featuredDate}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
