'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../../components/Header'

export default function IntestinoPage() {
  const [language, setLanguage] = useState<'pt' | 'es' | 'en'>('pt')
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Carregar produtos da categoria "intestino" do localStorage
    const loadProducts = () => {
      try {
        const storedProducts = localStorage.getItem('adminProducts')
        if (storedProducts) {
          const allProducts = JSON.parse(storedProducts)
          const intestinoProducts = allProducts.filter((product: any) => 
            product.categoryId === 'intestino'
          )
          setProducts(intestinoProducts)
        }
      } catch (error) {
        console.error('Erro ao carregar produtos:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return (
    <>
      <main style={{ padding: '0', background: 'white' }}>
        {/* Header Unificado */}
        <Header language={language} onLanguageChange={setLanguage} />

        {/* Hero Section Mínimo Proporcional */}
        <section style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #f0f9ff 100%)',
          padding: '0.15rem 0',
          textAlign: 'center',
          marginBottom: '0.2rem',
          minHeight: 'auto'
        }} className="hero-section">
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1rem'
          }}>
            <h1 style={{
              fontSize: 'clamp(1.4rem, 3.8vw, 2.2rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '0.4rem',
              color: '#1f2937'
            }} className="hero-title">
              🫁 Produtos para Saúde Intestinal
            </h1>

            <p style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
              marginBottom: '0.4rem',
              color: '#6b7280',
              maxWidth: '500px',
              margin: '0 auto 0.4rem',
              lineHeight: 1.2
            }}>
              Produtos para saúde intestinal e digestão. Qualidade garantida, preço competitivo.
            </p>

            {/* Botões de Ação */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '0.5rem'
            }}>
              <Link href="/suporte" style={{ textDecoration: 'none' }}>
                <button style={{
                  padding: '0.6rem 1.2rem',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                }}>
                  <span>📞</span>
                  <span>Avaliação Personalizada</span>
                </button>
              </Link>

              <Link href="/produtos" style={{ textDecoration: 'none' }}>
                <button style={{
                  padding: '0.6rem 1.2rem',
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                }}>
                  <span>🔍</span>
                  <span>Buscar Produtos</span>
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Produtos Section */}
        <section style={{
          padding: '2rem 0',
          background: 'white'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1rem'
          }}>
            {loading ? (
              <div style={{
                textAlign: 'center',
                padding: '3rem 0'
              }}>
                <div style={{
                  fontSize: '2rem',
                  marginBottom: '1rem'
                }}>
                  ⏳
                </div>
                <p style={{
                  color: '#6b7280',
                  fontSize: '1.1rem'
                }}>
                  Carregando produtos...
                </p>
              </div>
            ) : products.length > 0 ? (
              <>
                <h2 style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                  fontWeight: 800,
                  textAlign: 'center',
                  marginBottom: '2rem',
                  color: '#1f2937'
                }}>
                  Produtos Selecionados para Saúde Intestinal
                </h2>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '2rem'
                }}>
                  {products.map((product, index) => (
                    <div key={index} style={{
                      background: 'white',
                      borderRadius: '16px',
                      padding: '1.5rem',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                      border: '2px solid #f3f4f6',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      {product.imageUrl && (
                        <div style={{
                          textAlign: 'center',
                          marginBottom: '1rem'
                        }}>
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            style={{
                              maxWidth: '200px',
                              maxHeight: '200px',
                              borderRadius: '8px',
                              objectFit: 'cover'
                            }}
                          />
                        </div>
                      )}

                      <h3 style={{
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: '#1f2937',
                        marginBottom: '0.5rem'
                      }}>
                        {product.name}
                      </h3>

                      {product.description && (
                        <p style={{
                          color: '#6b7280',
                          fontSize: '0.9rem',
                          lineHeight: 1.4,
                          marginBottom: '1rem'
                        }}>
                          {product.description}
                        </p>
                      )}

                      {product.price && (
                        <div style={{
                          fontSize: '1.3rem',
                          fontWeight: 700,
                          color: '#059669',
                          marginBottom: '1rem'
                        }}>
                          {product.price}
                        </div>
                      )}

                      <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        marginTop: 'auto'
                      }}>
                        <Link 
                          href={product.productUrl || `/produtos/intestino/${product.name.toLowerCase().replace(/[áàâãä]/g, 'a').replace(/[éèêë]/g, 'e').replace(/[íìîï]/g, 'i').replace(/[óòôõö]/g, 'o').replace(/[úùûü]/g, 'u').replace(/[ç]/g, 'c').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()}`} 
                          style={{ textDecoration: 'none', flex: 1 }}
                        >
                          <button style={{
                            width: '100%',
                            padding: '0.8rem',
                            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.4rem'
                          }}>
                            <span>📄</span>
                            <span>Ver Detalhes</span>
                          </button>
                        </Link>
                        
                        <a
                          href={product.amazonUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'none', flex: 1 }}
                        >
                          <button style={{
                            width: '100%',
                            padding: '0.8rem',
                            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.4rem'
                          }}>
                            <span>🛒</span>
                            <span>Amazon</span>
                          </button>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '3rem 0'
              }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem'
                }}>
                  🫁
                </div>
                <h2 style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                  fontWeight: 700,
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}>
                  Nenhum produto adicionado ainda
                </h2>
                <p style={{
                  color: '#6b7280',
                  fontSize: '1.1rem',
                  marginBottom: '2rem',
                  maxWidth: '500px',
                  margin: '0 auto 2rem'
                }}>
                  Faça uma avaliação personalizada para receber recomendações específicas para saúde intestinal.
                </p>

                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  <Link href="/suporte" style={{ textDecoration: 'none' }}>
                    <button style={{
                      padding: '0.8rem 1.5rem',
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '25px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                    }}>
                      <span>📞</span>
                      <span>Fazer Avaliação Personalizada</span>
                    </button>
                  </Link>

                  <Link href="/produtos" style={{ textDecoration: 'none' }}>
                    <button style={{
                      padding: '0.8rem 1.5rem',
                      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '25px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                    }}>
                      <span>🔍</span>
                      <span>Buscar Produtos</span>
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
