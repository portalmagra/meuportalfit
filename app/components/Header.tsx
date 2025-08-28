'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: '🏠 Início', href: '/', current: pathname === '/' },
    { name: '🧠 Avaliação IA', href: '/analise', current: pathname.startsWith('/analise') },
    { name: '🛍️ Produtos por Área', href: '/produtos', current: pathname.startsWith('/produtos') },
    { name: '💬 Suporte', href: '/suporte', current: pathname.startsWith('/suporte') },
  ]

  return (
    <header style={{
      background: 'white',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid #e5e7eb',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '64px'
        }}>
          {/* Logo */}
          <div>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '8px'
                }}>
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>M</span>
                </div>
                <span style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  MeuPortalFit
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav style={{ display: 'none', gap: '32px' }} className="md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  ...(item.current ? {
                    background: '#dcfce7',
                    color: '#15803d',
                    borderBottom: '2px solid #22c55e'
                  } : {
                    color: '#374151',
                    ':hover': {
                      color: '#22c55e',
                      background: '#f0fdf4'
                    }
                  })
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div style={{ display: 'none' }} className="md:block">
            <Link href="/analise" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                Começar Quiz
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div style={{ display: 'block' }} className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                color: '#374151',
                padding: '8px',
                border: 'none',
                background: 'none',
                cursor: 'pointer'
              }}
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div style={{
            borderTop: '1px solid #e5e7eb',
            padding: '1rem 0'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  style={{
                    padding: '12px',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: '500',
                    textDecoration: 'none',
                    color: item.current ? '#15803d' : '#374151',
                    background: item.current ? '#dcfce7' : 'transparent',
                    borderLeft: item.current ? '4px solid #22c55e' : 'none'
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div style={{ padding: '1rem 0' }}>
                <Link href="/analise" style={{ textDecoration: 'none' }}>
                  <button style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                    color: 'white',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontWeight: '500',
                    border: 'none',
                    fontSize: '16px'
                  }}>
                    Começar Quiz
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
