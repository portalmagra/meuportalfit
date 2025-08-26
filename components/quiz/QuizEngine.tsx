// =============================================================================
// MEUPORTALFIT - ENGINE PRINCIPAL DO QUIZ
// =============================================================================

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/Card';
import { Button, PrimaryButton, OutlineButton } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { useToast } from '@/components/ui/Toast';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import type { 
  QuizConfig, 
  QuizSession, 
  QuizAnswer, 
  QuizStep, 
  QuizQuestion,
  QuizSessionStatus 
} from '@/types/quiz';
import type { UUID } from '@/types';

// -----------------------------------------------------------------------------
// INTERFACES
// -----------------------------------------------------------------------------
export interface QuizEngineProps {
  config: QuizConfig;
  onComplete: (session: QuizSession) => void;
  onAbandon?: (reason: string) => void;
  onStepChange?: (step: QuizStep, stepIndex: number) => void;
  className?: string;
  
  // Para retomar quiz existente
  existingSession?: Partial<QuizSession>;
  
  // Customizações
  showProgressBar?: boolean;
  showStepNumbers?: boolean;
  allowBackNavigation?: boolean;
  autoSave?: boolean;
}

export interface QuizState {
  currentStepIndex: number;
  currentStep: QuizStep;
  answers: Record<string, QuizAnswer>;
  completedSteps: string[];
  isLoading: boolean;
  error: string | null;
  session: QuizSession | null;
  startTime: Date;
  stepStartTime: Date;
}

// -----------------------------------------------------------------------------
// HOOKS PERSONALIZADOS
// -----------------------------------------------------------------------------
const useQuizState = (
  config: QuizConfig,
  existingSession?: Partial<QuizSession>
) => {
  const [state, setState] = React.useState<QuizState>(() => ({
    currentStepIndex: existingSession?.current_step_order || 0,
    currentStep: config.steps[existingSession?.current_step_order || 0],
    answers: existingSession?.answers || {},
    completedSteps: existingSession?.completed_steps || [],
    isLoading: false,
    error: null,
    session: null,
    startTime: new Date(),
    stepStartTime: new Date()
  }));

  // Getters derivados
  const progress = React.useMemo(() => ({
    current: state.currentStepIndex + 1,
    total: config.steps.length,
    percentage: Math.round(((state.currentStepIndex + 1) / config.steps.length) * 100),
    isComplete: state.currentStepIndex >= config.steps.length - 1
  }), [state.currentStepIndex, config.steps.length]);

  const canGoNext = React.useMemo(() => {
    const currentStep = state.currentStep;
    if (!currentStep) return false;

    // Verifica se todas as perguntas obrigatórias foram respondidas
    const requiredQuestions = currentStep.questions.filter(q => q.required);
    return requiredQuestions.every(question => {
      const answer = state.answers[question.id];
      return answer && answer.value !== undefined && answer.value !== '';
    });
  }, [state.currentStep, state.answers]);

  const canGoBack = React.useMemo(() => {
    return state.currentStepIndex > 0 && config.settings.allow_back_navigation;
  }, [state.currentStepIndex, config.settings.allow_back_navigation]);

  return {
    state,
    setState,
    progress,
    canGoNext,
    canGoBack
  };
};

const useQuizSession = () => {
  const { toast } = useToast();

  const createSession = React.useCallback(async (
    config: QuizConfig
  ): Promise<QuizSession> => {
    try {
      const response = await fetch('/api/quiz/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quiz_type: 'wellness',
          quiz_version: config.version
        })
      });

      if (!response.ok) {
        throw new Error('Falha ao iniciar quiz');
      }

      const data = await response.json();
      return data.session;
    } catch (error) {
      console.error('Error creating quiz session:', error);
      toast.error('Erro ao iniciar quiz. Tente novamente.');
      throw error;
    }
  }, [toast]);

  const saveSession = React.useCallback(async (
    sessionId: UUID,
    answers: Record<string, QuizAnswer>,
    currentStep: number
  ): Promise<void> => {
    try {
      const response = await fetch('/api/quiz/save', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          answers,
          currentStep,
          lastActivity: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Falha ao salvar progresso');
      }
    } catch (error) {
      console.error('Error saving quiz session:', error);
      // Não mostra erro para o usuário para não interromper o fluxo
    }
  }, []);

  const analyzeSession = React.useCallback(async (
    sessionId: UUID,
    answers: Record<string, QuizAnswer>
  ) => {
    try {
      const response = await fetch('/api/quiz/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          answers
        })
      });

      if (!response.ok) {
        throw new Error('Falha ao analisar respostas');
      }

      return await response.json();
    } catch (error) {
      console.error('Error analyzing quiz session:', error);
      toast.error('Erro ao processar suas respostas. Tente novamente.');
      throw error;
    }
  }, [toast]);

  return {
    createSession,
    saveSession,
    analyzeSession
  };
};

