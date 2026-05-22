"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CountData } from "../insight.types";

function getSeverityColor(name: string) {
  if (name === "critical") return "oklch(0.58 0.22 27)";
  if (name === "high") return "oklch(0.65 0.2 50)";
  if (name === "medium") return "oklch(0.75 0.16 85)";
  return "oklch(0.65 0.15 145)";
}

export function SeverityChart({ data }: { data: CountData[] }) {
  return (
    <div className="rounded-2xl border bg-(--card) p-5 shadow-sm">
      <h3 className="font-semibold">Severity breakdown</h3>
      <p className="text-xs text-(--muted-foreground)">Across all submissions</p>

      <div className="w-full mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
            <Tooltip cursor={{ fill: "var(--muted)" }} />

            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {data.map((item) => (
                <Cell key={item.name} fill={getSeverityColor(item.name)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}