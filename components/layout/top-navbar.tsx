'use client'

import { User } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'

export function TopNavbar() {
  const { currentUser } = useAuth()

  return (
    <header className="sticky top-0 z-30 w-full bg-card border-b border-border">
      <div className="h-16 px-4 md:px-8 flex items-center justify-between">
        {/* Left section - spacing for sidebar on desktop */}
        <div className="hidden md:block md:w-64" />

        {/* Right section - user profile */}
        <div className="flex items-center gap-4 ml-auto">
          {/* User Profile */}
          <div className="flex items-center gap-3 pl-3 border-l border-border">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">
                {currentUser?.fullName || 'Guest User'}
              </p>
              <p className="text-xs text-muted-foreground">Security Analyst</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
