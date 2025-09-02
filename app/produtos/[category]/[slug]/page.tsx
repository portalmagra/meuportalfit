'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../../../components/Header'
import { supabase } from '@/lib/supabase'

interface ProductPageProps {
  params: {
    category: string
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [language, setLanguage] = useState<'pt' | 'es' | 'en'>('pt')
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        console.log('🔄 Carregando produto:', params.slug, 'da categoria:', params.category)
        
        // Buscar produto no Supabase
        const { data: products, error } = await supabase
          .from('products')
          .select('*')
          .eq('category_id', params.category)
          .eq('id', params.slug)
        
        if (error) {
          console.error('❌ Erro ao carregar produto do Supabase:', error)
          setError('Erro ao carregar produto')
          return
        }
        
        if (products && products.length > 0) {
          console.log('✅ Produto encontrado:', products[0])
          setProduct(products[0])
        } else {
          console.log('❌ Produto não encontrado')
          setError('Produto não encontrado')
        }
      } catch (error) {
        console.error('❌ Erro ao carregar produto:', error)
        setError('Erro ao carregar produto')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [params.category, params.slug])

  if (loading) {
    return (
      <>
        <Header language={language} onLanguageChange={setLanguage} />
        <main style={{ padding: '2rem', textAlign: 'center' }}>
          <div>Carregando...</div>
        </main>
      </>
    )
  }

  if (error || !product) {
    return (
      <>
        <Header language={language} onLanguageChange={setLanguage} />
        <main style={{ 
          padding: '2rem', 
          textAlign: 'center',
          minHeight: '50vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            marginBottom: '0.5rem',
            color: '#374151'
          }}>
            Produto não encontrado
          </h1>
          <p style={{ 
            fontSize: '1rem', 
            marginBottom: '2rem',
            color: '#6b7280'
          }}>
            O produto que você está procurando não foi encontrado.
          </p>
          <Link href={`/produtos/${params.category}`}>
            <button style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              ← Voltar à Categoria {params.category.charAt(0).toUpperCase() + params.category.slice(1)}
            </button>
          </Link>
        </main>
      </>
    )
  }

  return (
    <>
      <Header language={language} onLanguageChange={setLanguage} />
      <main style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <nav style={{ marginBottom: '2rem' }}>
          <Link href="/produtos" style={{ color: '#3b82f6', textDecoration: 'none' }}>
            Produtos
          </Link>
          {' > '}
          <Link href={`/produtos/${params.category}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>
            {params.category.charAt(0).toUpperCase() + params.category.slice(1)}
          </Link>
          {' > '}
          <span style={{ color: '#6b7280' }}>{product.name}</span>
        </nav>

        {/* Product Details */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Product Image */}
          <div>
            {product.image_url ? (
              <img 
                src={product.image_url} 
                alt={product.name}
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  height: 'auto',
                  borderRadius: '0.5rem'
                }}
              />
            ) : (
              <div style={{
                width: '100%',
                maxWidth: '400px',
                height: '300px',
                backgroundColor: '#f3f4f6',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6b7280'
              }}>
                Sem imagem
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: '#1f2937'
            }}>
              {product.name}
            </h1>
            
            <p style={{
              fontSize: '1.1rem',
              marginBottom: '1rem',
              color: '#6b7280',
              lineHeight: '1.6'
            }}>
              {product.description}
            </p>

            {/* Price */}
            {product.current_price && (
              <div style={{ marginBottom: '1rem' }}>
                <span style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#059669'
                }}>
                  ${product.current_price}
                </span>
                {product.original_price && product.original_price > product.current_price && (
                  <span style={{
                    fontSize: '1rem',
                    color: '#6b7280',
                    textDecoration: 'line-through',
                    marginLeft: '0.5rem'
                  }}>
                    ${product.original_price}
                  </span>
                )}
              </div>
            )}

            {/* Rating */}
            {product.rating && (
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ color: '#f59e0b' }}>
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                </span>
                <span style={{ marginLeft: '0.5rem', color: '#6b7280' }}>
                  ({product.review_count || 0} avaliações)
                </span>
              </div>
            )}

            {/* Benefits */}
            {product.benefits && (
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Benefícios:
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {product.benefits.split(',').map((benefit: string, index: number) => (
                    <li key={index} style={{ 
                      marginBottom: '0.25rem',
                      paddingLeft: '1rem',
                      position: 'relative'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: '#059669'
                      }}>✓</span>
                      {benefit.trim()}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Features */}
            {product.features && (
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Características:
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {product.features.split(',').map((feature: string, index: number) => (
                    <li key={index} style={{ 
                      marginBottom: '0.25rem',
                      paddingLeft: '1rem',
                      position: 'relative'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: '#3b82f6'
                      }}>•</span>
                      {feature.trim()}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {product.amazon_url && (
                <a 
                  href={product.amazon_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#ff9900',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  🛒 Comprar na Amazon
                </a>
              )}
              
              <Link href={`/produtos/${params.category}`}>
                <button style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}>
                  ← Voltar à Categoria
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
