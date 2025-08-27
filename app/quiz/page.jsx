// CLAUDE: Página principal do Quiz - versão minimalista
// TODO: Implementar steps do quiz com estado
// TODO: Adicionar validação de formulários
// TODO: Conectar com API de recomendações
// FIXME: Classes CSS não definidas (hero-section, blob, etc.)
'use client';

import Link from 'next/link';

export default function QuizPage() {
  return (
    <main className="hero-section">
      <div className="hero-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      
      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="trust-badge" style={{ marginBottom: '2rem' }}>
            <span>🧬</span>
            <span>Quiz Personalizado MeuPortalFit</span>
            <span>⭐⭐⭐⭐⭐</span>
          </div>
          
          <h1 className="gradient-text" style={{ 
            fontSize: '2.25rem', 
            fontWeight: '900', 
            marginBottom: '1rem' 
          }}>
            Quiz MVP Funcionando!
          </h1>
          
          <p style={{ fontSize: '1.125rem', color: '#4b5563', marginBottom: '2rem' }}>
            Versão limpa para deploy. Vamos adicionar funcionalidades depois.
          </p>
          
          <Link href="/" style={{ textDecoration: 'none' }}>
            <button className="cta-button">
              <span>←</span>
              <span>Voltar para Home</span>
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
