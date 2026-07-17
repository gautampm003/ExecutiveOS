import { PromptDecorator as Prompt, ExecutionContext } from '@nitrostack/core';

export class CompetitorScanPrompts {

  @Prompt({
    name: 'competitor_scan_help',
    description: 'Help for Competitor Scan tool'
  })
  async getHelp(args: any, ctx: ExecutionContext) {

    ctx.logger.info('Competitor Scan help requested');

    return [
      {
        role: 'assistant' as const,
        content: 'Use scan_competitors to analyze competitors, identify market gaps, opportunities, threats, and generate strategic recommendations.'
      }
    ];
  }

}