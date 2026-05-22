import { severityColor, type Severity } from "@/utils/tempData";

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${severityColor[severity]}`}
    >
      {severity}
    </span>
  );
}
