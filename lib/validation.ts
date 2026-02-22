// Email validation
export const validateEmail = (email: string): { valid: boolean; error?: string } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!email) {
    return { valid: false, error: 'Email is required' }
  }
  
  if (email.length > 255) {
    return { valid: false, error: 'Email is too long' }
  }
  
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Please enter a valid email address' }
  }
  
  return { valid: true }
}

// Password strength validation
export const validatePassword = (password: string): { valid: boolean; error?: string; strength?: 'weak' | 'fair' | 'good' | 'strong' } => {
  if (!password) {
    return { valid: false, error: 'Password is required', strength: 'weak' }
  }
  
  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters long', strength: 'weak' }
  }
  
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  
  const strengthScore = [hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar].filter(Boolean).length
  
  let strength: 'weak' | 'fair' | 'good' | 'strong' = 'weak'
  if (strengthScore === 4) strength = 'strong'
  else if (strengthScore === 3) strength = 'good'
  else if (strengthScore === 2) strength = 'fair'
  
  if (strengthScore < 3) {
    return {
      valid: false,
      error: 'Password must contain uppercase, lowercase, number, and special character',
      strength,
    }
  }
  
  return { valid: true, strength }
}

// Full name validation
export const validateFullName = (name: string): { valid: boolean; error?: string } => {
  if (!name) {
    return { valid: false, error: 'Full name is required' }
  }
  
  if (name.length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters' }
  }
  
  if (name.length > 50) {
    return { valid: false, error: 'Name must be less than 50 characters' }
  }
  
  return { valid: true }
}

// Password confirmation validation
export const validatePasswordMatch = (password: string, confirmPassword: string): { valid: boolean; error?: string } => {
  if (!confirmPassword) {
    return { valid: false, error: 'Please confirm your password' }
  }
  
  if (password !== confirmPassword) {
    return { valid: false, error: 'Passwords do not match' }
  }
  
  return { valid: true }
}

// Simple hash function for demo (NOT production-grade)
export const hashPassword = (password: string): string => {
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16)
}

// Get password strength color
export const getPasswordStrengthColor = (strength: 'weak' | 'fair' | 'good' | 'strong'): string => {
  switch (strength) {
    case 'weak':
      return 'bg-destructive'
    case 'fair':
      return 'bg-yellow-500'
    case 'good':
      return 'bg-blue-500'
    case 'strong':
      return 'bg-green-500'
    default:
      return 'bg-gray-500'
  }
}

// Get password strength text
export const getPasswordStrengthText = (strength: 'weak' | 'fair' | 'good' | 'strong'): string => {
  switch (strength) {
    case 'weak':
      return 'Weak'
    case 'fair':
      return 'Fair'
    case 'good':
      return 'Good'
    case 'strong':
      return 'Strong'
    default:
      return 'Unknown'
  }
}
