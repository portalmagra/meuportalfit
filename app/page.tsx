'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from './components/Header'

type Language = 'pt' | 'es' | 'en'

const content = {
  headline1: { pt: 'Compre Certo e Economize', es: 'Compra Bien y Ahorra', en: 'Buy Right and Save' },
  headline2: { pt: 'Descubra os Produtos', es: 'Descubre los Productos', en: 'Discover the Products' },
  headline3: { pt: 'Ideais para Você nos EUA', es: 'Ideales para Ti en USA', en: 'Ideal for You in the USA' },
  selectLanguage: { pt: 'Escolha seu idioma:', es: 'Elige tu idioma:', en: 'Choose your language:' },
  trustText: { pt: '+2.847 brasileiros confiam no MeuPortalFit', es: '+2.847 brasileños confían en MeuPortalFit', en: '+2.847 Brazilians trust MeuPortalFit' },
  
  // Seção "Como Funciona"
  howItWorksTitle: { pt: 'Como o MeuPortalFit Funciona', es: 'Cómo Funciona MeuPortalFit', en: 'How MeuPortalFit Works' },
  step1Title: { pt: 'Análise Personalizada', es: 'Análisis Personalizado', en: 'Personalized Analysis' },
  step1Desc: { 
    pt: '8 perguntas estratégicas sobre suas necessidades, estilo de vida e objetivos de wellness nos EUA.',
    es: '8 preguntas estratégicas sobre tus necesidades, estilo de vida y objetivos de bienestar en USA.',
    en: '8 strategic questions about your needs, lifestyle and wellness goals in the USA.'
  },
  step2Title: { pt: 'IA Analisa seu Perfil', es: 'IA Analiza tu Perfil', en: 'AI Analyzes Your Profile' },
  step2Desc: { 
    pt: 'Nossa inteligência artificial avançada processa suas respostas e identifica seu perfil único de wellness.',
    es: 'Nuestra inteligencia artificial avanzada procesa tus respuestas e identifica tu perfil único de bienestar.',
    en: 'Our advanced artificial intelligence processes your answers and identifies your unique wellness profile.'
  },
  step3Title: { pt: 'Receba Recomendações', es: 'Recibe Recomendaciones', en: 'Get Recommendations' },
  step3Desc: { 
    pt: 'Top 3-5 produtos Amazon personalizados com explicação detalhada do porquê são ideais para você.',
    es: 'Top 3-5 productos Amazon personalizados con explicación detallada de por qué son ideales para ti.',
    en: 'Top 3-5 personalized Amazon products with detailed explanation of why they are ideal for you.'
  },
  
  // Seção de Depoimentos
  testimonialsTitle: { pt: 'O que nossos usuários dizem', es: 'Lo que dicen nuestros usuarios', en: 'What our users say' },
  testimonials: {
    pt: [
      { initials: 'MR', name: 'Maria Rodriguez', location: 'Orlando, FL', text: '"Incrível! Encontrei exatamente os suplementos que precisava. A IA acertou em cheio minhas necessidades."' },
      { initials: 'JS', name: 'João Silva', location: 'Miami, FL', text: '"A análise da IA é impressionante. Finalmente achei o que funciona para mim!"' },
      { initials: 'AR', name: 'Ana Rodrigues', location: 'New York, NY', text: '"Como enfermeira, fiquei impressionada com a precisão das recomendações."' }
    ],
    es: [
      { initials: 'CR', name: 'Carmen Rodriguez', location: 'Los Angeles, CA', text: '"¡Increíble! Encontré exactamente los productos que mi familia necesitaba."' },
      { initials: 'MG', name: 'Miguel González', location: 'Houston, TX', text: '"El análisis cultural es perfecto. Realmente entienden nuestras necesidades."' },
      { initials: 'LM', name: 'Lucia Morales', location: 'Phoenix, AZ', text: '"Como madre, me encanta que piensen en toda la familia."' }
    ],
    en: [
      { initials: 'JS', name: 'Jennifer Smith', location: 'San Francisco, CA', text: '"The AI recommendations are spot-on. Science-backed products I can trust."' },
      { initials: 'MJ', name: 'Michael Johnson', location: 'Denver, CO', text: '"Finally, a quiz that understands my performance goals. Excellent results!"' },
      { initials: 'SR', name: 'Sarah Roberts', location: 'Seattle, WA', text: '"Love how thorough the analysis is. Found products I never knew I needed."' }
    ]
  },
  
  // Seção Final CTA
  finalCtaTitle: { 
    pt: 'Pronto para Descobrir os\nProdutos Ideais para Você?',
    es: 'Listo para Descubrir los\nProductos Ideales para Ti?',
    en: 'Ready to Discover the\nPerfect Products for You?'
  },
  finalCtaText: { 
    pt: 'Junte-se a milhares que já descobriram os produtos de saúde perfeitos com nosso quiz inteligente.',
    es: 'Únete a miles que ya descubrieron los productos de salud perfectos con nuestro quiz inteligente.',
    en: 'Join thousands who have already discovered perfect health products with our smart quiz.'
  },
  finalCtaButton: { pt: 'Descobrir Meus Produtos Agora', es: 'Descubrir Mis Productos Ahora', en: 'Discover My Products Now' },
  finalBenefits: { 
    pt: '✅ 100% Gratuito • ⚡ 2-3 Minutos • 🔒 Dados Seguros',
    es: '✅ 100% Gratis • ⚡ 2-3 Minutos • 🔒 Datos Seguros',
    en: '✅ 100% Free • ⚡ 2-3 Minutes • 🔒 Secure Data'
  },
  
  // Estatísticas
  stats: {
    pt: [
      { number: '2.847', label: 'Brasileiros Atendidos' },
      { number: '4.9/5', label: 'Avaliação Média' },
      { number: '$2M+', label: 'Economizado pelos Usuários' },
      { number: '1.243', label: 'Avaliações 5 Estrelas' }
    ],
    es: [
      { number: '8.500', label: 'Latinos Atendidos' },
      { number: '4.8/5', label: 'Calificación Promedio' },
      { number: '$5M+', label: 'Ahorrado por Usuarios' },
      { number: '3.200', label: 'Reseñas 5 Estrellas' }
    ],
    en: [
      { number: '12.000', label: 'People Served' },
      { number: '4.9/5', label: 'Average Rating' },
      { number: '$8M+', label: 'Saved by Users' },
      { number: '4.800', label: '5-Star Reviews' }
    ]
  },
  
  // Footer
  footerTagline: { pt: 'Seu portal personalizado para wellness', es: 'Tu portal personalizado para bienestar', en: 'Your personalized wellness portal' },
  footerCopyright: { 
    pt: '© 2025 Portal Solutions LLC. Todos os direitos reservados.',
    es: '© 2025 Portal Solutions LLC. Todos los derechos reservados.',
    en: '© 2025 Portal Solutions LLC. All rights reserved.'
  }
}

