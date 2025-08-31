'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

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

export default function ShotAfrodisiacoPage() {
  const [adminProducts, setAdminProducts] = useState<Product[]>([])

  useEffect(() => {
    // Carregar produtos do localStorage
    const savedProducts = localStorage.getItem('globalProducts')
    if (savedProducts) {
      const allProducts = JSON.parse(savedProducts)
      // Filtrar apenas produtos da categoria "shot-afrodisiaco"
      const shotProducts = allProducts.filter((p: any) => p.categoryId === 'shot-afrodisiaco')
      setAdminProducts(shotProducts)
    }
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)', color: 'white', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <Link href="/produtos" style={{ color: 'white', textDecoration: 'none', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ← Voltar às Categorias
            </Link>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem', margin: '0 auto 1.5rem auto' }}>
              💕 Shot Afrodisíaco
            </h1>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem auto', opacity: 0.95 }}>
              Suplementos naturais para aumentar libido e energia sexual
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
              Produtos Disponíveis
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
              Produtos selecionados para suas necessidades específicas
            </p>
          </div>

          {adminProducts.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {adminProducts.map((product) => (
                <div key={product.id} style={{ background: 'white', borderRadius: '0.75rem', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)', overflow: 'hidden', border: '1px solid #f3f4f6' }}>
                  {/* Product Image */}
                  <div style={{ height: '12rem', background: 'linear-gradient(135deg, #fce7f3, #fbcfe8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '4rem' }}>💕</div>
                  </div>

                  {/* Product Info */}
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>{product.name}</h3>
                    <p style={{ color: '#4b5563', fontSize: '0.875rem', marginBottom: '1rem' }}>{product.description}</p>

                    {/* Benefits */}
                    {product.benefits && product.benefits.length > 0 && (
                      <div style={{ marginBottom: '1rem' }}>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Benefícios:</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          {product.benefits.map((benefit, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem', color: '#4b5563' }}>
                              <span style={{ color: '#10b981', marginRight: '0.5rem' }}>✓</span>
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Features */}
                    {product.features && product.features.length > 0 && (
                      <div style={{ marginBottom: '1rem' }}>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Características:</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                          {product.features.map((feature, index) => (
                            <span
                              key={index}
                              style={{ fontSize: '0.75rem', backgroundColor: '#f3f4f6', color: '#4b5563', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Rating */}
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: '#fbbf24', marginRight: '0.25rem' }}>{'★'.repeat(Math.floor(product.rating))}</span>
                        <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>{product.rating}</span>
                      </div>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280', marginLeft: '0.5rem' }}>({product.reviewCount} reviews)</span>
                    </div>

                    {/* Price */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <div>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>{product.currentPrice}</span>
                        {product.originalPrice && (
                          <span style={{ fontSize: '0.875rem', color: '#6b7280', textDecoration: 'line-through', marginLeft: '0.5rem' }}>{product.originalPrice}</span>
                        )}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <a
                      href={product.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'block', width: '100%', background: 'linear-gradient(to right, #ec4899, #be185d)', color: 'white', textAlign: 'center', padding: '0.75rem', borderRadius: '0.5rem', fontWeight: '600', textDecoration: 'none' }}
                    >
                      🛒 Comprar na Amazon
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💕</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#374151', marginBottom: '1rem' }}>
                Nenhum produto adicionado ainda
              </h3>
              <p style={{ color: '#6b7280', fontSize: '1.125rem', maxWidth: '500px', margin: '0 auto' }}>
                Os produtos desta categoria serão adicionados em breve através da área administrativa.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ background: 'linear-gradient(to right, #ec4899, #be185d)', color: 'white', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', textAlign: 'center', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Precisa de ajuda para escolher?
          </h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
            Nossa análise de IA personalizada pode identificar exatamente quais produtos você precisa
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/analise">
              <button style={{ backgroundColor: 'white', color: '#be185d', padding: '0.75rem 2rem', borderRadius: '0.5rem', fontWeight: '600', border: 'none', cursor: 'pointer' }}>
                🧠 Fazer Análise IA
              </button>
            </Link>
            <Link href="/suporte">
              <button style={{ border: '2px solid white', color: 'white', padding: '0.75rem 2rem', borderRadius: '0.5rem', fontWeight: '600', backgroundColor: 'transparent', cursor: 'pointer' }}>
                💬 Falar com Especialista
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
