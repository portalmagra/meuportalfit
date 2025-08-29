'use client'

import Link from 'next/link'
import { useState } from 'react'

interface Product {
  id: string
  name: string
  description: string
  price: string
  originalPrice: string
  rating: number
  reviewCount: number
  image: string
  asin: string
  benefits: string[]
  features: string[]
  amazonUrl: string
  prime: boolean
  savings: number
}

interface ProductKit {
  id: string
  name: string
  description: string
  products: Product[]
  totalPrice: string
  originalTotalPrice: string
  savings: number
  benefits: string[]
  image: string
  amazonSearchUrl: string
}

const products: Product[] = [
  {
    id: '1',
    name: 'Creatina Monohidratada Premium',
    description: 'Creatina pura para ganho de força e massa muscular',
    price: '$24.99',
    originalPrice: '$39.99',
    rating: 4.8,
    reviewCount: 1247,
    image: '/images/products/creatina.jpg',
    asin: 'B08N5WRWNW',
    benefits: ['Aumenta força muscular', 'Melhora performance', 'Recuperação rápida'],
    features: ['5g por dose', 'Sem aditivos', 'Testado em laboratório'],
    amazonUrl: 'https://amazon.com/dp/B08N5WRWNW?tag=portal07d-20',
    prime: true,
    savings: 37
  },
  {
    id: '2',
    name: 'BCAA Aminoácidos Essenciais',
    description: 'Blend de aminoácidos para recuperação muscular e energia',
    price: '$32.99',
    originalPrice: '$49.99',
    rating: 4.6,
    reviewCount: 892,
    image: '/images/products/bcaa.jpg',
    asin: 'B08N5WRWNX',
    benefits: ['Recuperação muscular', 'Reduz fadiga', 'Preserva massa magra'],
    features: ['2:1:1 ratio', 'Sabor natural', 'Sem açúcar'],
    amazonUrl: 'https://amazon.com/dp/B08N5WRWNX?tag=portal07d-20',
    prime: true,
    savings: 34
  },
  {
    id: '3',
    name: 'Pré-treino Energético Natural',
    description: 'Fórmula natural para energia e foco durante treinos',
    price: '$28.99',
    originalPrice: '$44.99',
    rating: 4.7,
    reviewCount: 1563,
    image: '/images/products/pre-treino.jpg',
    asin: 'B08N5WRWNY',
    benefits: ['Energia sustentada', 'Foco mental', 'Sem crash'],
    features: ['Cafeína natural', 'B-vitaminas', 'Aminoácidos'],
    amazonUrl: 'https://amazon.com/dp/B08N5WRWNY?tag=portal07d-20',
    prime: true,
    savings: 36
  },
  {
    id: '4',
    name: 'Proteína Whey Isolada',
    description: 'Proteína de alta qualidade para construção muscular',
    price: '$45.99',
    originalPrice: '$69.99',
    rating: 4.9,
    reviewCount: 2341,
    image: '/images/products/whey.jpg',
    asin: 'B08N5WRWNZ',
    benefits: ['Construção muscular', 'Recuperação rápida', 'Baixo teor de gordura'],
    features: ['25g por dose', 'Baixo lactose', 'Múltiplos sabores'],
    amazonUrl: 'https://amazon.com/dp/B08N5WRWNZ?tag=portal07d-20',
    prime: true,
    savings: 34
  }
]

const kits: ProductKit[] = [
  {
    id: 'kit1',
    name: 'Kit Performance Completo',
    description: 'Combinação perfeita para maximizar seus resultados no treino',
    products: [products[0], products[1], products[2]],
    totalPrice: '$79.99',
    originalTotalPrice: '$129.99',
    savings: 38,
    benefits: ['Ganho de força', 'Recuperação otimizada', 'Energia sustentada'],
    image: '/images/kits/performance-kit.jpg',
    amazonSearchUrl: 'https://amazon.com/s?k=Creatina+Monohidratada+Premium+BCAA+Aminoácidos+Essenciais+Pré-treino+Energético+Natural+Proteína+Whey+Isolada&tag=portal07d-20'
  },
  {
    id: 'kit2',
    name: 'Kit Iniciante',
    description: 'Essenciais para começar sua jornada fitness',
    products: [products[0], products[3]],
    totalPrice: '$64.99',
    originalTotalPrice: '$99.99',
    savings: 35,
    benefits: ['Fundação muscular', 'Recuperação básica', 'Custo-benefício'],
    image: '/images/kits/beginner-kit.jpg',
    amazonSearchUrl: 'https://amazon.com/dp/B08N5WRWNW?tag=portal07d-20'
  }
]

