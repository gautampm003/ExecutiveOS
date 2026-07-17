import { Module } from '@nitrostack/core';

import { BoardReportTools } from './board-report.tools.js';
import { BoardReportResources } from './board-report.resources.js';
import { BoardReportPrompts } from './board-report.prompts.js';

@Module({
    name: 'board-report',

    description: 'Executive board report tools',

    controllers: [
        BoardReportTools,
        BoardReportResources,
        BoardReportPrompts
    ]
})

export class BoardReportModule {}