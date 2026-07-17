// types.ts
/**
 * Types for the Market Research MCP Tool
 * Defines all interfaces used across the tool
 */

export interface MarketResearchInput {
    company: string;
    industry: string;
    country: string;
  }
  
  export interface MarketResearchOutput {
    marketSize: string;
    CAGR: string;
    customerSegments: string[];
    opportunities: string[];
    challenges: string[];
    recommendation: string;
    confidence: number;
  }
  
  export interface RawMarketData {
    marketSizeUSD: number;
    marketSizeGrowthRate: number;
    segments: string[];
    marketOpportunities: string[];
    marketChallenges: string[];
    analysisNotes: string;
    dataQuality: number;
  }
  
  export interface AnalysisContext {
    company: string;
    industry: string;
    country: string;
    timestamp: Date;
  }