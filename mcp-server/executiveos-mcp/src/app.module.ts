import { McpApp, Module, ConfigModule } from '@nitrostack/core';
import { CalculatorModule } from './modules/calculator/calculator.module.js';
import { SystemHealthCheck } from './health/system.health.js';
import { BoardReportModule } from './modules/enterprise/board-report/board-report.module.js';
import { MeetingMinutesModule } from './modules/enterprise/meeting-minutes/meeting-minutes.module.js';
import { CompetitorScanModule } from './modules/enterprise/competitor-scan/competitor-scan.module.js';
import { MarketResearchModule } from './modules/enterprise/market-research/market-research.module.js';
import { NewsIntelligenceModule } from './modules/enterprise/news-intelligence/news-intelligence.module.js';

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
  CalculatorModule,
  BoardReportModule,
  MeetingMinutesModule,
  CompetitorScanModule,
  MarketResearchModule,
  NewsIntelligenceModule,
],
  providers: [
    // Health Checks
    SystemHealthCheck,
  ]
})
export class AppModule {}

