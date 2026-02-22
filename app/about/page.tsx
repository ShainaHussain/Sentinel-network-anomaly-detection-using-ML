'use client'

import { AppLayout } from '@/components/layout/app-layout'
import { Card } from '@/components/ui/card'
import { Brain, Shield, Zap, Users, GitBranch, Package } from 'lucide-react'


export default function AboutPage() {
  return (
    <AppLayout>
      <div className="space-y-12 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground">About SENTINEL</h1>
          <p className="text-xl text-muted-foreground mt-3">
            Advanced machine learning-powered cybersecurity platform for network anomaly detection
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="p-8 border-border bg-card glow-box-blue">
          <h2 className="text-2xl font-bold text-foreground mb-3">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            SENTINEL is dedicated to protecting critical infrastructure through cutting-edge machine learning and artificial intelligence. We empower security teams with real-time threat detection, enabling them to respond faster and more effectively to emerging cyber threats.
          </p>
        </Card>

        {/* Key Features */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: Brain,
                title: 'Advanced ML Models',
                description: 'State-of-the-art machine learning algorithms trained on millions of network patterns',
              },
              {
                icon: Zap,
                title: 'Real-Time Detection',
                description: 'Instant anomaly detection and alerting with sub-second latency',
              },
              {
                icon: Shield,
                title: 'Enterprise Security',
                description: 'Bank-grade encryption and security protocols for data protection',
              },
              {
                icon: Users,
                title: 'Easy Integration',
                description: 'Seamless integration with existing security infrastructure and tools',
              },
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <Card
                  key={idx}
                  className="p-6 border-border bg-card hover:bg-card/80 transition-all"
                >
                  <Icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Technology Stack</h2>
          <Card className="p-6 border-border bg-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-primary" />
                  Backend
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  {['Python 3.11', 'FastAPI', 'PostgreSQL', 'Redis', 'Kafka'].map((tech) => (
                    <li key={tech} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-accent" />
                  Frontend
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  {['Next.js 16', 'React 19', 'Tailwind CSS', 'TypeScript', 'Recharts'].map((tech) => (
                    <li key={tech} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* ML Model Info */}
        <Card className="p-8 border-border bg-card">
          <h2 className="text-2xl font-bold text-foreground mb-4">ML Model Information</h2>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Model Architecture</h4>
              <p className="text-muted-foreground">
                Our ensemble model combines LSTM neural networks, Isolation Forests, and Autoencoders
                to detect multiple types of anomalies with high accuracy across different network
                protocols and traffic patterns.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Training Data</h4>
              <p className="text-muted-foreground">
                Trained on 500M+ network packets from diverse enterprise environments, including
                normal traffic patterns and known attack signatures.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Performance Metrics</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex justify-between">
                  <span>Accuracy</span>
                  <span className="font-mono">98.7%</span>
                </li>
                <li className="flex justify-between">
                  <span>False Positive Rate</span>
                  <span className="font-mono">0.8%</span>
                </li>
                <li className="flex justify-between">
                  <span>Detection Latency</span>
                  <span className="font-mono">{"< 100ms"}</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Team Section */}
        {/* <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Dr. Sarah Chen',
                role: 'Chief ML Officer',
                bio: 'PhD in Machine Learning with 10+ years in cybersecurity',
              },
              {
                name: 'James Mitchell',
                role: 'CTO',
                bio: 'Former CISO at Fortune 500 tech company',
              },
              {
                name: 'Alex Rodriguez',
                role: 'VP Engineering',
                bio: 'Led distributed systems teams at major cloud providers',
              },
            ].map((member, idx) => (
              <Card
                key={idx}
                className="p-6 border-border bg-card text-center hover:bg-card/80 transition-all"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-sm text-primary mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div> */}

        {/* Contact Section */}
        {/* <Card className="p-8 border-border bg-card text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">Get in Touch</h2>
          <p className="text-muted-foreground mb-6">
            Have questions about SENTINEL? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:contact@sentinel.ai" className="text-primary hover:text-primary/80 transition-colors">
              contact@sentinel.ai
            </a>
            <span className="text-border">|</span>
            <a href="https://sentinel.ai" className="text-primary hover:text-primary/80 transition-colors">
              www.sentinel.ai
            </a>
          </div>
        </Card> */}
      </div>
    </AppLayout>
  )
}
