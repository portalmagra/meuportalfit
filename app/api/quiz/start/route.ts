// =============================================================================
// MEUPORTALFIT - API ROUTE: INICIAR QUIZ
// =============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerSupabaseClient, trackUserEvent } from '@/lib/supabase';
import { generateUUID } from '@/lib/utils';
import type { QuizSession, APIResponse } from '@/types';

// -----------------------------------------------------------------------------
// INTERFACE DA REQUEST
// -----------------------------------------------------------------------------
interface StartQuizRequest {
  quiz_type: 'wellness' | 'fitness' | 'nutrition';
  quiz_version?: string;
  user_id?: string;
  utm_data?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
  };
  referrer?: string;
}

// -----------------------------------------------------------------------------
// POST: INICIAR NOVO QUIZ
// -----------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  try {
    // Parse do body
    const body: StartQuizRequest = await request.json();
    const {
      quiz_type = 'wellness',
      quiz_version = '1.0',
      user_id,
      utm_data,
      referrer
    } = body;

    // Validação básica
    if (!['wellness', 'fitness', 'nutrition'].includes(quiz_type)) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'INVALID_QUIZ_TYPE',
          message: 'Tipo de quiz inválido'
        }
      } satisfies APIResponse, { status: 400 });
    }

    // Cliente Supabase
    const supabase = createRouteHandlerSupabaseClient();

    // Dados da sessão
    const clientIP = request.ip || 
                    request.headers.get('x-forwarded-for')?.split(',')[0] || 
                    request.headers.get('x-real-ip') ||
                    '0.0.0.0';
    
    const userAgent = request.headers.get('user-agent') || '';
    const refererHeader = request.headers.get('referer') || referrer || '';

    // Detecta tipo de device
    const deviceType = detectDeviceType(userAgent);

    // Cria sessão no banco
    const sessionData = {
      user_id: user_id || null,
      quiz_type,
      quiz_version,
      status: 'created' as const,
      current_step: 1,
      total_steps: 8, // Baseado no nosso config
      answers: {},
      ip_address: clientIP,
      user_agent: userAgent,
      referrer: refererHeader,
      
      // Device info
      device_info: {
        type: deviceType,
        browser: detectBrowser(userAgent),
        browser_version: detectBrowserVersion(userAgent),
        os: detectOS(userAgent),
        screen_width: 0, // Será atualizado pelo client
        screen_height: 0,
        timezone: 'America/New_York', // Default
        language: 'pt-BR'
      },
      
      // UTM data
      utm_data: utm_data || {},
      
      // Session data
      session_data: {
        entry_page: refererHeader,
        referrer_domain: refererHeader ? new URL(refererHeader).hostname : null,
        total_page_views: 1,
        pages_visited: ['/quiz'],
        scroll_depth_max: 0,
        clicks_before_quiz: 0
      }
    };

    const { data: session, error: sessionError } = await supabase
      .from('quiz_sessions')
      .insert(sessionData)
      .select()
      .single();

    if (sessionError) {
      console.error('Error creating quiz session:', sessionError);
      return NextResponse.json({
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'Erro ao criar sessão do quiz'
        }
      } satisfies APIResponse, { status: 500 });
    }

    // Track evento de início
    await trackUserEvent(
      'quiz_started',
      {
        quiz_type,
        quiz_version,
        session_id: session.id,
        device_type: deviceType,
        referrer: refererHeader,
        utm_data
      },
      user_id || undefined,
      session.id
    );

    // Resposta de sucesso
    const response: APIResponse<QuizSession> = {
      success: true,
      data: {
        ...session,
        started_at: session.created_at,
        last_activity_at: session.created_at,
        completed_steps: [],
        skipped_steps: []
      },
      meta: {
        timestamp: new Date().toISOString(),
        request_id: generateUUID(),
        processing_time_ms: 0
      }
    };

    return NextResponse.json(response, { status: 201 });

  } catch (error) {
    console.error('Error in quiz start API:', error);
    
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Erro interno do servidor'
      }
    } satisfies APIResponse, { status: 500 });
  }
}

