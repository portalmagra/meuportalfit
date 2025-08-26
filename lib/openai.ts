// =============================================================================
// MEUPORTALFIT - CLIENTE OPENAI
// =============================================================================

import OpenAI from 'openai';
import type { 
  QuizSession, 
  QuizAnswer, 
  AIAnalysis, 
  GoalType, 
  LifestyleType,
  UserPersona 
} from '@/types';

// Verificações de ambiente
const openaiApiKey = process.env.OPENAI_API_KEY;
const openaiOrgId = process.env.OPENAI_ORG_ID;

if (!openaiApiKey) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

// Configurações
const DEFAULT_MODEL = process.env.OPENAI_MODEL || 'gpt-4-turbo-preview';
const DEFAULT_MAX_TOKENS = parseInt(process.env.OPENAI_MAX_TOKENS || '2000');
const DEFAULT_TEMPERATURE = parseFloat(process.env.OPENAI_TEMPERATURE || '0.7');

// -----------------------------------------------------------------------------
// CLIENTE OPENAI
// -----------------------------------------------------------------------------
export const openai = new OpenAI({
  apiKey: openaiApiKey,
  organization: openaiOrgId,
  timeout: 30000, // 30 segundos timeout
  maxRetries: 3,
  defaultHeaders: {
    'User-Agent': 'MeuPortalFit/1.0.0',
  },
});

// -----------------------------------------------------------------------------
// PROMPTS TEMPLATES
// -----------------------------------------------------------------------------
export const QUIZ_ANALYSIS_PROMPT = `
Você é um especialista em wellness e nutrição focado no mercado brasileiro nos Estados Unidos. 
Sua missão é analisar as respostas de um quiz de wellness e criar um perfil detalhado e personalizado.

CONTEXTO IMPORTANTE:
- O usuário é brasileiro vivendo nos Estados Unidos
- Produtos serão comprados na Amazon.com (preços em USD)
- Considere adaptações culturais (ingredientes, sabores brasileiros)
- Foque em produtos disponíveis nos EUA
- Considere o orçamento em dólares

RESPOSTAS DO USUÁRIO:
{userAnswers}

INSTRUÇÕES DE ANÁLISE:
1. Identifique o objetivo primário e secundários
2. Determine o nível de atividade e estilo de vida
3. Considere restrições dietéticas e de saúde
4. Avalie sensibilidade a preços e preferências de marca
5. Identifique a persona do usuário
6. Calcule score de confiança baseado na consistência das respostas
7. Gere keywords específicas para busca na Amazon
8. Explique as recomendações de forma amigável e personalizada

FORMATO DE RESPOSTA (JSON VÁLIDO):
{
  "confidence_score": number, // 0-100
  "user_profile": {
    "primary_goal": "string",
    "secondary_goals": ["string"],
    "lifestyle_type": "string",
    "activity_level": "string",
    "motivation_level": "string",
    "experience_level": "string",
    "health_priorities": ["string"],
    "dietary_restrictions": ["string"],
    "persona_type": "string",
    "buying_personality": {
      "type": "string",
      "characteristics": ["string"],
      "price_sensitivity": number,
      "brand_preference": "string"
    }
  },
  "recommendations": {
    "product_categories": [
      {
        "category": "string",
        "priority": number,
        "amazon_keywords": ["string"],
        "price_range": {
          "min": number,
          "max": number,
          "optimal": number
        },
        "must_have_features": ["string"],
        "avoid_keywords": ["string"],
        "reason": "string"
      }
    ],
    "lifestyle_tips": ["string"],
    "timing_recommendations": ["string"]
  },
  "explanation": {
    "personalized_message": "string",
    "why_these_products": "string",
    "success_factors": ["string"],
    "next_steps": ["string"],
    "long_term_vision": "string"
  },
  "meta": {
    "processing_confidence": number,
    "main_insights": ["string"],
    "cultural_considerations": ["string"]
  }
}

IMPORTANTE: 
- Responda APENAS com JSON válido
- Use linguagem brasileira calorosa e acolhedora
- Seja específico com keywords Amazon
- Considere o contexto cultural brasileiro
- Foque em resultados práticos e alcançáveis
`;