export default function HomePage() {
  const [language, setLanguage] = useState<Language>('pt')
  const t = (key: keyof typeof content) => content[key]?.[language] || content[key]?.pt || key

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) scale(1); 
          }
          50% { 
            transform: translateY(-20px) scale(1.1); 
          }
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #22c55e, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: #22c55e !important;
        }
        
        .stat-number {
          background: linear-gradient(135deg, #22c55e, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: #22c55e !important;
        }
        
        .footer-brand {
          background: linear-gradient(135deg, #22c55e, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: #22c55e !important;
        }
      `}</style>

      <main style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Header Unificado */}
        <Header language={language} onLanguageChange={setLanguage} />

        {/* Hero Section - TRÊS TÓPICOS GIGANTES E CHAMATIVOS */}
        <section style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #f0f9ff 100%)',
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 0',
          overflow: 'hidden'
        }}>
          {/* Animated Blobs */}
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
            filter: 'blur(40px)',
            opacity: 0.3,
            animation: 'float 8s ease-in-out infinite',
            zIndex: 1
          }}></div>
          <div style={{
            position: 'absolute',
            top: '20%',
            right: '15%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
            filter: 'blur(40px)',
            opacity: 0.3,
            animation: 'float 8s ease-in-out infinite 2s',
            zIndex: 1
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '15%',
            left: '30%',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #06b6d4, #22c55e)',
            filter: 'blur(40px)',
            opacity: 0.3,
            animation: 'float 8s ease-in-out infinite 4s',
            zIndex: 1
          }}></div>

          <div style={{
            maxWidth: '1200px',
            width: '100%',
            margin: '0 auto',
            padding: '0 2rem',
            position: 'relative',
            zIndex: 10,
            textAlign: 'center'
          }}>
            {/* Trust Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '50px',
              padding: '0.8rem 1.5rem',
              marginBottom: '2rem',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              fontWeight: 600,
              color: '#1f2937',
              gap: '0.5rem',
              fontSize: '0.85rem'
            }}>
              <span>🛡️</span>
              <span>{t('trustText')}</span>
              <span>⭐⭐⭐⭐⭐</span>
            </div>

            {/* Main Title */}
            <div style={{ marginBottom: '3rem' }}>
              <h1 style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                color: '#1f2937',
                marginBottom: '0'
              }}>
                <div className="gradient-text" style={{
                  display: 'inline-block',
                  marginBottom: '0.5rem'
                }}>{t('headline1')}</div>
                <div style={{ marginBottom: '0.5rem' }}>{t('headline2')}</div>
                <div className="gradient-text" style={{
                  display: 'inline-block'
                }}>{t('headline3')}</div>
              </h1>
            </div>

            {/* TRÊS TÓPICOS GIGANTES E CHAMATIVOS */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              maxWidth: '1000px',
              margin: '0 auto 2rem'
            }}>
              {/* 1. ANÁLISE IA - VERDE VIBRANTE */}
              <Link href="/analise" style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  borderRadius: '25px',
                  padding: '2.5rem 2rem',
                  textAlign: 'center',
                  color: 'white',
                  boxShadow: '0 20px 40px rgba(34, 197, 94, 0.3)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '3px solid rgba(255, 255, 255, 0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(34, 197, 94, 0.4)'
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(34, 197, 94, 0.3)'
                }}>
                  <div style={{
                    fontSize: '4rem',
                    marginBottom: '1rem',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                  }}>🧠</div>
                  <h2 style={{
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    marginBottom: '1rem',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}>Análise IA</h2>
                  <p style={{
                    fontSize: '1rem',
                    opacity: 0.95,
                    lineHeight: 1.5,
                    marginBottom: '1.5rem'
                  }}>
                    Quiz personalizado que analisa suas necessidades e recomenda produtos específicos
                  </p>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '20px',
                    padding: '0.8rem 1.5rem',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    backdropFilter: 'blur(10px)'
                  }}>
                    🚀 COMEÇAR AGORA
                  </div>
                </div>
              </Link>

              {/* 2. PRODUTOS - AZUL VIBRANTE */}
              <Link href="/produtos" style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  borderRadius: '25px',
                  padding: '2.5rem 2rem',
                  textAlign: 'center',
                  color: 'white',
                  boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '3px solid rgba(255, 255, 255, 0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(59, 130, 246, 0.4)'
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.3)'
                }}>
                  <div style={{
                    fontSize: '4rem',
                    marginBottom: '1rem',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                  }}>🛍️</div>
                  <h2 style={{
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    marginBottom: '1rem',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}>Produtos por Área</h2>
                  <p style={{
                    fontSize: '1rem',
                    opacity: 0.95,
                    lineHeight: 1.5,
                    marginBottom: '1.5rem'
                  }}>
                    14 categorias organizadas por necessidade: energia, sono, imunidade e muito mais
                  </p>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '20px',
                    padding: '0.8rem 1.5rem',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    backdropFilter: 'blur(10px)'
                  }}>
                    🔍 VER PRODUTOS
                  </div>
                </div>
              </Link>

              {/* 3. SUPORTE - ROXO VIBRANTE */}
              <Link href="/suporte" style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  borderRadius: '25px',
                  padding: '2.5rem 2rem',
                  textAlign: 'center',
                  color: 'white',
                  boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '3px solid rgba(255, 255, 255, 0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(139, 92, 246, 0.4)'
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.3)'
                }}>
                  <div style={{
                    fontSize: '4rem',
                    marginBottom: '1rem',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                  }}>💬</div>
                  <h2 style={{
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    marginBottom: '1rem',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}>Suporte Personalizado</h2>
                  <p style={{
                    fontSize: '1rem',
                    opacity: 0.95,
                    lineHeight: 1.5,
                    marginBottom: '1.5rem'
                  }}>
                    Consultas gratuitas em português com especialistas para suas necessidades específicas
                  </p>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '20px',
                    padding: '0.8rem 1.5rem',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    backdropFilter: 'blur(10px)'
                  }}>
                    📞 AGENDAR CONSULTA
                  </div>
                </div>
              </Link>
            </div>

            {/* Descrição Pequena */}
            <p style={{
              color: '#6b7280',
              fontSize: '0.9rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {/* smallText content removed as per new_code */}
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section style={{ background: 'white', padding: '5rem 0' }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 900,
              marginBottom: '3rem',
              color: '#1f2937'
            }}>
              Como o <span className="gradient-text">MeuPortalFit</span> Funciona
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              maxWidth: '900px',
              margin: '0 auto'
            }}>
                              {[
                  { number: '1', titleKey: 'step1Title' as keyof typeof content, descKey: 'step1Desc' as keyof typeof content },
                  { number: '2', titleKey: 'step2Title' as keyof typeof content, descKey: 'step2Desc' as keyof typeof content },
                  { number: '3', titleKey: 'step3Title' as keyof typeof content, descKey: 'step3Desc' as keyof typeof content }
                ].map((step, i) => (
                  <div key={i} style={{
                    textAlign: 'center',
                    padding: '2rem 1rem',
                    borderRadius: '20px',
                    background: '#f9fafb',
                    border: '2px solid transparent'
                  }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                      color: 'white',
                      borderRadius: '50%',
                      fontSize: '1.5rem',
                      fontWeight: 900,
                      marginBottom: '1rem'
                    }}>
                      {step.number}
                    </div>
                    <h3 style={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      marginBottom: '0.8rem',
                      color: '#1f2937'
                    }}>
                      {t(step.titleKey)}
                    </h3>
                    <p style={{ color: '#6b7280', lineHeight: 1.5, fontSize: '0.9rem' }}>
                      {t(step.descKey)}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ background: '#f9fafb', padding: '5rem 0' }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 900,
              marginBottom: '3rem',
              color: '#1f2937'
            }}>
              O que nossos <span className="gradient-text">usuários</span> dizem
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem'
            }}>
              {/* Depoimentos dos usuários */}
              <div style={{
                background: 'white',
                borderRadius: '15px',
                padding: '2rem',
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <p style={{
                  fontSize: '1rem',
                  color: '#4b5563',
                  lineHeight: 1.6,
                  marginBottom: '1rem'
                }}>
                  "Incrível! Encontrei exatamente os suplementos que precisava. A IA acertou em cheio minhas necessidades."
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: '#1f2937'
                }}>
                  Maria Rodriguez
                </p>
                <p style={{
                  fontSize: '0.8rem',
                  color: '#6b7280'
                }}>
                  Orlando, FL
                </p>
              </div>
            </div>

            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.5rem',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {/* Estatísticas */}
              <div style={{
                textAlign: 'center',
                padding: '1.5rem 1rem',
                borderRadius: '15px',
                background: '#f0fdf4',
                border: '1px solid #e0f2e9'
              }}>
                <p style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: '#22c55e',
                  marginBottom: '0.5rem'
                }}>
                  2.847
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#6b7280'
                }}>
                  Brasileiros Atendidos
                </p>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '1.5rem 1rem',
                borderRadius: '15px',
                background: '#f0fdf4',
                border: '1px solid #e0f2e9'
              }}>
                <p style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: '#22c55e',
                  marginBottom: '0.5rem'
                }}>
                  4.9/5
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#6b7280'
                }}>
                  Avaliação Média
                </p>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '1.5rem 1rem',
                borderRadius: '15px',
                background: '#f0fdf4',
                border: '1px solid #e0f2e9'
              }}>
                <p style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: '#22c55e',
                  marginBottom: '0.5rem'
                }}>
                  $2M+
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#6b7280'
                }}>
                  Economizado pelos Usuários
                </p>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '1.5rem 1rem',
                borderRadius: '15px',
                background: '#f0fdf4',
                border: '1px solid #e0f2e9'
              }}>
                <p style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: '#22c55e',
                  marginBottom: '0.5rem'
                }}>
                  1.243
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#6b7280'
                }}>
                  Avaliações 5 Estrelas
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section style={{
          background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
          color: 'white',
          padding: '5rem 0',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 900,
              marginBottom: '1.5rem',
              lineHeight: 1.2,
              whiteSpace: 'pre-line'
            }}>
              {t('finalCtaTitle')}
            </h2>
            <p style={{
              fontSize: '1.1rem',
              marginBottom: '2.5rem',
              opacity: 0.95,
              lineHeight: 1.5
            }}>
              {t('finalCtaText')}
            </p>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <Link href="/analise" style={{ textDecoration: 'none' }}>
                <button style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '1rem',
                  background: 'white',
                  color: '#22c55e',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  padding: '1.25rem 2.5rem',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                }}>
                  <span>🚀</span>
                  {t('finalCtaButton')}
                </button>
              </Link>
            </div>
            
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '0.9rem'
            }}>
              {t('finalBenefits')}
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          background: '#1f2937',
          color: 'white',
          padding: '2.5rem 0',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            <div className="footer-brand" style={{
              fontSize: '1.8rem',
              fontWeight: 900,
              marginBottom: '0.5rem'
            }}>
              MeuPortalFit
            </div>
            <p style={{ color: '#9ca3af', marginBottom: '1rem', fontSize: '0.9rem' }}>
              {t('footerTagline')}
            </p>
            <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>
              {t('footerCopyright')}
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
