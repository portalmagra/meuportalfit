'use client'

import { useState } from 'react'
import Link from 'next/link'

type Language = 'pt' | 'es' | 'en'

const content = {
  pageTitle: { pt: 'Shot Afrodisíaco', es: 'Shot Afrodisíaco', en: 'Aphrodisiac Shot' },
  heroTitle: { 
    pt: 'Shot Afrodisíaco - Energia Sexual Natural', 
    es: 'Shot Afrodisíaco - Energía Sexual Natural', 
    en: 'Aphrodisiac Shot - Natural Sexual Energy' 
  },
  heroSubtitle: { 
    pt: 'Suplementos naturais para aumentar libido e energia sexual', 
    es: 'Suplementos naturales para aumentar libido y energía sexual', 
    en: 'Natural supplements to increase libido and sexual energy' 
  },
  
  // Kits
  kitsTitle: { pt: 'Kits Estratégicos', es: 'Kits Estratégicos', en: 'Strategic Kits' },
  kitWeekly: { pt: 'Kit Semanal', es: 'Kit Semanal', en: 'Weekly Kit' },
  kitMonthly: { pt: 'Kit Mensal', es: 'Kit Mensal', en: 'Monthly Kit' },
  kitPremium: { pt: 'Kit Premium', es: 'Kit Premium', en: 'Premium Kit' },
  
  // Produtos Individuais
  productsTitle: { pt: 'Produtos Individuais', es: 'Productos Individuales', en: 'Individual Products' },
  viewKit: { pt: 'Ver Kit', es: 'Ver Kit', en: 'View Kit' },
  addToCart: { pt: 'Adicionar ao Carrinho', es: 'Agregar al Carrito', en: 'Add to Cart' },
  
  // Footer
  footerText: { 
    pt: 'Produtos selecionados para brasileiros nos EUA', 
    es: 'Productos seleccionados para latinos en USA', 
    en: 'Products selected for Brazilians in the USA' 
  }
}

// Kits Estratégicos
const strategicKits = [
  {
    id: 'kit-semanal',
    name: { pt: 'Kit Semanal', es: 'Kit Semanal', en: 'Weekly Kit' },
    description: { pt: '7 dias de suplementos essenciais para energia sexual', es: '7 días de suplementos esenciales para energía sexual', en: '7 days of essential supplements for sexual energy' },
    price: '$29.99',
    originalPrice: '$45.99',
    savings: '35% OFF',
    color: '#22c55e',
    products: ['Tribulus Terrestris', 'Maca Peruana', 'Vitamina D3', 'Zinco']
  },
  {
    id: 'kit-mensal',
    name: { pt: 'Kit Mensal', es: 'Kit Mensal', en: 'Monthly Kit' },
    description: { pt: '30 dias de suplementação completa para libido', es: '30 días de suplementación completa para libido', en: '30 days of complete supplementation for libido' },
    price: '$89.99',
    originalPrice: '$129.99',
    savings: '31% OFF',
    color: '#3b82f6',
    products: ['Tribulus Terrestris', 'Maca Peruana', 'Vitamina D3', 'Zinco', 'Ashwagandha', 'Ginseng Coreano', 'Ômega 3', 'Magnésio']
  },
  {
    id: 'kit-premium',
    name: { pt: 'Kit Premium', es: 'Kit Premium', en: 'Premium Kit' },
    description: { pt: '90 dias de transformação sexual completa', es: '90 días de transformación sexual completa', en: '90 days of complete sexual transformation' },
    price: '$149.99',
    originalPrice: '$249.99',
    savings: '40% OFF',
    color: '#8b5cf6',
    products: ['Tribulus Terrestris', 'Maca Peruana', 'Vitamina D3', 'Zinco', 'Ashwagandha', 'Ginseng Coreano', 'Ômega 3', 'Magnésio', 'L-Arginina', 'L-Carnitina', 'Vitamina B6', 'Selênio']
  }
]

