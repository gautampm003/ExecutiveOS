// formatter.ts
/**
 * Output Formatting Layer for News Intelligence
 * Converts raw analysis into ExecutiveOS standard response format
 */

import {
    NewsAnalysisData,
    NewsIntelligenceOutput,
    AnalysisContext,
    AnalyzedNewsEvent,
    SentimentType,
  } from "./types";
  
  /**
   * Formats news analysis into ExecutiveOS response format
   * Ensures consistent, executive-ready output
   *
   * @param analysisData - Raw news analysis
   * @param context - Analysis context
   * @returns Formatted output for executive board
   */
  export function formatNewsIntelligenceOutput(
    analysisData: NewsAnalysisData,
    context: AnalysisContext
  ): NewsIntelligenceOutput {
    // Generate executive summary
    const executiveSummary = generateExecutiveSummary(
      analysisData,
      context
    );
  
    // Select top events
    const topEvents = analysisData.analyzedEvents
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 7)
      .map((event) => ({
        title: normalizeString(event.title),
        summary: normalizeString(event.summary),
        category: event.category,
        impact: event.impact,
      }));
  
    return {
      executiveSummary,
      overallSentiment: analysisData.overallMarketSentiment,
      importantEvents:
        topEvents.length > 0
          ? topEvents
          : generateDefaultEvents(context),
      opportunities: normalizeMissingValues(analysisData.opportunitiesList, [
        "Market expansion opportunity",
        "Technology adoption and innovation",
        "Strategic partnership opportunity",
        "Customer segment expansion",
        "Geographic market entry",
      ]),
      risks: normalizeMissingValues(analysisData.risksList, [
        "Competitive intensity",
        "Regulatory and compliance changes",
        "Market volatility and economic uncertainty",
        "Technology disruption risk",
        "Geopolitical and macroeconomic headwinds",
      ]),
      competitorNews: normalizeMissingValues(analysisData.competitorMovements, [
        "Competitor market expansion announced",
        "Rival company strategic partnership",
        "Competitive pricing changes",
      ]),
      regulatoryUpdates: normalizeMissingValues(analysisData.regulatoryChanges, [
        "New industry regulations announced",
        "Compliance requirements updated",
        "Policy changes affecting market",
      ]),
      technologyTrends: normalizeMissingValues(analysisData.techTrends, [
        "AI and machine learning adoption",
        "Cloud and infrastructure trends",
        "Data and cybersecurity evolution",
      ]),
      recommendedActions: normalizeMissingValues(analysisData.actionItems, [
        "Strategic review and planning",
        "Risk assessment and mitigation",
        "Competitive response strategy",
        "Innovation and R&D investment",
        "Partnership and collaboration evaluation",
      ]),
      confidence: calculateConfidenceScore(analysisData.analysisQuality),
    };
  }
  
  /**
   * Generates executive summary from analysis
   */
  function generateExecutiveSummary(
    analysisData: NewsAnalysisData,
    context: AnalysisContext
  ): string {
    const topEvent = analysisData.analyzedEvents[0];
    const sentiment = analysisData.overallMarketSentiment;
    const opportunities = analysisData.opportunitiesList.length;
    const risks = analysisData.risksList.length;
  
    if (!topEvent) {
      return `Market conditions in ${context.industry} remain ${sentiment.toLowerCase()}. Continued monitoring recommended.`;
    }
  
    const sentimentDesc =
      sentiment === "Positive"
        ? "favorable market conditions"
        : sentiment === "Negative"
          ? "challenging market conditions"
          : "mixed market signals";
  
    return `Recent news shows ${sentimentDesc} in ${context.industry}. Key development: ${topEvent.title}. ${opportunities} opportunities and ${risks} significant risks identified. Board-level action recommended for ${topEvent.impact === "High" ? "high-impact" : "strategic"} items.`;
  }
  
  /**
   * Generates default events if analysis yields nothing
   */
  function generateDefaultEvents(context: AnalysisContext) {
    return [
      {
        title: `Market Trends in ${context.industry}`,
        summary: `Monitoring continued evolution of ${context.industry} sector in ${context.country}`,
        category: "Business" as const,
        impact: "Medium" as const,
      },
      {
        title: "Regulatory Environment",
        summary: "Ongoing monitoring of regulatory changes and compliance requirements",
        category: "Regulation" as const,
        impact: "Medium" as const,
      },
      {
        title: "Technology Developments",
        summary: "Tracking emerging technology trends relevant to industry",
        category: "Technology" as const,
        impact: "Medium" as const,
      },
    ];
  }
  
  /**
   * Normalizes string values
   */
  function normalizeString(value: string | undefined): string {
    if (!value || typeof value !== "string" || value.trim().length === 0) {
      return "Business development";
    }
    return value.trim();
  }
  
  /**
   * Normalizes array values with fallback
   */
  function normalizeMissingValues(
    values: string[] | undefined,
    fallback: string[]
  ): string[] {
    if (!Array.isArray(values) || values.length === 0) {
      return fallback.slice(0, 6);
    }
  
    const filtered = values
      .filter((item) => typeof item === "string" && item.trim().length > 0)
      .map((item) => item.trim());
  
    const result = filtered.length > 0 ? filtered : fallback;
    return result.slice(0, 6);
  }
  
  /**
   * Calculates confidence score
   */
  function calculateConfidenceScore(analysisQuality: number): number {
    return Math.round(analysisQuality * 100) / 100;
  }
  
  /**
   * Creates executive summary for audit trail
   */
  export function createExecutiveSummaryLog(
    context: AnalysisContext,
    output: NewsIntelligenceOutput
  ): string {
    return `News Intelligence Analysis: ${context.company} in ${context.industry} (${context.country})
  Timeframe: ${context.timeframe}
  Overall Sentiment: ${output.overallSentiment}
  Events Analyzed: ${output.importantEvents.length}
  Opportunities: ${output.opportunities.length}
  Risks: ${output.risks.length}
  Confidence: ${(output.confidence * 100).toFixed(0)}%
  Recommended Actions: ${output.recommendedActions.length}`;
  }