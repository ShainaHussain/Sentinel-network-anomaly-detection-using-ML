'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { hashPassword } from '@/lib/validation'

interface User {
  email: string
  fullName: string
  hashedPassword: string
  createdAt: string
}

interface AuthContextType {
  isAuthenticated: boolean
  detectionComplete: boolean
  currentUser: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (fullName: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  markDetectionComplete: () => void
  resetDetection: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [detectionComplete, setDetectionComplete] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  // Restore auth state from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('auth_state')
    const savedUser = localStorage.getItem('currentUser')
    const savedDetection = localStorage.getItem('detection_complete')
    
    if (savedAuth && savedUser) {
      setIsAuthenticated(JSON.parse(savedAuth))
      setCurrentUser(JSON.parse(savedUser))
    }
    if (savedDetection) {
      setDetectionComplete(JSON.parse(savedDetection))
    }
  }, [])

  const signup = async (fullName: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate signup delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]') as User[]
    const userExists = users.some(u => u.email === email)
    
    if (userExists) {
      return { success: false, error: 'Email already registered. Please sign in instead.' }
    }
    
    // Create new user
    const newUser: User = {
      email,
      fullName,
      hashedPassword: hashPassword(password),
      createdAt: new Date().toISOString(),
    }
    
    // Save user to localStorage
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    
    return { success: true }
  }

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]') as User[]
    const user = users.find(u => u.email === email)
    
    if (!user) {
      return { success: false, error: 'Email not found. Please sign up first.' }
    }
    
    // Verify password
    const hashedPassword = hashPassword(password)
    if (user.hashedPassword !== hashedPassword) {
      return { success: false, error: 'Invalid password. Please try again.' }
    }
    
    // Login successful
    setIsAuthenticated(true)
    setCurrentUser(user)
    setDetectionComplete(false)
    localStorage.setItem('auth_state', JSON.stringify(true))
    localStorage.setItem('currentUser', JSON.stringify(user))
    localStorage.setItem('detection_complete', JSON.stringify(false))
    
    return { success: true }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setDetectionComplete(false)
    setCurrentUser(null)
    localStorage.removeItem('auth_state')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('detection_complete')
  }

  const markDetectionComplete = () => {
    setDetectionComplete(true)
    localStorage.setItem('detection_complete', JSON.stringify(true))
  }

  const resetDetection = () => {
    setDetectionComplete(false)
    localStorage.setItem('detection_complete', JSON.stringify(false))
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        detectionComplete,
        currentUser,
        login,
        signup,
        logout,
        markDetectionComplete,
        resetDetection,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
