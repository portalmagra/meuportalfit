import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { searchAmazonProducts } from '../../../lib/amazon-api'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: null,
})

// Banco de dados de produtos Amazon com categorização
const amazonProducts = {
  energy: [
    {
      name: "Centrum Women Multivitamin",
      description: "Multivitamínico completo para energia e vitalidade",
      asin: "B00280M922",
      price: "$14.99",
      rating: 4.5,
      category: "Energia",
      benefits: ["Energia diária", "Saúde geral", "Vitaminas essenciais"]
    },
    {
      name: "Nature Made B-Complex Energy",
      description: "Complexo B para energia e metabolismo",
      asin: "B000NXHALS",
      price: "$12.99",
      rating: 4.4,
      category: "Energia",
      benefits: ["Energia natural", "Metabolismo", "Sistema nervoso"]
    }
  ],
  sleep: [
    {
      name: "Natrol Melatonin 5mg",
      description: "Suporte natural para qualidade do sono",
      asin: "B000GG5YC0",
      price: "$8.99",
      rating: 4.4,
      category: "Sono",
      benefits: ["Qualidade do sono", "Regulação circadiana", "Natural"]
    },
    {
      name: "NOW Foods Magnesium Glycinate",
      description: "Magnésio de alta absorção para relaxamento",
      asin: "B00C7K34C4",
      price: "$19.99",
      rating: 4.5,
      category: "Sono",
      benefits: ["Relaxamento muscular", "Qualidade do sono", "Absorção superior"]
    }
  ],
  anxiety: [
    {
      name: "Thorne L-Theanine",
      description: "Aminoácido para calma e foco sem sonolência",
      asin: "B01AWEIQR8",
      price: "$42.00",
      rating: 4.7,
      category: "Ansiedade",
      benefits: ["Reduz ansiedade", "Mantém foco", "Não causa sonolência"]
    },
    {
      name: "Nature's Way Ashwagandha",
      description: "Adaptógeno para controle de estresse",
      asin: "B003B3OOPA",
      price: "$12.98",
      rating: 4.3,
      category: "Estresse",
      benefits: ["Reduz cortisol", "Adaptógeno", "Controle de estresse"]
    }
  ],
  immunity: [
    {
      name: "Emergen-C Vitamin C 1000mg",
      description: "Vitamina C com suporte imunológico",
      asin: "B00A830SBG",
      price: "$24.99",
      rating: 4.5,
      category: "Imunidade",
      benefits: ["Suporte imunológico", "Vitamina C", "Sabor agradável"]
    },
    {
      name: "Now Foods Vitamin D3 2000 IU",
      description: "Vitamina D3 para imunidade e ossos",
      asin: "B003BUJ1TU",
      price: "$9.99",
      rating: 4.6,
      category: "Imunidade",
      benefits: ["Sistema imunológico", "Saúde óssea", "Humor"]
    }
  ],
  beauty: [
    {
      name: "Sports Research Collagen Peptides",
      description: "Colágeno hidrolisado para pele, cabelo e unhas",
      asin: "B01H7FZHZM",
      price: "$29.95",
      rating: 4.4,
      category: "Beleza",
      benefits: ["Pele saudável", "Cabelo forte", "Unhas resistentes"]
    },
    {
      name: "Nature's Bounty Biotin 10,000mcg",
      description: "Biotina para cabelo, pele e unhas",
      asin: "B00029Y2WU",
      price: "$11.49",
      rating: 4.3,
      category: "Beleza",
      benefits: ["Crescimento capilar", "Pele saudável", "Unhas fortes"]
    }
  ],
  digestion: [
    {
      name: "Garden of Life Dr. Formulated Probiotics",
      description: "50 bilhões de probióticos para mulheres",
      asin: "B01E5QVHIU",
      price: "$44.95",
      rating: 4.4,
      category: "Digestão",
      benefits: ["Saúde digestiva", "Específico para mulheres", "50 bilhões CFU"]
    },
    {
      name: "NOW Foods Psyllium Husk Caps",
      description: "Fibra natural para saúde digestiva",
      asin: "B0013OXKHC",
      price: "$11.99",
      rating: 4.4,
      category: "Digestão",
      benefits: ["Fibra natural", "Saúde intestinal", "Regulação digestiva"]
    }
  ],
  weight: [
    {
      name: "Hydroxycut Hardcore Elite",
      description: "Suporte para metabolismo e energia",
      asin: "B07H8K7P8J",
      price: "$19.99",
      rating: 4.1,
      category: "Peso",
      benefits: ["Metabolismo", "Energia", "Controle de apetite"]
    }
  ]
}

