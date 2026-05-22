"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CountData } from "../insight.types";

export function CategoryChart({ data }: { data: CountData[] }) {
  return (
    <div className="rounded-2xl border bg-(--card) p-5 shadow-sm lg:col-span-2">
      <h3 className="font-semibold">Top reported categories</h3>
      <p className="text-xs text-(--muted-foreground)">
        Total submissions per category
      </p>

      <div className="w-full mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11 }}
              interval={0}
              angle={-25}
              textAnchor="end"
              height={70}
            />
            <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
            <Tooltip cursor={{ fill: "var(--muted)" }} />
            <Bar
              dataKey="count"
              fill="var(--chart-1)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}