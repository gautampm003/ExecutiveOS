import { z } from 'zod';

export const CompetitorSchema = z.object({
  name: z.string(),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  estimatedMarketShare: z.string(),
  threatLevel: z.enum(['Low', 'Medium', 'High']),
});

export const CompetitorScanInputSchema = z.object({
  company: z.string().describe('Target company to analyze'),
  industry: z.string().describe('Industry or sector'),
  country: z.string().describe('Country or region for competitive analysis'),
});

export const CompetitiveDataSchema = z.object({
  company: z.string(),
  industry: z.string(),
  country: z.string(),
  competitorCount: z.number(),
  marketConcentration: z.number(),
  competitorData: z.array(
    z.object({
      name: z.string(),
      marketShare: z.number(),
      strengths: z.array(z.string()),
      weaknesses: z.array(z.string()),
    }),
  ),
  marketTrends: z.array(z.string()),
  regulatoryEnvironment: z.string(),
  lastUpdated: z.string(),
});

export const CompetitorScanOutputSchema = z.object({
  marketLeader: z.string(),
  competitiveIntensity: z.enum(['Low', 'Medium', 'High']),
  competitors: z.array(CompetitorSchema),
  marketGaps: z.array(z.string()),
  opportunities: z.array(z.string()),
  threats: z.array(z.string()),
  recommendation: z.string(),
  confidence: z.number(),
});

export type Competitor = z.infer<typeof CompetitorSchema>;
export type CompetitorScanInput = z.infer<
  typeof CompetitorScanInputSchema
>;
export type CompetitiveData = z.infer<typeof CompetitiveDataSchema>;
export type CompetitorScanOutput = z.infer<
  typeof CompetitorScanOutputSchema
>;