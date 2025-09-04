import 'server-only'
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Schema para output estruturado
const OutputSchema = {
  type: 'object',
  properties: {
    acolhimento: { type: 'string' },
    analise: { type: 'string' },
    contexto_cultural: { type: 'string' },
    habitos: { 
      type: 'array', 
      items: { type: 'string' },
      minItems: 5,
      maxItems: 5
    },
    produtos: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          price: { type: 'string' },
          rating: { type: 'string' },
          searchTerms: { type: 'string' },
          whyPerfect: { type: 'string' }
        },
        required: ['name', 'description', 'price', 'rating', 'searchTerms', 'whyPerfect']
      },
      minItems: 4,
      maxItems: 4
    },
    timeline: { type: 'string' },
    proximo_passo: { type: 'string' }
  },
  required: ['acolhimento', 'analise', 'contexto_cultural', 'habitos', 'produtos', 'timeline', 'proximo_passo']
}

// Prompts por idioma
const SYSTEM_BY_LANG = {
  pt: `Você é um especialista em bem-estar e saúde, focado em ajudar brasileiros que vivem nos EUA. 
  Analise as respostas do usuário e forneça uma análise personalizada, hábitos específicos e recomendações de produtos.
  
  IMPORTANTE: Use sempre o formato JSON exato especificado no schema. NUNCA adicione texto extra antes ou depois do JSON.`,
  es: `Eres un experto en bienestar y salud, enfocado en ayudar brasileños que viven en los EUA.
  Analiza las respuestas del usuario y proporciona un análisis personalizado, hábitos específicos y recomendaciones de productos.
  
  IMPORTANTE: Usa siempre el formato JSON exacto especificado en el schema. NUNCA agregues texto extra antes o después del JSON.`,
  en: `You are a wellness and health expert, focused on helping Brazilians living in the USA.
  Analyze the user's responses and provide personalized analysis, specific habits, and product recommendations.
  
  IMPORTANTE: Always use the exact JSON format specified in the schema. NEVER add extra text before or after the JSON.`
}

const TARGET_BY_LANG = {
  pt: 'Brasileiros vivendo nos EUA',
  es: 'Brasileños viviendo en los EUA', 
  en: 'Brazilians living in the USA'
}

