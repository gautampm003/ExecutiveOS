import { PromptDecorator as Prompt, ExecutionContext } from '@nitrostack/core';

export class SWOTPrompts {

  @Prompt({
    name: 'swot_help',
    description: 'Help for the SWOT Generator tool'
  })

  async getHelp(args: any, ctx: ExecutionContext) {

    ctx.logger.info('SWOT help requested');

    return [
        {
            role: "assistant" as const,
            content:
            "Use the generate_swot tool to evaluate a business decision. The tool accepts a company name, industry, and strategic decision, and returns structured Strengths, Weaknesses, Opportunities, and Threats that executive agents can use for strategic planning."
        }
    ];

  }

}