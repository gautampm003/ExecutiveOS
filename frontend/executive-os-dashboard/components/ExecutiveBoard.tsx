'use client'

import { useEffect, useState } from 'react'

interface Executive {
  id: string
  name: string
  role: string
  avatar: string
  status: 'waiting' | 'researching' | 'analyzing' | 'reasoning' | 'reviewing' | 'completed'
  progress: number
}

interface ExecutiveBoardProps {
  onSelectExecutive: (id: string) => void
  isExecuting: boolean
}

const statusColors: Record<string, string> = {
  waiting: 'bg-muted text-muted-foreground',
  researching: 'bg-chart-3 text-white',
  analyzing: 'bg-chart-1 text-white',
  reasoning: 'bg-chart-3 text-white',
  reviewing: 'bg-chart-1 text-white',
  completed: 'bg-chart-2 text-white',
}

const statusLabels: Record<string, string> = {
  waiting: 'Waiting',
  researching: 'Researching',
  analyzing: 'Analyzing',
  reasoning: 'Reasoning',
  reviewing: 'Reviewing',
  completed: 'Completed',
}

const initialExecutives: Executive[] = [
  { id: 'ceo', name: 'CEO', role: 'Chief Executive Officer', avatar: '👔', status: 'waiting', progress: 0 },
  { id: 'cfo', name: 'CFO', role: 'Chief Financial Officer', avatar: '💰', status: 'waiting', progress: 0 },
  { id: 'cto', name: 'CTO', role: 'Chief Technology Officer', avatar: '⚙️', status: 'waiting', progress: 0 },
  { id: 'cmo', name: 'CMO', role: 'Chief Marketing Officer', avatar: '📈', status: 'waiting', progress: 0 },
  { id: 'crro', name: 'Chief Risk Officer', role: 'Chief Risk Officer', avatar: '🛡️', status: 'waiting', progress: 0 },
  { id: 'clo', name: 'Chief Legal Officer', role: 'Chief Legal Officer', avatar: '⚖️', status: 'waiting', progress: 0 },
]

const statuses = ['waiting', 'researching', 'analyzing', 'reasoning', 'reviewing', 'completed'] as const

export default function ExecutiveBoard({ onSelectExecutive, isExecuting }: ExecutiveBoardProps) {
  const [boardMembers, setBoardMembers] = useState(initialExecutives)

  useEffect(() => {
    if (!isExecuting) {
      setBoardMembers(initialExecutives)
      return
    }

    // Animate executives through states
    const interval = setInterval(() => {
      setBoardMembers((prev) =>
        prev.map((member, idx) => {
          // Each executive has a staggered delay
          const timestamp = Date.now()
          const cycleTime = 1200 // Time for each status
          const staggerDelay = idx * 200
          const adjustedTime = (timestamp + staggerDelay) % (statuses.length * cycleTime)
          const statusIdx = Math.floor(adjustedTime / cycleTime)
          const newStatus = statuses[Math.min(statusIdx, statuses.length - 1)]

          return {
            ...member,
            status: newStatus as typeof member.status,
            progress: (statusIdx / statuses.length) * 100,
          }
        })
      )
    }, 300)

    return () => clearInterval(interval)
  }, [isExecuting])

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-white mb-4">Live Executive Execution</h3>
      
      <div className="grid grid-cols-3 gap-4">
        {boardMembers.map((executive) => (
          <button
            key={executive.id}
            onClick={() => onSelectExecutive(executive.id)}
            className="bg-secondary hover:bg-secondary/80 rounded-lg p-4 transition-all hover:border-primary/50 border border-border cursor-pointer group"
          >
            {/* Avatar */}
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{executive.avatar}</div>

            {/* Name & Role */}
            <h4 className="font-semibold text-white text-sm">{executive.name}</h4>
            <p className="text-xs text-muted-foreground mb-3">{executive.role}</p>

            {/* Status Badge */}
            <div className={`status-badge justify-center mb-3 ${statusColors[executive.status] || 'bg-muted text-muted-foreground'}`}>
              <div className={`w-2 h-2 rounded-full ${
                executive.status === 'completed' ? 'bg-current' : 'animate-pulse bg-current'
              }`} />
              <span>{statusLabels[executive.status] || 'Waiting'}</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-sidebar-accent rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${Math.min((executive.progress || 0) * 1.5, 100)}%` }}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