export default function EnergiaPage() {
  const [selectedTab, setSelectedTab] = useState<'produtos' | 'kits'>('produtos')

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #f59e0b, #ea580c)', color: 'white', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <Link href="/produtos" style={{ color: 'white', textDecoration: 'none', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ← Voltar às Categorias
            </Link>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem', margin: '0 auto 1.5rem auto' }}>
              💪 Energia & Performance
            </h1>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem auto', opacity: 0.95 }}>
              Suplementos premium para aumentar sua energia, resistência e performance física
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                              <button
                  onClick={() => setSelectedTab('produtos')}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    cursor: 'pointer',
                    ...(selectedTab === 'produtos' ? {
                      background: 'white',
                      color: '#ea580c'
                    } : {
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white'
                    })
                  }}
                >
                  🛍️ Produtos Individuais
                </button>
                <button
                  onClick={() => setSelectedTab('kits')}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    cursor: 'pointer',
                    ...(selectedTab === 'kits' ? {
                      background: 'white',
                      color: '#ea580c'
                    } : {
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white'
                    })
                  }}
                >
                  📦 Kits Recomendados
                </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          {/* Tab Content */}
          {selectedTab === 'produtos' && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
                  Produtos Individuais
                </h2>
                <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
                  Escolha os produtos que melhor se adequam às suas necessidades
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {products.map((product) => (
                  <div key={product.id} style={{ background: 'white', borderRadius: '0.75rem', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)', overflow: 'hidden', border: '1px solid #f3f4f6' }}>
                    {/* Product Image */}
                    <div style={{ height: '12rem', background: 'linear-gradient(135deg, #fef3c7, #fed7aa)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ fontSize: '4rem' }}>{product.name.includes('Creatina') ? '💪' : product.name.includes('BCAA') ? '🏃' : product.name.includes('Pré-treino') ? '⚡' : '🥛'}</div>
                    </div>

                    {/* Product Info */}
                    <div style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '0.75rem', backgroundColor: '#dcfce7', color: '#166534', padding: '0.25rem 0.5rem', borderRadius: '9999px' }}>
                          -{product.savings}%
                        </span>
                        {product.prime && (
                          <span style={{ fontSize: '0.75rem', backgroundColor: '#dbeafe', color: '#1e40af', padding: '0.25rem 0.5rem', borderRadius: '9999px' }}>
                            Prime
                          </span>
                        )}
                      </div>

                      <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>{product.name}</h3>
                      <p style={{ color: '#4b5563', fontSize: '0.875rem', marginBottom: '1rem' }}>{product.description}</p>

                      {/* Benefits */}
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

                      {/* Features */}
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
                          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>{product.price}</span>
                          <span style={{ fontSize: '0.875rem', color: '#6b7280', textDecoration: 'line-through', marginLeft: '0.5rem' }}>{product.originalPrice}</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <a
                        href={product.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'block', width: '100%', background: 'linear-gradient(to right, #eab308, #f97316)', color: 'white', textAlign: 'center', padding: '0.75rem', borderRadius: '0.5rem', fontWeight: '600', textDecoration: 'none' }}
                      >
                        🛒 Comprar na Amazon
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'kits' && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
                  Kits Recomendados
                </h2>
                <p style={{ fontSize: '1.125rem', color: '#4b5563' }}>
                  Combinações perfeitas para maximizar seus resultados
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {kits.map((kit) => (
                  <div key={kit.id} style={{ backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)', overflow: 'hidden', border: '1px solid #f3f4f6' }}>
                    {/* Kit Header */}
                    <div style={{ background: 'linear-gradient(to right, #eab308, #f97316)', color: 'white', padding: '1.5rem' }}>
                      <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{kit.name}</h3>
                        <p style={{ fontSize: '1.125rem', opacity: 0.9 }}>{kit.description}</p>
                      </div>
                    </div>

                    {/* Kit Content */}
                    <div style={{ padding: '1.5rem' }}>
                      {/* Products in Kit */}
                      <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.75rem' }}>Produtos Incluídos:</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          {kit.products.map((product) => (
                            <div key={product.id} style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
                              <div style={{ width: '2.5rem', height: '2.5rem', background: 'linear-gradient(to bottom right, #fef3c7, #fed7aa)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '0.75rem' }}>
                                <span style={{ fontSize: '1.125rem' }}>{product.name.includes('Creatina') ? '💪' : product.name.includes('BCAA') ? '🏃' : product.name.includes('Pré-treino') ? '⚡' : '🥛'}</span>
                              </div>
                              <div style={{ flex: 1 }}>
                                <h5 style={{ fontWeight: '500', color: '#111827' }}>{product.name}</h5>
                                <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>{product.description}</p>
                              </div>
                              <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>{product.price}</div>
                                <div style={{ fontSize: '0.75rem', color: '#6b7280', textDecoration: 'line-through' }}>{product.originalPrice}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Benefits */}
                      <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.75rem' }}>Benefícios do Kit:</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                          {kit.benefits.map((benefit, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: '#4b5563' }}>
                              <span style={{ color: '#10b981', marginRight: '0.5rem' }}>✓</span>
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pricing */}
                      <div style={{ background: 'linear-gradient(to right, #fefce8, #fed7aa)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>{kit.totalPrice}</span>
                            <span style={{ fontSize: '1.125rem', color: '#6b7280', textDecoration: 'line-through', marginLeft: '0.5rem' }}>{kit.originalTotalPrice}</span>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#059669' }}>-{kit.savings}%</div>
                            <div style={{ fontSize: '0.875rem', color: '#4b5563' }}>Economia total</div>
                          </div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <a
                        href={kit.amazonSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'block', width: '100%', background: 'linear-gradient(to right, #eab308, #f97316)', color: 'white', textAlign: 'center', padding: '1rem', borderRadius: '0.5rem', fontWeight: '600', textDecoration: 'none', fontSize: '1.125rem' }}
                      >
                        🛒 Ver Kit na Amazon
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ background: 'linear-gradient(to right, #eab308, #f97316)', color: 'white', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', textAlign: 'center', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Precisa de ajuda para escolher?
          </h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
            Nossa análise de IA personalizada pode identificar exatamente quais produtos de energia você precisa
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/analise">
              <button style={{ backgroundColor: 'white', color: '#ea580c', padding: '0.75rem 2rem', borderRadius: '0.5rem', fontWeight: '600', border: 'none', cursor: 'pointer' }}>
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
