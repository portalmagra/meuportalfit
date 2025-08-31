'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../../components/Header'

interface Product {
  id: string
  name: string
  description: string
  price: string
  originalPrice: string
  rating: number
  reviewCount: number
  image: string
  amazonUrl: string
  prime: boolean
  savings: number
  benefits: string[]
  features: string[]
}

export default function AnsiedadePage() {
  const [language, setLanguage] = useState<'pt' | 'es' | 'en'>('pt')
  const [adminProducts, setAdminProducts] = useState<Product[]>([])
  const [adminCategories, setAdminCategories] = useState<any[]>([])

  // Carregar produtos e categorias do localStorage
  useEffect(() => {
    const loadAdminData = () => {
      try {
        const storedProducts = localStorage.getItem('globalProducts')
        const storedCategories = localStorage.getItem('globalCategories')
        
        if (storedProducts) {
          const products = JSON.parse(storedProducts)
          // Filtrar apenas produtos da categoria "ansiedade"
          const categoryProducts = products.filter((product: any) => 
            product.category === 'ansiedade' || 
            product.category === 'Ansiedade e Estresse' ||
            product.category === 'ansiedade'
          )
          setAdminProducts(categoryProducts)
        }
        
        if (storedCategories) {
          setAdminCategories(JSON.parse(storedCategories))
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      }
    }

    loadAdminData()
  }, [])

  const content = {
    pt: {
      title: 'Ansiedade e Estresse',
      subtitle: 'Suplementos para equilíbrio emocional',
      description: 'Descubra os melhores suplementos naturais para controlar a ansiedade e reduzir o estresse.',
      noProducts: 'Nenhum produto adicionado ainda',
      ctaTitle: 'Precisa de produtos específicos?',
      ctaDescription: 'Faça uma análise personalizada para encontrar os melhores produtos para suas necessidades.',
      analyzeButton: 'Fazer Análise IA',
      productsButton: 'Ver Todos os Produtos'
    },
    es: {
      title: 'Ansiedade e Estresse',
      subtitle: 'Suplementos para equilíbrio emocional',
      description: 'Descubra os melhores suplementos naturais para controlar a ansiedade e reduzir o estresse.',
      noProducts: 'Ningún producto agregado aún',
      ctaTitle: '¿Necesitas productos específicos?',
      ctaDescription: 'Haz un análisis personalizado para encontrar los mejores productos para tus necesidades.',
      analyzeButton: 'Hacer Análisis IA',
      productsButton: 'Ver Todos los Productos'
    },
    en: {
      title: 'Ansiedade e Estresse',
      subtitle: 'Suplementos para equilíbrio emocional',
      description: 'Descubra os melhores suplementos naturais para controlar a ansiedade e reduzir o estresse.',
      noProducts: 'No products added yet',
      ctaTitle: 'Need specific products?',
      ctaDescription: 'Get a personalized analysis to find the best products for your needs.',
      analyzeButton: 'Get AI Analysis',
      productsButton: 'View All Products'
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Header />
      
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #fdf2f8 0%, #f8fafc 50%, #e2e8f0 100%)',
        padding: '2rem 1rem',
        textAlign: 'center',
        color: '#1f2937'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            😰 {content[language].title}
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
            {content[language].subtitle}
          </p>
          <p style={{ fontSize: '1rem', opacity: 0.9 }}>
            {content[language].description}
          </p>
        </div>
      </section>

      {/* Produtos */}
      <section style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem', color: '#1f2937' }}>
          🛍️ Produtos Disponíveis
        </h2>

        {adminProducts.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {adminProducts.map((product) => (
              <div key={product.id} style={{
                background: 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                    {product.image || '📦'}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1f2937' }}>
                    {product.name}
                  </h3>
                  <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                    {product.description}
                  </p>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}>
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span style={{ textDecoration: 'line-through', color: '#9ca3af' }}>
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  {product.savings > 0 && (
                    <div style={{ 
                      background: '#dcfce7', 
                      color: '#166534', 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      display: 'inline-block'
                    }}>
                      Economia de {product.savings}%
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#f59e0b', marginRight: '0.5rem' }}>⭐</span>
                    <span style={{ fontWeight: 'bold' }}>{product.rating}</span>
                    <span style={{ color: '#6b7280', marginLeft: '0.5rem' }}>
                      ({product.reviewCount} avaliações)
                    </span>
                  </div>
                  
                  {product.prime && (
                    <div style={{ 
                      background: '#fef3c7', 
                      color: '#92400e', 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      display: 'inline-block'
                    }}>
                      🚀 Prime
                    </div>
                  )}
                </div>

                {/* Benefícios */}
                {product.benefits && product.benefits.length > 0 && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#374151' }}>
                      Benefícios:
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {product.benefits.slice(0, 3).map((benefit, index) => (
                        <li key={index} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBottom: '0.25rem',
                          fontSize: '0.875rem',
                          color: '#6b7280'
                        }}>
                          <span style={{ color: '#10b981' }}>✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <a
                  href={product.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    width: '100%',
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    color: 'white',
                    textAlign: 'center',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '1rem'
                  }}
                >
                  🛒 Comprar na Amazon
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>😰</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#6b7280' }}>
              {content[language].noProducts}
            </h3>
            <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
              Os produtos serão adicionados em breve através da área administrativa.
            </p>
            <Link href="/produtos" style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>
              🔍 Buscar Produtos
            </Link>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
        padding: '3rem 1rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            {content[language].ctaTitle}
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9 }}>
            {content[language].ctaDescription}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/analise" style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>
              🧠 {content[language].analyzeButton}
            </Link>
            <Link href="/produtos" style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>
              🛍️ {content[language].productsButton}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}