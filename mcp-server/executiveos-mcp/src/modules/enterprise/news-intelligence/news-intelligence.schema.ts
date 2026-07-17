import { z } from '@nitrostack/core';

/**
 * News Intelligence Input Schema
 */
export const NewsIntelligenceInputSchema = z.object({
  company: z.string().describe('Company name to analyze news for'),
  industry: z.string().describe('Industry sector (e.g., Technology, Finance, Healthcare)'),
  country: z.string().describe('Country or region of interest'),
  timeframe: z
    .enum(['24h', '7d', '30d'])
    .optional()
    .describe('Time period for news analysis (default: 7d)')
});

export type NewsIntelligenceInput = z.infer<typeof NewsIntelligenceInputSchema>;

/**
 * Important Event Type
 */
export const ImportantEventSchema = z.object({
  title: z.string().describe('Event title'),
  summary: z.string().describe('Concise event summary'),
  category: z
    .enum([
      'Regulatory',
      'Market',
      'Competitive',
      'Economic',
      'Technology',
      'Geopolitical',
      'ESG',
      'Partnership'
    ])
    .describe('Event category'),
  impact: z.enum(['Low', 'Medium', 'High']).describe('Impact level on business')
});

export type ImportantEvent = z.infer<typeof ImportantEventSchema>;

/**
 * News Intelligence Output Schema
 */
export const NewsIntelligenceOutputSchema = z.object({
  executiveSummary: z.string().describe('High-level executive summary of intelligence'),
  overallSentiment: z
    .enum(['Positive', 'Neutral', 'Negative'])
    .describe('Overall market sentiment assessment'),
  importantEvents: z
    .array(ImportantEventSchema)
    .describe('Array of important business events'),
  opportunities: z
    .array(z.string())
    .describe('List of identified business opportunities'),
  threats: z.array(z.string()).describe('List of identified business threats and risks'),
  regulatoryUpdates: z
    .array(z.string())
    .describe('List of regulatory changes and compliance updates'),
  competitorNews: z
    .array(z.string())
    .describe('List of competitor announcements and market activity'),
  technologyTrends: z
    .array(z.string())
    .describe('List of emerging technology trends'),
  recommendedActions: z
    .array(z.string())
    .describe('Executive-ready recommended strategic actions'),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe('Confidence score of analysis (0-1.0)')
});

export type NewsIntelligenceOutput = z.infer<typeof NewsIntelligenceOutputSchema>;

/**
 * Sentiment Factors Type
 */
export const SentimentFactorsSchema = z.object({
  regulatoryRisk: z.number().describe('Regulatory risk factor'),
  marketTrend: z.number().describe('Market trend factor'),
  competitionIntensity: z.number().describe('Competition intensity factor'),
  economicConditions: z.number().describe('Economic conditions factor'),
  innovationActivity: z.number().describe('Innovation activity factor')
});

export type SentimentFactors = z.infer<typeof SentimentFactorsSchema>;

/**
 * Analysis Context Type
 */
export const AnalysisContextSchema = z.object({
  company: z.string(),
  industry: z.string(),
  country: z.string(),
  timeframe: z.enum(['24h', '7d', '30d']),
  analysisDate: z.date().optional(),
  dataSource: z.string().optional(),
  analysisVersion: z.string().optional()
});

export type AnalysisContext = z.infer<typeof AnalysisContextSchema>;

/**
 * Opportunity Type
 */
export const OpportunitySchema = z.object({
  title: z.string().describe('Opportunity title'),
  description: z.string().describe('Detailed description'),
  category: z
    .enum(['Market Expansion', 'Partnership', 'Technology', 'Investment', 'Strategic'])
    .describe('Opportunity category'),
  timeframe: z.enum(['Short-term', 'Medium-term', 'Long-term']).describe('Expected timeframe'),
  investmentRequired: z.enum(['Low', 'Medium', 'High']).describe('Investment requirement level'),
  expectedReturn: z.string().optional().describe('Expected return or benefit')
});

export type Opportunity = z.infer<typeof OpportunitySchema>;

/**
 * Threat Type
 */
