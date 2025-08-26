// =============================================================================
// MEUPORTALFIT - TIPOS ESPECÍFICOS DO QUIZ
// =============================================================================

import { UUID, Timestamp, JSONValue } from './index';

// -----------------------------------------------------------------------------
// ENUMS DO QUIZ
// -----------------------------------------------------------------------------
export enum QuizStepType {
  WELCOME = 'welcome',
  DEMOGRAPHIC = 'demographic', 
  GOALS = 'goals',
  LIFESTYLE = 'lifestyle',
  HEALTH = 'health',
  PREFERENCES = 'preferences',
  BUDGET = 'budget',
  SUMMARY = 'summary',
  RESULTS = 'results'
}

export enum QuestionType {
  SINGLE_CHOICE = 'single-choice',
  MULTIPLE_CHOICE = 'multiple-choice',
  RANGE_SLIDER = 'range-slider',
  TEXT_INPUT = 'text-input',
  EMAIL_INPUT = 'email-input',
  RATING_SCALE = 'rating-scale',
  BOOLEAN_TOGGLE = 'boolean-toggle',
  IMAGE_SELECTION = 'image-selection',
  BUDGET_RANGE = 'budget-range'
}

export enum GoalType {
  WEIGHT_LOSS = 'weight-loss',
  MUSCLE_GAIN = 'muscle-gain',
  GENERAL_HEALTH = 'general-health',
  ENERGY_BOOST = 'energy-boost',
  STRESS_MANAGEMENT = 'stress-management',
  SLEEP_IMPROVEMENT = 'sleep-improvement',
  IMMUNE_SUPPORT = 'immune-support',
  DIGESTIVE_HEALTH = 'digestive-health',
  SKIN_BEAUTY = 'skin-beauty',
  PERFORMANCE = 'performance'
}

export enum LifestyleType {
  SEDENTARY = 'sedentario',
  LIGHTLY_ACTIVE = 'levemente-ativo',
  MODERATELY_ACTIVE = 'moderadamente-ativo',
  VERY_ACTIVE = 'muito-ativo',
  EXTREMELY_ACTIVE = 'extremamente-ativo'
}

export enum BudgetRange {
  UNDER_50 = 'ate-50',
  RANGE_50_100 = '50-100',
  RANGE_100_200 = '100-200',
  RANGE_200_500 = '200-500',
  OVER_500 = 'acima-500'
}

// -----------------------------------------------------------------------------
// INTERFACES PRINCIPAIS DO QUIZ
// -----------------------------------------------------------------------------
export interface QuizConfig {
  id: string;
  version: string;
  title: string;
  description: string;
  estimated_minutes: number;
  total_steps: number;
  steps: QuizStep[];
  flow_logic: QuizFlowLogic;
  settings: QuizSettings;
}

export interface QuizStep {
  id: string;
  type: QuizStepType;
  title: string;
  subtitle?: string;
  description?: string;
  order: number;
  required: boolean;
  
  // Visual
  icon?: string;
  image_url?: string;
  background_color?: string;
  
  // Conteúdo
  questions: QuizQuestion[];
  
  // Navegação
  skip_allowed: boolean;
  back_allowed: boolean;
  auto_advance: boolean;
  
  // Condições
  show_conditions?: QuizCondition[];
  completion_requirements?: CompletionRequirement[];
  
  // Timing
  min_time_seconds?: number;
  max_time_seconds?: number;
  
  // Validação
  custom_validation?: string; // Nome da função de validação
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  category: string;
  text: string;
  subtitle?: string;
  help_text?: string;
  required: boolean;
  order: number;
  
  // Configuração específica do tipo
  config: QuestionConfig;
  
  // Validação
  validation: ValidationRules;
  
  // Lógica condicional
  show_conditions?: QuizCondition[];
  dependencies?: QuestionDependency[];
  
  // IA e recomendações
  ai_weight: number; // Importância para análise IA (0-10)
  amazon_keywords?: string[];
  category_mapping?: string[]; // Categorias Amazon
  
  // Metadados
  analytics_label: string;
  test_group?: string; // Para A/B testing
}

export interface QuestionConfig {
  // Single/Multiple Choice
  options?: QuestionOption[];
  max_selections?: number;
  min_selections?: number;
  allow_other?: boolean;
  other_placeholder?: string;
  
  // Range Slider
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  labels?: Record<number, string>;
  show_value?: boolean;
  
