'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../../../components/Header'

interface Product {
  id: string
  name: string
  description: string
  categoryId: string
  amazonUrl: string
  currentPrice: string
  originalPrice: string
  rating: number
  reviewCount: number
  imageUrl: string
  benefits: string[]
  features: string[]
}

interface PageProps {
  params: {
    category: string
    product: string
  }
}

export default function ProductPage({ params }: PageProps) {
  const [language, setLanguage] = useState<'pt' | 'es' | 'en'>('pt')
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const loadProduct = () => {
      try {
        const storedProducts = localStorage.getItem('adminProducts')
        if (storedProducts) {
          const allProducts = JSON.parse(storedProducts)
          
          // Encontrar o produto pela categoria e slug
          const foundProduct = allProducts.find((p: Product) => {
            const productSlug = p.name.toLowerCase()
              .replace(/[áàâãä]/g, 'a')
              .replace(/[éèêë]/g, 'e')
              .replace(/[íìîï]/g, 'i')
              .replace(/[óòôõö]/g, 'o')
              .replace(/[úùûü]/g, 'u')
              .replace(/[ç]/g, 'c')
              .replace(/[^a-z0-9\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-')
              .trim()
            
            return p.categoryId === params.category && productSlug === params.product
          })

          if (foundProduct) {
            setProduct(foundProduct)
          } else {
            setNotFound(true)
          }
        } else {
          setNotFound(true)
        }
      } catch (error) {
        console.error('Erro ao carregar produto:', error)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [params.category, params.product])

  if (loading) {
    return (
      <>
        <Header language={language} onLanguageChange={setLanguage} />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          background: 'white'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
            <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>Carregando produto...</p>
          </div>
        </div>
      </>
    )
  }

  if (notFound || !product) {
    return (
      <>
        <Header language={language} onLanguageChange={setLanguage} />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          background: 'white'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1f2937' }}>
              Produto não encontrado
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              O produto que você está procurando não foi encontrado.
            </p>
            <Link href="/produtos" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '0.8rem 1.5rem',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 600
              }}>
                Voltar aos Produtos
              </button>
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <main style={{ padding: '0', background: 'white' }}>
        {/* Header Unificado */}
        <Header language={language} onLanguageChange={setLanguage} />

        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #f0f9ff 100%)',
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
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '1rem',
              color: '#1f2937'
            }}>
              {product.name}
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto 1.5rem',
              lineHeight: 1.4
            }}>
              {product.description}
            </p>
          </div>
        </section>

        {/* Produto Section */}
        <section style={{
          padding: '3rem 0',
          background: 'white'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1rem'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3rem',
              alignItems: 'start'
            }}>
              {/* Imagem do Produto */}
              <div style={{
                textAlign: 'center'
              }}>
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '400px',
                      borderRadius: '16px',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '300px',
                    height: '300px',
                    background: '#f3f4f6',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem',
                    color: '#9ca3af',
                    margin: '0 auto'
                  }}>
                    🛍️
                  </div>
                )}
              </div>

              {/* Informações do Produto */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                {/* Preços */}
                <div>
                  <h2 style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: '#059669',
                    marginBottom: '0.5rem'
                  }}>
                    {product.currentPrice}
                  </h2>
                  {product.originalPrice && product.originalPrice !== product.currentPrice && (
                    <p style={{
                      fontSize: '1.2rem',
                      color: '#6b7280',
                      textDecoration: 'line-through'
                    }}>
                      {product.originalPrice}
                    </p>
                  )}
                </div>

                {/* Avaliação */}
                {product.rating > 0 && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      gap: '0.2rem'
                    }}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} style={{
                          fontSize: '1.2rem',
                          color: i < Math.floor(product.rating) ? '#fbbf24' : '#e5e7eb'
                        }}>
                          ⭐
                        </span>
                      ))}
                    </div>
                    <span style={{
                      color: '#6b7280',
                      fontSize: '0.9rem'
                    }}>
                      {product.rating.toFixed(1)} ({product.reviewCount} avaliações)
                    </span>
                  </div>
                )}

                {/* Benefícios */}
                {product.benefits && product.benefits.length > 0 && (
                  <div>
                    <h3 style={{
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      color: '#1f2937',
                      marginBottom: '0.8rem'
                    }}>
                      Benefícios:
                    </h3>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0
                    }}>
                      {product.benefits.map((benefit, index) => (
                        <li key={index} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBottom: '0.5rem',
                          color: '#374151'
                        }}>
                          <span style={{ color: '#22c55e' }}>✅</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Características */}
                {product.features && product.features.length > 0 && (
                  <div>
                    <h3 style={{
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      color: '#1f2937',
                      marginBottom: '0.8rem'
                    }}>
                      Características:
                    </h3>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0
                    }}>
                      {product.features.map((feature, index) => (
                        <li key={index} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBottom: '0.5rem',
                          color: '#374151'
                        }}>
                          <span style={{ color: '#3b82f6' }}>🔹</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Botão Amazon */}
                <div style={{ marginTop: '1rem' }}>
                  <a
                    href={product.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    <button style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
                    }}>
                      <span>🛒</span>
                      <span>Ver na Amazon</span>
                    </button>
                  </a>
                </div>

                {/* Botões de Navegação */}
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  marginTop: '1rem'
                }}>
                  <Link href={`/produtos/${params.category}`} style={{ textDecoration: 'none', flex: 1 }}>
                    <button style={{
                      width: '100%',
                      padding: '0.8rem',
                      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: 600
                    }}>
                      ← Voltar à Categoria
                    </button>
                  </Link>
                  
                  <Link href="/produtos" style={{ textDecoration: 'none', flex: 1 }}>
                    <button style={{
                      width: '100%',
                      padding: '0.8rem',
                      background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: 600
                    }}>
                      Ver Todos os Produtos
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