export const PRODUCT_MATCHING_PROMPT = `
Você é um especialista em produtos de wellness e suplementos vendidos na Amazon.
Sua tarefa é analisar produtos Amazon e determinar se são adequados para um perfil específico.

PERFIL DO USUÁRIO:
{userProfile}

PRODUTO AMAZON:
{productData}

Analise se este produto é uma boa recomendação para este usuário considerando:
1. Alinhamento com objetivos
2. Adequação ao estilo de vida
3. Relação custo-benefício
4. Qualidade e avaliações
5. Disponibilidade e conveniência

RESPONDA EM JSON:
{
  "is_recommended": boolean,
  "match_score": number, // 0-100
  "reasons": {
    "pros": ["string"],
    "cons": ["string"],
    "key_benefits": ["string"]
  },
  "usage_recommendation": {
    "when_to_use": "string",
    "dosage_timing": "string",
    "combination_tips": "string"
  },
  "comparison": {
    "better_alternatives": ["string"],
    "price_justification": "string"
  }
}
`;

// -----------------------------------------------------------------------------
// FUNÇÕES PRINCIPAIS
// -----------------------------------------------------------------------------

/**
 * Analisa respostas do quiz usando OpenAI
 */
export async function analyzeQuizAnswers(
  session: QuizSession,
  answers: Record<string, QuizAnswer>
): Promise<AIAnalysis> {
  const startTime = Date.now();
  
  try {
    // Prepara os dados das respostas
    const formattedAnswers = formatAnswersForAnalysis(answers);
    
    // Cria o prompt personalizado
    const prompt = QUIZ_ANALYSIS_PROMPT.replace(
      '{userAnswers}',
      JSON.stringify(formattedAnswers, null, 2)
    );
    
    // Chama OpenAI
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em wellness, nutrição e suplementos. Responda sempre em JSON válido.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: DEFAULT_MAX_TOKENS,
      temperature: DEFAULT_TEMPERATURE,
      response_format: { type: 'json_object' }
    });
    
    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error('Empty response from OpenAI');
    }
    
    // Parse da resposta
    const analysis = JSON.parse(response);
    
    // Calcula tempo de processamento
    const processingTime = Date.now() - startTime;
    
    // Retorna análise formatada
    return {
      confidence_score: analysis.confidence_score || 75,
      user_profile: analysis.user_profile,
      recommendations: analysis.recommendations,
      explanation: analysis.explanation,
      processing_time_ms: processingTime,
      model_version: DEFAULT_MODEL,
      prompt_version: '1.0',
      raw_openai_response: analysis
    };
    
  } catch (error) {
    console.error('Error analyzing quiz answers:', error);
    
    // Retorna análise de fallback
    return createFallbackAnalysis(session, answers, Date.now() - startTime);
  }
}

/**
 * Avalia se um produto Amazon é adequado para um perfil
 */
export async function evaluateProductMatch(
  userProfile: any,
  productData: any
): Promise<{
  isRecommended: boolean;
  matchScore: number;
  reasons: any;
  usageRecommendation: any;
  comparison: any;
}> {
  try {
    const prompt = PRODUCT_MATCHING_PROMPT
      .replace('{userProfile}', JSON.stringify(userProfile, null, 2))
      .replace('{productData}', JSON.stringify(productData, null, 2));
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em avaliação de produtos de wellness. Responda em JSON válido.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.5,
      response_format: { type: 'json_object' }
    });
    
    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error('Empty response from OpenAI');
    }
    
    const evaluation = JSON.parse(response);
    
    return {
      isRecommended: evaluation.is_recommended,
      matchScore: evaluation.match_score,
      reasons: evaluation.reasons,
      usageRecommendation: evaluation.usage_recommendation,
      comparison: evaluation.comparison
    };
    
  } catch (error) {
    console.error('Error evaluating product match:', error);
    
    // Retorna avaliação neutra em caso de erro
    return {
      isRecommended: false,
      matchScore: 50,
      reasons: {
        pros: ['Produto popular na Amazon'],
        cons: ['Não foi possível analisar completamente'],
        keyBenefits: ['Veja as avaliações do produto']
      },
      usageRecommendation: {
        whenToUse: 'Consulte as instruções do fabricante',
        dosageTiming: 'Siga as orientações da embalagem',
        combinationTips: 'Consulte um profissional de saúde'
      },
      comparison: {
        betterAlternatives: [],
        priceJustification: 'Preço compatível com produtos similares'
      }
    };
  }
}

/**
 * Gera explicação personalizada para recomendações
 */
