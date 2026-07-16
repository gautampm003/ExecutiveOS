import { z } from "@nitrostack/core";

export const FinancialProjectionInputSchema = z.object({

  company: z.string(),

  initialInvestment: z.number(),

  expectedAnnualRevenue: z.number(),

  annualOperatingCost: z.number(),

  years: z.number()

});

export const FinancialProjectionOutputSchema = z.object({

  company: z.string(),

  projectedRevenue: z.number(),

  projectedProfit: z.number(),

  roi: z.number(),

  breakEvenYear: z.number(),

  recommendation: z.string(),

  confidence: z.number()

});

export type FinancialProjectionInput =
  z.infer<typeof FinancialProjectionInputSchema>;

export type FinancialProjectionOutput =
  z.infer<typeof FinancialProjectionOutputSchema>;