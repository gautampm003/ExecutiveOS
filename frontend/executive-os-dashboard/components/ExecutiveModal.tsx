'use client'

import { X } from 'lucide-react'

interface ExecutiveModalProps {
  executiveId: string
  onClose: () => void
}

const executiveDetails: Record<string, any> = {
  ceo: {
    name: 'Chief Executive Officer',
    role: 'Strategic Leadership',
    avatar: '👔',
    tools: ['Strategic Planning', 'Board Coordination', 'Stakeholder Management'],
    thoughts: 'The Indonesian market presents significant growth opportunities despite political risks. Recommend proceeding with phased expansion.',
    evidence: ['Market research: 450M population', 'Growth rate: 5.2% YoY', 'Tech adoption: 73%'],
    recommendation: 'Proceed with caution',
    confidence: 92,
  },
  cfo: {
    name: 'Chief Financial Officer',
    role: 'Financial Analysis',
    avatar: '💰',
    tools: ['Financial Modeling', 'Cash Flow Analysis', 'ROI Calculation'],
    thoughts: 'Financial projections show 35% ROI over 5 years. Initial investment: $12M. Payback period: 2.8 years.',
    evidence: ['Revenue forecast: $45M Y5', 'Operating margin: 28%', 'Break-even: Month 14'],
    recommendation: 'Financially viable',
    confidence: 88,
  },
  cto: {
    name: 'Chief Technology Officer',
    role: 'Technical Feasibility',
    avatar: '⚙️',
    tools: ['Infrastructure Assessment', 'Scalability Analysis', 'Tech Stack Review'],
    thoughts: 'Infrastructure requirements are well within current capabilities. Cloud deployment recommended.',
    evidence: ['Current capacity: 400%', 'Tech debt: Minimal', 'Migration time: 3 months'],
    recommendation: 'Technically ready',
    confidence: 95,
  },
  cmo: {
    name: 'Chief Marketing Officer',
    role: 'Market Analysis',
    avatar: '📈',
    tools: ['Competitor Analysis', 'Market Research', 'Brand Positioning'],
    thoughts: 'Strong market opportunity with 3 main competitors. Our differentiation strategy is compelling.',
    evidence: ['Market size: $28B', 'Competitors: 3 major', 'Market share potential: 12%'],
    recommendation: 'Strategically sound',
    confidence: 85,
  },
  crro: {
    name: 'Chief Risk Officer',
    role: 'Risk Management',
    avatar: '🛡️',
    tools: ['Risk Assessment', 'Compliance Check', 'Mitigation Planning'],
    thoughts: 'Political risk is medium-high. Regulatory environment requires careful navigation.',
    evidence: ['Political stability: 6/10', 'Regulatory clarity: 5/10', 'Mitigation strategies: 7 key'],
    recommendation: 'Risk manageable',
    confidence: 80,
  },
  clo: {
    name: 'Chief Legal Officer',
    role: 'Legal Compliance',
    avatar: '⚖️',
    tools: ['Legal Review', 'Compliance Verification', 'Contract Drafting'],
    thoughts: 'All regulatory requirements can be met. Local partnership recommended for operations.',
    evidence: ['Legal framework: Clear', 'Compliance cost: $2M', 'Timeline: 6 months'],
    recommendation: 'Legally compliant',
    confidence: 89,
  },
}

export default function ExecutiveModal({ executiveId, onClose }: ExecutiveModalProps) {
  const details = executiveDetails[executiveId]

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed right-0 top-0 bottom-0 w-96 bg-card border-l border-border shadow-2xl z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-secondary border-b border-border p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{details.avatar}</span>
            <div>
              <h2 className="font-bold text-white">{details.name}</h2>
              <p className="text-xs text-muted-foreground">{details.role}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Current Thoughts */}
          <div>
            <h3 className="text-sm font-semibold text-primary mb-2">Current Thoughts</h3>
            <p className="text-sm text-foreground leading-relaxed">{details.thoughts}</p>
          </div>

          {/* Assigned Tools */}
          <div>
            <h3 className="text-sm font-semibold text-primary mb-2">Assigned MCP Tools</h3>
            <div className="space-y-2">
              {details.tools.map((tool: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {tool}
                </div>
              ))}
            </div>
          </div>

          {/* Evidence */}
          <div>
            <h3 className="text-sm font-semibold text-primary mb-2">Evidence Used</h3>
            <div className="space-y-2">
              {details.evidence.map((evidence: string, idx: number) => (
                <div key={idx} className="text-xs bg-secondary rounded px-2 py-1 text-muted-foreground">
                  ✓ {evidence}
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-secondary rounded-lg p-3 space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Latest Recommendation</p>
              <p className="text-sm font-semibold text-primary">{details.recommendation}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Confidence</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-sidebar-accent rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-chart-2"
                    style={{ width: `${details.confidence}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-primary">{details.confidence}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-4 bg-secondary">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Close Panel
          </button>
        </div>
      </div>
    </>
  )
}
