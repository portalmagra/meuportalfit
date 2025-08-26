// =============================================================================
// MEUPORTALFIT - API ROUTE: ANALISAR QUIZ COM IA
// =============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerSupabaseClient, trackUserEvent } from '@/lib/supabase';
import { analyzeQuizAnswers } from '@/lib/openai';
import { searchWellnessProducts, getRecommendedProducts } from '@/lib/amazon';
import { generateUUID } from '@/lib/utils';
import type { 
  QuizAnswer, 
  AIAnalysis, 
  AmazonProduct, 
  APIResponse,
  RecommendedProduct 
} from '@/types';

// -----------------------------------------------------------------------------
// INTERFACE DA REQUEST
// -----------------------------------------------------------------------------
interface AnalyzeQuizRequest {
  sessionId: string;
  answers: Record<string, QuizAnswer>;
  generateProducts?: boolean;
}

// -----------------------------------------------------------------------------
// INTERFACE DA RESPONSE
// -----------------------------------------------------------------------------
interface AnalyzeQuizResponse {
  session_id: string;
  result_id: string;
  analysis: AIAnalysis;
  recommended_products: AmazonProduct[];
  recommendations: RecommendedProduct[];
  share_token: string;
}

// -----------------------------------------------------------------------------
// POST: ANALISAR QUIZ
// -----------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Parse do body
    const body: AnalyzeQuizRequest = await request.json();
    const {
      sessionId,
      answers,
      generateProducts = true
    } = body;

    // Validações básicas
    if (!sessionId || !answers || Object.keys(answers).length === 0) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'INVALID_REQUEST',
          message: 'SessionId e respostas são obrigatórios'
        }
      } satisfies APIResponse, { status: 400 });
    }

    const supabase = createRouteHandlerSupabaseClient();

    // 1. Busca a sessão do quiz
    const { data: session, error: sessionError } = await supabase
      .from('quiz_sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (sessionError || !session) {
      console.error('Error fetching quiz session:', sessionError);
      return NextResponse.json({
        success: false,
        error: {
          code: 'SESSION_NOT_FOUND',
          message: 'Sessão do quiz não encontrada'
        }
      } satisfies APIResponse, { status: 404 });
    }

    // 2. Verifica se já não foi analisado
    const { data: existingResults } = await supabase
      .from('quiz_results')
      .select('*')
      .eq('session_id', sessionId)
      .single();

    if (existingResults) {
      // Retorna resultado existente
      const { data: recommendations } = await supabase
        .from('recommendations')
        .select(`
          *,
          amazon_products (*)
        `)
        .eq('result_id', existingResults.id)
        .order('recommendation_rank');

      return NextResponse.json({
        success: true,
        data: {
          session_id: sessionId,
          result_id: existingResults.id,
          analysis: existingResults.ai_analysis,
          recommended_products: recommendations?.map(r => r.amazon_products) || [],
          recommendations: recommendations || [],
          share_token: existingResults.share_token
        } satisfies AnalyzeQuizResponse
      } satisfies APIResponse<AnalyzeQuizResponse>, { status: 200 });
    }

    // 3. Análise com IA (OpenAI)
    console.log('Starting AI analysis...');
    
    const aiAnalysis = await analyzeQuizAnswers(session, answers);
    
    if (!aiAnalysis) {
      throw new Error('Falha na análise IA');
    }

    console.log('AI analysis completed, confidence:', aiAnalysis.confidence_score);

    // 4. Busca produtos na Amazon (se solicitado)
    let recommendedProducts: AmazonProduct[] = [];
    
    if (generateProducts && aiAnalysis.recommendations?.product_categories) {
      console.log('Searching for products on Amazon...');
      
      try {
        const searchTerms = aiAnalysis.recommendations.amazon_search_keywords || [];
        const priceRange = aiAnalysis.recommendations.price_range_usd || { min: 10, max: 100 };
        
        const preferences = {
          brands: aiAnalysis.user_profile.buying_personality?.type === 'premium' 
            ? ['Nature Made', 'Garden of Life', 'NOW Foods', 'Thorne'] 
            : undefined,
          avoidKeywords: aiAnalysis.recommendations.categories_to_avoid || [],
          categories: aiAnalysis.recommendations.categories_to_focus || []
        };

        recommendedProducts = await getRecommendedProducts(
          searchTerms.slice(0, 5), // Limita a 5 termos para performance
          priceRange,
          preferences
        );

        console.log(`Found ${recommendedProducts.length} products on Amazon`);

        // Salva produtos no banco (se novos)
        if (recommendedProducts.length > 0) {
          await saveProductsToDatabase(supabase, recommendedProducts);
        }

      } catch (error) {
        console.error('Error searching Amazon products:', error);
        // Continua sem produtos - não é um erro fatal
      }
    }

    // 5. Salva resultado no banco
    const { data: quizResult, error: resultError } = await supabase
      .from('quiz_results')
      .insert({
        session_id: sessionId,
        user_id: session.user_id,
        ai_analysis: aiAnalysis,
        confidence_score: aiAnalysis.confidence_score,
        analysis_version: '1.0',
        model_version: aiAnalysis.model_version,
        processing_time_ms: aiAnalysis.processing_time_ms,
        status: 'published'
      })
      .select()
      .single();

    if (resultError || !quizResult) {
      console.error('Error saving quiz result:', resultError);
      throw new Error('Erro ao salvar resultado');
    }

    console.log('Quiz result saved with ID:', quizResult.id);

    // 6. Cria recomendações com scores
    const recommendations: RecommendedProduct[] = [];
    
    if (recommendedProducts.length > 0) {
      const recommendationsData = recommendedProducts
        .slice(0, 10) // Top 10 produtos
        .map((product, index) => {
          const matchScore = calculateProductMatchScore(
            aiAnalysis.user_profile,
            product,
            aiAnalysis.recommendations
          );

          return {
            result_id: quizResult.id,
            product_id: product.id,
            recommendation_rank: index + 1,
            match_score: matchScore,
            reason: getRecommendationReason(aiAnalysis, product, index),
            ai_explanation: generateProductExplanation(aiAnalysis, product)
          };
        });

      const { data: savedRecommendations, error: recError } = await supabase
        .from('recommendations')
        .insert(recommendationsData)
        .select(`
          *,
          amazon_products (*)
        `);

      if (recError) {
        console.error('Error saving recommendations:', recError);
      } else {
        recommendations.push(...(savedRecommendations || []));
      }
    }

    // 7. Atualiza sessão como concluída
    await supabase
      .from('quiz_sessions')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        answers,
        total_time_seconds: Math.round((Date.now() - new Date(session.created_at).getTime()) / 1000)
      })
      .eq('id', sessionId);

    // 8. Track evento de análise completa
    await trackUserEvent(
      'quiz_analyzed',
      {
        session_id: sessionId,
        result_id: quizResult.id,
        confidence_score: aiAnalysis.confidence_score,
        products_found: recommendedProducts.length,
        primary_goal: aiAnalysis.user_profile.primary_goal,
        processing_time_ms: Date.now() - startTime
      },
      session.user_id || undefined,
      sessionId
    );

    // 9. Resposta de sucesso
    const response: APIResponse<AnalyzeQuizResponse> = {
      success: true,
      data: {
        session_id: sessionId,
        result_id: quizResult.id,
        analysis: aiAnalysis,
        recommended_products: recommendedProducts,
        recommendations: recommendations.map(r => ({
          product_id: r.product_id,
          rank: r.recommendation_rank,
          match_score: r.match_score,
          reason_category: categorizeReason(r.reason || ''),
          ai_explanation: r.ai_explanation,
          confidence_level: r.match_score > 80 ? 'high' : r.match_score > 60 ? 'medium' : 'low'
        })),
        share_token: quizResult.share_token
      },
      meta: {
        timestamp: new Date().toISOString(),
        request_id: generateUUID(),
        processing_time_ms: Date.now() - startTime
      }
    };

    console.log(`Quiz analysis completed in ${Date.now() - startTime}ms`);

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('Error in quiz analyze API:', error);
    
    return NextResponse.json({
      success: false,
      error: {
        code: 'ANALYSIS_ERROR',
        message: error instanceof Error ? error.message : 'Erro na análise do quiz'
      }
    } satisfies APIResponse, { status: 500 });
  }
}

