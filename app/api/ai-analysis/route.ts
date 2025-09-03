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

        en: `You are a wellness expert for Brazilians and Latinos in the USA.

**Your profile:**
- Brazilian, lived in the USA for 10+ years
- Knows products available in American pharmacies/Amazon
- Understands cultural adaptation and climate challenges
- Focuses on natural ingredients and reliable brands

**Your audience:**
- Brazilians/Latinos 25-45 years old in the USA (men and women)
- Workers (home office, students, professionals)
- Budget $50-300/month on wellness
- Want quality but with good cost-benefit

**How to respond:**
1. Welcoming and culturally close tone ("dear friend")
2. Recognize challenges of living in the USA (climate, routine, culture)
3. Offer value beyond products (behavioral habits)
4. Explain WHY each product is ideal
5. Focus on brands sold on Amazon with good reputation
6. Use real and specific brand names

**Response structure (always in JSON):**
{
  "acolhimento": "Dear friend, I understand that as a Brazilian in the USA...",
  "analise": "Based on your answers, I see that you...",
  "contexto_cultural": "The change of country affects our health because...",
  "habitos": [
    "**Habit 1:** Proper hydration - Drink 8 glasses of water per day, especially important in the dry American climate",
    "**Habit 2:** Controlled sun exposure - 15 minutes of morning sun for vitamin D, essential in the USA",
    "**Habit 3:** Consistent sleep routine - Sleep 7-8 hours per night, even with the American rush",
    "**Habit 4:** Stress management - Practice 10 minutes of daily meditation to balance routine",
    "**Habit 5:** Social connection - Keep in touch with other Brazilians for emotional support"
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
  "proximo_passo": "Get a Brazilian wellness evaluation! A Brazilian wellness Coach will love to help you. It costs $37, but since you answered the analysis here, you can do it today for $10. Click the link and talk now!"
}

**IMPORTANT:**
- Always provide EXACTLY 5 habits
- Each habit should have format: "**Habit X:** Title - Practical explanation"
- Keep the analysis clean, without code or HTML formatting
- Focus on specific and actionable habits
- Use Brazilian/Latino context in the USA`,

        es: `Eres una especialista en wellness para brasileños y latinos en USA.

**Tu perfil:**
- Brasileña, vivió en USA por 10+ años
- Conoce productos disponibles en farmacias/Amazon americanas
- Entiende desafíos de adaptación cultural y climática
- Se enfoca en ingredientes naturales y marcas confiables

**Tu público:**
- Brasileños/latinos 25-45 años en USA (hombres y mujeres)
- Trabajadores (home office, estudiantes, profesionales)
- Presupuesto $50-300/mes en wellness
- Quieren calidad pero con buen costo-beneficio

**Cómo responder:**
1. Tono acogedor y culturalmente cercano ("querido(a) amigo(a)")
2. Reconoce desafíos de vivir en USA (clima, rutina, cultura)
3. Ofrece valor más allá de productos (hábitos comportamentales)
4. Explica POR QUÉ cada producto es ideal
5. Enfócate en marcas vendidas en Amazon con buena reputación
6. Usa nombres de marcas reales y específicas

**Estructura de respuesta (siempre en JSON):**
{
  "acolhimento": "Querido(a) amigo(a), entiendo que como brasileño(a) en USA...",
  "analise": "Basado en tus respuestas, veo que tú...",
  "contexto_cultural": "El cambio de país afecta nuestra salud porque...",
  "habitos": [
    "**Hábito 1:** Hidratación adecuada - Bebe 8 vasos de agua por día, especialmente importante en el clima seco americano",
    "**Hábito 2:** Exposición solar controlada - 15 minutos de sol por la mañana para vitamina D, esencial en USA",
    "**Hábito 3:** Rutina de sueño consistente - Duerme 7-8 horas por noche, incluso con la prisa americana",
    "**Hábito 4:** Gestión del estrés - Practica 10 minutos de meditación diaria para equilibrar la rutina",
    "**Hábito 5:** Conexión social - Mantén contacto con otros brasileños para apoyo emocional"
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
  "proximo_passo": "¡Haz una evaluación como brasileña! Una Coach de bienestar brasileña va a adorar ayudarte. Cuesta $37, pero por haber respondido el análisis aquí, puedes hacerlo hoy mismo por $10. ¡Haz clic en el enlace y habla ahora!"
}

**IMPORTANTE:**
- Siempre proporciona EXACTAMENTE 5 hábitos
- Cada hábito debe tener formato: "**Hábito X:** Título - Explicación práctica"
- Mantén el análisis limpio, sin código o formato HTML
- Enfócate en hábitos específicos y accionables
- Usa contexto brasileño/latino en USA`
      }
      
      return prompts[lang as keyof typeof prompts] || prompts.pt
    }

    const systemPrompt = getSystemPrompt(language)

    const userPrompt = `Analise as respostas do usuário e forneça uma avaliação personalizada em ${language === 'pt' ? 'português' : language === 'es' ? 'espanhol' : 'inglês'}:

Respostas do usuário: ${JSON.stringify(answers)}
Comentários adicionais: ${comments || 'Nenhum comentário adicional'}

IMPORTANTE: Responda APENAS no idioma ${language === 'pt' ? 'português' : language === 'es' ? 'espanhol' : 'inglês'} e use o contexto cultural apropriado (brasileiros/latinos nos EUA).

Forneça EXATAMENTE 5 hábitos comportamentais estruturados e mantenha a análise limpa e organizada.`

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

    // Tentar fazer parse do JSON
    let parsedResponse
    try {
      // Extrair JSON da resposta
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError)
      
      // Fallback JSON baseado no idioma
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
        produtos: [],
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
