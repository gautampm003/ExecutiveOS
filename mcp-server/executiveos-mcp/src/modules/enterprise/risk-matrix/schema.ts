import { z } from "@nitrostack/core";

export const RiskMatrixInputSchema = z.object({

  company: z.string(),

  industry: z.string(),

  market: z.string(),

  decision: z.string()

});

export const RiskMatrixOutputSchema = z.object({

  company: z.string(),

  industry: z.string(),

  market: z.string(),

  decision: z.string(),

  overallRisk: z.string(),

  confidence: z.number(),

  recommendation: z.string(),

  risks: z.array(

    z.object({

      category: z.string(),

      impact: z.string(),

      likelihood: z.string()

    })

  )

});

export type RiskMatrixInput =
  z.infer<typeof RiskMatrixInputSchema>;

export type RiskMatrixOutput =
  z.infer<typeof RiskMatrixOutputSchema>;