// -----------------------------------------------------------------------------
// UTILITY FUNCTIONS
// -----------------------------------------------------------------------------

/**
 * Salva produtos no banco de dados (evita duplicatas)
 */
async function saveProductsToDatabase(supabase: any, products: AmazonProduct[]) {
  try {
    for (const product of products) {
      // Verifica se produto já existe
      const { data: existing } = await supabase
        .from('amazon_products')
        .select('id')
        .eq('asin', product.asin)
        .single();

      if (!existing) {
        // Insere novo produto
        await supabase
          .from('amazon_products')
          .insert({
            asin: product.asin,
            title: product.title,
            description: product.description,
            brand: product.brand,
            price: product.price,
            currency: product.currency,
            prime_eligible: product.prime_eligible,
            in_stock: product.in_stock,
            primary_image_url: product.primary_image_url,
            image_urls: product.image_urls,
            main_category: product.main_category,
            sub_categories: product.sub_categories,
            rating: product.rating,
            review_count: product.review_count,
            features: product.features,
            specifications: product.specifications,
            amazon_url: product.amazon_url,
            affiliate_url: product.affiliate_url,
            keywords: product.keywords,
            sync_status: 'synced',
            popularity_score: product.popularity_score
          });
      } else {
        // Atualiza produto existente
        await supabase
          .from('amazon_products')
          .update({
            title: product.title,
            description: product.description,
            price: product.price,
            in_stock: product.in_stock,
            rating: product.rating,
            review_count: product.review_count,
            last_updated: new Date().toISOString(),
            sync_status: 'synced'
          })
          .eq('asin', product.asin);
      }
    }
  } catch (error) {
    console.error('Error saving products to database:', error);
    // Não falha a operação principal
  }
}