// -----------------------------------------------------------------------------
// COMPONENTE QUIZ ENGINE PRINCIPAL
// -----------------------------------------------------------------------------
const QuizEngine: React.FC<QuizEngineProps> = ({
  config,
  onComplete,
  onAbandon,
  onStepChange,
  className,
  existingSession,
  showProgressBar = true,
  showStepNumbers = true,
  allowBackNavigation = true,
  autoSave = true
}) => {
  const { state, setState, progress, canGoNext, canGoBack } = useQuizState(config, existingSession);
  const { createSession, saveSession, analyzeSession } = useQuizSession();
  const { toast } = useToast();
  
  // Auto-save timer
  const autoSaveTimer = React.useRef<NodeJS.Timeout>();

  // Inicialização da sessão
  React.useEffect(() => {
    const initializeSession = async () => {
      if (state.session) return;

      setState(prev => ({ ...prev, isLoading: true }));
      
      try {
        const session = await createSession(config);
        setState(prev => ({
          ...prev,
          session,
          isLoading: false
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: 'Erro ao inicializar quiz',
          isLoading: false
        }));
      }
    };

    initializeSession();
  }, [config, createSession, state.session]);

  // Auto-save das respostas
  React.useEffect(() => {
    if (!autoSave || !state.session) return;

    if (autoSaveTimer.current) {
      clearTimeout(autoSaveTimer.current);
    }

    autoSaveTimer.current = setTimeout(() => {
      saveSession(state.session!.id, state.answers, state.currentStepIndex);
    }, config.settings.auto_save_interval_ms);

    return () => {
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current);
      }
    };
  }, [state.answers, state.session, autoSave, config.settings.auto_save_interval_ms, saveSession, state.currentStepIndex]);

  // Callback quando step muda
  React.useEffect(() => {
    if (onStepChange) {
      onStepChange(state.currentStep, state.currentStepIndex);
    }
  }, [state.currentStep, state.currentStepIndex, onStepChange]);

  // Handler para responder pergunta
  const handleAnswerQuestion = React.useCallback((
    questionId: string,
    value: any,
    selectedOptions?: string[]
  ) => {
    const now = new Date();
    const timeSpent = Math.round((now.getTime() - state.stepStartTime.getTime()) / 1000);

    const answer: QuizAnswer = {
      question_id: questionId,
      step_id: state.currentStep.id,
      value,
      selected_options: selectedOptions,
      answered_at: now.toISOString(),
      time_spent_ms: timeSpent * 1000,
      attempts: state.answers[questionId]?.attempts || 0 + 1,
      skipped: false
    };

    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer
      }
    }));

    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'quiz_question_answered', {
        question_id: questionId,
        step_id: state.currentStep.id,
        value: typeof value === 'object' ? JSON.stringify(value) : value
      });
    }
  }, [state.currentStep, state.stepStartTime, state.answers]);

  // Handler para avançar step
  const handleNextStep = React.useCallback(async () => {
    if (!canGoNext) return;

    const nextStepIndex = state.currentStepIndex + 1;
    
    // Marca step atual como completo
    const completedSteps = [...state.completedSteps, state.currentStep.id];
    
    // Se chegou ao final, processa e completa o quiz
    if (nextStepIndex >= config.steps.length) {
      if (!state.session) return;

      setState(prev => ({ ...prev, isLoading: true }));

      try {
        // Analiza respostas e gera recomendações
        const analysisResult = await analyzeSession(state.session.id, state.answers);
        
        // Cria sessão completa
        const completedSession: QuizSession = {
          ...state.session,
          status: 'completed' as QuizSessionStatus,
          completed_at: new Date().toISOString(),
          current_step_order: nextStepIndex,
          total_steps: config.steps.length,
          completed_steps: completedSteps,
          answers: state.answers,
          total_time_ms: Date.now() - state.startTime.getTime()
        };

        // Track conclusão
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'quiz_completed', {
            session_id: state.session.id,
            total_time_seconds: Math.round((Date.now() - state.startTime.getTime()) / 1000),
            total_questions: Object.keys(state.answers).length
          });
        }

        onComplete(completedSession);
        toast.success('Quiz concluído! Gerando suas recomendações...');
        
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: 'Erro ao processar respostas',
          isLoading: false
        }));
      }
      return;
    }

    // Avança para próximo step
    const nextStep = config.steps[nextStepIndex];
    
    setState(prev => ({
      ...prev,
      currentStepIndex: nextStepIndex,
      currentStep: nextStep,
      completedSteps,
      stepStartTime: new Date()
    }));

    // Track step change
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'quiz_step_changed', {
        step_id: nextStep.id,
        step_index: nextStepIndex,
        direction: 'forward'
      });
    }
  }, [canGoNext, state, config.steps, analyzeSession, onComplete, toast]);

  // Handler para voltar step
  const handlePreviousStep = React.useCallback(() => {
    if (!canGoBack) return;

    const prevStepIndex = state.currentStepIndex - 1;
    const prevStep = config.steps[prevStepIndex];
    
    setState(prev => ({
      ...prev,
      currentStepIndex: prevStepIndex,
      currentStep: prevStep,
      stepStartTime: new Date()
    }));

    // Track step change
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'quiz_step_changed', {
        step_id: prevStep.id,
        step_index: prevStepIndex,
        direction: 'backward'
      });
    }
  }, [canGoBack, state.currentStepIndex, config.steps]);

  // Handler para pular step
  const handleSkipStep = React.useCallback(() => {
    if (!state.currentStep.skip_allowed) return;

    // Track skip
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'quiz_step_skipped', {
        step_id: state.currentStep.id,
        step_index: state.currentStepIndex
      });
    }

    handleNextStep();
  }, [state.currentStep, state.currentStepIndex, handleNextStep]);

  // Handler para abandonar quiz
  const handleAbandonQuiz = React.useCallback((reason: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'quiz_abandoned', {
        step_id: state.currentStep.id,
        step_index: state.currentStepIndex,
        reason,
        answers_count: Object.keys(state.answers).length
      });
    }

    onAbandon?.(reason);
  }, [state.currentStep, state.currentStepIndex, state.answers, onAbandon]);

  // Loading inicial
  if (state.isLoading && !state.session) {
    return (
      <div className={cn('flex items-center justify-center min-h-[400px]', className)}>
        <Loading 
          variant="spinner" 
          size="lg" 
          label="Inicializando quiz..." 
        />
      </div>
    );
  }

  // Estado de erro
  if (state.error) {
    return (
      <div className={cn('flex items-center justify-center min-h-[400px]', className)}>
        <Card className="max-w-md text-center">
          <CardContent className="pt-6">
            <div className="text-error-600 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Ops! Algo deu errado
            </h3>
            <p className="text-gray-600 mb-4">
              {state.error}
            </p>
            <Button onClick={() => window.location.reload()}>
              Tentar Novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn('max-w-4xl mx-auto space-y-6', className)}>
      {/* Progress Bar */}
      {showProgressBar && (
        <ProgressBar
          current={progress.current}
          total={progress.total}
          percentage={progress.percentage}
          showStepNumbers={showStepNumbers}
          steps={config.steps}
          currentStepIndex={state.currentStepIndex}
        />
      )}

      {/* Conteúdo Principal */}
      <AnimatePresence mode="wait">
        <motion.div
          key={state.currentStep.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card 
            className="bg-white shadow-quiz border-0"
            style={{ backgroundColor: state.currentStep.background_color }}
          >
            <CardContent className="p-8 space-y-6">
              {/* Header do Step */}
              <div className="text-center space-y-2">
                {state.currentStep.icon && (
                  <div className="text-4xl mb-4">
                    {/* Aqui você pode mapear ícones baseado no string */}
                    {state.currentStep.icon === 'welcome' && '🌟'}
                    {state.currentStep.icon === 'user' && '👤'}
                    {state.currentStep.icon === 'target' && '🎯'}
                    {state.currentStep.icon === 'activity' && '⚡'}
                    {state.currentStep.icon === 'heart' && '❤️'}
                    {state.currentStep.icon === 'settings' && '⚙️'}
                    {state.currentStep.icon === 'dollar-sign' && '💰'}
                    {state.currentStep.icon === 'check-circle' && '✅'}
                  </div>
                )}
                
                <h2 className="text-2xl font-bold text-gray-900">
                  {state.currentStep.title}
                </h2>
                
                {state.currentStep.subtitle && (
                  <p className="text-lg text-gray-600">
                    {state.currentStep.subtitle}
                  </p>
                )}
                
                {state.currentStep.description && (
                  <p className="text-sm text-gray-500 max-w-2xl mx-auto">
                    {state.currentStep.description}
                  </p>
                )}
              </div>

              {/* Perguntas do Step */}
              <div className="space-y-6">
                {state.currentStep.questions.map((question) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    value={state.answers[question.id]?.value}
                    selectedOptions={state.answers[question.id]?.selected_options}
                    onChange={(value, selectedOptions) => 
                      handleAnswerQuestion(question.id, value, selectedOptions)
                    }
                    disabled={state.isLoading}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navegação */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Botão Voltar */}
          {canGoBack && allowBackNavigation && (
            <OutlineButton
              onClick={handlePreviousStep}
              disabled={state.isLoading}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              }
            >
              Voltar
            </OutlineButton>
          )}
          
          {/* Botão Pular */}
          {state.currentStep.skip_allowed && (
            <OutlineButton
              onClick={handleSkipStep}
              disabled={state.isLoading}
              variant="ghost"
            >
              Pular esta etapa
            </OutlineButton>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Indicador de progresso textual */}
          <span className="text-sm text-gray-500">
            {progress.current} de {progress.total}
          </span>
          
          {/* Botão Próximo/Finalizar */}
          <PrimaryButton
            onClick={handleNextStep}
            disabled={!canGoNext || state.isLoading}
            loading={state.isLoading}
            rightIcon={
              progress.isComplete ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )
            }
          >
            {progress.isComplete ? 'Finalizar Quiz' : 'Próximo'}
          </PrimaryButton>
        </div>
      </div>

      {/* Botão de Abandono (discreto) */}
      <div className="text-center">
        <button
          onClick={() => handleAbandonQuiz('user_choice')}
          className="text-xs text-gray-400 hover:text-gray-600 underline"
        >
          Sair do quiz
        </button>
      </div>
    </div>
  );
};

export default QuizEngine;