  // Text Input
  placeholder?: string;
  max_length?: number;
  min_length?: number;
  input_type?: 'text' | 'email' | 'tel' | 'url';
  
  // Rating Scale
  scale_min?: number;
  scale_max?: number;
  scale_labels?: string[];
  scale_icons?: string[];
  
  // Image Selection
  images?: ImageOption[];
  grid_columns?: number;
  
  // Budget Range
  currency?: string;
  budget_options?: BudgetOption[];
}

export interface QuestionOption {
  id: string;
  text: string;
  description?: string;
  value: string | number | boolean;
  image_url?: string;
  icon?: string;
  color?: string;
  
  // Para análise IA
  weight: number; // Peso na análise
  triggers: string[]; // Keywords que esta opção dispara
  excludes?: string[]; // Keywords que esta opção exclui
  
  // Follow-up
  follow_up_question_ids?: string[];
  
  // Mostrar condicionalmente
  show_conditions?: QuizCondition[];
}

export interface ImageOption extends QuestionOption {
  image_url: string;
  image_alt: string;
  aspect_ratio?: 'square' | '4:3' | '16:9' | 'portrait';
}

export interface BudgetOption extends QuestionOption {
  min_value: number;
  max_value: number;
  currency: string;
  popular?: boolean;
  recommended?: boolean;
}

// -----------------------------------------------------------------------------
// LÓGICA DE FLUXO E CONDIÇÕES
// -----------------------------------------------------------------------------
export interface QuizFlowLogic {
  branching_enabled: boolean;
  adaptive_questioning: boolean;
  skip_irrelevant_questions: boolean;
  dynamic_step_generation: boolean;
  personalization_level: 'basic' | 'moderate' | 'advanced';
}

export interface QuizCondition {
  question_id: string;
  operator: ConditionOperator;
  value: JSONValue;
  logic_operator?: 'AND' | 'OR';
  group?: string; // Para agrupar condições
}

export enum ConditionOperator {
  EQUALS = 'equals',
  NOT_EQUALS = 'not_equals',
  CONTAINS = 'contains',
  NOT_CONTAINS = 'not_contains',
  GREATER_THAN = 'greater_than',
  LESS_THAN = 'less_than',
  GREATER_EQUAL = 'greater_equal',
  LESS_EQUAL = 'less_equal',
  IN_ARRAY = 'in_array',
  NOT_IN_ARRAY = 'not_in_array',
  RANGE_INCLUDES = 'range_includes',
  IS_EMPTY = 'is_empty',
  IS_NOT_EMPTY = 'is_not_empty'
}

export interface QuestionDependency {
  depends_on_question_id: string;
  dependency_type: 'required' | 'conditional' | 'exclusive';
  condition: QuizCondition;
}

export interface CompletionRequirement {
  type: 'all_questions' | 'required_questions' | 'minimum_questions' | 'custom';
  minimum_count?: number;
  custom_logic?: string;
}

// -----------------------------------------------------------------------------
// RESPOSTAS E SESSÕES
// -----------------------------------------------------------------------------
export interface QuizAnswer {
  question_id: string;
  step_id: string;
  value: JSONValue;
  selected_options?: string[];
  other_text?: string;
  confidence_level?: number; // 1-5, quão confiante o usuário está
  
  // Metadados
  answered_at: Timestamp;
  time_spent_ms: number;
  attempts: number; // Quantas vezes mudou a resposta
  skipped: boolean;
  
  // Contexto
  device_type?: 'mobile' | 'tablet' | 'desktop';
  input_method?: 'touch' | 'mouse' | 'keyboard';
}

export interface QuizSession {
  id: UUID;
  user_id?: UUID;
  quiz_config_id: string;
  status: QuizSessionStatus;
  
  // Progresso
  current_step_id: string;
  current_step_order: number;
  total_steps: number;
  completed_steps: string[];
  skipped_steps: string[];
  
  // Respostas
  answers: Record<string, QuizAnswer>;
  
  // Timing
  started_at: Timestamp;
  last_activity_at: Timestamp;
  completed_at?: Timestamp;
  total_time_ms?: number;
  average_time_per_step?: number;
  
  // Contexto de sessão
  ip_address?: string;
  user_agent?: string;
  referrer?: string;
  device_info: DeviceInfo;
  
  // UTM e tracking
  utm_data?: UTMData;
  session_data: SessionData;
  
