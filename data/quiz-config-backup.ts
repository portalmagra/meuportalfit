// =============================================================================
// MEUPORTALFIT - DADOS COMPLETOS DO QUIZ DE WELLNESS
// =============================================================================

import type { QuizConfig, QuizStep, QuizQuestion, QuestionOption, QuizCondition } from '@/types/quiz';

// -----------------------------------------------------------------------------
// CONFIGURAÇÃO PRINCIPAL DO QUIZ
// -----------------------------------------------------------------------------
export const QUIZ_CONFIG: QuizConfig = {
  id: 'wellness-quiz-v1',
  version: '1.0',
  title: 'Descubra Seus Produtos Ideais de Wellness',
  description: 'Um quiz personalizado para encontrar os melhores suplementos e produtos de saúde para seu estilo de vida nos Estados Unidos.',
  estimated_minutes: 5,
  total_steps: 8,
  steps: [], // Será preenchido abaixo
  flow_logic: {
    branching_enabled: true,
    adaptive_questioning: true,
    skip_irrelevant_questions: true,
    dynamic_step_generation: false,
    personalization_level: 'advanced'
  },
  settings: {
    theme: 'light',
    primary_color: '#22c55e',
    secondary_color: '#3b82f6',
    font_family: 'Inter',
    auto_save: true,
    auto_save_interval_ms: 30000,
    session_timeout_minutes: 30,
    allow_back_navigation: true,
    show_progress_bar: true,
    validate_on_blur: true,
    show_inline_errors: true,
    require_all_questions: false,
    track_detailed_events: true,
    track_timing_data: true,
    track_abandon_events: true,
    show_completion_percentage: true,
    celebration_animations: true,
    progress_rewards: false,
    keyboard_navigation: true,
    screen_reader_support: true,
    high_contrast_mode: false,
    large_text_option: false
  }
};

// -----------------------------------------------------------------------------
// STEP 1: WELCOME / INTRODUÇÃO
// -----------------------------------------------------------------------------
const welcomeStep: QuizStep = {
  id: 'welcome',
  type: 'WELCOME',
  title: 'Bem-vindo ao MeuPortalFit! 🌟',
  subtitle: 'Encontre os produtos ideais para seu wellness',
  description: 'Vamos descobrir juntos quais produtos de saúde e bem-estar são perfeitos para seu estilo de vida nos Estados Unidos.',
  order: 1,
  required: false,
  questions: [
    {
      id: 'welcome_message',
      type: 'BOOLEAN_TOGGLE',
      category: 'introduction',
      text: 'Pronto para começar sua jornada de wellness?',
      subtitle: 'Este quiz leva apenas 5 minutos e é completamente gratuito',
      help_text: 'Suas respostas são privadas e usadas apenas para gerar recomendações personalizadas.',
      required: false,
      order: 1,
      config: {},
      validation: {
        required: false
      },
      ai_weight: 1,
      analytics_label: 'welcome_ready'
    }
  ],
  skip_allowed: true,
  back_allowed: false,
  auto_advance: true,
  icon: 'welcome',
  background_color: '#f0fdf4'
};

