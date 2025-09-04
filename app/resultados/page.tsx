'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

// Sistema de traduções
const translations = {
  pt: {
    title: 'Avaliação gratuita feita por inteligência artificial',
    subtitle: 'Sua avaliação personalizada',
    acolhimento: 'Acolhimento',
    analise: 'Análise Personalizada',
    habitos: 'Checklist de Hábitos',
    produtos: 'Produtos Recomendados',
    timeline: 'Timeline de Implementação',
    proximo_passo: 'Próximo Passo',
    shareButton: 'Compartilhar',
    printButton: 'Imprimir',
    whatsappButton: 'Fale Conosco',
    shareMessage: 'Adorei! É muito instrutivo e vale a pena fazer! 🎯 Compartilhe com sua amiga, ela vai gostar:',
    shareTitle: 'Minha Avaliação Personalizada - MeuPortalFit',
    copiedMessage: 'Mensagem copiada para a área de transferência!'
  },
  es: {
    title: 'Evaluación gratuita hecha por inteligencia artificial',
    subtitle: 'Tu evaluación personalizada',
    acolhimento: 'Acolhimiento',
    analise: 'Análisis Personalizado',
    habitos: 'Lista de Hábitos',
    produtos: 'Productos Recomendados',
    timeline: 'Cronograma de Implementación',
    proximo_passo: 'Próximo Paso',
    shareButton: 'Compartir',
    printButton: 'Imprimir',
    whatsappButton: 'Contáctanos',
    shareMessage: '¡Me encantó! Es muy instructivo y vale la pena hacerlo! 🎯 Compártelo con tu amiga, le va a gustar:',
    shareTitle: 'Mi Evaluación Personalizada - MeuPortalFit',
    copiedMessage: '¡Mensaje copiado al portapapeles!'
  },
  en: {
    title: 'Free assessment made by artificial intelligence',
    subtitle: 'Your personalized assessment',
    acolhimento: 'Welcome',
    analise: 'Personalized Analysis',
    habitos: 'Habits Checklist',
    produtos: 'Recommended Products',
    timeline: 'Implementation Timeline',
    proximo_passo: 'Next Step',
    shareButton: 'Share',
    printButton: 'Print',
    whatsappButton: 'Contact Us',
    shareMessage: 'I loved it! It\'s very instructive and worth doing! 🎯 Share with your friend, she\'ll like it:',
    shareTitle: 'My Personalized Assessment - MeuPortalFit',
    copiedMessage: 'Message copied to clipboard!'
  }
}

