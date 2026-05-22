// api/district.api.ts
import { model } from "@/supabase/model";
import { baseQuery } from "./base.api";
import { DistrictInterface } from "../interface/district.interface";

export const getDistricts = async () => {
  return baseQuery<DistrictInterface>({
    table: model.districts,
    select: "id, name, region_id",
    orderBy: "name",
    ascending: true,
    limit: 300,
  });
};

export const getDistrictsByRegion = async (region_id: string) => {
  return baseQuery<DistrictInterface>({
    table: model.districts,
    select: "id, name, region_id",
    filters: {
      region_id,
    },
    orderBy: "name",
    ascending: true,
    limit: 100,
  });
};