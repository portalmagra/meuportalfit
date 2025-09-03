import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { answers, comments, language } = await request.json()

    // Prompt baseado no treinamento fornecido
    const systemPrompt = `Você é uma especialista em wellness para mulheres brasileiras e latinas nos EUA.

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
4. SEMPRE mencione o clima americano (inverno rigoroso, ar seco, mudanças bruscas de temperatura)
5. Foque em marcas vendidas na Amazon com boa reputação
6. Recomende EXATAMENTE 3 produtos Amazon com termos de busca ALTAMENTE ESPECÍFICOS
7. Use termos de busca EXATOS que funcionem na Amazon (ex: "Nature Made Vitamin D3 2000 IU", "Garden of Life B12 Methylcobalamin", "NOW Foods Magnesium 400mg")
8. Explique como o produto ajuda especificamente com os desafios do clima americano
9. IMPORTANTE: Use nomes de marcas reais e específicas (Nature Made, Garden of Life, NOW Foods, etc.)

**Formato da resposta:**
{
  "analysis": "Análise personalizada em tom amigável...",
  "products": [
    {
      "name": "Nome do produto",
      "description": "Descrição científica",
      "price": "$XX.XX",
      "rating": "4.X/5",
      "searchTerms": "termos de busca para Amazon",
      "whyPerfect": "Por que é ideal para ela"
    }
  ],
  "nextSteps": "Próximos passos recomendados",
  "motivationalMessage": "Mensagem motivacional personalizada"
}`

    // Construir prompt com as respostas do usuário
    const userPrompt = `Analise o perfil desta brasileira/latina nos EUA:

**Respostas do questionário:**
${Object.entries(answers).map(([question, answer]) => `Pergunta ${question}: ${answer}`).join('\n')}

**Informações adicionais:**
${comments || 'Nenhuma informação adicional fornecida'}

**Idioma preferido:**
${language === 'pt' ? 'Português' : language === 'es' ? 'Español' : 'English'}

Forneça uma análise personalizada e recomende 3 produtos Amazon específicos para ela.`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 1500,
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
      // Se não conseguir fazer parse, retornar como texto
      return NextResponse.json({
        analysis: response,
        products: [],
        nextSteps: "Entre em contato para mais orientações personalizadas.",
        motivationalMessage: "Você está no caminho certo para sua transformação!"
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
