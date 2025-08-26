// =============================================================================
// TIPOS ESSENCIAIS - MEUPORTALFIT
// =============================================================================

// QUIZ TYPES
export interface QuizQuestion {
  id: string
  text: string
  type: 'single' | 'multiple' | 'scale' | 'text'
  options?: string[]
  required: boolean
}

export interface QuizAnswer {
  questionId: string
  value: any
}

export interface QuizSession {
  id: string
  userId?: string
  startedAt: string
  completedAt?: string
  currentStep: number
  answers: Record<string, any>
}

// USER TYPES
export interface User {
  id: string
  email?: string
  name?: string
  createdAt: string
}

export interface UserProfile {
  age: number
  gender: 'male' | 'female' | 'other'
  goal: string
  activityLevel: string
  budgetRange: string
}

// PRODUCT TYPES
export interface AmazonProduct {
  id: string
  asin: string
  title: string
  description?: string
  price: number
  imageUrl: string
  affiliateUrl: string
  category: string
  rating?: number
  reviewCount?: number
}

// API TYPES
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}