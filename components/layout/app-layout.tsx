'use client'

import { ReactNode } from 'react'
import { Sidebar } from './sidebar'
import { TopNavbar } from './top-navbar'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-64">
        <TopNavbar />
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
