'use client'

import { useState } from 'react'
import Header from '../components/Header'

export default function LinkExtractorPage() {
  const [language, setLanguage] = useState<'pt' | 'es' | 'en'>('pt')
  const [amazonUrl, setAmazonUrl] = useState('')
  const [processedUrl, setProcessedUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const extractAndCleanAmazonUrl = async () => {
    if (!amazonUrl.trim()) {
      setError('Por favor, cole um link da Amazon')
      return
    }

    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      // Extrair ASIN do link da Amazon
      const asinMatch = amazonUrl.match(/\/dp\/([A-Z0-9]{10})/)
      if (!asinMatch) {
        setError('Link da Amazon inválido. Use um link que contenha /dp/')
        return
      }

      const asin = asinMatch[1]
      
      // Criar link limpo com tag de comissão
      const cleanUrl = `https://www.amazon.com/dp/${asin}?tag=portalsolutio-20`
      
      setProcessedUrl(cleanUrl)
      setSuccess(true)
      
      // Copiar para clipboard automaticamente
      try {
        await navigator.clipboard.writeText(cleanUrl)
      } catch (err) {
        console.log('Não foi possível copiar automaticamente')
      }
      
    } catch (error) {
      setError('Erro ao processar o link. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(processedUrl)
      alert('✅ Link copiado para a área de transferência!')
    } catch (error) {
      alert('❌ Erro ao copiar. Copie manualmente.')
    }
  }

  return (
    <>
      <main style={{ padding: '0', background: 'white', minHeight: '100vh' }}>
        {/* Header Unificado */}
        <Header language={language} onLanguageChange={setLanguage} />

        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          padding: '3rem 0',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '1rem'
            }}>
              🔗 Extrator de Links Amazon
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Cole seu link da Amazon e receba um link limpo!
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section style={{
          padding: '3rem 0',
          background: 'white'
        }}>
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            <div style={{
              backgroundColor: '#f8fafc',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                📋 Cole o Link da Amazon
              </h2>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: '#374151'
                }}>
                  Link da Amazon: *
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="url"
                    value={amazonUrl}
                    onChange={(e) => setAmazonUrl(e.target.value)}
                    placeholder="https://www.amazon.com/dp/B07..."
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                  <button
                    onClick={extractAndCleanAmazonUrl}
                    disabled={loading}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: loading ? '#9ca3af' : '#f59e0b',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    {loading ? '⏳' : '🔍'}
                    {loading ? 'Processando...' : 'Extrair e Limpar'}
                  </button>
                </div>
                <small style={{
                  color: '#6b7280',
                  fontSize: '0.875rem',
                  marginTop: '0.5rem',
                  display: 'block'
                }}>
                  Cole seu link da Amazon e clique em "Extrair e Limpar" para receber um link limpo
                </small>
              </div>

              {error && (
                <div style={{
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#dc2626',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}>
                  ❌ {error}
                </div>
              )}

              {success && processedUrl && (
                <div style={{
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}>
                  <h3 style={{
                    color: '#166534',
                    marginBottom: '1rem',
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                  }}>
                    ✅ Link Processado com Sucesso!
                  </h3>
                  
                                     <div style={{
                     backgroundColor: 'white',
                     border: '1px solid #d1d5db',
                     borderRadius: '6px',
                     padding: '1rem',
                     marginBottom: '1rem',
                     wordBreak: 'break-all'
                   }}>
                     <strong style={{ color: '#374151' }}>Link Limpo:</strong>
                     <br />
                     <span style={{ color: '#059669', fontSize: '0.9rem' }}>
                       {processedUrl}
                     </span>
                   </div>

                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                  }}>
                    <button
                      onClick={copyToClipboard}
                      style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      📋 Copiar Link
                    </button>
                    
                    <a
                      href={processedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      <button
                        style={{
                          padding: '0.75rem 1.5rem',
                          backgroundColor: '#22c55e',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        🛒 Ir para Amazon
                      </button>
                    </a>
                  </div>
                </div>
              )}

              {/* Instructions */}
              <div style={{
                backgroundColor: '#eff6ff',
                border: '1px solid #bfdbfe',
                padding: '1.5rem',
                borderRadius: '8px',
                marginTop: '2rem'
              }}>
                <h3 style={{
                  color: '#1e40af',
                  marginBottom: '1rem',
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}>
                  📋 Como Usar:
                </h3>
                <ol style={{
                  color: '#374151',
                  lineHeight: '1.6',
                  paddingLeft: '1.5rem'
                }}>
                  <li>Cole seu link da Amazon no campo acima</li>
                  <li>Clique em "Extrair e Limpar"</li>
                  <li>Receba um link limpo</li>
                  <li>Use o link para suas compras e ajude o projeto!</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Info */}
        <section style={{
          padding: '2rem 0',
          background: '#f8fafc',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            <h3 style={{
              color: '#1f2937',
              marginBottom: '1rem',
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }}>
              🤝 Ajude o MeuPortalFit
            </h3>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.6',
              fontSize: '1rem'
            }}>
              Usando nossos links da Amazon, você ajuda a manter o projeto ativo!
              <br />
              <strong>Nenhum custo adicional para você!</strong>
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
