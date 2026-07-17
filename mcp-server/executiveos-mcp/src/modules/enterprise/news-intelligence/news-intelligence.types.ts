/**
 * News Intelligence Module Type Definitions
 */

/**
 * Sentiment level for market assessment
 */
export type SentimentLevel = 'Positive' | 'Neutral' | 'Negative';

/**
 * Impact severity levels
 */
export type ImpactLevel = 'Low' | 'Medium' | 'High';

/**
 * Event categories in news intelligence
 */
export type EventCategory =
  | 'Regulatory'
  | 'Market'
  | 'Competitive'
  | 'Economic'
  | 'Technology'
  | 'Geopolitical'
  | 'ESG'
  | 'Partnership';

/**
 * Analysis timeframe
 */
export type TimeFrame = '24h' | '7d' | '30d';

/**
 * Executive summary with key insights
 */
export interface ExecutiveSummary {
  text: string;
  keyInsights: string[];
  recommendedActionCount: number;
  riskCount: number;
  opportunityCount: number;
}

/**
 * Detailed important event for executive review
 */
export interface DetailedEvent {
  title: string;
  summary: string;
  fullDescription?: string;
  category: EventCategory;
  impact: ImpactLevel;
  source?: string;
  date?: Date;
  relevantActors?: string[];
  linkedThreats?: string[];
  linkedOpportunities?: string[];
}

/**
 * Strategic opportunity with context
 */
export interface StrategicOpportunity {
  title: string;
  description: string;
  category: 'Market Expansion' | 'Partnership' | 'Technology' | 'Investment' | 'Strategic';
  timeframe: 'Short-term' | 'Medium-term' | 'Long-term';
  investmentRequired: ImpactLevel;
  expectedBenefit: string;
  requiredCapabilities?: string[];
  actionSteps?: string[];
  successCriteria?: string[];
}

/**
 * Business risk assessment
 */
export interface BusinessRisk {
  title: string;
  description: string;
  category:
    | 'Regulatory'
    | 'Competitive'
    | 'Economic'
    | 'Technology'
    | 'Geopolitical'
    | 'Operational';
  likelihood: ImpactLevel;
  potentialImpact: ImpactLevel;
  triggeringEvent?: string;
  earlyIndicators?: string[];
  mitigationStrategy: string;
  contingencyPlan?: string;
}

/**
 * Strategic recommendation for executives
 */
export interface StrategicRecommendation {
  action: string;
  rationale: string;
  expectedOutcome: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  timeframe: 'Immediate' | '1-3 months' | '3-6 months' | '6+ months';
  owner?: string;
  budget?: 'High' | 'Medium' | 'Low';
  successMetrics?: string[];
  risks?: string[];
  dependencies?: string[];
}

/**
 * Regulatory change with compliance implications
 */
export interface RegulatoryDevelopment {
  title: string;
  jurisdiction: string;
  description: string;
  applicability: 'Direct' | 'Indirect' | 'Monitoring';
  effectiveDate?: Date;
  complianceDeadline?: Date;
  implementationCost: ImpactLevel;
  complianceRequirements: string[];
  potentialPenalties?: string;
  industryImpact?: string;
}

/**
 * Competitive intelligence entry
 */
export interface CompetitiveIntelligence {
  competitorName: string;
  activity: string;
  activityType:
    | 'Acquisition'
    | 'Partnership'
    | 'Product Launch'
    | 'Investment'
    | 'Expansion'
    | 'Divestment'
    | 'Restructuring';
  announcementDate?: Date;
  marketImplications: string;
  directlyAffectsUs: boolean;
  competitiveResponse?: string;
  relatedCompetitors?: string[];
}

/**
 * Emerging technology or industry trend
 */
export interface IndustryTrend {
  trendName: string;
  description: string;
  adoptionStage: 'Emerging' | 'Early Adoption' | 'Growth' | 'Mature' | 'Declining';
  relevance: ImpactLevel;
  investmentPriority: ImpactLevel;
  timelineToAdoption: string;
  affectedBusinessAreas?: string[];
  competitiveImplications?: string;
  requiredInvestment?: 'High' | 'Medium' | 'Low';
}

/**
 * Comprehensive news intelligence analysis result
 */
export interface NewsIntelligenceResult {
  // Analysis context
  company: string;
  industry: string;
  country: string;
  timeframe: TimeFrame;
  analysisTimestamp: Date;

  // Executive level summary
  executiveSummary: string;
  overallSentiment: SentimentLevel;

  // Detailed intelligence
  importantEvents: DetailedEvent[];
  opportunities: StrategicOpportunity[];
  threats: BusinessRisk[];
  regulatoryUpdates: RegulatoryDevelopment[];
  competitorNews: CompetitiveIntelligence[];
  technologyTrends: IndustryTrend[];

  // Executive actions
  recommendedActions: StrategicRecommendation[];

  // Quality metrics
  confidence: number; // 0-1.0
  dataSourceCount?: number;
  eventCount?: number;
  coverageScore?: number;
}

/**
 * Analysis configuration options
 */
export interface AnalysisOptions {
  company: string;
  industry: string;
  country: string;
  timeframe?: TimeFrame;
  includeHistoricalContext?: boolean;
  includeCompetitorBenchmarking?: boolean;
  focusAreas?: EventCategory[];
  customSources?: string[];
  reportFormat?: 'executive' | 'detailed' | 'summary';
}

/**
 * Sentiment calculation factors
 */
export interface SentimentFactors {
  regulatoryRisk: number; // 0-1
  marketTrend: number; // 0-1
  competitionIntensity: number; // 0-1
  economicConditions: number; // 0-1
  innovationActivity: number; // 0-1
}

/**
 * Analysis metadata and quality info
 */
export interface AnalysisMetadata {
  analysisId: string;
  company: string;
  industry: string;
  country: string;
  timeframe: TimeFrame;
  analysisTimestamp: Date;
  dataSourceCount: number;
  eventCount: number;
  confidence: number;
  lastUpdated?: Date;
  nextRefresh?: Date;
  analysisVersion?: string;
  dataQualityScore?: number;
}

/**
 * News article or event source
 */
export interface NewsSource {
  title: string;
  url?: string;
  source: string;
  publishDate?: Date;
  content?: string;
  sentiment?: SentimentLevel;
  relevanceScore?: number;
}

/**
 * Alert or priority item for immediate attention
 */
export interface ExecutivePriorityAlert {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  priority: 'Critical' | 'High';
  impact: ImpactLevel;
  requiredAction: string;
  timelinessOfAction: 'Immediate' | 'Within 48 hours' | 'Within 1 week';
  owner?: string;
}

/**
 * Historical trend for comparative analysis
 */
export interface HistoricalTrend {
  metricName: string;
  currentValue: number;
  previousPeriodValue?: number;
  trendDirection: 'Up' | 'Down' | 'Stable';
  changePercentage?: number;
  timespan: string;
  context: string;
}

/**
 * Board briefing package combining all intelligence
 */
export interface BoardBriefingPackage {
  company: string;
  industry: string;
  preparedDate: Date;
  executiveSummary: string;
  overallSentiment: SentimentLevel;
  criticalAlerts: ExecutivePriorityAlert[];
  topOpportunities: StrategicOpportunity[];
  topThreats: BusinessRisk[];
  immediateActions: StrategicRecommendation[];
  strategicInitiatives: StrategicRecommendation[];
  complianceUpdates: RegulatoryDevelopment[];
  competitiveLandscape: CompetitiveIntelligence[];
  trendAnalysis: IndustryTrend[];
  quarterAheadOutlook?: string;
  confidence: number;
}