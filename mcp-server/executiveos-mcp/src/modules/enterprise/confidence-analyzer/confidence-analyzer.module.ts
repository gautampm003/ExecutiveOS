import { Module } from "@nitrostack/core";

import { ConfidenceAnalyzerTools } from "./confidence-analyzer.tools.js";
import { ConfidenceAnalyzerResources } from "./confidence-analyzer.resources.js";
import { ConfidenceAnalyzerPrompts } from "./confidence-analyzer.prompts.js";

@Module({
  name: "confidence-analyzer",

  description:
    "Analyze strategic recommendations and generate executive confidence scores.",

  controllers: [
    ConfidenceAnalyzerTools,
    ConfidenceAnalyzerResources,
    ConfidenceAnalyzerPrompts
  ]
})

export class ConfidenceAnalyzerModule {}