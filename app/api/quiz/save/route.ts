// =============================================================================
// MEUPORTALFIT - API ROUTE: SALVAR PROGRESSO DO QUIZ
// =============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerSupabaseClient, trackUserEvent } from '@/lib/supabase';
import { generateUUID } from '@/lib/utils';
import type { QuizAnswer, APIResponse } from '@/types';

// -----------------------------------------------------------------------------
// INTERFACE DA REQUEST
// -----------------------------------------------------------------------------
interface SaveQuizRequest {
  sessionId: string;
  answers: Record<string, QuizAnswer>;
  currentStep: number;
  completedSteps?: string[];
  skippedSteps?: string[];
  lastActivity?: string;
  deviceInfo?: {
    screen_width?: number;
    screen_height?: number;
    viewport_width?: number;
    viewport_height?: number;
    timezone?: string;
  };
}

// -----------------------------------------------------------------------------
// PUT: SALVAR PROGRESSO
// -----------------------------------------------------------------------------
export async function PUT(request: NextRequest) {
  try {
    // Parse do body
    const body: SaveQuizRequest = await request.json();
    const {
      sessionId,
      answers,
      currentStep,
      completedSteps = [],
      skippedSteps = [],
      lastActivity,
      deviceInfo
    } = body;

    // Validações básicas
    if (!sessionId) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'MISSING_SESSION_ID',
          message: 'SessionId é obrigatório'
        }
      } satisfies APIResponse, { status: 400 });
    }

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json({
        success: false,
        error: {
          code: 'INVALID_ANSWERS',
          message: 'Respostas inválidas'
        }
      } satisfies APIResponse, { status: 400 });
    }

    const supabase = createRouteHandlerSupabaseClient();

    // 1. Verifica se a sessão existe
    const { data: existingSession, error: sessionError } = await supabase
      .from('quiz_sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (sessionError || !existingSession) {
      console.error('Session not found:', sessionError);
      return NextResponse.json({
        success: false,
        error: {
          code: 'SESSION_NOT_FOUND',
          message: 'Sessão do quiz não encontrada'
        }
      } satisfies APIResponse, { status: 404 });
    }

    // 2. Verifica se a sessão não está concluída
    if (existingSession.status === 'completed') {
      return NextResponse.json({
        success: false,
        error: {
          code: 'SESSION_COMPLETED',
          message: 'Esta sessão já foi concluída'
        }
      } satisfies APIResponse, { status: 400 });
    }

    // 3. Merge das respostas existentes com as novas
    const existingAnswers = existingSession.answers || {};
    const mergedAnswers = { ...existingAnswers, ...answers };

    // 4. Atualiza device info se fornecido
    let updatedDeviceInfo = existingSession.device_info || {};
    if (deviceInfo) {
      updatedDeviceInfo = { ...updatedDeviceInfo, ...deviceInfo };
    }

    // 5. Calcula estatísticas do progresso
    const totalAnswered = Object.keys(mergedAnswers).length;
    const progressPercentage = Math.round((currentStep / existingSession.total_steps) * 100);

    // 6. Determina status baseado no progresso
    let newStatus = existingSession.status;
    if (newStatus === 'created' && Object.keys(mergedAnswers).length > 0) {
      newStatus = 'in_progress';
    }

    // 7. Prepara dados para atualização
    const updateData = {
      answers: mergedAnswers,
      current_step: currentStep,
      completed_steps: completedSteps,
      skipped_steps: skippedSteps,
      last_activity_at: lastActivity || new Date().toISOString(),
      device_info: updatedDeviceInfo,
      status: newStatus,
      
      // Atualiza session_data com estatísticas
      session_data: {
        ...existingSession.session_data,
        total_answers: totalAnswered,
        progress_percentage: progressPercentage,
        last_save_at: new Date().toISOString()
      }
    };

    // 8. Executa a atualização
    const { data: updatedSession, error: updateError } = await supabase
      .from('quiz_sessions')
      .update(updateData)
      .eq('id', sessionId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating quiz session:', updateError);
      return NextResponse.json({
        success: false,
        error: {
          code: 'UPDATE_ERROR',
          message: 'Erro ao salvar progresso do quiz'
        }
      } satisfies APIResponse, { status: 500 });
    }

    // 9. Track evento de save (apenas a cada X saves para não sobrecarregar)
    const shouldTrackSave = totalAnswered % 3 === 0 || currentStep === existingSession.total_steps;
    
    if (shouldTrackSave) {
      await trackUserEvent(
        'quiz_progress_saved',
        {
          session_id: sessionId,
          current_step: currentStep,
          total_steps: existingSession.total_steps,
          progress_percentage: progressPercentage,
          total_answers: totalAnswered,
          completed_steps: completedSteps.length,
          skipped_steps: skippedSteps.length
        },
        existingSession.user_id || undefined,
        sessionId
      );
    }

    // 10. Resposta de sucesso
    const response: APIResponse = {
      success: true,
      data: {
        session_id: sessionId,
        updated_at: updatedSession.updated_at,
        status: updatedSession.status,
        progress: {
          current_step: currentStep,
          total_steps: existingSession.total_steps,
          percentage: progressPercentage,
          total_answers: totalAnswered,
          completed_steps: completedSteps.length,
          skipped_steps: skippedSteps.length
        }
      },
      meta: {
        timestamp: new Date().toISOString(),
        request_id: generateUUID(),
        processing_time_ms: 0
      }
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('Error in quiz save API:', error);
    
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
// GET: BUSCAR PROGRESSO ATUAL
// -----------------------------------------------------------------------------
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'MISSING_SESSION_ID',
          message: 'SessionId é obrigatório'
        }
      } satisfies APIResponse, { status: 400 });
    }

    const supabase = createRouteHandlerSupabaseClient();

    // Busca a sessão com progresso
    const { data: session, error: sessionError } = await supabase
      .from('quiz_sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (sessionError || !session) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'SESSION_NOT_FOUND',
          message: 'Sessão não encontrada'
        }
      } satisfies APIResponse, { status: 404 });
    }

    // Calcula estatísticas
    const totalAnswered = Object.keys(session.answers || {}).length;
    const progressPercentage = Math.round((session.current_step / session.total_steps) * 100);
    
    // Tempo decorrido desde o início
    const startTime = new Date(session.created_at).getTime();
    const now = Date.now();
    const elapsedMinutes = Math.round((now - startTime) / (1000 * 60));

    const response: APIResponse = {
      success: true,
      data: {
        session_id: sessionId,
        status: session.status,
        quiz_type: session.quiz_type,
        created_at: session.created_at,
        last_activity_at: session.last_activity_at,
        
        progress: {
          current_step: session.current_step,
          total_steps: session.total_steps,
          percentage: progressPercentage,
          total_answers: totalAnswered,
          completed_steps: session.completed_steps?.length || 0,
          skipped_steps: session.skipped_steps?.length || 0
        },
        
        timing: {
          elapsed_minutes: elapsedMinutes,
          estimated_remaining_minutes: Math.max(0, 5 - elapsedMinutes) // Quiz estimado em 5 min
        },
        
        answers: session.answers || {},
        device_info: session.device_info,
        utm_data: session.utm_data
      },
      meta: {
        timestamp: new Date().toISOString(),
        request_id: generateUUID(),
        processing_time_ms: 0
      }
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('Error fetching quiz progress:', error);
    
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
// DELETE: ABANDONAR QUIZ
// -----------------------------------------------------------------------------
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const reason = searchParams.get('reason') || 'user_choice';

    if (!sessionId) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'MISSING_SESSION_ID',
          message: 'SessionId é obrigatório'
        }
      } satisfies APIResponse, { status: 400 });
    }

    const supabase = createRouteHandlerSupabaseClient();

    // Verifica se a sessão existe
    const { data: session, error: sessionError } = await supabase
      .from('quiz_sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (sessionError || !session) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'SESSION_NOT_FOUND',
          message: 'Sessão não encontrada'
        }
      } satisfies APIResponse, { status: 404 });
    }

    // Atualiza sessão como abandonada
    const { error: updateError } = await supabase
      .from('quiz_sessions')
      .update({
        status: 'abandoned',
        abandonment_step: session.current_step,
        abandonment_reason: reason,
        last_activity_at: new Date().toISOString()
      })
      .eq('id', sessionId);

    if (updateError) {
      console.error('Error abandoning quiz session:', updateError);
      return NextResponse.json({
        success: false,
        error: {
          code: 'UPDATE_ERROR',
          message: 'Erro ao abandonar quiz'
        }
      } satisfies APIResponse, { status: 500 });
    }

    // Track evento de abandono
    await trackUserEvent(
      'quiz_abandoned',
      {
        session_id: sessionId,
        abandonment_step: session.current_step,
        abandonment_reason: reason,
        total_answers: Object.keys(session.answers || {}).length,
        progress_percentage: Math.round((session.current_step / session.total_steps) * 100),
        time_spent_minutes: Math.round((Date.now() - new Date(session.created_at).getTime()) / (1000 * 60))
      },
      session.user_id || undefined,
      sessionId
    );

    return NextResponse.json({
      success: true,
      data: {
        session_id: sessionId,
        status: 'abandoned',
        abandonment_reason: reason
      }
    } satisfies APIResponse, { status: 200 });

  } catch (error) {
    console.error('Error in quiz abandon API:', error);
    
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
 * Valida estrutura das respostas
 */
function validateAnswers(answers: Record<string, QuizAnswer>): boolean {
  try {
    for (const [questionId, answer] of Object.entries(answers)) {
      // Verifica propriedades obrigatórias
      if (!answer.question_id || !answer.step_id || !answer.answered_at) {
        console.error(`Invalid answer structure for question ${questionId}`);
        return false;
      }
      
      // Verifica se value não é undefined (pode ser null/empty string)
      if (answer.value === undefined) {
        console.error(`Missing value for question ${questionId}`);
        return false;
      }
      
      // Verifica tipos
      if (typeof answer.time_spent_ms !== 'number' || answer.time_spent_ms < 0) {
        console.error(`Invalid time_spent_ms for question ${questionId}`);
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error validating answers:', error);
    return false;
  }
}

/**
 * Sanitiza respostas removendo dados desnecessários
 */
function sanitizeAnswers(answers: Record<string, QuizAnswer>): Record<string, QuizAnswer> {
  const sanitized: Record<string, QuizAnswer> = {};
  
  for (const [questionId, answer] of Object.entries(answers)) {
    sanitized[questionId] = {
      question_id: answer.question_id,
      step_id: answer.step_id,
      value: answer.value,
      selected_options: answer.selected_options || [],
      other_text: answer.other_text,
      confidence_level: answer.confidence_level || 5,
      answered_at: answer.answered_at,
      time_spent_ms: Math.max(0, answer.time_spent_ms || 0),
      attempts: Math.max(1, answer.attempts || 1),
      skipped: Boolean(answer.skipped),
      device_type: answer.device_type,
      input_method: answer.input_method
    };
  }
  
  return sanitized;
}