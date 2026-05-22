import { AiInsightData } from "../insight.types";

export function AiInsightCards({ data }: { data: AiInsightData[] }) {
  return (
    <div className="rounded-2xl border bg-(--card) p-5 shadow-sm">
      <h3 className="font-semibold">AI trend insights</h3>
      <p className="text-xs text-(--muted-foreground)">Early generated summaries</p>

      <div className="mt-4 space-y-3">
        {data.map((item) => (
          <div key={item.title} className="rounded-lg border bg-(--background) p-3">
            <div className="text-[10px] font-medium uppercase tracking-wider text-(--primary)">
              {item.tag}
            </div>

            <div className="mt-1 text-sm font-medium">{item.title}</div>

            <div className="mt-1 text-xs text-(--muted-foreground)">
              {item.body}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}