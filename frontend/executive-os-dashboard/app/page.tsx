'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import DecisionInputCard from '@/components/DecisionInputCard'
import ExecutiveBoard from '@/components/ExecutiveBoard'
import ExecutionGraph from '@/components/ExecutionGraph'
import KPIDashboard from '@/components/KPIDashboard'
import EvidenceTimeline from '@/components/EvidenceTimeline'
import ExecutiveModal from '@/components/ExecutiveModal'

export default function Page() {
  const [isExecuting, setIsExecuting] = useState(false)
  const [selectedExecutive, setSelectedExecutive] = useState<string | null>(null)
  const [decision, setDecision] = useState('')

  const handleStartMeeting = async (question: string) => {
  setDecision(question)
  setIsExecuting(true)

  try {
    const response = await fetch("http://localhost:8000/org/decision", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: question,
        context: {},
        required_roles: [
          "CEO",
          "CFO",
          "CTO",
          "CMO"
        ]
      }),
    })

    const data = await response.json()

    console.log("Backend Response:", data)

    alert(JSON.stringify(data, null, 2))
  } catch (err) {
    console.error(err)
    alert("Failed to contact backend.")
  }

  setIsExecuting(false)
}

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Dashboard Grid */}
        <div className="flex-1 overflow-hidden p-6">
          <div className="grid grid-cols-12 gap-6 h-full">
            {/* Left - Decision Input */}
            <div className="col-span-7 flex flex-col gap-6 overflow-y-auto">
              <DecisionInputCard 
                onStartMeeting={handleStartMeeting}
                isExecuting={isExecuting}
              />
              
              {isExecuting && (
                <>
                  <ExecutiveBoard onSelectExecutive={setSelectedExecutive} isExecuting={isExecuting} />
                  <ExecutionGraph />
                </>
              )}
            </div>

            {/* Right - KPI Dashboard & Timeline */}
            <div className="col-span-5 flex flex-col gap-6 overflow-y-auto">
              <KPIDashboard />
              <EvidenceTimeline isExecuting={isExecuting} />
            </div>
          </div>
        </div>
      </div>

      {/* Executive Modal */}
      {selectedExecutive && (
        <ExecutiveModal 
          executiveId={selectedExecutive}
          onClose={() => setSelectedExecutive(null)}
        />
      )}
    </div>
  )
}
