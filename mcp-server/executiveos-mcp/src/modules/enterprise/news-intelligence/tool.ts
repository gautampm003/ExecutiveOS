// tool.ts
/**
 * MCP Tool Registration and Handler
 * Defines the News Intelligence tool interface and orchestrates analysis
 */

import { Tool } from "@modelcontextprotocol/sdk/types";
import {
  NewsIntelligenceInput,
  NewsIntelligenceOutput,
  AnalysisContext,
} from "./types";
import { NewsIntelligenceInputSchema } from "./schema";
import { fetchNewsArticles, analyzeNewsArticles } from "./service";
import {
  formatNewsIntelligenceOutput,
  createExecutiveSummaryLog,
} from "./formatter";

/**
 * MCP Tool Definition for News Intelligence
 * Metadata and input schema for the tool
 */
export const NEWS_INTELLIGENCE_TOOL: Tool = {
  name: "news_intelligence",
  description:
    "Monitor, analyze, and summarize business news relevant to a company, industry, or country. " +
    "Identifies opportunities, risks, regulatory changes, competitor movements, geopolitical events, " +
    "technology trends, and market sentiment. Provides executive-level intelligence for strategic " +
    "decision-making, suitable for board presentation and C-suite briefings. Analyzes recent news " +
    "to determine strategic significance, urgency, executive relevance, and recommended actions.",
  inputSchema: {
    type: "object",
    properties: {
      company: {
        type: "string",
        description:
          "Name of the company to monitor (e.g., 'Acme Corporation')",
      },
      industry: {
        type: "string",
        description:
          "Industry sector (e.g., 'fintech', 'e-commerce', 'healthcare', 'saas')",
      },
      country: {
        type: "string",
        description:
          "Geographic focus (e.g., 'United States', 'India', 'European Union')",
      },
      timeframe: {
        type: "string",
        enum: ["24h", "7d", "30d"],
        description: "Time period for news analysis (default: 7d)",
      },
      focus: {
        type: "string",
        description:
          "Optional: specific focus areas or topics (e.g., 'AI regulation', 'supply chain', 'M&A activity')",
      },
    },
    required: ["company", "industry", "country"],
  },
};

/**
 * Handler for news intelligence tool requests
 * Orchestrates the entire news analysis workflow
 *
 * @param input - News intelligence input parameters
 * @returns Comprehensive news intelligence output
 * @throws Error if validation fails or analysis encounters issues
 */
export async function handleNewsIntelligenceRequest(
  input: unknown
): Promise<NewsIntelligenceOutput> {
  // Validate input against schema
  let validatedInput: NewsIntelligenceInput;
  try {
    validatedInput = NewsIntelligenceInputSchema.parse(input);
  } catch (error) {
    throw new Error(
      `Invalid news intelligence input: ${error instanceof Error ? error.message : String(error)}`
    );
  }

  // Create analysis context
  const context: AnalysisContext = {
    company: validatedInput.company,
    industry: validatedInput.industry,
    country: validatedInput.country,
    timeframe: validatedInput.timeframe || "7d",
    focus: validatedInput.focus,
    timestamp: new Date(),
  };

  try {
    // Step 1: Fetch recent news articles
    // In production, integrates with NewsAPI, GNews, Tavily, Exa, etc.
    const newsArticles = await fetchNewsArticles(context);

    // Step 2: Analyze articles for strategic intelligence
    // Determines significance, urgency, threats, opportunities
    const analysisData = await analyzeNewsArticles(newsArticles, context);

    // Step 3: Format output for executive board
    const output = formatNewsIntelligenceOutput(analysisData, context);

    // Step 4: Create audit trail
    const summary = createExecutiveSummaryLog(context, output);
    console.info(summary);

    return output;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);
    throw new Error(
      `News intelligence analysis failed: ${errorMessage}`
    );
  }
}