import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { answers, comments, language } = await request.json()

    // Prompt melhorado baseado na análise do ChatGPT
    const systemPrompt = `Você é uma especialista em wellness para brasileiros e latinos nos EUA.

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
- Foque em hábitos específicos e acionáveis`

    // Construir prompt com as respostas do usuário
    const userPrompt = `Analise o perfil deste brasileiro(a)/latino(a) nos EUA:

**Respostas do questionário:**
${Object.entries(answers).map(([question, answer]) => `Pergunta ${question}: ${answer}`).join('\n')}

**Informações adicionais:**
${comments || 'Nenhuma informação adicional fornecida'}

**Idioma preferido:**
${language === 'pt' ? 'Português' : language === 'es' ? 'Español' : 'English'}

Forneça uma análise personalizada estruturada em JSON com acolhimento, análise limpa, EXATAMENTE 5 hábitos comportamentais estruturados e 3 produtos Amazon específicos.`

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

    // Tentar fazer parse da resposta JSON
    try {
      const parsedResponse = JSON.parse(response)
      return NextResponse.json(parsedResponse)
    } catch (parseError) {
      // Se não conseguir fazer parse, retornar como texto estruturado
      return NextResponse.json({
        acolhimento: "Querido(a) amigo(a), entendo que como brasileiro(a) nos EUA você enfrenta desafios únicos...",
        analise: "Baseado nas suas respostas, vejo que você valoriza sua saúde e bem-estar...",
        contexto_cultural: "A mudança de país afeta nossa saúde de várias formas...",
        habitos: [
          "**Hábito 1:** Hidratação adequada - Beba 8 copos de água por dia, especialmente importante no clima seco americano",
          "**Hábito 2:** Exposição solar controlada - 15 minutos de sol pela manhã para vitamina D, essencial nos EUA",
          "**Hábito 3:** Rotina de sono consistente - Durma 7-8 horas por noite, mesmo com a correria americana",
          "**Hábito 4:** Gestão do estresse - Pratique 10 minutos de meditação diária para equilibrar a rotina",
          "**Hábito 5:** Conexão social - Mantenha contato com outros brasileiros para apoio emocional"
        ],
        produtos: [],
        timeline: "Nos próximos 30 dias, foque em implementar um hábito por semana.",
        proximo_passo: "Faça uma avaliação como brasileira! Uma Coach de bem-estar brasileira vai adorar te ajudar. Ela custa $37, mas por você ter respondido a análise aqui, pode fazer hoje mesmo por $10. Clique no link e fale agora!"
      })
    }

  } catch (error) {
    console.error('Error in AI analysis:', error)
    return NextResponse.json(
      { error: 'Erro na análise. Tente novamente.' },
      { status: 500 }
    )
  }
}
