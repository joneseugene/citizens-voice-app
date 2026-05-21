// api/region.api.ts
import { model } from "@/supabase/model";
import { baseQuery } from "./base.api";
import { RegionInterface } from "../interface/region.interface";

/**
 * Fetch all regions.
 */
export async function getRegions(): Promise<RegionInterface[]> {
    const result = await baseQuery<RegionInterface>({
        table: model.regions,
        select: `
        id,
        name
        `,
        orderBy: "name",
        ascending: true,
        page: 1,
        limit: 10,
    });

    // Plain objects
    return result.data.map((item) => ({
        id: String(item.id),
        name: String(item.name),
    }));
}

/**
 * Fetch Region by ID.
 */
export async function getRegionById(
  id: string,
): Promise<RegionInterface | null> {
  const result = await baseQuery<RegionInterface>({
    table: model.regions,
    select: `
      id,
      name
    `,
    filters: { id },
    page: 1,
    limit: 1,
  });

  const region = result.data[0];

  if (!region) return null;

  // Plain object
  return {
    id: String(region.id),
    name: String(region.name),
  };
}