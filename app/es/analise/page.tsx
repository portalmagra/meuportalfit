'use client'

import { useState, useEffect } from 'react'

export default function SpanishAnalysisPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <main style={{ position: 'relative', overflow: 'hidden', background: 'white' }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '1rem 0',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexShrink: 0 }}>
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
                fontWeight: '900',
                background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                MeuPortalFit
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              {/* Language Flags */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <a href="/analise" style={{ textDecoration: 'none' }}>
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0.4rem 0.8rem',
                    background: 'transparent',
                    color: '#6b7280',
                    border: '1px solid #e5e7eb',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '400',
                    transition: 'all 0.3s ease'
                  }}
                  title="Português"
                >
                  <span style={{ fontSize: '1.1rem' }}>🇧🇷</span>
                  <span style={{ display: isMobile ? 'none' : 'inline' }}>PT</span>
                </button>
                </a>
                
                <a href="/en/analise" style={{ textDecoration: 'none' }}>
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0.4rem 0.8rem',
                    background: 'transparent',
                    color: '#6b7280',
                    border: '1px solid #e5e7eb',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '400',
                    transition: 'all 0.3s ease'
                  }}
                  title="English"
                >
                  <span style={{ fontSize: '1.1rem' }}>🇺🇸</span>
                  <span style={{ display: isMobile ? 'none' : 'inline' }}>EN</span>
                </button>
                </a>
              
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.4rem 0.8rem',
                  background: '#f0fdf4',
                  color: '#22c55e',
                  border: '2px solid #22c55e',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                title="Español"
              >
                <span style={{ fontSize: '1.1rem' }}>🇪🇸</span>
                <span style={{ display: isMobile ? 'none' : 'inline' }}>ES</span>
              </button>
            </div>

            {/* Contact Button */}
            <a href="https://wa.me/17862535032?text=¡Hola! Me gustaría saber más sobre MeuPortalFit." target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1.2rem',
                background: 'linear-gradient(135deg, #25d366, #128c7e)',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                <span>💬</span>
                <span style={{ display: isMobile ? 'none' : 'inline' }}>Contáctanos</span>
              </button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #f0f9ff 100%)',
        padding: isMobile ? '3rem 1rem' : '5rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: isMobile ? '2rem' : '3rem',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem'
          }}>
            Evaluación de Bienestar con IA
          </h1>
          
          <p style={{
            fontSize: isMobile ? '1.1rem' : '1.3rem',
            color: '#6b7280',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Obtén tu evaluación personalizada de bienestar impulsada por inteligencia artificial
          </p>

          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <button
              onClick={() => setCurrentStep(2)}
              style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 25px rgba(34, 197, 94, 0.4)'
              }}
            >
              Iniciar Evaluación Gratuita
            </button>
            
            <button
              onClick={() => setCurrentStep(3)}
              style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 25px rgba(245, 158, 11, 0.4)'
              }}
            >
              Ver Productos Recomendados
            </button>
          </div>
        </div>
      </section>

      {/* Content based on step */}
      {currentStep === 2 && (
        <section style={{
          padding: '3rem 2rem',
          background: 'white'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontSize: '2rem',
              color: '#1e293b',
              marginBottom: '1rem',
              fontWeight: 'bold'
            }}>
              Evaluación Gratuita Próximamente
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              marginBottom: '2rem'
            }}>
              Nuestra evaluación gratuita está siendo desarrollada. Explora nuestros productos recomendados para mejorar tu bienestar.
            </p>
            <button
              onClick={() => setCurrentStep(3)}
              style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Ver Productos Recomendados
            </button>
          </div>
        </section>
      )}

      {currentStep === 3 && (
        <section style={{
          padding: '3rem 2rem',
          background: 'white'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontSize: '2rem',
              color: '#1e293b',
              marginBottom: '1rem',
              fontWeight: 'bold'
            }}>
              Productos Recomendados para tu Bienestar
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              marginBottom: '2rem'
            }}>
              Descubre productos seleccionados para mejorar tu salud y bienestar, disponibles en Amazon.
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                background: '#f8fafc',
                padding: '2rem',
                borderRadius: '12px',
                border: '2px solid #e0f2e9'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  color: '#1e293b',
                  marginBottom: '1rem',
                  fontWeight: 'bold'
                }}>
                  Suplementos Vitamínicos
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#64748b',
                  marginBottom: '1rem'
                }}>
                  Vitaminas y minerales esenciales para mantener tu salud en óptimas condiciones.
                </p>
                <a href="https://www.amazon.com/s?k=vitamins+supplements&tag=portalsolutio-20" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <button style={{
                    padding: '0.8rem 1.5rem',
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}>
                    Ver en Amazon
                  </button>
                </a>
              </div>

              <div style={{
                background: '#f8fafc',
                padding: '2rem',
                borderRadius: '12px',
                border: '2px solid #e0f2e9'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  color: '#1e293b',
                  marginBottom: '1rem',
                  fontWeight: 'bold'
                }}>
                  Productos de Bienestar
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#64748b',
                  marginBottom: '1rem'
                }}>
                  Productos naturales para mejorar tu calidad de vida y bienestar general.
                </p>
                <a href="https://www.amazon.com/s?k=wellness+products&tag=portalsolutio-20" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <button style={{
                    padding: '0.8rem 1.5rem',
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}>
                    Ver en Amazon
                  </button>
                </a>
              </div>
            </div>

            <button
              onClick={() => window.location.href = '/analise'}
              style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 25px rgba(34, 197, 94, 0.4)'
              }}
            >
              Hacer Evaluación Personalizada
            </button>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{ background: '#1f2937', color: 'white', padding: '1rem 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
          <p style={{ color: '#9ca3af', fontSize: '0.8rem' }}>
            Evaluación personalizada de bienestar para entusiastas de la salud
          </p>
        </div>
      </footer>
    </main>
  )
}
