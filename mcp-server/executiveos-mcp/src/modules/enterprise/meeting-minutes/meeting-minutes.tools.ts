import { ToolDecorator as Tool, ExecutionContext, z } from '@nitrostack/core';

export class MeetingMinutesTools {

  @Tool({
    name: 'generate_meeting_minutes',
    description: 'Generate executive meeting minutes.',

    inputSchema: z.object({
      meetingTitle: z.string(),
      participants: z.array(z.string()),
      agenda: z.string()
    }),

    examples: {
      request: {
        meetingTitle: 'Indonesia Expansion',
        participants: ['CEO', 'CFO', 'CTO'],
        agenda: 'Discuss expansion strategy'
      },

      response: {
        meetingTitle: 'Indonesia Expansion',
        participants: ['CEO', 'CFO', 'CTO'],
        agenda: 'Discuss expansion strategy',
        summary: 'The executive board discussed expansion opportunities.',
        decisions: [
          'Proceed with feasibility study',
          'Conduct legal review'
        ],
        actionItems: [
          'Finance team to prepare projections',
          'Marketing team to analyse demand'
        ]
      }
    }
  })

  async generateMeetingMinutes(input: any, ctx: ExecutionContext) {

    ctx.logger.info('Generating meeting minutes', input);

    return {
      meetingTitle: input.meetingTitle,
      participants: input.participants,
      agenda: input.agenda,

      summary:
        'The executive board discussed the proposed agenda and agreed on the next course of action.',

      decisions: [
        'Proceed with feasibility study',
        'Conduct legal review'
      ],

      actionItems: [
        'Finance team to prepare projections',
        'Marketing team to analyse demand'
      ]
    };
  }
}