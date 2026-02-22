import { AnomalyScore, PacketData, ResultsRow, StatsData, LiveUpdate } from './types'

export const mockStatsData: StatsData = {
  totalPackets: 1234567,
  anomaliesDetected: 324,
  lastDetection: '2 minutes ago',
  modelAccuracy: 98.7,
}

export const mockAnomalyScores: AnomalyScore[] = [
  { timestamp: '00:00', score: 15, severity: 'low' },
  { timestamp: '01:00', score: 22, severity: 'low' },
  { timestamp: '02:00', score: 18, severity: 'low' },
  { timestamp: '03:00', score: 35, severity: 'medium' },
  { timestamp: '04:00', score: 28, severity: 'low' },
  { timestamp: '05:00', score: 42, severity: 'medium' },
  { timestamp: '06:00', score: 38, severity: 'medium' },
  { timestamp: '07:00', score: 55, severity: 'high' },
  { timestamp: '08:00', score: 45, severity: 'medium' },
  { timestamp: '09:00', score: 32, severity: 'low' },
  { timestamp: '10:00', score: 48, severity: 'medium' },
  { timestamp: '11:00', score: 58, severity: 'high' },
  { timestamp: '12:00', score: 40, severity: 'medium' },
]

export const mockPacketData: PacketData[] = [
  { name: 'Normal', value: 89234, fill: '#00ffcc' },
  { name: 'Abnormal', value: 10766, fill: '#ff4444' },
]

export const mockResultsTable: ResultsRow[] = [
  {
    id: '1',
    timestamp: '2024-02-15 14:32:15',
    sourceIp: '192.168.1.100',
    destIp: '10.0.0.5',
    protocol: 'TCP',
    status: 'anomaly',
    anomalyScore: 0.87,
  },
  {
    id: '2',
    timestamp: '2024-02-15 14:30:42',
    sourceIp: '172.16.0.50',
    destIp: '8.8.8.8',
    protocol: 'UDP',
    status: 'normal',
    anomalyScore: 0.12,
  },
  {
    id: '3',
    timestamp: '2024-02-15 14:28:55',
    sourceIp: '192.168.1.75',
    destIp: '1.1.1.1',
    protocol: 'HTTPS',
    status: 'suspicious',
    anomalyScore: 0.62,
  },
  {
    id: '4',
    timestamp: '2024-02-15 14:27:30',
    sourceIp: '10.20.30.40',
    destIp: '192.168.0.1',
    protocol: 'SSH',
    status: 'anomaly',
    anomalyScore: 0.91,
  },
  {
    id: '5',
    timestamp: '2024-02-15 14:25:12',
    sourceIp: '172.31.0.100',
    destIp: '8.8.4.4',
    protocol: 'DNS',
    status: 'normal',
    anomalyScore: 0.08,
  },
  {
    id: '6',
    timestamp: '2024-02-15 14:23:45',
    sourceIp: '192.168.2.200',
    destIp: '10.0.0.10',
    protocol: 'TCP',
    status: 'suspicious',
    anomalyScore: 0.58,
  },
  {
    id: '7',
    timestamp: '2024-02-15 14:21:20',
    sourceIp: '10.50.60.70',
    destIp: '1.1.1.1',
    protocol: 'HTTP',
    status: 'normal',
    anomalyScore: 0.15,
  },
  {
    id: '8',
    timestamp: '2024-02-15 14:19:33',
    sourceIp: '172.20.0.80',
    destIp: '192.168.10.1',
    protocol: 'ICMP',
    status: 'anomaly',
    anomalyScore: 0.84,
  },
]

export const generateLiveData = (): LiveUpdate[] => {
  const now = new Date()
  const data: LiveUpdate[] = []

  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000)
    const baseNormal = 8500 + Math.random() * 2000
    const baseAnomaly = 500 + Math.random() * 1500

    // Add some anomalies periodically
    const hasAnomaly = Math.random() > 0.7
    const anomalyMultiplier = hasAnomaly ? 2 + Math.random() : 1

    data.push({
      timestamp: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      normalTraffic: Math.round(baseNormal),
      anomalousTraffic: Math.round(baseAnomaly * anomalyMultiplier),
      threatLevel: hasAnomaly ? 0.6 + Math.random() * 0.4 : Math.random() * 0.3,
    })
  }

  return data
}

export const anomalyAlerts = [
  {
    id: 1,
    time: '14:32 UTC',
    message: 'High anomaly score detected from 192.168.1.100',
    severity: 'high',
  },
  {
    id: 2,
    time: '14:28 UTC',
    message: 'Suspicious DNS activity on subnet 10.20.0.0/16',
    severity: 'medium',
  },
  {
    id: 3,
    time: '14:15 UTC',
    message: 'Port scanning detected on 172.16.0.0/12',
    severity: 'high',
  },
  {
    id: 4,
    time: '14:05 UTC',
    message: 'Unusual data transfer volume detected',
    severity: 'low',
  },
]
