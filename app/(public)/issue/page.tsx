import { IssueClient } from "@/components/page/issue.client";
import { getIssueCategories } from "@/libs/api/issue_category.api";
import { getRegions } from "@/libs/api/region.api";

export default async function Page() {
  const regions = await getRegions();
  const categories = await getIssueCategories();


  return (
    <IssueClient regions={regions.data} issue_categories={categories.data} />
  );
}
