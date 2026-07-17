// service.ts
/**
 * Business Logic Layer for News Intelligence
 * Orchestrates news fetching, analysis, and synthesis
 * Designed for easy API integration (NewsAPI, GNews, Tavily, Exa, etc.)
 */

import {
    AnalysisContext,
    RawNewsArticle,
    NewsAnalysisData,
    AnalyzedNewsEvent,
    SentimentType,
    EventCategory,
    ImpactLevel,
  } from "./types";
  
  /**
   * Fetches recent business news
   * Currently uses mock data; ready for integration with:
   * - NewsAPI
   * - GNews
   * - Tavily Search API
   * - Exa AI Search
   * - Google News API
   *
   * @param context - Analysis context
   * @returns Array of news articles
   */
  export async function fetchNewsArticles(
    context: AnalysisContext
  ): Promise<RawNewsArticle[]> {
    // TODO: Replace with actual API calls
    // This mock is based on realistic news patterns
  
    const timeframeHours: Record<string, number> = {
      "24h": 24,
      "7d": 168,
      "30d": 720,
    };
  
    // Simulate fetching recent news articles
    const mockArticles = generateMockNewsArticles(
      context.company,
      context.industry,
      context.country,
      timeframeHours[context.timeframe]
    );
  
    return mockArticles;
  }
  
  /**
   * Generates mock news articles for demonstration
   */
  function generateMockNewsArticles(
    company: string,
    industry: string,
    country: string,
    hoursBack: number
  ): RawNewsArticle[] {
    const articles: RawNewsArticle[] = [];
  
    // Industry-specific mock articles
    if (industry.toLowerCase().includes("fintech")) {
      articles.push(
        {
          title: `${company} Secures $50M Series B Funding Round`,
          source: "TechCrunch",
          publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          description:
            "Major funding milestone demonstrates investor confidence in growth trajectory",
          url: "https://example.com/article1",
          sentiment: "Positive",
          relevanceScore: 0.95,
        },
        {
          title: "Central Banks Tighten Crypto Regulations Across EU",
          source: "Financial Times",
          publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          description:
            "New regulatory framework could impact fintech companies operating in EU",
          url: "https://example.com/article2",
          sentiment: "Negative",
          relevanceScore: 0.88,
        },
        {
          title: "AI-Powered Payment Processing Becomes Industry Standard",
          source: "VentureBeat",
          publishedAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
          description:
            "Adoption of AI in payment fraud detection and processing accelerates",
          url: "https://example.com/article3",
          sentiment: "Positive",
          relevanceScore: 0.92,
        }
      );
    } else if (industry.toLowerCase().includes("e-commerce")) {
      articles.push(
        {
          title: "Major E-Commerce Player Announces Supply Chain Restructuring",
          source: "Reuters",
          publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
          description:
            "Competitor investing heavily in logistics to reduce delivery times",
          url: "https://example.com/article4",
          sentiment: "Negative",
          relevanceScore: 0.90,
        },
        {
          title: "Consumer Spending in Q4 Exceeds Expectations",
          source: "Bloomberg",
          publishedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
          description:
            "Holiday shopping season shows strong demand across all regions",
          url: "https://example.com/article5",
          sentiment: "Positive",
          relevanceScore: 0.87,
        }
      );
    } else if (industry.toLowerCase().includes("healthcare")) {
      articles.push(
        {
          title: "FDA Approves New Class of Diagnostic Devices",
          source: "STAT News",
          publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          description:
            "Regulatory approval creates opportunity for new product categories",
          url: "https://example.com/article6",
          sentiment: "Positive",
          relevanceScore: 0.93,
        },
        {
          title: "Healthcare Cost Pressures Mount Amid Inflation",
          source: "Health Affairs",
          publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          description:
            "Rising operational costs challenging profitability across sector",
          url: "https://example.com/article7",
          sentiment: "Negative",
          relevanceScore: 0.85,
        }
      );
    }
  
    // Add generic relevant articles
    articles.push(
      {
        title: `${country} Government Announces New Business Incentives`,
        source: "Local News",
        publishedAt: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
        description: `Policy changes in ${country} may benefit companies in ${industry}`,
        url: "https://example.com/article8",
        sentiment: "Positive",
        relevanceScore: 0.80,
      },
      {
        title: "Economic Growth Forecast Revised Downward",
        source: "IMF Report",
        publishedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        description: "Economic headwinds could impact growth plans",
        url: "https://example.com/article9",
        sentiment: "Negative",
        relevanceScore: 0.82,
      }
    );
  
    return articles;
  }
  
  /**
   * Analyzes raw news articles and generates intelligence
   * Applies strategic thinking and determines executive relevance
   *
   * @param articles - Raw news articles
   * @param context - Analysis context
   * @returns Structured news intelligence
   */
  export async function analyzeNewsArticles(
    articles: RawNewsArticle[],
    context: AnalysisContext
  ): Promise<NewsAnalysisData> {
    if (!articles || articles.length === 0) {
      throw new Error("No news articles available for analysis");
    }
  
    // Filter and sort by relevance
    const relevantArticles = articles
      .filter((a) => a.relevanceScore >= 0.75)
      .sort((a, b) => b.relevanceScore - a.relevanceScore);
  
    if (relevantArticles.length === 0) {
      throw new Error("No sufficiently relevant articles found");
    }
  
    // Analyze each article
    const analyzedEvents = await Promise.all(
      relevantArticles.map((article) =>
        analyzeArticleAsEvent(article, context)
      )
    );
  
    // Generate strategic insights
    const opportunities = extractOpportunities(analyzedEvents, context);
    const risks = extractRisks(analyzedEvents, context);
    const competitors = extractCompetitorNews(analyzedEvents);
    const regulatory = extractRegulatoryUpdates(analyzedEvents);
    const trends = extractTechnologyTrends(analyzedEvents);
    const actions = generateActionItems(
      analyzedEvents,
      opportunities,
      risks,
      context
    );
  
    // Calculate overall sentiment
    const overallSentiment = calculateOverallSentiment(analyzedEvents);
  
    return {
      analyzedEvents,
      overallMarketSentiment: overallSentiment,
      opportunitiesList: opportunities,
      risksList: risks,
      competitorMovements: competitors,
      regulatoryChanges: regulatory,
      techTrends: trends,
      actionItems: actions,
      analysisQuality: calculateAnalysisQuality(relevantArticles.length),
    };
  }
  
  /**
   * Analyzes individual article as a news event
   */
  async function analyzeArticleAsEvent(
    article: RawNewsArticle,
    context: AnalysisContext
  ): Promise<AnalyzedNewsEvent> {
    // Determine category based on content
    const category = classifyEventCategory(article.title, article.description);
  
    // Determine impact
    const impact = assessEventImpact(article.description, category);
  
    // Determine sentiment
    const sentiment = parseSentiment(article.sentiment);
  
    // Assess urgency
    const urgency = assessUrgency(impact, category);
  
    // Determine executive relevance
    const relevantExecs = determineExecutiveRelevance(category, context);
  
    return {
      title: article.title,
      summary: generateEventSummary(article, context),
      category,
      impact,
      relevance: article.relevanceScore,
      sentiment,
      urgency,
      executiveRelevance: relevantExecs,
      isOpportunity: detectOpportunity(article.description, sentiment),
      isThreat: detectThreat(article.description, sentiment),
      requiresImmediateAction: urgency === "High",
    };
  }
  
  /**
   * Classifies event into category
   */
  function classifyEventCategory(
    title: string,
    description: string
  ): EventCategory {
    const lowerContent = `${title} ${description}`.toLowerCase();
  
    if (
      lowerContent.includes("regulation") ||
      lowerContent.includes("law") ||
      lowerContent.includes("compliance")
    ) {
      return "Regulation";
    }
    if (
      lowerContent.includes("ai") ||
      lowerContent.includes("technology") ||
      lowerContent.includes("software") ||
      lowerContent.includes("digital")
    ) {
      return "Technology";
    }
    if (
      lowerContent.includes("government") ||
      lowerContent.includes("policy") ||
      lowerContent.includes("political")
    ) {
      return "Politics";
    }
    if (
      lowerContent.includes("economy") ||
      lowerContent.includes("growth") ||
      lowerContent.includes("gdp") ||
      lowerContent.includes("inflation")
    ) {
      return "Economy";
    }
    if (
      lowerContent.includes("competitor") ||
      lowerContent.includes("rival") ||
      lowerContent.includes("acquisition")
    ) {
      return "Competition";
    }
  
    return "Business";
  }
  
  /**
   * Assesses impact level
   */
  function assessEventImpact(
    description: string,
    category: EventCategory
  ): ImpactLevel {
    const lowerDesc = description.toLowerCase();
  
    // High impact indicators
    if (
      lowerDesc.includes("major") ||
      lowerDesc.includes("significant") ||
      lowerDesc.includes("billion") ||
      category === "Regulation"
    ) {
      return "High";
    }
  
    // Medium impact indicators
    if (
      lowerDesc.includes("announce") ||
      lowerDesc.includes("launch") ||
      category === "Technology"
    ) {
      return "Medium";
    }
  
    return "Low";
  }
  
  /**
   * Parses sentiment
   */
  function parseSentiment(sentiment: string): SentimentType {
    const lower = sentiment.toLowerCase();
    if (lower.includes("positive")) return "Positive";
    if (lower.includes("negative")) return "Negative";
    return "Neutral";
  }
  
  /**
   * Assesses urgency of response
   */
  function assessUrgency(
    impact: ImpactLevel,
    category: EventCategory
  ): "Low" | "Medium" | "High" {
    if (impact === "High" && (category === "Regulation" || category === "Politics")) {
      return "High";
    }
    if (impact === "High") {
      return "Medium";
    }
    return "Low";
  }
  
  /**
   * Determines which executives should be aware
   */
  function determineExecutiveRelevance(
    category: EventCategory,
    context: AnalysisContext
  ): string[] {
    const relevantRoles: Record<EventCategory, string[]> = {
      Regulation: ["General Counsel", "Chief Compliance Officer", "CEO"],
      Technology: ["CTO", "Chief Product Officer", "CEO"],
      Politics: ["Government Affairs", "CEO", "CFO"],
      Economy: ["CFO", "CEO", "Chief Strategy Officer"],
      Competition: ["CEO", "Chief Strategy Officer", "CMO"],
      Business: ["CEO", "COO", "Chief Strategy Officer"],
    };
  
    return relevantRoles[category] || ["CEO"];
  }
  
  /**
   * Generates strategic summary of event
   */
  function generateEventSummary(
    article: RawNewsArticle,
    context: AnalysisContext
  ): string {
    return `${article.description} Relevance to ${context.company}: strategic implications for market positioning and competitive landscape.`;
  }
  
  /**
   * Detects opportunity signal
   */
  function detectOpportunity(description: string, sentiment: SentimentType): boolean {
    const lower = description.toLowerCase();
    return (
      sentiment === "Positive" ||
      lower.includes("opportunity") ||
      lower.includes("growth") ||
      lower.includes("expand")
    );
  }
  
  /**
   * Detects threat signal
   */
  function detectThreat(description: string, sentiment: SentimentType): boolean {
    const lower = description.toLowerCase();
    return (
      sentiment === "Negative" ||
      lower.includes("risk") ||
      lower.includes("threat") ||
      lower.includes("decline")
    );
  }
  
  /**
   * Extracts opportunities from news events
   */
  function extractOpportunities(
    events: AnalyzedNewsEvent[],
    context: AnalysisContext
  ): string[] {
    const opportunities = events
      .filter((e) => e.isOpportunity)
      .map((e) => `${e.title}: ${e.summary}`)
      .slice(0, 5);
  
    if (opportunities.length === 0) {
      opportunities.push(
        `Market expansion opportunity in ${context.country}`,
        "Technology adoption opportunity",
        "Partnership and collaboration opportunity"
      );
    }
  
    return opportunities.slice(0, 5);
  }
  
  /**
   * Extracts risks from news events
   */
  function extractRisks(
    events: AnalyzedNewsEvent[],
    context: AnalysisContext
  ): string[] {
    const risks = events
      .filter((e) => e.isThreat)
      .map((e) => `${e.title}: ${e.summary}`)
      .slice(0, 5);
  
    if (risks.length === 0) {
      risks.push(
        `Competitive pressure in ${context.industry}`,
        "Regulatory and compliance risks",
        "Market volatility and economic uncertainty"
      );
    }
  
    return risks.slice(0, 5);
  }
  
  /**
   * Extracts competitor news
   */
  function extractCompetitorNews(events: AnalyzedNewsEvent[]): string[] {
    return events
      .filter((e) => e.category === "Competition")
      .map((e) => `${e.title}: ${e.summary}`)
      .slice(0, 4);
  }
  
  /**
   * Extracts regulatory updates
   */
  function extractRegulatoryUpdates(events: AnalyzedNewsEvent[]): string[] {
    return events
      .filter((e) => e.category === "Regulation")
      .map((e) => `${e.title}: ${e.summary}`)
      .slice(0, 4);
  }
  
  /**
   * Extracts technology trends
   */
  function extractTechnologyTrends(events: AnalyzedNewsEvent[]): string[] {
    return events
      .filter((e) => e.category === "Technology")
      .map((e) => `${e.title}: ${e.summary}`)
      .slice(0, 4);
  }
  
  /**
   * Generates board-level action items
   */
  function generateActionItems(
    events: AnalyzedNewsEvent[],
    opportunities: string[],
    risks: string[],
    context: AnalysisContext
  ): string[] {
    const actionItems: string[] = [];
  
    // High-urgency items
    const highUrgency = events.filter((e) => e.requiresImmediateAction);
    if (highUrgency.length > 0) {
      actionItems.push(
        `URGENT: Board review required for ${highUrgency[0].title}`
      );
    }
  
    // Strategic responses
    if (opportunities.length > 0) {
      actionItems.push(`Evaluate strategic response to market opportunity`);
    }
  
    if (risks.length > 0) {
      actionItems.push(`Assess and mitigate identified business risks`);
    }
  
    // Regulatory actions
    const regulatory = events.filter((e) => e.category === "Regulation");
    if (regulatory.length > 0) {
      actionItems.push(
        `Ensure compliance with new regulatory requirements`
      );
    }
  
    // Competitive response
    const competitive = events.filter((e) => e.category === "Competition");
    if (competitive.length > 0) {
      actionItems.push(`Review competitive positioning and response strategy`);
    }
  
    return actionItems.slice(0, 5);
  }
  
  /**
   * Calculates overall market sentiment
   */
  function calculateOverallSentiment(events: AnalyzedNewsEvent[]): SentimentType {
    if (events.length === 0) return "Neutral";
  
    const positiveCount = events.filter((e) => e.sentiment === "Positive").length;
    const negativeCount = events.filter((e) => e.sentiment === "Negative").length;
    const neutralCount = events.length - positiveCount - negativeCount;
  
    if (positiveCount > negativeCount && positiveCount > neutralCount) {
      return "Positive";
    }
    if (negativeCount > positiveCount && negativeCount > neutralCount) {
      return "Negative";
    }
    return "Neutral";
  }
  
  /**
   * Calculates analysis quality based on article count
   */
  function calculateAnalysisQuality(articleCount: number): number {
    if (articleCount >= 7) return 0.95;
    if (articleCount >= 5) return 0.88;
    if (articleCount >= 3) return 0.80;
    return 0.70;
  }