import { Module } from "@nitrostack/core";

import { DecisionHistoryTools } from "./decision-history.tools.js";
import { DecisionHistoryResources } from "./decision-history.resources.js";
import { DecisionHistoryPrompts } from "./decision-history.prompts.js";

@Module({
  name: "decision-history",

  description:
    "Retrieve previous executive decisions and identify strategic patterns.",

  controllers: [
    DecisionHistoryTools,
    DecisionHistoryResources,
    DecisionHistoryPrompts
  ]
})

export class DecisionHistoryModule {}