function generateAmazonUrl(asin: string): string {
  const associateTag = 'portal07d-20' // Forçar uso da tag correta
  return `https://www.amazon.com/dp/${asin}?tag=${associateTag}`
}

function selectProductsByProfile(analysis: string, budget: string): any[] {
  const budgetMap: Record<string, number> = {
    'budget': 50,
    'moderate': 100, 
    'priority': 200,
    'premium': 300,
    'unlimited': 999
  }
  
  const maxBudget = budgetMap[budget] || 100
  let selectedProducts: any[] = []
  
  // Lógica de seleção baseada na análise da IA
  if (analysis.toLowerCase().includes('energia')) {
    selectedProducts.push(...amazonProducts.energy.slice(0, 2))
  }
  
  if (analysis.toLowerCase().includes('sono')) {
    selectedProducts.push(...amazonProducts.sleep.slice(0, 2))
  }
  
  if (analysis.toLowerCase().includes('ansiedade') || analysis.toLowerCase().includes('estresse')) {
    selectedProducts.push(...amazonProducts.anxiety.slice(0, 2))
  }
  
  if (analysis.toLowerCase().includes('imunidade')) {
    selectedProducts.push(...amazonProducts.immunity.slice(0, 2))
  }
  
  if (analysis.toLowerCase().includes('beleza') || analysis.toLowerCase().includes('cabelo') || analysis.toLowerCase().includes('pele')) {
    selectedProducts.push(...amazonProducts.beauty.slice(0, 2))
  }
  
  if (analysis.toLowerCase().includes('digestão') || analysis.toLowerCase().includes('intestinal')) {
    selectedProducts.push(...amazonProducts.digestion.slice(0, 2))
  }
  
  if (analysis.toLowerCase().includes('peso')) {
    selectedProducts.push(...amazonProducts.weight.slice(0, 1))
  }
  
  // Filtrar por orçamento e remover duplicatas
  const uniqueProducts = selectedProducts
    .filter((product, index, self) => 
      index === self.findIndex(p => p.asin === product.asin)
    )
    .filter(product => {
      const price = parseFloat(product.price.replace('$', ''))
      return price <= maxBudget
    })
    .slice(0, 5) // Máximo 5 produtos
  
  // Adicionar URLs da Amazon
  return uniqueProducts.map(product => ({
    ...product,
    amazonUrl: generateAmazonUrl(product.asin),
    savings: Math.floor(Math.random() * 30) + 10 // 10-40% economia simulada
  }))
}

