import { InsightClient } from "@/components/page/insight.client";
import { getInsightIssues } from "@/libs/api/insight.api";

export default async function InsightsPage() {
  const issuesResponse = await getInsightIssues();

  return (
    <InsightClient
      issues={issuesResponse.data}
    />
  );
}