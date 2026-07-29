import type { ReactNode } from "react";

export function Chip({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "accent";
}) {
  if (variant === "accent") {
    return (
      <span
        className="font-mono text-xs uppercase tracking-wide px-3 py-1 rounded-full border"
        style={{
          color: "var(--category-accent)",
          borderColor: "var(--category-accent)",
          background:
            "color-mix(in oklch, var(--category-accent) 14%, transparent)",
        }}
      >
        {children}
      </span>
    );
  }

  return (
    <span className="font-mono text-xs px-3 py-1 rounded-full border border-border bg-secondary text-foreground/80">
      {children}
    </span>
  );
}
