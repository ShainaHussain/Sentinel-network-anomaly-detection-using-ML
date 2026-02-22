'use client'

import { useState, useEffect } from 'react'
import { ProtectedRoute } from '@/components/protected-route'
import { AppLayout } from '@/components/layout/app-layout'
import { Card } from '@/components/ui/card'
import { generateLiveData } from '@/lib/mock-data'
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { Zap, Activity } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function LiveMonitoringPage() {
  const [liveData, setLiveData] = useState(generateLiveData())
  const [isAlertActive, setIsAlertActive] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(generateLiveData())
      // Randomly trigger alerts
      if (Math.random() > 0.7) {
        setIsAlertActive(true)
        setTimeout(() => setIsAlertActive(false), 2000)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const currentStats = liveData[liveData.length - 1]

  return (
    <ProtectedRoute requiresDetection={true}>
      <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Live Monitoring</h1>
            <p className="text-muted-foreground mt-1">Real-time network traffic analysis</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isAlertActive ? 'bg-destructive animate-pulse' : 'bg-green-500'}`} />
            <span className="text-sm font-medium">
              {isAlertActive ? 'Alert Active' : 'System Normal'}
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 border-border bg-card">
            <p className="text-sm text-muted-foreground mb-1">Normal Traffic</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-foreground">
                {(currentStats.normalTraffic / 1000).toFixed(1)}K
              </p>
              <p className="text-xs text-green-500">packets/min</p>
            </div>
          </Card>
          <Card className="p-4 border-border bg-card">
            <p className="text-sm text-muted-foreground mb-1">Anomalous Traffic</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-foreground">
                {(currentStats.anomalousTraffic / 1000).toFixed(1)}K
              </p>
              <p className="text-xs text-destructive">packets/min</p>
            </div>
          </Card>
          <Card className="p-4 border-border bg-card">
            <p className="text-sm text-muted-foreground mb-1">Threat Level</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-foreground">
                {(currentStats.threatLevel * 100).toFixed(0)}%
              </p>
              <p className={`text-xs ${
                currentStats.threatLevel > 0.5 ? 'text-destructive' : 'text-green-500'
              }`}>
                {currentStats.threatLevel > 0.5 ? 'HIGH' : 'LOW'}
              </p>
            </div>
          </Card>
        </div>

        {/* Live Chart */}
        <Card className="p-6 border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Traffic Analysis</h2>
            <Badge variant="outline" className="animate-pulse">
              <Zap className="w-3 h-3 mr-1" />
              Live
            </Badge>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={liveData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 20%)" />
              <XAxis
                dataKey="timestamp"
                stroke="hsl(0 0% 50%)"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="hsl(0 0% 50%)"
                style={{ fontSize: '12px' }}
                label={{ value: 'Packets/min', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(0 0% 10%)',
                  border: '1px solid hsl(0 0% 20%)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#fff' }}
                formatter={(value: number) => (value / 1000).toFixed(1) + 'K'}
              />
              <Legend />
              <Bar
                dataKey="normalTraffic"
                fill="hsl(164 100% 50%)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="anomalousTraffic"
                fill="hsl(0 84% 60%)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Alerts Section */}
        <Card className="p-6 border-border bg-card">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Recent Activity
          </h2>
          <div className="space-y-2">
            {[
              { time: '14:35:22', event: 'Spike in anomalous traffic detected', severity: 'high' },
              { time: '14:34:15', event: 'Port scanning activity on subnet 10.20.0.0/16', severity: 'medium' },
              { time: '14:33:08', event: 'DNS queries to suspicious domain blocked', severity: 'medium' },
              { time: '14:32:45', event: 'Normal traffic spike from scheduled backup', severity: 'low' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg bg-secondary/20 border border-border hover:border-primary/50 transition-colors"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    item.severity === 'high'
                      ? 'bg-destructive'
                      : item.severity === 'medium'
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.event}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* System Health */}
        <Card className="p-6 border-border bg-card">
          <h2 className="text-lg font-semibold mb-4">System Health</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'ML Model Status', status: 'Operational', color: 'green' },
              { label: 'Data Pipeline', status: 'Running', color: 'green' },
              { label: 'Database Sync', status: 'Healthy', color: 'green' },
              { label: 'Alert System', status: 'Active', color: 'green' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 border border-border">
                <span className="text-sm text-foreground">{item.label}</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    item.color === 'green' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                  <span className="text-sm font-medium text-foreground">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      </AppLayout>
    </ProtectedRoute>
  )
}
