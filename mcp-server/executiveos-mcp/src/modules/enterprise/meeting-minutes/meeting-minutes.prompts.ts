import { PromptDecorator as Prompt, ExecutionContext } from '@nitrostack/core';

export class MeetingMinutesPrompts {

  @Prompt({
    name: 'meeting_minutes_help',
    description: 'Help for Meeting Minutes tool'
  })
  async getHelp(args: any, ctx: ExecutionContext) {

    ctx.logger.info('Meeting Minutes help requested');

    return [
      {
        role: 'assistant' as const,
        content: 'Use generate_meeting_minutes to generate executive meeting minutes.'
      }
    ];
  }
}