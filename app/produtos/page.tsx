'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '../components/Header'

export default function ProdutosPage() {
  const [language, setLanguage] = useState<'pt' | 'es' | 'en'>('pt')
  const [searchTerm, setSearchTerm] = useState('')

  // Categorias de produtos
  const categories = [
    {
      name: 'Shot Afrodisíaco',
      description: 'Suplementos naturais que ajudam o libido e energia sexual',
      icon: '💪',
      href: '/produtos/shot-afrodisiaco'
    },
    {
      name: 'Menopausa',
      description: 'Produtos específicos para aliviar sintomas da menopausa',
      icon: '🌸',
      href: '/produtos/menopausa'
    },
    {
      name: 'Energia',
      description: 'Suplementos para aumentar energia e disposição diária',
      icon: '⚡',
      href: '/produtos/energia'
    },
    {
      name: 'Emagrecimento',
      description: 'Produtos naturais para perda de peso saudável',
      icon: '🔥',
      href: '/produtos/emagrecimento'
    },
    {
      name: 'Flacidez',
      description: 'Suplementos para firmar pele e músculos',
      icon: '💪',
      href: '/produtos/flacidez'
    },
    {
      name: 'Qualidade do Sono',
      description: 'Produtos para melhorar o sono e descanso',
      icon: '😴',
      href: '/produtos/sono'
    },
    {
      name: 'Imunidade',
      description: 'Fortalecimento do sistema imunológico',
      icon: '🛡️',
      href: '/produtos/imunidade'
    },
    {
      name: 'Equilíbrio Hormonal',
      description: 'Balance hormonal natural para mulheres',
      icon: '⚖️',
      href: '/produtos/hormonal'
    },
    {
      name: 'Utensílios de Suporte',
      description: 'Fit medicine, base cozinha e acessórios',
      icon: '🍳',
      href: '/produtos/utensilios'
    },
    {
      name: 'Mercado de Homens',
      description: 'Produtos específicos para saúde masculina',
      icon: '👨',
      href: '/produtos/homens'
    },
    {
      name: 'Snack Saudável',
      description: 'Lanches nutritivos e práticos',
      icon: '🥜',
      href: '/produtos/snacks'
    },
    {
      name: 'Ansiedade',
      description: 'Produtos naturais para controle da ansiedade',
      icon: '🧘',
      href: '/produtos/ansiedade'
    },
    {
      name: 'Fadiga',
      description: 'Suplementos para combater o cansaço',
      icon: '😴',
      href: '/produtos/fadiga'
    },
    {
      name: 'Cozinhando Saudável',
      description: 'Temperos, óleos, sal e utensílios de cozinha',
      icon: '🌿',
      href: '/produtos/cozinha'
    }
  ]

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <>
      <style jsx global>{`
        @media (max-width: 768px) {
          .categories-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          
          .category-card {
            padding: 1.5rem !important;
          }
        }
      `}</style>

      <main style={{ padding: '0', background: 'white' }}>
        {/* Header Unificado */}
        <Header language={language} onLanguageChange={setLanguage} />

        {/* Hero Section Mínimo Absoluto */}
        <section style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #f0f9ff 100%)',
          padding: '0.05rem 0',
          textAlign: 'center',
          marginBottom: '0.1rem',
          minHeight: 'auto'
        }} className="hero-section">
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1rem'
          }}>
            <h1 style={{
              fontSize: 'clamp(1.3rem, 3.5vw, 2rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '0.3rem',
              color: '#1f2937'
            }} className="hero-title">
              Produtos Amazon Selecionados<br />Especialmente para Você
            </h1>

            <p style={{
              fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
              marginBottom: '0.3rem',
              color: '#6b7280',
              maxWidth: '400px',
              margin: '0 auto 0.3rem',
              lineHeight: 1.2
            }}>
              Kits estratégicos que funcionam.
            </p>

            {/* Search Bar Mínimo Absoluto */}
            <div style={{
              maxWidth: '350px',
              margin: '0 auto 0.2rem',
              position: 'relative'
            }}>
              <input
                type="text"
                placeholder="Buscar qualquer produto, categoria ou necessidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.4rem 0.6rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  background: 'white',
                  boxShadow: '0 1px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <div style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }}>
                🔍
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section Ultra-Compacto */}
        <section style={{
          padding: '0.5rem 0',
          background: 'white'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1rem'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
              fontWeight: 800,
              textAlign: 'center',
              marginBottom: '1.5rem',
              color: '#1f2937'
            }}>
              Nossas Categorias
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }} className="categories-grid">
              {filteredCategories.map(category => (
                <div key={category.name} style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                  border: '2px solid #f3f4f6',
                  position: 'relative'
                }} className="category-card">
                  {/* Category Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      fontSize: '2.5rem'
                    }}>
                      {category.icon}
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: '1.3rem',
                        fontWeight: 700,
                        color: '#1f2937',
                        marginBottom: '0.4rem'
                      }}>
                        {category.name}
                      </h3>
                      <p style={{
                        color: '#6b7280',
                        fontSize: '0.85rem',
                        lineHeight: 1.4
                      }}>
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Botão para Ver Produtos */}
                  <Link href={category.href} style={{ textDecoration: 'none' }}>
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
                      <span>Ver Produtos</span>
                      <span>→</span>
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
