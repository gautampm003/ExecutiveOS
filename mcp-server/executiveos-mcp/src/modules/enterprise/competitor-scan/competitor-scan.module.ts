import { Module } from '@nitrostack/core';
import { CompetitorScanTools } from './competitor-scan.tools.js';
import { CompetitorScanResources } from './competitor-scan.resources.js';

@Module({
  name: 'competitor-scan',
  description: 'Competitive landscape analysis and positioning tool for market strategy',
  controllers: [CompetitorScanTools, CompetitorScanResources],
})
export class CompetitorScanModule {}