"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/supabase/client";
import { model } from "@/supabase/model";

export function useDistricts(regionId: string) {
  const [districts, setDistricts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!regionId) {
      setDistricts([]);
      return;
    }

    const fetchDistricts = async () => {
      setLoading(true);

      const supabase = createClient();

      const { data, error } = await supabase
        .from(model.districts)
        .select("id, name, region_id")
        .eq("region_id", regionId)
        .order("name");

      if (error) {
        console.error(error);
        setDistricts([]);
      } else {
        setDistricts(data ?? []);
      }

      setLoading(false);
    };

    fetchDistricts();
  }, [regionId]);

  return { districts, loading };
}