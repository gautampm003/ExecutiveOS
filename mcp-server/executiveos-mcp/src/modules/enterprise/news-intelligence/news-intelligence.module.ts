import { Module } from '@nitrostack/core';
import { NewsIntelligenceTools } from './news-intelligence.tools.js';
import { NewsIntelligenceResources } from './news-intelligence.resources.js';
import { NewsIntelligencePrompts } from './news-intelligence.prompts.js';

@Module({
  name: 'news-intelligence',
  description: 'Gather and analyze recent business news with executive-level intelligence',
  controllers: [NewsIntelligenceTools, NewsIntelligenceResources, NewsIntelligencePrompts]
})
export class NewsIntelligenceModule {}