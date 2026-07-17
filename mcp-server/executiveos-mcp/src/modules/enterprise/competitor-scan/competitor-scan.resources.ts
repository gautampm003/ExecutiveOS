import { Resource } from '@nitrostack/core';
import { CompetitiveData, Competitor } from './competitor-scan.schema';

export class CompetitorScanResources {
  @Resource({
    name: 'competitive-data-cache',
    description: 'Cache for competitive analysis data and competitor profiles',
  })
  private competitiveDataCache: Map<string, CompetitiveData> = new Map();

  async fetchCompetitiveData(
    company: string,
    industry: string,
    country: string,
  ): Promise<CompetitiveData> {
    const cacheKey = `${company}-${industry}-${country}`;

    if (this.competitiveDataCache.has(cacheKey)) {
      return this.competitiveDataCache.get(cacheKey)!;
    }

    const competitiveData = await this.generateCompetitiveData(
      company,
      industry,
      country,
    );
    this.competitiveDataCache.set(cacheKey, competitiveData);

    return competitiveData;
  }

  private async generateCompetitiveData(
    company: string,
    industry: string,
    country: string,
  ): Promise<CompetitiveData> {
    return {
      company,
      industry,
      country,
      competitorCount: this.getCompetitorCount(industry),
      marketConcentration: this.assessMarketConcentration(industry),
      competitorData: this.generateCompetitorProfiles(industry, country),
      marketTrends: this.getMarketTrends(industry),
      regulatoryEnvironment: this.assessRegulatory(country),
      lastUpdated: new Date().toISOString(),
    };
  }

  identifyCompetitors(competitiveData: CompetitiveData): Competitor[] {
    return competitiveData.competitorData.map((comp) => ({
      name: comp.name,
      strengths: this.analyzeStrengths(comp),
      weaknesses: this.analyzeWeaknesses(comp),
      estimatedMarketShare: `${comp.marketShare.toFixed(1)}%`,
      threatLevel: this.assessThreatLevel(comp),
    }));
  }

  identifyMarketLeader(competitors: Competitor[]): string {
    if (competitors.length === 0) return 'Unknown';

    return competitors.reduce((leader, current) => {
      const currentShare = parseFloat(current.estimatedMarketShare);
      const leaderShare = parseFloat(leader.estimatedMarketShare);
      return currentShare > leaderShare ? current : leader;
    }).name;
  }

  assessCompetitiveIntensity(
    competitors: Competitor[],
  ): 'Low' | 'Medium' | 'High' {
    if (competitors.length < 3) return 'Low';
    if (competitors.length < 10) return 'Medium';
    return 'High';
  }

  identifyMarketGaps(
    competitiveData: CompetitiveData,
    competitors: Competitor[],
  ): string[] {
    const gaps: string[] = [];

    const avgStrengths =
      competitors.reduce((sum, c) => sum + c.strengths.length, 0) /
      competitors.length;
    const avgWeaknesses =
      competitors.reduce((sum, c) => sum + c.weaknesses.length, 0) /
      competitors.length;

    if (avgWeaknesses > 3) {
      gaps.push('Poor customer experience and support');
    }

    if (competitiveData.marketConcentration > 60) {
      gaps.push('Limited product variety in mid-market segment');
    }

    if (
      competitiveData.competitorData.every(
        (c) => !c.strengths.includes('Cloud-native architecture'),
      )
    ) {
      gaps.push('Modern cloud-first technology adoption lag');
    }

    if (competitiveData.marketTrends.some((t) => t.includes('AI'))) {
      if (
        competitiveData.competitorData.filter((c) =>
          c.strengths.includes('AI capabilities'),
        ).length < 3
      ) {
        gaps.push('Limited AI-powered solutions in market');
      }
    }

    gaps.push('Cost-effective entry-level solutions');
    gaps.push('Industry-specific customization services');

    return gaps.slice(0, 5);
  }

