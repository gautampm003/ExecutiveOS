import {
    NewsIntelligenceResult,
    SentimentLevel,
    ImpactLevel,
    EventCategory
  } from './news-intelligence.types.js';
  
  /**
   * Formatter for News Intelligence output
   * Handles formatting of analysis results for different presentation contexts
   */
  export class NewsIntelligenceFormatter {
    /**
     * Format result for executive board presentation
     */
    static formatForBoard(result: NewsIntelligenceResult): string {
      const lines: string[] = [
        `EXECUTIVE INTELLIGENCE BRIEFING`,
        `================================`,
        ``,
        `Company: ${result.company}`,
        `Industry: ${result.industry}`,
        `Country: ${result.country}`,
        `Period: ${result.timeframe}`,
        `Date: ${result.analysisTimestamp.toLocaleDateString()}`,
        `Confidence: ${(result.confidence * 100).toFixed(0)}%`,
        ``,
        `MARKET SENTIMENT: ${this.formatSentiment(result.overallSentiment)}`,
        ``,
        result.executiveSummary,
        ``
      ];
  
      if (result.importantEvents.length > 0) {
        lines.push(`CRITICAL EVENTS (Top 3)`);
        lines.push(`----------------------`);
        result.importantEvents.slice(0, 3).forEach((event) => {
          lines.push(
            `• [${this.formatImpact(event.impact)}] ${event.title} (${event.category})`
          );
          lines.push(`  ${event.summary}`);
          lines.push(``);
        });
      }
  
      if (result.opportunities.length > 0) {
        lines.push(`STRATEGIC OPPORTUNITIES`);
        lines.push(`-----------------------`);
        result.opportunities.slice(0, 5).forEach((opp, idx) => {
          lines.push(`${idx + 1}. ${opp.title}`);
          lines.push(`   ${opp.description}`);
          lines.push(``);
        });
      }
  
      if (result.threats.length > 0) {
        lines.push(`KEY RISKS & THREATS`);
        lines.push(`-------------------`);
        result.threats.slice(0, 5).forEach((threat, idx) => {
          lines.push(
            `${idx + 1}. ${threat.title} (${this.formatImpact(threat.potentialImpact)})`
          );
          lines.push(`   ${threat.description}`);
          lines.push(``);
        });
      }
  
      if (result.recommendedActions.length > 0) {
        lines.push(`RECOMMENDED STRATEGIC ACTIONS`);
        lines.push(`-----------------------------`);
        result.recommendedActions.slice(0, 8).forEach((rec, idx) => {
          lines.push(`${idx + 1}. [${rec.priority}] ${rec.action}`);
          lines.push(`   Timeframe: ${rec.timeframe}`);
          lines.push(``);
        });
      }
  
      return lines.join('\n');
    }
  
    /**
     * Format result as JSON for API responses
     */
    static formatAsJSON(result: NewsIntelligenceResult): string {
      const output = {
        metadata: {
          company: result.company,
          industry: result.industry,
          country: result.country,
          timeframe: result.timeframe,
          analysisDate: result.analysisTimestamp.toISOString(),
          confidence: result.confidence
        },
        intelligence: {
          executiveSummary: result.executiveSummary,
          overallSentiment: result.overallSentiment,
          importantEventsCount: result.importantEvents.length,
          opportunitiesCount: result.opportunities.length,
          threatsCount: result.threats.length,
          regulatoryUpdatesCount: result.regulatoryUpdates.length,
          competitorNewsCount: result.competitorNews.length,
          technologyTrendsCount: result.technologyTrends.length,
          recommendedActionsCount: result.recommendedActions.length
        },
        details: {
          importantEvents: result.importantEvents.map((e) => ({
            title: e.title,
            summary: e.summary,
            category: e.category,
            impact: e.impact
          })),
          opportunities: result.opportunities.map((o) => ({
            title: o.title,
            description: o.description,
            timeframe: o.timeframe
          })),
          threats: result.threats.map((t) => ({
            title: t.title,
            description: t.description,
            category: t.category,
            likelihood: t.likelihood,
            potentialImpact: t.potentialImpact
          })),
          regulatoryUpdates: result.regulatoryUpdates.map((r) => ({
            title: r.title,
            jurisdiction: r.jurisdiction,
            applicability: r.applicability
          })),
          competitorNews: result.competitorNews.map((c) => ({
            competitor: c.competitorName,
            activity: c.activity,
            activityType: c.activityType
          })),
          technologyTrends: result.technologyTrends.map((t) => ({
            name: t.trendName,
            adoptionStage: t.adoptionStage,
            relevance: t.relevance
          })),
          recommendedActions: result.recommendedActions.map((r) => ({
            action: r.action,
            priority: r.priority,
            timeframe: r.timeframe
          }))
        }
      };
  
      return JSON.stringify(output, null, 2);
    }
  
    /**
     * Format as Markdown for documentation or reports
     */
    static formatAsMarkdown(result: NewsIntelligenceResult): string {
      const lines: string[] = [
        `# News Intelligence Analysis`,
        ``,
        `**Date**: ${result.analysisTimestamp.toLocaleDateString()}  `,
        `**Company**: ${result.company}  `,
        `**Industry**: ${result.industry}  `,
        `**Country**: ${result.country}  `,
        `**Period**: ${result.timeframe}  `,
        `**Confidence**: ${(result.confidence * 100).toFixed(0)}%  `,
        ``,
        `## Market Sentiment`,
        ``,
        `**${this.formatSentimentDetailed(result.overallSentiment)}**`,
        ``,
        result.executiveSummary,
        ``,
        `## Important Events`,
        ``
      ];
  
      if (result.importantEvents.length > 0) {
        result.importantEvents.forEach((event) => {
          lines.push(
            `### ${event.title} | ${this.formatImpact(event.impact)} Impact`
          );
          lines.push(``);
          lines.push(`**Category**: ${event.category}  `);
          lines.push(`**Summary**: ${event.summary}`);
          lines.push(``);
        });
      } else {
        lines.push(`No significant events identified in this period.`);
        lines.push(``);
      }
  
      lines.push(`## Strategic Opportunities`);
      lines.push(``);
      if (result.opportunities.length > 0) {
        result.opportunities.forEach((opp, idx) => {
          lines.push(`### ${idx + 1}. ${opp.title}`);
          lines.push(``);
          lines.push(opp.description);
          lines.push(``);
          lines.push(
            `- **Timeframe**: ${opp.timeframe}  `
          );
          lines.push(`- **Investment**: ${opp.investmentRequired}`);
          lines.push(``);
        });
      } else {
        lines.push(`No opportunities identified in this period.`);
        lines.push(``);
      }
  
      lines.push(`## Risk Assessment`);
      lines.push(``);
      if (result.threats.length > 0) {
        result.threats.forEach((threat, idx) => {
          lines.push(`### ${idx + 1}. ${threat.title}`);
          lines.push(``);
          lines.push(`**Category**: ${threat.category}  `);
          lines.push(`**Likelihood**: ${threat.likelihood}  `);
          lines.push(`**Potential Impact**: ${this.formatImpact(threat.potentialImpact)}  `);
          lines.push(``);
          lines.push(`${threat.description}`);
          lines.push(``);
          lines.push(`**Mitigation Strategy**: ${threat.mitigationStrategy}`);
          lines.push(``);
        });
      } else {
        lines.push(`No significant threats identified in this period.`);
        lines.push(``);
      }
  
      lines.push(`## Regulatory Updates`);
      lines.push(``);
      if (result.regulatoryUpdates.length > 0) {
        result.regulatoryUpdates.forEach((reg) => {
          lines.push(`- **${reg.title}** (${reg.jurisdiction})`);
          lines.push(`  Applicability: ${reg.applicability}`);
        });
      } else {
        lines.push(`No significant regulatory updates in this period.`);
      }
      lines.push(``);
  
      lines.push(`## Competitive Landscape`);
      lines.push(``);
      if (result.competitorNews.length > 0) {
        result.competitorNews.forEach((comp) => {
          lines.push(
            `- **${comp.competitorName}**: ${comp.activity} (${comp.activityType})`
          );
        });
      } else {
        lines.push(`No significant competitor activity in this period.`);
      }
      lines.push(``);
  
      lines.push(`## Technology Trends`);
      lines.push(``);
      if (result.technologyTrends.length > 0) {
        result.technologyTrends.forEach((trend) => {
          lines.push(
            `- **${trend.trendName}** (${trend.adoptionStage}) - Relevance: ${trend.relevance}`
          );
        });
      } else {
        lines.push(`No emerging technology trends identified in this period.`);
      }
      lines.push(``);
  
      lines.push(`## Recommended Actions`);
      lines.push(``);
      if (result.recommendedActions.length > 0) {
        result.recommendedActions.forEach((rec, idx) => {
          lines.push(
            `### ${idx + 1}. ${rec.action} [${rec.priority}]`
          );
          lines.push(``);
          lines.push(`**Rationale**: ${rec.rationale}`);
          lines.push(`**Timeframe**: ${rec.timeframe}`);
          if (rec.owner) {
            lines.push(`**Owner**: ${rec.owner}`);
          }
          lines.push(``);
        });
      } else {
        lines.push(`No specific actions recommended at this time.`);
      }
  
      return lines.join('\n');
    }
  
    /**
     * Format as concise summary for quick reference
     */
    static formatAsQuickReference(result: NewsIntelligenceResult): string {
      return `
  NEWS INTELLIGENCE QUICK REFERENCE
  ${result.company} | ${result.industry} | ${result.country}
  
  SENTIMENT: ${this.formatSentiment(result.overallSentiment)}
  CONFIDENCE: ${(result.confidence * 100).toFixed(0)}%
  
  SUMMARY:
  ${result.executiveSummary}
  
  TOP OPPORTUNITY:
  ${result.opportunities.length > 0 ? `• ${result.opportunities[0].title}` : '• None identified'}
  
  TOP THREAT:
  ${result.threats.length > 0 ? `• ${result.threats[0].title}` : '• None identified'}
  
  TOP ACTION:
  ${result.recommendedActions.length > 0 ? `• ${result.recommendedActions[0].action}` : '• None recommended'}
  
  ---
  Events: ${result.importantEvents.length} | Opportunities: ${result.opportunities.length} | 
  Threats: ${result.threats.length} | Actions: ${result.recommendedActions.length}
      `.trim();
    }
  
    /**
     * Format sentiment for display
     */
    private static formatSentiment(sentiment: SentimentLevel): string {
      const icons: Record<SentimentLevel, string> = {
        Positive: '📈',
        Neutral: '➡️',
        Negative: '📉'
      };
      return `${icons[sentiment]} ${sentiment}`;
    }
  
    /**
     * Format sentiment with detailed description
     */
    private static formatSentimentDetailed(sentiment: SentimentLevel): string {
      const descriptions: Record<SentimentLevel, string> = {
        Positive: 'Positive Business Environment - Strong growth opportunities',
        Neutral: 'Neutral Business Environment - Balanced risks and opportunities',
        Negative: 'Negative Business Environment - Significant challenges ahead'
      };
      return descriptions[sentiment];
    }
  
    /**
     * Format impact level for display
     */
    private static formatImpact(impact: ImpactLevel): string {
      const indicators: Record<ImpactLevel, string> = {
        Low: '🟢',
        Medium: '🟡',
        High: '🔴'
      };
      return `${indicators[impact]} ${impact}`;
    }
  
    /**
     * Format confidence score
     */
    static formatConfidence(confidence: number): string {
      const percentage = (confidence * 100).toFixed(0);
      if (confidence >= 0.85) {
        return `High (${percentage}%)`;
      } else if (confidence >= 0.65) {
        return `Moderate (${percentage}%)`;
      } else {
        return `Low (${percentage}%)`;
      }
    }
  
    /**
     * Validate result structure
     */
    static validateResult(result: any): boolean {
      const requiredFields = [
        'executiveSummary',
        'overallSentiment',
        'importantEvents',
        'opportunities',
        'threats',
        'regulatoryUpdates',
        'competitorNews',
        'technologyTrends',
        'recommendedActions',
        'confidence'
      ];
  
      return requiredFields.every((field) => field in result);
    }
  } 