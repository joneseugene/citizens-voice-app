export type Severity = "low" | "medium" | "high" | "critical";
export type SubmissionType = "anonymous" | "verified";
export type IssueStatus =
  | "submitted"
  | "confirmed"
  | "trending"
  | "flagged_for_review"
  | "included_in_report";

export interface Region {
  id: string;
  name: string;
}
export interface District {
  id: string;
  region_id: string;
  name: string;
}
export interface IssueCategory {
  id: string;
  name: string;
}
export interface Issue {
  id: string;
  region_id: string;
  district_id: string;
  category_id: string;
  challenge: string;
  recommendation: string;
  severity: Severity;
  submission_type: SubmissionType;
  status: IssueStatus;
  created_at: string;
}

export const regions: Region[] = [
  { id: "r-east", name: "Eastern" },
  { id: "r-north", name: "Northern" },
  { id: "r-nw", name: "North West" },
  { id: "r-south", name: "Southern" },
  { id: "r-west", name: "Western Area" },
];

export const districts: District[] = [
  { id: "d-kenema", region_id: "r-east", name: "Kenema" },
  { id: "d-kono", region_id: "r-east", name: "Kono" },
  { id: "d-kailahun", region_id: "r-east", name: "Kailahun" },
  { id: "d-bombali", region_id: "r-north", name: "Bombali" },
  { id: "d-tonkolili", region_id: "r-north", name: "Tonkolili" },
  { id: "d-falaba", region_id: "r-north", name: "Falaba" },
  { id: "d-koinadugu", region_id: "r-north", name: "Koinadugu" },
  { id: "d-portloko", region_id: "r-nw", name: "Port Loko" },
  { id: "d-kambia", region_id: "r-nw", name: "Kambia" },
  { id: "d-karene", region_id: "r-nw", name: "Karene" },
  { id: "d-bo", region_id: "r-south", name: "Bo" },
  { id: "d-bonthe", region_id: "r-south", name: "Bonthe" },
  { id: "d-moyamba", region_id: "r-south", name: "Moyamba" },
  { id: "d-pujehun", region_id: "r-south", name: "Pujehun" },
  { id: "d-freetown", region_id: "r-west", name: "Freetown" },
  { id: "d-wru", region_id: "r-west", name: "Western Rural" },
];

export const categories: IssueCategory[] = [
  { id: "c-water", name: "Water Supply" },
  { id: "c-health", name: "Health" },
  { id: "c-roads", name: "Roads" },
  { id: "c-edu", name: "Education" },
  { id: "c-elec", name: "Electricity" },
  { id: "c-san", name: "Sanitation" },
  { id: "c-agri", name: "Agriculture" },
  { id: "c-sec", name: "Security" },
  { id: "c-psd", name: "Public Service Delay" },
  { id: "c-gov", name: "Governance" },
];

const daysAgo = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
};

