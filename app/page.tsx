import Link from 'next/link'

export default function HomePage() {
  return (
    <main>
      <section className="hero-section">
        <div className="hero-blobs">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>
        
        <div className="container">
          <div className="trust-badge">
            <span>🛡️</span>
            <span>+2.847 brasileiros confiam no MeuPortalFit</span>
            <span>⭐⭐⭐⭐⭐</span>
          </div>

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
        </div>
      </section>
    </main>
  )
}
