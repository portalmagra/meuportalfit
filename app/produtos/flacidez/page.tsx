'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../../components/Header'

export default function FlacidezPage() {
  const [language, setLanguage] = useState<'pt' | 'es' | 'en'>('pt')
  const [adminProducts, setAdminProducts] = useState<any[]>([])

  useEffect(() => {
    const savedProducts = localStorage.getItem('globalProducts')
    const savedCategories = localStorage.getItem('globalCategories')
    
    if (savedProducts && savedCategories) {
      const products = JSON.parse(savedProducts)
      const categories = JSON.parse(savedCategories)
      const categoryData = categories.find((cat: any) => cat.name === 'Flacidez')
      
      if (categoryData) {
        const categoryProducts = products.filter((product: any) => 
          product.categoryId === categoryData.id
        )
        setAdminProducts(categoryProducts)
      }
    }
  }, [])

  return (
    <>
      <main style={{ padding: '0', background: 'white' }}>
        <Header language={language} onLanguageChange={setLanguage} />

        <section style={{
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)',
          padding: '2rem 0',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1rem'
          }}>
            <h1 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: '900',
              lineHeight: '1.1',
              marginBottom: '1rem',
              color: '#1f2937'
            }}>
              💪 Produtos para Flacidez
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.5'
            }}>
              Produtos específicos para flacidez. 
              Suplementos e soluções naturais para suas necessidades.
            </p>
          </div>
        </section>

        {adminProducts.length > 0 ? (
          <section style={{
            padding: '2rem 0',
            background: 'white'
          }}>
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 1rem'
            }}>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
                fontWeight: '800',
                textAlign: 'center',
                marginBottom: '2rem',
                color: '#1f2937'
              }}>
                🛍️ Produtos Recomendados
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem'
              }}>
                {adminProducts.map(product => (
                  <div key={product.id} style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                    border: '2px solid #f3f4f6',
                    position: 'relative'
                  }}>
                    {product.savings > 0 && (
                      <div style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: '#dc2626',
                        color: 'white',
                        padding: '0.3rem 0.6rem',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}>
                        -{product.savings}%
                      </div>
                    )}

                    <div style={{
                      height: '200px',
                      background: '#f3f4f6',
                      borderRadius: '12px',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '3rem',
                      color: '#9ca3af'
                    }}>
                      💪
                    </div>

                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      color: '#1f2937',
                      marginBottom: '0.5rem',
                      lineHeight: '1.3'
                    }}>
                      {product.name}
                    </h3>

                    <p style={{
                      color: '#6b7280',
                      fontSize: '0.9rem',
                      lineHeight: '1.4',
                      marginBottom: '1rem'
                    }}>
                      {product.description}
                    </p>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '1rem'
                    }}>
                      <span style={{
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        color: '#059669'
                      }}>
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span style={{
                          fontSize: '1rem',
                          color: '#9ca3af',
                          textDecoration: 'line-through'
                        }}>
                          {product.originalPrice}
                        </span>
                      )}
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '1rem'
                    }}>
                      <span style={{ color: '#f59e0b' }}>⭐</span>
                      <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                        {product.rating} ({product.reviewCount.toLocaleString()} avaliações)
                      </span>
                      {product.prime && (
                        <span style={{
                          fontSize: '0.7rem',
                          color: '#059669',
                          background: '#f0fdf4',
                          padding: '0.1rem 0.4rem',
                          borderRadius: '8px',
                          fontWeight: '600'
                        }}>
                          PRIME
                        </span>
                      )}
                    </div>

                    <a
                      href={product.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      <button style={{
                        width: '100%',
                        padding: '0.8rem',
                        background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem'
                      }}>
                        <span>🛒 Comprar na Amazon</span>
                      </button>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section style={{
            padding: '3rem 0',
            background: 'white',
            textAlign: 'center'
          }}>
            <div style={{
              maxWidth: '600px',
              margin: '0 auto',
              padding: '0 1rem'
            }}>
              <div style={{
                fontSize: '4rem',
                marginBottom: '1rem'
              }}>
                💪
              </div>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
                fontWeight: '700',
                marginBottom: '1rem',
                color: '#1f2937'
              }}>
                Nenhum produto adicionado ainda
              </h2>
              <p style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                color: '#6b7280',
                marginBottom: '2rem',
                lineHeight: '1.5'
              }}>
                Os produtos para flacidez serão adicionados através da área administrativa. 
                Em breve você verá produtos específicos para flacidez.
              </p>
              <Link href="/admin" style={{ textDecoration: 'none' }}>
                <button style={{
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}>
                  🛠️ Adicionar Produtos
                </button>
              </Link>
            </div>
          </section>
        )}

        <section style={{
          padding: '3rem 0',
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1rem'
          }}>
            <h3 style={{
              fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#1f2937'
            }}>
              Precisa de ajuda para escolher?
            </h3>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
              color: '#6b7280',
              marginBottom: '2rem',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>
              Nossa IA analisa suas necessidades e recomenda os produtos ideais para flacidez.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link href="/analise" style={{ textDecoration: 'none' }}>
                <button style={{
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}>
                  🧠 Análise IA Gratuita
                </button>
              </Link>
              <Link href="/produtos" style={{ textDecoration: 'none' }}>
                <button style={{
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}>
                  📂 Ver Todas as Categorias
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}