// Produtos Individuais
const individualProducts = [
  {
    id: 'tribulus-terrestris',
    name: { pt: 'Tribulus Terrestris', es: 'Tribulus Terrestris', en: 'Tribulus Terrestris' },
    description: { pt: 'Aumenta naturalmente os níveis de testosterona', es: 'Aumenta naturalmente los niveles de testosterona', en: 'Naturally increases testosterone levels' },
    price: '$19.99',
    rating: 4.8,
    reviews: 1247,
    image: '🌿',
    benefits: ['Aumenta libido', 'Mais energia', 'Melhora performance']
  },
  {
    id: 'maca-peruana',
    name: { pt: 'Maca Peruana', es: 'Maca Peruana', en: 'Peruvian Maca' },
    description: { pt: 'Superalimento andino para energia e vitalidade', es: 'Superalimento andino para energía y vitalidad', en: 'Andean superfood for energy and vitality' },
    price: '$24.99',
    rating: 4.7,
    reviews: 892,
    image: '🥔',
    benefits: ['Energia natural', 'Vitalidade', 'Equilíbrio hormonal']
  },
  {
    id: 'ashwagandha',
    name: { pt: 'Ashwagandha', es: 'Ashwagandha', en: 'Ashwagandha' },
    description: { pt: 'Adaptógeno indiano para redução de estresse', es: 'Adaptógeno indio para reducción del estrés', en: 'Indian adaptogen for stress reduction' },
    price: '$18.99',
    rating: 4.6,
    reviews: 1563,
    image: '🌱',
    benefits: ['Reduz estresse', 'Melhora sono', 'Aumenta energia']
  }
]

