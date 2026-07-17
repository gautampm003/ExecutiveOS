import { Module } from '@nitrostack/core';

import { MeetingMinutesTools } from './meeting-minutes.tools.js';
import { MeetingMinutesResources } from './meeting-minutes.resources.js';
import { MeetingMinutesPrompts } from './meeting-minutes.prompts.js';

@Module({
  name: 'meeting-minutes',
  description: 'Meeting Minutes MCP Module',
  controllers: [
    MeetingMinutesTools,
    MeetingMinutesResources,
    MeetingMinutesPrompts
  ]
})
export class MeetingMinutesModule {}