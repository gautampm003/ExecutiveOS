import { PromptDecorator as Prompt, ExecutionContext } from '@nitrostack/core';

export class NewsIntelligencePrompts {
  @Prompt({
    name: 'news_intelligence_guide',
    description: 'Get comprehensive guide for using News Intelligence analysis',
    arguments: [
      {
        name: 'focus_area',
        description: 'Specific area to get guidance on (optional)',
        required: false
      }
    ]
  })
  async getGuide(args: any, ctx: ExecutionContext) {
    ctx.logger.info('Generating news intelligence guide');

    const focusArea = args.focus_area?.toLowerCase();

    if (focusArea) {
      // Specific guidance
      const guidanceText = this.getFocusAreaGuidance(focusArea);
      return [
        {
          role: 'user' as const,
          content: `How do I use News Intelligence for ${focusArea}?`
        },
        {
          role: 'assistant' as const,
          content: guidanceText
        }
      ];
    }

    // General comprehensive guide
    return [
      {
        role: 'user' as const,
        content: 'How do I use News Intelligence for executive decision-making?'
      },
      {
        role: 'assistant' as const,
        content: `**News Intelligence - Executive Guide**

The News Intelligence tool analyzes recent business news to provide executive-level insights for strategic decision-making.

## Key Features

1. **Market Sentiment Analysis**
   - Comprehensive assessment of business environment (Positive/Neutral/Negative)
   - Factor analysis including regulatory risk, market trends, competition, economic conditions, and innovation

2. **Important Events Identification**
   - Categorized news events (Regulatory, Market, Economic, Technology, Geopolitical, ESG, Partnership)
   - Impact assessment (Low/Medium/High)
   - Executive summaries for board-level understanding

3. **Strategic Intelligence**
   - **Opportunities**: Growth areas, partnerships, market expansion, technology adoption
   - **Threats**: Competitive pressures, regulatory risks, supply chain issues, economic headwinds
   - **Regulatory Updates**: Compliance requirements, policy changes, antitrust reviews

4. **Competitive Analysis**
   - Competitor announcements and strategic moves
   - Market share changes
   - Industry trend analysis

5. **Technology Trends**
   - Emerging technology adoption
   - Industry disruption signals
   - Innovation opportunities

6. **Actionable Recommendations**
   - Executive-ready strategic recommendations
   - Risk mitigation strategies
   - Opportunity capture initiatives

## How to Use

1. **Define Scope**: Specify company name, industry, and country of interest
2. **Set Timeframe**: Choose 24h, 7d (default), or 30d for analysis period
3. **Analyze**: Tool gathers and synthesizes news from multiple sources
4. **Act**: Use insights to inform strategic decisions and board discussions

## Output Components

- **Executive Summary**: Single paragraph capturing key insights
- **Overall Sentiment**: Market environment assessment
- **Important Events**: Prioritized news with impact analysis
- **Opportunities & Threats**: Strategic analysis with examples
- **Regulatory Updates**: Compliance and policy changes
- **Competitor News**: Market competitive intelligence
- **Technology Trends**: Innovation and disruption signals
- **Recommended Actions**: Executive-ready strategies
- **Confidence Score**: Assessment quality indicator (0-1.0)

## Use Cases

- **Board Meetings**: Prepare with pre-analyzed market intelligence
- **Strategic Planning**: Identify opportunities and threats
- **Risk Management**: Detect emerging regulatory or competitive risks
- **Innovation Planning**: Track technology trends affecting your industry
- **Investor Relations**: Understand market perception and competitive position`
      }
    ];
  }