  identifyOpportunities(
    competitors: Competitor[],
    marketGaps: string[],
  ): string[] {
    const opportunities: string[] = [];

    if (competitors.length > 0) {
      opportunities.push(
        `Target underserved segments neglected by ${competitors[0]?.name || 'market leaders'}`,
      );
    }

    const commonWeakness = this.findCommonWeakness(competitors);
    if (commonWeakness) {
      opportunities.push(`Build superior ${commonWeakness} capabilities`);
    }

    opportunities.push(
      'Develop niche solutions for vertical-specific needs',
    );
    opportunities.push('Leverage emerging technologies for differentiation');
    opportunities.push(
      'Create ecosystem partnerships to expand market reach',
    );

    return opportunities.slice(0, 5);
  }

  identifyThreats(competitors: Competitor[]): string[] {
    const threats: string[] = [];

    const strongCompetitors = competitors.filter(
      (c) => c.threatLevel === 'High',
    );
    if (strongCompetitors.length > 0) {
      threats.push(
        `Intense competition from market leaders: ${strongCompetitors.map((c) => c.name).join(', ')}`,
      );
    }

    const highMarketShare = competitors.find(
      (c) => parseFloat(c.estimatedMarketShare) > 30,
    );
    if (highMarketShare) {
      threats.push(
        `Market concentration risk with ${highMarketShare.name} holding significant share`,
      );
    }

    threats.push('Price competition from established players');
    threats.push(
      'High customer switching costs favoring incumbent solutions',
    );
    threats.push('Limited venture capital funding for new entrants');

    return threats.slice(0, 5);
  }

  generateRecommendation(
    competitors: Competitor[],
    marketLeader: string,
    competitiveIntensity: 'Low' | 'Medium' | 'High',
    opportunities: string[],
    threats: string[],
  ): string {
    if (competitiveIntensity === 'Low') {
      return `STRONG POSITIONING OPPORTUNITY: Low competitive intensity offers favorable entry conditions. Recommend: Focus on market share capture through aggressive marketing and customer acquisition. Leverage first-mover advantage to establish strong brand presence and set market standards.`;
    }

    if (
      competitiveIntensity === 'Medium' &&
      opportunities.length > 3 &&
      threats.length <= 3
    ) {
      return `SELECTIVE ENTRY STRATEGY: Moderate competition with clear differentiation opportunities. Recommend: Identify specific market segments where competitors have weaknesses. Develop deep expertise in vertical-specific solutions. Partner with complementary service providers to enhance value proposition.`;
    }

    if (competitiveIntensity === 'High' && threats.length > 4) {
      return `NICHE FOCUS REQUIRED: Highly competitive landscape with significant barriers. Recommend: Pursue blue ocean strategy by targeting underserved niches. Invest in innovation to create new market categories. Build strong partnerships to overcome competitive disadvantages. Consider acquisition targets for rapid market entry.`;
    }

    return `STRATEGIC DIFFERENTIATION NEEDED: Competitive analysis shows need for unique value proposition. Recommend: Build competitive advantages through technology innovation, customer experience excellence, or cost leadership. Monitor market leaders' strategies closely. Maintain flexibility to pivot based on market dynamics.`;
  }

  calculateConfidence(competitiveData: CompetitiveData): number {
    const factors = [
      0.75, // Base confidence
      Math.min(
        competitiveData.competitorData.length / 20,
        0.15,
      ), // Competitor data completeness
      0.1, // Market intelligence quality
    ];

    const confidence = Math.min(
      0.95,
      factors.reduce((a, b) => a + b, 0),
    );
    return Math.round(confidence * 100) / 100;
  }

  private analyzeStrengths(comp: {
    strengths: string[];
  }): string[] {
    return comp.strengths;
  }

  private analyzeWeaknesses(comp: {
    weaknesses: string[];
  }): string[] {
    return comp.weaknesses;
  }

  private assessThreatLevel(comp: {
    marketShare: number;
    strengths: string[];
  }): 'Low' | 'Medium' | 'High' {
    if (comp.marketShare > 20 && comp.strengths.length > 4) {
      return 'High';
    }
    if (comp.marketShare > 10 || comp.strengths.length > 3) {
      return 'Medium';
    }
    return 'Low';
  }

