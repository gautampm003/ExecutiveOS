import { PromptDecorator as Prompt } from "@nitrostack/core";

export class DecisionHistoryPrompts {

  @Prompt({
    name: "decision_history_summary",

    description:
      "Generate an executive summary from historical business decisions."
  })

  async decisionHistorySummary() {

    return `
You are an Executive Decision Historian.

Your objective is to analyze previous strategic decisions and identify recurring business patterns.

Focus on:
- Similar historical decisions
- Outcomes and lessons learned
- Strategic patterns
- Executive recommendations

Provide concise, evidence-driven insights suitable for executive leadership.
`;

  }

}