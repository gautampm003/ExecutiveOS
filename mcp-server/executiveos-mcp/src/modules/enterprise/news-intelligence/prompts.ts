// prompts.ts
/**
 * LLM Prompts for News Intelligence Analysis
 * Separates prompt engineering from business logic
 * Ready for Claude, GPT-4, or compatible models
 */

export const NEWS_INTELLIGENCE_SYSTEM_PROMPT = `You are a senior Business Intelligence analyst with 15+ years of experience in corporate strategic intelligence.

Your expertise includes:
- Business news analysis and interpretation
- Risk and opportunity assessment
- Regulatory environment monitoring
- Competitive intelligence
- Geopolitical impact analysis
- Market sentiment analysis
- Technology trend identification
- Executive decision support

You think strategically and provide intelligence that matters to C-suite executives.

Your analysis:
- Identifies significance, not just facts
- Determines executive relevance
- Assesses urgency and required action
- Evaluates threats and opportunities
- Provides actionable insights
- Uses clear, direct language
- Focuses on impact and implications

You avoid simply summarizing articles. Instead, you synthesize information into executive intelligence.`;

export const NEWS_INTELLIGENCE_USER_PROMPT = (
  company: string,
  industry: string,
  country: string,
  timeframe: string,
  focus: string | undefined
) => {
  const focusStatement = focus
    ? `\nSpecific focus areas: ${focus}`
    : "\nMonitor all relevant business developments.";

  return `Analyze recent business news for strategic intelligence:

Company: ${company}
Industry: ${industry}
Geographic focus: ${country}
Timeframe: Last ${timeframe}${focusStatement}

For each significant news event, determine:

1. **Why is this important?** - Strategic significance to ${company}
2. **Which executive should care?** - Relevant C-suite roles
3. **Is it an opportunity?** - Potential strategic advantage
4. **Is it a threat?** - Potential risk or competitive threat
5. **How urgent is it?** - Timeline for response (Immediate/Near-term/Ongoing)
6. **Should the board act?** - Required board-level decision or action

Please provide:

**Executive Summary**: 2-3 sentence briefing suitable for CEO

**Overall Sentiment**: Market sentiment toward ${company}'s industry (Positive/Neutral/Negative)

**Important Events**: Top 5-7 most significant news events with:
- Title
- Summary (2-3 sentences of strategic context)
- Category (Business/Technology/Regulation/Politics/Economy/Competition)
- Impact (Low/Medium/High)

**Opportunities**: 3-5 strategic opportunities for ${company} based on current market developments

**Risks**: 3-5 material risks or threats to ${company}'s business or industry

**Competitor News**: 2-4 significant announcements or moves by competitors

**Regulatory Updates**: 2-4 regulatory, legal, or policy changes affecting the industry

**Technology Trends**: 2-4 emerging technology trends relevant to ${industry}

**Recommended Actions**: 3-5 specific actions ${company} should consider based on news developments

Focus on strategic intelligence, not news summary.`;
};

export const NEWS_ANALYSIS_REFINEMENT_PROMPT = (
  company: string,
  industry: string,
  rawAnalysis: string
) => `You are a senior business intelligence analyst synthesizing news intelligence.

Based on recent news analysis for ${company} in ${industry}:

${rawAnalysis}

Please refine and structure this intelligence into:

1. **Executive Summary**: 2-3 sentences capturing key strategic implications
2. **Overall Sentiment**: Market sentiment (Positive/Neutral/Negative)
3. **Important Events**: Top 5-7 events with title, summary, category (Business/Technology/Regulation/Politics/Economy/Competition), and impact (Low/Medium/High)
4. **Opportunities**: 3-5 specific strategic opportunities
5. **Risks**: 3-5 material risks or threats
6. **Competitor News**: 2-4 competitor announcements with strategic implications
7. **Regulatory Updates**: 2-4 regulatory or policy changes
8. **Technology Trends**: 2-4 relevant technology trends
9. **Recommended Actions**: 3-5 specific board-level actions

Ensure all insights are specific, actionable, and suitable for executive presentation.`;

export const EVENT_CLASSIFICATION_PROMPT = (
  eventTitle: string,
  eventDescription: string
) => `Analyze this business news event for executive intelligence:

Title: ${eventTitle}
Description: ${eventDescription}

Determine:
1. Primary category: Business/Technology/Regulation/Politics/Economy/Competition
2. Impact level: Low/Medium/High
3. Sentiment: Positive/Neutral/Negative
4. Urgency: Low/Medium/High
5. Relevant executives: Which C-suite roles should be aware?
6. Opportunity: Is there a strategic opportunity here?
7. Threat: Is there a competitive or operational threat?
8. Required action: Does the board need to act?

Provide strategic context and implications.`;

export const SENTIMENT_ANALYSIS_PROMPT = (
  company: string,
  events: string[]
) => `Analyze overall market sentiment for ${company} based on these recent events:

${events.map((e, i) => `${i + 1}. ${e}`).join("\n")}

Determine:
1. Overall sentiment: Positive/Neutral/Negative
2. Confidence level: 0-1
3. Key sentiment drivers
4. Outlook: Is sentiment improving or deteriorating?`;