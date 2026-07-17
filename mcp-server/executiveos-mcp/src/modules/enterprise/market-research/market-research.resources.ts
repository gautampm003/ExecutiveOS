import { Resource } from '@nitrostack/core';
import { MarketData, MarketSegment } from './market-research.schema';

export class MarketResearchResources {
  @Resource({
    name: 'market-data-cache',
    description: 'Cache for market research data and analysis results',
  })
  private marketDataCache: Map<string, MarketData> = new Map();

  async fetchMarketData(
    company: string,
    industry: string,
    country: string,
  ): Promise<MarketData> {
    const cacheKey = `${company}-${industry}-${country}`;

    if (this.marketDataCache.has(cacheKey)) {
      return this.marketDataCache.get(cacheKey)!;
    }

    const marketData = await this.generateMarketData(
      company,
      industry,
      country,
    );
    this.marketDataCache.set(cacheKey, marketData);

    return marketData;
  }

  private async generateMarketData(
    company: string,
    industry: string,
    country: string,
  ): Promise<MarketData> {
    return {
      company,
      industry,
      country,
      marketSizeUSD: this.simulateMarketSize(industry),
      historicalGrowth: [4.5, 5.2, 6.1, 7.3, 8.2],
      populationData: this.simulatePopulation(country),
      competitorCount: this.simulateCompetitors(industry),
      regulatoryComplexity: this.simulateRegulatory(country),
      digitalizationLevel: this.simulateDigitalization(industry),
      lastUpdated: new Date().toISOString(),
    };
  }

  calculateMarketSize(marketData: MarketData): string {
    const sizeUSD = marketData.marketSizeUSD;
    if (sizeUSD >= 1e9) {
      return `$${(sizeUSD / 1e9).toFixed(2)}B`;
    } else if (sizeUSD >= 1e6) {
      return `$${(sizeUSD / 1e6).toFixed(2)}M`;
    }
    return `$${sizeUSD.toFixed(0)}`;
  }

  calculateCAGR(marketData: MarketData): string {
    const growth = marketData.historicalGrowth;
    if (growth.length < 2) return '0%';

    const n = growth.length - 1;
    const initialValue = growth[0];
    const finalValue = growth[growth.length - 1];

    if (initialValue <= 0) return '0%';

    const cagr =
      Math.pow(finalValue / initialValue, 1 / n) - 1;
    return `${(cagr * 100).toFixed(2)}%`;
  }

  identifySegments(marketData: MarketData): MarketSegment[] {
    const segmentsByIndustry: Record<string, MarketSegment[]> = {
      Technology: [
        { name: 'Enterprise', percentage: 45, growthRate: 8.5 },
        { name: 'SMB', percentage: 35, growthRate: 12.3 },
        { name: 'Startups', percentage: 20, growthRate: 25.0 },
      ],
      Healthcare: [
        { name: 'Hospitals', percentage: 50, growthRate: 6.2 },
        { name: 'Clinics', percentage: 30, growthRate: 8.1 },
        { name: 'Telemedicine', percentage: 20, growthRate: 35.0 },
      ],
      Finance: [
        { name: 'Banks', percentage: 55, growthRate: 4.5 },
        { name: 'FinTech', percentage: 30, growthRate: 18.5 },
        { name: 'Blockchain', percentage: 15, growthRate: 42.0 },
      ],
      Retail: [
        { name: 'Traditional', percentage: 60, growthRate: -2.5 },
        { name: 'E-commerce', percentage: 35, growthRate: 22.0 },
        { name: 'Social Commerce', percentage: 5, growthRate: 65.0 },
      ],
    };

    return (
      segmentsByIndustry[marketData.industry] || [
        { name: 'Primary', percentage: 60, growthRate: 8.0 },
        { name: 'Secondary', percentage: 40, growthRate: 5.0 },
      ]
    );
  }

  analyzeTrends(marketData: MarketData): string[] {
    const trendsByIndustry: Record<string, string[]> = {
      Technology: [
        'AI and machine learning adoption accelerating',
        'Cloud infrastructure consolidation',
        'Edge computing gaining traction',
        'Cybersecurity spending increasing',
      ],
      Healthcare: [
        'Digital health transformation',
        'AI-powered diagnostics',
        'Remote patient monitoring expansion',
        'Data interoperability standards adoption',
      ],
      Finance: [
        'Open banking and APIs',
        'Decentralized finance (DeFi) growth',
        'Embedded finance integration',
        'Real-time payment systems',
      ],
      Retail: [
        'Omnichannel commerce integration',
        'Personalization at scale',
        'Sustainable retail practices',
        'Direct-to-consumer models',
      ],
    };

    return (
      trendsByIndustry[marketData.industry] || [
        'Digital transformation',
        'Market consolidation',
        'Sustainability focus',
        'Customer experience enhancement',
      ]
    );
  }

