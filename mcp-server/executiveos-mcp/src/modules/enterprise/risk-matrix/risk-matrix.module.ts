import { Module } from "@nitrostack/core";

import { RiskMatrixTools } from "./risk-matrix.tools.js";
import { RiskMatrixResources } from "./risk-matrix.resources.js";
import { RiskMatrixPrompts } from "./risk-matrix.prompts.js";

@Module({
  name: "risk-matrix",

  description: "Analyze business risks and generate a strategic risk matrix.",

  controllers: [
    RiskMatrixTools,
    RiskMatrixResources,
    RiskMatrixPrompts
  ]
})

export class RiskMatrixModule {}