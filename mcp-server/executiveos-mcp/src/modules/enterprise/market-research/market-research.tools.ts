import { Tool } from '@nitrostack/core';
import { z } from 'zod';
import { MarketResearchResources } from './market-research.resources';
import {
  MarketResearchInput,
  MarketResearchOutput,
  MarketSegment,
} from './market-research.schema';

export class MarketResearchTools {
  constructor(private resources: MarketResearchResources) {}

  @Tool({
    name: 'analyze-market',
    description:
      'Analyzes market size, growth, segments, trends, opportunities and challenges for a given company, industry and country',
    input: z.object({
      company: z.string().describe('Company name to analyze'),
      industry: z.string().describe('Industry or sector'),
      country: z.string().describe('Country or region for market analysis'),
    }),
  })
  async analyzeMarket(input: MarketResearchInput): Promise<MarketResearchOutput> {
    const marketData = await this.resources.fetchMarketData(
      input.company,
      input.industry,
      input.country,
    );

    const marketSize = this.resources.calculateMarketSize(marketData);
    const cagr = this.resources.calculateCAGR(marketData);
    const segments = this.resources.identifySegments(marketData);
    const trends = this.resources.analyzeTrends(marketData);
    const opportunities = this.resources.identifyOpportunities(
      marketData,
      trends,
    );
    const challenges = this.resources.identifyChallenges(marketData, trends);
    const entryBarriers = this.resources.assessEntryBarriers(marketData);
    const recommendation = this.resources.generateRecommendation(
      marketData,
      opportunities,
      challenges,
    );
    const confidence = this.resources.calculateConfidence(marketData);

    return {
      marketSize,
      CAGR: cagr,
      customerSegments: segments.map((s: MarketSegment) => s.name),
      marketTrends: trends,
      opportunities,
      challenges,
      entryBarriers,
      recommendation,
      confidence,
    };
  }
}