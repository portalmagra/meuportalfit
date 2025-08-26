import Link from 'next/link'

// =============================================================================
// QUIZ PAGE COMPONENT
// =============================================================================
export default function QuizPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Quiz Personalizado de Wellness
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Responda algumas perguntas e descubra os produtos de saúde perfeitos para você
          </p>
        </div>

        {/* Quiz Intro Card */}
        <div className="bg-white rounded-xl shadow-soft p-8 mb-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-primary-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3-9v18M3 12h4.5m4.5 0v6m0-6V3"
                />
              </svg>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Como funciona o quiz?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Perguntas Inteligentes</h3>
                <p className="text-gray-600 text-sm">8-12 perguntas adaptativas sobre seus objetivos e estilo de vida</p>
              </div>
              
              <div className="text-center">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Análise por IA</h3>
                <p className="text-gray-600 text-sm">Nossa IA analisa seu perfil e encontra produtos ideais</p>
              </div>
              
              <div className="text-center">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Recomendações</h3>
                <p className="text-gray-600 text-sm">Receba produtos personalizados com explicação detalhada</p>
              </div>
            </div>

            {/* Quiz Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-center">
              <div>
                <div className="text-2xl font-bold text-primary-600">2-3</div>
                <div className="text-sm text-gray-600">minutos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-600">100%</div>
                <div className="text-sm text-gray-600">gratuito</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-600">8-12</div>
                <div className="text-sm text-gray-600">perguntas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-600">+2.847</div>
                <div className="text-sm text-gray-600">brasileiros</div>
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full sm:w-auto bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors">
              🚀 Começar Meu Quiz Agora
            </button>
            
            <p className="text-sm text-gray-500 mt-4">
              ⚡ Resultado imediato • 🔒 Dados seguros • 📱 Mobile friendly
            </p>
          </div>
        </div>

        {/* Testimonials Preview */}
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            O que os brasileiros estão falando:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-soft">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                  👩‍💼
                </div>
                <div className="text-left">
                  <div className="font-semibold">Maria S.</div>
                  <div className="text-sm text-gray-600">Dallas, TX</div>
                </div>
              </div>
              <p className="text-gray-700 text-left">
                "Incrível! Economizei $150 no primeiro mês com as recomendações certas."
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-soft">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                  👨‍💻
                </div>
                <div className="text-left">
                  <div className="font-semibold">João R.</div>
                  <div className="text-sm text-gray-600">Miami, FL</div>
                </div>
              </div>
              <p className="text-gray-700 text-left">
                "Finalmente achei suplementos que funcionam para mim. O quiz é perfeito!"
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-primary-600 hover:text-primary-500 font-medium"
          >
            ← Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  )
}