import { z } from '@nitrostack/core';

export const CompetitorScanInputSchema = z.object({
  company: z.string().describe('Company name'),
  industry: z.string().describe('Industry sector'),
  country: z.string().describe('Target country')
});

export const CompetitorScanOutputSchema = z.object({
  marketLeader: z.string(),
  competitiveIntensity: z.enum(['Low', 'Medium', 'High']),
  competitors: z.array(
    z.object({
      name: z.string(),
      strengths: z.array(z.string()),
      weaknesses: z.array(z.string()),
      estimatedMarketShare: z.string(),
      threatLevel: z.enum(['Low', 'Medium', 'High'])
    })
  ),
  marketGaps: z.array(z.string()),
  opportunities: z.array(z.string()),
  threats: z.array(z.string()),
  recommendation: z.string(),
  confidence: z.number()
});