export const seedIssues: Issue[] = [
  {
    id: "i1", region_id: "r-west", district_id: "d-freetown", category_id: "c-water",
    challenge: "Severe water shortage in Kissy for over two weeks. Households queue at private boreholes.",
    recommendation: "Urgent restoration of Guma Valley supply line and emergency tanker distribution.",
    severity: "critical", submission_type: "anonymous", status: "trending", created_at: daysAgo(1),
  },
  {
    id: "i2", region_id: "r-south", district_id: "d-bo", category_id: "c-roads",
    challenge: "Poor road condition on Bo–Kenema highway causing accidents and long delays.",
    recommendation: "Patch potholes and schedule resurfacing before rainy season peak.",
    severity: "high", submission_type: "anonymous", status: "confirmed", created_at: daysAgo(2),
  },
  {
    id: "i3", region_id: "r-east", district_id: "d-kenema", category_id: "c-health",
    challenge: "Long queues at Kenema Government Hospital outpatient clinic; many turned away.",
    recommendation: "Add triage staff and extend morning clinic hours.",
    severity: "high", submission_type: "anonymous", status: "submitted", created_at: daysAgo(3),
  },
  {
    id: "i4", region_id: "r-north", district_id: "d-bombali", category_id: "c-elec",
    challenge: "Electricity outage in Makeni lasting three days, affecting small businesses.",
    recommendation: "Restore transformer at Makeni substation and publish outage schedule.",
    severity: "high", submission_type: "anonymous", status: "trending", created_at: daysAgo(2),
  },
  {
    id: "i5", region_id: "r-east", district_id: "d-kono", category_id: "c-edu",
    challenge: "School furniture shortage in Kono primary schools; pupils sit on floor.",
    recommendation: "Allocate emergency furniture supplies for affected schools this term.",
    severity: "medium", submission_type: "anonymous", status: "confirmed", created_at: daysAgo(5),
  },
  {
    id: "i6", region_id: "r-west", district_id: "d-freetown", category_id: "c-san",
    challenge: "Waste collection problem in central Freetown; piles accumulating at markets.",
    recommendation: "Restart daily collection routes and engage community sanitation teams.",
    severity: "high", submission_type: "anonymous", status: "trending", created_at: daysAgo(1),
  },
  {
    id: "i7", region_id: "r-nw", district_id: "d-portloko", category_id: "c-water",
    challenge: "Boreholes in rural Port Loko running dry during peak hours.",
    recommendation: "Audit borehole capacity and add solar pump backups.",
    severity: "medium", submission_type: "anonymous", status: "submitted", created_at: daysAgo(4),
  },
  {
    id: "i8", region_id: "r-south", district_id: "d-pujehun", category_id: "c-agri",
    challenge: "Delayed fertilizer distribution affecting planting season.",
    recommendation: "Coordinate with extension officers for direct farmer delivery.",
    severity: "medium", submission_type: "anonymous", status: "submitted", created_at: daysAgo(6),
  },
  {
    id: "i9", region_id: "r-north", district_id: "d-tonkolili", category_id: "c-psd",
    challenge: "Long delays at civil registration office for birth certificates.",
    recommendation: "Digitize queue and add mobile clinics in chiefdoms.",
    severity: "low", submission_type: "anonymous", status: "submitted", created_at: daysAgo(7),
  },
  {
    id: "i10", region_id: "r-west", district_id: "d-wru", category_id: "c-sec",
    challenge: "Petty theft increasing in Waterloo evening markets.",
    recommendation: "Increase community policing patrols at peak hours.",
    severity: "medium", submission_type: "anonymous", status: "submitted", created_at: daysAgo(3),
  },
  {
    id: "i11", region_id: "r-east", district_id: "d-kailahun", category_id: "c-health",
    challenge: "Shortage of malaria test kits in rural clinics.",
    recommendation: "Replenish district medical stores and prioritize hard-to-reach posts.",
    severity: "high", submission_type: "anonymous", status: "confirmed", created_at: daysAgo(2),
  },
  {
    id: "i12", region_id: "r-west", district_id: "d-freetown", category_id: "c-roads",
    challenge: "Flooding at Congo Cross junction blocks traffic after light rain.",
    recommendation: "Clear drainage and inspect culverts before rainy season.",
    severity: "high", submission_type: "anonymous", status: "trending", created_at: daysAgo(1),
  },
  {
    id: "i13", region_id: "r-nw", district_id: "d-kambia", category_id: "c-edu",
    challenge: "Teacher absenteeism reported in several Kambia primary schools.",
    recommendation: "Strengthen monitoring and community school management committees.",
    severity: "medium", submission_type: "anonymous", status: "submitted", created_at: daysAgo(8),
  },
  {
    id: "i14", region_id: "r-south", district_id: "d-moyamba", category_id: "c-water",
    challenge: "Contaminated well water in three villages causing stomach illness.",
    recommendation: "Test wells, distribute chlorine tablets, and dig protected boreholes.",
    severity: "critical", submission_type: "anonymous", status: "flagged_for_review", created_at: daysAgo(2),
  },
  {
    id: "i15", region_id: "r-north", district_id: "d-koinadugu", category_id: "c-gov",
    challenge: "Lack of clarity on local council budget allocations.",
    recommendation: "Publish quarterly budget summaries in accessible formats.",
    severity: "low", submission_type: "anonymous", status: "submitted", created_at: daysAgo(9),
  },
];

export const regionName = (id: string) => regions.find((r) => r.id === id)?.name ?? id;
export const districtName = (id: string) => districts.find((d) => d.id === id)?.name ?? id;
export const categoryName = (id: string) => categories.find((c) => c.id === id)?.name ?? id;

export const severityColor: Record<Severity, string> = {
  low: "bg-emerald-100 text-emerald-800 border-emerald-200",
  medium: "bg-amber-100 text-amber-800 border-amber-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  critical: "bg-red-100 text-red-800 border-red-200",
};

export const aiInsights = [
  {
    title: "Water supply trend",
    body: "Water supply complaints increased 38% this week in Western Area.",
    tag: "Emerging hotspot",
  },
  {
    title: "Roads cluster",
    body: "Road-related submissions are trending in Southern Province.",
    tag: "Priority cluster",
  },
  {
    title: "Health severity",
    body: "Health service delays show high severity in three districts.",
    tag: "Citizen trend",
  },
  {
    title: "Sanitation alert",
    body: "Sanitation reports rising in Freetown central wards after recent rainfall.",
    tag: "Reported challenge",
  },
];

// Simple in-memory submissions store
let runtimeIssues: Issue[] = [...seedIssues];
export const getAllIssues = () => runtimeIssues;
export const addIssue = (issue: Omit<Issue, "id" | "created_at" | "status">) => {
  const newIssue: Issue = {
    ...issue,
    id: `i-${Date.now()}`,
    created_at: new Date().toISOString(),
    status: "submitted",
  };
  runtimeIssues = [newIssue, ...runtimeIssues];
  return newIssue;
};
