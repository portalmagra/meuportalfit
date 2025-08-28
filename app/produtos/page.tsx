'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ProdutosPage() {
  const [language, setLanguage] = useState<'pt' | 'es' | 'en'>('pt')
  const [searchTerm, setSearchTerm] = useState('')

  const productCategories = [
    {
      id: 'shot-afrodisiaco',
      name: { pt: 'Shot Afrodisíaco', es: 'Shot Afrodisíaco', en: 'Aphrodisiac Shot' },
      description: { pt: 'Suplementos naturais para aumentar libido e energia sexual', es: 'Suplementos naturales para aumentar libido y energía sexual', en: 'Natural supplements to increase libido and sexual energy' },
      icon: '💕',
      color: 'from-pink-500 to-rose-600',
      category: 'health',
      featured: true
    },
    {
      id: 'menopausa',
      name: { pt: 'Menopausa', es: 'Menopausia', en: 'Menopause' },
      description: { pt: 'Suplementos para aliviar sintomas da menopausa', es: 'Suplementos para aliviar síntomas de la menopausia', en: 'Supplements to relieve menopause symptoms' },
      icon: '🌸',
      color: 'from-purple-500 to-pink-600',
      category: 'health',
      featured: true
    },
    {
      id: 'energia',
      name: { pt: 'Energia', es: 'Energía', en: 'Energy' },
      description: { pt: 'Suplementos para aumentar energia e disposição', es: 'Suplementos para aumentar energía y disposición', en: 'Supplements to increase energy and disposition' },
      icon: '⚡',
      color: 'from-yellow-500 to-orange-600',
      category: 'health',
      featured: true
    },
    {
      id: 'emagrecimento',
      name: { pt: 'Emagrecimento', es: 'Pérdida de Peso', en: 'Weight Loss' },
      description: { pt: 'Produtos para emagrecimento saudável e sustentável', es: 'Productos para pérdida de peso saludable y sostenible', en: 'Products for healthy and sustainable weight loss' },
      icon: '🔥',
      color: 'from-red-500 to-pink-600',
      category: 'health',
      featured: true
    },
    {
      id: 'flacidez',
      name: { pt: 'Flacidez', es: 'Flacidez', en: 'Sagging' },
      description: { pt: 'Suplementos para firmar pele e músculos', es: 'Suplementos para firmar piel y músculos', en: 'Supplements to firm skin and muscles' },
      icon: '💪',
      color: 'from-blue-500 to-indigo-600',
      category: 'health',
      featured: false
    },
    {
      id: 'sono',
      name: { pt: 'Qualidade do Sono', es: 'Calidad del Sueño', en: 'Sleep Quality' },
      description: { pt: 'Produtos para melhorar a qualidade do sono', es: 'Productos para mejorar la calidad del sueño', en: 'Products to improve sleep quality' },
      icon: '😴',
      color: 'from-indigo-500 to-purple-600',
      category: 'health',
      featured: false
    },
    {
      id: 'imunidade',
      name: { pt: 'Imunidade', es: 'Inmunidad', en: 'Immunity' },
      description: { pt: 'Suplementos para fortalecer o sistema imunológico', es: 'Suplementos para fortalecer el sistema inmunológico', en: 'Supplements to strengthen the immune system' },
      icon: '🛡️',
      color: 'from-green-500 to-emerald-600',
      category: 'health',
      featured: false
    },
    {
      id: 'balance-hormonal',
      name: { pt: 'Equilíbrio Hormonal', es: 'Equilibrio Hormonal', en: 'Hormonal Balance' },
      description: { pt: 'Suplementos para equilibrar hormônios', es: 'Suplementos para equilibrar hormonas', en: 'Supplements to balance hormones' },
      icon: '⚖️',
      color: 'from-purple-500 to-violet-600',
      category: 'health',
      featured: false
    },
    {
      id: 'utensilios-suporte',
      name: { pt: 'Utensílios de Suporte', es: 'Utensilios de Apoyo', en: 'Support Utensils' },
      description: { pt: 'Fitness, medicina, base cozinha', es: 'Fitness, medicina, base cocina', en: 'Fitness, medicine, kitchen base' },
      icon: '🏋️',
      color: 'from-gray-500 to-slate-600',
      category: 'fitness',
      featured: false
    },
    {
      id: 'mercado-homens',
      name: { pt: 'Mercado de Homens', es: 'Mercado de Hombres', en: 'Men Market' },
      description: { pt: 'Produtos específicos para saúde masculina', es: 'Productos específicos para salud masculina', en: 'Specific products for men health' },
      icon: '👨',
      color: 'from-blue-500 to-cyan-600',
      category: 'health',
      featured: false
    },
    {
      id: 'snack-saudavel',
      name: { pt: 'Snack Saudável', es: 'Snack Saludable', en: 'Healthy Snack' },
      description: { pt: 'Lanches saudáveis e nutritivos', es: 'Bocadillos saludables y nutritivos', en: 'Healthy and nutritious snacks' },
      icon: '🥗',
      color: 'from-green-500 to-teal-600',
      category: 'lifestyle',
      featured: false
    },
    {
      id: 'ansiedade',
      name: { pt: 'Ansiedade', es: 'Ansiedad', en: 'Anxiety' },
      description: { pt: 'Suplementos para controlar ansiedade', es: 'Suplementos para controlar ansiedad', en: 'Supplements to control anxiety' },
      icon: '🧘',
      color: 'from-blue-500 to-indigo-600',
      category: 'health',
      featured: false
    },
    {
      id: 'fadiga',
      name: { pt: 'Fadiga', es: 'Fatiga', en: 'Fatigue' },
      description: { pt: 'Produtos para combater fadiga', es: 'Productos para combatir fatiga', en: 'Products to combat fatigue' },
      icon: '😴',
      color: 'from-yellow-500 to-amber-600',
      category: 'health',
      featured: false
    },
    {
      id: 'cozinhando-saudavel',
      name: { pt: 'Cozinhando Saudável', es: 'Cocinando Saludable', en: 'Healthy Cooking' },
      description: { pt: 'Temperos, óleos, sal, frigideiras', es: 'Especias, aceites, sal, sartenes', en: 'Spices, oils, salt, pans' },
      icon: '👨‍🍳',
      color: 'from-orange-500 to-red-600',
      category: 'lifestyle',
      featured: false
    }
  ]

  const filteredCategories = productCategories.filter(category => {
    const matchesSearch = category.name[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description[language].toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <main style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '1rem 0',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem'
          }}>
            {/* Logo */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 900,
                fontSize: '1.2rem'
              }}>
                M
              </div>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                MeuPortalFit
              </span>
            </div>

            {/* Navegação */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem'
            }}>
              <Link href="/analise" style={{ textDecoration: 'none' }}>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.2rem',
                  background: 'transparent',
                  color: '#6b7280',
                  border: '1px solid #e5e7eb',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}>
                  <span>🧠</span>
                  <span>Análise IA</span>
                </button>
              </Link>

              <Link href="/produtos" style={{ textDecoration: 'none' }}>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.2rem',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  color: 'white',
                  border: '1px solid transparent',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}>
                  <span>🛍️</span>
                  <span>Produtos</span>
                </button>
              </Link>

              <Link href="/suporte" style={{ textDecoration: 'none' }}>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.2rem',
                  background: 'transparent',
                  color: '#6b7280',
                  border: '1px solid #e5e7eb',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}>
                  <span>💬</span>
                  <span>Suporte</span>
                </button>
              </Link>
            </div>

            {/* Idioma */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem'
            }}>
              <span style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: 500 }}>Idioma:</span>
              <div style={{ display: 'flex', gap: '0.3rem' }}>
                {[
                  { code: 'pt' as const, flag: '🇧🇷', label: 'PT' },
                  { code: 'es' as const, flag: '🇪🇸', label: 'ES' },
                  { code: 'en' as const, flag: '🇺🇸', label: 'EN' }
                ].map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      padding: '0.4rem 0.8rem',
                      background: language === lang.code ? 'linear-gradient(135deg, #22c55e, #3b82f6)' : 'transparent',
                      color: language === lang.code ? 'white' : '#6b7280',
                      border: language === lang.code ? 'none' : '1px solid #e5e7eb',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: language === lang.code ? 600 : 400
                    }}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

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
              <div key={category.id} style={{
                background: 'white',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                border: '2px solid #f3f4f6',
                position: 'relative'
              }}>
                {/* Featured Badge */}
                {category.featured && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                    color: 'white',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '15px',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}>
                    ⭐ Destaque
                  </div>
                )}

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
                      {category.name[language]}
                    </h3>
                    <p style={{
                      color: '#6b7280',
                      fontSize: '0.9rem',
                      lineHeight: 1.5
                    }}>
                      {category.description[language]}
                    </p>
                  </div>
                </div>

                {/* Botão para Ver Produtos */}
                <Link href={`/produtos/${category.id}`} style={{ textDecoration: 'none' }}>
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
