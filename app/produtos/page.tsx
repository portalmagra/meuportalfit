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
    <main style={{ padding: '0' }}>
      {/* Header Unificado */}
      <Header language={language} onLanguageChange={setLanguage} />

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #f0f9ff 100%)',
        padding: '4rem 0',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            color: '#1f2937'
          }}>
            Produtos Amazon Selecionados<br />Especialmente para Você
          </h1>

          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            marginBottom: '2rem',
            color: '#6b7280',
            maxWidth: '800px',
            margin: '0 auto 2rem',
            lineHeight: 1.6
          }}>
            Kits estratégicos que funcionam.
          </p>

          {/* Search Bar */}
          <div style={{
            maxWidth: '600px',
            margin: '0 auto 2rem',
            position: 'relative'
          }}>
            <input
              type="text"
              placeholder="Buscar qualquer produto, categoria ou necessidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                border: '2px solid #e5e7eb',
                borderRadius: '50px',
                fontSize: '1rem',
                background: 'white',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
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

      {/* Categories Section */}
      <section style={{
        padding: '2rem 0',
        background: 'white'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: 800,
            textAlign: 'center',
            marginBottom: '3rem',
            color: '#1f2937'
          }}>
            Nossas Categorias
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {filteredCategories.map(category => (
              <div key={category.name} style={{
                background: 'white',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                border: '2px solid #f3f4f6',
                position: 'relative'
              }}>
                {/* Category Header */}

                {/* Category Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    fontSize: '3rem'
                  }}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: '#1f2937',
                      marginBottom: '0.5rem'
                    }}>
                      {category.name}
                    </h3>
                    <p style={{
                      color: '#6b7280',
                      fontSize: '0.9rem',
                      lineHeight: 1.5
                    }}>
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Botão para Ver Produtos */}
                <Link href={category.href} style={{ textDecoration: 'none' }}>
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
                    gap: '0.5rem'
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
  )
}
