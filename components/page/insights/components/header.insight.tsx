import Link from "next/link";

export function InsightHeader() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Public insights</h1>
        <p className="mt-1 text-sm text-(--muted-foreground)">
          Aggregated, anonymous citizen signals across Sierra Leone.
        </p>
      </div>

      <Link
        href="/issue"
        className="rounded-md bg-(--primary) px-4 py-2 text-sm font-medium text-(--primary-foreground) hover:bg-(--primary/90)"
      >
        Add your voice
      </Link>
    </div>
  );
}