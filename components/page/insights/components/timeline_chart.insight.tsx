"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TimelineData } from "../insight.types";
import { formatDayLabel } from "@/utils/function";


export function TimelineChart({ data }: { data: TimelineData[] }) {
  const formattedData = data.map((item) => ({
    ...item,
    day: formatDayLabel(item.day),
  }));

  return (
    <div className="rounded-2xl border bg-(--card) p-5 shadow-sm lg:col-span-2">
      <h3 className="font-semibold">Submissions over time</h3>

      <p className="text-xs text-(--muted-foreground)">
        Last 10 days
      </p>

      <div className="mt-4 h-56 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
            />

            <XAxis
              dataKey="day"
              tick={{ fontSize: 11 }}
            />

            <YAxis
              tick={{ fontSize: 11 }}
              allowDecimals={false}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="count"
              stroke="var(--chart-2)"
              strokeWidth={2.5}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}