'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-blobs">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>
        
        <div className="container">
          {/* Trust Badge */}
          <div className="trust-badge">
            <span>🛡️</span>
            <span>+2.847 brasileiros confiam no MeuPortalFit</span>
            <span>⭐⭐⭐⭐⭐</span>
          </div>

          {/* Main Title */}
          <h1 className="main-title">
            <span className="gradient-text">Descubra os Produtos</span>
            <br />
            <span>de Saúde Ideais para</span>
            <br />
            <span className="gradient-text">Você nos EUA</span>
          </h1>

          <p className="subtitle">
            Quiz inteligente personalizado para brasileiros. Nossa IA analisa suas necessidades 
            e recomenda os melhores produtos Amazon com base no seu perfil único.
          </p>

          {/* Main Button */}
          <Link href="/quiz">
            <button className="cta-button">
              <span>🚀</span>
              <span>Fazer Meu Quiz Gratuito</span>
              <span>→</span>
            </button>
          </Link>

          <p className="small-text">
            Leva apenas 2-3 minutos • 100% gratuito • Resultado instantâneo
          </p>

          {/* Feature Cards */}
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>100% Gratuito</h3>
              <p>Sem taxas ocultas</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>2-3 minutos</h3>
              <p>Super rápido</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>IA Avançada</h3>
              <p>Análise personalizada</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Dados Seguros</h3>
              <p>Privacidade total</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-section">
        <div className="container">
          <h2>Como o <span className="gradient-text">MeuPortalFit</span> funciona?</h2>
          <p className="section-subtitle">Três passos simples para descobrir os produtos de saúde ideais</p>
          
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon">📝</div>
              <div className="step-number">1</div>
              <h3>Quiz Inteligente</h3>
              <p>Responda perguntas personalizadas sobre seus objetivos, estilo de vida e preferências</p>
              <ul>
                <li>✓ 8-12 perguntas adaptativas</li>
                <li>✓ Baseado em ciência nutricional</li>
                <li>✓ Para brasileiros nos EUA</li>
              </ul>
            </div>

            <div className="step-card">
              <div className="step-icon">🤖</div>
              <div className="step-number">2</div>
              <h3>Análise por IA</h3>
              <p>Nossa IA avançada processa seu perfil único e identifica produtos compatíveis</p>
              <ul>
                <li>✓ Algoritmo treinado em wellness</li>
                <li>✓ Considera fatores culturais</li>
                <li>✓ Análise de compatibilidade</li>
              </ul>
            </div>

            <div className="step-card">
              <div className="step-icon">🎯</div>
              <div className="step-number">3</div>
              <h3>Produtos Ideais</h3>
              <p>Receba recomendações personalizadas com explicação detalhada</p>
              <ul>
                <li>✓ Top 3-5 produtos curados</li>
                <li>✓ Explicação detalhada</li>
                <li>✓ Links diretos Amazon</li>
              </ul>
            </div>
          </div>

          <Link href="/quiz">
            <button className="cta-button">
              <span>🚀</span>
              <span>Começar Meu Quiz Gratuito Agora</span>
              <span>→</span>
            </button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <h2><span className="gradient-text">Histórias de Sucesso</span></h2>
          <p className="section-subtitle">Brasileiros que transformaram sua saúde</p>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="avatar">MS</div>
                <div className="user-info">
                  <div className="name">Maria Santos</div>
                  <div className="location">Dallas, TX</div>
                </div>
              </div>
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"Economizei mais de $150 no primeiro mês com as recomendações perfeitas!"</p>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="avatar">JS</div>
                <div className="user-info">
                  <div className="name">João Silva</div>
                  <div className="location">Miami, FL</div>
                </div>
              </div>
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"A análise da IA é impressionante. Finalmente achei o que funciona para mim!"</p>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="avatar">AR</div>
                <div className="user-info">
                  <div className="name">Ana Rodrigues</div>
                  <div className="location">New York, NY</div>
                </div>
              </div>
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"Como enfermeira, fiquei impressionada com a precisão das recomendações."</p>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number gradient-text">2.847</div>
              <div>Brasileiros Atendidos</div>
            </div>
            <div className="stat-item">
              <div className="stat-number gradient-text">4.9/5</div>
              <div>Avaliação Média</div>
            </div>
            <div className="stat-item">
              <div className="stat-number gradient-text">$2M+</div>
              <div>Economizado pelos Usuários</div>
            </div>
            <div className="stat-item">
              <div className="stat-number gradient-text">1.243</div>
              <div>Avaliações 5 Estrelas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section">
        <div className="container">
          <h2>Pronto para Descobrir os<br />Produtos Ideais para Você?</h2>
          <p>Junte-se a milhares de brasileiros que já descobriram os produtos de saúde perfeitos com nosso quiz inteligente.</p>
          
          <Link href="/quiz">
            <button className="cta-button-white">
              <span>🚀</span>
              <span>Fazer Meu Quiz Gratuito Agora</span>
            </button>
          </Link>
          
          <p className="final-benefits">✅ 100% Gratuito • ⚡ 2-3 Minutos • 🔒 Dados Seguros</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-brand gradient-text">MeuPortalFit</div>
          <p>Seu portal personalizado para wellness</p>
          <div className="footer-copyright">© 2025 Portal Solutions LLC. Todos os direitos reservados.</div>
        </div>
      </footer>
    </main>
  )
}