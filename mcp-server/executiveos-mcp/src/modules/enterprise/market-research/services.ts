// service.ts
/**
 * Business Logic Layer for Market Research
 * Implements the core market analysis functionality
 * Abstracted for easy API integration (Tavily, Exa, etc.)
 */

import { RawMarketData, AnalysisContext, MarketResearchOutput } from "./types";

/**
 * Simulates fetching and analyzing market data
 * In production, this would integrate with Tavily API, Exa, or similar
 *
 * @param context - Analysis context (company, industry, country)
 * @returns Raw market data from research
 */
export async function fetchMarketData(
  context: AnalysisContext
): Promise<RawMarketData> {
  // TODO: Replace with actual API call to Tavily/Exa
  // This is a realistic mock based on industry patterns

  const mockDataByIndustry: Record<string, Partial<RawMarketData>> = {
    fintech: {
      marketSizeUSD: 147_000_000_000,
      marketSizeGrowthRate: 12.5,
      segments: [
        "Digital Payments",
        "Blockchain & Crypto",
        "InsurTech",
        "WealthTech",
        "LendingTech",
      ],
      marketOpportunities: [
        "Unbanked population growth",
        "Mobile-first adoption",
        "Cross-border payment demand",
        "AI-driven risk assessment",
        "Regulatory framework maturation",
      ],
      marketChallenges: [
        "Regulatory uncertainty",
        "Cybersecurity risks",
        "Legacy banking integration",
        "Local competition intensity",
        "Customer trust building",
      ],
      analysisNotes:
        "Strong growth driven by digital transformation and fintech adoption",
      dataQuality: 0.85,
    },
    "e-commerce": {
      marketSizeUSD: 89_000_000_000,
      marketSizeGrowthRate: 15.2,
      segments: [
        "B2C Retail",
        "Marketplace",
        "Social Commerce",
        "Live Shopping",
        "Logistics",
      ],
      marketOpportunities: [
        "Emerging market penetration",
        "Supply chain optimization",
        "Community-driven commerce",
        "Last-mile delivery innovation",
        "Subscription models",
      ],
      marketChallenges: [
        "Market saturation in tier-1 cities",
        "Logistics infrastructure gaps",
        "Payment method fragmentation",
        "Customer acquisition costs",
        "Return rate management",
      ],
      analysisNotes: "Rapid growth in tier-2 and tier-3 markets",
      dataQuality: 0.82,
    },
    healthcare: {
      marketSizeUSD: 203_000_000_000,
      marketSizeGrowthRate: 8.3,
      segments: [
        "Telemedicine",
        "Medical Devices",
        "Pharmaceuticals",
        "Health Insurance",
        "Wellness Tech",
      ],
      marketOpportunities: [
        "Rural healthcare delivery",
        "Chronic disease management",
        "Preventive care adoption",
        "AI diagnostics",
        "Aging population services",
      ],
      marketChallenges: [
        "Stringent regulatory requirements",
        "Data privacy concerns",
        "Infrastructure limitations",
        "Pricing pressure",
        "Local partnership complexity",
      ],
      analysisNotes: "Steady growth with regulatory complexity",
      dataQuality: 0.88,
    },
  };

  // Get industry-specific data or use default
  const industryLower = context.industry.toLowerCase();
  const baseData = mockDataByIndustry[industryLower] || {
    marketSizeUSD: 50_000_000_000,
    marketSizeGrowthRate: 10,
    segments: [
      "Enterprise",
      "SMB",
      "Startups",
      "Government",
      "Institutions",
    ],
    marketOpportunities: [
      "Market growth potential",
      "Technology adoption",
      "Consolidation opportunities",
      "New business models",
      "Emerging customer needs",
    ],
    marketChallenges: [
      "Competition intensity",
      "Regulatory barriers",
      "Technology disruption",
      "Talent acquisition",
      "Market maturity",
    ],
    analysisNotes: "Market analysis based on available data",
    dataQuality: 0.75,
  };

  // Adjust for country-specific factors
  const countryMultipliers: Record<string, number> = {
    india: 1.15,
    china: 1.25,
    brazil: 0.9,
    singapore: 1.1,
    germany: 0.95,
    usa: 1.0,
    uk: 0.98,
  };

  const countryMultiplier =
    countryMultipliers[context.country.toLowerCase()] || 1.0;

  return {
    marketSizeUSD: Math.round(baseData.marketSizeUSD! * countryMultiplier),
    marketSizeGrowthRate: baseData.marketSizeGrowthRate!,
    segments: baseData.segments!,
    marketOpportunities: baseData.marketOpportunities!,
    marketChallenges: baseData.marketChallenges!,
    analysisNotes: baseData.analysisNotes!,
    dataQuality: baseData.dataQuality!,
  };
}

/**
 * Analyzes raw market data and generates insights
 * Applies business logic and calculations
 *
 * @param rawData - Raw market data from research
 * @returns Analyzed market data ready for formatting
 */
export async function analyzeMarketData(
  rawData: RawMarketData
): Promise<RawMarketData> {
  // In production, this could involve LLM processing, statistical analysis, etc.
  // For now, we validate and enrich the data

  if (!rawData.marketSizeUSD || rawData.marketSizeUSD <= 0) {
    throw new Error("Invalid market size data");
  }

  if (rawData.marketSizeGrowthRate < -50 || rawData.marketSizeGrowthRate > 50) {
    throw new Error("Invalid growth rate data");
  }

  // Return analyzed data (placeholder for more complex logic)
  return rawData;
}

/**
 * Calculates confidence score based on data quality
 * Higher data quality = higher confidence in recommendations
 *
 * @param dataQuality - Data quality score (0-1)
 * @returns Confidence score (0-1)
 */
export function calculateConfidenceScore(dataQuality: number): number {
  // Confidence = 70% data quality + 30% base confidence
  const baseConfidence = 0.7;
  return Math.round((dataQuality * 0.7 + baseConfidence * 0.3) * 100) / 100;
}

/**
 * Generates a strategic recommendation based on analysis
 *
 * @param opportunity - Primary market opportunity
 * @param challenge - Primary challenge
 * @param growthRate - Market growth rate
 * @returns Strategic recommendation text
 */
export function generateRecommendation(
  opportunity: string,
  challenge: string,
  growthRate: number
): string {
  if (growthRate > 15) {
    return `Enter market aggressively to capture ${opportunity}. Mitigate risk from ${challenge.toLowerCase()} through strategic partnerships.`;
  } else if (growthRate > 8) {
    return `Market shows strong potential. Focus on ${opportunity} while establishing infrastructure to overcome ${challenge.toLowerCase()}.`;
  } else {
    return `Market presents sustainable growth. Prioritize ${opportunity} and develop long-term strategy to address ${challenge.toLowerCase()}.`;
  }
}