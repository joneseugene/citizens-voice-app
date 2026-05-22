import { IssueCategoryInterface } from "../interface/issue_category.interface";
import { baseQuery } from "./base.api";

export const getIssueCategories = async () => {
  return baseQuery<IssueCategoryInterface>({
    table: "issue_categories",
    orderBy: "name",
    ascending: true,
    limit: 100,
  });
};