'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className=&quot;hero-section&quot;>
        <div className=&quot;hero-blobs&quot;>
          <div className=&quot;blob blob-1&quot;></div>
          <div className=&quot;blob blob-2&quot;></div>
          <div className=&quot;blob blob-3&quot;></div>
        </div>
        
        <div className=&quot;container&quot;>
          {/* Trust Badge */}
          <div className=&quot;trust-badge&quot;>
            <span>🛡️</span>
            <span>+2.847 brasileiros confiam no MeuPortalFit</span>
            <span>⭐⭐⭐⭐⭐</span>
          </div>

          {/* Main Title */}
          <h1 className=&quot;main-title&quot;>
            <span className=&quot;gradient-text&quot;>Descubra os Produtos</span>
            <br />
            <span>de Saúde Ideais para</span>
            <br />
            <span className=&quot;gradient-text&quot;>Você nos EUA</span>
          </h1>

          <p className=&quot;subtitle&quot;>
            Quiz inteligente personalizado para brasileiros. Nossa IA analisa suas necessidades 
            e recomenda os melhores produtos Amazon com base no seu perfil único.
          </p>

          {/* Main Button */}
          <Link href=&quot;/quiz&quot;>
            <button className=&quot;cta-button&quot;>
              <span>🚀</span>
              <span>Fazer Meu Quiz Gratuito</span>
              <span>→</span>
            </button>
          </Link>

          <p className=&quot;small-text&quot;>
            Leva apenas 2-3 minutos • 100% gratuito • Resultado instantâneo
          </p>

          {/* Feature Cards */}
          <div className=&quot;features-grid&quot;>
            <div className=&quot;feature-card&quot;>
              <div className=&quot;feature-icon&quot;>🎯</div>
              <h3>100% Gratuito</h3>
              <p>Sem taxas ocultas</p>
            </div>
            <div className=&quot;feature-card&quot;>
              <div className=&quot;feature-icon&quot;>⚡</div>
              <h3>2-3 minutos</h3>
              <p>Super rápido</p>
            </div>
            <div className=&quot;feature-card&quot;>
              <div className=&quot;feature-icon&quot;>🤖</div>
              <h3>IA Avançada</h3>
              <p>Análise personalizada</p>
            </div>
            <div className=&quot;feature-card&quot;>
              <div className=&quot;feature-icon&quot;>🔒</div>
              <h3>Dados Seguros</h3>
              <p>Privacidade total</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className=&quot;how-section&quot;>
        <div className=&quot;container&quot;>
          <h2>Como o <span className=&quot;gradient-text&quot;>MeuPortalFit</span> funciona?</h2>
          <p className=&quot;section-subtitle&quot;>Três passos simples para descobrir os produtos de saúde ideais</p>
          
          <div className=&quot;steps-grid&quot;>
            <div className=&quot;step-card&quot;>
              <div className=&quot;step-icon&quot;>📝</div>
              <div className=&quot;step-number&quot;>1</div>
              <h3>Quiz Inteligente</h3>
              <p>Responda perguntas personalizadas sobre seus objetivos, estilo de vida e preferências</p>
              <ul>
                <li>✓ 8-12 perguntas adaptativas</li>
                <li>✓ Baseado em ciência nutricional</li>
                <li>✓ Para brasileiros nos EUA</li>
              </ul>
            </div>

            <div className=&quot;step-card&quot;>
              <div className=&quot;step-icon&quot;>🤖</div>
              <div className=&quot;step-number&quot;>2</div>
              <h3>Análise por IA</h3>
              <p>Nossa IA avançada processa seu perfil único e identifica produtos compatíveis</p>
              <ul>
                <li>✓ Algoritmo treinado em wellness</li>
                <li>✓ Considera fatores culturais</li>
                <li>✓ Análise de compatibilidade</li>
              </ul>
            </div>

            <div className=&quot;step-card&quot;>
              <div className=&quot;step-icon&quot;>🎯</div>
              <div className=&quot;step-number&quot;>3</div>
              <h3>Produtos Ideais</h3>
              <p>Receba recomendações personalizadas com explicação detalhada</p>
              <ul>
                <li>✓ Top 3-5 produtos curados</li>
                <li>✓ Explicação detalhada</li>
                <li>✓ Links diretos Amazon</li>
              </ul>
            </div>
          </div>

          <Link href=&quot;/quiz&quot;>
            <button className=&quot;cta-button&quot;>
              <span>🚀</span>
              <span>Começar Meu Quiz Gratuito Agora</span>
              <span>→</span>
            </button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className=&quot;testimonials-section&quot;>
        <div className=&quot;container&quot;>
          <h2><span className=&quot;gradient-text&quot;>Histórias de Sucesso</span></h2>
          <p className=&quot;section-subtitle&quot;>Brasileiros que transformaram sua saúde</p>

          <div className=&quot;testimonials-grid&quot;>
            <div className=&quot;testimonial-card&quot;>
              <div className=&quot;testimonial-header&quot;>
                <div className=&quot;avatar&quot;>MS</div>
                <div className=&quot;user-info&quot;>
                  <div className=&quot;name&quot;>Maria Santos</div>
                  <div className=&quot;location&quot;>Dallas, TX</div>
                </div>
              </div>
              <div className=&quot;stars&quot;>⭐⭐⭐⭐⭐</div>
              <p>&quot;Economizei mais de $150 no primeiro mês com as recomendações perfeitas!&quot;</p>
            </div>

            <div className=&quot;testimonial-card&quot;>
              <div className=&quot;testimonial-header&quot;>
                <div className=&quot;avatar&quot;>JS</div>
                <div className=&quot;user-info&quot;>
                  <div className=&quot;name&quot;>João Silva</div>
                  <div className=&quot;location&quot;>Miami, FL</div>
                </div>
              </div>
              <div className=&quot;stars&quot;>⭐⭐⭐⭐⭐</div>
              <p>&quot;A análise da IA é impressionante. Finalmente achei o que funciona para mim!&quot;</p>
            </div>

            <div className=&quot;testimonial-card&quot;>
              <div className=&quot;testimonial-header&quot;>
                <div className=&quot;avatar&quot;>AR</div>
                <div className=&quot;user-info&quot;>
                  <div className=&quot;name&quot;>Ana Rodrigues</div>
                  <div className=&quot;location&quot;>New York, NY</div>
                </div>
              </div>
              <div className=&quot;stars&quot;>⭐⭐⭐⭐⭐</div>
              <p>&quot;Como enfermeira, fiquei impressionada com a precisão das recomendações.&quot;</p>
            </div>
          </div>

          {/* Stats */}
          <div className=&quot;stats-grid&quot;>
            <div className=&quot;stat-item&quot;>
              <div className=&quot;stat-number gradient-text&quot;>2.847</div>
              <div>Brasileiros Atendidos</div>
            </div>
            <div className=&quot;stat-item&quot;>
              <div className=&quot;stat-number gradient-text&quot;>4.9/5</div>
              <div>Avaliação Média</div>
            </div>
            <div className=&quot;stat-item&quot;>
              <div className=&quot;stat-number gradient-text&quot;>$2M+</div>
              <div>Economizado pelos Usuários</div>
            </div>
            <div className=&quot;stat-item&quot;>
              <div className=&quot;stat-number gradient-text&quot;>1.243</div>
              <div>Avaliações 5 Estrelas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className=&quot;final-cta-section&quot;>
        <div className=&quot;container&quot;>
          <h2>Pronto para Descobrir os<br />Produtos Ideais para Você?</h2>
          <p>Junte-se a milhares de brasileiros que já descobriram os produtos de saúde perfeitos com nosso quiz inteligente.</p>
          
          <Link href=&quot;/quiz&quot;>
            <button className=&quot;cta-button-white&quot;>
              <span>🚀</span>
              <span>Fazer Meu Quiz Gratuito Agora</span>
            </button>
          </Link>
          
          <p className=&quot;final-benefits&quot;>✅ 100% Gratuito • ⚡ 2-3 Minutos • 🔒 Dados Seguros</p>
        </div>
      </section>

      {/* Footer */}
      <footer className=&quot;footer&quot;>
        <div className=&quot;container&quot;>
          <div className=&quot;footer-brand gradient-text&quot;>MeuPortalFit</div>
          <p>Seu portal personalizado para wellness</p>
          <div className=&quot;footer-copyright&quot;>© 2025 Portal Solutions LLC. Todos os direitos reservados.</div>
        </div>
      </footer>
    </main>
  )
}