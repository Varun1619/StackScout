"use client";

import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Radar } from "@/components/Radar";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
          <Radar size={180} spinning={false} />
          <div className="space-y-2 max-w-md">
            <p className="eyebrow">Signal lost</p>
            <p className="text-foreground/90">
              Today&apos;s tool couldn&apos;t be generated right now.
            </p>
            <p className="font-mono text-xs text-muted-foreground break-words">
              {error.message}
            </p>
          </div>
          <button
            onClick={() => reset()}
            className="font-mono text-xs uppercase tracking-wide px-4 py-2 rounded-full border border-border bg-secondary text-foreground hover:border-[var(--primary)] transition-colors"
          >
            Try again
          </button>
        </div>
      </main>
    </>
  );
}