// Análises pré-criadas por perfil para demonstração
const analysisTemplates = {
  pt: {
    energy_low_budget: "Querida, pelo seu perfil vejo que você está enfrentando aquela fadiga típica que muitas de nós brasileiras sentimos nos EUA! O clima, a rotina e a adaptação cobram seu preço. Para começar, recomendo Vitamina D3 (Now Foods 2000 IU) - essencial aqui onde temos menos sol que no Brasil. Um complexo B orgânico também vai te dar aquela energia que você precisa. Comece devagar, nós brasileiras temos metabolismo diferente!",
    
    anxiety_moderate: "Amiga, reconheço esse perfil! A ansiedade é super comum entre nós latinas nos EUA - a pressão, a língua, tudo é diferente né? Recomendo L-Theanine (Thorne é excelente) para acalmar sem dar sonolência, e Ashwagandha (Nature's Way) para controlar o cortisol. Esses produtos Amazon são testados e funcionam muito bem. Lembre: você não está sozinha nessa jornada!",
    
    sleep_premium: "Que bom que você prioriza sua saúde! Para alguém com seu perfil, recomendo Melatonina de qualidade (Natrol 5mg) e Magnésio Glicinate (Now Foods) - absorção superior. O sono aqui nos EUA é diferente mesmo, o ar seco e o estresse afetam muito. Estes produtos Amazon vão fazer toda diferença na sua qualidade de vida!",
    
    beauty_goals: "Menina, adoro seu foco! Para cabelo, pele e unhas resilientes no clima americano, colágeno hidrolisado (Sports Research) é fundamental. Biotina 10,000mcg (Nature's Bounty) também é chave. O inverno aqui resseca tudo né? Estes produtos Amazon são os queridinhos das brasileiras por aqui!"
  },
  
  es: {
    energy_low_budget: "Querida, entiendo perfectamente tu situación! Muchas latinas pasamos por esto en USA. Te recomiendo empezar con Vitamina D3 (Now Foods 2000 IU) - súper importante aquí donde hay menos sol que en casa. Un complejo B orgánico también te dará esa energía que necesitas. ¡Estos productos Amazon funcionan muy bien con nuestro metabolismo!",
    
    anxiety_moderate: "Hermana, reconozco este perfil perfectamente! La ansiedad es muy común entre nosotras - nueva cultura, presión, todo diferente. L-Theanine (Thorne es excelente) te ayudará a estar calmada sin sueño, y Ashwagandha (Nature's Way) controla el cortisol. Estos productos Amazon son probados y efectivos. ¡No estás sola en esto!",
    
    sleep_premium: "¡Qué bueno que priorizas tu salud! Para tu perfil recomiendo Melatonina de calidad (Natrol 5mg) y Magnesio Glicinate (Now Foods) con absorción superior. El clima seco de USA afecta mucho el sueño. ¡Estos productos Amazon harán toda la diferencia!",
    
    beauty_goals: "¡Me encanta tu enfoque! Para cabello, piel y uñas fuertes en el clima americano, colágeno hidrolizado (Sports Research) es fundamental. Biotina 10,000mcg (Nature's Bounty) también es clave. ¡El invierno aquí es durísimo! Estos productos Amazon son los favoritos de las latinas."
  },
  
  en: {
    energy_low_budget: "I completely understand your situation! Many women from our community face this challenge in the USA. I recommend starting with Vitamin D3 (Now Foods 2000 IU) - super important here where we get less sun than back home. An organic B-complex will also give you that energy boost you need. These Amazon products work great with our metabolism!",
    
    anxiety_moderate: "Sister, I recognize this profile perfectly! Anxiety is very common among us - new culture, pressure, everything different. L-Theanine (Thorne is excellent) will help you stay calm without drowsiness, and Ashwagandha (Nature's Way) controls cortisol. These Amazon products are tested and effective!",
    
    sleep_premium: "Great that you prioritize your health! For your profile I recommend quality Melatonin (Natrol 5mg) and Magnesium Glycinate (Now Foods) with superior absorption. The dry climate here really affects sleep. These Amazon products will make all the difference!",
    
    beauty_goals: "Love your focus! For strong hair, skin and nails in American weather, hydrolyzed collagen (Sports Research) is fundamental. Biotin 10,000mcg (Nature's Bounty) is also key. Winter here is tough on us! These Amazon products are favorites in our community."
  }
}

function generatePersonalizedAnalysis(answers: Record<number, number>, language: string): string {
  const templates = analysisTemplates[language as keyof typeof analysisTemplates] || analysisTemplates.pt
  
  // Lógica baseada nas respostas
  const healthChallenge = answers[1] || 0  // Pergunta 1: desafio de saúde
  const budget = answers[3] || 1           // Pergunta 3: orçamento
  const goals = answers[6] || 0            // Pergunta 6: objetivos
  
  // Determinar perfil
  if (healthChallenge === 0 && budget <= 1) return templates.energy_low_budget
  if (healthChallenge === 1) return templates.anxiety_moderate
  if (healthChallenge === 2 && budget >= 2) return templates.sleep_premium
  if (goals === 2) return templates.beauty_goals
  
  return templates.energy_low_budget // fallback
}

