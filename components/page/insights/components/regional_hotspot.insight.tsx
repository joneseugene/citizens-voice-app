import { CountData } from "../insight.types";

export function RegionalHotspots({ data }: { data: CountData[] }) {
  const maxRegion = Math.max(1, ...data.map((item) => item.count));

  return (
    <div className="rounded-2xl border bg-(--card) p-5 shadow-sm">
      <h3 className="font-semibold">Regional Hotspots</h3>
      <p className="text-xs text-(--muted-foreground)">Reports by region</p>

      <ul className="mt-4 space-y-3">
        {data.map((region) => (
          <li key={region.name}>
            <div className="flex justify-between text-sm">
              <span>{region.name}</span>
              <span className="text-(--muted-foreground)">{region.count}</span>
            </div>

            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-(--secondary)">
              <div
                className="h-full rounded-full bg-(--primary)"
                style={{
                  width: `${(region.count / maxRegion) * 100}%`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}