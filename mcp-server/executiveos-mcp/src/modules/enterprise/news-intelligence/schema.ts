// schema.ts
/**
 * Zod schemas for input/output validation
 * Ensures data integrity across the tool
 */

import { z } from "zod";

/**
 * Input validation schema for news intelligence
 */
export const NewsIntelligenceInputSchema = z.object({
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
  timeframe: z
    .enum(["24h", "7d", "30d"])
    .optional()
    .default("7d"),
  focus: z
    .string()
    .max(500, "Focus must be 500 characters or less")
    .trim()
    .optional(),
});

/**
 * Event category validation
 */
export const EventCategorySchema = z.enum([
  "Business",
  "Technology",
  "Regulation",
  "Politics",
  "Economy",
  "Competition",
]);

/**
 * Sentiment validation
 */
export const SentimentSchema = z.enum(["Positive", "Neutral", "Negative"]);

/**
 * Impact level validation
 */
export const ImpactLevelSchema = z.enum(["Low", "Medium", "High"]);

/**
 * Important event validation schema
 */
export const ImportantEventSchema = z.object({
  title: z.string().min(1, "Event title is required"),
  summary: z.string().min(1, "Event summary is required"),
  category: EventCategorySchema,
  impact: ImpactLevelSchema,
});

/**
 * Output validation schema for news intelligence
 */
export const NewsIntelligenceOutputSchema = z.object({
  executiveSummary: z.string().min(1),
  overallSentiment: SentimentSchema,
  importantEvents: z.array(ImportantEventSchema).min(1),
  opportunities: z.array(z.string().min(1)).min(1),
  risks: z.array(z.string().min(1)).min(1),
  competitorNews: z.array(z.string().min(1)).min(1),
  regulatoryUpdates: z.array(z.string().min(1)).min(1),
  technologyTrends: z.array(z.string().min(1)).min(1),
  recommendedActions: z.array(z.string().min(1)).min(1),
  confidence: z.number().min(0).max(1),
});

/**
 * Type inference from schemas
 */
export type ValidatedNewsIntelligenceInput = z.infer
  typeof NewsIntelligenceInputSchema
>;
export type ValidatedNewsIntelligenceOutput = z.infer
  typeof NewsIntelligenceOutputSchema
>;