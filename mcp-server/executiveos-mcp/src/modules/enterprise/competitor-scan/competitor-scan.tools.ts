import { Tool } from '@nitrostack/core';
import { z } from 'zod';
import { CompetitorScanResources } from './competitor-scan.resources';
import {
  CompetitorScanInput,
  CompetitorScanOutput,
  Competitor,
} from './competitor-scan.schema';

export class CompetitorScanTools {
  constructor(private resources: CompetitorScanResources) {}

  @Tool({
    name: 'scan-competitors',
    description:
      'Analyzes competitive landscape, identifies competitors, market positioning, competitive threats and opportunities for strategic action',
    input: z.object({
      company: z.string().describe('Target company to analyze'),
      industry: z.string().describe('Industry or sector'),
      country: z.string().describe('Country or region for competitive analysis'),
    }),
  })
  async scanCompetitors(
    input: CompetitorScanInput,
  ): Promise<CompetitorScanOutput> {
    const competitiveData = await this.resources.fetchCompetitiveData(
      input.company,
      input.industry,
      input.country,
    );

    const competitors = this.resources.identifyCompetitors(competitiveData);
    const marketLeader = this.resources.identifyMarketLeader(competitors);
    const competitiveIntensity = this.resources.assessCompetitiveIntensity(
      competitors,
    );
    const marketGaps = this.resources.identifyMarketGaps(
      competitiveData,
      competitors,
    );
    const opportunities = this.resources.identifyOpportunities(
      competitors,
      marketGaps,
    );
    const threats = this.resources.identifyThreats(competitors);
    const recommendation = this.resources.generateRecommendation(
      competitors,
      marketLeader,
      competitiveIntensity,
      opportunities,
      threats,
    );
    const confidence = this.resources.calculateConfidence(competitiveData);

    return {
      marketLeader,
      competitiveIntensity,
      competitors,
      marketGaps,
      opportunities,
      threats,
      recommendation,
      confidence,
    };
  }
}