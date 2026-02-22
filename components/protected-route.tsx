'use client'

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { AppLayout } from './layout/app-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiresDetection?: boolean
}

export function ProtectedRoute({ children, requiresDetection = false }: ProtectedRouteProps) {
  const { isAuthenticated, detectionComplete } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    if (requiresDetection && !detectionComplete) {
      router.push('/upload')
      return
    }
  }, [isAuthenticated, detectionComplete, requiresDetection, router])

  if (!isAuthenticated) {
    return null
  }

  if (requiresDetection && !detectionComplete) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="p-8 border-border bg-card max-w-md text-center">
            <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-amber-500" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Complete Upload First
            </h2>
            <p className="text-muted-foreground mb-6">
              You need to upload and complete anomaly detection before accessing this page.
            </p>
            <Button
              onClick={() => router.push('/upload')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
            >
              Go to Upload
            </Button>
          </Card>
        </div>
      </AppLayout>
    )
  }

  return <>{children}</>
}
