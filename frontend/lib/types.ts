export interface AnomalyScore {
  timestamp: string
  score: number
  severity: 'low' | 'medium' | 'high'
}

export interface PacketData {
  name: string
  value: number
  fill: string
}

export interface ResultsRow {
  id: string
  timestamp: string
  sourceIp: string
  destIp: string
  protocol: string
  status: 'normal' | 'anomaly' | 'suspicious'
  anomalyScore: number
}

export interface StatsData {
  totalPackets: number
  anomaliesDetected: number
  lastDetection: string
  modelAccuracy: number
}

export interface LiveUpdate {
  timestamp: string
  normalTraffic: number
  anomalousTraffic: number
  threatLevel: number
}

export interface UploadResponse {
  fileName: string
  status: 'processing' | 'complete' | 'error'
  anomaliesFound: number
  processingTime: number
  message: string
}
