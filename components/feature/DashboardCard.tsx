import type { ReactNode } from "react";

export function DashboardCard({
  title,
  value,
  hint,
  icon,
}: {
  title: string;
  value: ReactNode;
  hint?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-(--card) p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-(--muted-foreground)">{title}</div>
          <div className="mt-2 text-3xl font-semibold tracking-tight">{value}</div>
          {hint && <div className="mt-1 text-xs text-(--muted-foreground)">{hint}</div>}
        </div>
        {icon && (
          <div className="rounded-lg bg-(--primary/10) p-2 text-(--primary)">{icon}</div>
        )}
      </div>
    </div>
  );
}
