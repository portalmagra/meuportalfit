'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '../components/Header'

type Language = 'pt' | 'es' | 'en'

const content = {
  // Headers e Títulos
  pageTitle: { pt: 'Suporte Personalizado', es: 'Soporte Personalizado', en: 'Personalized Support' },
  heroTitle: { 
    pt: 'Descubra Por Que Você Não Está\nAlcançando Seus Objetivos', 
    es: 'Descubre Por Qué No Estás\nAlcanzando Tus Objetivos', 
    en: 'Discover Why You\'re Not\nReaching Your Goals' 
  },
  heroSubtitle: { 
    pt: '30 minutos que podem mudar sua vida para sempre', 
    es: '30 minutos que pueden cambiar tu vida para siempre', 
    en: '30 minutes that can change your life forever' 
  },
  
  // Gatilhos Mentais
  urgencyTitle: { pt: '⚠️ ATENÇÃO: Oferta Limitada', es: '⚠️ ATENCIÓN: Oferta Limitada', en: '⚠️ ATTENTION: Limited Offer' },
  urgencyText: { 
    pt: 'Apenas 5 vagas disponíveis esta semana para avaliação personalizada', 
    es: 'Solo 5 cupos disponibles esta semana para evaluación personalizada', 
    en: 'Only 5 spots available this week for personalized evaluation' 
  },
  
  // Benefícios da Avaliação
  benefitsTitle: { pt: 'O Que Você Vai Descobrir em 30 Minutos', es: 'Lo Que Descubrirás en 30 Minutos', en: 'What You\'ll Discover in 30 Minutes' },
  benefit1: { 
    pt: '🎯 O EXATO motivo pelo qual seus esforços não estão funcionando', 
    es: '🎯 La EXACTA razón por la que tus esfuerzos no están funcionando', 
    en: '🎯 The EXACT reason why your efforts aren\'t working' 
  },
  benefit2: { 
    pt: '💡 A estratégia PERSONALIZADA que vai acelerar seus resultados em 3x', 
    es: '💡 La estrategia PERSONALIZADA que acelerará tus resultados en 3x', 
    en: '💡 The PERSONALIZED strategy that will accelerate your results by 3x' 
  },
  benefit3: { 
    pt: '🚀 O plano de ação específico para SUA rotina e objetivos', 
    es: '🚀 El plan de acción específico para TU rutina y objetivos', 
    en: '🚀 The specific action plan for YOUR routine and goals' 
  },
  
  // Social Proof
  socialProofTitle: { pt: 'O Que Nossos Clientes Dizem', es: 'Lo Que Dicen Nuestros Clientes', en: 'What Our Clients Say' },
  testimonial1: { 
    pt: '"Em 30 minutos descobri que estava fazendo TUDO errado. Agora vejo resultados reais!"', 
    es: '"En 30 minutos descubrí que estaba haciendo TODO mal. ¡Ahora veo resultados reales!"', 
    en: '"In 30 minutes I discovered I was doing EVERYTHING wrong. Now I see real results!"' 
  },
  testimonial2: { 
    pt: '"A coach identificou problemas que nem eu sabia que tinha. Mudou minha vida!"', 
    es: '"La coach identificó problemas que ni yo sabía que tenía. ¡Cambió mi vida!"', 
    en: '"The coach identified problems I didn\'t even know I had. Changed my life!"' 
  },
  
  // Preço e Oferta
  priceTitle: { pt: 'Investimento Especial', es: 'Inversión Especial', en: 'Special Investment' },
  originalPrice: { pt: 'Valor Normal: $97', es: 'Valor Normal: $97', en: 'Normal Value: $97' },
  specialPrice: { pt: 'OFERTA ESPECIAL: $10', es: 'OFERTA ESPECIAL: $10', en: 'SPECIAL OFFER: $10' },
  savings: { pt: 'Economia de $87 (90% OFF)', es: 'Ahorro de $87 (90% OFF)', en: 'Save $87 (90% OFF)' },
  limitedTime: { pt: '⚠️ Apenas até o final da semana', es: '⚠️ Solo hasta el final de la semana', en: '⚠️ Only until the end of the week' },
  
  // Formulário
  formTitle: { pt: 'Reserve Sua Avaliação Agora', es: 'Reserva Tu Evaluación Ahora', en: 'Book Your Evaluation Now' },
  formSubtitle: { pt: 'Preencha apenas seu nome e objetivo. Nossa coach de bem-estar entrará em contato via WhatsApp em até 2 horas', es: 'Completa solo tu nombre y objetivo. Nuestra coach de bienestar te contactará vía WhatsApp en hasta 2 horas', en: 'Fill in just your name and goal. Our wellness coach will contact you via WhatsApp within 2 hours' },
  nameLabel: { pt: 'Como você gostaria de ser chamada?', es: '¿Cómo te gustaría que te llamemos?', en: 'What would you like to be called?' },
  emailLabel: { pt: 'Email', es: 'Email', en: 'Email' },
  phoneLabel: { pt: 'Telefone (WhatsApp)', es: 'Teléfono (WhatsApp)', en: 'Phone (WhatsApp)' },
  goalsLabel: { pt: 'Qual seu principal objetivo?', es: '¿Cuál es tu principal objetivo?', en: 'What\'s your main goal?' },
  goalsOptions: { 
    pt: ['Perder peso', 'Ganhar energia', 'Melhorar o sono', 'Fortalecer imunidade', 'Outro'],
    es: ['Perder peso', 'Ganar energía', 'Mejorar el sueño', 'Fortalecer inmunidad', 'Otro'],
    en: ['Lose weight', 'Gain energy', 'Improve sleep', 'Strengthen immunity', 'Other']
  },
  submitButton: { pt: 'ENVIAR POR WHATSAPP', es: 'ENVIAR POR WHATSAPP', en: 'SEND VIA WHATSAPP' },
  
  // Garantias
  guaranteeTitle: { pt: '100% Garantido', es: '100% Garantizado', en: '100% Guaranteed' },
  guaranteeText: { 
    pt: 'Se em 30 minutos via WhatsApp você não descobrir pelo menos 3 insights valiosos sobre sua rotina, devolvemos seu dinheiro. Sem perguntas.',
    es: 'Si en 30 minutos vía WhatsApp no descubres al menos 3 insights valiosos sobre tu rutina, te devolvemos tu dinero. Sin preguntas.',
    en: 'If in 30 minutes via WhatsApp you don\'t discover at least 3 valuable insights about your routine, we\'ll refund your money. No questions asked.'
  },
  
  // FAQ
  faqTitle: { pt: 'Perguntas Frequentes', es: 'Preguntas Frecuentes', en: 'Frequently Asked Questions' },
  faq1: { 
    pt: 'Como funciona a avaliação?', 
    es: '¿Cómo funciona la evaluación?', 
    en: 'How does the evaluation work?' 
  },
  faq1Answer: { 
    pt: 'É uma consulta de 30 minutos via WhatsApp onde nossa coach de bem-estar analisa sua rotina atual e identifica exatamente o que precisa ser ajustado para você alcançar seus objetivos.',
    es: 'Es una consulta de 30 minutos vía WhatsApp donde nuestra coach de bienestar analiza tu rutina actual e identifica exactamente lo que necesita ser ajustado para que alcances tus objetivos.',
    en: 'It\'s a 30-minute consultation via WhatsApp where our wellness coach analyzes your current routine and identifies exactly what needs to be adjusted for you to reach your goals.'
  },
  faq2: { 
    pt: 'Preciso comprar produtos?', 
    es: '¿Necesito comprar productos?', 
    en: 'Do I need to buy products?' 
  },
  faq2Answer: { 
    pt: 'NÃO! A avaliação é focada em identificar problemas na sua rotina e estilo de vida. Produtos são sugeridos apenas se realmente necessários.',
    es: '¡NO! La evaluación se enfoca en identificar problemas en tu rutina y estilo de vida. Los productos solo se sugieren si realmente son necesarios.',
    en: 'NO! The evaluation focuses on identifying problems in your routine and lifestyle. Products are only suggested if really necessary.'
  },
  faq3: { 
    pt: 'E se eu não gostar da consulta?', 
    es: '¿Y si no me gusta la consulta?', 
    en: 'What if I don\'t like the consultation?' 
  },
  faq3Answer: { 
    pt: 'Oferecemos garantia de 100%. Se você não descobrir pelo menos 3 insights valiosos em 30 minutos via WhatsApp, devolvemos seu dinheiro.',
    es: 'Ofrecemos garantía del 100%. Si no descubres al menos 3 insights valiosos en 30 minutos vía WhatsApp, te devolvemos tu dinero.',
    en: 'We offer a 100% guarantee. If you don\'t discover at least 3 valuable insights in 30 minutes via WhatsApp, we\'ll refund your money.'
  },
  
  // Call to Action Final
  finalCtaTitle: { 
    pt: 'Não Deixe Esta Oportunidade Passar', 
    es: 'No Dejes Pasar Esta Oportunidad', 
    en: 'Don\'t Let This Opportunity Pass' 
  },
  finalCtaText: { 
    pt: 'Milhares de pessoas já transformaram suas vidas com nossa avaliação personalizada. Agora é sua vez.',
    es: 'Miles de personas ya han transformado sus vidas con nuestra evaluación personalizada. Ahora es tu turno.',
    en: 'Thousands of people have already transformed their lives with our personalized evaluation. Now it\'s your turn.'
  },
  
  // Footer
  footerText: { 
    pt: 'Transforme sua vida em 30 minutos via WhatsApp. Reserve sua avaliação agora.', 
    es: 'Transforma tu vida en 30 minutos vía WhatsApp. Reserva tu evaluación ahora.', 
    en: 'Transform your life in 30 minutes via WhatsApp. Book your evaluation now.' 
  }
}

