export interface SWOTInput {
  company: string;
  industry: string;
  decision: string;
}

export interface SWOTOutput {
  company: string;
  industry: string;
  decision: string;

  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];

  executiveSummary: string;
  recommendation: string;
  confidence: number;
}