// -----------------------------------------------------------------------------
// STEP 2: DADOS DEMOGRÁFICOS
// -----------------------------------------------------------------------------
const demographicsStep: QuizStep = {
  id: 'demographics',
  type: 'DEMOGRAPHIC',
  title: 'Vamos nos conhecer melhor',
  subtitle: 'Algumas informações básicas sobre você',
  description: 'Estes dados nos ajudam a fazer recomendações mais precisas.',
  order: 2,
  required: true,
  questions: [
    {
      id: 'age_range',
      type: 'SINGLE_CHOICE',
      category: 'demographics',
      text: 'Qual sua faixa etária?',
      required: true,
      order: 1,
      config: {
        options: [
          {
            id: '18-25',
            text: '18-25 anos',
            value: '18-25',
            weight: 5,
            triggers: ['young-adult', 'energy', 'performance'],
            image_url: '/images/quiz/age-18-25.jpg'
          },
          {
            id: '26-35',
            text: '26-35 anos',
            value: '26-35',
            weight: 7,
            triggers: ['active-professional', 'stress-management', 'metabolism'],
            image_url: '/images/quiz/age-26-35.jpg'
          },
          {
            id: '36-45',
            text: '36-45 anos',
            value: '36-45',
            weight: 6,
            triggers: ['career-focused', 'family-health', 'prevention'],
            image_url: '/images/quiz/age-36-45.jpg'
          },
          {
            id: '46-55',
            text: '46-55 anos',
            value: '46-55',
            weight: 5,
            triggers: ['mature-health', 'longevity', 'hormonal-balance'],
            image_url: '/images/quiz/age-46-55.jpg'
          },
          {
            id: '55+',
            text: '55+ anos',
            value: '55+',
            weight: 4,
            triggers: ['senior-wellness', 'joint-health', 'cognitive-support'],
            image_url: '/images/quiz/age-55-plus.jpg'
          }
        ]
      },
      validation: {
        required: true,
        error_messages: {
          required: 'Por favor, selecione sua faixa etária'
        }
      },
      ai_weight: 8,
      amazon_keywords: ['age-appropriate', 'life-stage'],
      category_mapping: ['Health & Household'],
      analytics_label: 'demographics_age'
    },
    {
      id: 'gender',
      type: 'SINGLE_CHOICE',
      category: 'demographics',
      text: 'Como você se identifica?',
      required: true,
      order: 2,
      config: {
        options: [
          {
            id: 'masculino',
            text: 'Masculino',
            value: 'masculino',
            weight: 5,
            triggers: ['men-health', 'testosterone', 'muscle-support'],
            icon: '👨'
          },
          {
            id: 'feminino',
            text: 'Feminino',
            value: 'feminino',
            weight: 5,
            triggers: ['women-health', 'hormonal-balance', 'beauty-from-within'],
            icon: '👩'
          },
          {
            id: 'nao-binario',
            text: 'Não-binário',
            value: 'nao-binario',
            weight: 5,
            triggers: ['inclusive-health', 'balanced-wellness'],
            icon: '🌈'
          },
          {
            id: 'prefiro-nao-dizer',
            text: 'Prefiro não dizer',
            value: 'prefiro-nao-dizer',
            weight: 5,
            triggers: ['general-wellness'],
            icon: '💫'
          }
        ]
      },
      validation: {
        required: true
      },
      ai_weight: 6,
      amazon_keywords: ['gender-specific'],
      analytics_label: 'demographics_gender'
    },
    {
      id: 'location_state',
      type: 'SINGLE_CHOICE',
      category: 'demographics',
      text: 'Em qual estado você mora nos EUA?',
      help_text: 'Isso nos ajuda com disponibilidade de produtos e frete.',
      required: false,
      order: 3,
      config: {
        options: [
          // Estados mais populares para brasileiros
          { id: 'FL', text: 'Florida', value: 'FL', weight: 8, triggers: ['warm-climate'] },
          { id: 'CA', text: 'California', value: 'CA', weight: 7, triggers: ['active-lifestyle'] },
          { id: 'NY', text: 'New York', value: 'NY', weight: 6, triggers: ['urban-lifestyle'] },
          { id: 'TX', text: 'Texas', value: 'TX', weight: 6, triggers: ['diverse-climate'] },
          { id: 'MA', text: 'Massachusetts', value: 'MA', weight: 5, triggers: ['cold-climate'] },
          { id: 'NJ', text: 'New Jersey', value: 'NJ', weight: 5, triggers: ['urban-lifestyle'] },
          { id: 'IL', text: 'Illinois', value: 'IL', weight: 4, triggers: ['cold-climate'] },
          { id: 'OTHER', text: 'Outro estado', value: 'OTHER', weight: 3, triggers: [] }
        ]
      },
      validation: {
        required: false
      },
      ai_weight: 3,
      amazon_keywords: ['location-based'],
      analytics_label: 'demographics_location'
    }
  ],
  skip_allowed: false,
  back_allowed: true,
  auto_advance: false,
  icon: 'user',
  background_color: '#ffffff'
};

