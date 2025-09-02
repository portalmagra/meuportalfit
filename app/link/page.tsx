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
                  
                  // Abrir Amazon diretamente em nova aba
                  console.log('🔗 Tentando abrir:', cleanUrl)
                  const link = document.createElement('a')
                  link.href = cleanUrl
                  link.target = '_blank'
                  link.rel = 'noopener noreferrer'
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                  console.log('✅ Link clicado')
                  
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

                            

                            {/* Form Section */}
                    <section style={{
                      padding: '1rem 0',
                      background: 'white'
                    }}>
                      <div style={{
                        maxWidth: '600px',
                        margin: '0 auto',
                        padding: '0 1rem'
                      }}>
                        <div style={{
                          backgroundColor: '#f8fafc',
                          padding: '1rem',
                          borderRadius: '12px',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}>
                                                    <div style={{ marginBottom: '1rem' }}>
                            <h2 style={{
                              fontSize: '1.2rem',
                              fontWeight: 'bold',
                              color: '#1f2937',
                              marginBottom: '0.5rem',
                              textAlign: 'center'
                            }}>
                              Cole seu link da Amazon aqui ⬇️
                            </h2>
                            
                            <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                              <input
                                type="url"
                                value={amazonUrl}
                                onChange={(e) => setAmazonUrl(e.target.value)}
                                placeholder="https://www.amazon.com/dp/B07..."
                                style={{
                                  width: '100%',
                                  padding: '0.75rem',
                                  border: '1px solid #d1d5db',
                                  borderRadius: '8px',
                                  fontSize: '1rem',
                                  outline: 'none',
                                  cursor: 'text'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                              />
                              <button
                                onClick={extractAndCleanAmazonUrl}
                                disabled={loading}
                                style={{
                                  width: '100%',
                                  padding: '0.75rem',
                                  backgroundColor: loading ? '#9ca3af' : '#f59e0b',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '8px',
                                  cursor: loading ? 'not-allowed' : 'pointer',
                                  fontSize: '1rem',
                                  fontWeight: 'bold',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '0.5rem'
                                }}
                              >
                                {loading ? '⏳' : '🛒'}
                                {loading ? 'Processando...' : 'Ir para Amazon'}
                              </button>
                            </div>
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
                    
                    <button
                      onClick={() => {
                        const link = document.createElement('a')
                        link.href = processedUrl
                        link.target = '_blank'
                        link.rel = 'noopener noreferrer'
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                      }}
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
                  </div>
                </div>
              )}

                                        {/* Instructions */}
                          <div style={{
                            backgroundColor: '#eff6ff',
                            border: '1px solid #bfdbfe',
                            padding: '1rem',
                            borderRadius: '8px',
                            marginTop: '1rem'
                          }}>
                            <h3 style={{
                              color: '#1e40af',
                              marginBottom: '0.5rem',
                              fontSize: '1rem',
                              fontWeight: 'bold'
                            }}>
                              Como Usar:
                            </h3>
                            <ol style={{
                              color: '#374151',
                              lineHeight: '1.4',
                              paddingLeft: '1rem',
                              fontSize: '0.9rem'
                            }}>
                              <li>Cole seu link da Amazon</li>
                              <li>Clique em "Extrair e Limpar"</li>
                              <li>Receba um link limpo</li>
                              <li>Use o link e ajude o projeto!</li>
                            </ol>
                          </div>
            </div>
          </div>
        </section>

                            {/* Footer Info */}
                    <section style={{
                      padding: '1rem 0',
                      background: '#f8fafc',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        maxWidth: '800px',
                        margin: '0 auto',
                        padding: '0 1rem'
                      }}>
                        <p style={{
                          color: '#6b7280',
                          lineHeight: '1.4',
                          fontSize: '0.9rem'
                        }}>
                          <strong>Nenhum custo adicional para você!</strong>
                          <br />
                          Projeto MeuPortalFit
                        </p>
                      </div>
                    </section>
      </main>
    </>
  )
}
