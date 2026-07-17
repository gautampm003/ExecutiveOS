// formatter.ts
/**
 * Output Formatting Layer
 * Converts raw analysis into ExecutiveOS standard response format
 */

import { RawMarketData, MarketResearchOutput, AnalysisContext } from "./types";
import { calculateConfidenceScore, generateRecommendation } from "./service";

/**
 * Formats raw market data into ExecutiveOS response format
 * Handles unit conversions, string formatting, and structure
 *
 * @param rawData - Raw market analysis data
 * @param context - Analysis context for recommendation generation
 * @returns Formatted output ready for executive board
 */
export function formatMarketResearchOutput(
  rawData: RawMarketData,
  context: AnalysisContext
): MarketResearchOutput {
  // Format market size as readable string
  const marketSizeString = formatMarketSize(rawData.marketSizeUSD);

  // Format CAGR with percentage sign
  const cagrString = `${rawData.marketSizeGrowthRate.toFixed(1)}%`;

  // Calculate confidence based on data quality
  const confidence = calculateConfidenceScore(rawData.dataQuality);

  // Generate strategic recommendation
  const primaryOpportunity = rawData.marketOpportunities[0];
  const primaryChallenge = rawData.marketChallenges[0];
  const recommendation = generateRecommendation(
    primaryOpportunity,
    primaryChallenge,
    rawData.marketSizeGrowthRate
  );

  return {
    marketSize: marketSizeString,
    CAGR: cagrString,
    customerSegments: rawData.segments,
    opportunities: rawData.marketOpportunities,
    challenges: rawData.marketChallenges,
    recommendation,
    confidence,
  };
}

/**
 * Converts market size in USD to human-readable format
 * Handles billions, millions, and thousands
 *
 * @param sizeUSD - Market size in USD
 * @returns Formatted string (e.g., "$147.2B", "$897M")
 */
function formatMarketSize(sizeUSD: number): string {
  if (sizeUSD >= 1_000_000_000) {
    const billions = sizeUSD / 1_000_000_000;
    return `$${billions.toFixed(1)}B`;
  } else if (sizeUSD >= 1_000_000) {
    const millions = sizeUSD / 1_000_000;
    return `$${millions.toFixed(1)}M`;
  } else if (sizeUSD >= 1_000) {
    const thousands = sizeUSD / 1_000;
    return `$${thousands.toFixed(1)}K`;
  }
  return `$${sizeUSD}`;
}

/**
 * Creates a summary for logging/auditing purposes
 *
 * @param input - Original input parameters
 * @param output - Formatted output
 * @returns Summary string
 */
export function createExecutiveSummary(
  context: AnalysisContext,
  output: MarketResearchOutput
): string {
  return `Market Research Analysis: ${context.company} entering ${context.industry} in ${context.country}
Market Size: ${output.marketSize}
Growth Rate (CAGR): ${output.CAGR}
Segments: ${output.customerSegments.length} identified
Confidence: ${(output.confidence * 100).toFixed(0)}%`;
}