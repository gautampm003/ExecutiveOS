import {
  PromptDecorator as Prompt,
  ExecutionContext
} from "@nitrostack/core";

export class FinancialProjectionPrompts {

  @Prompt({
    name: "financial_projection_help",

    description:
      "Help for the Financial Projection tool"
  })

  async getHelp(args: any, ctx: ExecutionContext) {

    ctx.logger.info("Financial projection help requested");

    return [
      {
        role: "assistant" as const,

        content:
          "Use generate_financial_projection to estimate projected revenue, projected profit, ROI and break-even year for a proposed business investment."
      }
    ];

  }

}