// -----------------------------------------------------------------------------
// GET: RETOMAR QUIZ EXISTENTE
// -----------------------------------------------------------------------------
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const userId = searchParams.get('userId');

    if (!sessionId && !userId) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'MISSING_PARAMETERS',
          message: 'SessionId ou userId são obrigatórios'
        }
      } satisfies APIResponse, { status: 400 });
    }

    const supabase = createRouteHandlerSupabaseClient();

    // Query para encontrar sessão
    let query = supabase
      .from('quiz_sessions')
      .select(`
        *,
        quiz_results (
          id,
          ai_analysis,
          created_at
        )
      `);

    if (sessionId) {
      query = query.eq('id', sessionId);
    } else if (userId) {
      query = query
        .eq('user_id', userId)
        .eq('status', 'in_progress')
        .order('created_at', { ascending: false })
        .limit(1);
    }

    const { data: sessions, error: sessionError } = await query;

    if (sessionError) {
      console.error('Error fetching quiz session:', sessionError);
      return NextResponse.json({
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'Erro ao buscar sessão do quiz'
        }
      } satisfies APIResponse, { status: 500 });
    }

    if (!sessions || sessions.length === 0) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'SESSION_NOT_FOUND',
          message: 'Sessão do quiz não encontrada'
        }
      } satisfies APIResponse, { status: 404 });
    }

    const session = sessions[0];

    // Se já tem resultados, redireciona
    if (session.quiz_results && session.quiz_results.length > 0) {
      return NextResponse.json({
        success: true,
        data: {
          ...session,
          has_results: true,
          result_id: session.quiz_results[0].id
        }
      } satisfies APIResponse, { status: 200 });
    }

    // Atualiza última atividade
    await supabase
      .from('quiz_sessions')
      .update({ 
        last_activity_at: new Date().toISOString(),
        status: 'in_progress'
      })
      .eq('id', session.id);

    // Track evento de retomada
    await trackUserEvent(
      'quiz_resumed',
      {
        session_id: session.id,
        quiz_type: session.quiz_type,
        current_step: session.current_step,
        answers_count: Object.keys(session.answers || {}).length
      },
      session.user_id || undefined,
      session.id
    );

    const response: APIResponse<QuizSession> = {
      success: true,
      data: {
        ...session,
        completed_steps: session.completed_steps || [],
        skipped_steps: session.skipped_steps || []
      },
      meta: {
        timestamp: new Date().toISOString(),
        request_id: generateUUID(),
        processing_time_ms: 0
      }
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('Error in quiz resume API:', error);
    
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Erro interno do servidor'
      }
    } satisfies APIResponse, { status: 500 });
  }
}

// -----------------------------------------------------------------------------
// UTILITY FUNCTIONS
// -----------------------------------------------------------------------------

/**
 * Detecta tipo de dispositivo baseado no User Agent
 */
function detectDeviceType(userAgent: string): 'mobile' | 'tablet' | 'desktop' | 'unknown' {
  if (!userAgent) return 'unknown';
  
  const ua = userAgent.toLowerCase();
  
  // Mobile
  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
    return 'mobile';
  }
  
  // Tablet
  if (ua.includes('tablet') || ua.includes('ipad')) {
    return 'tablet';
  }
  
  // Desktop (default)
  return 'desktop';
}

/**
 * Detecta browser baseado no User Agent
 */
function detectBrowser(userAgent: string): string {
  if (!userAgent) return 'unknown';
  
  const ua = userAgent.toLowerCase();
  
  if (ua.includes('chrome')) return 'Chrome';
  if (ua.includes('firefox')) return 'Firefox';
  if (ua.includes('safari')) return 'Safari';
  if (ua.includes('edge')) return 'Edge';
  if (ua.includes('opera')) return 'Opera';
  
  return 'Other';
}

/**
 * Detecta versão do browser
 */
function detectBrowserVersion(userAgent: string): string {
  if (!userAgent) return 'unknown';
  
  try {
    const ua = userAgent.toLowerCase();
    
    // Chrome
    if (ua.includes('chrome')) {
      const match = ua.match(/chrome\/(\d+\.?\d*)/);
      return match ? match[1] : 'unknown';
    }
    
    // Firefox
    if (ua.includes('firefox')) {
      const match = ua.match(/firefox\/(\d+\.?\d*)/);
      return match ? match[1] : 'unknown';
    }
    
    // Safari
    if (ua.includes('safari') && !ua.includes('chrome')) {
      const match = ua.match(/version\/(\d+\.?\d*)/);
      return match ? match[1] : 'unknown';
    }
    
    return 'unknown';
  } catch (error) {
    return 'unknown';
  }
}

/**
 * Detecta sistema operacional
 */
function detectOS(userAgent: string): string {
  if (!userAgent) return 'unknown';
  
  const ua = userAgent.toLowerCase();
  
  if (ua.includes('windows')) return 'Windows';
  if (ua.includes('mac os')) return 'macOS';
  if (ua.includes('linux')) return 'Linux';
  if (ua.includes('android')) return 'Android';
  if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) return 'iOS';
  
  return 'Other';
}

// -----------------------------------------------------------------------------
// RATE LIMITING (simples por IP)
// -----------------------------------------------------------------------------
const requestCounts = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, maxRequests = 10, windowMinutes = 5): boolean {
  const now = Date.now();
  const windowMs = windowMinutes * 60 * 1000;
  
  const record = requestCounts.get(ip);
  
  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= maxRequests) {
    return false;
  }
  
  record.count++;
  return true;
}