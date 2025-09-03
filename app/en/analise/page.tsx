'use client'

import { useState, useEffect } from 'react'

export default function EnglishAnalysisPage() {
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
                fontWeight: 900,
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
                title="English"
              >
                <span style={{ fontSize: '1.1rem' }}>🇺🇸</span>
                <span style={{ display: isMobile ? 'none' : 'inline' }}>EN</span>
              </button>
              
              <a href="/es/analise" style={{ textDecoration: 'none' }}>
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
                title="Español"
              >
                <span style={{ fontSize: '1.1rem' }}>🇪🇸</span>
                <span style={{ display: isMobile ? 'none' : 'inline' }}>ES</span>
              </button>
              </a>
            </div>

            {/* Contact Button */}
            <a href="https://wa.me/17862535032?text=Hello! I'd like to know more about MeuPortalFit." target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
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
                <span style={{ display: isMobile ? 'none' : 'inline' }}>Contact Us</span>
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
            AI-Powered Wellness Assessment
          </h1>
          
          <p style={{
            fontSize: isMobile ? '1.1rem' : '1.3rem',
            color: '#6b7280',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Get your personalized wellness evaluation powered by artificial intelligence
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
              Start Free Assessment
            </button>
            
            <button
              onClick={() => setCurrentStep(3)}
              style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 25px rgba(139, 92, 246, 0.4)'
              }}
            >
              Premium Assessment ($49)
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
              Free Assessment Coming Soon
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              marginBottom: '2rem'
            }}>
              Our free assessment is currently being developed. Try our premium assessment for a comprehensive wellness evaluation.
            </p>
            <button
              onClick={() => setCurrentStep(3)}
              style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Try Premium Assessment
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
              Premium Wellness Assessment
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              marginBottom: '2rem'
            }}>
              Get a comprehensive wellness evaluation with personalized recommendations and expert guidance.
            </p>
            
            <div style={{
              background: '#f8fafc',
              padding: '2rem',
              borderRadius: '12px',
              marginBottom: '2rem',
              border: '2px solid #e0f2e9'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                color: '#1e293b',
                marginBottom: '1rem',
                fontWeight: 'bold'
              }}>
                What's Included:
              </h3>
              <ul style={{
                textAlign: 'left',
                fontSize: '1.1rem',
                color: '#374151',
                lineHeight: '1.8'
              }}>
                <li>✅ Comprehensive health questionnaire</li>
                <li>✅ AI-powered personalized analysis</li>
                <li>✅ Custom wellness recommendations</li>
                <li>✅ Product suggestions with Amazon links</li>
                <li>✅ Expert consultation option</li>
                <li>✅ Detailed wellness report</li>
              </ul>
            </div>

            <button
              onClick={() => window.location.href = '/analise'}
              style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 25px rgba(139, 92, 246, 0.4)'
              }}
            >
              Start Premium Assessment - $49
            </button>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{ background: '#1f2937', color: 'white', padding: '1rem 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
          <p style={{ color: '#9ca3af', fontSize: '0.8rem' }}>
            Personalized wellness assessment for health enthusiasts
          </p>
        </div>
      </footer>
    </main>
  )
}
