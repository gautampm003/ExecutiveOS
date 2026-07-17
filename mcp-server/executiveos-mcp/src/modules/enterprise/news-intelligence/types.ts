// types.ts
/**
 * Type definitions for the News Intelligence MCP Tool
 * Defines all interfaces and data structures
 */

export interface NewsIntelligenceInput {
    company: string;
    industry: string;
    country: string;
    timeframe?: "24h" | "7d" | "30d";
    focus?: string;
  }
  
  export type SentimentType = "Positive" | "Neutral" | "Negative";
  export type EventCategory =
    | "Business"
    | "Technology"
    | "Regulation"
    | "Politics"
    | "Economy"
    | "Competition";
  export type ImpactLevel = "Low" | "Medium" | "High";
  
  export interface ImportantEvent {
    title: string;
    summary: string;
    category: EventCategory;
    impact: ImpactLevel;
  }
  
  export interface NewsIntelligenceOutput {
    executiveSummary: string;
    overallSentiment: SentimentType;
    importantEvents: ImportantEvent[];
    opportunities: string[];
    risks: string[];
    competitorNews: string[];
    regulatoryUpdates: string[];
    technologyTrends: string[];
    recommendedActions: string[];
    confidence: number;
  }
  
  export interface AnalysisContext {
    company: string;
    industry: string;
    country: string;
    timeframe: "24h" | "7d" | "30d";
    focus?: string;
    timestamp: Date;
  }
  
  export interface RawNewsArticle {
    title: string;
    source: string;
    publishedAt: string;
    description: string;
    url: string;
    sentiment: string;
    relevanceScore: number;
  }
  
  export interface AnalyzedNewsEvent {
    title: string;
    summary: string;
    category: EventCategory;
    impact: ImpactLevel;
    relevance: number;
    sentiment: SentimentType;
    urgency: "Low" | "Medium" | "High";
    executiveRelevance: string[];
    isOpportunity: boolean;
    isThreat: boolean;
    requiresImmediateAction: boolean;
  }
  
  export interface NewsAnalysisData {
    analyzedEvents: AnalyzedNewsEvent[];
    overallMarketSentiment: SentimentType;
    opportunitiesList: string[];
    risksList: string[];
    competitorMovements: string[];
    regulatoryChanges: string[];
    techTrends: string[];
    actionItems: string[];
    analysisQuality: number;
  }