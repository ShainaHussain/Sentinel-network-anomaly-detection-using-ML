'use client'

import { ProtectedRoute } from '@/components/protected-route'
import { AppLayout } from '@/components/layout/app-layout'
import { StatsCard } from '@/components/dashboard/stats-card'
import { mockStatsData, mockAnomalyScores, mockPacketData, anomalyAlerts } from '@/lib/mock-data'
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { Card } from '@/components/ui/card'
import { Activity, AlertTriangle, TrendingUp, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const chartColors = {
  chart1: 'hsl(186 100% 50%)',
  chart2: 'hsl(164 100% 50%)',
}

export default function DashboardPage() {
  return (
    <ProtectedRoute requiresDetection={true}>
      <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Real-time network anomaly monitoring</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            icon={<Activity className="w-6 h-6" />}
            label="Total Packets"
            value={`${(mockStatsData.totalPackets / 1000000).toFixed(1)}M`}
            subtext="Analyzed today"
          />
          <StatsCard
            icon={<AlertTriangle className="w-6 h-6" />}
            label="Anomalies"
            value={mockStatsData.anomaliesDetected}
            subtext="Detected threats"
          />
          <StatsCard
            icon={<Zap className="w-6 h-6" />}
            label="Last Detection"
            value={mockStatsData.lastDetection}
            subtext="Most recent alert"
          />
          <StatsCard
            icon={<TrendingUp className="w-6 h-6" />}
            label="Accuracy"
            value={`${mockStatsData.modelAccuracy}%`}
            subtext="Model precision"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Anomaly Scores Chart */}
          <Card className="lg:col-span-2 p-6 border-border bg-card">
            <h2 className="text-lg font-semibold mb-4">Anomaly Scores Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockAnomalyScores}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 20%)" />
                <XAxis 
                  dataKey="timestamp" 
                  stroke="hsl(0 0% 50%)"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="hsl(0 0% 50%)"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(0 0% 10%)',
                    border: '1px solid hsl(0 0% 20%)',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke={chartColors.chart1}
                  strokeWidth={2}
                  dot={{ fill: chartColors.chart1, r: 4 }}
                  activeDot={{ r: 6 }}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Packet Distribution */}
          <Card className="p-6 border-border bg-card">
            <h2 className="text-lg font-semibold mb-4">Packet Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockPacketData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${(value / 1000).toFixed(0)}K`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockPacketData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(0 0% 10%)',
                    border: '1px solid hsl(0 0% 20%)',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => `${(value / 1000).toFixed(1)}K`}
                  labelStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent Alerts */}
        <Card className="p-6 border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Alerts</h2>
            <Badge variant="outline">Live</Badge>
          </div>
          <div className="space-y-3">
            {anomalyAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-border hover:border-primary/50 transition-colors"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    alert.severity === 'high'
                      ? 'bg-destructive animate-pulse'
                      : alert.severity === 'medium'
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
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