  // Abandono
  abandonment_step_id?: string;
  abandonment_reason?: 'timeout' | 'user_exit' | 'technical_error' | 'other';
  
  // A/B Testing
  test_variant?: string;
  experiment_id?: string;
}

export enum QuizSessionStatus {
  CREATED = 'created',
  STARTED = 'started',
  IN_PROGRESS = 'in_progress',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  ABANDONED = 'abandoned',
  EXPIRED = 'expired',
  ERROR = 'error'
}

export interface DeviceInfo {
  type: 'mobile' | 'tablet' | 'desktop' | 'unknown';
  browser: string;
  browser_version: string;
  os: string;
  os_version: string;
  screen_width: number;
  screen_height: number;
  viewport_width: number;
  viewport_height: number;
  timezone: string;
  language: string;
}

export interface UTMData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string; // Google Click ID
  fbclid?: string; // Facebook Click ID
}

export interface SessionData {
  entry_page: string;
  referrer_domain?: string;
  search_keywords?: string;
  social_platform?: string;
  email_campaign_id?: string;
  
  // Comportamento
  total_page_views: number;
  pages_visited: string[];
  scroll_depth_max: number;
  clicks_before_quiz: number;
  
  // Geografia (estimada por IP)
  country?: string;
  state?: string;
  city?: string;
  lat?: number;
  lng?: number;
}

// -----------------------------------------------------------------------------
// ANÁLISE E RESULTADOS
// -----------------------------------------------------------------------------
export interface QuizAnalysis {
  session_id: UUID;
  analysis_version: string;
  confidence_score: number; // 0-100
  
  // Profile identificado
  user_profile: AnalyzedUserProfile;
  
  // Recomendações
  product_recommendations: ProductRecommendation[];
  lifestyle_recommendations: LifestyleRecommendation[];
  
  // Explicações
  analysis_explanation: AnalysisExplanation;
  
  // Métricas
  processing_time_ms: number;
  ai_model_used: string;
  prompt_version: string;
  
  // Dados brutos para debug
  raw_openai_response?: JSONValue;
  calculation_breakdown?: CalculationBreakdown;
}

export interface AnalyzedUserProfile {
  // Objetivos
  primary_goal: GoalType;
  secondary_goals: GoalType[];
  goal_priority_scores: Record<GoalType, number>;
  
  // Lifestyle
  activity_level: LifestyleType;
  lifestyle_score: number; // Calculado
  consistency_level: 'low' | 'medium' | 'high';
  
  // Saúde
  health_focus_areas: string[];
  dietary_restrictions: string[];
  current_supplements: string[];
  health_conditions: string[];
  
  // Personalidade de compra
  buying_personality: BuyingPersonality;
  price_sensitivity: number; // 1-10
  brand_loyalty: number; // 1-10
  research_depth: 'low' | 'medium' | 'high';
  
  // Demografia
  age_group: '18-25' | '26-35' | '36-45' | '46-55' | '55+';
  location_context: LocationContext;
  
  // Persona identificada
  identified_persona: UserPersona;
}

export interface BuyingPersonality {
  type: 'impulse' | 'researcher' | 'value-seeker' | 'premium' | 'convenience';
  characteristics: string[];
  preferred_decision_factors: string[];
  typical_purchase_timeline: string;
}

export interface LocationContext {
  state?: string;
  climate_type?: 'tropical' | 'temperate' | 'cold' | 'arid';
  urban_rural: 'urban' | 'suburban' | 'rural' | 'unknown';
  cost_of_living: 'low' | 'medium' | 'high';
}

export enum UserPersona {
  HEALTH_ENTHUSIAST = 'health-enthusiast',
  FITNESS_BEGINNER = 'fitness-beginner',
  BUSY_PROFESSIONAL = 'busy-professional',
  BUDGET_CONSCIOUS = 'budget-conscious',
  PREMIUM_SEEKER = 'premium-seeker',
  NATURAL_LIFESTYLE = 'natural-lifestyle',
  PERFORMANCE_FOCUSED = 'performance-focused',
  FAMILY_ORIENTED = 'family-oriented'
}

export interface ProductRecommendation {
  category: string;
  subcategory?: string;
  priority_rank: number;
  match_score: number; // 0-100
  
  // Critérios de busca
  amazon_search_terms: string[];
  required_features: string[];
  preferred_brands?: string[];
  avoid_keywords?: string[];
  
  // Faixa de preço
  price_range: {
    min: number;
    max: number;
    currency: string;
    optimal?: number;
  };
  
