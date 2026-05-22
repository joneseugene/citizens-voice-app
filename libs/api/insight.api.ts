import { baseQuery } from "@/libs/api/base.api";

export type InsightIssue = {
  id: string;
  region_id: string;
  district_id: string;
  category_id: string;
  challenge: string;
  recommendation: string | null;
  severity: "low" | "medium" | "high" | "critical";
  submission_type: "anonymous" | "verified";
  status:
    | "submitted"
    | "confirmed"
    | "trending"
    | "flagged_for_review"
    | "included_in_report";
  created_at: string;
  regions?: { id: string; name: string } | null;
  districts?: { id: string; name: string } | null;
  issue_categories?: { id: string; name: string } | null;
};

export async function getInsightIssues() {
  return baseQuery<InsightIssue>({
    table: "issues",
    select: `
      id,
      region_id,
      district_id,
      category_id,
      challenge,
      recommendation,
      severity,
      submission_type,
      status,
      created_at,
      regions:region_id (
        id,
        name
      ),
      districts:district_id (
        id,
        name
      ),
      issue_categories:category_id (
        id,
        name
      )
    `,
    orderBy: "created_at",
    ascending: false,
    limit: 500,
    withCount: true,
  });
}