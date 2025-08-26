import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// =============================================================================
// UTILITY FUNCTIONS - MEUPORTALFIT
// =============================================================================

// -----------------------------------------------------------------------------
// CLASS UTILITIES
// -----------------------------------------------------------------------------

/**
 * Combines class names with Tailwind merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// -----------------------------------------------------------------------------
// STRING UTILITIES
// -----------------------------------------------------------------------------

/**
 * Capitalize first letter of a string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Convert string to slug format
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Truncate string with ellipsis
 */
export function truncate(str: string, length: number = 100): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

// -----------------------------------------------------------------------------
// NUMBER UTILITIES
// -----------------------------------------------------------------------------

/**
 * Format currency to USD
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount)
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

/**
 * Calculate percentage
 */
export function calculatePercentage(part: number, total: number): number {
  if (total === 0) return 0
  return Math.round((part / total) * 100)
}

// -----------------------------------------------------------------------------
// DATE UTILITIES
// -----------------------------------------------------------------------------

/**
 * Format date to readable string
 */
export function formatDate(
  date: Date | string,
  locale: string = 'pt-BR',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, options).format(dateObj)
}

/**
 * Get relative time (e.g., "2 hours ago")
 */
export function getRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

  if (diffInSeconds < 60) return 'agora mesmo'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min atrás`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h atrás`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} dias atrás`
  
  return formatDate(dateObj)
}

// -----------------------------------------------------------------------------
// VALIDATION UTILITIES
// -----------------------------------------------------------------------------

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Check if string is empty or only whitespace
 */
export function isEmpty(str: string): boolean {
  return !str || str.trim().length === 0
}

// -----------------------------------------------------------------------------
// OBJECT UTILITIES
// -----------------------------------------------------------------------------

/**
 * Deep merge objects
 */
export function deepMerge<T extends Record<string, any>>(
  target: T,
  source: Partial<T>
): T {
  const result = { ...target }
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key])
    } else {
      result[key] = source[key] as T[Extract<keyof T, string>]
    }
  }
  
  return result
}

/**
 * Remove undefined values from object
 */
export function removeUndefined<T extends Record<string, any>>(obj: T): Partial<T> {
  const result: Partial<T> = {}
  
  for (const key in obj) {
    if (obj[key] !== undefined) {
      result[key] = obj[key]
    }
  }
  
  return result
}

// -----------------------------------------------------------------------------
// ARRAY UTILITIES
// -----------------------------------------------------------------------------

/**
 * Shuffle array randomly
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Remove duplicates from array
 */
export function removeDuplicates<T>(array: T[]): T[] {
  return Array.from(new Set(array))
}

/**
 * Chunk array into smaller arrays
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

// -----------------------------------------------------------------------------
// ASYNC UTILITIES
// -----------------------------------------------------------------------------

/**
 * Sleep for specified milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Retry async function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    if (retries === 0) throw error
    
    await sleep(delay)
    return retry(fn, retries - 1, delay * 2)
  }
}

// -----------------------------------------------------------------------------
// BROWSER UTILITIES
// -----------------------------------------------------------------------------

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    
    try {
      document.execCommand('copy')
      return true
    } catch {
      return false
    } finally {
      document.body.removeChild(textArea)
    }
  }
}

/**
 * Check if user is on mobile device
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

/**
 * Get user's preferred language
 */
export function getUserLanguage(): string {
  if (typeof window === 'undefined') return 'pt-BR'
  return navigator.language || 'pt-BR'
}

// -----------------------------------------------------------------------------
// STORAGE UTILITIES
// -----------------------------------------------------------------------------

/**
 * Safe localStorage getItem
 */
export function getLocalStorage(key: string, defaultValue: any = null): any {
  if (typeof window === 'undefined') return defaultValue
  
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

/**
 * Safe localStorage setItem
 */
export function setLocalStorage(key: string, value: any): boolean {
  if (typeof window === 'undefined') return false
  
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

/**
 * Remove item from localStorage
 */
export function removeLocalStorage(key: string): boolean {
  if (typeof window === 'undefined') return false
  
  try {
    localStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}

// -----------------------------------------------------------------------------
// QUIZ SPECIFIC UTILITIES
// -----------------------------------------------------------------------------

/**
 * Generate unique quiz session ID
 */
export function generateQuizSessionId(): string {
  return `quiz_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Calculate quiz progress percentage
 */
export function calculateQuizProgress(
  currentStep: number,
  totalSteps: number
): number {
  return Math.round((currentStep / totalSteps) * 100)
}

/**
 * Format quiz duration
 */
export function formatQuizDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  
  if (minutes === 0) return `${remainingSeconds}s`
  return `${minutes}m ${remainingSeconds}s`
}

// -----------------------------------------------------------------------------
// ERROR HANDLING UTILITIES
// -----------------------------------------------------------------------------

/**
 * Get error message from unknown error
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return 'Erro desconhecido'
}

/**
 * Log error with context
 */
export function logError(error: unknown, context?: Record<string, any>): void {
  console.error('Application Error:', {
    message: getErrorMessage(error),
    error,
    context,
    timestamp: new Date().toISOString(),
  })
}