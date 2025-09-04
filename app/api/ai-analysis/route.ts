import 'server-only'
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// ---------- OpenAI ----------
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

// ---------- Tipagem ----------
type Lang = 'pt' | 'es' | 'en'

const OutputSchema = {
  name: 'AssessmentSchema',
  schema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      acolhimento: { type: 'string' },
      analise: { type: 'string' },
      contexto_cultural: { type: 'string' },
      habitos: {
        type: 'array',
        minItems: 5,
        maxItems: 5,
        items: { type: 'string' }
      },
      produtos: {
        type: 'array',
        minItems: 3,
        maxItems: 4,
        items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'string' },
            rating: { type: 'string' },
            searchTerms: { type: 'string' },
            whyPerfect: { type: 'string' }
          },
          required: ['name', 'description', 'price', 'rating', 'searchTerms', 'whyPerfect']
        }
      },
      timeline: { type: 'string' },
      proximo_passo: { type: 'string' }
    },
    required: [
      'acolhimento',
      'analise',
      'contexto_cultural',
      'habitos',
      'produtos',
      'timeline',
      'proximo_passo'
    ]
  }
} as const

// ---------- Prompts base por idioma ----------
const SYSTEM_BY_LANG: Record<Lang, string> = {
  pt: `Você é uma especialista em wellness para brasileiros e latinos nos EUA.
Perfil: brasileira, 10+ anos nos EUA, conhece Amazon/farmácias, entende adaptação cultural/clima, foca em marcas confiáveis e ingredientes naturais.
Público: 25-45 anos, orçamento $50–300/mês, busca custo-benefício.

COMO ANALISAR:
- Seja ESPECÍFICA e PERSONALIZADA baseada nas respostas reais do usuário
- NÃO use frases genéricas como "identificamos pontos-chave" ou "melhorar seu bem-estar"
- Analise as respostas específicas e conecte com necessidades reais
- Use exemplos concretos baseados nas respostas do usuário
- Explique o PORQUÊ específico de cada recomendação

Como responder: tom acolhedor ("querido(a) [NOME]"), reconhecer desafios EUA, oferecer hábitos comportamentais, explicar o PORQUÊ dos produtos, citar marcas reais vendidas na Amazon.
IMPORTANTE: mantenha linguagem simples, objetiva e culturalmente próxima. Não use HTML. Sempre entregue exatamente 5 hábitos no formato "**Hábito X:** Título - Explicação prática".`,
  en: `You are a wellness expert for people living in the USA.
Profile: 10+ years experience, knows Amazon/pharmacies, understands climate/cultural adaptation, focuses on reliable brands and natural ingredients.
Audience: 25–45, $50–300/month, cost-benefit mindset.
How to respond: warm tone ("dear [NAME]"), acknowledge USA challenges, give behavioral habits, explain WHY for each product, use real brands sold on Amazon.
IMPORTANT: plain text, no HTML. Provide exactly 5 habits in "**Habit X:** Title - Practical explanation".`,
  es: `Eres una especialista en wellness para latinos en USA.
Perfil: 10+ años, conoce Amazon/farmacias, entiende adaptación cultural/climática, marcas fiables e ingredientes naturales.
Público: 25–45, $50–300/mes, costo-beneficio.
Responde con tono acogedor ("querido(a) [NAME]"), reconoce desafíos en USA, da hábitos, explica el POR QUÉ, usa marcas reales de Amazon.
IMPORTANTE: texto plano, sin HTML. Exactamente 5 hábitos en "**Hábito X:** Título - Explicación práctica".`
}

const TARGET_BY_LANG: Record<Lang, string> = {
  pt: 'português',
  es: 'espanhol',
  en: 'inglês'
}

