import {
  ToolDecorator as Tool,
  ExecutionContext,
  z
} from "@nitrostack/core";

export class FinancialProjectionTools {

  @Tool({
    name: "generate_financial_projection",

    description:
      "Generate a financial projection including ROI, break-even analysis and projected profit.",

    inputSchema: z.object({
      company: z.string().describe("Company name"),

      initialInvestment: z.number().describe("Initial investment amount"),

      expectedAnnualRevenue: z.number().describe("Expected annual revenue"),

      annualOperatingCost: z.number().describe("Expected annual operating cost"),

      years: z.number().min(1).max(20).describe("Projection period in years")
    }),

    examples: {
      request: {
        company: "VoltX",
        initialInvestment: 5000000,
        expectedAnnualRevenue: 8000000,
        annualOperatingCost: 3000000,
        years: 5
      },

      response: {
        company: "VoltX",
        projectedRevenue: 40000000,
        projectedProfit: 25000000,
        roi: 500,
        breakEvenYear: 1,
        recommendation: "Investment appears financially viable.",
        confidence: 90
      }
    }
  })

  async generateFinancialProjection(
    input: any,
    ctx: ExecutionContext
  ) {

    ctx.logger.info("Generating financial projection", input);

    const totalRevenue =
      input.expectedAnnualRevenue * input.years;

    const totalCost =
      input.annualOperatingCost * input.years;

    const projectedProfit =
      totalRevenue - totalCost - input.initialInvestment;

    const roi =
      (projectedProfit / input.initialInvestment) * 100;

    const annualProfit =
      input.expectedAnnualRevenue - input.annualOperatingCost;

    const breakEvenYear =
      annualProfit > 0
        ? Math.ceil(input.initialInvestment / annualProfit)
        : -1;

    return {

      company: input.company,

      projectedRevenue: totalRevenue,

      projectedProfit,

      roi: Number(roi.toFixed(2)),

      breakEvenYear,

      recommendation:
        roi > 20
          ? "Investment appears financially viable."
          : "Review assumptions before proceeding.",

      confidence: 90

    };

  }

}