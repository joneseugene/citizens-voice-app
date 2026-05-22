import { IssueStatusType } from "../type/issue_status.type";
import { SeverityType } from "../type/severity.type";
import { SubmissionType } from "../type/submission.type";

export interface IssueInterface {
    id?: string;
    region_id: string;
    district_id: string;
    category_id: string;
    challenge: string;
    recommendation?: string;
    severity: SeverityType;
    submission_type: SubmissionType;
    status?: IssueStatusType;
    created_at?: string;
}