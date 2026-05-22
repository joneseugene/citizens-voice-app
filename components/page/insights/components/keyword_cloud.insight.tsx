import { KeywordData } from "../insight.types";

export function KeywordCloud({ data }: { data: KeywordData[] }) {
  return (
    <div className="rounded-2xl border bg-(--card) p-5 shadow-sm lg:col-span-2">
      <h3 className="font-semibold">Trending keywords</h3>
      <p className="text-xs text-(--muted-foreground)">
        Words emerging across submissions
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {data.map(([word, count]) => {
          const size = 12 + Math.min(14, count * 2);

          return (
            <span
              key={word}
              className="rounded-full border bg-(--secondary/60) px-3 py-1 capitalize text-(--foreground/80)"
              style={{ fontSize: size }}
            >
              {word}
              <span className="text-(--muted-foreground)"> ·{count}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}