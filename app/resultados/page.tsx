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
        setLanguage(lang)
        
        if (answers) {
          const parsedAnswers = JSON.parse(decodeURIComponent(answers))
          
          // Chamar API de análise com idioma
          const response = await fetch('/api/ai-analysis', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              answers: parsedAnswers,
              comments: comments || '',
              language: lang
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

  // Função para compartilhar
  const shareResults = () => {
    const url = 'https://meuportalfit.com/analise'
    const text = `${t('shareMessage')} ${url}`
    
    if (navigator.share) {
      navigator.share({
        title: t('shareTitle'),
        text: text,
        url: url
      })
    } else {
      // Fallback para copiar link
      navigator.clipboard.writeText(text).then(() => {
        alert(t('copiedMessage'))
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
              <div class="section-title">🤖 {t('analise')}</div>
              <div class="analise">
                ${analysisResults.analise || analysisResults.analysis}
              </div>
            </div>
            ` : ''}
            
            ${analysisResults?.habitos && analysisResults.habitos.length > 0 ? `
            <div class="section">
              <div class="section-title">✅ {t('habitos')} para Você</div>
              ${analysisResults.habitos.map((habito: string) => `
                <div class="habito">
                  <div class="check">✓</div>
                  <div class="habito-text">${habito}</div>
                </div>
              `).join('')}
            </div>
            ` : ''}
            
            ${analysisResults?.produtos && analysisResults.produtos.length > 0 ? `
            <div class="section">
              <div class="section-title">🛍️ {t('produtos')}</div>
              ${analysisResults.produtos.map((produto: any) => `
                <div class="produto">
                  <div class="produto-nome">${produto.name}</div>
                  <div class="produto-desc">${produto.description}</div>
                  <div class="produto-preco">${produto.price} ⭐ ${produto.rating}</div>
                </div>
              `).join('')}
            </div>
            ` : ''}
            
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

              {/* Análise Personalizada - Melhorada */}
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
                  {t('analise')} Detalhada
                </h3>
                
                {/* Análise Principal */}
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
                </div>

                {/* Contexto Cultural */}
                {analysisResults?.contexto_cultural && (
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
                    <strong style={{ color: '#92400e' }}>🌍 Contexto Cultural:</strong><br/>
                    {analysisResults.contexto_cultural}
                  </div>
                )}

                {/* Insights Adicionais */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1rem',
                  marginTop: '1.5rem'
                }}>
                  <div style={{
                    backgroundColor: '#f0fdf4',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid #bbf7d0'
                  }}>
                    <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>💡</div>
                    <strong style={{ color: '#059669' }}>Principais Insights:</strong>
                    <p style={{ fontSize: '0.9rem', color: '#374151', marginTop: '0.5rem' }}>
                      Baseado nas suas respostas, identificamos pontos-chave para otimizar seu bem-estar e alcançar seus objetivos de saúde.
                    </p>
                  </div>

                  <div style={{
                    backgroundColor: '#eff6ff',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid #93c5fd'
                  }}>
                    <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>🎯</div>
                    <strong style={{ color: '#1d4ed8' }}>Objetivos Identificados:</strong>
                    <p style={{ fontSize: '0.9rem', color: '#374151', marginTop: '0.5rem' }}>
                      Focamos em melhorar sua energia, qualidade do sono e equilíbrio geral para resultados duradouros.
                    </p>
                  </div>

                  <div style={{
                    backgroundColor: '#fef3c7',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid #f59e0b'
                  }}>
                    <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>⚡</div>
                    <strong style={{ color: '#92400e' }}>Potencial de Melhoria:</strong>
                    <p style={{ fontSize: '0.9rem', color: '#374151', marginTop: '0.5rem' }}>
                      Com as mudanças sugeridas, você pode ver melhorias significativas em 2-4 semanas.
                    </p>
                  </div>
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
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1rem'
                  }}>
                    {/* Vitamina D3 */}
                    <div style={{
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
                        <span style={{ fontSize: '1.5rem', marginRight: '0.8rem' }}>💊</span>
                        <h5 style={{
                          fontSize: '1rem',
                          color: '#1e293b',
                          fontWeight: '600',
                          margin: 0
                        }}>
                          Vitamina D3 2000 IU
                        </h5>
                      </div>
                      <p style={{
                        fontSize: '0.85rem',
                        color: '#64748b',
                        lineHeight: '1.4',
                        marginBottom: '0.8rem'
                      }}>
                        Essencial para imunidade e energia, especialmente importante no inverno americano.
                      </p>
                      <a href="https://www.amazon.com/s?k=vitamin+d3+2000+iu+now+foods&tag=portalsolutio-20" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
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

                    {/* Magnésio */}
                    <div style={{
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
                        <span style={{ fontSize: '1.5rem', marginRight: '0.8rem' }}>🌙</span>
                        <h5 style={{
                          fontSize: '1rem',
                          color: '#1e293b',
                          fontWeight: '600',
                          margin: 0
                        }}>
                          Magnésio para Sono
                        </h5>
                      </div>
                      <p style={{
                        fontSize: '0.85rem',
                        color: '#64748b',
                        lineHeight: '1.4',
                        marginBottom: '0.8rem'
                      }}>
                        Melhora a qualidade do sono e relaxamento muscular, ideal para quem tem dificuldade para dormir.
                      </p>
                      <a href="https://www.amazon.com/s?k=magnesium+glycinate+now+foods&tag=portalsolutio-20" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
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

                    {/* Complexo B */}
                    <div style={{
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
                        <span style={{ fontSize: '1.5rem', marginRight: '0.8rem' }}>⚡</span>
                        <h5 style={{
                          fontSize: '1rem',
                          color: '#1e293b',
                          fontWeight: '600',
                          margin: 0
                        }}>
                          Complexo B Energético
                        </h5>
                      </div>
                      <p style={{
                        fontSize: '0.85rem',
                        color: '#64748b',
                        lineHeight: '1.4',
                        marginBottom: '0.8rem'
                      }}>
                        Aumenta energia natural, melhora foco e reduz fadiga, perfeito para o dia a dia.
                      </p>
                      <a href="https://www.amazon.com/s?k=b+complex+vitamin+now+foods&tag=portalsolutio-20" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
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

                    {/* Ômega 3 */}
                    <div style={{
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
                        <span style={{ fontSize: '1.5rem', marginRight: '0.8rem' }}>🐟</span>
                        <h5 style={{
                          fontSize: '1rem',
                          color: '#1e293b',
                          fontWeight: '600',
                          margin: 0
                        }}>
                          Ômega 3 Premium
                        </h5>
                      </div>
                      <p style={{
                        fontSize: '0.85rem',
                        color: '#64748b',
                        lineHeight: '1.4',
                        marginBottom: '0.8rem'
                      }}>
                        Suporte para coração, cérebro e inflamação, essencial para saúde geral.
                      </p>
                      <a href="https://www.amazon.com/s?k=omega+3+fish+oil+now+foods&tag=portalsolutio-20" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
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
                  </div>
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
                    fontSize: '0.9rem',
                    color: '#059669',
                    fontStyle: 'italic',
                    marginBottom: '1.5rem',
                    backgroundColor: '#f0fdf4',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid #bbf7d0'
                  }}>
                    💝 {analysisResults.proximo_passo}
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.8rem',
                  alignItems: 'center'
                }}>
                  <button onClick={() => openWhatsApp('Olá! Acabei de fazer minha avaliação personalizada no MeuPortalFit e gostaria de agendar uma consulta personalizada por $10.')} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.8rem 1.5rem',
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}>
                    ✨ Faça Agendamento Personalizado
                  </button>

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
                    📤 Compartilhar
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
