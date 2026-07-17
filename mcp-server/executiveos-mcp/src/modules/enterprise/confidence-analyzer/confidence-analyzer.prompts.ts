import { PromptDecorator as Prompt } from "@nitrostack/core";

export class ConfidenceAnalyzerPrompts {

  @Prompt({
    name: "confidence_analysis_summary",

    description:
      "Generate an executive confidence assessment for a strategic recommendation."
  })

  async confidenceAnalysisSummary() {

    return `
You are an Executive Confidence Analyzer.

Evaluate the confidence level of a strategic business recommendation.

Consider:
- Market opportunity
- Financial viability
- Competitive landscape
- Business risks
- Legal and regulatory factors

Provide:
- Overall confidence score
- Confidence level
- Key strengths
- Primary concerns
- Executive recommendation

Your analysis should be concise, evidence-driven, and suitable for executive decision-making.
`;

  }

}