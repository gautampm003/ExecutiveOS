import { LayoutDashboard, GitBranch, FileText, Clock, BarChart3, Settings, Zap } from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Executive Board', active: true },
  { icon: GitBranch, label: 'Decisions' },
  { icon: FileText, label: 'Evidence' },
  { icon: Clock, label: 'History' },
  { icon: BarChart3, label: 'Reports' },
  { icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold text-white tracking-tight">ExecutiveOS</h1>
        <p className="text-xs text-muted-foreground mt-2">v1.0 Premium</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {navItems.map((item, idx) => {
            const Icon = item.icon
            return (
              <button
                key={idx}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  item.active
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-sidebar-border space-y-4">
        {/* Current Project */}
        <div className="bg-sidebar-accent rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-2">Current Project</p>
          <p className="text-sm font-medium text-foreground">Strategic Initiative 2026</p>
        </div>

        {/* System Status */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Zap size={14} className="text-chart-2" />
            <span>System Status</span>
          </div>
          <div className="flex gap-1">
            <div className="w-8 h-8 rounded-full bg-chart-2 flex items-center justify-center text-white text-xs font-bold opacity-80">✓</div>
            <div className="w-8 h-8 rounded-full bg-chart-2 flex items-center justify-center text-white text-xs font-bold opacity-80">✓</div>
            <div className="w-8 h-8 rounded-full bg-chart-2 flex items-center justify-center text-white text-xs font-bold opacity-80">✓</div>
          </div>
          <p className="text-xs text-chart-2 font-medium">All MCP tools connected</p>
        </div>
      </div>
    </div>
  )
}
