import { Module } from '@nitrostack/core';
import { MarketResearchTools } from './market-research.tools.js';
import { MarketResearchResources } from './market-research.resources.js';

@Module({
  name: 'market-research',
  description: 'Market research and analysis tool for business intelligence',
  controllers: [MarketResearchTools, MarketResearchResources],
})
export class MarketResearchModule {}