export async function POST(request: NextRequest) {
  try {
    const { answers, language = 'pt' } = await request.json()
    
    if (!answers || typeof answers !== 'object') {
      return NextResponse.json(
        { error: 'Respostas inválidas' }, 
        { status: 400 }
      )
    }

    // Tentar análise com OpenAI primeiro, fallback para demo
    let analysis
    
    try {
      // Usar chat completion diretamente com instruções da Curadora
      const systemPrompt = `
      Você é uma especialista em wellness para mulheres brasileiras e latinas nos EUA.

      **Seu perfil:**
      - Brasileira, viveu nos EUA por 10+ anos
      - Conhece produtos disponíveis nas farmácias/Amazon americanas
      - Entende desafios de adaptação cultural e climática
      - Foca em ingredientes naturais e marcas confiáveis

      **Seu público:**
      - Brasileiras/latinas 25-45 anos nos EUA
      - Trabalhadoras (home office, estudantes, profissionais)
      - Orçamento $50-300/mês em wellness
      - Querem qualidade mas com bom custo-benefício

      **Como responder:**
      1. Tom amigável e pessoal ("querida", "amiga")
      2. Mencione experiências culturais compartilhadas
      3. Explique POR QUE cada produto é ideal
      4. Considere clima americano (inverno rigoroso, ar seco)
      5. Foque em marcas vendidas na Amazon com boa reputação
      6. Máximo 200 palavras, direto ao ponto
      7. IMPORTANTE: No final, liste 3-5 termos de busca para Amazon (exemplo: "vitamina d3", "magnesio glicinato", "probioticos mulheres")
      
      **Formato de resposta:**
      [Sua análise personalizada aqui...]
      
      BUSCAR: termo1, termo2, termo3, termo4
      `

      const userMessage = `Usuário completou análise em ${language}. Respostas: ${JSON.stringify(answers)}. 
      Por favor, forneça uma análise personalizada culturalmente relevante para brasileiras/latinas nos EUA, focando em wellness com produtos Amazon disponíveis.
      Termine com "BUSCAR: " seguido dos termos para buscar na Amazon.`

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        max_tokens: 400,
        temperature: 0.7
      })

      analysis = completion.choices[0]?.message?.content
      if (!analysis) {
        throw new Error('No response from OpenAI')
      }
      
      console.log('✅ OpenAI Chat analysis generated successfully')
      
    } catch (openaiError) {
      console.warn('⚠️ OpenAI failed, using demo analysis:', openaiError.message)
      analysis = generatePersonalizedAnalysis(answers, language)
    }
    
    // Extrair termos de busca da análise
    let recommendedProducts: any[] = []
    const searchTermsMatch = analysis.match(/BUSCAR:\s*(.+)$/i)
    
    if (searchTermsMatch) {
      // Separar a análise dos termos de busca
      analysis = analysis.replace(/\n?BUSCAR:\s*.+$/i, '').trim()
      
      const searchTerms = searchTermsMatch[1]
        .split(',')
        .map(term => term.trim())
        .filter(term => term.length > 0)
      
      console.log('🔍 Searching Amazon for:', searchTerms)
      
      // Buscar produtos na Amazon para cada termo
      const amazonSearches = await Promise.all(
        searchTerms.slice(0, 3).map(term => searchAmazonProducts(term, 2))
      )
      
      // Combinar resultados e limitar a 5 produtos
      const allProducts = amazonSearches.flat()
      recommendedProducts = allProducts
        .filter((product, index, self) => 
          index === self.findIndex(p => p.asin === product.asin)
        )
        .slice(0, 5)
        .map(product => ({
          name: product.name,
          description: `Produto recomendado pela nossa especialista`,
          asin: product.asin,
          price: product.price,
          rating: product.rating,
          category: "Recomendado",
          benefits: ["Recomendação personalizada", "Disponível na Amazon", "Qualidade comprovada"],
          amazonUrl: product.detailPageURL,
          savings: Math.floor(Math.random() * 30) + 10
        }))
      
      console.log(`✅ Found ${recommendedProducts.length} Amazon products`)
    }
    
    // Fallback para produtos fixos se busca Amazon falhar
    const budgetAnswer = answers[3] || 1
    const budgetMap = ['budget', 'moderate', 'priority', 'premium', 'unlimited']
    const budget = budgetMap[budgetAnswer] || 'moderate'
    
    if (recommendedProducts.length === 0) {
      console.log('⚠️ Using fallback products from database')
      recommendedProducts = selectProductsByProfile(analysis, budget)
    }
    
    // Calcular economia total
    const totalSavings = recommendedProducts.reduce((sum, product) => {
      const price = parseFloat(product.price.replace('$', ''))
      return sum + (price * product.savings / 100)
    }, 0)

    return NextResponse.json({
      success: true,
      analysis,
      profile: {
        language,
        budget,
        totalQuestions: Object.keys(answers).length
      },
      recommendations: recommendedProducts,
      summary: {
        totalProducts: recommendedProducts.length,
        totalSavings: Math.round(totalSavings),
        averageRating: recommendedProducts.reduce((sum, p) => sum + p.rating, 0) / recommendedProducts.length
      }
    })

  } catch (error) {
    console.error('Erro na análise:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' }, 
      { status: 500 }
    )
  }
}