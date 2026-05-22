"use client";

import { Button } from "@/components/ui/Button";
import { FieldBox } from "@/components/ui/FieldBox";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/SelectInput";
import { useDistricts } from "@/libs/hook/useDistrict";
import { RegionInterface } from "@/libs/interface/region.interface";
import { citizen_schema } from "@/libs/schema/citizen.schema";
import { AlertTriangle, Building2, Loader2, MapPin, PinIcon, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { IssueCategoryInterface } from "@/libs/interface/issue_category.interface";
import { createIssue } from "@/libs/api/issues.api";
import { capitalizeWords } from "@/utils/function";

export const IssueForm = ({
  regions,
  issue_categories,
  onDone,
}: {
  regions: RegionInterface[];
  issue_categories: IssueCategoryInterface[];
  onDone: () => void;
}) => {
  const [regionId, setRegionId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [challenge, setChallenge] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [severity, setSeverity] = useState<
    "low" | "medium" | "high" | "critical"
  >("medium");
  const [submitting, setSubmitting] = useState(false);
  const { districts, loading: loadingDistricts } = useDistricts(regionId);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const parsed = citizen_schema.safeParse({
      region_id: regionId,
      district_id: districtId,
      category_id: categoryId,
      challenge,
      recommendation,
      severity,
      submission_type: "anonymous",
    });

    if (!parsed.success) {
      toast.error(
        parsed.error.issues[0]?.message ?? "Please complete the form",
      );

      return;
    }

    setSubmitting(true);

    const { error } = await createIssue(parsed.data);

    setSubmitting(false);

    if (error) {
      toast.error(error);
      return;
    }

    setChallenge("");
    setRecommendation("");

    onDone();

    toast.success("Thank you — your voice has been recorded.");
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-(--border) bg-(--card) p-5 sm:p-7 shadow-sm space-y-6"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5 text-(--foreground)">
              Region
            </Label>
            <Select
              value={regionId}
              onValueChange={(value) => {
                setRegionId(value);
                setDistrictId("");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={"Select region"} />
              </SelectTrigger>

              <SelectContent>
                {regions.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {capitalizeWords(item.name)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-1.5 text-(--foreground)">
              District
            </Label>
            <Select
              value={districtId}
              onValueChange={setDistrictId}
              disabled={!regionId || loadingDistricts}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    !regionId
                      ? "Pick region first"
                      : loadingDistricts
                        ? "Loading districts..."
                        : "Select district"
                  }
                />
              </SelectTrigger>

              <SelectContent>
                {districts.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {capitalizeWords(item.name)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-1.5 text-(--foreground)">
              Category
            </Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {issue_categories.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {capitalizeWords(item.name)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-1.5 text-(--foreground)">
              Severity
            </Label>
            <Select
              value={severity}
              onValueChange={(value) =>
                setSeverity(value as "low" | "medium" | "high" | "critical")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Severity" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <FieldBox
          label="Challenge"
          hint="What's the main problem? (max 100 characters)"
          value={challenge}
          onChange={setChallenge}
          placeholder="e.g. Long queues at clinics"
        />

        <FieldBox
          label="Recommendation"
          hint="What should they do? (max 150 characters)"
          value={recommendation}
          onChange={setRecommendation}
          placeholder="e.g. Hire more nurses in rural areas"
        />

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> Submit
            </>
          )}
        </Button>
      </form>
    </>
  );
};