export default function SuportePage() {
  const [language, setLanguage] = useState<Language>('pt')
  const [formData, setFormData] = useState({
    name: '',
    goal: ''
  })
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const t = (key: keyof typeof content) => content[key]?.[language] || content[key]?.pt || key

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica de envio do formulário
    alert('Formulário enviado! Entraremos em contato em até 2 horas.')
  }

  return (
    <>
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 1; 
          }
          50% { 
            transform: scale(1.05); 
            opacity: 0.8; 
          }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(-10px); 
          }
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #22c55e, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: #22c55e !important;
        }
        
        .pulse-animation {
          animation: pulse 2s infinite;
        }
        
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        
        /* Mobile-First Responsive Design */
        @media (max-width: 768px) {
          .header-nav {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem 0;
          }
          
          .nav-buttons {
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.8rem;
          }
          
          .nav-buttons button {
            padding: 0.5rem 1rem !important;
            font-size: 0.8rem !important;
          }
          
          .hero-title {
            font-size: clamp(1.8rem, 6vw, 2.5rem) !important;
            line-height: 1.2 !important;
          }
          
          .hero-subtitle {
            font-size: clamp(1rem, 3vw, 1.2rem) !important;
          }
          
          .urgency-badge {
            padding: 0.8rem 1.5rem !important;
            font-size: 0.9rem !important;
          }
          
          .urgency-counter {
            padding: 1.5rem 2rem !important;
            font-size: 1.1rem !important;
          }
          
          .cta-button {
            padding: 1.2rem 2rem !important;
            font-size: 1rem !important;
          }
          
          .form-container {
            padding: 2rem 1.5rem !important;
          }
          
          .faq-container {
            padding: 0 1rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .nav-buttons button {
            width: 100%;
            justify-content: center;
          }
          
          .hero-title {
            font-size: clamp(1.5rem, 7vw, 2rem) !important;
          }
          
          .urgency-badge {
            padding: 0.6rem 1.2rem !important;
            font-size: 0.8rem !important;
          }
          
          .cta-button {
            padding: 1rem 1.5rem !important;
            font-size: 0.9rem !important;
          }
        }
      `}</style>

      <main style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Header Unificado com Logo, Navegação e Idioma */}
        <Header language={language} onLanguageChange={setLanguage} />

        {/* Hero Section - GATILHO DE URGÊNCIA */}
        <section style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #f0f9ff 100%)',
          padding: '4rem 0',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Animated Elements */}
          <div style={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #22c55e, #06b6d4, #3b82f6)',
            filter: 'blur(40px)',
            opacity: 0.4,
            animation: 'float 6s ease-in-out infinite',
            zIndex: 1
          }}></div>

          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem',
            position: 'relative',
            zIndex: 10,
            textAlign: 'center'
          }}>
            {/* Urgency Badge */}
            <div className="pulse-animation" style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'linear-gradient(135deg, #f59e0b, #fbbf24, #fcd34d)',
              borderRadius: '50px',
              padding: '1.2rem 2.5rem',
              marginBottom: '2rem',
              boxShadow: '0 15px 50px rgba(245, 158, 11, 0.7)',
              fontWeight: 900,
              fontSize: '1.1rem',
              gap: '0.8rem',
              border: '3px solid rgba(255, 255, 255, 0.3)',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
            }}>
              <span style={{ fontSize: '1.4rem', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}>⏰</span>
              <span style={{ letterSpacing: '0.5px' }}>{t('urgencyTitle')}</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              whiteSpace: 'pre-line',
              color: '#1f2937',
              textShadow: 'none'
            }}>
              {t('heroTitle')}
            </h1>

            <p style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              marginBottom: '2rem',
              opacity: 1,
              maxWidth: '800px',
              margin: '0 auto 2rem',
              fontWeight: 600,
              color: '#6b7280',
              textShadow: 'none'
            }}>
              {t('heroSubtitle')}
            </p>

            {/* Badge de Preço - $10 DESTACADO */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)',
              borderRadius: '50px',
              padding: '0.8rem 1.8rem',
              marginBottom: '2rem',
              boxShadow: '0 20px 50px rgba(251, 191, 36, 0.6)',
              border: '4px solid rgba(255, 255, 255, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                fontWeight: 900,
                fontSize: '1.3rem',
                color: 'white',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}>
                <span style={{ fontSize: '1.5rem' }}>💰</span>
                <span>APENAS</span>
                <span style={{
                  fontSize: '1.8rem',
                  background: 'linear-gradient(135deg, #ffffff, #fef3c7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                }}>$10</span>
              </div>
            </div>

            {/* Urgency Counter */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(251, 191, 36, 0.15))',
              border: '4px solid #f59e0b',
              borderRadius: '30px',
              padding: '2.5rem 3rem',
              marginBottom: '2rem',
              maxWidth: '600px',
              margin: '0 auto 2rem',
              boxShadow: '0 12px 40px rgba(245, 158, 11, 0.4)',
              position: 'relative'
            }}>
              <p style={{
                fontSize: '1.3rem',
                fontWeight: 900,
                color: '#f59e0b',
                margin: 0,
                textShadow: 'none',
                lineHeight: 1.4
              }}>
                {t('urgencyText')}
              </p>
            </div>

            {/* CTA Button - WhatsApp Direto */}
            <a href="https://wa.me/17862535032?text=Olá! Quero minha avaliação personalizada de $10. Pode me ajudar?" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button className="pulse-animation" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1.2rem',
                background: 'linear-gradient(135deg, #22c55e, #16a34a, #15803d)',
                color: 'white',
                fontSize: '1.3rem',
                fontWeight: 900,
                padding: '1.8rem 3.5rem',
                border: '3px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '60px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 25px 60px rgba(34, 197, 94, 0.6)',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
              }}>
                <span style={{ fontSize: '1.5rem', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}>🚀</span>
                <span>QUERO MINHA AVALIAÇÃO AGORA</span>
                <span style={{ fontSize: '1.2rem' }}>→</span>
              </button>
            </a>
          </div>
        </section>

        {/* Benefits Section */}
        <section style={{ background: 'white', padding: '5rem 0' }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 900,
              marginBottom: '3rem',
              color: '#1f2937'
            }}>
              {t('benefitsTitle')}
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              maxWidth: '900px',
              margin: '0 auto'
            }}>
              {[
                { benefit: 'benefit1', icon: '🎯' },
                { benefit: 'benefit2', icon: '💡' },
                { benefit: 'benefit3', icon: '🚀' }
              ].map((item, i) => (
                <div key={i} style={{
                  background: '#f8fafc',
                  borderRadius: '20px',
                  padding: '2rem',
                  border: '2px solid #e2e8f0',
                  transition: 'all 0.3s ease'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)'
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}>
                  <div style={{
                    fontSize: '3rem',
                    marginBottom: '1rem'
                  }}>
                    {item.icon}
                  </div>
                  <p style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#1f2937',
                    lineHeight: 1.5
                  }}>
                    {t(item.benefit as keyof typeof content)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Section - PLACEHOLDER */}
        <section style={{ background: '#f1f5f9', padding: '4rem 0' }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 2rem',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 700,
              marginBottom: '2rem',
              color: '#1f2937'
            }}>
              🎥 Vídeo Explicativo
            </h2>
            
            <div style={{
              background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
              borderRadius: '20px',
              padding: '3rem',
              color: 'white',
              border: '3px dashed rgba(255, 255, 255, 0.3)'
            }}>
              <div style={{
                fontSize: '4rem',
                marginBottom: '1rem'
              }}>
                📹
              </div>
              <p style={{
                fontSize: '1.1rem',
                marginBottom: '1rem',
                opacity: 0.9
              }}>
                Área reservada para vídeo explicativo
              </p>
              <p style={{
                fontSize: '0.9rem',
                opacity: 0.7
              }}>
                (Será adicionado posteriormente)
              </p>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section style={{ background: 'white', padding: '4rem 0' }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 700,
              marginBottom: '3rem',
              color: '#1f2937'
            }}>
              {t('socialProofTitle')}
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {[
                { testimonial: 'testimonial1', author: 'Maria S.', location: 'Miami, FL' },
                { testimonial: 'testimonial2', author: 'João P.', location: 'Orlando, FL' }
              ].map((item, i) => (
                <div key={i} style={{
                  background: '#f8fafc',
                  borderRadius: '20px',
                  padding: '2rem',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ color: '#fbbf24', marginBottom: '1rem' }}>⭐⭐⭐⭐⭐</div>
                  <p style={{
                    fontSize: '1rem',
                    color: '#374151',
                    lineHeight: 1.6,
                    marginBottom: '1rem',
                    fontStyle: 'italic'
                  }}>
                    {t(item.testimonial as keyof typeof content)}
                  </p>
                  <div style={{
                    fontWeight: 600,
                    color: '#1f2937'
                  }}>
                    {item.author} - {item.location}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section - GATILHO DE ESCASSEZ */}
        <section style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #f59e0b 100%)',
          padding: '4rem 0'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 2rem',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 900,
              marginBottom: '2rem',
              color: '#92400e'
            }}>
              {t('priceTitle')}
            </h2>

            <div style={{
              background: 'white',
              borderRadius: '25px',
              padding: '3rem 2rem',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              border: '3px solid #f59e0b',
              position: 'relative'
            }}>
              {/* Scarcity Badge */}
              <div style={{
                position: 'absolute',
                top: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                color: 'white',
                padding: '0.8rem 1.5rem',
                borderRadius: '25px',
                fontWeight: 700,
                fontSize: '0.9rem',
                boxShadow: '0 8px 20px rgba(245, 158, 11, 0.3)'
              }}>
                {t('limitedTime')}
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <div style={{
                  fontSize: '1.2rem',
                  color: '#6b7280',
                  textDecoration: 'line-through',
                  marginBottom: '0.5rem'
                }}>
                  {t('originalPrice')}
                </div>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 900,
                  color: '#f59e0b',
                  marginBottom: '0.5rem'
                }}>
                  {t('specialPrice')}
                </div>
                <div style={{
                  fontSize: '1.1rem',
                  color: '#059669',
                  fontWeight: 700
                }}>
                  {t('savings')}
                </div>
              </div>

              <a href="https://wa.me/17862535032?text=🔥 QUERO APROVEITAR a oferta especial de $10 para avaliação personalizada! Pode me ajudar?" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <button className="pulse-animation" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '1rem',
                  background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: 900,
                  padding: '1.25rem 2.5rem',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 15px 35px rgba(245, 158, 11, 0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  <span>🔥</span>
                  <span>QUERO APROVEITAR AGORA</span>
                  <span>→</span>
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="formulario" style={{ background: 'white', padding: '5rem 0' }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                fontWeight: 900,
                marginBottom: '1rem',
                color: '#1f2937'
              }}>
                {t('formTitle')}
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: '#6b7280',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                {t('formSubtitle')}
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{
              background: '#f8fafc',
              borderRadius: '25px',
              padding: '3rem',
              border: '2px solid #e2e8f0'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                    color: '#374151'
                  }}>
                    {t('nameLabel')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '2px solid #d1d5db',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                    color: '#374151'
                  }}>
                    {t('goalsLabel')} *
                  </label>
                  <select
                    required
                    value={formData.goal}
                    onChange={(e) => setFormData({...formData, goal: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '2px solid #d1d5db',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s ease',
                      background: 'white'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  >
                    <option value="">Selecione seu objetivo</option>
                    {(t('goalsOptions') as string[]).map((goal: string, i: number) => (
                      <option key={i} value={goal}>{goal}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <button type="submit" className="pulse-animation" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '1rem',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: 900,
                  padding: '1.5rem 3rem',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 20px 40px rgba(34, 197, 94, 0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  <span>💳</span>
                  <span>{t('submitButton')}</span>
                  <span>→</span>
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Guarantee Section */}
        <section style={{ background: '#f0fdf4', padding: '4rem 0' }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 2rem',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 700,
              marginBottom: '2rem',
              color: '#059669'
            }}>
              🛡️ {t('guaranteeTitle')}
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#047857',
              lineHeight: 1.6,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {t('guaranteeText')}
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ background: 'white', padding: '4rem 0' }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 700,
              marginBottom: '3rem',
              textAlign: 'center',
              color: '#1f2937'
            }}>
              {t('faqTitle')}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { question: 'faq1', answer: 'faq1Answer' },
                { question: 'faq2', answer: 'faq2Answer' },
                { question: 'faq3', answer: 'faq3Answer' }
              ].map((faq, i) => (
                <div key={i} style={{
                  border: '2px solid #e5e7eb',
                  borderRadius: '15px',
                  overflow: 'hidden'
                }}>
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    style={{
                      width: '100%',
                      padding: '1.5rem',
                      background: 'white',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: '#1f2937',
                      transition: 'background-color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  >
                    <span>{t(faq.question as keyof typeof content)}</span>
                    <span style={{
                      fontSize: '1.5rem',
                      transition: 'transform 0.3s ease',
                      transform: activeFaq === i ? 'rotate(45deg)' : 'rotate(0deg)'
                    }}>
                      {activeFaq === i ? '−' : '+'}
                    </span>
                  </button>
                  
                  {activeFaq === i && (
                    <div style={{
                      padding: '0 1.5rem 1.5rem',
                      background: '#f9fafb',
                      borderTop: '1px solid #e5e7eb'
                    }}>
                      <p style={{
                        color: '#6b7280',
                        lineHeight: 1.6,
                        margin: 0
                      }}>
                        {t(faq.answer as keyof typeof content)}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section style={{
          background: 'linear-gradient(135deg, #1e293b, #334155)',
          color: 'white',
          padding: '4rem 0',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 900,
              marginBottom: '1.5rem',
              lineHeight: 1.2
            }}>
              {t('finalCtaTitle')}
            </h2>
            <p style={{
              fontSize: '1.1rem',
              marginBottom: '2.5rem',
              opacity: 0.9,
              lineHeight: 1.5
            }}>
              {t('finalCtaText')}
            </p>
            
            <a href="https://wa.me/17862535032?text=🚀 QUERO MINHA AVALIAÇÃO DE $10! Pode me ajudar com a avaliação personalizada?" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button className="pulse-animation" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: 900,
                padding: '1.5rem 3rem',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                  transition: 'all 0.3s ease',
                boxShadow: '0 20px 40px rgba(34, 197, 94, 0.4)',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                <span>🚀</span>
                <span>QUERO MINHA AVALIAÇÃO DE $10</span>
                <span>→</span>
              </button>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          background: '#1f2937',
          color: 'white',
          padding: '2rem 0',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            <p style={{
              color: '#9ca3af',
              fontSize: '0.9rem',
              lineHeight: 1.5
            }}>
              {t('footerText')}
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}
