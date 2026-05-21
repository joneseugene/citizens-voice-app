// components/WordCloud.tsx
"use client";

import { tokenize } from "@/utils/function";
import { useMemo } from "react";

interface WordCloudProps {
  texts: string[];
  palette: "primary" | "accent";
  emptyLabel?: string;
}

export function WordCloud({
  texts,
  palette,
  emptyLabel = "No words yet.",
}: WordCloudProps) {
  const items = useMemo(() => {
    const counts = tokenize(texts);

    const sorted = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 60);

    if (sorted.length === 0) return [];

    const max = sorted[0][1];
    const min = sorted[sorted.length - 1][1];

    return sorted.map(([word, count]) => {
      const ratio =
        max === min ? 0.6 : (count - min) / (max - min);

      return {
        word,
        count,
        size: 0.85 + ratio * 2.1,
        opacity: 0.55 + ratio * 0.45,
      };
    });
  }, [texts]);

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-(--dashed) border-border bg-(--muted/40) p-10 text-center text-sm text-(--muted-foreground)">
        {emptyLabel}
      </div>
    );
  }

  const colorClass =
    palette === "primary" ? "text-(--primary)" : "text-(--accent)";

  return (
    <div className="rounded-xl border border-(--border) bg-card p-6 min-h-45 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 leading-none">
      {items.map((item) => (
        <span
          key={item.word}
          title={`${item.word} — ${item.count}`}
          className={`${colorClass} font-semibold tracking-tight transition-transform hover:scale-110 cursor-default`}
          style={{
            fontSize: `${item.size}rem`,
            opacity: item.opacity,
          }}
        >
          {item.word}
        </span>
      ))}
    </div>
  );
}