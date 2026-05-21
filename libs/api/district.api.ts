// api/district.api.ts
import { model } from "@/supabase/model";
import { baseQuery } from "./base.api";
import { DistrictInterface } from "../interface/district.interface";

/**
 * Fetch districts by region ID.
 */
export async function getDistricts(
  regionId?: string,
): Promise<DistrictInterface[]> {
  const result = await baseQuery<DistrictInterface>({
    table: model.districts,
    select: `
      id,
      name,
      region_id
    `,
    filters: {
      region_id: regionId,
    },
    orderBy: "name",
    ascending: true,
    page: 1,
    limit: 20,
  });

  // Plain objects
  return result.data.map((item) => ({
    id: String(item.id),
    name: String(item.name),
    region_id: String(item.region_id),
  }));
}

/**
 * Fetch District by ID.
 */
export async function getDistrictById(
  id: string,
): Promise<DistrictInterface | null> {
  const result = await baseQuery<DistrictInterface>({
    table: model.districts,
    select: `
      id,
      name,
      region_id
    `,
    filters: { id },
    page: 1,
    limit: 1,
  });

  const district = result.data[0];

  if (!district) return null;

  // Plain object
  return {
    id: String(district.id),
    name: String(district.name),
    region_id: String(district.region_id),
  };
}