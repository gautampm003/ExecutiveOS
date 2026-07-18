'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface TimelineEvent {
  time: string
  executive: string
  avatar: string
  action: string
  expanded?: boolean
}

const sampleEvents: TimelineEvent[] = [
  { time: '09:41', executive: 'Chief Marketing Officer', avatar: '📈', action: 'Competitor Scan Completed', expanded: true },
  { time: '09:42', executive: 'Chief Risk Officer', avatar: '🛡️', action: 'Political Risk Analysis Finished', expanded: false },
  { time: '09:43', executive: 'CEO', avatar: '👔', action: 'Requested Financial Recalculation', expanded: false },
  { time: '09:44', executive: 'Chief Financial Officer', avatar: '💰', action: 'Revenue Projection Updated', expanded: false },
  { time: '09:45', executive: 'Chief Technology Officer', avatar: '⚙️', action: 'Infrastructure Assessment Done', expanded: false },
]

interface EvidenceTimelineProps {
  isExecuting: boolean
}

export default function EvidenceTimeline({ isExecuting }: EvidenceTimelineProps) {
  const [events, setEvents] = useState(sampleEvents)
  const [expandedIdx, setExpandedIdx] = useState(0)

  // Simulate new events coming in during execution
  useEffect(() => {
    if (!isExecuting) return

    const interval = setInterval(() => {
      setEvents((prev) => {
        const newEvent: TimelineEvent = {
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          executive: ['CEO', 'CFO', 'CTO', 'CMO', 'CRO', 'CLO'][Math.floor(Math.random() * 6)],
          avatar: ['👔', '💰', '⚙️', '📈', '🛡️', '⚖️'][Math.floor(Math.random() * 6)],
          action: [
            'Analysis Completed',
            'Report Generated',
            'Risk Assessment Done',
            'Market Data Collected',
            'Compliance Check Passed',
          ][Math.floor(Math.random() * 5)],
        }
        return [newEvent, ...prev.slice(0, 4)]
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [isExecuting])

  return (
    <div className="bg-card rounded-xl p-6 border border-border flex-1 flex flex-col">
      <h3 className="text-lg font-semibold text-white mb-4">Evidence Timeline</h3>

      <div className="space-y-0 flex-1 overflow-y-auto">
        {events.map((event, idx) => (
          <div key={idx} className="border-l-2 border-primary/30 hover:border-primary/60 transition-colors">
            {/* Timeline Item */}
            <div className="ml-4 pb-6 relative">
              {/* Timeline dot */}
              <div className="absolute -left-5 top-1 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50" />

              {/* Content */}
              <div
                onClick={() => setExpandedIdx(idx)}
                className="bg-secondary rounded-lg p-3 cursor-pointer hover:bg-secondary/80 transition-colors group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground font-mono">{event.time}</span>
                    <span className="text-lg">{event.avatar}</span>
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`text-muted-foreground transition-transform ${
                      expandedIdx === idx ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                <p className="text-sm font-medium text-foreground">{event.action}</p>
                <p className="text-xs text-muted-foreground mt-1">{event.executive}</p>

                {/* Expanded content */}
                {expandedIdx === idx && (
                  <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground space-y-1">
                    <p>✓ Data validation passed</p>
                    <p>✓ Cross-referenced with 12 sources</p>
                    <p>✓ Confidence: 92%</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State Message */}
      {!isExecuting && events.length === 0 && (
        <div className="flex items-center justify-center h-full text-center">
          <p className="text-muted-foreground text-sm">
            No board meeting started.<br />
            <span className="text-xs">Start a board meeting above to see evidence timeline</span>
          </p>
        </div>
      )}
    </div>
  )
}
