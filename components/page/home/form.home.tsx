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
import { MdaInterface } from "@/libs/interface/mda.interface";
import { RegionInterface } from "@/libs/interface/region.interface";
import { citizen_schema } from "@/libs/schema/citizen.schema";
import { Building2, Loader2, MapPin, PinIcon, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/supabase/client";
import { model } from "@/supabase/model";

export const CitizenForm = ({
  regions,
  mdas,
  onDone,
}: {
  regions: RegionInterface[];
  mdas: MdaInterface[];
  onDone: () => void;
}) => {
  const [regionId, setRegionId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [mdaId, setMdaId] = useState("");
  const [challenge, setChallenge] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { districts, loading: loadingDistricts } = useDistricts(regionId);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = citizen_schema.safeParse({
      regionId,
      districtId,
      mdaId,
      challenge,
      recommendation,
    });
    if (!parsed.success) {
      toast.error(
        parsed.error.issues[0]?.message ?? "Please complete the form",
      );
      return;
    }

    const payload = {
      region_id: regionId,
      district_id: districtId,
      mda_id: mdaId,
      challenge,
      recommendation,
    };

    setSubmitting(true);

    const supabase = createClient();

    const { error } = await supabase.from(model.submissions).insert(payload);
    setSubmitting(false);

    if (error) {
      console.error(error);
      toast.error("Could not submit. Try again.");
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
              <MapPin className="h-4 w-4 text-(--primary)" /> Region
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
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-1.5 text-(--foreground)">
              <PinIcon className="h-4 w-4 text-(--primary)" /> District
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
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-1.5 text-(--foreground)">
            <Building2 className="h-4 w-4 text-(--primary)" /> Ministry /
            Department / Agency
          </Label>
          <Select value={mdaId} onValueChange={setMdaId}>
            <SelectTrigger>
              <SelectValue placeholder="Select MDA" />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              {mdas.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.name} - {m.acronym}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <FieldBox
          label="Challenge"
          hint="What's the main problem? (max 100 characters)"
          value={challenge}
          onChange={setChallenge}
          placeholder="e.g. Long queues at clinics"
          tone="primary"
        />

        <FieldBox
          label="Recommendation"
          hint="What should they do? (max 150 characters)"
          value={recommendation}
          onChange={setRecommendation}
          placeholder="e.g. Hire more nurses in rural areas"
          tone="accent"
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
