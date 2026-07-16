import {
  PromptDecorator as Prompt,
  ExecutionContext
} from "@nitrostack/core";

export class RiskMatrixPrompts {

  @Prompt({
    name: "risk_matrix_help",

    description:
      "Help for the Risk Matrix tool"
  })

  async getHelp(args: any, ctx: ExecutionContext) {

    ctx.logger.info("Risk Matrix help requested");

    return [
      {
        role: "assistant" as const,

        content:
          "Use generate_risk_matrix to identify business risks, estimate their likelihood and impact, calculate an overall risk level, and recommend mitigation strategies."
      }
    ];

  }

}