  @Prompt({
    name: 'executive_briefing_template',
    description: 'Generate executive briefing template for news intelligence',
    arguments: [
      {
        name: 'company',
        description: 'Company name for the briefing',
        required: false
      },
      {
        name: 'industry',
        description: 'Industry sector for context',
        required: false
      }
    ]
  })
  async getExecutiveBriefingTemplate(args: any, ctx: ExecutionContext) {
    ctx.logger.info('Generating executive briefing template');

    const company = args.company || '[Company Name]';
    const industry = args.industry || '[Industry Sector]';

    return [
      {
        role: 'user' as const,
        content: `Create an executive briefing template for ${company} in the ${industry} sector`
      },
      {
        role: 'assistant' as const,
        content: `**Executive Briefing: ${company}**
**${industry} Sector Intelligence**
**Prepared for: Board of Directors**

---

### MARKET OVERVIEW
**Overall Sentiment**: [Positive/Neutral/Negative]
**Confidence Level**: [X%]

[Executive summary paragraph capturing key insights and strategic implications]

---

### CRITICAL DEVELOPMENTS (This Period)
[List top 2-3 most impactful events with brief descriptions and impact levels]

**Priority Actions Required**: [Specific next steps if any critical items need immediate board attention]

---

### STRATEGIC OPPORTUNITIES
• [Opportunity 1 with growth potential]
• [Opportunity 2 with competitive advantage]
• [Opportunity 3 with market expansion potential]

**Recommended Initiatives**: [Specific actions to capture these opportunities]

---

### KEY RISKS & THREATS
• [Threat 1 with mitigation approach]
• [Threat 2 with contingency plan]
• [Threat 3 with monitoring strategy]

**Risk Mitigation**: [Comprehensive risk management approach]

---

### REGULATORY & COMPLIANCE LANDSCAPE
• [Active regulation or policy change affecting business]
• [Pending regulatory developments to monitor]
• [Compliance requirements timeline]

**Compliance Action Items**: [Required actions and responsible parties]

---

### COMPETITIVE POSITION
**Key Competitor Moves**: [Summary of significant competitor announcements]
**Market Share Implications**: [Strategic impact analysis]
**Differentiation Strategy**: [How to maintain competitive advantage]

---

### TECHNOLOGY & INNOVATION TRENDS
**Industry Trends**: [Key technology trends relevant to sector]
**Adoption Opportunities**: [Where to invest for competitive advantage]
**Disruption Signals**: [Emerging threats from new technologies or business models]

---

### RECOMMENDED STRATEGIC ACTIONS

**Immediate (0-30 days)**:
1. [Action with owner and success metrics]
2. [Action with owner and success metrics]

**Medium-term (30-90 days)**:
1. [Action with owner and success metrics]
2. [Action with owner and success metrics]

**Long-term (90+ days)**:
1. [Strategic initiative with objectives]
2. [Strategic initiative with objectives]

---

### NEXT BRIEFING
**Date**: [Specify next briefing date]
**Focus Areas**: [Preview of topics for next briefing]
**Key Metrics to Track**: [KPIs to monitor before next briefing]`
      }
    ];
  }

  @Prompt({
    name: 'risk_assessment_guide',
    description: 'Get guidance on assessing risks from news intelligence data',
    arguments: []
  })
  async getRiskAssessmentGuide(args: any, ctx: ExecutionContext) {
    ctx.logger.info('Generating risk assessment guide');

    return [
      {
        role: 'user' as const,
        content: 'How do I assess and prioritize risks from news intelligence?'
      },
      {
        role: 'assistant' as const,
        content: `**Risk Assessment Framework from News Intelligence**

## Risk Categories from News Data

### 1. **Regulatory & Compliance Risk**
**Indicators**:
- New legislation or policy proposals
- Enforcement actions or regulatory inquiries
- Regulatory body comments or guidance changes
- International regulatory coordination efforts

**Assessment**:
- **High Impact**: Direct business restrictions, material cost increases, operational barriers
- **Medium Impact**: Compliance requirements, monitoring obligations, reporting burden
- **Low Impact**: Minor requirement changes, future-dated rule changes

**Response Strategy**:
- Monitor pending regulations closely
- Engage with industry groups and policymakers
- Prepare compliance roadmaps
- Assess financial impact on operations

### 2. **Competitive Risk**
**Indicators**:
- Competitor acquisitions or partnerships
- New market entrants or disruptors
- Competitor product launches or innovations
- Market share shifts or consolidation

**Assessment**:
- **High Impact**: Direct market share loss, technology obsolescence, customer churn risk
- **Medium Impact**: Increased competitive intensity, pricing pressure, capability gaps
- **Low Impact**: Market rumors, indirect competitive activity

**Response Strategy**:
- Accelerate innovation initiatives
- Strengthen customer relationships
- Evaluate M&A opportunities
- Invest in differentiation

### 3. **Economic & Market Risk**
**Indicators**:
- Economic slowdown signals
- Currency or commodity fluctuations
- Interest rate changes
- Consumer confidence shifts
- Industry-specific market cycles

**Assessment**:
- **High Impact**: Revenue decline risk, margin compression, investment losses
- **Medium Impact**: Demand softening, cost pressure, capital availability constraints
- **Low Impact**: General economic commentary, early warning signals

**Response Strategy**:
- Diversify revenue streams
- Optimize cost structure
- Strengthen balance sheet
- Adjust pricing strategies

### 4. **Geopolitical & Supply Chain Risk**
**Indicators**:
- Trade policy changes or tariffs
- Sanctions or embargoes
- Political instability in key markets
- Supply chain disruptions
- Currency restrictions

**Assessment**:
- **High Impact**: Supply interruption, market access loss, regulatory violations
- **Medium Impact**: Increased costs, operational complexity, execution delays
- **Low Impact**: Nascent geopolitical tensions, early warning signals

**Response Strategy**:
- Diversify supplier base and manufacturing locations
- Hedge currency and commodity exposure
- Develop contingency plans
- Monitor geopolitical developments

### 5. **Technology & Innovation Risk**
**Indicators**:
- Disruptive technology breakthroughs
- Industry standard shifts
- Emerging technology adoption by competitors
- Cybersecurity threats
- Data privacy regulation changes

**Assessment**:
- **High Impact**: Technology obsolescence, business model disruption, security breaches
- **Medium Impact**: Capability gaps, investment requirements, competitive disadvantage
- **Low Impact**: Early-stage technology, low adoption probability

**Response Strategy**:
- Invest in R&D and innovation
- Monitor emerging technologies
- Build partnerships with tech leaders
- Strengthen cybersecurity posture

## Risk Prioritization Matrix

| Risk Type | Likelihood | Impact | Priority | Response Speed |
|-----------|-----------|--------|----------|-----------------|
| High likelihood + High impact | Track actively | Address immediately | Critical | Days |
| High likelihood + Medium impact | Monitor closely | Address proactively | High | Weeks |
| Medium likelihood + High impact | Scenario plan | Address strategically | High | Weeks |
| Others | Track peripherally | Address opportunistically | Standard | Months |

## Action Steps

1. **Identify**: Extract risks from news intelligence analysis
2. **Categorize**: Classify by risk type and business function
3. **Assess**: Evaluate likelihood and potential impact
4. **Prioritize**: Rank by urgency and materiality
5. **Respond**: Develop mitigation or response strategies
6. **Monitor**: Track risk indicators and strategy effectiveness
7. **Report**: Escalate material risks to board and executive leadership`
      }
    ];
  }