function ResultadosContent() {
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [language, setLanguage] = useState('pt')
  const searchParams = useSearchParams()

  // Função de tradução
  const t = (key: keyof typeof translations.pt) => {
    return translations[language as keyof typeof translations]?.[key] || translations.pt[key] || key
  }

  // Função para traduzir WhatsApp message baseado no idioma
  const getWhatsAppMessage = (lang: string) => {
    const messages = {
      pt: 'Olá! Gostaria de saber mais sobre MeuPortalFit.',
      es: '¡Hola! Me gustaría saber más sobre MeuPortalFit.',
      en: 'Hello! I\'d like to know more about MeuPortalFit.'
    }
    return messages[lang as keyof typeof messages] || messages.pt
  }

  useEffect(() => {
    const loadResults = async () => {
      try {
        // Pegar dados da URL
        const answers = searchParams.get('answers')
        const comments = searchParams.get('comments')
        const lang = searchParams.get('language') || 'pt'
        const userName = searchParams.get('userName') || ''
        const userAge = searchParams.get('userAge') || ''
        setLanguage(lang)
        
        if (answers) {
          const parsedAnswers = JSON.parse(decodeURIComponent(answers))
          
          // Chamar API de análise com idioma e dados pessoais
          const response = await fetch('/api/ai-analysis', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              answers: parsedAnswers,
              comments: comments || '',
              language: lang,
              userName: userName,
              userAge: userAge
            })
          })

          if (response.ok) {
            const results = await response.json()
            console.log('🤖 Resultados da API:', results)
            setAnalysisResults(results)
          }
        }
      } catch (error) {
        console.error('Erro ao carregar resultados:', error)
      } finally {
        setLoading(false)
      }
    }

    loadResults()
  }, [searchParams])

  // Função para buscar produtos na Amazon
  const searchOnAmazon = (searchTerms: string) => {
    const encodedSearch = encodeURIComponent(searchTerms)
    const amazonUrl = `https://www.amazon.com/s?k=${encodedSearch}&tag=portalsolutio-20&rh=n%3A3760901%2Cp_85%3A2470955011%2Cp_72%3A1248879011&s=review-rank`
    window.open(amazonUrl, '_blank')
  }

  // Função para compartilhar com gatilho emocional
  const shareResults = () => {
    const url = 'https://meuportalfit.com/analise'
    const userName = searchParams.get('userName') || ''
    
    const text = language === 'pt' ? 
      userName ? 
        `🇧🇷 ${userName} descobriu como melhorar sua saúde nos EUA! Acabei de fazer uma avaliação gratuita personalizada que me ajudou muito. Compartilhe com seus amigos que também merecem cuidar da saúde: ${url}` :
        `🇧🇷 Ajude outros brasileiros nos EUA! Acabei de fazer uma avaliação gratuita de saúde personalizada que me ajudou muito. Compartilhe com seus amigos que também merecem cuidar da saúde sem gastar nada a mais: ${url}` :
      language === 'es' ?
      userName ?
        `🇧🇷 ¡${userName} descubrió cómo mejorar su salud en USA! Acabo de hacer una evaluación gratuita personalizada que me ayudó mucho. Compártelo con tus amigos que también merecen cuidar su salud: ${url}` :
        `🇧🇷 ¡Ayuda a otros brasileños en USA! Acabo de hacer una evaluación gratuita de salud personalizada que me ayudó mucho. Compártelo con tus amigos que también merecen cuidar su salud sin gastar nada más: ${url}` :
      userName ?
        `🇧🇷 ${userName} discovered how to improve their health in the USA! I just did a free personalized assessment that helped me a lot. Share with your friends who also deserve to take care of their health: ${url}` :
        `🇧🇷 Help other Brazilians in the USA! I just did a free personalized health assessment that helped me a lot. Share with your friends who also deserve to take care of their health without spending anything extra: ${url}`
    
    if (navigator.share) {
      navigator.share({
        title: language === 'pt' ? 
               userName ? `${userName} - Avaliação Personalizada Gratuita` : 'Ajude Outros Brasileiros - Avaliação Gratuita' :
               language === 'es' ? 
               userName ? `${userName} - Evaluación Personalizada Gratuita` : 'Ayuda a Otros Brasileños - Evaluación Gratuita' :
               userName ? `${userName} - Free Personalized Assessment` : 'Help Other Brazilians - Free Assessment',
        text: text,
        url: url
      })
    } else {
      // Fallback para copiar link
      navigator.clipboard.writeText(text).then(() => {
        alert(language === 'pt' ? 'Mensagem copiada! Compartilhe com seus amigos brasileiros!' :
              language === 'es' ? '¡Mensaje copiado! ¡Comparte con tus amigos brasileños!' :
              'Message copied! Share with your Brazilian friends!')
      })
    }
  }

  // Função para imprimir/compartilhar como documento
  const printResults = () => {
    // Adicionar link do MeuPortalFit antes de imprimir
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Minha Avaliação Personalizada - MeuPortalFit</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; background: white; }
              .header { 
                text-align: center; 
                margin-bottom: 30px; 
                background: linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #f0f9ff 100%);
                padding: 30px;
                border-radius: 12px;
              }
              .logo { font-size: 28px; font-weight: bold; background: linear-gradient(135deg, #22c55e, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
              .title { font-size: 24px; color: #1f2937; margin: 10px 0; }
              .subtitle { font-size: 16px; color: #6b7280; }
              .section { margin-bottom: 25px; }
              .section-title { font-size: 20px; color: #1e293b; margin-bottom: 15px; font-weight: bold; }
              .acolhimento { 
                background: #f0fdf4; 
                padding: 20px; 
                border-radius: 8px; 
                border: 2px solid #bbf7d0;
                font-style: italic;
                font-size: 16px;
                color: #374151;
              }
              .analise { 
                background: #f8fafc; 
                padding: 20px; 
                border-radius: 8px; 
                border: 1px solid #e0f2e9;
                font-size: 16px;
                color: #374151;
                line-height: 1.6;
              }
              .contexto-cultural {
                background: #fef3c7;
                padding: 20px;
                border-radius: 8px;
                border: 2px solid #f59e0b;
                font-size: 16px;
                color: #374151;
                line-height: 1.6;
                margin-top: 15px;
              }
              .insights-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 15px;
                margin-top: 20px;
              }
              .insight-card {
                padding: 15px;
                border-radius: 8px;
                border: 2px solid;
              }
              .insight-card.verde {
                background: #f0fdf4;
                border-color: #bbf7d0;
              }
              .insight-card.azul {
                background: #eff6ff;
                border-color: #93c5fd;
              }
              .insight-card.amarelo {
                background: #fef3c7;
                border-color: #f59e0b;
              }
              .insight-title {
                font-weight: bold;
                font-size: 16px;
                margin-bottom: 8px;
                display: flex;
                align-items: center;
                gap: 8px;
              }
              .insight-text {
                font-size: 14px;
                color: #374151;
                line-height: 1.4;
              }
              .habito { 
                margin: 15px 0; 
                padding: 15px; 
                background: #f0fdf4; 
                border-radius: 8px; 
                border: 2px solid #bbf7d0;
                display: flex;
                align-items: center;
                gap: 15px;
              }
              .check { 
                color: #22c55e; 
                font-size: 24px; 
                font-weight: bold;
                background: white;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px solid #22c55e;
              }
              .habito-text { font-size: 16px; color: #374151; font-weight: 500; }
              .produto { 
                margin: 15px 0; 
                padding: 15px; 
                background: #f8fafc; 
                border-radius: 8px; 
                border: 1px solid #e0f2e9;
              }
              .produto-nome { font-size: 18px; font-weight: bold; color: #1e293b; margin-bottom: 8px; }
              .produto-desc { font-size: 14px; color: #64748b; margin-bottom: 8px; }
              .produto-preco { color: #059669; font-weight: bold; }
              .produto-why { 
                background: #f0fdf4; 
                padding: 10px; 
                border-radius: 6px; 
                border: 1px solid #bbf7d0;
                font-style: italic;
                color: #059669;
                font-size: 13px;
                margin-top: 8px;
              }
              .produtos-adicionais {
                background: #f8fafc;
                padding: 20px;
                border-radius: 8px;
                border: 2px solid #e0f2e9;
                margin-top: 20px;
              }
              .produto-adicional {
                border: 2px solid #bbf7d0;
                border-radius: 8px;
                padding: 12px;
                background: white;
                margin: 10px 0;
              }
              .footer { 
                text-align: center; 
                margin-top: 40px; 
                padding: 30px; 
                background: #f0fdf4; 
                border-radius: 12px;
                border: 2px solid #bbf7d0;
              }
              .link { 
                color: #22c55e; 
                text-decoration: none; 
                font-weight: bold; 
                font-size: 18px;
                display: block;
                margin: 10px 0;
              }
              .whatsapp { 
                color: #25d366; 
                font-weight: bold; 
                font-size: 16px;
                margin: 10px 0;
              }
              @media print {
                body { margin: 0; }
                .header { background: white !important; }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="logo">MeuPortalFit</div>
              <div class="title">Avaliação Gratuita feita por Inteligência Artificial</div>
              <div class="subtitle">Personalizada para brasileiros nos EUA</div>
            </div>
            
            ${analysisResults?.acolhimento ? `
            <div class="section">
              <div class="acolhimento">
                ${analysisResults.acolhimento}
              </div>
            </div>
            ` : ''}
            
            ${analysisResults?.analise || analysisResults?.analysis ? `
            <div class="section">
              <div class="section-title">🧠 Análise Personalizada Detalhada</div>
              <div class="analise">
                <strong style="color: #1e293b;">📊 Resumo da Sua Avaliação:</strong><br/>
                ${analysisResults.analise || analysisResults.analysis}
              </div>
              
              ${analysisResults?.contexto_cultural ? `
              <div class="contexto-cultural">
                <strong style="color: #92400e;">🌍 Contexto Cultural:</strong><br/>
                ${analysisResults.contexto_cultural}
              </div>
              ` : ''}
              
              <div class="insights-grid">
                <div class="insight-card verde">
                  <div class="insight-title">
                    <span style="font-size: 18px;">💡</span>
                    Principais Insights:
                  </div>
                  <div class="insight-text">
                    Baseado nas suas respostas, identificamos pontos-chave para otimizar seu bem-estar e alcançar seus objetivos de saúde.
                  </div>
                </div>
                
                <div class="insight-card azul">
                  <div class="insight-title">
                    <span style="font-size: 18px;">🎯</span>
                    Objetivos Identificados:
                  </div>
                  <div class="insight-text">
                    Focamos em melhorar sua energia, qualidade do sono e equilíbrio geral para resultados duradouros.
                  </div>
                </div>
                
                <div class="insight-card amarelo">
                  <div class="insight-title">
                    <span style="font-size: 18px;">⚡</span>
                    Potencial de Melhoria:
                  </div>
                  <div class="insight-text">
                    Com as mudanças sugeridas, você pode ver melhorias significativas em 2-4 semanas.
                  </div>
                </div>
              </div>
            </div>
            ` : ''}
            
            ${analysisResults?.habitos && analysisResults.habitos.length > 0 ? `
            <div class="section">
              <div class="section-title">✅ Checklist de Hábitos para Você</div>
              ${analysisResults.habitos.map((habito: string) => `
                <div class="habito">
                  <div class="check">✓</div>
                  <div class="habito-text">${habito}</div>
                </div>
              `).join('')}
            </div>
            ` : ''}
            
            <div class="section">
              <div class="section-title">🛍️ Produtos Selecionados para Você</div>
              
              ${analysisResults?.produtos && analysisResults.produtos.length > 0 ? `
              ${analysisResults.produtos.map((produto: any) => `
                <div class="produto">
                  <div class="produto-nome">${produto.name}</div>
                  <div class="produto-desc">${produto.description}</div>
                  <div class="produto-preco">${produto.price} ⭐ ${produto.rating}</div>
                  <div class="produto-why">💡 ${produto.whyPerfect}</div>
                </div>
              `).join('')}
              ` : ''}
              
              <div class="produtos-adicionais">
                <div style="font-size: 18px; font-weight: bold; color: #1e293b; margin-bottom: 15px; text-align: center;">
                  🎯 Produtos Recomendados Adicionais
                </div>
                
                <div class="produto-adicional">
                  <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <span style="font-size: 18px; margin-right: 8px;">💊</span>
                    <strong style="font-size: 16px; color: #1e293b;">Vitamina D3 2000 IU</strong>
                  </div>
                  <div style="font-size: 14px; color: #64748b; line-height: 1.4;">
                    Essencial para imunidade e energia, especialmente importante no inverno americano.
                  </div>
                </div>
                
                <div class="produto-adicional">
                  <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <span style="font-size: 18px; margin-right: 8px;">🌙</span>
                    <strong style="font-size: 16px; color: #1e293b;">Magnésio para Sono</strong>
                  </div>
                  <div style="font-size: 14px; color: #64748b; line-height: 1.4;">
                    Melhora a qualidade do sono e relaxamento muscular, ideal para quem tem dificuldade para dormir.
                  </div>
                </div>
                
                <div class="produto-adicional">
                  <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <span style="font-size: 18px; margin-right: 8px;">⚡</span>
                    <strong style="font-size: 16px; color: #1e293b;">Complexo B Energético</strong>
                  </div>
                  <div style="font-size: 14px; color: #64748b; line-height: 1.4;">
                    Aumenta energia natural, melhora foco e reduz fadiga, perfeito para o dia a dia.
                  </div>
                </div>
                
                <div class="produto-adicional">
                  <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <span style="font-size: 18px; margin-right: 8px;">🐟</span>
                    <strong style="font-size: 16px; color: #1e293b;">Ômega 3 Premium</strong>
                  </div>
                  <div style="font-size: 14px; color: #64748b; line-height: 1.4;">
                    Suporte para coração, cérebro e inflamação, essencial para saúde geral.
                  </div>
                </div>
              </div>
            </div>
            
            <div class="footer">
              <p style="font-size: 18px; font-weight: bold; color: #1e293b; margin-bottom: 20px;">
                Faça sua avaliação personalizada em:
              </p>
              <a href="https://meuportalfit.com/analise" class="link">meuportalfit.com/analise</a>
              <div class="whatsapp">
                📞 WhatsApp: +1 (786) 253-5032
              </div>
              <p style="font-size: 14px; color: #6b7280; margin-top: 20px;">
                Avaliação personalizada para brasileiros nos EUA
              </p>
            </div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  // Função para abrir WhatsApp
  const openWhatsApp = (message: string) => {
    const phoneNumber = '+17862535032'
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #f0f9ff 100%)'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '2rem'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #22c55e',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{
            color: '#6b7280',
            fontSize: '1.1rem'
          }}>
            Analisando seus dados...
          </p>
        </div>
      </div>
    )
  }

  return (
    <main style={{ position: 'relative', overflow: 'hidden', background: 'white' }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '1rem 0',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexShrink: 0 }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 900,
                fontSize: '1.2rem'
              }}>
                M
              </div>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                MeuPortalFit
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                              <a href={`https://wa.me/17862535032?text=${encodeURIComponent(getWhatsAppMessage(language))}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.2rem',
                  background: 'linear-gradient(135deg, #25d366, #128c7e)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}>
                  <span>💬</span>
                  <span>{t('whatsappButton')}</span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Mais Compacto */}
      <section style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #f0f9ff 100%)',
        padding: '1.5rem 0',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 'auto'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem', position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <h1 style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '0.5rem',
            color: '#1f2937',
            whiteSpace: 'pre-line'
          }}>
            <span style={{ background: 'linear-gradient(135deg, #22c55e, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {t('title')}
            </span>
          </h1>
        </div>
      </section>

      {/* Results Section */}
      <section style={{ background: 'white', padding: '1.5rem 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
          {analysisResults && (
            <>
              {/* Acolhimento */}
              {analysisResults?.acolhimento && (
                <div style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  marginBottom: '1.5rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  textAlign: 'left',
                  border: '3px solid #e0f2e9'
                }}>
                  <div style={{
                    fontSize: '1.1rem',
                    color: '#374151',
                    lineHeight: '1.6',
                    fontStyle: 'italic'
                  }}>
                    {analysisResults.acolhimento}
                  </div>
                </div>
              )}

                            {/* Score de Bem-Estar Compacto */}
              {(() => {
                const answers = searchParams.get('answers')
                let score = 65 // Score base
                
                if (answers) {
                  try {
                    const parsedAnswers = JSON.parse(decodeURIComponent(answers))
                    const answersStr = JSON.stringify(parsedAnswers).toLowerCase()
                    
                    // Calcular score baseado nas respostas
                    if (answersStr.includes('energia') || answersStr.includes('cansado')) {
                      score += 5
                    }
                    if (answersStr.includes('sono') || answersStr.includes('insônia')) {
                      score += 8
                    }
                    if (answersStr.includes('peso') || answersStr.includes('emagrecer')) {
                      score += 6
                    }
                    if (answersStr.includes('imunidade') || answersStr.includes('doente')) {
                      score += 7
                    }
                    
                    // Ajustar score baseado na idade
                    if (answersStr.includes('18-25') || answersStr.includes('26-35')) {
                      score += 3
                    } else if (answersStr.includes('46+')) {
                      score -= 5
                    }
                    
                    score = Math.min(score, 95) // Máximo 95
                    score = Math.max(score, 45) // Mínimo 45
                    
                  } catch (e) {
                    console.error('Erro ao calcular score:', e)
                  }
                }
                
                return (
                  <div style={{
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: '12px',
                    marginBottom: '1rem',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                    border: '1px solid #e0f2e9',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '1rem'
                    }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'conic-gradient(#22c55e 0deg, #22c55e 234deg, #e5e7eb 234deg, #e5e7eb 360deg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                      }}>
                        <div style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          backgroundColor: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.2rem',
                          fontWeight: 'bold',
                          color: '#22c55e'
                        }}>
                          {score}
                        </div>
                      </div>
                      
                      <div style={{ textAlign: 'left' }}>
                        <div style={{
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          color: '#1e293b'
                        }}>
                          Score: {score}/100
                        </div>
                        <div style={{
                          fontSize: '0.8rem',
                          color: '#64748b'
                        }}>
                          +{100-score} pontos possíveis
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}

              {/* Prova Social - Depoimentos de Brasileiros */}
              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '16px',
                marginBottom: '1.5rem',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                border: '2px solid #e0f2e9'
              }}>
                <h3 style={{
                  fontSize: '1.4rem',
                  color: '#1e293b',
                  marginBottom: '1.5rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ fontSize: '1.6rem' }}>🇧🇷</span>
                  Brasileiros que já Transformaram Sua Saúde
                </h3>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1rem'
                }}>
                  <div style={{
                    backgroundColor: '#f8fafc',
                    padding: '1.2rem',
                    borderRadius: '12px',
                    border: '2px solid #e0f2e9'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '0.8rem'
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: '#22c55e',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        marginRight: '1rem'
                      }}>
                        M
                      </div>
                      <div>
                        <div style={{ fontWeight: 'bold', color: '#1e293b' }}>Maria, 32 anos</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Brasileira em Boston</div>
                      </div>
                    </div>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#374151',
                      lineHeight: '1.5',
                      fontStyle: 'italic'
                    }}>
                      {(() => {
                        const answers = searchParams.get('answers')
                        if (answers) {
                          const answersStr = JSON.stringify(JSON.parse(decodeURIComponent(answers))).toLowerCase()
                          if (answersStr.includes('energia') || answersStr.includes('cansado')) {
                            return '"A avaliação me ajudou a entender exatamente o que comprar na Amazon sem gastar à toa. Em 3 semanas, minha energia melhorou 80%!"'
                          } else if (answersStr.includes('sono') || answersStr.includes('insônia')) {
                            return '"Finalmente consegui dormir melhor! Os produtos recomendados são perfeitos para o clima americano."'
                          } else if (answersStr.includes('peso') || answersStr.includes('emagrecer')) {
                            return '"Perdi 8kg em 2 meses seguindo as dicas da avaliação. Os suplementos são incríveis!"'
                          }
                        }
                        return '"A avaliação me ajudou a entender exatamente o que comprar na Amazon sem gastar à toa. Em 3 semanas, minha energia melhorou 80%!"'
                      })()}
                    </p>
                  </div>
                  
                  <div style={{
                    backgroundColor: '#f8fafc',
                    padding: '1.2rem',
                    borderRadius: '12px',
                    border: '2px solid #e0f2e9'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '0.8rem'
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: '#3b82f6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        marginRight: '1rem'
                      }}>
                        C
                      </div>
                      <div>
                        <div style={{ fontWeight: 'bold', color: '#1e293b' }}>Carlos, 28 anos</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Brasileiro em Miami</div>
                      </div>
                    </div>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#374151',
                      lineHeight: '1.5',
                      fontStyle: 'italic'
                    }}>
                      {(() => {
                        const answers = searchParams.get('answers')
                        if (answers) {
                          const answersStr = JSON.stringify(JSON.parse(decodeURIComponent(answers))).toLowerCase()
                          if (answersStr.includes('imunidade') || answersStr.includes('doente')) {
                            return '"Não fico mais doente! Os suplementos de imunidade são perfeitos para o inverno americano."'
                          } else if (answersStr.includes('estresse') || answersStr.includes('ansiedade')) {
                            return '"Minha ansiedade diminuiu 70% com os adaptógenos recomendados. Valeu cada centavo!"'
                          } else if (answersStr.includes('performance') || answersStr.includes('foco')) {
                            return '"Meu foco melhorou demais! Os nootrópicos são exatamente o que eu precisava para o trabalho."'
                          }
                        }
                        return '"Finalmente entendi o que meu corpo precisa aqui nos EUA. Os produtos recomendados são perfeitos para o clima e rotina americana."'
                      })()}
                    </p>
                  </div>
                  
                  <div style={{
                    backgroundColor: '#f8fafc',
                    padding: '1.2rem',
                    borderRadius: '12px',
                    border: '2px solid #e0f2e9'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '0.8rem'
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: '#f59e0b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        marginRight: '1rem'
                      }}>
                        A
                      </div>
                      <div>
                        <div style={{ fontWeight: 'bold', color: '#1e293b' }}>Ana, 35 anos</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Brasileira em NYC</div>
                      </div>
                    </div>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#374151',
                      lineHeight: '1.5',
                      fontStyle: 'italic'
                    }}>
                      {(() => {
                        const answers = searchParams.get('answers')
                        if (answers) {
                          const answersStr = JSON.stringify(JSON.parse(decodeURIComponent(answers))).toLowerCase()
                          if (answersStr.includes('menos de 1 ano') || answersStr.includes('recém')) {
                            return '"A coach brasileira me ajudou a adaptar minha alimentação ao clima americano. Inestimável!"'
                          } else if (answersStr.includes('5+ anos') || answersStr.includes('veterano')) {
                            return '"Mesmo depois de 7 anos aqui, a coach me ensinou truques que eu não sabia. Fantástico!"'
                          } else if (answersStr.includes('vida agitada') || answersStr.includes('muito trabalho')) {
                            return '"A coach entende a rotina americana. Suas dicas práticas mudaram minha vida!"'
                          }
                        }
                        return '"A coach brasileira me deu dicas que só quem vive aqui entende. Valeu cada centavo dos $10!"'
                      })()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Análise Personalizada Detalhada - Melhorada */}
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                marginBottom: '2rem',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                textAlign: 'left',
                border: '2px solid #e0f2e9'
              }}>
                <h3 style={{
                  fontSize: '1.6rem',
                  color: '#1e293b',
                  marginBottom: '1.5rem',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ fontSize: '1.8rem' }}>🧠</span>
                  Análise Personalizada Detalhada
                </h3>
                
                {/* Análise Principal Detalhada */}
                <div style={{
                  fontSize: '1.1rem',
                  color: '#374151',
                  lineHeight: '1.7',
                  marginBottom: '1.5rem',
                  padding: '1.2rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e0f2e9'
                }}>
                  <strong style={{ color: '#1e293b' }}>📊 Resumo da Sua Avaliação:</strong><br/>
                  {analysisResults?.analise || analysisResults?.analysis}
                  
                  {/* Análise Detalhada Baseada nas Respostas */}
                  {(() => {
                    const answers = searchParams.get('answers')
                    let detailedAnalysis = []
                    
                    if (answers) {
                      try {
                        const parsedAnswers = JSON.parse(decodeURIComponent(answers))
                        const answersStr = JSON.stringify(parsedAnswers).toLowerCase()
                        
                        // Análise detalhada baseada nas respostas específicas
                        if (answersStr.includes('energia') || answersStr.includes('cansado') || answersStr.includes('tired')) {
                          detailedAnalysis.push({
                            icon: '⚡',
                            title: 'Energia e Vitalidade',
                            analysis: 'Identificamos que você está enfrentando desafios com sua energia diária. Isso é muito comum entre brasileiros nos EUA devido à adaptação ao novo clima, rotina mais intensa e possível deficiência de vitamina D. Vamos trabalhar com nutrientes específicos que otimizam a produção de energia celular e reduzem a fadiga.',
                            recommendations: 'Focaremos em Complexo B, Magnésio e adaptógenos como Rhodiola Rosea para aumentar sua resistência ao estresse e melhorar sua energia ao longo do dia.'
                          })
                        }
                        
                        if (answersStr.includes('sono') || answersStr.includes('insônia') || answersStr.includes('sleep')) {
                          detailedAnalysis.push({
                            icon: '🌙',
                            title: 'Qualidade do Sono',
                            analysis: 'Seu sono precisa de atenção especial. A mudança de fuso horário, estresse da adaptação cultural e possível ansiedade podem estar afetando sua qualidade de sono. Isso impacta diretamente sua energia, humor e saúde geral.',
                            recommendations: 'Vamos trabalhar com Magnésio Glicinato, Melatonina e técnicas de relaxamento para promover um sono mais profundo e reparador.'
                          })
                        }
                        
                        if (answersStr.includes('peso') || answersStr.includes('emagrecer') || answersStr.includes('weight')) {
                          detailedAnalysis.push({
                            icon: '🎯',
                            title: 'Metabolismo e Peso',
                            analysis: 'Identificamos que você busca otimizar seu metabolismo e peso. A mudança de hábitos alimentares nos EUA, possível aumento do consumo de alimentos processados e redução da atividade física podem estar impactando seus objetivos.',
                            recommendations: 'Focaremos em acelerar seu metabolismo naturalmente com Chá Verde, Cromo e L-Carnitina, além de estratégias nutricionais específicas.'
                          })
                        }
                        
                        if (answersStr.includes('imunidade') || answersStr.includes('doente') || answersStr.includes('immune')) {
                          detailedAnalysis.push({
                            icon: '🛡️',
                            title: 'Sistema Imunológico',
                            analysis: 'Seu sistema imunológico precisa de suporte extra. O clima americano, mudança de ambiente e possível estresse da adaptação podem estar enfraquecendo suas defesas naturais.',
                            recommendations: 'Vamos fortalecer sua imunidade com Vitamina C, Zinco, Vitamina D3 e Própolis, especialmente importantes no clima americano.'
                          })
                        }
                        
                        if (answersStr.includes('estresse') || answersStr.includes('ansiedade') || answersStr.includes('stress')) {
                          detailedAnalysis.push({
                            icon: '🧘',
                            title: 'Gestão do Estresse',
                            analysis: 'O estresse da adaptação cultural, saudade da família e pressão da nova rotina podem estar impactando seu bem-estar emocional. Isso afeta diretamente sua saúde física e mental.',
                            recommendations: 'Vamos trabalhar com adaptógenos como Ashwagandha, Magnésio e técnicas de mindfulness para reduzir o cortisol e promover equilíbrio emocional.'
                          })
                        }
                        
                        // Análise padrão se não houver matches específicos
                        if (detailedAnalysis.length === 0) {
                          detailedAnalysis.push({
                            icon: '💡',
                            title: 'Bem-estar Geral',
                            analysis: 'Como brasileiro nos EUA, você enfrenta desafios únicos de adaptação que impactam sua saúde. A mudança de clima, hábitos alimentares e rotina pode afetar seu equilíbrio geral.',
                            recommendations: 'Vamos focar em nutrientes essenciais para brasileiros nos EUA, incluindo Vitamina D3, Ômega 3 e um multivitamínico de qualidade.'
                          })
                        }
                      } catch (e) {
                        console.error('Erro ao analisar respostas detalhadamente:', e)
                      }
                    }
                    
                    return (
                      <div style={{ marginTop: '1rem' }}>
                        {detailedAnalysis.map((item, index) => (
                          <div key={index} style={{
                            backgroundColor: '#f0fdf4',
                            padding: '1rem',
                            borderRadius: '8px',
                            border: '1px solid #bbf7d0',
                            marginBottom: '1rem'
                          }}>
                            <strong style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                              {item.title}:
                            </strong>
                            <p style={{ fontSize: '0.95rem', color: '#374151', lineHeight: '1.6', marginBottom: '0.8rem' }}>
                              {item.analysis}
                            </p>
                            <p style={{ fontSize: '0.9rem', color: '#059669', fontStyle: 'italic' }}>
                              <strong>Nossa Abordagem:</strong> {item.recommendations}
                            </p>
                          </div>
                        ))}
                      </div>
                    )
                  })()}
                </div>

                {/* Contexto Cultural Detalhado */}
                <div style={{
                  fontSize: '1rem',
                  color: '#374151',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem',
                  backgroundColor: '#fef3c7',
                  padding: '1.2rem',
                  borderRadius: '12px',
                  border: '2px solid #f59e0b'
                }}>
                  <strong style={{ color: '#92400e', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
                    <span style={{ fontSize: '1.3rem' }}>🌍</span>
                    Contexto Cultural Brasileiro nos EUA:
                  </strong>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <p style={{ fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '0.8rem' }}>
                      <strong>🇧🇷 Desafios Específicos que Você Enfrenta:</strong>
                    </p>
                    <ul style={{ fontSize: '0.9rem', lineHeight: '1.5', marginLeft: '1rem' }}>
                      <li><strong>Clima:</strong> Mudança de clima tropical para mais seco/frio, afetando pele e hidratação</li>
                      <li><strong>Alimentação:</strong> Diferenças nos hábitos alimentares e disponibilidade de ingredientes brasileiros</li>
                      <li><strong>Rotina:</strong> Pressão da cultura americana por produtividade e eficiência</li>
                      <li><strong>Social:</strong> Distância da família e amigos, impactando o bem-estar emocional</li>
                      <li><strong>Saúde:</strong> Diferenças no sistema de saúde e acesso a tratamentos naturais</li>
                    </ul>
                  </div>
                  
                  <div style={{
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #f59e0b',
                    fontSize: '0.9rem'
                  }}>
                    <p style={{ color: '#92400e', fontStyle: 'italic', margin: 0 }}>
                      💡 <strong>Nossa Abordagem:</strong> Entendemos profundamente esses desafios e criamos soluções específicas para brasileiros nos EUA, combinando nutrição funcional com práticas de bem-estar adaptadas à sua realidade.
                    </p>
                  </div>
                </div>

                {/* Insights Específicos e Recomendações Detalhadas */}
                <div style={{
                  marginTop: '1.5rem',
                  padding: '1.5rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  border: '2px solid #e0f2e9'
                }}>
                  <h4 style={{
                    fontSize: '1.2rem',
                    color: '#1e293b',
                    marginBottom: '1rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{ fontSize: '1.4rem' }}>🎯</span>
                    Insights Específicos para Você
                  </h4>
                  
                  {(() => {
                    const answers = searchParams.get('answers')
                    let insights = []
                    
                    if (answers) {
                      try {
                        const parsedAnswers = JSON.parse(decodeURIComponent(answers))
                        const answersStr = JSON.stringify(parsedAnswers).toLowerCase()
                        
                        // Insights específicos baseados nas respostas
                        if (answersStr.includes('energia') || answersStr.includes('cansado') || answersStr.includes('tired')) {
                          insights.push({
                            icon: '⚡',
                            title: 'Energia e Vitalidade',
                            description: 'Identificamos que você busca mais energia. Focaremos em nutrientes que otimizam a produção de energia celular e reduzem a fadiga.',
                            specificActions: [
                              'Suplementação com Complexo B para produção de energia',
                              'Magnésio para redução da fadiga muscular',
                              'Rhodiola Rosea para resistência ao estresse',
                              'Vitamina D3 para energia celular'
                            ],
                            color: '#059669',
                            bgColor: '#f0fdf4',
                            borderColor: '#bbf7d0'
                          })
                        }
                        
                        if (answersStr.includes('sono') || answersStr.includes('insônia') || answersStr.includes('sleep')) {
                          insights.push({
                            icon: '🌙',
                            title: 'Qualidade do Sono',
                            description: 'Seu sono precisa de atenção. Vamos trabalhar com nutrientes que promovem relaxamento e melhoram a qualidade do sono.',
                            specificActions: [
                              'Magnésio Glicinato para relaxamento muscular',
                              'Melatonina para regular o ciclo circadiano',
                              'L-Teanina para redução da ansiedade',
                              'Técnicas de respiração antes de dormir'
                            ],
                            color: '#1d4ed8',
                            bgColor: '#eff6ff',
                            borderColor: '#93c5fd'
                          })
                        }
                        
                        if (answersStr.includes('peso') || answersStr.includes('emagrecer') || answersStr.includes('weight')) {
                          insights.push({
                            icon: '🎯',
                            title: 'Metabolismo e Peso',
                            description: 'Focaremos em acelerar seu metabolismo naturalmente e otimizar a queima de gordura com ingredientes cientificamente comprovados.',
                            specificActions: [
                              'Chá Verde para aceleração do metabolismo',
                              'Cromo para controle do açúcar no sangue',
                              'L-Carnitina para queima de gordura',
                              'Proteína Whey para saciedade'
                            ],
                            color: '#92400e',
                            bgColor: '#fef3c7',
                            borderColor: '#f59e0b'
                          })
                        }
                        
                        if (answersStr.includes('imunidade') || answersStr.includes('doente') || answersStr.includes('immune')) {
                          insights.push({
                            icon: '🛡️',
                            title: 'Sistema Imunológico',
                            description: 'Vamos fortalecer sua imunidade com nutrientes essenciais, especialmente importantes no clima americano.',
                            specificActions: [
                              'Vitamina C para fortalecimento das defesas',
                              'Zinco para função imunológica',
                              'Vitamina D3 para resposta imune',
                              'Própolis para proteção natural'
                            ],
                            color: '#be185d',
                            bgColor: '#fdf2f8',
                            borderColor: '#ec4899'
                          })
                        }
                        
                        if (answersStr.includes('estresse') || answersStr.includes('ansiedade') || answersStr.includes('stress')) {
                          insights.push({
                            icon: '🧘',
                            title: 'Gestão do Estresse',
                            description: 'Vamos trabalhar com adaptógenos e técnicas para reduzir o cortisol e promover equilíbrio emocional.',
                            specificActions: [
                              'Ashwagandha para redução do cortisol',
                              'Magnésio para relaxamento nervoso',
                              'L-Teanina para calma mental',
                              'Técnicas de mindfulness diárias'
                            ],
                            color: '#7c3aed',
                            bgColor: '#f3f4f6',
                            borderColor: '#8b5cf6'
                          })
                        }
                        
                        // Insight padrão se não houver matches específicos
                        if (insights.length === 0) {
                          insights.push({
                            icon: '💡',
                            title: 'Bem-estar Geral',
                            description: 'Vamos focar em otimizar seu bem-estar geral com nutrientes essenciais para brasileiros nos EUA.',
                            specificActions: [
                              'Multivitamínico de qualidade',
                              'Ômega 3 para saúde geral',
                              'Vitamina D3 para imunidade',
                              'Probióticos para saúde intestinal'
                            ],
                            color: '#059669',
                            bgColor: '#f0fdf4',
                            borderColor: '#bbf7d0'
                          })
                        }
                      } catch (e) {
                        console.error('Erro ao analisar respostas:', e)
                      }
                    }
                    
                    return (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1rem'
                      }}>
                        {insights.map((insight, index) => (
                          <div key={index} style={{
                            backgroundColor: insight.bgColor,
                            padding: '1.2rem',
                            borderRadius: '12px',
                            border: `2px solid ${insight.borderColor}`
                          }}>
                            <strong style={{ color: insight.color, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
                              <span style={{ fontSize: '1.3rem' }}>{insight.icon}</span>
                              {insight.title}:
                            </strong>
                            <p style={{ fontSize: '0.95rem', color: '#374151', lineHeight: '1.6', marginBottom: '1rem' }}>
                              {insight.description}
                            </p>
                            
                            <div style={{ marginTop: '0.8rem' }}>
                              <strong style={{ color: insight.color, fontSize: '0.9rem' }}>Ações Específicas:</strong>
                              <ul style={{ 
                                fontSize: '0.85rem', 
                                color: '#374151', 
                                marginTop: '0.5rem',
                                marginLeft: '1rem',
                                lineHeight: '1.4'
                              }}>
                                {insight.specificActions.map((action, idx) => (
                                  <li key={idx} style={{ marginBottom: '0.3rem' }}>• {action}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  })()}
                </div>
              </div>

              {/* Checklist de Hábitos */}
              {analysisResults?.habitos && analysisResults.habitos.length > 0 && (
                <div style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  marginBottom: '1.5rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}>
                  <h3 style={{
                    fontSize: '1.4rem',
                    color: '#1e293b',
                    marginBottom: '1.5rem',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>
                    ✅ {t('habitos')} para Você
                  </h3>
                  
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}>
                    {analysisResults.habitos.map((habito: string, index: number) => {
                      // Processar o texto para destacar o negrito
                      const processedHabit = habito.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      
                      return (
                        <div key={index} style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '1rem',
                          padding: '1.2rem',
                          backgroundColor: '#f0fdf4',
                          borderRadius: '12px',
                          border: '2px solid #bbf7d0',
                          boxShadow: '0 2px 8px rgba(34, 197, 94, 0.1)'
                        }}>
                          <div style={{
                            width: '35px',
                            height: '35px',
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            border: '2px solid #22c55e',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#22c55e',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            flexShrink: 0,
                            marginTop: '0.2rem'
                          }}>
                            ✓
                          </div>
                          <div 
                            style={{
                              fontSize: '1.1rem',
                              color: '#374151',
                              lineHeight: '1.5',
                              fontWeight: '500'
                            }}
                            dangerouslySetInnerHTML={{ __html: processedHabit }}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Seção de Curadoria Inteligente - DEPOIS do Checklist */}
              <div style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #f0f9ff 100%)',
                padding: '1.5rem',
                borderRadius: '16px',
                marginBottom: '2rem',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                border: '2px solid #e0f2e9',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '1.4rem',
                  color: '#1e293b',
                  marginBottom: '1rem',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ fontSize: '1.6rem' }}>🎯</span>
                  Curadoria Inteligente de Produtos
                </h3>
                
                <p style={{
                  fontSize: '1rem',
                  color: '#374151',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}>
                  Somos uma curadoria que seleciona os <strong>melhores produtos para você adquirir na Amazon</strong> através de um sistema inteligente que analisa:
                </p>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    backgroundColor: '#f0fdf4',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid #bbf7d0'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ fontSize: '1.5rem' }}>🏆</span>
                      <strong style={{ color: '#059669' }}>Marcas Premium</strong>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#374151', marginTop: '0.3rem' }}>
                      Marcas reconhecidas e confiáveis
                    </p>
                  </div>
                  
                  <div style={{
                    backgroundColor: '#eff6ff',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid #93c5fd'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ fontSize: '1.5rem' }}>🔬</span>
                      <strong style={{ color: '#1d4ed8' }}>Backing Científico</strong>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#374151', marginTop: '0.3rem' }}>
                      Formas biodisponíveis e testadas
                    </p>
                  </div>
                  
                  <div style={{
                    backgroundColor: '#fef3c7',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid #f59e0b'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ fontSize: '1.5rem' }}>✅</span>
                      <strong style={{ color: '#92400e' }}>Certificações</strong>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#374151', marginTop: '0.3rem' }}>
                      Non-GMO, Gluten Free, Third Party Tested
                    </p>
                  </div>
                  
                  <div style={{
                    backgroundColor: '#fdf2f8',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid #ec4899'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ fontSize: '1.5rem' }}>🎯</span>
                      <strong style={{ color: '#be185d' }}>Personalização</strong>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#374151', marginTop: '0.3rem' }}>
                      Baseado nas suas necessidades específicas
                    </p>
                  </div>
                </div>
                
                <div style={{
                  backgroundColor: '#f8fafc',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '2px solid #e0f2e9',
                  fontSize: '0.9rem',
                  color: '#64748b',
                  fontStyle: 'italic'
                }}>
                  💡 <strong>Diferencial:</strong> Enquanto outros sites mostram milhares de produtos, nós selecionamos apenas os <strong>melhores 4</strong> para você, com score de qualidade de até 100/100.
                </div>
              </div>

              {/* Produtos Recomendados - Melhorada */}
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                marginBottom: '2rem',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                border: '2px solid #e0f2e9'
              }}>
                <h3 style={{
                  fontSize: '1.6rem',
                  color: '#1e293b',
                  marginBottom: '2rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ fontSize: '1.8rem' }}>🛍️</span>
                  {t('produtos')} Selecionados para Você
                </h3>
                
                {/* Produtos da API */}
                {analysisResults?.produtos && analysisResults.produtos.length > 0 && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '2rem'
                  }}>
                    {analysisResults.produtos.map((product: any, index: number) => (
                      <div key={index} style={{
                        border: '2px solid #e0f2e9',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        backgroundColor: '#f8fafc',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '1rem'
                        }}>
                          <span style={{
                            fontSize: '2rem',
                            marginRight: '1rem'
                          }}>
                            🛍️
                          </span>
                          <div>
                            <h4 style={{
                              fontSize: '1.1rem',
                              color: '#1e293b',
                              fontWeight: '700',
                              marginBottom: '0.5rem'
                            }}>
                              {product.name}
                            </h4>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '1rem'
                            }}>
                              <span style={{
                                color: '#059669',
                                fontWeight: '700',
                                fontSize: '1rem'
                              }}>
                                {product.price}
                              </span>
                              <span style={{
                                color: '#f59e0b',
                                fontWeight: '600'
                              }}>
                                ⭐ {product.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p style={{
                          fontSize: '0.95rem',
                          color: '#64748b',
                          lineHeight: '1.6',
                          marginBottom: '1rem'
                        }}>
                          {product.description}
                        </p>
                        
                        <p style={{
                          fontSize: '0.9rem',
                          color: '#059669',
                          marginBottom: '1.5rem',
                          fontStyle: 'italic',
                          backgroundColor: '#f0fdf4',
                          padding: '0.8rem',
                          borderRadius: '12px',
                          border: '2px solid #bbf7d0'
                        }}>
                          💡 {product.whyPerfect}
                        </p>
                        
                        <button onClick={() => searchOnAmazon(product.searchTerms)} style={{
                          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                          color: 'white',
                          padding: '0.8rem 1.5rem',
                          border: 'none',
                          borderRadius: '25px',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          width: '100%',
                          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                        }}>
                          🔍 Buscar na Amazon
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Produtos Recomendados Adicionais */}
                <div style={{
                  backgroundColor: '#f8fafc',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  border: '2px solid #e0f2e9'
                }}>
                  <h4 style={{
                    fontSize: '1.3rem',
                    color: '#1e293b',
                    marginBottom: '1.5rem',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>
                    🎯 Produtos Recomendados Adicionais
                  </h4>
                  
                  {(() => {
                    const answers = searchParams.get('answers')
                    let additionalProducts: Array<{
                      icon: string;
                      name: string;
                      description: string;
                      searchTerm: string;
                    }> = []
                    
                    if (answers) {
                      try {
                        const parsedAnswers = JSON.parse(decodeURIComponent(answers))
                        const answersStr = JSON.stringify(parsedAnswers).toLowerCase()
                        
                        // Produtos baseados nas respostas específicas
                        if (answersStr.includes('energia') || answersStr.includes('cansado') || answersStr.includes('tired')) {
                          additionalProducts.push({
                            icon: '⚡',
                            name: 'Complexo B Energético',
                            description: 'Aumenta energia natural, melhora foco e reduz fadiga, perfeito para o dia a dia.',
                            searchTerm: 'b+complex+vitamin+now+foods'
                          })
                        }
                        
                        if (answersStr.includes('sono') || answersStr.includes('insônia') || answersStr.includes('sleep')) {
                          additionalProducts.push({
                            icon: '🌙',
                            name: 'Magnésio para Sono',
                            description: 'Melhora a qualidade do sono e relaxamento muscular, ideal para quem tem dificuldade para dormir.',
                            searchTerm: 'magnesium+glycinate+now+foods'
                          })
                        }
                        
                        if (answersStr.includes('peso') || answersStr.includes('emagrecer') || answersStr.includes('weight')) {
                          additionalProducts.push({
                            icon: '🎯',
                            name: 'Chá Verde Termogênico',
                            description: 'Acelera o metabolismo e auxilia na queima de gordura de forma natural.',
                            searchTerm: 'green+tea+extract+now+foods'
                          })
                        }
                        
                        if (answersStr.includes('imunidade') || answersStr.includes('doente') || answersStr.includes('immune')) {
                          additionalProducts.push({
                            icon: '🛡️',
                            name: 'Vitamina C + Zinco',
                            description: 'Fortalecimento do sistema imunológico e proteção contra doenças.',
                            searchTerm: 'vitamin+c+zinc+now+foods'
                          })
                        }
                        
                        // Produtos padrão se não houver matches específicos
                        if (additionalProducts.length === 0) {
                          additionalProducts = [
                            {
                              icon: '💊',
                              name: 'Vitamina D3 2000 IU',
                              description: 'Essencial para imunidade e energia, especialmente importante no inverno americano.',
                              searchTerm: 'vitamin+d3+2000+iu+now+foods'
                            },
                            {
                              icon: '🐟',
                              name: 'Ômega 3 Premium',
                              description: 'Suporte para coração, cérebro e inflamação, essencial para saúde geral.',
                              searchTerm: 'omega+3+fish+oil+now+foods'
                            }
                          ]
                        }
                      } catch (e) {
                        console.error('Erro ao analisar respostas para produtos adicionais:', e)
                      }
                    }
                    
                    return (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1rem'
                      }}>
                        {additionalProducts.map((product, index) => (
                          <div key={index} style={{
                            border: '2px solid #bbf7d0',
                            borderRadius: '12px',
                            padding: '1.2rem',
                            backgroundColor: 'white',
                            transition: 'all 0.3s ease'
                          }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              marginBottom: '0.8rem'
                            }}>
                              <span style={{ fontSize: '1.5rem', marginRight: '0.8rem' }}>{product.icon}</span>
                              <h5 style={{
                                fontSize: '1rem',
                                color: '#1e293b',
                                fontWeight: '600',
                                margin: 0
                              }}>
                                {product.name}
                              </h5>
                            </div>
                            <p style={{
                              fontSize: '0.85rem',
                              color: '#64748b',
                              lineHeight: '1.4',
                              marginBottom: '0.8rem'
                            }}>
                              {product.description}
                            </p>
                            <a href={`https://www.amazon.com/s?k=${product.searchTerm}&tag=portalsolutio-20`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                              <button style={{
                                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                                color: 'white',
                                padding: '0.6rem 1rem',
                                border: 'none',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                width: '100%'
                              }}>
                                🛒 Ver na Amazon
                              </button>
                            </a>
                          </div>
                        ))}
                      </div>
                    )
                  })()}
                </div>
              </div>

              {/* Timeline e Próximos Passos */}
              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '1.4rem',
                  color: '#1e293b',
                  marginBottom: '1rem',
                  fontWeight: 'bold'
                }}>
                  🚀 Próximos Passos
                </h3>
                
                {analysisResults?.timeline && (
                  <div style={{
                    fontSize: '1rem',
                    color: '#374151',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem',
                    backgroundColor: '#f8fafc',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #e0f2e9'
                  }}>
                    {analysisResults.timeline}
                  </div>
                )}

                {analysisResults?.proximo_passo && (
                  <div style={{
                    fontSize: '1.1rem',
                    color: '#059669',
                    fontStyle: 'italic',
                    marginBottom: '1.5rem',
                    backgroundColor: '#f0fdf4',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '3px solid #bbf7d0',
                    textAlign: 'center',
                    fontWeight: '500'
                  }}>
                    💝 <strong style={{ fontSize: '1.2rem' }}>{analysisResults.proximo_passo}</strong>
                  </div>
                )}

                {/* Próximo Passo - Ofertas de Coaching */}
                <div style={{
                  backgroundColor: '#f0fdf4',
                  padding: '2rem',
                  borderRadius: '16px',
                  border: '3px solid #bbf7d0',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  <h4 style={{
                    fontSize: '1.4rem',
                    color: '#059669',
                    marginBottom: '1.5rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{ fontSize: '1.6rem' }}>🎯</span>
                    Próximo Passo: Acompanhamento Personalizado
                  </h4>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '2rem'
                  }}>
                    {/* Opção 1: Coach Brasileira */}
                    <div style={{
                      backgroundColor: 'white',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: '2px solid #bbf7d0',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        fontSize: '2rem',
                        marginBottom: '1rem'
                      }}>👩‍⚕️</div>
                      <h5 style={{
                        fontSize: '1.2rem',
                        color: '#1e293b',
                        marginBottom: '0.5rem',
                        fontWeight: 'bold'
                      }}>
                        Coach Brasileira de Bem-estar
                      </h5>
                      <p style={{
                        fontSize: '0.9rem',
                        color: '#64748b',
                        marginBottom: '1rem',
                        lineHeight: '1.5'
                      }}>
                        Avaliação personalizada de 30 minutos por vídeo com coach brasileira especializada em qualidade de vida
                      </p>
                      <div style={{
                        backgroundColor: '#f0fdf4',
                        padding: '0.8rem',
                        borderRadius: '8px',
                        marginBottom: '1rem',
                        fontSize: '0.9rem',
                        color: '#059669'
                      }}>
                        <strong>De $37 por apenas $10</strong><br/>
                        <span style={{ fontSize: '0.8rem' }}>Oferta exclusiva por 24h</span>
                      </div>
                      <button onClick={() => openWhatsApp('Olá! Quero agendar minha avaliação personalizada de 30 minutos com a coach brasileira por $10.')} style={{
                        width: '100%',
                        padding: '0.8rem',
                        background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}>
                        💬 Agendar com Coach
                      </button>
                    </div>
                    
                    {/* Opção 2: Plano Completo IA */}
                    <div style={{
                      backgroundColor: 'white',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: '2px solid #3b82f6',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        fontSize: '2rem',
                        marginBottom: '1rem'
                      }}>🤖</div>
                      <h5 style={{
                        fontSize: '1.2rem',
                        color: '#1e293b',
                        marginBottom: '0.5rem',
                        fontWeight: 'bold'
                      }}>
                        Plano Completo por IA
                      </h5>
                      <p style={{
                        fontSize: '0.9rem',
                        color: '#64748b',
                        marginBottom: '1rem',
                        lineHeight: '1.5'
                      }}>
                        Plano detalhado de 30 dias com dicas de alimentação baseadas em ciência e cronograma personalizado
                      </p>
                      <div style={{
                        backgroundColor: '#eff6ff',
                        padding: '0.8rem',
                        borderRadius: '8px',
                        marginBottom: '1rem',
                        fontSize: '0.9rem',
                        color: '#1d4ed8'
                      }}>
                        <strong>De $37 por apenas $10</strong><br/>
                        <span style={{ fontSize: '0.8rem' }}>Oferta exclusiva por 24h</span>
                      </div>
                      <button onClick={() => openWhatsApp('Olá! Quero receber meu plano completo de 30 dias personalizado por inteligência artificial por $10.')} style={{
                        width: '100%',
                        padding: '0.8rem',
                        background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}>
                        📋 Receber Plano IA
                      </button>
                    </div>
                  </div>
                  
                  {/* Oferta Gratuita */}
                  <div style={{
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid #f59e0b',
                    marginBottom: '1rem'
                  }}>
                    <h5 style={{
                      fontSize: '1.1rem',
                      color: '#92400e',
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{ fontSize: '1.3rem' }}>🎁</span>
                      Bônus Gratuito
                    </h5>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}>
                      <strong>Guia "Jejum Intermitente para Brasileiros nos EUA"</strong>
                    </p>
                    <p style={{
                      fontSize: '0.8rem',
                      color: '#64748b'
                    }}>
                      Protocolos específicos, receitas e cronograma de 30 dias
                    </p>
                  </div>
                  
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#64748b',
                    fontStyle: 'italic'
                  }}>
                    💡 <strong>Escolha sua opção:</strong> Acompanhamento humano personalizado ou plano detalhado por IA
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.8rem',
                  alignItems: 'center'
                }}>
                  <button onClick={() => openWhatsApp('Olá! Gostaria de falar sobre minha avaliação personalizada do MeuPortalFit.')} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.8rem 1.5rem',
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}>
                    💬 {t('whatsappButton')} via WhatsApp
                  </button>

                  <button onClick={shareResults} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.8rem 1.5rem',
                    background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}>
                    🇧🇷 Ajude Outros Brasileiros
                  </button>

                  <button onClick={printResults} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.8rem 1.5rem',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}>
                    🖨️ Salvar/Imprimir
                  </button>

                  <a href="/" style={{ textDecoration: 'none' }}>
                    <button style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.8rem 1.5rem',
                      background: 'transparent',
                      color: '#6b7280',
                      border: '1px solid #e5e7eb',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}>
                      🏠 Voltar ao Início
                    </button>
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#1f2937', color: 'white', padding: '1rem 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
          <p style={{ color: '#9ca3af', fontSize: '0.8rem' }}>
            Avaliação personalizada para brasileiros nos EUA
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media print {
          header, footer, button {
            display: none !important;
          }
          
          main {
            background: white !important;
          }
          
          section {
            padding: 0 !important;
            margin: 0 !important;
          }
        }
      `}</style>
    </main>
  )
}

export default function ResultadosPage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #f0f9ff 100%)'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '2rem'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #22c55e',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{
            color: '#6b7280',
            fontSize: '1.1rem'
          }}>
            Carregando...
          </p>
        </div>
      </div>
    }>
      <ResultadosContent />
    </Suspense>
  )
}
