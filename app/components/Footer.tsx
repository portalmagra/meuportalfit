import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Navegação',
      links: [
        { name: '🏠 Início', href: '/' },
        { name: '🧠 Avaliação IA', href: '/analise' },
        { name: '🛍️ Produtos por Área', href: '/produtos' },
        { name: '💬 Suporte', href: '/suporte' },
      ]
    },
    {
      title: 'Categorias de Produtos',
      links: [
        { name: '💪 Energia & Performance', href: '/produtos/energia' },
        { name: '🌙 Sono & Relaxamento', href: '/produtos/sono' },
        { name: '🛡️ Imunidade', href: '/produtos/imunidade' },
        { name: '⚖️ Balance Hormonal', href: '/produtos/hormonal' },
        { name: '🔥 Emagrecimento', href: '/produtos/emagrecimento' },
        { name: '💝 Afrodisíaco', href: '/produtos/afrodisiaco' },
      ]
    },
    {
      title: 'Suporte',
      links: [
        { name: '📞 Agendar Consulta', href: '/suporte' },
        { name: '❓ FAQ', href: '/suporte#faq' },
        { name: '📧 Contato', href: '/suporte#contato' },
        { name: '🔒 Privacidade', href: '/privacidade' },
      ]
    }
  ]

  return (
    <footer style={{
      background: '#111827',
      color: 'white',
      padding: '3rem 0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Brand Section */}
          <div>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px'
                }}>
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>M</span>
                </div>
                <span style={{
                  fontSize: '24px',
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
            <p style={{
              color: '#9ca3af',
              fontSize: '14px',
              lineHeight: '1.6',
              marginBottom: '1rem'
            }}>
              Seu portal personalizado para wellness, criado especificamente para brasileiros nos EUA. 
              Descubra produtos Amazon personalizados com análise de IA.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ color: '#9ca3af', fontSize: '24px' }}>📘</a>
              <a href="#" style={{ color: '#9ca3af', fontSize: '24px' }}>📷</a>
              <a href="#" style={{ color: '#9ca3af', fontSize: '24px' }}>💬</a>
            </div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 style={{
                color: '#d1d5db',
                fontSize: '14px',
                fontWeight: '600',
                textTransform: 'uppercase',
                marginBottom: '1rem',
                letterSpacing: '0.05em'
              }}>
                {section.title}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {section.links.map((link) => (
                  <li key={link.name} style={{ marginBottom: '0.75rem' }}>
                    <Link 
                      href={link.href}
                      style={{
                        color: '#9ca3af',
                        textDecoration: 'none',
                        fontSize: '14px',
                        transition: 'color 0.2s'
                      }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div style={{
          borderTop: '1px solid #374151',
          paddingTop: '2rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <div style={{ color: '#9ca3af', fontSize: '14px' }}>
              © {currentYear} Portal Solutions LLC. Todos os direitos reservados.
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '14px' }}>
              <Link href="/termos" style={{ color: '#9ca3af', textDecoration: 'none' }}>
                Termos de Uso
              </Link>
              <Link href="/privacidade" style={{ color: '#9ca3af', textDecoration: 'none' }}>
                Política de Privacidade
              </Link>
              <Link href="/cookies" style={{ color: '#9ca3af', textDecoration: 'none' }}>
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
