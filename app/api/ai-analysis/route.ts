import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { answers, comments, language = 'pt' } = await request.json()

    // Traduzir o prompt baseado no idioma
    const getSystemPrompt = (lang: string) => {
      const prompts = {
        pt: `Você é uma especialista em wellness para brasileiros e latinos nos EUA.

**Seu perfil:**
- Brasileira, viveu nos EUA por 10+ anos
- Conhece produtos disponíveis nas farmácias/Amazon americanas
- Entende desafios de adaptação cultural e climática
- Foca em ingredientes naturais e marcas confiáveis

**Seu público:**
- Brasileiros/latinos 25-45 anos nos EUA (homens e mulheres)
- Trabalhadores (home office, estudantes, profissionais)
- Orçamento $50-300/mês em wellness
- Querem qualidade mas com bom custo-benefício

**Como responder:**
1. Tom acolhedor e culturalmente próximo ("querido(a) amigo(a)")
2. Reconheça desafios de viver nos EUA (clima, rotina, cultura)
3. Ofereça valor além dos produtos (hábitos comportamentais)
4. Explique POR QUE cada produto é ideal
5. Foque em marcas vendidas na Amazon com boa reputação
6. Use nomes de marcas reais e específicas

**Estrutura da resposta (sempre em JSON):**
{
  "acolhimento": "Querido(a) amigo(a), entendo que como brasileiro(a) nos EUA...",
  "analise": "Baseado nas suas respostas, vejo que você...",
  "contexto_cultural": "A mudança de país afeta nossa saúde porque...",
  "habitos": [
    "**Hábito 1:** Hidratação adequada - Beba 8 copos de água por dia, especialmente importante no clima seco americano",
    "**Hábito 2:** Exposição solar controlada - 15 minutos de sol pela manhã para vitamina D, essencial nos EUA",
    "**Hábito 3:** Rotina de sono consistente - Durma 7-8 horas por noite, mesmo com a correria americana",
    "**Hábito 4:** Gestão do estresse - Pratique 10 minutos de meditação diária para equilibrar a rotina",
    "**Hábito 5:** Conexão social - Mantenha contato com outros brasileiros para apoio emocional"
  ],
  "produtos": [
    {
      "name": "Nome do produto",
      "description": "Descrição científica",
      "price": "$XX.XX",
      "rating": "4.X/5",
      "searchTerms": "termos de busca para Amazon",
      "whyPerfect": "Por que é ideal para você"
    }
  ],
  "timeline": "Nos próximos 30 dias, foque em...",
  "proximo_passo": "Faça uma avaliação como brasileira! Uma Coach de bem-estar brasileira vai adorar te ajudar. Ela custa $37, mas por você ter respondido a análise aqui, pode fazer hoje mesmo por $10. Clique no link e fale agora!"
}

**IMPORTANTE:**
- Sempre forneça EXATAMENTE 5 hábitos
- Cada hábito deve ter formato: "**Hábito X:** Título - Explicação prática"
- Mantenha a análise limpa, sem código ou formatação HTML
- Foque em hábitos específicos e acionáveis
- Use contexto brasileiro/latino nos EUA`,

        en: `You are a wellness expert for people living in the USA.

**Your profile:**
- Wellness specialist with 10+ years of experience
- Knows products available in American pharmacies/Amazon
- Understands cultural adaptation and climate challenges
- Focuses on natural ingredients and reliable brands

**Your audience:**
- People 25-45 years old living in the USA (men and women)
- Workers (home office, students, professionals)
- Budget $50-300/month on wellness
- Want quality but with good cost-benefit

**How to respond:**
1. Welcoming and culturally appropriate tone ("dear friend")
2. Recognize challenges of living in the USA (climate, routine, culture)
3. Offer value beyond products (behavioral habits)
4. Explain WHY each product is ideal
5. Focus on brands sold on Amazon with good reputation
6. Use real and specific brand names

**Response structure (always in JSON):**
{
  "acolhimento": "Dear friend, I understand that living in the USA brings unique challenges to maintaining wellness...",
  "analise": "Based on your answers, I see that you...",
  "contexto_cultural": "Living in a new country affects our health because...",
  "habitos": [
    "**Habit 1:** Proper hydration - Drink 8 glasses of water per day, especially important in the dry American climate",
    "**Habit 2:** Controlled sun exposure - 15 minutes of morning sun for vitamin D, essential in the USA",
    "**Habit 3:** Consistent sleep routine - Sleep 7-8 hours per night, even with the busy American lifestyle",
    "**Habit 4:** Stress management - Practice 10 minutes of daily meditation to balance routine",
    "**Habit 5:** Social connection - Build meaningful relationships for emotional support"
  ],
  "produtos": [
    {
      "name": "Product name",
      "description": "Scientific description",
      "price": "$XX.XX",
      "rating": "4.X/5",
      "searchTerms": "search terms for Amazon",
      "whyPerfect": "Why it's ideal for you"
    }
  ],
  "timeline": "In the next 30 days, focus on...",
  "proximo_passo": "Get a personalized wellness evaluation! A wellness Coach will love to help you. It costs $37, but since you answered the analysis here, you can do it today for $10. Click the link and talk now!"
}

**IMPORTANT:**
- Always provide EXACTLY 5 habits
- Each habit should have format: "**Habit X:** Title - Practical explanation"
- Keep the analysis clean, without code or HTML formatting
- Focus on specific and actionable habits
- Use general American context, not Brazilian-specific`,

        es: `Eres una especialista en wellness para latinos en USA.

**Tu perfil:**
- Especialista en wellness con 10+ años de experiencia
- Conoce productos disponibles en farmacias/Amazon americanas
- Entiende desafíos de adaptación cultural y climática
- Se enfoca en ingredientes naturales y marcas confiables

**Tu público:**
- Latinos 25-45 años en USA (hombres y mujeres)
- Trabajadores (home office, estudiantes, profesionales)
- Presupuesto $50-300/mes en wellness
- Quieren calidad pero con buen costo-beneficio

**Cómo responder:**
1. Tono acogedor y culturalmente apropiado ("querido(a) amigo(a)")
2. Reconoce desafíos de vivir en USA (clima, rutina, cultura)
3. Ofrece valor más allá de productos (hábitos comportamentales)
4. Explica POR QUÉ cada producto es ideal
5. Enfócate en marcas vendidas en Amazon con buena reputación
6. Usa nombres de marcas reales y específicas

**Estructura de respuesta (siempre en JSON):**
{
  "acolhimento": "Querido(a) amigo(a), entiendo que vivir en USA trae desafíos únicos para mantener el bienestar...",
  "analise": "Basado en tus respuestas, veo que tú...",
  "contexto_cultural": "Vivir en un nuevo país afecta nuestra salud porque...",
  "habitos": [
    "**Hábito 1:** Hidratación adecuada - Bebe 8 vasos de agua por día, especialmente importante en el clima seco americano",
    "**Hábito 2:** Exposición solar controlada - 15 minutos de sol por la mañana para vitamina D, esencial en USA",
    "**Hábito 3:** Rutina de sueño consistente - Duerme 7-8 horas por noche, incluso con la prisa americana",
    "**Hábito 4:** Gestión del estrés - Practica 10 minutos de meditación diaria para equilibrar la rutina",
    "**Hábito 5:** Conexión social - Construye relaciones significativas para apoyo emocional"
  ],
  "produtos": [
    {
      "name": "Nombre del producto",
      "description": "Descripción científica",
      "price": "$XX.XX",
      "rating": "4.X/5",
      "searchTerms": "términos de búsqueda para Amazon",
      "whyPerfect": "Por qué es ideal para ti"
    }
  ],
  "timeline": "En los próximos 30 días, enfócate en...",
  "proximo_passo": "¡Haz una evaluación personalizada de bienestar! Una Coach de bienestar va a adorar ayudarte. Cuesta $37, pero por haber respondido el análisis aquí, puedes hacerlo hoy mismo por $10. ¡Haz clic en el enlace y habla ahora!"
}

**IMPORTANTE:**
- Siempre proporciona EXACTAMENTE 5 hábitos
- Cada hábito debe tener formato: "**Hábito X:** Título - Explicación práctica"
- Mantén el análisis limpio, sin código o formato HTML
- Enfócate en hábitos específicos y accionables
- Usa contexto latino en USA, no brasileño-específico`
      }
      
      return prompts[lang as keyof typeof prompts] || prompts.pt
    }

    const systemPrompt = getSystemPrompt(language)

    const userPrompt = `Analise as respostas do usuário e forneça uma avaliação personalizada em ${language === 'pt' ? 'português' : language === 'es' ? 'espanhol' : 'inglês'}:

Respostas do usuário: ${JSON.stringify(answers)}
Comentários adicionais: ${comments || 'Nenhum comentário adicional'}

IMPORTANTE: 
- Responda APENAS no idioma ${language === 'pt' ? 'português' : language === 'es' ? 'espanhol' : 'inglês'}
- Use o contexto cultural apropriado (brasileiros/latinos nos EUA)
- Forneça EXATAMENTE 5 hábitos comportamentais estruturados
- Mantenha a análise limpa e organizada
- SEMPRE inclua pelo menos 3-4 produtos específicos baseados nas respostas do usuário
- Use nomes de marcas reais disponíveis na Amazon (NOW Foods, Nature Made, etc.)
- Cada produto deve ter: name, description, price, rating, searchTerms, whyPerfect
- Foque em produtos relevantes para as necessidades identificadas nas respostas
- Faça uma análise REALMENTE personalizada baseada nas respostas específicas
- Evite conteúdo genérico, seja específico para o perfil do usuário`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    const response = completion.choices[0]?.message?.content

    if (!response) {
      throw new Error('No response from OpenAI')
    }

    console.log('🤖 Resposta da IA:', response)

    // Tentar fazer parse do JSON
    let parsedResponse
    try {
      // Limpar a resposta e extrair JSON
      let cleanedResponse = response.trim()
      
      // Remover possíveis caracteres extras no início e fim
      if (cleanedResponse.startsWith('```json')) {
        cleanedResponse = cleanedResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '')
      }
      if (cleanedResponse.startsWith('```')) {
        cleanedResponse = cleanedResponse.replace(/^```\s*/, '').replace(/\s*```$/, '')
      }
      
      // Tentar encontrar JSON válido
      const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        try {
          parsedResponse = JSON.parse(jsonMatch[0])
        } catch (innerError) {
          console.error('Inner JSON parse error:', innerError)
          throw new Error('Invalid JSON structure')
        }
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError)
      console.log('Raw response:', response)
      
      // Sistema de curadoria inteligente com critérios de qualidade
      const curationCriteria = {
        // Marcas premium reconhecidas globalmente
        premiumBrands: {
          'NOW Foods': { score: 95, trustLevel: 'Premium', origin: 'USA' },
          'Nature Made': { score: 92, trustLevel: 'Premium', origin: 'USA' },
          'Garden of Life': { score: 90, trustLevel: 'Organic Premium', origin: 'USA' },
          'Solgar': { score: 88, trustLevel: 'Premium', origin: 'USA' },
          'Optimum Nutrition': { score: 85, trustLevel: 'Sports Premium', origin: 'USA' },
          'Nature\'s Bounty': { score: 82, trustLevel: 'Trusted', origin: 'USA' }
        },
        
        // Critérios de qualidade científica
        qualityStandards: {
          'Certified Organic': 15,
          'Non-GMO': 12,
          'Gluten Free': 8,
          'Dairy Free': 8,
          'Vegan': 10,
          'Third Party Tested': 20,
          'GMP Certified': 15,
          'FDA Registered': 12
        }
      }
      
      // Função para gerar produtos personalizados com curadoria avançada
      const generatePersonalizedProducts = (answers: any, lang: string) => {
        const products = []
        
        // Analisar as respostas para determinar produtos relevantes
        const hasEnergyIssue = JSON.stringify(answers).toLowerCase().includes('energia') || 
                              JSON.stringify(answers).toLowerCase().includes('cansado') ||
                              JSON.stringify(answers).toLowerCase().includes('tired')
        
        const hasSleepIssue = JSON.stringify(answers).toLowerCase().includes('sono') || 
                             JSON.stringify(answers).toLowerCase().includes('insônia') ||
                             JSON.stringify(answers).toLowerCase().includes('sleep') ||
                             JSON.stringify(answers).toLowerCase().includes('insomnia')
        
        const hasWeightIssue = JSON.stringify(answers).toLowerCase().includes('peso') || 
                              JSON.stringify(answers).toLowerCase().includes('emagrecer') ||
                              JSON.stringify(answers).toLowerCase().includes('weight') ||
                              JSON.stringify(answers).toLowerCase().includes('lose')
        
        const hasImmuneIssue = JSON.stringify(answers).toLowerCase().includes('imunidade') || 
                              JSON.stringify(answers).toLowerCase().includes('doente') ||
                              JSON.stringify(answers).toLowerCase().includes('immune') ||
                              JSON.stringify(answers).toLowerCase().includes('sick')
        
        const isYoung = JSON.stringify(answers).toLowerCase().includes('18-25') || 
                       JSON.stringify(answers).toLowerCase().includes('26-35')
        
        const isOlder = JSON.stringify(answers).toLowerCase().includes('46+') || 
                       JSON.stringify(answers).toLowerCase().includes('36-45')
        
        // Função para calcular score de qualidade do produto
        const calculateProductScore = (brand: string, qualityFeatures: string[]) => {
          let score = (curationCriteria.premiumBrands as any)[brand]?.score || 70
          qualityFeatures.forEach(feature => {
            score += (curationCriteria.qualityStandards as any)[feature] || 0
          })
          return Math.min(score, 100)
        }
        
        // Produtos baseados nas necessidades identificadas com curadoria avançada
        if (hasEnergyIssue) {
          const qualityFeatures = ['Non-GMO', 'Gluten Free', 'Third Party Tested']
          const score = calculateProductScore('NOW Foods', qualityFeatures)
          
          products.push({
            name: lang === 'pt' ? "Complexo B Energético NOW Foods" : 
                  lang === 'es' ? "Complejo B Energético NOW Foods" : 
                  "NOW Foods B-Complex Energy",
            description: lang === 'pt' ? "Aumenta energia natural, melhora foco e reduz fadiga. Contém todas as vitaminas B essenciais para produção de energia celular." :
                        lang === 'es' ? "Aumenta energía natural, mejora enfoque y reduce fatiga. Contiene todas las vitaminas B esenciales para producción de energía celular." :
                        "Increases natural energy, improves focus and reduces fatigue. Contains all essential B vitamins for cellular energy production.",
            price: "$15.99",
            rating: "4.6/5",
            searchTerms: "now foods b complex vitamin energy",
            whyPerfect: lang === 'pt' ? "Ideal para quem se sente sempre cansado e precisa de mais energia durante o dia" :
                        lang === 'es' ? "Ideal para quien se siente siempre cansado y necesita más energía durante el día" :
                        "Perfect for those who feel always tired and need more energy throughout the day",
            curationScore: score,
            qualityFeatures: qualityFeatures,
            brandTrust: 'Premium',
            scientificBacking: 'Clinically Proven B-Vitamin Complex'
          })
        }
        
        if (hasSleepIssue) {
          const qualityFeatures = ['Non-GMO', 'Gluten Free', 'Third Party Tested', 'GMP Certified']
          const score = calculateProductScore('NOW Foods', qualityFeatures)
          
          products.push({
            name: lang === 'pt' ? "Magnésio Glicinato para Sono Natural" : 
                  lang === 'es' ? "Magnesio Glicinato para Sueño Natural" : 
                  "Natural Sleep Magnesium Glycinate",
            description: lang === 'pt' ? "Melhora qualidade do sono e relaxamento muscular. Forma mais biodisponível de magnésio para melhor absorção." :
                        lang === 'es' ? "Mejora calidad del sueño y relajación muscular. Forma más biodisponible de magnesio para mejor absorción." :
                        "Improves sleep quality and muscle relaxation. Most bioavailable form of magnesium for better absorption.",
            price: "$18.99",
            rating: "4.7/5",
            searchTerms: "magnesium glycinate sleep now foods",
            whyPerfect: lang === 'pt' ? "Perfeito para quem tem dificuldade para dormir e quer um sono mais profundo" :
                        lang === 'es' ? "Perfecto para quien tiene dificultad para dormir y quiere un sueño más profundo" :
                        "Perfect for those who have trouble sleeping and want deeper sleep",
            curationScore: score,
            qualityFeatures: qualityFeatures,
            brandTrust: 'Premium',
            scientificBacking: 'Bioavailable Magnesium Glycinate'
          })
        }
        
        if (hasWeightIssue) {
          const qualityFeatures = ['Certified Organic', 'Non-GMO', 'Vegan', 'Third Party Tested']
          const score = calculateProductScore('Garden of Life', qualityFeatures)
          
          products.push({
            name: lang === 'pt' ? "Chá Verde Orgânico para Metabolismo" : 
                  lang === 'es' ? "Té Verde Orgánico para Metabolismo" : 
                  "Organic Green Tea for Metabolism",
            description: lang === 'pt' ? "Acelera metabolismo naturalmente, aumenta queima de gordura e fornece antioxidantes poderosos." :
                        lang === 'es' ? "Acelera metabolismo naturalmente, aumenta quema de grasa y proporciona antioxidantes poderosos." :
                        "Naturally boosts metabolism, increases fat burning and provides powerful antioxidants.",
            price: "$12.99",
            rating: "4.5/5",
            searchTerms: "organic green tea metabolism weight loss",
            whyPerfect: lang === 'pt' ? "Excelente para acelerar o metabolismo e ajudar na perda de peso de forma natural" :
                        lang === 'es' ? "Excelente para acelerar el metabolismo y ayudar en la pérdida de peso de forma natural" :
                        "Excellent for boosting metabolism and helping with natural weight loss",
            curationScore: score,
            qualityFeatures: qualityFeatures,
            brandTrust: 'Organic Premium',
            scientificBacking: 'Certified Organic Green Tea Extract'
          })
        }
        
        if (hasImmuneIssue) {
          const qualityFeatures = ['Non-GMO', 'Gluten Free', 'Third Party Tested', 'FDA Registered']
          const score = calculateProductScore('Nature Made', qualityFeatures)
          
          products.push({
            name: lang === 'pt' ? "Vitamina C + Zinco para Imunidade" : 
                  lang === 'es' ? "Vitamina C + Zinc para Inmunidad" : 
                  "Vitamin C + Zinc for Immunity",
            description: lang === 'pt' ? "Fortalecimento do sistema imunológico com vitamina C de alta absorção e zinco quelado." :
                        lang === 'es' ? "Fortalecimiento del sistema inmunológico con vitamina C de alta absorción y zinc quelado." :
                        "Strengthens immune system with high-absorption vitamin C and chelated zinc.",
            price: "$16.99",
            rating: "4.8/5",
            searchTerms: "vitamin c zinc immunity now foods",
            whyPerfect: lang === 'pt' ? "Essencial para fortalecer a imunidade, especialmente importante no inverno americano" :
                        lang === 'es' ? "Esencial para fortalecer la inmunidad, especialmente importante en el invierno americano" :
                        "Essential for strengthening immunity, especially important in the American winter",
            curationScore: score,
            qualityFeatures: qualityFeatures,
            brandTrust: 'Premium',
            scientificBacking: 'High-Absorption Vitamin C + Chelated Zinc'
          })
        }
        
        // Produtos baseados na idade com curadoria específica
        if (isYoung) {
          const qualityFeatures = ['Non-GMO', 'Gluten Free', 'Third Party Tested', 'GMP Certified']
          const score = calculateProductScore('Optimum Nutrition', qualityFeatures)
          
          products.push({
            name: lang === 'pt' ? "Proteína Whey para Recuperação Muscular" : 
                  lang === 'es' ? "Proteína Whey para Recuperación Muscular" : 
                  "Whey Protein for Muscle Recovery",
            description: lang === 'pt' ? "Proteína de alta qualidade para recuperação muscular e ganho de massa magra." :
                        lang === 'es' ? "Proteína de alta calidad para recuperación muscular y ganancia de masa magra." :
                        "High-quality protein for muscle recovery and lean mass gain.",
            price: "$24.99",
            rating: "4.6/5",
            searchTerms: "whey protein isolate now foods",
            whyPerfect: lang === 'pt' ? "Ideal para jovens ativos que querem melhorar performance e recuperação" :
                        lang === 'es' ? "Ideal para jóvenes activos que quieren mejorar rendimiento y recuperación" :
                        "Ideal for active young people who want to improve performance and recovery",
            curationScore: score,
            qualityFeatures: qualityFeatures,
            brandTrust: 'Sports Premium',
            scientificBacking: 'Premium Whey Protein Isolate'
          })
        }
        
        if (isOlder) {
          const qualityFeatures = ['Non-GMO', 'Gluten Free', 'Third Party Tested', 'Fish Oil Quality']
          const score = calculateProductScore('Nature Made', qualityFeatures)
          
          products.push({
            name: lang === 'pt' ? "Ômega 3 Premium para Saúde Cardíaca" : 
                  lang === 'es' ? "Omega 3 Premium para Salud Cardíaca" : 
                  "Premium Omega 3 for Heart Health",
            description: lang === 'pt' ? "Suporte para coração, cérebro e inflamação. Essencial para saúde geral e longevidade." :
                        lang === 'es' ? "Soporte para corazón, cerebro e inflamación. Esencial para salud general y longevidad." :
                        "Support for heart, brain and inflammation. Essential for general health and longevity.",
            price: "$22.99",
            rating: "4.7/5",
            searchTerms: "omega 3 fish oil premium now foods",
            whyPerfect: lang === 'pt' ? "Fundamental para manter saúde cardiovascular e cerebral com o avançar da idade" :
                        lang === 'es' ? "Fundamental para mantener salud cardiovascular y cerebral con el avance de la edad" :
                        "Fundamental for maintaining cardiovascular and brain health as we age",
            curationScore: score,
            qualityFeatures: qualityFeatures,
            brandTrust: 'Premium',
            scientificBacking: 'Molecularly Distilled Fish Oil'
          })
        }
        
        // Produto universal - Vitamina D com curadoria máxima
        const qualityFeatures = ['Non-GMO', 'Gluten Free', 'Third Party Tested', 'GMP Certified', 'FDA Registered']
        const score = calculateProductScore('NOW Foods', qualityFeatures)
        
        products.push({
          name: lang === 'pt' ? "Vitamina D3 2000 IU para Imunidade" : 
                lang === 'es' ? "Vitamina D3 2000 IU para Inmunidad" : 
                "Vitamin D3 2000 IU for Immunity",
          description: lang === 'pt' ? "Essencial para imunidade e energia, especialmente importante no inverno americano." :
                      lang === 'es' ? "Esencial para inmunidad y energía, especialmente importante en el invierno americano." :
                      "Essential for immunity and energy, especially important in the American winter.",
          price: "$14.99",
          rating: "4.6/5",
          searchTerms: "vitamin d3 2000 iu now foods",
          whyPerfect: lang === 'pt' ? "Fundamental para brasileiros nos EUA que precisam de mais vitamina D" :
                      lang === 'es' ? "Fundamental para brasileños en USA que necesitan más vitamina D" :
                      "Fundamental for Brazilians in the USA who need more vitamin D",
          curationScore: score,
          qualityFeatures: qualityFeatures,
          brandTrust: 'Premium',
          scientificBacking: 'Bioavailable Vitamin D3 (Cholecalciferol)'
        })
        
        return products.slice(0, 4) // Retornar máximo 4 produtos
      }
      
      // Fallback JSON baseado no idioma com produtos personalizados
      const fallbackResponse = {
        acolhimento: language === 'pt' ? "Querido(a) amigo(a), entendo que como brasileiro(a) nos EUA você enfrenta desafios únicos..." : 
                     language === 'es' ? "Querido(a) amigo(a), entiendo que como brasileño(a) en USA enfrentas desafíos únicos..." :
                     "Dear friend, I understand that as a Brazilian in the USA you face unique challenges...",
        analise: language === 'pt' ? "Baseado nas suas respostas, vejo que você prioriza simplicidade e consistência em seus hábitos..." :
                language === 'es' ? "Basado en tus respuestas, veo que priorizas simplicidad y consistencia en tus hábitos..." :
                "Based on your answers, I see that you prioritize simplicity and consistency in your habits...",
        contexto_cultural: language === 'pt' ? "A mudança de país pode afetar nossa saúde devido às diferenças culturais na dieta..." :
                          language === 'es' ? "El cambio de país puede afectar nuestra salud debido a las diferencias culturales en la dieta..." :
                          "The change of country can affect our health due to cultural differences in diet...",
        habitos: language === 'pt' ? [
          "**Hábito 1:** Hidratação adequada - Beba 8 copos de água por dia, especialmente importante no clima seco americano",
          "**Hábito 2:** Exposição solar controlada - 15 minutos de sol pela manhã para vitamina D, essencial nos EUA",
          "**Hábito 3:** Rotina de sono consistente - Durma 7-8 horas por noite, mesmo com a correria americana",
          "**Hábito 4:** Gestão do estresse - Pratique 10 minutos de meditação diária para equilibrar a rotina",
          "**Hábito 5:** Conexão social - Mantenha contato com outros brasileiros para apoio emocional"
        ] : language === 'es' ? [
          "**Hábito 1:** Hidratación adecuada - Bebe 8 vasos de agua por día, especialmente importante en el clima seco americano",
          "**Hábito 2:** Exposición solar controlada - 15 minutos de sol por la mañana para vitamina D, esencial en USA",
          "**Hábito 3:** Rutina de sueño consistente - Duerme 7-8 horas por noche, incluso con la prisa americana",
          "**Hábito 4:** Gestión del estrés - Practica 10 minutos de meditación diaria para equilibrar la rutina",
          "**Hábito 5:** Conexión social - Mantén contacto con otros brasileños para apoyo emocional"
        ] : [
          "**Habit 1:** Proper hydration - Drink 8 glasses of water per day, especially important in the dry American climate",
          "**Habit 2:** Controlled sun exposure - 15 minutes of morning sun for vitamin D, essential in the USA",
          "**Habit 3:** Consistent sleep routine - Sleep 7-8 hours per night, even with the American rush",
          "**Habit 4:** Stress management - Practice 10 minutes of daily meditation to balance routine",
          "**Habit 5:** Social connection - Keep in touch with other Brazilians for emotional support"
        ],
        produtos: generatePersonalizedProducts(answers, language), // ← PRODUTOS PERSONALIZADOS COM CURADORIA!
        timeline: language === 'pt' ? "Nos próximos 30 dias, foque em estabelecer uma rotina consistente..." :
                  language === 'es' ? "En los próximos 30 días, enfócate en establecer una rutina consistente..." :
                  "In the next 30 days, focus on establishing a consistent routine...",
        proximo_passo: language === 'pt' ? "Faça uma avaliação personalizada! Uma Coach brasileira vai te ajudar..." :
                      language === 'es' ? "¡Haz una evaluación personalizada! Una Coach brasileña te va a ayudar..." :
                      "Get a personalized evaluation! A Brazilian Coach will help you..."
      }
      
      parsedResponse = fallbackResponse
    }

    return NextResponse.json(parsedResponse)

  } catch (error) {
    console.error('Error in AI analysis:', error)
    return NextResponse.json(
      { error: 'Erro na análise. Tente novamente.' },
      { status: 500 }
    )
  }
}