  identifyOpportunities(
    marketData: MarketData,
    trends: string[],
  ): string[] {
    const baseOpportunities = [
      `Market expanding at ${this.getGrowthRate(marketData).toFixed(1)}% annually`,
      `${marketData.competitorCount} existing competitors indicate market viability`,
      `Regulatory environment scoring ${marketData.regulatoryComplexity}/10 complexity`,
      `Digitalization at ${marketData.digitalizationLevel}% adoption level`,
    ];

    const trendBasedOps = trends.slice(0, 2).map((trend) => `Capitalize on: ${trend}`);

    return [...baseOpportunities, ...trendBasedOps];
  }

  identifyChallenges(
    marketData: MarketData,
    trends: string[],
  ): string[] {
    const baseChallenges = [
      `High competitive intensity with ${marketData.competitorCount} major players`,
      `Regulatory requirements complexity score: ${marketData.regulatoryComplexity}/10`,
      `Market maturity level: ${this.assessMaturity(marketData)}`,
      `Customer acquisition costs trending upward`,
    ];

    const trendChallenges = trends
      .slice(2, 4)
      .map((trend) => `Adapt to: ${trend}`);

    return [...baseChallenges, ...trendChallenges];
  }

  assessEntryBarriers(marketData: MarketData): string {
    const barrier =
      (marketData.regulatoryComplexity +
        marketData.competitorCount / 10 +
        (10 - marketData.digitalizationLevel)) /
      3;

    if (barrier > 7) return 'Very High';
    if (barrier > 5) return 'High';
    if (barrier > 3) return 'Moderate';
    return 'Low';
  }

  generateRecommendation(
    marketData: MarketData,
    opportunities: string[],
    challenges: string[],
  ): string {
    const growthRate = this.getGrowthRate(marketData);
    const barrier = this.assessEntryBarriers(marketData);

    if (growthRate > 10 && barrier === 'Low') {
      return 'STRONG ENTRY: High growth market with low barriers. Recommend immediate market entry with competitive differentiation strategy.';
    } else if (growthRate > 5 && barrier === 'Moderate') {
      return 'FAVORABLE: Moderate growth with manageable entry barriers. Recommend phased market entry with partnership strategy.';
    } else if (growthRate > 0 && barrier === 'High') {
      return 'CAUTIOUS: Positive growth but significant entry barriers. Recommend pilot program before full commitment.';
    }
    return 'HOLD: Market conditions do not currently favor entry. Monitor for future opportunities.';
  }

  calculateConfidence(marketData: MarketData): number {
    const factors = [
      0.8, // Base confidence
      Math.min(marketData.digitalizationLevel / 100, 0.2), // Data availability
      Math.min(0.1, marketData.competitorCount / 100), // Competitor clarity
      0.2, // Trend visibility
    ];

    const confidence = Math.min(
      0.95,
      factors.reduce((a, b) => a + b, 0),
    );
    return Math.round(confidence * 100) / 100;
  }

  private simulateMarketSize(industry: string): number {
    const sizesByIndustry: Record<string, number> = {
      Technology: 5e9,
      Healthcare: 8e9,
      Finance: 12e9,
      Retail: 15e9,
    };
    return sizesByIndustry[industry] || 3e9;
  }

  private simulatePopulation(country: string): number {
    const populations: Record<string, number> = {
      'United States': 330e6,
      'United Kingdom': 67e6,
      'Germany': 83e6,
      'India': 1.4e9,
      'China': 1.4e9,
    };
    return populations[country] || 50e6;
  }

  private simulateCompetitors(industry: string): number {
    const competitorsByIndustry: Record<string, number> = {
      Technology: 150,
      Healthcare: 200,
      Finance: 300,
      Retail: 500,
    };
    return competitorsByIndustry[industry] || 100;
  }

  private simulateRegulatory(country: string): number {
    const regulatoryByCountry: Record<string, number> = {
      'United States': 7,
      'United Kingdom': 8,
      'Germany': 9,
      'India': 6,
      'China': 8,
    };
    return regulatoryByCountry[country] || 5;
  }

  private simulateDigitalization(industry: string): number {
    const digitalizationByIndustry: Record<string, number> = {
      Technology: 95,
      Finance: 85,
      Healthcare: 70,
      Retail: 75,
    };
    return digitalizationByIndustry[industry] || 60;
  }

  private getGrowthRate(marketData: MarketData): number {
    const growth = marketData.historicalGrowth;
    return growth.length > 0
      ? growth[growth.length - 1] - growth[0]
      : 0;
  }

  private assessMaturity(marketData: MarketData): string {
    const avgGrowth =
      marketData.historicalGrowth.reduce((a, b) => a + b, 0) /
      marketData.historicalGrowth.length;

    if (avgGrowth > 15) return 'Early Stage';
    if (avgGrowth > 8) return 'Growth Phase';
    if (avgGrowth > 3) return 'Mature';
    return 'Decline';
  }
}