/**
 * Calcula score de match entre usuário e produto
 */
function calculateProductMatchScore(
  userProfile: any,
  product: AmazonProduct,
  recommendations: any
): number {
  let score = 0;
  
  // Base score por rating do produto
  if (product.rating) {
    score += (product.rating / 5) * 20; // Max 20 pontos
  }
  
  // Score por número de reviews (logarítmico)
  if (product.review_count) {
    score += Math.min(Math.log(product.review_count) * 3, 15); // Max 15 pontos
  }
  
  // Score por match de keywords
  const productKeywords = [
    ...product.keywords,
    ...product.features.join(' ').toLowerCase().split(' '),
    product.title.toLowerCase()
  ].join(' ');
  
  const searchKeywords = recommendations.amazon_keywords || [];
  const keywordMatches = searchKeywords.filter(keyword => 
    productKeywords.includes(keyword.toLowerCase())
  ).length;
  
  score += (keywordMatches / Math.max(searchKeywords.length, 1)) * 25; // Max 25 pontos
  
  // Score por faixa de preço
  if (product.price && recommendations.price_range_usd) {
    const { min, max } = recommendations.price_range_usd;
    if (product.price >= min && product.price <= max) {
      score += 20; // 20 pontos se está na faixa
    } else if (product.price < min) {
      score += 10; // 10 pontos se está abaixo (mais barato)
    }
  }
  
  // Score por Prime eligible
  if (product.prime_eligible) {
    score += 5;
  }
  
  // Score por disponibilidade
  if (product.in_stock) {
    score += 10;
  }
  
  // Bonus por marcas premium se usuário tem perfil premium
  if (userProfile.buying_personality?.type === 'premium') {
    const premiumBrands = ['nature made', 'garden of life', 'thorne', 'now foods'];
    if (premiumBrands.some(brand => product.brand?.toLowerCase().includes(brand))) {
      score += 5;
    }
  }
  
  return Math.min(Math.round(score), 100);
}

/**
 * Gera razão para recomendação
 */
function getRecommendationReason(
  analysis: AIAnalysis,
  product: AmazonProduct,
  rank: number
): string {
  const primaryGoal = analysis.user_profile.primary_goal;
  
  const reasons = {
    'weight-loss': 'Suporte para objetivos de perda de peso',
    'muscle-gain': 'Ideal para construção de massa muscular',
    'energy-boost': 'Aumento de energia e disposição',
    'stress-management': 'Ajuda no controle do stress',
    'sleep-improvement': 'Melhoria na qualidade do sono',
    'immune-support': 'Fortalecimento do sistema imunológico',
    'digestive-health': 'Suporte para saúde digestiva',
    'skin-beauty': 'Benefícios para pele, cabelo e unhas',
    'performance': 'Melhoria da performance física',
    'general-health': 'Suporte para saúde geral'
  };
  
  let baseReason = reasons[primaryGoal as keyof typeof reasons] || 'Recomendado para seu perfil';
  
  // Adiciona contexto baseado no rank
  if (rank === 0) {
    baseReason = `Primeira escolha: ${baseReason}`;
  } else if (rank === 1) {
    baseReason = `Excelente alternativa: ${baseReason}`;
  } else if (product.rating && product.rating > 4.5) {
    baseReason = `Bem avaliado: ${baseReason}`;
  }
  
  return baseReason;
}

/**
 * Gera explicação detalhada do produto
 */
function generateProductExplanation(
  analysis: AIAnalysis,
  product: AmazonProduct
): string {
  const primaryGoal = analysis.user_profile.primary_goal;
  const lifestyle = analysis.user_profile.lifestyle_type;
  
  let explanation = `Este produto foi selecionado especificamente para seu objetivo de ${primaryGoal}. `;
  
  if (product.rating && product.rating > 4.0) {
    explanation += `Com ${product.rating} estrelas e ${product.review_count} avaliações, `;
    explanation += `é uma opção bem avaliada pelos consumidores. `;
  }
  
  if (product.prime_eligible) {
    explanation += 'Elegível para Amazon Prime, garantindo entrega rápida. ';
  }
  
  if (lifestyle === 'busy-professional') {
    explanation += 'Ideal para sua rotina corrida, com formato prático e fácil de usar.';
  }
  
  return explanation;
}

/**
 * Categoriza razão da recomendação
 */
function categorizeReason(reason: string): 'primary-goal' | 'secondary-goal' | 'lifestyle-match' | 'budget-fit' | 'high-rating' {
  if (reason.includes('Primeira escolha') || reason.includes('objetivo')) {
    return 'primary-goal';
  }
  
  if (reason.includes('alternativa')) {
    return 'secondary-goal';
  }
  
  if (reason.includes('rotina') || reason.includes('lifestyle')) {
    return 'lifestyle-match';
  }
  
  if (reason.includes('preço') || reason.includes('budget')) {
    return 'budget-fit';
  }
  
  if (reason.includes('bem avaliado') || reason.includes('estrelas')) {
    return 'high-rating';
  }
  
  return 'primary-goal';
}