export async function generatePersonalizedExplanation(
  userProfile: any,
  recommendedProducts: any[]
): Promise<string> {
  try {
    const prompt = `
Você é um especialista em wellness focado em brasileiros nos EUA.
Crie uma explicação calorosa e personalizada sobre por que estes produtos foram recomendados.

PERFIL: ${JSON.stringify(userProfile)}
PRODUTOS: ${JSON.stringify(recommendedProducts)}

Escreva uma explicação de 2-3 parágrafos em português brasileiro, sendo:
1. Acolhedora e encorajadora
2. Específica aos objetivos da pessoa
3. Prática e acionável
4. Considerando o contexto cultural brasileiro

Use tom pessoal e amigável, como se fosse uma conversa entre amigos.
`;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'user', content: prompt }
      ],
      max_tokens: 800,
      temperature: 0.8
    });
    
    return completion.choices[0]?.message?.content || 'Estes produtos foram selecionados especialmente para você!';
    
  } catch (error) {
    console.error('Error generating personalized explanation:', error);
    return 'Estes produtos foram cuidadosamente selecionados baseados no seu perfil e objetivos de wellness!';
  }
}

// -----------------------------------------------------------------------------
// FUNÇÕES AUXILIARES
// -----------------------------------------------------------------------------

/**
 * Formata respostas do quiz para análise
 */
function formatAnswersForAnalysis(answers: Record<string, QuizAnswer>): Record<string, any> {
  const formatted: Record<string, any> = {};
  
  Object.entries(answers).forEach(([questionId, answer]) => {
    formatted[questionId] = {
      question_id: questionId,
      value: answer.value,
      selected_options: answer.selected_options,
      confidence: answer.confidence_level || 5,
      time_spent: answer.time_spent_seconds
    };
  });
  
  return formatted;
}

/**
 * Cria análise de fallback em caso de erro
 */
function createFallbackAnalysis(
  session: QuizSession,
  answers: Record<string, QuizAnswer>,
  processingTime: number
): AIAnalysis {
  // Análise simples baseada em regras
  const primaryGoal = inferPrimaryGoal(answers);
  const lifestyleType = inferLifestyleType(answers);
  const persona = inferPersona(answers);
  
  return {
    confidence_score: 60, // Score baixo para fallback
    user_profile: {
      primary_goal: primaryGoal,
      secondary_goals: ['general-health'],
      lifestyle_type: lifestyleType,
      activity_level: 'moderado',
      motivation_level: 'medio',
      experience_level: 'intermediario',
      health_priorities: ['energia', 'bem-estar-geral'],
      dietary_restrictions: [],
      persona_type: persona,
      buying_personality: {
        type: 'balanced',
        characteristics: ['busca qualidade', 'consciente do preço'],
        price_sensitivity: 5,
        brand_preference: 'mainstream'
      }
    },
    recommendations: {
      product_categories: [
        {
          category: 'Multivitamínicos',
          priority: 1,
          amazon_keywords: ['multivitamin', 'daily vitamin', 'complete nutrition'],
          price_range: { min: 15, max: 50, optimal: 30 },
          must_have_features: ['third party tested', 'non-gmo'],
          avoid_keywords: ['artificial colors', 'fillers'],
          reason: 'Base sólida para nutrição geral'
        }
      ],
      lifestyle_tips: [
        'Comece devagar e seja consistente',
        'Mantenha uma alimentação equilibrada',
        'Pratique atividades físicas regularmente'
      ],
      timing_recommendations: [
        'Tome suplementos com as refeições',
        'Mantenha horários regulares'
      ]
    },
    explanation: {
      personalized_message: 'Com base no seu perfil, selecionamos produtos que podem apoiar seus objetivos de wellness de forma segura e eficaz.',
      why_these_products: 'Estes produtos foram escolhidos para fornecer uma base nutricional sólida enquanto você desenvolve hábitos mais saudáveis.',
      success_factors: ['Consistência', 'Paciência', 'Acompanhamento'],
      next_steps: [
        'Comece com um produto por vez',
        'Monitore como se sente',
        'Ajuste conforme necessário'
      ],
      long_term_vision: 'Seu objetivo é criar um estilo de vida sustentável e saudável que funcione com sua rotina nos Estados Unidos.'
    },
    processing_time_ms: processingTime,
    model_version: 'fallback-1.0',
    prompt_version: 'fallback',
    raw_openai_response: { fallback: true }
  };
}

/**
 * Infere objetivo primário das respostas
 */
