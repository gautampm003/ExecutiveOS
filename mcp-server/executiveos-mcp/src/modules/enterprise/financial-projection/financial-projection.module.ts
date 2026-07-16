import { Module } from "@nitrostack/core";

import { FinancialProjectionTools } from "./financial-projection.tools.js";
import { FinancialProjectionResources } from "./financial-projection.resources.js";
import { FinancialProjectionPrompts } from "./financial-projection.prompts.js";

@Module({
  name: "financial-projection",

  description: "Generate financial projections for strategic business decisions.",

  controllers: [
    FinancialProjectionTools,
    FinancialProjectionResources,
    FinancialProjectionPrompts
  ]
})

export class FinancialProjectionModule {}