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
  tone?: "primary" | "accent";
}) {
  const remaining = 250 - value.length;
  const dot = tone === "primary" ? "bg-(--primary)" : "bg-(--accent)";
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2 text-(--foreground)">
          {label}
        </Label>
        <span className={`text-xs tabular-nums ${remaining < 0 ? "text-(--destructive)" : "text-(--muted-foreground)"}`}>
          {remaining}
        </span>
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, 250))}
        placeholder={placeholder}
        maxLength={250}
        rows={4}
        className="resize-none"
      />
      <p className="text-xs text-(--muted-foreground)">{hint}</p>
    </div>
  );
}