export const ThreatSchema = z.object({
  title: z.string().describe('Threat title'),
  description: z.string().describe('Detailed description'),
  category: z
    .enum([
      'Regulatory',
      'Competitive',
      'Economic',
      'Technology',
      'Geopolitical',
      'Operational'
    ])
    .describe('Threat category'),
  likelihood: z.enum(['Low', 'Medium', 'High']).describe('Likelihood of occurrence'),
  potentialImpact: z.enum(['Low', 'Medium', 'High']).describe('Potential impact if occurs'),
  mitigationStrategy: z.string().optional().describe('Recommended mitigation strategy')
});

export type Threat = z.infer<typeof ThreatSchema>;

/**
 * Recommendation Type
 */
export const RecommendationSchema = z.object({
  action: z.string().describe('Recommended action'),
  rationale: z.string().describe('Rationale for recommendation'),
  priority: z.enum(['Critical', 'High', 'Medium', 'Low']).describe('Action priority'),
  timeframe: z.enum(['Immediate', '1-3 months', '3-6 months', '6+ months']).describe('Implementation timeframe'),
  owner: z.string().optional().describe('Responsible party'),
  successMetric: z.string().optional().describe('How to measure success')
});

export type Recommendation = z.infer<typeof RecommendationSchema>;

/**
 * Analysis Metadata Type
 */
export const AnalysisMetadataSchema = z.object({
  analysisId: z.string().describe('Unique analysis identifier'),
  company: z.string(),
  industry: z.string(),
  country: z.string(),
  timeframe: z.enum(['24h', '7d', '30d']),
  analysisTimestamp: z.date().describe('When analysis was performed'),
  dataSourceCount: z.number().describe('Number of data sources analyzed'),
  eventCount: z.number().describe('Number of events identified'),
  confidence: z.number().min(0).max(1).describe('Overall confidence score'),
  lastUpdated: z.date().optional().describe('Last update timestamp'),
  nextRefresh: z.date().optional().describe('Recommended next refresh time')
});

export type AnalysisMetadata = z.infer<typeof AnalysisMetadataSchema>;

/**
 * Regulatory Update Type
 */
export const RegulatoryUpdateSchema = z.object({
  title: z.string().describe('Regulation or policy update title'),
  jurisdiction: z.string().describe('Country or region where regulation applies'),
  description: z.string().describe('Description of regulatory change'),
  applicability: z
    .enum(['Direct', 'Indirect', 'Monitoring'])
    .describe('How applicable to the business'),
  effectiveDate: z.string().optional().describe('When regulation becomes effective'),
  complianceDeadline: z.string().optional().describe('Compliance deadline'),
  implementationCost: z.enum(['Low', 'Medium', 'High']).optional().describe('Estimated implementation cost')
});

export type RegulatoryUpdate = z.infer<typeof RegulatoryUpdateSchema>;

/**
 * Competitor Activity Type
 */
export const CompetitorActivitySchema = z.object({
  competitorName: z.string().describe('Competitor company name'),
  activity: z.string().describe('Description of competitive activity'),
  activityType: z
    .enum([
      'Acquisition',
      'Partnership',
      'Product Launch',
      'Investment',
      'Expansion',
      'Divestment',
      'Restructuring'
    ])
    .describe('Type of competitive activity'),
  marketImplications: z.string().describe('Implications for your market position'),
  responseRecommendation: z.string().optional().describe('Recommended response strategy')
});

export type CompetitorActivity = z.infer<typeof CompetitorActivitySchema>;

/**
 * Technology Trend Type
 */
export const TechnologyTrendSchema = z.object({
  trendName: z.string().describe('Technology trend name'),
  description: z.string().describe('Description of the trend'),
  adoptionStage: z
    .enum(['Emerging', 'Early Adoption', 'Growth', 'Mature', 'Declining'])
    .describe('Current adoption stage'),
  relevance: z.enum(['High', 'Medium', 'Low']).describe('Relevance to your industry'),
  investmentPriority: z.enum(['High', 'Medium', 'Low']).describe('Investment priority'),
  timelineToAdoption: z.string().describe('Expected timeline for meaningful adoption'),
  strategicImplications: z.string().optional().describe('Strategic implications for business')
});

export type TechnologyTrend = z.infer<typeof TechnologyTrendSchema>;