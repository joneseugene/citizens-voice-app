"use client";

import { useMemo } from "react";
import { InsightIssue } from "@/libs/api/insight.api";
import { InsightSummaryCards } from "./insights/components/summary_cards.insight";
import { CategoryChart } from "./insights/components/category_chart.insight";
import { InsightHeader } from "./insights/components/header.insight";
import { AiInsightCards } from "./insights/components/ai_card.insight";
import { KeywordCloud } from "./insights/components/keyword_cloud.insight";
import { SeverityChart } from "./insights/components/severity_chart";
import { RegionalHotspots } from "./insights/components/regional_hotspot.insight";
import { RecentSubmissions } from "./insights/components/recent_submission.insight";
import { TimelineChart } from "./insights/components/timeline_chart.insight";
import {
  getKeywords,
  groupByCategory,
  groupByRegion,
  groupBySeverity,
  getIssuesOverTime,
  generateAiInsights,
} from "./insights/insight.utils";


export function InsightClient({ issues }: { issues: InsightIssue[] }) {
  const insights = useMemo(() => {
    const byCategory = groupByCategory(issues);
    const byRegion = groupByRegion(issues);
    const bySeverity = groupBySeverity(issues);
    const overTime = getIssuesOverTime(issues);
    const keywords = getKeywords(issues);
    const aiInsights = generateAiInsights({
      byCategory,
      byRegion,
      bySeverity,
    });

    return {
      byCategory,
      byRegion,
      bySeverity,
      overTime,
      keywords,
      aiInsights,
      recent: issues.slice(0, 6),
    };
  }, [issues]);

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-10">
        <InsightHeader />

        <InsightSummaryCards
          total={issues.length}
          byCategory={insights.byCategory}
          byRegion={insights.byRegion}
          bySeverity={insights.bySeverity}
        />

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <CategoryChart data={insights.byCategory} />
          <SeverityChart data={insights.bySeverity} />
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <TimelineChart data={insights.overTime} />
          <RegionalHotspots data={insights.byRegion} />
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <KeywordCloud data={insights.keywords} />
          <AiInsightCards data={insights.aiInsights} />
        </div>

        <RecentSubmissions issues={insights.recent} />
      </main>
    </div>
  );
}