// -----------------------------------------------------------------------------
// STEP 3: OBJETIVOS DE SAÚDE
// -----------------------------------------------------------------------------
const goalsStep: QuizStep = {
  id: 'goals',
  type: 'GOALS',
  title: 'Quais são seus objetivos de saúde?',
  subtitle: 'Escolha até 3 objetivos principais',
  description: 'Seus objetivos nos ajudam a priorizar as recomendações mais relevantes.',
  order: 3,
  required: true,
  questions: [
    {
      id: 'primary_goals',
      type: 'MULTIPLE_CHOICE',
      category: 'goals',
      text: 'Quais são seus principais objetivos? (escolha até 3)',
      required: true,
      order: 1,
      config: {
        max_selections: 3,
        min_selections: 1,
        options: [
          {
            id: 'weight-loss',
            text: 'Perder peso',
            description: 'Queimar gordura e emagrecer de forma saudável',
            value: 'weight-loss',
            weight: 9,
            triggers: ['fat-burner', 'metabolism', 'appetite-control', 'thermogenic'],
            image_url: '/images/quiz/goal-weight-loss.jpg',
            icon: '⚖️'
          },
          {
            id: 'muscle-gain',
            text: 'Ganhar massa muscular',
            description: 'Construir músculos e aumentar força',
            value: 'muscle-gain',
            weight: 8,
            triggers: ['protein', 'creatine', 'amino-acids', 'post-workout'],
            image_url: '/images/quiz/goal-muscle-gain.jpg',
            icon: '💪'
          },
          {
            id: 'energy-boost',
            text: 'Aumentar energia',
            description: 'Ter mais disposição no dia a dia',
            value: 'energy-boost',
            weight: 8,
            triggers: ['energy', 'b-vitamins', 'iron', 'caffeine', 'adaptogenic'],
            image_url: '/images/quiz/goal-energy.jpg',
            icon: '⚡'
          },
          {
            id: 'stress-management',
            text: 'Controlar o stress',
            description: 'Reduzir ansiedade e melhorar bem-estar mental',
            value: 'stress-management',
            weight: 7,
            triggers: ['adaptogens', 'magnesium', 'ashwagandha', 'l-theanine'],
            image_url: '/images/quiz/goal-stress.jpg',
            icon: '🧘'
          },
          {
            id: 'sleep-improvement',
            text: 'Melhorar o sono',
            description: 'Dormir melhor e mais profundamente',
            value: 'sleep-improvement',
            weight: 7,
            triggers: ['melatonin', 'magnesium', 'valerian', 'sleep-support'],
            image_url: '/images/quiz/goal-sleep.jpg',
            icon: '😴'
          },
          {
            id: 'immune-support',
            text: 'Fortalecer imunidade',
            description: 'Melhorar defesas naturais do corpo',
            value: 'immune-support',
            weight: 6,
            triggers: ['vitamin-c', 'vitamin-d', 'zinc', 'elderberry', 'immune'],
            image_url: '/images/quiz/goal-immune.jpg',
            icon: '🛡️'
          },
          {
            id: 'digestive-health',
            text: 'Saúde digestiva',
            description: 'Melhorar digestão e saúde intestinal',
            value: 'digestive-health',
            weight: 6,
            triggers: ['probiotics', 'fiber', 'digestive-enzymes', 'gut-health'],
            image_url: '/images/quiz/goal-digestive.jpg',
            icon: '🥗'
          },
          {
            id: 'skin-beauty',
            text: 'Pele e beleza',
            description: 'Melhorar aparência de pele, cabelo e unhas',
            value: 'skin-beauty',
            weight: 5,
            triggers: ['collagen', 'biotin', 'vitamin-e', 'hyaluronic-acid'],
            image_url: '/images/quiz/goal-beauty.jpg',
            icon: '✨'
          },
          {
            id: 'performance',
            text: 'Performance física',
            description: 'Melhorar rendimento em exercícios',
            value: 'performance',
            weight: 6,
            triggers: ['pre-workout', 'bcaa', 'creatine', 'performance'],
            image_url: '/images/quiz/goal-performance.jpg',
            icon: '🏃'
          },
          {
            id: 'general-health',
            text: 'Saúde geral',
            description: 'Manter bem-estar geral e prevenir doenças',
            value: 'general-health',
            weight: 5,
            triggers: ['multivitamin', 'omega-3', 'antioxidants', 'general-wellness'],
            image_url: '/images/quiz/goal-general.jpg',
            icon: '🌱'
          }
        ]
      },
      validation: {
        required: true,
        min_selections: 1,
        max_selections: 3,
        error_messages: {
          required: 'Selecione pelo menos um objetivo',
          max_selections: 'Selecione no máximo 3 objetivos'
        }
      },
      ai_weight: 10,
      amazon_keywords: ['health-goals'],
      category_mapping: ['Health & Household', 'Sports & Outdoors'],
      analytics_label: 'goals_primary'
    }
  ],
  skip_allowed: false,
  back_allowed: true,
  auto_advance: false,
  icon: 'target',
  background_color: '#f0fdf4'
};