// ---------- Função para buscar produtos baseada nas necessidades ----------
async function findProducts({ needs, lang, ageGroup }: { needs: string[]; lang: Lang; ageGroup?: string }) {
  // Base de produtos curados por necessidade
  const productDatabase = {
    energia: [
      {
        name: lang === 'pt' ? 'NOW Foods B-Complex Energy' : lang === 'es' ? 'NOW Foods Complejo B Energético' : 'NOW Foods B-Complex Energy',
        description: 'Complexo de vitaminas B para energia celular e redução da fadiga.',
        price: '$15.99',
        rating: '4.6/5',
        searchTerms: 'now foods b complex energy vitamin',
        whyPerfect: 'Combina vitaminas do complexo B ligadas à produção de energia e foco.'
      },
      {
        name: lang === 'pt' ? 'Rhodiola Rosea (Energia Natural)' : lang === 'es' ? 'Rhodiola Rosea (Energía Natural)' : 'Rhodiola Rosea (Natural Energy)',
        description: 'Adaptógeno natural que aumenta energia e resistência ao estresse.',
        price: '$22.99',
        rating: '4.7/5',
        searchTerms: 'rhodiola rosea energy stress',
        whyPerfect: 'Aumenta energia natural sem causar nervosismo ou dependência.'
      }
    ],
    sono: [
      {
        name: lang === 'pt' ? 'Magnésio Glicinato (Sono & Relaxamento)' : lang === 'es' ? 'Magnesio Glicinato (Sueño & Relajación)' : 'Magnesium Glycinate (Sleep & Relaxation)',
        description: 'Magnésio de alta biodisponibilidade para sono e relaxamento muscular.',
        price: '$18.99',
        rating: '4.7/5',
        searchTerms: 'magnesium glycinate sleep',
        whyPerfect: 'Ajuda a melhorar a qualidade do sono sem ressaca matinal.'
      },
      {
        name: lang === 'pt' ? 'Melatonina 3mg (Sono Natural)' : lang === 'es' ? 'Melatonina 3mg (Sueño Natural)' : 'Melatonin 3mg (Natural Sleep)',
        description: 'Hormônio natural para regular o ciclo do sono.',
        price: '$12.99',
        rating: '4.5/5',
        searchTerms: 'melatonin 3mg sleep',
        whyPerfect: 'Regula o ciclo circadiano naturalmente, ideal para mudanças de fuso horário.'
      }
    ],
    peso: [
      {
        name: lang === 'pt' ? 'Chá Verde Termogênico' : lang === 'es' ? 'Té Verde Termogénico' : 'Green Tea Thermogenic',
        description: 'Chá verde concentrado para aceleração do metabolismo.',
        price: '$16.99',
        rating: '4.6/5',
        searchTerms: 'green tea extract metabolism',
        whyPerfect: 'Acelera o metabolismo naturalmente e auxilia na queima de gordura.'
      },
      {
        name: lang === 'pt' ? 'Proteína Whey (Saciedade)' : lang === 'es' ? 'Proteína Whey (Saciedad)' : 'Whey Protein (Satiety)',
        description: 'Proteína de alta qualidade para saciedade e manutenção muscular.',
        price: '$24.99',
        rating: '4.8/5',
        searchTerms: 'whey protein isolate',
        whyPerfect: 'Mantém saciedade por mais tempo e preserva massa muscular durante dieta.'
      }
    ],
    imunidade: [
      {
        name: lang === 'pt' ? 'Vitamina C + Zinco (Imunidade)' : lang === 'es' ? 'Vitamina C + Zinc (Inmunidad)' : 'Vitamin C + Zinc (Immunity)',
        description: 'Combinação essencial para fortalecimento do sistema imunológico.',
        price: '$14.99',
        rating: '4.7/5',
        searchTerms: 'vitamin c zinc immunity',
        whyPerfect: 'Fortalecimento do sistema imunológico, especialmente importante no clima americano.'
      },
      {
        name: lang === 'pt' ? 'Vitamina D3 2000 IU' : lang === 'es' ? 'Vitamina D3 2000 IU' : 'Vitamin D3 2000 IU',
        description: 'Suporte para imunidade e energia, importante em climas frios/menos sol.',
        price: '$14.99',
        rating: '4.6/5',
        searchTerms: 'vitamin d3 2000 iu now foods nature made',
        whyPerfect: 'Relevante para quem passa longos períodos em ambientes fechados nos EUA.'
      }
    ],
    estresse: [
      {
        name: lang === 'pt' ? 'Ashwagandha (Gestão do Estresse)' : lang === 'es' ? 'Ashwagandha (Gestión del Estrés)' : 'Ashwagandha (Stress Management)',
        description: 'Adaptógeno que reduz cortisol e promove equilíbrio emocional.',
        price: '$19.99',
        rating: '4.7/5',
        searchTerms: 'ashwagandha stress cortisol',
        whyPerfect: 'Reduz naturalmente os níveis de cortisol e promove calma mental.'
      },
      {
        name: lang === 'pt' ? 'L-Teanina (Calma Mental)' : lang === 'es' ? 'L-Teanina (Calma Mental)' : 'L-Theanine (Mental Calm)',
        description: 'Aminoácido que promove relaxamento sem sonolência.',
        price: '$17.99',
        rating: '4.6/5',
        searchTerms: 'l theanine calm focus',
        whyPerfect: 'Promove calma mental e foco, ideal para momentos de estresse.'
      }
    ]
  }

  // Selecionar produtos baseados nas necessidades
  let selectedProducts: any[] = []
  
  needs.forEach(need => {
    const products = productDatabase[need as keyof typeof productDatabase]
    if (products) {
      selectedProducts.push(...products)
    }
  })

  // Produtos padrão se não houver matches específicos
  if (selectedProducts.length === 0) {
    selectedProducts = [
      {
        name: lang === 'pt' ? 'Omega-3 (Óleo de Peixe) Premium' : lang === 'es' ? 'Omega-3 (Aceite de Pescado) Premium' : 'Omega-3 Fish Oil Premium',
        description: 'Triglicérides concentrados, apoio cardiovascular e cognitivo.',
        price: '$22.99',
        rating: '4.7/5',
        searchTerms: 'omega 3 fish oil molecularly distilled',
        whyPerfect: 'Útil para inflamação, foco e saúde do coração no dia a dia corrido.'
      },
      {
        name: lang === 'pt' ? 'Multivitamínico Completo' : lang === 'es' ? 'Multivitamínico Completo' : 'Complete Multivitamin',
        description: 'Suporte nutricional completo para bem-estar geral.',
        price: '$25.99',
        rating: '4.6/5',
        searchTerms: 'complete multivitamin daily',
        whyPerfect: 'Garante todos os nutrientes essenciais para saúde geral.'
      }
    ]
  }

  // Retornar até 4 produtos únicos
  const uniqueProducts = selectedProducts.filter((product, index, self) => 
    index === self.findIndex(p => p.name === product.name)
  ).slice(0, 4)

  return uniqueProducts
}