  // Explicação
  reason: string;
  benefits: string[];
  usage_instructions?: string;
  timing_recommendation?: string;
  
  // Filtragem
  must_have_attributes: string[];
  nice_to_have_attributes: string[];
  deal_breakers: string[];
}

export interface LifestyleRecommendation {
  type: 'habit' | 'routine' | 'mindset' | 'education';
  title: string;
  description: string;
  priority: number;
  difficulty: 'easy' | 'medium' | 'hard';
  time_investment: string;
  expected_timeline: string;
  related_products?: string[];
}

export interface AnalysisExplanation {
  summary: string;
  key_insights: string[];
  personalized_message: string;
  why_these_products: string;
  success_factors: string[];
  potential_challenges: string[];
  next_steps: string[];
  long_term_vision: string;
}

export interface CalculationBreakdown {
  goal_weights: Record<string, number>;
  lifestyle_factors: Record<string, number>;
  preference_scores: Record<string, number>;
  final_category_scores: Record<string, number>;
  confidence_factors: string[];
  uncertainty_factors: string[];
}

// -----------------------------------------------------------------------------
// CONFIGURAÇÕES E CUSTOMIZAÇÕES
// -----------------------------------------------------------------------------
export interface QuizSettings {
  // Aparência
  theme: 'light' | 'dark' | 'auto';
  primary_color: string;
  secondary_color: string;
  font_family: string;
  
  // Comportamento
  auto_save: boolean;
  auto_save_interval_ms: number;
  session_timeout_minutes: number;
  allow_back_navigation: boolean;
  show_progress_bar: boolean;
  
  // Validação
  validate_on_blur: boolean;
  show_inline_errors: boolean;
  require_all_questions: boolean;
  
  // Analytics
  track_detailed_events: boolean;
  track_timing_data: boolean;
  track_abandon_events: boolean;
  
  // Gamificação
  show_completion_percentage: boolean;
  celebration_animations: boolean;
  progress_rewards: boolean;
  
  // Acessibilidade
  keyboard_navigation: boolean;
  screen_reader_support: boolean;
  high_contrast_mode: boolean;
  large_text_option: boolean;
}

export interface ValidationRules {
  required?: boolean;
  min_length?: number;
  max_length?: number;
  pattern?: string;
  custom_validator?: string;
  error_messages?: Record<string, string>;
}

// -----------------------------------------------------------------------------
// TIPOS PARA COMPONENTES DO QUIZ
// -----------------------------------------------------------------------------
export interface QuizEngineProps {
  config: QuizConfig;
  session: QuizSession;
  onStepComplete: (step: string, answers: Record<string, QuizAnswer>) => void;
  onQuizComplete: (session: QuizSession) => void;
  onQuizAbandon: (reason: string) => void;
  className?: string;
}

export interface QuestionComponentProps {
  question: QuizQuestion;
  value?: JSONValue;
  onChange: (value: JSONValue) => void;
  onValidation: (isValid: boolean, error?: string) => void;
  disabled?: boolean;
  className?: string;
}

export interface ProgressBarProps {
  current: number;
  total: number;
  showPercentage?: boolean;
  showStepNumbers?: boolean;
  variant?: 'default' | 'minimal' | 'detailed';
  className?: string;
}

// -----------------------------------------------------------------------------
// HOOKS E CONTEXTO
// -----------------------------------------------------------------------------
export interface QuizContextValue {
  session: QuizSession | null;
  currentQuestion: QuizQuestion | null;
  progress: {
    current: number;
    total: number;
    percentage: number;
  };
  
  // Ações
  startQuiz: (configId: string) => Promise<void>;
  nextStep: () => Promise<void>;
  prevStep: () => Promise<void>;
  skipStep: () => Promise<void>;
  submitAnswer: (questionId: string, value: JSONValue) => Promise<void>;
  completeQuiz: () => Promise<QuizAnalysis>;
  abandonQuiz: (reason: string) => Promise<void>;
  
  // Estado
  isLoading: boolean;
  error: string | null;
  canGoBack: boolean;
  canGoNext: boolean;
  canSkip: boolean;
}

export interface UseQuizOptions {
  autoSave?: boolean;
  autoSaveInterval?: number;
  trackDetailedAnalytics?: boolean;
  onError?: (error: Error) => void;
  onComplete?: (analysis: QuizAnalysis) => void;
  onAbandon?: (reason: string) => void;
}