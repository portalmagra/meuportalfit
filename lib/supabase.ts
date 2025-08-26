import { createClient } from '@supabase/supabase-js'

// Cliente básico Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Cliente para Server Components
export const createServerSupabaseClient = () => {
  return createClient(supabaseUrl, supabaseKey)
}

// Cliente para API Routes - FUNÇÃO QUE ESTÁ FALTANDO
export const createRouteHandlerSupabaseClient = () => {
  return createClient(supabaseUrl, supabaseKey)
}

// Função de tracking - FUNÇÃO QUE ESTÁ FALTANDO
export const trackUserEvent = async (eventType: string, eventData: any, userId?: string) => {
  console.log('Event tracked (placeholder):', { eventType, eventData, userId })
  return { success: true }
}

// Estimativa de tokens
export const estimateTokens = (text: string): number => {
  return Math.ceil(text.length / 4)
}

// Explicação personalizada (placeholder)
export const generatePersonalizedExplanation = async (profile: any, recommendations: any): Promise<string> => {
  return "Explicação personalizada será implementada em breve."
}

// Export default
export default supabase