function inferPrimaryGoal(answers: Record<string, QuizAnswer>): GoalType {
  // Lógica simples para inferir objetivo
  const goalAnswers = Object.values(answers).filter(a => 
    a.question_id.includes('goal') || a.question_id.includes('objetivo')
  );
  
  if (goalAnswers.length > 0) {
    const firstGoalAnswer = goalAnswers[0];
    if (typeof firstGoalAnswer.value === 'string') {
      if (firstGoalAnswer.value.includes('peso')) return 'weight-loss';
      if (firstGoalAnswer.value.includes('musculo')) return 'muscle-gain';
      if (firstGoalAnswer.value.includes('energia')) return 'energy-boost';
      if (firstGoalAnswer.value.includes('stress')) return 'stress-management';
    }
  }
  
  return 'general-health';
}

/**
 * Infere tipo de lifestyle das respostas
 */
function inferLifestyleType(answers: Record<string, QuizAnswer>): LifestyleType {
  const activityAnswers = Object.values(answers).filter(a => 
    a.question_id.includes('atividade') || a.question_id.includes('exercicio')
  );
  
  if (activityAnswers.length > 0) {
    const activityValue = activityAnswers[0].value;
    if (typeof activityValue === 'string') {
      if (activityValue.includes('sedentario')) return 'sedentario';
      if (activityValue.includes('muito-ativo')) return 'muito-ativo';
      if (activityValue.includes('moderadamente')) return 'moderadamente-ativo';
    }
  }
  
  return 'moderadamente-ativo';
}

/**
 * Infere persona do usuário
 */
function inferPersona(answers: Record<string, QuizAnswer>): UserPersona {
  // Análise simples baseada nas respostas
  const budgetAnswers = Object.values(answers).filter(a => 
    a.question_id.includes('budget') || a.question_id.includes('orcamento')
  );
  
  if (budgetAnswers.length > 0) {
    const budgetValue = budgetAnswers[0].value;
    if (typeof budgetValue === 'string') {
      if (budgetValue.includes('ate-50')) return 'budget-conscious';
      if (budgetValue.includes('acima-500')) return 'premium-seeker';
    }
  }
  
  return 'health-enthusiast';
}

// -----------------------------------------------------------------------------
// HEALTH CHECK E UTILITÁRIOS
// -----------------------------------------------------------------------------

/**
 * Testa conexão com OpenAI
 */
export async function testOpenAIConnection(): Promise<boolean> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Hello' }],
      max_tokens: 5
    });
    
    return !!completion.choices[0]?.message?.content;
  } catch (error) {
    console.error('OpenAI connection test failed:', error);
    return false;
  }
}

/**
 * Conta tokens aproximadamente
 */
export function estimateTokens(text: string): number {
  // Estimativa rough: 1 token ≈ 4 caracteres para português
  return Math.ceil(text.length / 4);
}

/**
 * Calcula custo estimado da chamada
 */
export function estimateCost(inputTokens: number, outputTokens: number): number {
  // Preços GPT-4 Turbo (aproximados em USD)
  const inputCostPer1K = 0.01;
  const outputCostPer1K = 0.03;
  
  const inputCost = (inputTokens / 1000) * inputCostPer1K;
  const outputCost = (outputTokens / 1000) * outputCostPer1K;
  
  return inputCost + outputCost;
}

// -----------------------------------------------------------------------------
// RATE LIMITING E CACHE
// -----------------------------------------------------------------------------

const requestCache = new Map<string, { data: any; timestamp: number }>();

/**
 * Cache de respostas do OpenAI
 */
export function getCachedResponse(key: string, ttlMinutes: number = 30): any | null {
  const cached = requestCache.get(key);
  
  if (!cached) return null;
  
  const age = (Date.now() - cached.timestamp) / (1000 * 60); // minutos
  
  if (age > ttlMinutes) {
    requestCache.delete(key);
    return null;
  }
  
  return cached.data;
}

/**
 * Salva resposta no cache
 */
export function setCachedResponse(key: string, data: any): void {
  requestCache.set(key, {
    data,
    timestamp: Date.now()
  });
  
  // Limita tamanho do cache
  if (requestCache.size > 100) {
    const firstKey = requestCache.keys().next().value;
    requestCache.delete(firstKey);
  }
}

// -----------------------------------------------------------------------------
// EXPORTS
// -----------------------------------------------------------------------------
export default openai;