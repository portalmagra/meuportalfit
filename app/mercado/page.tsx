'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase, Product } from '@/lib/supabase'

export default function MercadoPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProductsFromStorage = () => {
      try {
        // Buscar produtos do localStorage (mesmo local onde a admin salva)
        const storedProducts = localStorage.getItem('adminProducts')
        if (storedProducts) {
          const allProducts = JSON.parse(storedProducts)
          // Filtrar apenas produtos marcados para o mercado (is_mentoria: true)
          const mercadoProducts = allProducts.filter((product: any) => product.is_mentoria === true)
          setProducts(mercadoProducts)
          console.log(`✅ Carregados ${mercadoProducts.length} produtos do mercado do localStorage`)
        } else {
          console.log('ℹ️ Nenhum produto encontrado no localStorage')
          setProducts([])
        }
      } catch (error) {
        console.error('Erro ao carregar produtos do localStorage:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    loadProductsFromStorage()
  }, [])

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #f0f9ff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '3px solid #22c55e',
            borderTop: '3px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ color: '#6b7280' }}>Carregando sugestões...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
      <main style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #f0f9ff 100%)',
        padding: '2rem 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          {/* Introdução */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: 900,
              color: '#1f2937',
              marginBottom: '1rem',
              lineHeight: 1.2
            }}>
              🛒 Produtos do Mercado
            </h1>
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              maxWidth: '800px',
              margin: '0 auto 1.5rem',
              lineHeight: 1.6
            }}>
              Produtos selecionados na área administrativa para o mercado.
            </p>
            <button
              onClick={() => {
                setLoading(true)
                const storedProducts = localStorage.getItem('adminProducts')
                if (storedProducts) {
                  const allProducts = JSON.parse(storedProducts)
                  const mercadoProducts = allProducts.filter((product: any) => product.is_mentoria === true)
                  setProducts(mercadoProducts)
                  console.log(`🔄 Atualizados ${mercadoProducts.length} produtos do mercado`)
                }
                setLoading(false)
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#FF8C42',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              🔄 Atualizar Lista
            </button>
          </div>

          {/* Lista de Produtos */}
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {products.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Nenhum produto disponível
                </h3>
                <p style={{ color: '#6b7280' }}>
                  Os produtos para o mercado ainda não foram configurados.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {products.map((product) => (
                  <div key={product.id} style={{
                    background: 'white',
                    borderRadius: '15px',
                    padding: '1rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    transition: 'all 0.3s ease'
                  }}>
                    {/* Nome do produto */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{
                        fontWeight: 600,
                        color: '#1f2937',
                        fontSize: '1rem',
                        margin: 0
                      }}>
                        {product.name}
                      </h3>
                    </div>
                    
                    {/* Imagem pequena */}
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: '#f9fafb',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      flexShrink: 0
                    }}>
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          style={{
                            width: '48px',
                            height: '48px',
                            objectFit: 'cover',
                            borderRadius: '8px'
                          }}
                          onError={(e) => {
                            e.currentTarget.src = '/images/placeholder-product.png'
                          }}
                        />
                      ) : (
                        <div style={{ fontSize: '1.2rem', color: '#9ca3af' }}>📦</div>
                      )}
                    </div>

                    {/* Botão Amazon */}
                    <div style={{ flexShrink: 0 }}>
                      <a
                        href={product.amazon_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          background: 'linear-gradient(135deg, #f97316, #ea580c)',
                          color: 'white',
                          fontWeight: 700,
                          padding: '0.75rem 1.5rem',
                          borderRadius: '10px',
                          textDecoration: 'none',
                          fontSize: '0.9rem',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)'
                          e.currentTarget.style.boxShadow = '0 8px 20px rgba(249, 115, 22, 0.4)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)'
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(249, 115, 22, 0.3)'
                        }}
                      >
                        <span>🛒</span>
                        Ver na Amazon
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Botão Indique sua Amiga */}
          <div style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '2rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #fce7f3, #f3e8ff, #dbeafe)',
              borderRadius: '25px',
              padding: '1.5rem',
              maxWidth: '500px',
              margin: '0 auto',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#1f2937',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ fontSize: '1.8rem' }}>💝</span>
                Compartilhe com uma amiga!
              </h3>
              <Link 
                href="/avaliacao"
                style={{ textDecoration: 'none' }}
              >
                <button style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: 'linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6)',
                  color: 'white',
                  fontWeight: 700,
                  padding: '1rem 2rem',
                  borderRadius: '15px',
                  border: 'none',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(236, 72, 153, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(236, 72, 153, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(236, 72, 153, 0.3)'
                }}
                >
                  <span style={{ fontSize: '1.2rem' }}>👭</span>
                  Indique sua amiga para fazer a avaliação
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}