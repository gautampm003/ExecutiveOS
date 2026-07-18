'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

interface DecisionInputCardProps {
  onStartMeeting: (question: string) => void
  isExecuting: boolean
}

export default function DecisionInputCard({ onStartMeeting, isExecuting }: DecisionInputCardProps) {
  const [question, setQuestion] = useState('')

  const handleSubmit = () => {
    if (question.trim()) {
      onStartMeeting(question)
      setQuestion('')
    }
  }

  const examples = [
    'Should our EV startup expand into Indonesia?',
    'Is now the right time to acquire our competitor?',
    'Should we pivot to B2B market?'
  ]

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all">
      <h3 className="text-lg font-semibold text-white mb-4">Decision Input</h3>
      
      {/* Text Area */}
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.ctrlKey && !isExecuting) {
            handleSubmit()
          }
        }}
        placeholder="Ask the Executive Board..."
        disabled={isExecuting}
        className="w-full h-32 bg-secondary rounded-lg p-4 text-foreground placeholder-muted-foreground border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none transition-all disabled:opacity-50"
      />

      {/* Examples */}
      {!isExecuting && (
        <div className="mt-4 space-y-2">
          <p className="text-xs text-muted-foreground">Examples:</p>
          <div className="flex gap-2 flex-wrap">
            {examples.map((example, idx) => (
              <button
                key={idx}
                onClick={() => setQuestion(example)}
                className="text-xs bg-sidebar-accent px-3 py-1 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors text-muted-foreground"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Button */}
      <button
        onClick={handleSubmit}
        disabled={!question.trim() || isExecuting}
        className="w-full mt-6 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
      >
        {isExecuting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Board Meeting in Progress...
          </>
        ) : (
          <>
            Start Board Meeting
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </div>
  )
}
