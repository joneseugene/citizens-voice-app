import { Label } from "./Label";
import { Textarea } from "./TextAreaInput";

export function FieldBox({
  label, hint, value, onChange, placeholder, tone,
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  tone: "primary" | "accent";
}) {
  const remaining = 50 - value.length;
  const dot = tone === "primary" ? "bg-(--primary)" : "bg-(--accent)";
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2 text-(--foreground)">
          <span className={`h-2 w-2 rounded-full ${dot}`} />
          {label}
        </Label>
        <span className={`text-xs tabular-nums ${remaining < 0 ? "text-(--destructive)" : "text-(--muted-foreground)"}`}>
          {remaining}
        </span>
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, 50))}
        placeholder={placeholder}
        maxLength={50}
        rows={2}
        className="resize-none"
      />
      <p className="text-xs text-(--muted-foreground)">{hint}</p>
    </div>
  );
}