// Função para encontrar produtos (mockado por enquanto)
function findProducts(category: string, criteria: any) {
  // Base de dados mockada de produtos
  const productDatabase = {
    'vitaminas': [
      {
        name: 'NOW Foods B-Complex Energy',
        description: 'Complexo de vitaminas B para energia celular e redução da fadiga.',
        price: '$15.99',
        rating: '4.6/5',
        searchTerms: 'now foods b complex energy vitamin',
        whyPerfect: 'Combina vitaminas do complexo B ligadas à produção de energia e foco.'
      },
      {
        name: 'Nature Made Vitamin D3 2000 IU',
        description: 'Vitamina D3 para saúde óssea e sistema imunológico.',
        price: '$12.99',
        rating: '4.7/5',
        searchTerms: 'nature made vitamin d3 2000iu',
        whyPerfect: 'Essencial para brasileiros que vivem em climas com menos sol.'
      }
    ],
    'suplementos': [
      {
        name: 'Rhodiola Rosea (Energia Natural)',
        description: 'Adaptógeno natural que aumenta energia e resistência ao estresse.',
        price: '$22.99',
        rating: '4.7/5',
        searchTerms: 'rhodiola rosea energy stress',
        whyPerfect: 'Aumenta energia natural sem causar nervosismo ou dependência.'
      },
      {
        name: 'Magnésio Glicinato (Sono & Relaxamento)',
        description: 'Magnésio de alta biodisponibilidade para sono e relaxamento muscular.',
        price: '$18.99',
        rating: '4.7/5',
        searchTerms: 'magnesium glycinate sleep',
        whyPerfect: 'Ajuda a melhorar a qualidade do sono sem ressaca matinal.'
      }
    ],
    'sono': [
      {
        name: 'Melatonina 3mg (Sono Natural)',
        description: 'Hormônio natural para regular o ciclo do sono.',
        price: '$12.99',
        rating: '4.5/5',
        searchTerms: 'melatonin 3mg sleep',
        whyPerfect: 'Regula o ciclo circadiano naturalmente, ideal para mudanças de fuso horário.'
      },
      {
        name: 'L-Theanine (Relaxamento Natural)',
        description: 'Aminoácido que promove relaxamento sem sonolência.',
        price: '$16.99',
        rating: '4.6/5',
        searchTerms: 'l theanine relaxation',
        whyPerfect: 'Ajuda a relaxar a mente sem afetar a concentração.'
      }
    ],
    'energia': [
      {
        name: 'Omega-3 (Óleo de Peixe) Premium',
        description: 'Triglicérides concentrados, apoio cardiovascular e cognitivo.',
        price: '$22.99',
        rating: '4.7/5',
        searchTerms: 'omega 3 fish oil molecularly distilled',
        whyPerfect: 'Útil para inflamação, foco e saúde do coração no dia a dia corrido.'
      },
      {
        name: 'CoQ10 (Energia Celular)',
        description: 'Coenzima Q10 para energia celular e saúde cardiovascular.',
        price: '$24.99',
        rating: '4.5/5',
        searchTerms: 'coq10 cellular energy',
        whyPerfect: 'Aumenta a energia celular naturalmente.'
      }
    ]
  }

  // Retorna produtos baseados na categoria
  return productDatabase[category as keyof typeof productDatabase] || productDatabase['vitaminas']
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { answers, comments, language = 'pt', userName, userAge } = body

    // Decodificar respostas
    const decodedAnswers = JSON.parse(decodeURIComponent(answers))
    
    // Determinar idioma
    const lang = language as keyof typeof SYSTEM_BY_LANG || 'pt'
    
    // Construir prompt do usuário
    const userPrompt = `
    Analise as seguintes respostas de um usuário brasileiro vivendo nos EUA:

    Nome: ${userName}
    Idade: ${userAge}
    
    Respostas do questionário:
    ${Object.entries(decodedAnswers).map(([q, a]) => `Pergunta ${q}: ${a}`).join('\n')}
    
    Comentários adicionais: ${comments || 'Nenhum comentário adicional'}

    Baseado nessas respostas, forneça:
    1. Uma análise personalizada e específica
    2. 5 hábitos específicos e acionáveis
    3. 4 produtos recomendados da Amazon (com preços e avaliações reais)
    4. Timeline de implementação
    5. Próximos passos

    Foque em soluções práticas para brasileiros vivendo nos EUA, considerando:
    - Adaptação cultural e climática
    - Acesso a produtos brasileiros
    - Rotina americana
    - Preços em dólares
    - Produtos disponíveis na Amazon US

    IMPORTANTE: 
    - Seja específico e personalizado, não genérico
    - Use o nome do usuário no acolhimento
    - Recomende produtos reais da Amazon US
    - Inclua preços em dólares
    - Considere a idade e contexto cultural
    `

    // Passo A: Análise inicial para extrair necessidades
    const analysisResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: SYSTEM_BY_LANG[lang]
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
      response_format: { type: 'json_schema', schema: OutputSchema },
      temperature: 0.7,
      max_tokens: 2000
    })

    const result = analysisResponse.choices[0].message.content
    
    if (!result) {
      throw new Error('Resposta vazia da IA')
    }

    // Parsear JSON
    let parsedResult
    try {
      parsedResult = JSON.parse(result)
    } catch (error) {
      console.error('Erro ao fazer parse do JSON:', error)
      throw new Error('Resposta inválida da IA')
    }

    // Log para debug
    console.log('🤖 Resposta da IA:', parsedResult)

    return NextResponse.json(parsedResult)

  } catch (error) {
    console.error('Assessment API error:', error)
    
    // Fallback com produtos genéricos mas personalizados
    const fallbackResult = {
      acolhimento: `Querido ${body.userName || 'amigo'},`,
      analise: 'Baseado nas suas respostas, identifiquei algumas áreas importantes para melhorar seu bem-estar. Vou sugerir hábitos e produtos específicos para sua situação.',
      contexto_cultural: 'Como brasileiro vivendo nos EUA, você enfrenta desafios únicos de adaptação cultural e climática. Essas sugestões são pensadas especificamente para sua realidade.',
      habitos: [
        '**Hábito 1:** Inclua vitaminas do complexo B na sua dieta - Essenciais para energia e foco.',
        '**Hábito 2:** Experimente um adaptógeno natural - Ajuda com estresse e energia.',
        '**Hábito 3:** Priorize um sono de qualidade - Fundamental para adaptação.',
        '**Hábito 4:** Regule seu ciclo de sono - Importante para mudanças de fuso horário.',
        '**Hábito 5:** Crie uma rotina relaxante antes de dormir - Ajuda com o estresse.'
      ],
      produtos: [
        {
          name: 'NOW Foods B-Complex Energy',
          description: 'Complexo de vitaminas B para energia celular.',
          price: '$15.99',
          rating: '4.6/5',
          searchTerms: 'now foods b complex energy vitamin',
          whyPerfect: 'Combina vitaminas essenciais para energia e foco.'
        },
        {
          name: 'Rhodiola Rosea (Energia Natural)',
          description: 'Adaptógeno natural para energia e resistência ao estresse.',
          price: '$22.99',
          rating: '4.7/5',
          searchTerms: 'rhodiola rosea energy stress',
          whyPerfect: 'Aumenta energia natural sem causar nervosismo.'
        },
        {
          name: 'Magnésio Glicinato (Sono & Relaxamento)',
          description: 'Magnésio para sono e relaxamento muscular.',
          price: '$18.99',
          rating: '4.7/5',
          searchTerms: 'magnesium glycinate sleep',
          whyPerfect: 'Melhora a qualidade do sono sem ressaca matinal.'
        },
        {
          name: 'Melatonina 3mg (Sono Natural)',
          description: 'Hormônio natural para regular o ciclo do sono.',
          price: '$12.99',
          rating: '4.5/5',
          searchTerms: 'melatonin 3mg sleep',
          whyPerfect: 'Regula o ciclo circadiano naturalmente.'
        }
      ],
      timeline: 'Comece implementando esses hábitos gradualmente ao longo das próximas semanas.',
      proximo_passo: 'Escolha um ou dois produtos para começar e observe como seu corpo responde.'
    }

    return NextResponse.json(fallbackResult)
  }
}