  private getFocusAreaGuidance(focusArea: string): string {
    const guidance: Record<string, string> = {
      'regulatory': `**News Intelligence for Regulatory Analysis**

Monitor regulatory developments affecting your business:

1. **Identify Changes**:
   - New legislation and policy proposals
   - Regulatory agency guidance and interpretations
   - Enforcement actions against competitors or industry
   - International regulatory developments

2. **Assess Impact**:
   - Direct applicability to your business model
   - Timeline for compliance requirements
   - Potential financial implications
   - Competitive impact (affects all or selective competitors)

3. **Strategic Response**:
   - Conduct compliance gap analysis
   - Prepare implementation roadmaps
   - Engage with regulators proactively
   - Coordinate with industry associations
   - Communicate to investors and stakeholders

4. **Key Metrics**:
   - Regulatory compliance status
   - Cost of compliance implementation
   - Timeline to full compliance
   - Risk of non-compliance penalties`,

      'competitive': `**News Intelligence for Competitive Analysis**

Track competitor activity and market dynamics:

1. **Monitor Competitor Moves**:
   - Strategic acquisitions and partnerships
   - Product launches and innovations
   - Market entry or exit decisions
   - Organizational changes (leadership, restructuring)
   - Financial performance and guidance

2. **Assess Competitive Threat**:
   - Direct competitive threat level
   - Impact on your market position
   - Capability gaps or advantages
   - Customer acquisition or retention risk
   - Pricing and profitability pressure

3. **Strategic Response**:
   - Accelerate differentiation initiatives
   - Strengthen customer relationships
   - Evaluate M&A opportunities
   - Invest in competitive advantages
   - Communicate strategy to stakeholders

4. **Key Metrics**:
   - Relative market share trends
   - Competitive win/loss analysis
   - Customer satisfaction vs. competitors
   - Technology and capability gaps`,

      'opportunity': `**News Intelligence for Opportunity Identification**

Identify and evaluate new business opportunities:

1. **Recognize Opportunities**:
   - Market expansion potential
   - New technology adoption
   - Strategic partnership possibilities
   - M&A targets or acquisition opportunities
   - Industry consolidation trends
   - Emerging customer needs

2. **Evaluate Opportunities**:
   - Strategic fit with core business
   - Market size and growth potential
   - Required investments and capabilities
   - Timeline to value creation
   - Risk and return profile

3. **Strategic Action**:
   - Conduct feasibility analysis
   - Develop business cases
   - Allocate resources for exploration
   - Build partnerships or capabilities
   - Execute opportunities aligned with strategy

4. **Success Metrics**:
   - Time to market
   - Revenue and profit impact
   - Strategic objective achievement
   - Synergy realization`,

      'technology': `**News Intelligence for Technology Trends**

Stay ahead of technology disruption:

1. **Track Trends**:
   - Emerging technology breakthroughs
   - Industry-wide adoption patterns
   - Competitor technology investments
   - Startup innovations and disruptions
   - Technology skill and talent availability

2. **Assess Impact**:
   - Relevance to your business model
   - Timeline to commercial viability
   - Investment requirements
   - Competitive implications
   - Risk of obsolescence

3. **Strategic Response**:
   - Evaluate technology adoption opportunities
   - Invest in R&D and innovation
   - Build partnerships with technology leaders
   - Develop talent strategies
   - Plan capability development

4. **Key Metrics**:
   - Technology readiness level
   - Investment in innovation
   - Time-to-adoption vs. competitors
   - Revenue from new technologies`
    };

    return guidance[focusArea] || `Guidance for "${focusArea}" area is not specifically defined. Please use the main news intelligence guide for general guidance on analyzing business news.`;
  }
}