import { InsightIssue } from "@/libs/api/insight.api";
import { stopwords } from "@/utils/stop_words";

export function groupByCategory(issues: InsightIssue[]) {
  const map = new Map<string, { name: string; count: number }>();

  for (const issue of issues) {
    const name = issue.issue_categories?.name ?? "Unknown";
    map.set(name, { name, count: (map.get(name)?.count ?? 0) + 1 });
  }

  return [...map.values()].sort((a, b) => b.count - a.count);
}

export function groupByRegion(issues: InsightIssue[]) {
  const map = new Map<string, { name: string; count: number }>();

  for (const issue of issues) {
    const name = issue.regions?.name ?? "Unknown";
    map.set(name, { name, count: (map.get(name)?.count ?? 0) + 1 });
  }

  return [...map.values()].sort((a, b) => b.count - a.count);
}

export function groupBySeverity(issues: InsightIssue[]) {
  const severities = ["low", "medium", "high", "critical"] as const;

  return severities.map((severity) => ({
    name: severity,
    count: issues.filter((issue) => issue.severity === severity).length,
  }));
}

export function getIssuesOverTime(issues: InsightIssue[], days = 10) {
  const series: { day: string; count: number }[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const label = `${date.getMonth() + 1}/${date.getDate()}`;

    const count = issues.filter((issue) => {
      const issueDate = new Date(issue.created_at);

      return (
        issueDate.getFullYear() === date.getFullYear() &&
        issueDate.getMonth() === date.getMonth() &&
        issueDate.getDate() === date.getDate()
      );
    }).length;

    series.push({ day: label, count });
  }

  return series;
}

export function getKeywords(issues: InsightIssue[]) {
  const map = new Map<string, number>();

  const locationSuffixes = new Set([
    "street",
    "road",
    "lane",
    "drive",
    "close",
    "junction",
    "highway",
    "avenue",
    "crescent",
    "court",
    "market",
    "bridge",
  ]);

  for (const issue of issues) {
    const text = `${issue.challenge} ${issue.recommendation ?? ""}`;

    const words =
      text
        .toLowerCase()
        .match(/[a-z]+/g) ?? [];

    const usedIndexes = new Set<number>();

    for (let i = 0; i < words.length; i++) {
      // Skip words already merged
      if (usedIndexes.has(i)) continue;

      let word = words[i];

      // Merge with previous word if current is a suffix
      if (
        i > 0 &&
        locationSuffixes.has(word)
      ) {
        const combined = `${words[i - 1]} ${word}`;

        // Remove previous standalone word
        map.delete(words[i - 1]);

        word = combined;

        // Mark previous word as used
        usedIndexes.add(i - 1);
      }

      if (
        word.length >= 4 &&
        !stopwords.has(word)
      ) {
        map.set(word, (map.get(word) ?? 0) + 1);
      }
    }
  }

  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 24);
}

export function generateAiInsights({
  byCategory,
  byRegion,
  bySeverity,
}: {
  byCategory: { name: string; count: number }[];
  byRegion: { name: string; count: number }[];
  bySeverity: { name: string; count: number }[];
}) {
  const insights: { title: string; body: string; tag: string }[] = [];

  const topCategory = byCategory[0];
  const topRegion = byRegion[0];
  const criticalCount =
    bySeverity.find((item) => item.name === "critical")?.count ?? 0;

  if (topCategory?.count) {
    insights.push({
      title: `${topCategory.name} trend`,
      body: `${topCategory.name} is currently the most reported category with ${topCategory.count} submissions.`,
      tag: "Citizen trend",
    });
  }

  if (topRegion?.count) {
    insights.push({
      title: `${topRegion.name} hotspot`,
      body: `${topRegion.name} has the highest number of citizen submissions at the moment.`,
      tag: "Emerging hotspot",
    });
  }

  if (criticalCount > 0) {
    insights.push({
      title: "Critical severity alert",
      body: `${criticalCount} critical report${criticalCount > 1 ? "s" : ""} should be reviewed as priority signals.`,
      tag: "Priority cluster",
    });
  }

  return insights.length
    ? insights
    : [
        {
          title: "No strong trend yet",
          body: "More citizen submissions are needed before reliable public trends can be detected.",
          tag: "Early signal",
        },
      ];
}
