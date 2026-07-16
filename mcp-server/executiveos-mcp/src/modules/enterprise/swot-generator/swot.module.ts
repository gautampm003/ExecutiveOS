import { Module } from '@nitrostack/core';
import { SWOTTools } from './swot.tools.js';
import { SWOTResources } from './swot.resources.js';
import { SWOTPrompts } from './swot.prompts.js';

@Module({
    name: 'swot-generator',
    description: 'Generate strategic SWOT analyses for business decisions.',
    controllers: [
        SWOTTools,
        SWOTResources,
        SWOTPrompts
    ]
})
export class SWOTModule {}
