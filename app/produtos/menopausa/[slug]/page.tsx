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
  productUrl?: string
}

export default function MenopausaProductPage({ params }: { params: { slug: string } }) {
  const [language, setLanguage] = useState<'pt' | 'es' | 'en'>('pt')
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Carregar produtos do localStorage
    const loadProduct = () => {
      try {
        let storedProducts = localStorage.getItem('adminProducts')
        if (!storedProducts) {
          storedProducts = localStorage.getItem('globalProducts')
        }
        
        if (storedProducts) {
          const allProducts = JSON.parse(storedProducts)
          const categoryProducts = allProducts.filter((p: Product) => p.categoryId === 'menopausa')
          
          // Encontrar o produto pelo slug
          const foundProduct = categoryProducts.find((p: Product) => {
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
            return productSlug === params.slug
          })
          
          if (foundProduct) {
            setProduct(foundProduct)
            console.log('📦 Produto encontrado:', foundProduct.name)
          } else {
            console.log('❌ Produto não encontrado para slug:', params.slug)
          }
        }
      } catch (error) {
        console.error('❌ Erro ao carregar produto:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [params.slug])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 0' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          ⏳
        </div>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Carregando produto...
        </p>
      </div>
    )
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 0' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          ❌
        </div>
        <h2 style={{ color: '#333', marginBottom: '1rem' }}>
          Produto não encontrado
        </h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          O produto que você está procurando não foi encontrado.
        </p>
        <Link href="/produtos/menopausa" style={{ textDecoration: 'none' }}>
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
            ← Voltar à Categoria Menopausa
          </button>
        </Link>
      </div>
    )
  }

  return (
    <>
      <main style={{ padding: '0', background: 'white' }}>
        {/* Header Unificado */}
        <Header language={language} onLanguageChange={setLanguage} />

        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
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
              color: 'white'
            }}>
              {product.name}
            </h1>
          </div>
        </section>

        {/* Produto Section */}
        <section style={{
          padding: '2rem 0',
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
              gap: '2rem',
              alignItems: 'start'
            }}>
              {/* Imagem do Produto */}
              {product.imageUrl && (
                <div style={{
                  textAlign: 'center'
                }}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '400px',
                      borderRadius: '12px',
                      objectFit: 'cover',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </div>
              )}

              {/* Detalhes do Produto */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <h2 style={{
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: '#1f2937',
                  marginBottom: '0.5rem'
                }}>
                  {product.name}
                </h2>

                {product.description && (
                  <p style={{
                    color: '#6b7280',
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                    marginBottom: '1rem'
                  }}>
                    {product.description}
                  </p>
                )}

                {product.currentPrice && (
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: '#059669',
                    marginBottom: '1rem'
                  }}>
                    {product.currentPrice}
                  </div>
                )}

                {/* Benefícios */}
                {product.benefits && product.benefits.length > 0 && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      color: '#1f2937',
                      marginBottom: '0.5rem'
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
                          color: '#6b7280'
                        }}>
                          <span style={{ color: '#22c55e' }}>✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Características */}
                {product.features && product.features.length > 0 && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      color: '#1f2937',
                      marginBottom: '0.5rem'
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
                          color: '#6b7280'
                        }}>
                          <span style={{ color: '#3b82f6' }}>◆</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Botões de Ação */}
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  marginTop: 'auto'
                }}>
                  <a
                    href={product.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', flex: 1 }}
                  >
                    <button style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontSize: '1rem',
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
                  <Link href="/produtos/menopausa" style={{ textDecoration: 'none', flex: 1 }}>
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
                      <span>←</span>
                      <span>Voltar à Categoria</span>
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
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}>
                      <span>🔍</span>
                      <span>Ver Todos os Produtos</span>
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
