import { SeverityBadge } from "@/components/feature/SeverityBadge";
import { InsightIssue } from "@/libs/api/insight.api";

export function RecentSubmissions({
  issues,
}: {
  issues: InsightIssue[];
}) {
  return (
    <div className="mt-5 rounded-2xl border bg-(--card) p-5 shadow-sm">
      <h3 className="font-semibold">Recent anonymous submissions</h3>
      <p className="text-xs text-(--muted-foreground)">
        Most recent citizen-reported challenges
      </p>

      <ul className="mt-4 divide-y">
        {issues.map((issue) => (
          <li key={issue.id} className="py-3">
            <div className="flex flex-wrap items-center gap-2 text-xs text-(--muted-foreground)">
              <span className="font-medium text-(--foreground)">
                {issue.issue_categories?.name ?? "Unknown"}
              </span>

              <span>·</span>

              <span>
                {issue.regions?.name ?? "Unknown"} /{" "}
                {issue.districts?.name ?? "Unknown"}
              </span>

              <SeverityBadge severity={issue.severity} />
            </div>

            <p className="mt-1.5 text-sm">{issue.challenge}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}