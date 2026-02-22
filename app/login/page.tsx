'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Shield, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/auth-context'
import { validateEmail } from '@/lib/validation'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target        
    setFormData(prev => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    
    // Validate email format
    const emailValidation = validateEmail(formData.email)
    if (!emailValidation.valid) {
      setError(emailValidation.error || 'Invalid email')
      setIsLoading(false)
      return
    }
    
    if (!formData.password) {
      setError('Password is required')
      setIsLoading(false)
      return
    }
    
    // Attempt login
    const result = await login(formData.email, formData.password)
    
    if (result.success) {
      // Redirect to upload page
      router.push('/upload')
    } else {
      setError(result.error || 'Login failed. Please try again.')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      {/* Background Glow Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
              <Shield className="w-7 h-7 text-gray-900" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 glow-neon-blue">SENTINEL</h1>
          <p className="text-muted-foreground">Cybersecurity Anomaly Detection Platform</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 flex items-gap-2">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive ml-2">{error}</p>
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              className="bg-secondary/50 border-border focus:glow-border-blue transition-all"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className="bg-secondary/50 border-border focus:glow-border-blue transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-6 glow-box-blue"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{' '}
          <Link href="/signup" className="text-primary hover:text-primary/80 transition-colors font-medium">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  )
}
