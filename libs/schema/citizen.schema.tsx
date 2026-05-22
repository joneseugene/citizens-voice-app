// schemas/citizen-schema.ts
import { z } from "zod";

export const citizen_schema = z.object({
  region_id: z.string().uuid({
    message: "Please select a region",
  }),

  district_id: z.string().uuid({
    message: "Please select a district",
  }),

  category_id: z.string().uuid({
    message: "Please select a category",
  }),

  challenge: z
    .string()
    .trim()
    .min(10, "Challenge must be at least 10 characters")
    .max(1000, "Challenge must not exceed 1000 characters"),

  recommendation: z
    .string()
    .trim()
    .max(1000, "Recommendation must not exceed 1000 characters")
    .optional()
    .or(z.literal("")),

  severity: z.enum(["low", "medium", "high", "critical"], {
    message: "Please select severity",
  }),

  submission_type: z.enum(["anonymous", "verified"]).default("anonymous"),
});

export type CitizenFormData = z.infer<typeof citizen_schema>;