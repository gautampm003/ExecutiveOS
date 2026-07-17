import {
  ToolDecorator as Tool,
  ExecutionContext,
  z
} from "@nitrostack/core";

export class ConfidenceAnalyzerTools {

  @Tool({
    name: "analyze_confidence",

    description:
      "Analyze strategic recommendations and generate an executive confidence score.",

    inputSchema: z.object({
      company: z.string().describe("Company name"),

      recommendation: z.string().describe("Strategic recommendation"),

      marketScore: z.number().min(0).max(100),

      financialScore: z.number().min(0).max(100),

      riskScore: z.number().min(0).max(100),

      competitionScore: z.number().min(0).max(100),

      legalScore: z.number().min(0).max(100)
    }),

    examples: {
      request: {
        company: "VoltX",
        recommendation: "Expand into Indonesia",
        marketScore: 88,
        financialScore: 82,
        riskScore: 70,
        competitionScore: 79,
        legalScore: 84
      },

      response: {
        company: "VoltX",
        confidence: 83,
        level: "High",
        recommendation: "Proceed",
        strengths: [],
        concerns: [],
        reasoning: []
      }
    }
  })

  async analyzeConfidence(
    input: any,
    ctx: ExecutionContext
  ) {

    ctx.logger.info("Analyzing Executive Confidence", input);

    const confidence = Math.round(
      (
        input.marketScore +
        input.financialScore +
        input.competitionScore +
        input.legalScore +
        (100 - input.riskScore)
      ) / 5
    );

    let level = "Low";

    if (confidence >= 85)
      level = "Very High";
    else if (confidence >= 70)
      level = "High";
    else if (confidence >= 55)
      level = "Moderate";

    return {

      company: input.company,

      recommendation: input.recommendation,

      confidence,

      level,

      strengths: [

        "Strong market potential",

        "Healthy financial outlook",

        "Legal environment appears favorable"

      ],

      concerns: [

        "Competitive pressure remains significant",

        "Monitor regulatory and operational risks"

      ],

      reasoning: [

        `Market Score: ${input.marketScore}`,

        `Financial Score: ${input.financialScore}`,

        `Competition Score: ${input.competitionScore}`,

        `Legal Score: ${input.legalScore}`,

        `Risk Score: ${input.riskScore}`

      ]

    };

  }

}