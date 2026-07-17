import { ToolDecorator as Tool, ExecutionContext } from '@nitrostack/core';
import { NewsIntelligenceInputSchema, NewsIntelligenceOutputSchema } from './news-intelligence.schema.js';
import { NewsIntelligenceService } from './news-intelligence.service.js';
import { NewsIntelligenceFormatter } from './news-intelligence.formatter.js';

export class NewsIntelligenceController {
  private service = new NewsIntelligenceService();

  @Tool({
    name: 'analyze_business_news',
    description: 'Gather and analyze recent business news relevant to a company, industry, or country with executive-level intelligence',
    inputSchema: NewsIntelligenceInputSchema,
    examples: {
      request: {
        company: 'Tesla',
        industry: 'Automotive',
        country: 'United States',
        timeframe: '7d'
      },
      response: {
        executiveSummary: 'Tesla faces regulatory scrutiny over safety claims while maintaining strong market position amid EV competition.',
        overallSentiment: 'Neutral',
        importantEvents: [
          {
            title: 'New EV Safety Regulations Proposed',
            summary: 'Federal regulators propose stricter safety standards for autonomous driving features.',
            category: 'Regulatory',
            impact: 'High'
          }
        ],
        opportunities: [
          'Expanding EV tax credits creating market demand'
        ],
        threats: [
          'Increasing domestic manufacturing competition'
        ],
        regulatoryUpdates: [
          'Federal Autonomous Driving Safety Review'
        ],
        competitorNews: [
          'Competitor expansions into mid-range utility vehicle segments'
        ],
        technologyTrends: [
          'Solid-state energy storage maturation'
        ],
        recommendedActions: [
          'Accelerate validation testing timelines for autonomous packages'
        ],
        confidence: 0.85
      }
    }
  })
  async analyzeBusinessNews(input: any, ctx: ExecutionContext) {
    const validatedInput = NewsIntelligenceInputSchema.parse(input);
    const result = await this.service.analyzeNews(validatedInput, ctx);
    
    // Transform complex structure into public flat output required by input schema
    const formattedOutput = {
      executiveSummary: result.executiveSummary,
      overallSentiment: result.overallSentiment,
      importantEvents: result.importantEvents.map(e => ({
        title: e.title,
        summary: e.summary,
        category: e.category,
        impact: e.impact
      })),
      opportunities: result.opportunities.map((o: any) => `${o.title}: ${o.description}`),
      threats: result.threats.map((t: any) => `${t.title}: ${t.description}`),
      regulatoryUpdates: result.regulatoryUpdates.map((r: any) => `${r.title} (${r.jurisdiction})`),
      competitorNews: result.competitorNews.map((c: any) => `${c.competitorName}: ${c.activity}`),
      technologyTrends: result.technologyTrends.map((t: any) => `${t.trendName} - Stage: ${t.adoptionStage}`),
      recommendedActions: result.recommendedActions.map((r: any) => r.action),
      confidence: result.confidence
    };

    return NewsIntelligenceOutputSchema.parse(formattedOutput);
  }
}