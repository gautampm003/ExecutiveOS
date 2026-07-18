import { Bell, Moon, User } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Header() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
      {/* Left */}
      <div>
        <h2 className="text-2xl font-bold text-white">ExecutiveOS</h2>
        <p className="text-sm text-muted-foreground">AI Executive Decision Operating System</p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        {/* Time */}
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Current Time</p>
          <p className="text-lg font-mono font-semibold text-primary">{time}</p>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-3 pl-6 border-l border-border">
          <button className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors">
            <Bell size={20} className="text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors">
            <Moon size={20} className="text-muted-foreground" />
          </button>
          <button className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <User size={20} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}