export default function ShotAfrodisiacoPage() {
  const [language, setLanguage] = useState<Language>('pt')
  const [activeTab, setActiveTab] = useState<'kits' | 'products'>('kits')

  const t = (key: keyof typeof content) => content[key][language]

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #22c55e, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: #22c55e !important;
        }
        
        .kit-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }
        
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }
        
        /* Mobile-First Responsive Design */
        @media (max-width: 768px) {
          .header-nav {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem 0;
          }
          
          .nav-buttons {
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.8rem;
          }
          
          .nav-buttons button {
            padding: 0.5rem 1rem !important;
            font-size: 0.8rem !important;
          }
          
          .hero-title {
            font-size: clamp(1.8rem, 6vw, 2.5rem) !important;
            line-height: 1.2 !important;
          }
          
          .tab-buttons {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .tab-buttons button {
            width: 100%;
          }
        }
      `}</style>

      <main style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Header Unificado */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '1rem 0',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 1000
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
            }} className="header-nav">
              {/* Logo MeuPortalFit */}
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
              }} className="nav-buttons">
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
                    fontWeight: 500,
                    transition: 'all 0.3s ease'
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
                    fontWeight: 600,
                    transition: 'all 0.3s ease'
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
                    fontWeight: 500,
                    transition: 'all 0.3s ease'
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
                    { code: 'pt' as Language, flag: '🇧🇷', label: 'PT' },
                    { code: 'es' as Language, flag: '🇪🇸', label: 'ES' },
                    { code: 'en' as Language, flag: '🇺🇸', label: 'EN' }
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
                        fontWeight: language === lang.code ? 600 : 400,
                        transition: 'all 0.3s ease'
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
          background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)',
          padding: '4rem 0',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ec4899, #be185d)',
            filter: 'blur(40px)',
            opacity: 0.3,
            animation: 'float 8s ease-in-out infinite',
            zIndex: 1
          }}></div>

          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem',
            position: 'relative',
            zIndex: 10,
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              color: '#1f2937'
            }} className="hero-title">
              {t('heroTitle')}
            </h1>

            <p style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              marginBottom: '2rem',
              color: '#6b7280',
              maxWidth: '800px',
              margin: '0 auto 2rem',
              lineHeight: 1.6
            }}>
              {t('heroSubtitle')}
            </p>

            {/* Breadcrumb */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem',
              color: '#6b7280'
            }}>
              <Link href="/produtos" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                Produtos
              </Link>
              <span>→</span>
              <span style={{ color: '#1f2937', fontWeight: 600 }}>
                {t('pageTitle')}
              </span>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section style={{ background: 'white', padding: '2rem 0' }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            {/* Tab Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '3rem',
              flexWrap: 'wrap'
            }} className="tab-buttons">
              <button
                onClick={() => setActiveTab('kits')}
                style={{
                  padding: '1rem 2rem',
                  background: activeTab === 'kits' ? 'linear-gradient(135deg, #ec4899, #be185d)' : 'transparent',
                  color: activeTab === 'kits' ? 'white' : '#6b7280',
                  border: `2px solid ${activeTab === 'kits' ? 'transparent' : '#ec4899'}`,
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 600,
                  transition: 'all 0.3s ease'
                }}
              >
                🎯 {t('kitsTitle')}
              </button>
              <button
                onClick={() => setActiveTab('products')}
                style={{
                  padding: '1rem 2rem',
                  background: activeTab === 'products' ? 'linear-gradient(135deg, #ec4899, #be185d)' : 'transparent',
                  color: activeTab === 'products' ? 'white' : '#6b7280',
                  border: `2px solid ${activeTab === 'products' ? 'transparent' : '#ec4899'}`,
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 600,
                  transition: 'all 0.3s ease'
                }}
              >
                🛍️ {t('productsTitle')}
              </button>
            </div>

            {/* Kits Tab */}
            {activeTab === 'kits' && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '2rem'
              }}>
                {strategicKits.map(kit => (
                  <div key={kit.id} style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '2rem',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    border: '2px solid #f3f4f6',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }} className="kit-card">
                    {/* Savings Badge */}
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
                      {kit.savings}
                    </div>

                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: '#1f2937',
                      marginBottom: '1rem'
                    }}>
                      {kit.name[language]}
                    </h3>

                    <p style={{
                      color: '#6b7280',
                      fontSize: '0.9rem',
                      lineHeight: 1.5,
                      marginBottom: '1.5rem'
                    }}>
                      {kit.description[language]}
                    </p>

                    {/* Products List */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: '#374151',
                        marginBottom: '0.8rem'
                      }}>
                        📦 Produtos Inclusos:
                      </h4>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem'
                      }}>
                        {kit.products.map((product, index) => (
                          <span key={index} style={{
                            background: '#f3f4f6',
                            color: '#374151',
                            padding: '0.3rem 0.6rem',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: 500
                          }}>
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1.5rem'
                    }}>
                      <span style={{
                        fontSize: '2rem',
                        fontWeight: 900,
                        color: kit.color
                      }}>
                        {kit.price}
                      </span>
                      <span style={{
                        fontSize: '1.1rem',
                        color: '#9ca3af',
                        textDecoration: 'line-through'
                      }}>
                        {kit.originalPrice}
                      </span>
                    </div>

                    {/* CTA Button */}
                    <a
                      href={`https://www.amazon.com/s?k=${encodeURIComponent('shot afrodisiaco suplementos')}&tag=meuportalfit-20`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      <button style={{
                        width: '100%',
                        padding: '1rem',
                        background: `linear-gradient(135deg, ${kit.color})`,
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: 600,
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}>
                        <span>🛒</span>
                        <span>{t('viewKit')}</span>
                        <span>→</span>
                      </button>
                    </a>
                  </div>
                ))}
              </div>
            )}

            {/* Products Tab */}
            {activeTab === 'products' && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
              }}>
                {individualProducts.map(product => (
                  <div key={product.id} style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '2rem',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    border: '2px solid #f3f4f6',
                    transition: 'all 0.3s ease'
                  }} className="product-card">
                    {/* Product Icon */}
                    <div style={{
                      fontSize: '4rem',
                      textAlign: 'center',
                      marginBottom: '1rem'
                    }}>
                      {product.image}
                    </div>

                    <h3 style={{
                      fontSize: '1.3rem',
                      fontWeight: 700,
                      color: '#1f2937',
                      marginBottom: '0.8rem',
                      textAlign: 'center'
                    }}>
                      {product.name[language]}
                    </h3>

                    <p style={{
                      color: '#6b7280',
                      fontSize: '0.9rem',
                      lineHeight: 1.5,
                      marginBottom: '1.5rem',
                      textAlign: 'center'
                    }}>
                      {product.description[language]}
                    </p>

                    {/* Benefits */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: '#374151',
                        marginBottom: '0.8rem'
                      }}>
                        ✨ Benefícios:
                      </h4>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4rem'
                      }}>
                        {product.benefits.map((benefit, index) => (
                          <span key={index} style={{
                            color: '#059669',
                            fontSize: '0.8rem',
                            fontWeight: 500
                          }}>
                            ✓ {benefit}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Rating */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      marginBottom: '1rem'
                    }}>
                      <span style={{ color: '#fbbf24' }}>⭐</span>
                      <span style={{ fontWeight: 600, color: '#374151' }}>
                        {product.rating}
                      </span>
                      <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                        ({product.reviews} avaliações)
                      </span>
                    </div>

                    {/* Price */}
                    <div style={{
                      textAlign: 'center',
                      marginBottom: '1.5rem'
                    }}>
                      <span style={{
                        fontSize: '1.8rem',
                        fontWeight: 900,
                        color: '#ec4899'
                      }}>
                        {product.price}
                      </span>
                    </div>

                    {/* CTA Button */}
                    <a
                      href={`https://www.amazon.com/s?k=${encodeURIComponent(product.name[language])}&tag=meuportalfit-20`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      <button style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'linear-gradient(135deg, #ec4899, #be185d)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: 600,
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}>
                        <span>🛒</span>
                        <span>{t('addToCart')}</span>
                        <span>→</span>
                      </button>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          background: '#1f2937',
          color: 'white',
          padding: '2rem 0',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
              {t('footerText')}
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}
