'use client'

import Link from 'next/link'
import { ArrowRight, Shield, Zap, Eye, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'

export default function Home() {
  const { isAuthenticated, currentUser, logout } = useAuth()
  // Show different page for authenticated users
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-background overflow-hidden">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                <Shield className="w-5 h-5 text-gray-900" />
              </div>
              <span className="font-bold text-lg glow-neon-blue">SENTINEL</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground">Welcome, {currentUser?.fullName || 'User'}</p>
                <p className="text-xs text-muted-foreground">Security Analyst</p>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Welcome Section */}
        <section className="pt-32 pb-20 px-4 md:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance leading-tight">
              Welcome back, <span className="glow-neon-blue">{currentUser?.fullName?.split(' ')[0] || 'User'}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance max-w-3xl mx-auto">
              Continue with your cybersecurity analysis and threat detection.
            </p>

            {/* Quick Links */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/upload">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Analyze Data
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              {/* <Link href="/dashboard">
                <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10">
                  Go to Dashboard
                </Button>
              </Link> */}
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6 mt-20">
              {[
                {
                  icon: Eye,
                  title: 'Active Monitoring',
                  description: 'Real-time network analysis',
                },
                {
                  icon: Shield,
                  title: 'Advanced Protection',
                  description: 'ML-powered threat detection',
                },
                {
                  icon: Zap,
                  title: 'Instant Alerts',
                  description: 'Immediate threat notifications',
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-lg border border-border bg-card hover:bg-card/80 transition-all hover:glow-box-blue"
                >
                  <feature.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gradient Background Effects */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
              <Shield className="w-5 h-5 text-gray-900" />
            </div>
            <span className="font-bold text-lg glow-neon-blue">SENTINEL</span>
          </div>
          <Link href="/login">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Sign In
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/10">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">AI-Powered Detection System</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
            Detect Network
            <br />
            <span className="glow-neon-blue">Anomalies in Real-Time</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance max-w-3xl mx-auto">
            Advanced machine learning powered cybersecurity platform that identifies suspicious network behavior instantly, protecting your infrastructure from emerging threats.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/login">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-20">
            {[
              {
                icon: Eye,
                title: 'Real-Time Monitoring',
                description: 'Monitor network traffic 24/7 with AI-powered anomaly detection',
              },
              {
                icon: Shield,
                title: 'Advanced Protection',
                description: 'Identify threats before they impact your infrastructure',
              },
              {
                icon: Zap,
                title: 'Instant Alerts',
                description: 'Get notified immediately when anomalies are detected',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg border border-border bg-card hover:bg-card/80 transition-all hover:glow-box-blue"
              >
                <feature.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
      </div>
    </div>
  )
}
