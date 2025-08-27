'use client'

import Link from 'next/link'
import { useState } from 'react'

type Language = 'pt' | 'es' | 'en'

const content = {
  selectLanguage: { pt: 'Escolha seu idioma:', es: 'Elige tu idioma:', en: 'Choose your language:' },
  trustBadge: { pt: '+2.847 brasileiros confiam no MeuPortalFit', es: '+8.500 latinos confían en MeuPortalFit', en: '+12.000 people trust MeuPortalFit' },
  headline1: { pt: 'Descubra os Produtos', es: 'Descubre los Productos', en: 'Discover the Products' },
  headline2: { pt: 'de Saúde Ideais para', es: 'de Salud Ideales para', en: 'Perfect for Your Health' },
  headline3: { pt: 'Você nos EUA', es: 'Ti en USA', en: 'Goals in the USA' },
  subtitle: { 
    pt: 'Quiz inteligente personalizado para brasileiros. Nossa IA analisa suas necessidades e recomenda os melhores produtos Amazon com base no seu perfil único.',
    es: 'Quiz inteligente personalizado para latinos. Nuestra IA analiza tus necesidades y recomienda los mejores productos Amazon basados en tu perfil único.',
    en: 'Smart personalized quiz for health-conscious individuals. Our AI analyzes your needs and recommends the best Amazon products based on your unique profile.'
  },
  ctaButton: { pt: 'Fazer Meu Quiz Gratuito', es: 'Hacer Mi Quiz Gratuito', en: 'Take My Free Quiz' },
  smallText: { 
    pt: 'Leva apenas 2-3 minutos • 100% gratuito • Resultado instantâneo',
    es: 'Solo toma 2-3 minutos • 100% gratis • Resultado instantáneo',
    en: 'Takes only 2-3 minutes • 100% free • Instant results'
  },
  howItWorksTitle: { pt: 'Como o MeuPortalFit Funciona', es: 'Cómo Funciona MeuPortalFit', en: 'How MeuPortalFit Works' },
  step1Title: { pt: 'Responda o Quiz', es: 'Responde el Quiz', en: 'Take the Quiz' },
  step1Desc: { 
    pt: '8 perguntas inteligentes sobre suas necessidades, estilo de vida e objetivos de saúde nos EUA.',
    es: '8 preguntas inteligentes sobre tus necesidades, estilo de vida y objetivos de salud en USA.',
    en: '8 smart questions about your needs, lifestyle and health goals in the USA.'
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
  testimonialsTitle: { pt: 'O que nossos usuários dizem', es: 'Lo que dicen nuestros usuarios', en: 'What our users say' },
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
  finalCtaButton: { pt: 'Fazer Meu Quiz Gratuito Agora', es: 'Hacer Mi Quiz Gratuito Ahora', en: 'Take My Free Quiz Now' },
  finalBenefits: { 
    pt: '✅ 100% Gratuito • ⚡ 2-3 Minutos • 🔒 Dados Seguros',
    es: '✅ 100% Gratis • ⚡ 2-3 Minutos • 🔒 Datos Seguros',
    en: '✅ 100% Free • ⚡ 2-3 Minutes • 🔒 Secure Data'
  },
  footerTagline: { pt: 'Seu portal personalizado para wellness', es: 'Tu portal personalizado para bienestar', en: 'Your personalized wellness portal' },
  footerCopyright: { 
    pt: '© 2025 Portal Solutions LLC. Todos os direitos reservados.',
    es: '© 2025 Portal Solutions LLC. Todos los derechos reservados.',
    en: '© 2025 Portal Solutions LLC. All rights reserved.'
  }
}

const testimonials = {
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
}

const stats = {
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
}

export default function HomePage() {
  const [language, setLanguage] = useState<Language>('pt')
  const t = (key: string) => content[key]?.[language] || content[key]?.pt || key

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
        {/* Language Selector Bar */}
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
            padding: '0 2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>{t('selectLanguage')}</span>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { code: 'pt' as Language, flag: '🇧🇷', label: 'Português' },
                { code: 'es' as Language, flag: '🇪🇸', label: 'Español' },
                { code: 'en' as Language, flag: '🇺🇸', label: 'English' }
              ].map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: language === lang.code ? 'linear-gradient(135deg, #22c55e, #3b82f6)' : 'transparent',
                    color: language === lang.code ? 'white' : '#6b7280',
                    border: language === lang.code ? 'none' : '1px solid #e5e7eb',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
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

        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #f0f9ff 100%)',
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 0',
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
              padding: '1rem 2rem',
              marginBottom: '2rem',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              fontWeight: 600,
              color: '#1f2937',
              gap: '0.5rem',
              fontSize: '0.9rem'
            }}>
              <span>🛡️</span>
              <span>{t('trustBadge')}</span>
              <span>⭐⭐⭐⭐⭐</span>
            </div>

            {/* Main Title */}
            <div style={{ marginBottom: '2rem' }}>
              <h1 style={{
                fontSize: 'clamp(2rem, 6vw, 4.5rem)',
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

            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto 3rem',
              fontWeight: 500,
              lineHeight: 1.6
            }}>
              {t('subtitle')}
            </p>

            {/* Main Button */}
            <div style={{ marginBottom: '1.5rem' }}>
              <Link href="/quiz" style={{ textDecoration: 'none' }}>
                <button style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '1rem',
                  background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  padding: '1.25rem 2.5rem',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 30px rgba(34, 197, 94, 0.3)',
                  transform: 'translateY(0)'
                }}>
                  <span>🚀</span>
                  <span>{t('ctaButton')}</span>
                  <span>→</span>
                </button>
              </Link>
            </div>

            <p style={{
              color: '#6b7280',
              fontSize: '0.9rem'
            }}>
              {t('smallText')}
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
                { number: '1', titleKey: 'step1Title', descKey: 'step1Desc' },
                { number: '2', titleKey: 'step2Title', descKey: 'step2Desc' },
                { number: '3', titleKey: 'step3Title', descKey: 'step3Desc' }
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
              {testimonials[language].map((testimonial, i) => (
                <div key={i} style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.9rem'
                    }}>
                      {testimonial.initials}
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 600, color: '#1f2937', fontSize: '0.9rem' }}>
                        {testimonial.name}
                      </div>
                      <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                  <div style={{ color: '#fbbf24', marginBottom: '0.8rem' }}>⭐⭐⭐⭐⭐</div>
                  <p style={{ textAlign: 'left', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    {testimonial.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.5rem',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {stats[language].map((stat, i) => (
                <div key={i} style={{ padding: '1rem' }}>
                  <div className="stat-number" style={{
                    fontSize: '2rem',
                    fontWeight: 900,
                    marginBottom: '0.3rem'
                  }}>
                    {stat.number}
                  </div>
                  <div style={{ color: '#6b7280', fontWeight: 500, fontSize: '0.9rem' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
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
              <Link href="/quiz" style={{ textDecoration: 'none' }}>
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
                  <span>{t('finalCtaButton')}</span>
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