// -----------------------------------------------------------------------------
// STEP 4: ESTILO DE VIDA
// -----------------------------------------------------------------------------
const lifestyleStep: QuizStep = {
  id: 'lifestyle',
  type: 'LIFESTYLE',
  title: 'Como é seu estilo de vida?',
  subtitle: 'Suas rotinas influenciam suas necessidades',
  description: 'Entender sua rotina nos ajuda a recomendar produtos que se encaixam no seu dia a dia.',
  order: 4,
  required: true,
  questions: [
    {
      id: 'activity_level',
      type: 'SINGLE_CHOICE',
      category: 'lifestyle',
      text: 'Como você descreveria seu nível de atividade física?',
      required: true,
      order: 1,
      config: {
        options: [
          {
            id: 'sedentario',
            text: 'Sedentário',
            description: 'Pouco ou nenhum exercício regular',
            value: 'sedentario',
            weight: 3,
            triggers: ['basic-vitamins', 'energy-support', 'metabolism'],
            image_url: '/images/quiz/activity-sedentary.jpg'
          },
          {
            id: 'levemente-ativo',
            text: 'Levemente ativo',
            description: 'Exercício leve 1-3 dias por semana',
            value: 'levemente-ativo',
            weight: 5,
            triggers: ['general-fitness', 'recovery', 'basic-support'],
            image_url: '/images/quiz/activity-light.jpg'
          },
          {
            id: 'moderadamente-ativo',
            text: 'Moderadamente ativo',
            description: 'Exercício moderado 3-5 dias por semana',
            value: 'moderadamente-ativo',
            weight: 7,
            triggers: ['pre-workout', 'recovery', 'protein', 'hydration'],
            image_url: '/images/quiz/activity-moderate.jpg'
          },
          {
            id: 'muito-ativo',
            text: 'Muito ativo',
            description: 'Exercício intenso 6-7 dias por semana',
            value: 'muito-ativo',
            weight: 8,
            triggers: ['performance', 'advanced-supplements', 'recovery'],
            image_url: '/images/quiz/activity-very-active.jpg'
          },
          {
            id: 'extremamente-ativo',
            text: 'Atleta/Extremamente ativo',
            description: 'Treinamento profissional ou competitivo',
            value: 'extremamente-ativo',
            weight: 9,
            triggers: ['professional-grade', 'advanced-performance', 'specialized'],
            image_url: '/images/quiz/activity-athlete.jpg'
          }
        ]
      },
      validation: {
        required: true
      },
      ai_weight: 9,
      amazon_keywords: ['activity-level', 'fitness'],
      analytics_label: 'lifestyle_activity'
    },
    {
      id: 'work_schedule',
      type: 'SINGLE_CHOICE',
      category: 'lifestyle',
      text: 'Como é sua rotina de trabalho?',
      required: true,
      order: 2,
      config: {
        options: [
          {
            id: 'regular-9-5',
            text: 'Horário regular (9-5)',
            description: 'Trabalho tradicional de escritório',
            value: 'regular-9-5',
            weight: 5,
            triggers: ['office-worker', 'stress-support', 'energy-afternoon']
          },
          {
            id: 'shift-work',
            text: 'Trabalho em turnos',
            description: 'Horários variáveis ou noturnos',
            value: 'shift-work',
            weight: 6,
            triggers: ['sleep-support', 'energy-irregular', 'stress-adaptation']
          },
          {
            id: 'remote-work',
            text: 'Trabalho remoto',
            description: 'Trabalho de casa regularmente',
            value: 'remote-work',
            weight: 5,
            triggers: ['home-office', 'posture-support', 'productivity']
          },
          {
            id: 'physical-job',
            text: 'Trabalho físico',
            description: 'Trabalho que exige esforço físico',
            value: 'physical-job',
            weight: 7,
            triggers: ['recovery', 'joint-support', 'energy-endurance']
          },
          {
            id: 'student',
            text: 'Estudante',
            description: 'Focado em estudos',
            value: 'student',
            weight: 4,
            triggers: ['cognitive-support', 'stress-study', 'budget-friendly']
          },
          {
            id: 'retired',
            text: 'Aposentado',
            description: 'Não trabalho mais',
            value: 'retired',
            weight: 3,
            triggers: ['active-aging', 'longevity', 'health-maintenance']
          }
        ]
      },
      validation: {
        required: true
      },
      ai_weight: 6,
      amazon_keywords: ['work-lifestyle'],
      analytics_label: 'lifestyle_work'
    },
    {
      id: 'stress_level',
      type: 'RANGE_SLIDER',
      category: 'lifestyle',
      text: 'Como você avalia seu nível de stress no dia a dia?',
      help_text: 'Sendo 1 = muito baixo e 10 = muito alto',
      required: true,
      order: 3,
      config: {
        min: 1,
        max: 10,
        step: 1,
        unit: '',
        labels: {
          1: 'Muito baixo',
          5: 'Moderado',
          10: 'Muito alto'
        },
        show_value: true
      },
      validation: {
        required: true
      },
      ai_weight: 7,
      amazon_keywords: ['stress-level'],
      analytics_label: 'lifestyle_stress'
    }
  ],
  skip_allowed: false,
  back_allowed: true,
  auto_advance: false,
  icon: 'activity',
  background_color: '#ffffff'
};

