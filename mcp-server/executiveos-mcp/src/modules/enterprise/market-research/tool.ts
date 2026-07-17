// tool.ts
/**
 * MCP Tool Registration and Handler
 * Defines the tool interface and request/response handling
 */

import { Tool } from "@modelcontextprotocol/sdk/types";
import {
  MarketResearchInput,
  MarketResearchOutput,
  AnalysisContext,
} from "./types";
import { MarketResearchInputSchema } from "./schema";
import { fetchMarketData, analyzeMarketData } from "./service";
import { formatMarketResearchOutput, createExecutiveSummary } from "./formatter";

/**
 * Tool definition for Market Research
 * Includes metadata and input schema
 */
export const MARKET_RESEARCH_TOOL: Tool = {
  name: "market_research",
  description:
    "Provides comprehensive market intelligence for companies expanding into new countries. " +
    "Analyzes market size, growth rates, customer segments, opportunities, and challenges " +
    "to support strategic expansion decisions.",
  inputSchema: {
    type: "object",
    properties: {
      company: {
        type: "string",
        description:
          "Name of the company considering market expansion (e.g., 'Acme Corp')",
      },
      industry: {
        type: "string",
        description:
          "Industry sector (e.g., 'fintech', 'e-commerce', 'healthcare')",
      },
      country: {
        type: "string",
        description:
          "Target country for expansion (e.g., 'India', 'Brazil', 'Singapore')",
      },
    },
    required: ["company", "industry", "country"],
  },
};

/**
 * Handler for market research tool requests
 * Orchestrates the entire analysis pipeline
 *
 * @param input - Market research input parameters
 * @returns Formatted market research output
 * @throws Error if validation fails or analysis encounters issues
 */
export async function handleMarketResearchRequest(
  input: unknown
): Promise<MarketResearchOutput> {
  // Validate input against schema
  let validatedInput: MarketResearchInput;
  try {
    validatedInput = MarketResearchInputSchema.parse(input);
  } catch (error) {
    throw new Error(
      `Invalid market research input: ${error instanceof Error ? error.message : String(error)}`
    );
  }

  // Create analysis context with metadata
  const context: AnalysisContext = {
    company: validatedInput.company,
    industry: validatedInput.industry,
    country: validatedInput.country,
    timestamp: new Date(),
  };

  try {
    // Step 1: Fetch raw market data
    // In production, this integrates with Tavily/Exa API
    const rawData = await fetchMarketData(context);

    // Step 2: Analyze and enrich the data
    const analyzedData = await analyzeMarketData(rawData);

    // Step 3: Format output for executive board
    const output = formatMarketResearchOutput(analyzedData, context);

    // Step 4: Create audit trail
    const summary = createExecutiveSummary(context, output);
    console.info(summary);

    return output;
  } catch (error) {
    throw new Error(
      `Market research analysis failed: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}