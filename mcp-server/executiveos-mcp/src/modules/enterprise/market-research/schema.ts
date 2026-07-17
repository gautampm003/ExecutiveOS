// schema.ts
/**
 * Zod schemas for input validation
 * Ensures all inputs meet requirements before processing
 */

import { z } from "zod";

/**
 * Validates market research input parameters
 * - company: non-empty string, max 255 characters
 * - industry: non-empty string, max 255 characters
 * - country: non-empty string, max 255 characters
 */
export const MarketResearchInputSchema = z.object({
  company: z
    .string()
    .min(1, "Company name is required")
    .max(255, "Company name must be 255 characters or less")
    .trim(),
  industry: z
    .string()
    .min(1, "Industry is required")
    .max(255, "Industry must be 255 characters or less")
    .trim(),
  country: z
    .string()
    .min(1, "Country is required")
    .max(255, "Country must be 255 characters or less")
    .trim(),
});

/**
 * Validates market research output
 * Ensures all required fields are present and properly typed
 */
export const MarketResearchOutputSchema = z.object({
  marketSize: z.string().min(1),
  CAGR: z.string().min(1),
  customerSegments: z.array(z.string()).min(1),
  opportunities: z.array(z.string()).min(1),
  challenges: z.array(z.string()).min(1),
  recommendation: z.string().min(1),
  confidence: z.number().min(0).max(1),
});

/**
 * Type inference from schemas
 */
export type ValidatedMarketResearchInput = z.infer
  typeof MarketResearchInputSchema
>;
export type ValidatedMarketResearchOutput = z.infer
  typeof MarketResearchOutputSchema
>;