// -----------------------------------------------------------------------------
// STEP 5: SAÚDE E RESTRIÇÕES
// -----------------------------------------------------------------------------
const healthStep: QuizStep = {
  id: 'health',
  type: 'HEALTH',
  title: 'Informações sobre sua saúde',
  subtitle: 'Para recomendações mais seguras e eficazes',
  description: 'Suas condições de saúde e restrições nos ajudam a evitar produtos inadequados.',
  order: 5,
  required: true,
  questions: [
    {
      id: 'dietary_restrictions',
      type: 'MULTIPLE_CHOICE',
      category: 'health',
      text: 'Você tem alguma restrição alimentar ou dietética?',
      help_text: 'Selecione todas que se aplicam',
      required: false,
      order: 1,
      config: {
        options: [
          {
            id: 'none',
            text: 'Nenhuma restrição',
            value: 'none',
            weight: 5,
            triggers: []
          },
          {
            id: 'vegetarian',
            text: 'Vegetariano',
            value: 'vegetarian',
            weight: 6,
            triggers: ['plant-based', 'vegetarian-friendly'],
            excludes: ['gelatin', 'animal-derived']
          },
          {
            id: 'vegan',
            text: 'Vegano',
            value: 'vegan',
            weight: 7,
            triggers: ['vegan', 'plant-based'],
            excludes: ['animal-products', 'dairy', 'eggs']
          },
          {
            id: 'gluten-free',
            text: 'Sem glúten',
            value: 'gluten-free',
            weight: 6,
            triggers: ['gluten-free'],
            excludes: ['wheat', 'gluten']
          },
          {
            id: 'dairy-free',
            text: 'Sem lactose/laticínios',
            value: 'dairy-free',
            weight: 6,
            triggers: ['lactose-free', 'dairy-free'],
            excludes: ['milk', 'dairy', 'lactose']
          },
          {
            id: 'keto',
            text: 'Dieta cetogênica',
            value: 'keto',
            weight: 7,
            triggers: ['keto', 'low-carb', 'high-fat'],
            excludes: ['high-sugar', 'high-carb']
          },
          {
            id: 'paleo',
            text: 'Dieta paleolítica',
            value: 'paleo',
            weight: 6,
            triggers: ['paleo', 'natural', 'whole-food'],
            excludes: ['processed', 'grains']
          },
          {
            id: 'allergies',
            text: 'Alergias alimentares',
            value: 'allergies',
            weight: 8,
            triggers: ['allergen-free', 'hypoallergenic'],
            follow_up_question_ids: ['specific_allergies']
          }
        ]
      },
      validation: {
        required: false
      },
      ai_weight: 8,
      amazon_keywords: ['dietary-restrictions'],
      analytics_label: 'health_dietary'
    },
    {
      id: 'specific_allergies',
      type: 'TEXT_INPUT',
      category: 'health',
      text: 'Quais alergias alimentares específicas você tem?',
      help_text: 'Ex: amendoim, frutos do mar, soja, etc.',
      required: false,
      order: 2,
      config: {
        placeholder: 'Digite suas alergias separadas por vírgula',
        max_length: 200
      },
      show_conditions: [
        {
          question_id: 'dietary_restrictions',
          operator: 'contains',
          value: 'allergies'
        }
      ],
      validation: {
        required: false,
        max_length: 200
      },
      ai_weight: 9,
      amazon_keywords: ['allergen-free'],
      analytics_label: 'health_specific_allergies'
    },
    {
      id: 'current_medications',
      type: 'BOOLEAN_TOGGLE',
      category: 'health',
      text: 'Você toma algum medicamento regularmente?',
      help_text: 'Alguns suplementos podem interagir com medicamentos',
      required: true,
      order: 3,
      config: {},
      validation: {
        required: true
      },
      ai_weight: 9,
      amazon_keywords: ['medication-interaction'],
      analytics_label: 'health_medications'
    },
    {
      id: 'health_conditions',
      type: 'MULTIPLE_CHOICE',
      category: 'health',
      text: 'Você tem alguma condição de saúde que devemos considerar?',
      help_text: 'Estas informações nos ajudam a fazer recomendações mais seguras',
      required: false,
      order: 4,
      config: {
        options: [
          {
            id: 'none',
            text: 'Nenhuma condição específica',
            value: 'none',
            weight: 5,
            triggers: []
          },
          {
            id: 'diabetes',
            text: 'Diabetes',
            value: 'diabetes',
            weight: 8,
            triggers: ['blood-sugar', 'diabetes-friendly'],
            excludes: ['high-sugar', 'simple-carbs']
          },
          {
            id: 'hypertension',
            text: 'Pressão alta',
            value: 'hypertension',
            weight: 7,
            triggers: ['heart-health', 'low-sodium'],
            excludes: ['high-sodium', 'stimulants']
          },
          {
            id: 'thyroid',
            text: 'Problemas de tireoide',
            value: 'thyroid',
            weight: 7,
            triggers: ['thyroid-support', 'metabolism'],
            excludes: ['iodine-excess']
          },
          {
            id: 'heart-disease',
            text: 'Doença cardíaca',
            value: 'heart-disease',
            weight: 9,
            triggers: ['heart-health', 'omega-3'],
            excludes: ['stimulants', 'high-caffeine']
          },
          {
            id: 'kidney-issues',
            text: 'Problemas renais',
            value: 'kidney-issues',
            weight: 8,
            triggers: ['kidney-friendly'],
            excludes: ['high-protein', 'potassium-excess']
          },
          {
            id: 'digestive-issues',
            text: 'Problemas digestivos',
            value: 'digestive-issues',
            weight: 7,
            triggers: ['digestive-support', 'gentle-formula'],
            excludes: ['harsh-ingredients']
          }
        ]
      },
      validation: {
        required: false
      },
      ai_weight: 9,
      amazon_keywords: ['health-conditions'],
      analytics_label: 'health_conditions'
    }
  ],
  skip_allowed: false,
  back_allowed: true,
  auto_advance: false,
  icon: 'heart',
  background_color: '#fef2f2'
};

