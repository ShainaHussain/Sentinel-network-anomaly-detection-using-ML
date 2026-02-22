import { ReactNode } from 'react'
import { Card } from '@/components/ui/card'

interface StatsCardProps {
  icon: ReactNode
  label: string
  value: string | number
  subtext?: string
  trend?: 'up' | 'down'
}


export function StatsCard({ icon, label, value, subtext, trend }: StatsCardProps) {
  return (
    <Card className="p-6 border-border bg-card hover:bg-card/80 transition-all hover:glow-box-blue group cursor-default">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-2">{label}</p>
          <h3 className="text-3xl font-bold text-foreground mb-1">{value}</h3>
          {subtext && <p className="text-xs text-muted-foreground">{subtext}</p>}
        </div>
        <div className="text-2xl text-primary opacity-70 group-hover:opacity-100 transition-opacity">
          {icon}
        </div>
      </div>
    </Card>
  )
}
