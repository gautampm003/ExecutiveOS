// index.ts
/**
 * Market Research MCP Tool Export
 * Single entry point for the Market Research tool
 */

export {
    MARKET_RESEARCH_TOOL,
    handleMarketResearchRequest,
  } from "./tool";
  
  export type {
    MarketResearchInput,
    MarketResearchOutput,
    RawMarketData,
    AnalysisContext,
  } from "./types";
  
  export {
    MarketResearchInputSchema,
    MarketResearchOutputSchema,
    type ValidatedMarketResearchInput,
    type ValidatedMarketResearchOutput,
  } from "./schema";
  
  export { formatMarketResearchOutput, createExecutiveSummary } from "./formatter";
  
  export { fetchMarketData, analyzeMarketData, calculateConfidenceScore } from "./service";
  
  export { MARKET_RESEARCH_SYSTEM_PROMPT, MARKET_RESEARCH_USER_PROMPT } from "./prompts";