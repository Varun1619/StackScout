"use client";

import { useEffect, useState } from "react";
import { Radar } from "./Radar";

const STATUS_LINES = [
  "Sweeping the market for signals…",
  "Reading the latest papers…",
  "Cross-referencing job postings…",
  "Checking who's shipping with it…",
  "Compiling the deep dive…",
];

export function LoadingState() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % STATUS_LINES.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-24 text-center">
      <Radar size={220} spinning />
      <div className="space-y-2">
        <p className="eyebrow">Scouting today&apos;s tool</p>
        <p
          className="font-mono text-sm text-muted-foreground min-h-[1.5em]"
          aria-live="polite"
        >
          {STATUS_LINES[index]}
        </p>
      </div>
    </div>
  );
}
