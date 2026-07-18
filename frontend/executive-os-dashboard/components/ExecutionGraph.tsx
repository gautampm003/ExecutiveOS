'use client'

import { CheckCircle2, Circle } from 'lucide-react'
import { useEffect, useState } from 'react'

const stages = [
  { label: 'User Question', icon: '❓' },
  { label: 'CEO Delegation', icon: '📋' },
  { label: 'Parallel Analysis', icon: '⚡' },
  { label: 'Evidence Collection', icon: '📊' },
  { label: 'Conflict Resolution', icon: '🔄' },
  { label: 'Final Decision', icon: '✅' },
]

interface ExecutionGraphProps {
  // No props needed
}

export default function ExecutionGraph({}: ExecutionGraphProps) {
  const [activeStage, setActiveStage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-white mb-6">Execution Graph</h3>

      <div className="space-y-4">
        {stages.map((stage, idx) => {
          const isActive = idx <= activeStage
          const isCurrent = idx === activeStage
          
          return (
            <div key={idx}>
              {/* Stage */}
              <div className="flex items-center gap-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                  isActive 
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-sidebar-accent text-muted-foreground'
                }`}>
                  {stage.icon}
                </div>
                
                <div className="flex-1">
                  <p className={`font-medium transition-colors ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {stage.label}
                  </p>
                  {isCurrent && (
                    <div className="mt-1 h-1 bg-gradient-to-r from-primary to-transparent rounded-full w-32 animate-pulse" />
                  )}
                </div>

                {isActive && !isCurrent && (
                  <CheckCircle2 size={20} className="text-chart-2" />
                )}
              </div>

              {/* Connector */}
              {idx < stages.length - 1 && (
                <div className="ml-5 mt-2 pl-0">
                  <div className={`h-8 w-0.5 transition-all ${
                    idx < activeStage
                      ? 'bg-gradient-to-b from-chart-2 to-primary'
                      : idx === activeStage
                      ? 'bg-gradient-to-b from-primary to-sidebar-accent animate-pulse'
                      : 'bg-sidebar-accent'
                  }`} />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Progress Summary */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="w-full h-2 bg-sidebar-accent rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-chart-1 transition-all duration-500"
            style={{ width: `${((activeStage + 1) / stages.length) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-3 text-center">
          {activeStage + 1} of {stages.length} stages complete
        </p>
      </div>
    </div>
  )
}