// -----------------------------------------------------------------------------
// STEP 6: PREFERÊNCIAS E EXPERIÊNCIA
// -----------------------------------------------------------------------------
const preferencesStep: QuizStep = {
  id: 'preferences',
  type: 'PREFERENCES',
  title: 'Suas preferências de suplementos',
  subtitle: 'Como você gosta de tomar seus suplementos?',
  description: 'Suas preferências nos ajudam a recomendar produtos que você realmente vai usar.',
  order: 6,
  required: true,
  questions: [
    {
      id: 'supplement_experience',
      type: 'SINGLE_CHOICE',
      category: 'preferences',
      text: 'Qual sua experiência com suplementos?',
      required: true,
      order: 1,
      config: {
        options: [
          {
            id: 'beginner',
            text: 'Iniciante',
            description: 'Nunca ou raramente usei suplementos',
            value: 'beginner',
            weight: 6,
            triggers: ['beginner-friendly', 'simple-formulas', 'basic-support']
          },
          {
            id: 'some-experience',
            text: 'Alguma experiência',
            description: 'Já usei alguns suplementos básicos',
            value: 'some-experience',
            weight: 7,
            triggers: ['intermediate', 'proven-ingredients']
          },
          {
            id: 'experienced',
            text: 'Experiente',
            description: 'Uso suplementos regularmente',
            value: 'experienced',
            weight: 8,
            triggers: ['advanced-formulas', 'specialized-supplements']
          },
          {
            id: 'expert',
            text: 'Muito experiente',
            description: 'Tenho conhecimento avançado sobre suplementos',
            value: 'expert',
            weight: 9,
            triggers: ['cutting-edge', 'professional-grade', 'specialized']
          }
        ]
      },
      validation: {
        required: true
      },
      ai_weight: 7,
      amazon_keywords: ['experience-level'],
      analytics_label: 'preferences_experience'
    },
    {
      id: 'preferred_forms',
      type: 'MULTIPLE_CHOICE',
      category: 'preferences',
      text: 'Quais formas de suplemento você prefere?',
      help_text: 'Selecione todas as formas que você se sente confortável usando',
      required: true,
      order: 2,
      config: {
        max_selections: 5,
        min_selections: 1,
        options: [
          {
            id: 'capsules',
            text: 'Cápsulas',
            description: 'Fácil de engolir, sem sabor',
            value: 'capsules',
            weight: 8,
            triggers: ['capsules', 'convenient']
          },
          {
            id: 'tablets',
            text: 'Comprimidos',
            description: 'Forma tradicional, geralmente menor',
            value: 'tablets',
            weight: 7,
            triggers: ['tablets', 'traditional']
          },
          {
            id: 'gummies',
            text: 'Gomas/Gummies',
            description: 'Saborosas e fáceis de tomar',
            value: 'gummies',
            weight: 6,
            triggers: ['gummies', 'tasty', 'fun']
          },
          {
            id: 'powder',
            text: 'Pó para misturar',
            description: 'Flexível dosagem, absorção rápida',
            value: 'powder',
            weight: 7,
            triggers: ['powder', 'mixable', 'fast-absorption']
          },
          {
            id: 'liquid',
            text: 'Líquido',
            description: 'Absorção mais rápida',
            value: 'liquid',
            weight: 6,
            triggers: ['liquid', 'fast-acting']
          },
          {
            id: 'soft-gels',
            text: 'Cápsulas moles',
            description: 'Mais fáceis de engolir',
            value: 'soft-gels',
            weight: 7,
            triggers: ['softgels', 'easy-swallow']
          }
        ]
      },
      validation: {
        required: true,
        min_selections: 1
      },
      ai_weight: 6,
      amazon_keywords: ['supplement-forms'],
      analytics_label: 'preferences_forms'
    },
    {
      id: 'routine_preference',
      type: 'SINGLE_CHOICE',
      category: 'preferences',
      text: 'Como você prefere incorporar suplementos na sua rotina?',
      required: true,
      order: 3,
      config: {
        options: [
          {
            id: 'morning-simple',
            text: 'Simples - manhã apenas',
            description: 'Tomar tudo de manhã de uma vez',
            value: 'morning-simple',
            weight: 7,
            triggers: ['morning', 'simple-routine', 'once-daily']
          },
          {
            id: 'morning-evening',
            text: 'Manhã e noite',
            description: 'Dividir entre manhã e noite',
            value: 'morning-evening',
            weight: 8,
            triggers: ['twice-daily', 'split-dosing']
          },
          {
            id: 'with-meals',
            text: 'Com as refeições',
            description: 'Tomar junto com as refeições',
            value: 'with-meals',
            weight: 6,
            triggers: ['with-food', 'meal-based']
          },
          {
            id: 'flexible',
            text: 'Flexível',
            description: 'Não tenho preferência específica',
            value: 'flexible',
            weight: 5,
            triggers: ['flexible-timing']
          }
        ]
      },
      validation: {
        required: true
      },
      ai_weight: 5,
      amazon_keywords: ['routine-friendly'],
      analytics_label: 'preferences_routine'
    }
  ],
  skip_allowed: false,
  back_allowed: true,
  auto_advance: false,
  icon: 'settings',
  background_color: '#ffffff'
};