// ---------- Ferramentas (tool calling) expostas ao modelo ----------
const tools = [
  {
    type: 'function' as const,
    function: {
      name: 'findProducts',
      description: 'Busca 3–4 produtos adequados às necessidades detectadas no quiz/avaliação.',
      parameters: {
        type: 'object',
        properties: {
          needs: { type: 'array', items: { type: 'string' } },
          lang: { type: 'string', enum: ['pt', 'es', 'en'] },
          ageGroup: { type: 'string', enum: ['young', 'adult', 'senior'] }
        },
        required: ['needs', 'lang']
      }
    }
  }
]

// ---------- Utilitário de retry ----------
async function withRetry<T>(fn: () => Promise<T>, tries = 2): Promise<T> {
  let lastErr: unknown
  for (let i = 0; i < tries; i++) {
    try { return await fn() } catch (e) { lastErr = e }
  }
  throw lastErr
}

// ---------- Handler ----------
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const answers = body?.answers ?? {}
    const comments = body?.comments ?? ''
    const language: Lang = (body?.language ?? 'pt') as Lang
    const userName = body?.userName ?? ''
    const userAge = body?.userAge ?? ''
    const ageGroup = body?.ageGroup ?? 'adult'
    
    const sys = SYSTEM_BY_LANG[language] ?? SYSTEM_BY_LANG.pt
    const target = TARGET_BY_LANG[language] ?? TARGET_BY_LANG.pt

    // ---- PASSO A: Análise e plano (sem floreio) ----
    // Saída: { needs: string[], personaNotes: string }
    const analysis = await withRetry(async () => {
      const r = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        temperature: 0.2,
        messages: [
          { role: 'system', content: `${sys}\nTarefa: extrair necessidades objetivas do usuário a partir das respostas.` },
          {
            role: 'user',
            content:
`Analise as respostas abaixo e retorne JSON com:
{
  "needs": string[]  // palavras-chave como "energia", "sono", "peso", "imunidade", "estresse", "rotina", etc.
  "personaNotes": string // observações úteis para personalização de tom e exemplos
}
Idioma de saída: ${target}

Nome do usuário: ${userName}
Idade: ${userAge}
Faixa etária: ${ageGroup}

Respostas do usuário: ${JSON.stringify(answers)}
Comentários: ${comments || 'Nenhum'}`
          }
        ],
        response_format: { type: 'json_object' as const },
        max_tokens: 500
      })
      return JSON.parse(r.choices[0].message?.content || '{}') as { needs: string[]; personaNotes: string }
    })

    // ---- BUSCA DE PRODUTOS CUrados baseada nas necessidades ----
    const curatedProducts = await findProducts({ 
      needs: analysis.needs ?? [], 
      lang: language,
      ageGroup: ageGroup
    })

    // ---- PASSO B: Geração final com JSON Schema (sem quebrar JSON) ----
    const completion = await withRetry(async () => {
      const r = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        temperature: 0.6,
        messages: [
          { role: 'system', content: sys },
          {
            role: 'user',
            content:
`Monte a resposta final ESTRUTURADA em ${target}.

CONTEXTO PERSONALIZADO:
- Nome do usuário: ${userName}
- Idade: ${userAge}
- Faixa etária: ${ageGroup}
- Necessidades identificadas: ${JSON.stringify(analysis.needs)}
- Observações de persona: ${analysis.personaNotes}

INSTRUÇÕES ESPECÍFICAS:
- Use o nome "${userName}" no acolhimento (ex: "Querido(a) ${userName}")
- Use EXATAMENTE 5 hábitos, com o formato **Hábito X:** ... (ou **Habit X:** / **Hábito X:** conforme o idioma)
- Contextualize para brasileiros/latinos nos EUA (clima, rotina, cultura)
- Explique o POR QUÊ específico dos produtos sugeridos baseado nas respostas do usuário
- Produtos já curados (não invente preços fora do padrão): ${JSON.stringify(curatedProducts)}
- Adapte o tom para a faixa etária ${ageGroup}

ANÁLISE PERSONALIZADA:
- Base sua análise nas respostas específicas do usuário
- NÃO use frases genéricas como "identificamos pontos-chave" ou "melhorar seu bem-estar"
- Conecte cada recomendação com as respostas reais do usuário
- Use exemplos concretos baseados no que o usuário disse

Respostas do usuário (referência): ${JSON.stringify(answers)}
Comentários: ${comments || 'Nenhum'}`
          }
        ],
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: OutputSchema.name,
            schema: OutputSchema.schema,
            strict: true
          }
        },
        max_tokens: 1200
      })
      return r.choices[0].message?.content
    })

    const parsed = JSON.parse(completion || '{}')
    
    console.log('🤖 Resposta da IA:', parsed)
    
    return NextResponse.json(parsed)

  } catch (error: any) {
    console.error('Assessment API error:', error?.message || error)
    return NextResponse.json(
      { error: 'Erro na análise. Tente novamente.' },
      { status: 500 }
    )
  }
}
