'use client'

import { useState, useMemo } from 'react'
import { ProtectedRoute } from '@/components/protected-route'
import { AppLayout } from '@/components/layout/app-layout'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { mockResultsTable } from '@/lib/mock-data'
import { Search, Download } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function ResultsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'normal' | 'anomaly' | 'suspicious'>('all')
  const [sortBy, setSortBy] = useState<'timestamp' | 'anomalyScore'>('timestamp')

  const handleExportCSV = () => {
    // Prepare CSV headers
    const headers = ['Timestamp', 'Source IP', 'Destination IP', 'Protocol', 'Status', 'Anomaly Score']
    
    // Convert filtered data to CSV rows
    const rows = filteredData.map(row => [
      row.timestamp,
      row.sourceIp,
      row.destIp,
      row.protocol,
      row.status,
      (row.anomalyScore * 100).toFixed(2) + '%'
    ])
    
    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')
    
    // Create blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', `anomaly_detection_results_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredData = useMemo(() => {
    let filtered = mockResultsTable.filter(row => {
      const matchesSearch =
        row.sourceIp.includes(searchTerm) ||
        row.destIp.includes(searchTerm) ||
        row.protocol.includes(searchTerm)

      const matchesFilter = filterStatus === 'all' || row.status === filterStatus

      return matchesSearch && matchesFilter
    })

    if (sortBy === 'anomalyScore') {
      filtered.sort((a, b) => b.anomalyScore - a.anomalyScore)
    } else {
      filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    }

    return filtered
  }, [searchTerm, filterStatus, sortBy])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-500/20 text-green-500 border-green-500/30'
      case 'anomaly':
        return 'bg-destructive/20 text-destructive border-destructive/30'
      case 'suspicious':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30'
      default:
        return ''
    }
  }

  return (
    <ProtectedRoute requiresDetection={true}>
      <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analysis Results</h1>
          <p className="text-muted-foreground mt-1">
            Detailed network traffic analysis and anomaly detection results
          </p>
        </div>

        {/* Controls */}
        <Card className="p-4 border-border bg-card">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search IP, protocol..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-secondary/50 border-border"
              />
            </div>

            {/* Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 rounded-lg bg-secondary/50 border border-border text-foreground text-sm focus:outline-none focus:border-primary"
            >
              <option value="all">All Status</option>
              <option value="normal">Normal</option>
              <option value="anomaly">Anomaly</option>
              <option value="suspicious">Suspicious</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 rounded-lg bg-secondary/50 border border-border text-foreground text-sm focus:outline-none focus:border-primary"
            >
              <option value="timestamp">Latest First</option>
              <option value="anomalyScore">Highest Score</option>
            </select>
          </div>
        </Card>

        {/* Table */}
        <Card className="p-6 border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">
                    Timestamp
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">
                    Source IP
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">
                    Dest IP
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">
                    Protocol
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-muted-foreground">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredData.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-secondary/30 transition-colors border-border"
                  >
                    <td className="px-4 py-3 text-sm text-foreground">
                      {row.timestamp}
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-foreground">
                      {row.sourceIp}
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-foreground">
                      {row.destIp}
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">
                      <Badge variant="outline" className="font-mono">
                        {row.protocol}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Badge className={`capitalize ${getStatusColor(row.status)}`}>
                        {row.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-mono">
                      <span
                        className={`font-semibold ${
                          row.anomalyScore > 0.7
                            ? 'text-destructive'
                            : row.anomalyScore > 0.4
                            ? 'text-yellow-500'
                            : 'text-green-500'
                        }`}
                      >
                        {(row.anomalyScore * 100).toFixed(0)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No results found</p>
            </div>
          )}
        </Card>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Showing {filteredData.length} of {mockResultsTable.length} results
          </p>
          <Button 
            onClick={handleExportCSV}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>
      </AppLayout>
    </ProtectedRoute>
  )
}