// -----------------------------------------------------------------------------
// STEP 7: ORÇAMENTO
// -----------------------------------------------------------------------------
const budgetStep: QuizStep = {
  id: 'budget',
  type: 'BUDGET',
  title: 'Qual seu orçamento mensal?',
  subtitle: 'Para suplementos e produtos de wellness',
  description: 'Queremos recomendar produtos que cabem no seu orçamento.',
  order: 7,
  required: true,
  questions: [
    {
      id: 'monthly_budget',
      type: 'BUDGET_RANGE',
      category: 'budget',
      text: 'Quanto você está disposto a investir por mês em suplementos?',
      help_text: 'Valores em dólares americanos (USD)',
      required: true,
      order: 1,
      config: {
        currency: 'USD',
        budget_options: [
          {
            id: 'ate-50',
            text: 'Até $50',
            min_value: 0,
            max_value: 50,
            value: 'ate-50',
            weight: 6,
            popular: false,
            recommended: false,
            triggers: ['budget-friendly', 'basic-support']
          },
          {
            id: '50-100',
            text: '$50 - $100',
            min_value: 50,
            max_value: 100,
            value: '50-100',
            weight: 8,
            popular: true,
            recommended: true,
            triggers: ['good-value', 'quality-basics']
          },
          {
            id: '100-200',
            text: '$100 - $200',
            min_value: 100,
            max_value: 200,
            value: '100-200',
            weight: 9,
            popular: true,
            recommended: true,
            triggers: ['premium-quality', 'comprehensive-support']
          },
          {
            id: '200-500',
            text: '$200 - $500',
            min_value: 200,
            max_value: 500,
            value: '200-500',
            weight: 8,
            popular: false,
            recommended: false,
            triggers: ['high-end', 'specialized-formulas']
          },
          {
            id: 'acima-500',
            text: 'Acima de $500',
            min_value: 500,
            max_value: 2000,
            value: 'acima-500',
            weight: 6,
            popular: false,
            recommended: false,
            triggers: ['luxury', 'professional-grade', 'unlimited']
          }
        ]
      },
      validation: {
        required: true
      },
      ai_weight: 9,
      amazon_keywords: ['price-range'],
      analytics_label: 'budget_monthly'
    },
    {
      id: 'value_priority',
      type: 'SINGLE_CHOICE',
      category: 'budget',
      text: 'O que é mais importante para você?',
      required: true,
      order: 2,
      config: {
        options: [
          {
            id: 'lowest-price',
            text: 'Menor preço',
            description: 'Busco sempre as opções mais baratas',
            value: 'lowest-price',
            weight: 7,
            triggers: ['budget-focused', 'price-conscious']
          },
          {
            id: 'best-value',
            text: 'Melhor custo-benefício',
            description: 'Equilibrio entre preço e qualidade',
            value: 'best-value',
            weight: 9,
            triggers: ['value-focused', 'cost-effective']
          },
          {
            id: 'premium-quality',
            text: 'Qualidade premium',
            description: 'Priorizo qualidade sobre preço',
            value: 'premium-quality',
            weight: 8,
            triggers: ['quality-first', 'premium-brands']
          },
          {
            id: 'brand-loyalty',
            text: 'Marcas confiáveis',
            description: 'Prefiro marcas conhecidas e confiáveis',
            value: 'brand-loyalty',
            weight: 7,
            triggers: ['trusted-brands', 'brand-focused']
          }
        ]
      },
      validation: {
        required: true
      },
      ai_weight: 6,
      amazon_keywords: ['value-priority'],
      analytics_label: 'budget_priority'
    }
  ],
  skip_allowed: false,
  back_allowed: true,
  auto_advance: false,
  icon: 'dollar-sign',
  background_color: '#f0fdf4'
};

// -----------------------------------------------------------------------------
// STEP 8: FINALIZAÇÃO
// -----------------------------------------------------------------------------
const summaryStep: QuizStep = {
  id: 'summary',
  type: 'SUMMARY',
  title: 'Finalizando seu perfil...',
  subtitle: 'Só mais alguns detalhes',
  description: 'Últimas informações para personalizar suas recomendações.',
  order: 8,
  required: false,
  questions: [
    {
      id: 'email_optional',
      type: 'EMAIL_INPUT',
      category: 'contact',
      text: 'Gostaria de receber suas recomendações por email?',
      help_text: 'Opcional - para receber dicas personalizadas de wellness',
      required: false,
      order: 1,
      config: {
        placeholder: 'seu@email.com'
      },
      validation: {
        required: false,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        error_messages: {
          pattern: 'Digite um email válido'
        }
      },
      ai_weight: 2,
      analytics_label: 'contact_email'
    },
    {
      id: 'share_results',
      type: 'BOOLEAN_TOGGLE',
      category: 'sharing',
      text: 'Posso compartilhar seus resultados com amigos?',
      help_text: 'Ajude outros brasileiros a descobrir produtos ideais',
      required: false,
      order: 2,
      config: {},
      validation: {
        required: false
      },
      ai_weight: 1,
      analytics_label: 'sharing_consent'
    },
    {
      id: 'additional_notes',
      type: 'TEXT_INPUT',
      category: 'notes',
      text: 'Algo mais que devemos saber?',
      help_text: 'Informações adicionais que podem ajudar nas recomendações',
      required: false,
      order: 3,
      config: {
        placeholder: 'Ex: tenho dificuldade para dormir, trabalho muito, etc.',
        max_length: 300
      },
      validation: {
        required: false,
        max_length: 300
      },
      ai_weight: 3,
      analytics_label: 'additional_notes'
    }
  ],
  skip_allowed: true,
  back_allowed: true,
  auto_advance: false,
  icon: 'check-circle',
  background_color: '#f0f9ff'
};

