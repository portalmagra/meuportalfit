'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../../components/Header'
import { supabase } from '@/lib/supabase'

export default function IntestinoPage() {
  const [language, setLanguage] = useState<'pt' | 'es' | 'en'>('pt')
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Carregar produtos da categoria "intestino" do Supabase
    const loadProducts = async () => {
      try {
        console.log('🔄 Carregando produtos do Supabase...')
        
        // Buscar produtos da categoria intestino no Supabase
        const { data: products, error } = await supabase
          .from('products')
          .select('*')
          .eq('category_id', 'intestino')
        
        if (error) {
          console.error('❌ Erro ao carregar produtos do Supabase:', error)
          // Fallback para localStorage se Supabase falhar
          const storedProducts = localStorage.getItem('adminProducts') || localStorage.getItem('globalProducts')
          if (storedProducts) {
            const allProducts = JSON.parse(storedProducts)
            const intestinoProducts = allProducts.filter((product: any) => 
              product.categoryId === 'intestino'
            )
            console.log('🔄 Fallback para localStorage:', intestinoProducts.length, 'produtos')
            setProducts(intestinoProducts)
          }
        } else {
          console.log('✅ Produtos carregados do Supabase:', products?.length || 0, 'produtos')
          setProducts(products || [])
        }
      } catch (error) {
        console.error('❌ Erro ao carregar produtos:', error)
        // Fallback para localStorage
        const storedProducts = localStorage.getItem('adminProducts') || localStorage.getItem('globalProducts')
        if (storedProducts) {
          const allProducts = JSON.parse(storedProducts)
          const intestinoProducts = allProducts.filter((product: any) => 
            product.categoryId === 'intestino'
          )
          setProducts(intestinoProducts)
        }
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
    
    // Sincronizar com mudanças de outros dispositivos
    try {
      const channel = new BroadcastChannel('admin-sync')
      console.log('📡 Escutando sincronização na página intestino')
      
      channel.onmessage = (event) => {
        console.log('📨 Mensagem recebida:', event.data.type, event.data.action || '')
        if (event.data.type === 'products-updated') {
          // Recarregar do Supabase quando houver mudanças
          loadProducts()
        }
      }
      
      return () => {
        console.log('🔌 Fechando canal de sincronização')
        channel.close()
      }
    } catch (error) {
      console.log('❌ BroadcastChannel não suportado na página intestino:', error)
    }
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
              ♻️ Produtos para Saúde Intestinal
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
                      {(product.imageUrl || product.image_url) && (
                        <div style={{
                          textAlign: 'center',
                          marginBottom: '1rem'
                        }}>
                          <img
                            src={product.imageUrl || product.image_url}
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

                      {(product.price || product.current_price) && (
                        <div style={{
                          fontSize: '1.3rem',
                          fontWeight: 700,
                          color: '#059669',
                          marginBottom: '1rem'
                        }}>
                          ${product.price || product.current_price}
                        </div>
                      )}

                      <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        marginTop: 'auto'
                      }}>
                        <button 
                          onClick={() => {
                            setSelectedProduct(product)
                            setShowModal(true)
                          }}
                          style={{
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
                          }}
                        >
                          <span>📄</span>
                          <span>Ver Detalhes</span>
                        </button>
                        
                        <a
                          href={product.amazonUrl || product.amazon_url}
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
                  ♻️
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

      {/* Modal de Detalhes do Produto */}
      {showModal && selectedProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative'
          }}>
            {/* Botão Fechar */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#6b7280'
              }}
            >
              ✕
            </button>

            {/* Conteúdo do Modal */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              {/* Imagem do Produto */}
              <div>
                {(selectedProduct.imageUrl || selectedProduct.image_url) ? (
                  <img 
                    src={selectedProduct.imageUrl || selectedProduct.image_url} 
                    alt={selectedProduct.name}
                    style={{
                      width: '100%',
                      maxWidth: '300px',
                      height: 'auto',
                      borderRadius: '0.5rem'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    maxWidth: '300px',
                    height: '200px',
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

              {/* Informações do Produto */}
              <div>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  color: '#1f2937'
                }}>
                  {selectedProduct.name}
                </h2>
                
                <p style={{
                  fontSize: '1rem',
                  marginBottom: '1rem',
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  {selectedProduct.description}
                </p>

                {/* Preço */}
                {(selectedProduct.price || selectedProduct.current_price) && (
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{
                      fontSize: '1.3rem',
                      fontWeight: 'bold',
                      color: '#059669'
                    }}>
                      ${selectedProduct.price || selectedProduct.current_price}
                    </span>
                  </div>
                )}

                {/* Avaliação */}
                {selectedProduct.rating && (
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ color: '#f59e0b' }}>
                      {'★'.repeat(Math.floor(selectedProduct.rating))}
                      {'☆'.repeat(5 - Math.floor(selectedProduct.rating))}
                    </span>
                    <span style={{ marginLeft: '0.5rem', color: '#6b7280' }}>
                      ({selectedProduct.review_count || 0} avaliações)
                    </span>
                  </div>
                )}

                {/* Benefícios */}
                {selectedProduct.benefits && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      Benefícios:
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {selectedProduct.benefits.split(',').map((benefit: string, index: number) => (
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

                {/* Características */}
                {selectedProduct.features && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      Características:
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {selectedProduct.features.split(',').map((feature: string, index: number) => (
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

                {/* Botões de Ação */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {(selectedProduct.amazonUrl || selectedProduct.amazon_url) && (
                    <a 
                      href={selectedProduct.amazonUrl || selectedProduct.amazon_url}
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
                  
                  <button
                    onClick={() => setShowModal(false)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#6b7280',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
