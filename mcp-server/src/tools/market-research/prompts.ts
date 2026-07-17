// prompts.ts
/**
 * LLM Prompts for Market Research Analysis
 * Separates prompt engineering from business logic
 * Ready for use with Claude, GPT, or other LLMs
 */

export const MARKET_RESEARCH_SYSTEM_PROMPT = `You are an expert market research analyst specializing in international market expansion. 
Your role is to provide accurate, insightful market intelligence for companies entering new markets.
Focus on data-driven analysis and actionable recommendations.
Be concise but comprehensive in your analysis.`;

export const MARKET_RESEARCH_USER_PROMPT = (
  company: string,
  industry: string,
  country: string
) => `Conduct a comprehensive market research analysis for the following expansion:

Company: ${company}
Industry: ${industry}
Target Country: ${country}

Please provide:
1. Market Size: Estimated total market size in USD
2. CAGR: Compound Annual Growth Rate (%) for the next 5 years
3. Customer Segments: Key customer segments in this market (3-5 segments)
4. Opportunities: Primary market opportunities (3-5 opportunities)
5. Challenges: Key challenges to market entry (3-5 challenges)
6. Recommendation: Strategic recommendation for market entry
7. Confidence: Your confidence level in this analysis (0-1 scale)

Format your response as structured data that can be parsed for business decision-making.`;

export const DATA_SYNTHESIS_PROMPT = (
  company: string,
  industry: string,
  country: string,
  rawFindings: string
) => `Based on the following market research findings for ${company} expanding in ${industry} in ${country}:

${rawFindings}

Please synthesize this into a clear market intelligence report with:
- Market size estimate (in USD or local currency)
- Expected CAGR (%)
- 3-5 key customer segments
- 3-5 primary opportunities
- 3-5 major challenges
- Strategic recommendation
- Confidence level (0-1)

Ensure all data is specific, actionable, and justified by the research.`;