// -----------------------------------------------------------------------------
// MONTAGEM FINAL DO QUIZ CONFIG
// -----------------------------------------------------------------------------
QUIZ_CONFIG.steps = [
  welcomeStep,
  demographicsStep,
  goalsStep,
  lifestyleStep,
  healthStep,
  preferencesStep,
  budgetStep,
  summaryStep
];

// -----------------------------------------------------------------------------
// MAPEAMENTO DE KEYWORDS PARA CATEGORIAS AMAZON
// -----------------------------------------------------------------------------
export const AMAZON_CATEGORY_MAPPING: Record<string, string[]> = {
  // Objetivos de saúde
  'weight-loss': ['Health & Household', 'Sports Nutrition'],
  'muscle-gain': ['Sports Nutrition', 'Health & Household'],
  'energy-boost': ['Health & Household', 'Sports Nutrition'],
  'stress-management': ['Health & Household'],
  'sleep-improvement': ['Health & Household'],
  'immune-support': ['Health & Household'],
  'digestive-health': ['Health & Household'],
  'skin-beauty': ['Beauty & Personal Care', 'Health & Household'],
  'performance': ['Sports Nutrition', 'Sports & Outdoors'],
  'general-health': ['Health & Household'],
  
  // Formas de produto
  'capsules': ['Health & Household'],
  'tablets': ['Health & Household'],
  'gummies': ['Health & Household'],
  'powder': ['Sports Nutrition', 'Health & Household'],
  'liquid': ['Health & Household'],
  'softgels': ['Health & Household'],
  
  // Restrições dietárias
  'vegan': ['Health & Household'],
  'vegetarian': ['Health & Household'],
  'gluten-free': ['Health & Household'],
  'dairy-free': ['Health & Household'],
  'keto': ['Health & Household', 'Sports Nutrition'],
  'paleo': ['Health & Household', 'Sports Nutrition']
};

// -----------------------------------------------------------------------------
// PESOS DE SCORING PARA IA
// -----------------------------------------------------------------------------
export const AI_SCORING_WEIGHTS = {
  goals: 0.35,           // 35% - Objetivos são mais importantes
  lifestyle: 0.20,       // 20% - Estilo de vida
  health: 0.25,          // 25% - Restrições de saúde são críticas
  preferences: 0.10,     // 10% - Preferências de formato
  budget: 0.10          // 10% - Orçamento
};

// -----------------------------------------------------------------------------
// TEMPLATES DE PRODUTOS PARA CADA OBJETIVO
// -----------------------------------------------------------------------------
export const PRODUCT_TEMPLATES = {
  'weight-loss': {
    primary_keywords: ['fat burner', 'weight loss', 'metabolism booster', 'appetite suppressant'],
    secondary_keywords: ['thermogenic', 'CLA', 'green tea extract', 'garcinia cambogia'],
    avoid_keywords: ['weight gain', 'mass gainer', 'bulk'],
    price_multiplier: 1.2
  },
  'muscle-gain': {
    primary_keywords: ['protein powder', 'whey protein', 'mass gainer', 'creatine'],
    secondary_keywords: ['BCAA', 'amino acids', 'pre workout', 'post workout'],
    avoid_keywords: ['weight loss', 'fat burner', 'appetite suppressant'],
    price_multiplier: 1.1
  },
  'energy-boost': {
    primary_keywords: ['energy supplement', 'B complex', 'iron supplement', 'natural energy'],
    secondary_keywords: ['caffeine', 'guarana', 'ginseng', 'rhodiola'],
    avoid_keywords: ['sleep', 'melatonin', 'relaxation'],
    price_multiplier: 1.0
  }
  // ... mais templates conforme necessário
};

// -----------------------------------------------------------------------------
// EXPORTS
// -----------------------------------------------------------------------------
export default QUIZ_CONFIG;

export {
  QUIZ_CONFIG,
  AMAZON_CATEGORY_MAPPING,
  AI_SCORING_WEIGHTS,
  PRODUCT_TEMPLATES
};