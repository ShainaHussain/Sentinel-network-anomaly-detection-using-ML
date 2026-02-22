import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { AuthProvider } from '@/contexts/auth-context'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Network Anomaly Detection | Cybersecurity Dashboard',
  description: 'Advanced machine learning-powered cybersecurity dashboard for detecting network anomalies in real-time',
  // generator: 'v0.app',
  keywords: ['cybersecurity', 'anomaly detection', 'network monitoring', 'machine learning'],
}

export const viewport: Viewport = {
  themeColor: '#00d4ff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-background text-foreground">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
