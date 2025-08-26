'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section className="hero-gradient min-h-screen flex items-center justify-center relative">
      {/* Animated Blobs */}
      <div className="absolute top-20 left-20 w-72 h-72 blob-1 rounded-full opacity-60"></div>
      <div className="absolute top-40 right-32 w-96 h-96 blob-2 rounded-full opacity-40"></div>
      <div className="absolute bottom-32 left-1/3 w-80 h-80 blob-3 rounded-full opacity-30"></div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        {/* Trust Badge */}
        <div className="inline-flex items-center trust-badge px-6 py-3 rounded-full mb-8">
          <span className="text-2xl mr-3">🛡️</span>
          <span className="text-lg font-semibold text-gray-700">
            +2.847 brasileiros confiam no MeuPortalFit
          </span>
          <div className="flex ml-4">
            ⭐⭐⭐⭐⭐
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
          <span className="gradient-text">
            Descubra os Produtos
          </span>
          <br />
          <span className="text-gray-800">
            de Saúde Ideais para
          </span>
          <br />
          <span className="gradient-text">
            Você nos EUA
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto font-medium">
          Quiz inteligente personalizado para brasileiros. Nossa IA analisa suas necessidades 
          e recomenda os melhores produtos Amazon com base no seu perfil único.
        </p>

        {/* Main CTA */}
        <div className="mb-16">
          <Link href="/quiz">
            <button className="premium-button flex items-center mx-auto space-x-4">
              <span className="text-3xl">🚀</span>
              <span>Fazer Meu Quiz Gratuito</span>
              <span className="text-2xl">→</span>
            </button>
          </Link>
          
          <p className="text-sm text-gray-500 mt-4 font-medium">
            Leva apenas 2-3 minutos • 100% gratuito • Resultado instantâneo
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="premium-card p-6 rounded-2xl">
            <div className="feature-icon w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">100% Gratuito</h3>
            <p className="text-gray-600">Sem taxas ocultas</p>
          </div>

          <div className="premium-card p-6 rounded-2xl">
            <div className="feature-icon w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">2-3 minutos</h3>
            <p className="text-gray-600">Super rápido</p>
          </div>

          <div className="premium-card p-6 rounded-2xl">
            <div className="feature-icon w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🤖</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">IA Avançada</h3>
            <p className="text-gray-600">Análise personalizada</p>
          </div>

          <div className="premium-card p-6 rounded-2xl">
            <div className="feature-icon w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔒</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Dados Seguros</h3>
            <p className="text-gray-600">Privacidade total</p>
          </div>
        </div>

        {/* Video or Preview */}
        <div className="premium-card p-8 rounded-3xl max-w-4xl mx-auto">
          <div className="aspect-video bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">▶️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Ver Como Funciona
              </h3>
              <p className="text-gray-600">
                Três passos simples para descobrir os produtos de saúde ideais
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}