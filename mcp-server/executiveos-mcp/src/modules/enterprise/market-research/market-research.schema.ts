import { z } from 'zod';

export const MarketResearchInputSchema = z.object({
  company: z.string().describe('Company name to analyze'),
  industry: z.string().describe('Industry or sector'),
  country: z.string().describe('Country or region for market analysis'),
});

export const MarketSegmentSchema = z.object({
  name: z.string(),
  percentage: z.number(),
  growthRate: z.number(),
});

export const MarketDataSchema = z.object({
  company: z.string(),
  industry: z.string(),
  country: z.string(),
  marketSizeUSD: z.number(),
  historicalGrowth: z.array(z.number()),
  populationData: z.number(),
  competitorCount: z.number(),
  regulatoryComplexity: z.number(),
  digitalizationLevel: z.number(),
  lastUpdated: z.string(),
});

export const MarketResearchOutputSchema = z.object({
  marketSize: z.string(),
  CAGR: z.string(),
  customerSegments: z.array(z.string()),
  marketTrends: z.array(z.string()),
  opportunities: z.array(z.string()),
  challenges: z.array(z.string()),
  entryBarriers: z.string(),
  recommendation: z.string(),
  confidence: z.number(),
});

export type MarketResearchInput = z.infer<
  typeof MarketResearchInputSchema
>;
export type MarketSegment = z.infer<typeof MarketSegmentSchema>;
export type MarketData = z.infer<typeof MarketDataSchema>;
export type MarketResearchOutput = z.infer<
  typeof MarketResearchOutputSchema
>;