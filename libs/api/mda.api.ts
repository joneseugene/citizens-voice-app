// api/region.api.ts
import { model } from "@/supabase/model";
import { baseQuery } from "./base.api";
import { MdaInterface } from "../interface/mda.interface";

/**
 * Fetch all mdas.
 */
export async function getMDAs(): Promise<MdaInterface[]> {
  const result = await baseQuery<MdaInterface>({
    table: model.mdas,
    select: `
        id,
        name,
        acronym
    `,
    orderBy: "name",
    ascending: true,
    page: 1,
    limit: 1000,
  });

  // Convert to plain objects
  return result.data.map((item) => ({
    id: String(item.id),
    name: String(item.name),
    acronym: String(item.acronym)
  }));
}

/**
 * Fetch MDA by ID.
 */
export async function getMDAById(
  id: string,
): Promise<MdaInterface | null> {
  const result = await baseQuery<MdaInterface>({
    table: model.mdas,
    select: `
      id,
      name,
      acronym
    `,
    filters: { id },
    page: 1,
    limit: 1,
  });

  const mda = result.data[0];

  if (!mda) return null;

  // Plain object
  return {
    id: String(mda.id),
    name: String(mda.name),
    acronym: String(mda.acronym)
  };
}