  private findCommonWeakness(competitors: Competitor[]): string | null {
    if (competitors.length < 2) return null;

    const weaknessCounts = new Map<string, number>();

    competitors.forEach((c) => {
      c.weaknesses.forEach((w) => {
        weaknessCounts.set(w, (weaknessCounts.get(w) || 0) + 1);
      });
    });

    const sortedWeaknesses = Array.from(weaknessCounts.entries()).sort(
      (a, b) => b[1] - a[1],
    );

    return sortedWeaknesses.length > 0 ? sortedWeaknesses[0][0] : null;
  }

  private getCompetitorCount(industry: string): number {
    const countsByIndustry: Record<string, number> = {
      Technology: 45,
      Healthcare: 60,
      Finance: 80,
      Retail: 120,
      Manufacturing: 35,
      Telecommunications: 25,
    };
    return countsByIndustry[industry] || 30;
  }

  private assessMarketConcentration(industry: string): number {
    const concentrationByIndustry: Record<string, number> = {
      Technology: 55,
      Healthcare: 48,
      Finance: 65,
      Retail: 42,
      Manufacturing: 38,
      Telecommunications: 75,
    };
    return concentrationByIndustry[industry] || 50;
  }

  private generateCompetitorProfiles(
    industry: string,
    country: string,
  ): Array<{
    name: string;
    marketShare: number;
    strengths: string[];
    weaknesses: string[];
  }> {
    const profiles: Record<
      string,
      Array<{
        name: string;
        marketShare: number;
        strengths: string[];
        weaknesses: string[];
      }>
    > = {
      Technology: [
        {
          name: 'TechCorp Global',
          marketShare: 28.5,
          strengths: [
            'Brand recognition',
            'R&D investment',
            'Global distribution',
            'Enterprise relationships',
            'AI capabilities',
          ],
          weaknesses: [
            'High pricing',
            'Slow innovation cycles',
            'Legacy system constraints',
          ],
        },
        {
          name: 'InnovateTech Solutions',
          marketShare: 18.2,
          strengths: [
            'Cloud-native architecture',
            'Fast deployment',
            'API-first approach',
            'Developer community',
          ],
          weaknesses: [
            'Limited enterprise support',
            'Small sales force',
            'Unproven long-term stability',
          ],
        },
        {
          name: 'CloudFirst Systems',
          marketShare: 12.8,
          strengths: [
            'Cost-effective solutions',
            'Easy onboarding',
            'Strong support team',
          ],
          weaknesses: [
            'Limited feature depth',
            'Smaller market presence',
            'Limited customization',
          ],
        },
        {
          name: 'EnterpriseTech Inc',
          marketShare: 15.3,
          strengths: [
            'Deep enterprise expertise',
            'Comprehensive suite',
            'Strong security features',
          ],
          weaknesses: [
            'Expensive implementation',
            'Steep learning curve',
            'Poor user experience',
          ],
        },
      ],
      Healthcare: [
        {
          name: 'MedicalCare Global',
          marketShare: 32.1,
          strengths: [
            'Regulatory compliance',
            'Hospital partnerships',
            'Data security',
            'Clinical validation',
          ],
          weaknesses: [
            'Limited digital transformation',
            'Slow product updates',
            'High operational costs',
          ],
        },
        {
          name: 'DigitalHealth Innovations',
          marketShare: 19.5,
          strengths: [
            'Telemedicine capabilities',
            'Mobile-first approach',
            'Patient engagement',
            'AI diagnostics',
          ],
          weaknesses: [
            'Compliance complexity',
            'Limited hospital integration',
            'Data privacy concerns',
          ],
        },
        {
          name: 'HealthTech Solutions',
          marketShare: 14.7,
          strengths: [
            'Cost-effective platforms',
            'Easy implementation',
            'Strong support',
          ],
          weaknesses: [
            'Limited clinical features',
            'Small enterprise customer base',
            'Interoperability issues',
          ],
        },
      ],
      Finance: [
        {
          name: 'FinanceCore International',
          marketShare: 35.2,
          strengths: [
            'Regulatory expertise',
            'Complex transaction handling',
            'Risk management',
            'Compliance automation',
            'Enterprise-grade security',
          ],
          weaknesses: [
            'Legacy architecture',
            'High implementation costs',
            'Difficult customization',
          ],
        },
        {
          name: 'FinTechInnovate',
          marketShare: 20.8,
          strengths: [
            'Modern tech stack',
            'Open APIs',
            'Fast time-to-market',
            'Mobile-first',
          ],
          weaknesses: [
            'Limited regulatory experience',
            'Small customer base',
            'Unproven scalability',
          ],
        },
        {
          name: 'BlockchainFinance',
          marketShare: 8.5,
          strengths: [
            'Decentralized solutions',
            'Smart contracts',
            'Cryptocurrency support',
          ],
          weaknesses: [
            'Regulatory uncertainty',
            'Limited institutional adoption',
            'Market volatility exposure',
          ],
        },
      ],
      Retail: [
        {
          name: 'RetailMegaCorp',
          marketShare: 31.2,
          strengths: [
            'Extensive store network',
            'Inventory scale',
            'Brand loyalty',
            'Supply chain efficiency',
          ],
          weaknesses: [
            'Slow digital transformation',
            'High overhead costs',
            'Limited online presence',
          ],
        },
        {
          name: 'EcommercePro',
          marketShare: 22.5,
          strengths: [
            'Strong online platform',
            'Fast shipping',
            'Customer personalization',
            'Data analytics',
          ],
          weaknesses: [
            'No physical presence',
            'High customer acquisition costs',
            'Logistics complexity',
          ],
        },
        {
          name: 'OmniChannel Retail',
          marketShare: 16.8,
          strengths: [
            'Integrated channels',
            'Customer experience',
            'Flexible fulfillment',
          ],
          weaknesses: [
            'Technology integration challenges',
            'Complex operations',
            'Higher prices',
          ],
        },
      ],
    };

    return profiles[industry] || [
      {
        name: 'Market Leader Corp',
        marketShare: 25,
        strengths: ['Brand', 'Distribution', 'Customer base'],
        weaknesses: ['Slow to innovate'],
      },
      {
        name: 'Growing Challenger',
        marketShare: 15,
        strengths: ['Innovation', 'Technology', 'Agility'],
        weaknesses: ['Limited resources'],
      },
      {
        name: 'Niche Player',
        marketShare: 10,
        strengths: ['Specialization', 'Customer focus'],
        weaknesses: ['Limited scale'],
      },
    ];
  }

