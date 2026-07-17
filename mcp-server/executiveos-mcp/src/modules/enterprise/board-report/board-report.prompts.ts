import { PromptDecorator as Prompt, ExecutionContext } from '@nitrostack/core';

export class BoardReportPrompts {
  @Prompt({
    name: 'board_report_help',
    description: 'Help for the Board Report tool'
  })
  async getHelp(args: any, ctx: ExecutionContext) {
    ctx.logger.info('Board report help requested');

    return [
      {
        role: 'assistant' as const,
        content: 'Use the generate_board_report tool to create an executive board report.'
      }
    ];
  }
}