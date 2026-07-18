'use client'

import { ArrowUpRight, ArrowDownRight, Target, TrendingUp, AlertCircle, Zap } from 'lucide-react'

interface KPICard {
  label: string
  value: string | number
  change?: number
  icon: React.ReactNode
  color: string
}

const kpis: KPICard[] = [
  {
    label: 'Overall Recommendation',
    value: 'Proceed',
    icon: <Target size={20} />,
    color: 'text-chart-2',
  },
  {
    label: 'Confidence Score',
    value: '87%',
    change: 12,
    icon: <TrendingUp size={20} />,
    color: 'text-primary',
  },
  {
    label: 'Risk Level',
    value: 'Medium',
    change: -5,
    icon: <AlertCircle size={20} />,
    color: 'text-chart-3',
  },
  {
    label: 'Estimated ROI',
    value: '35%',
    change: 8,
    icon: <Zap size={20} />,
    color: 'text-primary',
  },
  {
    label: 'Market Attractiveness',
    value: '8.2/10',
    icon: <TrendingUp size={20} />,
    color: 'text-chart-2',
  },
  {
    label: 'Decision Status',
    value: 'Analyzed',
    icon: <Target size={20} />,
    color: 'text-primary',
  },
]

export default function KPIDashboard() {
  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-white mb-4">Decision Dashboard</h3>

      <div className="grid grid-cols-2 gap-3">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="bg-secondary rounded-lg p-4 border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{kpi.label}</p>
              <div className={kpi.color}>{kpi.icon}</div>
            </div>

            {/* Value */}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{kpi.value}</span>
              {kpi.change !== undefined && (
                <span className={`text-xs font-medium flex items-center gap-1 ${
                  kpi.change >= 0 ? 'text-chart-2' : 'text-chart-4'
                }`}>
                  {kpi.change >= 0 ? (
                    <ArrowUpRight size={14} />
                  ) : (
                    <ArrowDownRight size={14} />
                  )}
                  {Math.abs(kpi.change)}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Stats */}
      <div className="mt-6 pt-6 border-t border-border space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Analysis Depth</span>
          <div className="flex gap-1">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full ${
                  i < 6 ? 'bg-primary' : 'bg-sidebar-accent'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Data Coverage</span>
          <span className="text-sm font-semibold text-primary">94%</span>
        </div>
      </div>
    </div>
  )
}
