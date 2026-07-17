// index.ts
/**
 * News Intelligence MCP Tool Export
 * Single entry point for the News Intelligence tool
 */

export {
    NEWS_INTELLIGENCE_TOOL,
    handleNewsIntelligenceRequest,
  } from "./tool";
  
  export type {
    NewsIntelligenceInput,
    NewsIntelligenceOutput,
    ImportantEvent,
    AnalysisContext,
    RawNewsArticle,
    NewsAnalysisData,
    AnalyzedNewsEvent,
    SentimentType,
    EventCategory,
    ImpactLevel,
  } from "./types";
  
  export {
    NewsIntelligenceInputSchema,
    NewsIntelligenceOutputSchema,
    EventCategorySchema,
    SentimentSchema,
    ImpactLevelSchema,
    type ValidatedNewsIntelligenceInput,
    type ValidatedNewsIntelligenceOutput,
  } from "./schema";
  
  export {
    formatNewsIntelligenceOutput,
    createExecutiveSummaryLog,
  } from "./formatter";
  
  export {
    fetchNewsArticles,
    analyzeNewsArticles,
  } from "./service";
  
  export {
    NEWS_INTELLIGENCE_SYSTEM_PROMPT,
    NEWS_INTELLIGENCE_USER_PROMPT,
    NEWS_ANALYSIS_REFINEMENT_PROMPT,
    EVENT_CLASSIFICATION_PROMPT,
    SENTIMENT_ANALYSIS_PROMPT,
  } from "./prompts";