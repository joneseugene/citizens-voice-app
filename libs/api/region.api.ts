// api/region.api.ts
import { model } from "@/supabase/model";
import { baseQuery } from "./base.api";
import { RegionInterface } from "../interface/region.interface";

/**
 * Fetch all regions.
 */
export const getRegions = async () => {
  return baseQuery<RegionInterface>({
    table: model.regions,
    orderBy: "name",
    ascending: true,
    limit: 100,
  });
};