  private getMarketTrends(industry: string): string[] {
    const trendsByIndustry: Record<string, string[]> = {
      Technology: [
        'AI and machine learning adoption',
        'Cloud migration acceleration',
        'Cybersecurity investment surge',
        'Edge computing emergence',
        'API economy growth',
      ],
      Healthcare: [
        'Digital health transformation',
        'AI-powered diagnostics',
        'Remote patient monitoring',
        'Data interoperability standards',
        'Precision medicine adoption',
      ],
      Finance: [
        'Open banking and APIs',
        'Decentralized finance',
        'Embedded finance integration',
        'Real-time payment systems',
        'Regulatory technology',
      ],
      Retail: [
        'Omnichannel integration',
        'Personalization at scale',
        'Sustainability initiatives',
        'Direct-to-consumer models',
        'Social commerce expansion',
      ],
    };

    return trendsByIndustry[industry] || [
      'Digital transformation',
      'Market consolidation',
      'Customer experience focus',
    ];
  }

  private assessRegulatory(country: string): string {
    const regulatoryLevel: Record<string, string> = {
      'United States': 'Moderate - SEC and FTC oversight',
      'United Kingdom': 'Strict - FCA and ICO oversight',
      'European Union': 'Very Strict - GDPR and MiFID II',
      India: 'Growing - RBI and SEBI oversight',
      China: 'Highly Regulated - Government control',
      Singapore: 'Moderate - MAS oversight',
      'Hong Kong': 'Strict - SFC oversight',
    };

    return regulatoryLevel[country] || 'Moderate regulatory environment';
  }
}