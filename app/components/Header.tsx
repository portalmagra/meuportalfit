'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Language = 'pt' | 'es' | 'en'

interface HeaderProps {
  language?: Language
  onLanguageChange?: (lang: Language) => void
}

export default function Header({ language = 'pt', onLanguageChange }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  // Detectar se é mobile
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleLanguageChange = (lang: Language) => {
    if (onLanguageChange) {
      onLanguageChange(lang)
    }
  }

  const isActivePage = (path: string) => pathname === path

  return (
    <header style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      padding: isMobile ? '0.5rem 0' : '1rem 0',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '0 1rem' : '0 2rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: isMobile ? '1rem' : '2rem'
        }}>
          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '0.6rem' : '0.8rem',
            flexShrink: 0
          }}>
            <div style={{
              width: isMobile ? '36px' : '40px',
              height: isMobile ? '36px' : '40px',
              background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 900,
              fontSize: isMobile ? '1.1rem' : '1.2rem'
            }}>
              M
            </div>
            <span style={{
              fontSize: isMobile ? '1.3rem' : '1.5rem',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              MeuPortalFit
            </span>
          </div>

          {/* Navegação Principal - Desktop */}
          {!isMobile && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '1rem' : '1.5rem'
            }}>
              <Link href="/analise" style={{ textDecoration: 'none' }}>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: isMobile ? '0.4rem' : '0.5rem',
                  padding: isMobile ? '0.5rem 1rem' : '0.6rem 1.2rem',
                  background: isActivePage('/analise') ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'transparent',
                  color: isActivePage('/analise') ? 'white' : '#6b7280',
                  border: isActivePage('/analise') ? 'none' : '1px solid #e5e7eb',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
                  fontWeight: isActivePage('/analise') ? 600 : 500,
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
                  gap: isMobile ? '0.4rem' : '0.5rem',
                  padding: isMobile ? '0.5rem 1rem' : '0.6rem 1.2rem',
                  background: isActivePage('/produtos') ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : 'transparent',
                  color: isActivePage('/produtos') ? 'white' : '#6b7280',
                  border: isActivePage('/produtos') ? 'none' : '1px solid #e5e7eb',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
                  fontWeight: isActivePage('/produtos') ? 600 : 500,
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
                  gap: isMobile ? '0.4rem' : '0.5rem',
                  padding: isMobile ? '0.5rem 1rem' : '0.6rem 1.2rem',
                  background: isActivePage('/suporte') ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' : 'transparent',
                  color: isActivePage('/suporte') ? 'white' : '#6b7280',
                  border: isActivePage('/suporte') ? 'none' : '1px solid #e5e7eb',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
                  fontWeight: isActivePage('/suporte') ? 600 : 500,
                  transition: 'all 0.3s ease'
                }}>
                  <span>💬</span>
                  <span>Suporte</span>
                </button>
              </Link>
            </div>
          )}

          {/* Idioma - Desktop */}
          {!isMobile && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '0.6rem' : '0.8rem'
            }}>
              <span style={{ color: '#6b7280', fontSize: isMobile ? '0.8rem' : '0.9rem', fontWeight: 500 }}>Idioma:</span>
              <div style={{ display: 'flex', gap: isMobile ? '0.2rem' : '0.3rem' }}>
                {[
                  { code: 'pt' as const, flag: '🇧🇷', label: 'PT' },
                  { code: 'es' as const, flag: '🇪🇸', label: 'ES' },
                  { code: 'en' as const, flag: '🇺🇸', label: 'EN' }
                ].map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: isMobile ? '0.2rem' : '0.3rem',
                      padding: isMobile ? '0.3rem 0.6rem' : '0.4rem 0.8rem',
                      background: language === lang.code ? 'linear-gradient(135deg, #22c55e, #3b82f6)' : 'transparent',
                      color: language === lang.code ? 'white' : '#6b7280',
                      border: language === lang.code ? 'none' : '1px solid #e5e7eb',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      fontSize: isMobile ? '0.7rem' : '0.8rem',
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
          )}

          {/* Hamburger Menu Mobile */}
          {isMobile && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem'
              }}
            >
              <div style={{
                width: '20px',
                height: '2px',
                background: '#6b7280',
                transition: 'all 0.3s ease'
              }}></div>
              <div style={{
                width: '20px',
                height: '2px',
                background: '#6b7280',
                transition: 'all 0.3s ease'
              }}></div>
              <div style={{
                width: '20px',
                height: '2px',
                background: '#6b7280',
                transition: 'all 0.3s ease'
              }}></div>
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && isMobileMenuOpen && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '1rem 0',
            borderTop: '1px solid #e5e7eb',
            marginTop: '1rem'
          }}>
            {/* Navegação Mobile */}
            <Link href="/analise" style={{ textDecoration: 'none' }}>
              <button style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.8rem',
                background: isActivePage('/analise') ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'transparent',
                color: isActivePage('/analise') ? 'white' : '#6b7280',
                border: isActivePage('/analise') ? 'none' : '1px solid #e5e7eb',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: isActivePage('/analise') ? 600 : 500
              }}>
                <span>🧠</span>
                <span>Análise IA</span>
              </button>
            </Link>

            <Link href="/produtos" style={{ textDecoration: 'none' }}>
              <button style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.8rem',
                background: isActivePage('/produtos') ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'transparent',
                color: isActivePage('/produtos') ? 'white' : '#6b7280',
                border: isActivePage('/produtos') ? 'none' : '1px solid #e5e7eb',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: isActivePage('/produtos') ? 600 : 500
              }}>
                <span>🛍️</span>
                <span>Produtos</span>
              </button>
            </Link>

            <Link href="/suporte" style={{ textDecoration: 'none' }}>
              <button style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.8rem',
                background: isActivePage('/suporte') ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'transparent',
                color: isActivePage('/suporte') ? 'white' : '#6b7280',
                border: isActivePage('/suporte') ? 'none' : '1px solid #e5e7eb',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: isActivePage('/suporte') ? 600 : 500
              }}>
                <span>💬</span>
                <span>Suporte</span>
              </button>
            </Link>

            {/* Idioma Mobile */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              padding: '1rem 0',
              borderTop: '1px solid #e5e7eb'
            }}>
              <span style={{ 
                color: '#6b7280', 
                fontSize: '0.9rem', 
                fontWeight: 500,
                textAlign: 'center'
              }}>
                Idioma:
              </span>
              <div style={{ 
                display: 'flex', 
                gap: '0.5rem',
                justifyContent: 'center'
              }}>
                {[
                  { code: 'pt' as const, flag: '🇧🇷', label: 'PT' },
                  { code: 'es' as const, flag: '🇪🇸', label: 'ES' },
                  { code: 'en' as const, flag: '🇺🇸', label: 'EN' }
                ].map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      padding: '0.6rem 1rem',
                      background: language === lang.code ? 'linear-gradient(135deg, #22c55e, #3b82f6)' : 'transparent',
                      color: language === lang.code ? 'white' : '#6b7280',
                      border: language === lang.code ? 'none' : '1px solid #e5e7eb',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
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
        )}
      </div>
    </header>
  )
}
