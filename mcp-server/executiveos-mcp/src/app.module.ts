import { McpApp, Module, ConfigModule } from '@nitrostack/core';
import { SystemHealthCheck } from './health/system.health.js';
import { BoardReportModule } from './modules/enterprise/board-report/board-report.module.js';
import { MeetingMinutesModule } from './modules/enterprise/meeting-minutes/meeting-minutes.module.js';
import { CompetitorScanModule } from './modules/enterprise/competitor-scan/competitor-scan.module.js';
import { MarketResearchModule } from './modules/enterprise/market-research/market-research.module.js';
import { NewsIntelligenceModule } from './modules/enterprise/news-intelligence/news-intelligence.module.js';
import { RiskMatrixModule } from './modules/enterprise/risk-matrix/risk-matrix.module.js';
import { SWOTModule } from './modules/enterprise/swot-generator/swot.module.js';
import { DecisionHistoryModule } from "./modules/enterprise/decision-history/decision-history.module.js";
import { ConfidenceAnalyzerModule } from "./modules/enterprise/confidence-analyzer/confidence-analyzer.module.js";
/**
 * Root Application Module
 * 
 * This is the main module that bootstraps the MCP server.
 * It registers all feature modules and health checks.
 */
@McpApp({
  module: AppModule,
  server: {
    name: 'executiveos-mcp',
    version: '1.0.0'
  },
  logging: {
    level: 'info'
  }
})
@Module({
  name: 'app',
  description: 'Root application module',
  imports: [
  ConfigModule.forRoot(),

  BoardReportModule,
  MeetingMinutesModule,
  CompetitorScanModule,
  MarketResearchModule,
  NewsIntelligenceModule,

  RiskMatrixModule,
  SWOTModule,
  DecisionHistoryModule,
  ConfidenceAnalyzerModule,
],
  providers: [
    // Health Checks
    SystemHealthCheck,
  ]
})
export class AppModule {}

