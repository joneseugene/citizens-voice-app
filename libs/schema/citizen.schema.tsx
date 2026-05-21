// schemas/citizen-schema.ts
import { z } from "zod";

export const citizen_schema = z.object({
  regionId: z.string().min(1, "Choose a region"),
  districtId: z.string().min(1, "Choose a district"),
  mdaId: z.string().min(1, "Choose an MDA"),
  challenge: z
    .string()
    .trim()
    .min(3, "Add a short challenge")
    .max(100, "Max 100 characters"),
  recommendation: z
    .string()
    .trim()
    .min(3, "Add a short recommendation")
    .max(100, "Max 100 characters"),
});

export type CitizenSchema = z.infer<typeof citizen_schema>;