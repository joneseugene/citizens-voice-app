import { Activity, MapPin, Sparkles, TrendingUp } from "lucide-react";
import { CountData } from "../insight.types";
import { DashboardCard } from "@/components/feature/DashboardCard";

export function InsightSummaryCards({
  total,
  byCategory,
  byRegion,
  bySeverity,
}: {
  total: number;
  byCategory: CountData[];
  byRegion: CountData[];
  bySeverity: CountData[];
}) {
  const criticalCount =
    bySeverity.find((item) => item.name === "critical")?.count ?? 0;

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <DashboardCard
        title="Total submissions"
        value={total}
        hint="Anonymous citizen reports"
        icon={<Activity className="h-4 w-4" />}
      />

      <DashboardCard
        title="Most recent category"
        value={byCategory[0]?.name ?? "—"}
        hint={`${byCategory[0]?.count ?? 0} reports`}
        icon={<TrendingUp className="h-4 w-4" />}
      />

      <DashboardCard
        title="Regions covered"
        value={byRegion.filter((r) => r.count > 0).length}
        hint="with submissions"
        icon={<MapPin className="h-4 w-4" />}
      />

      <DashboardCard
        title="Critical reports"
        value={criticalCount}
        hint="Highest severity"
        icon={<Sparkles className="h-4 w-4" />}
      />
    </div>
  );
}