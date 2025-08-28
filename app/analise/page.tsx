'use client'

import { useState } from 'react'
import Link from 'next/link'

type Language = 'pt' | 'es' | 'en'

const content = {
  // Headers e Títulos
  pageTitle: { pt: 'Análise IA Personalizada', es: 'Análisis IA Personalizado', en: 'Personalized AI Analysis' },
  heroTitle: { 
    pt: 'Descubra Seus\nProdutos Ideais', 
    es: 'Descubre Tus\nProductos Ideales', 
    en: 'Discover Your\nIdeal Products' 
  },
  heroSubtitle: { 
    pt: 'Análise personalizada gratuita - apenas 2-3 minutos', 
    es: 'Análisis personalizado gratuito - solo 2-3 minutos', 
    en: 'Free personalized analysis - only 2-3 minutes' 
  },
  
  // Navegação
  backToHome: { pt: '← Voltar para home', es: '← Volver a inicio', en: '← Back to home' },
  
  // Progresso
  progressText: { pt: 'Pergunta', es: 'Pregunta', en: 'Question' },
  progressOf: { pt: 'de', es: 'de', en: 'of' },
  
  // Perguntas
  question1: { 
    pt: 'Qual seu maior desafio de saúde nos EUA?', 
    es: '¿Cuál es tu mayor desafío de salud en USA?', 
    en: 'What is your biggest health challenge in the USA?' 
  },
  question2: { 
    pt: 'Qual sua faixa etária?', 
    es: '¿Cuál es tu rango de edad?', 
    en: 'What is your age range?' 
  },
  question3: { 
    pt: 'Qual seu objetivo principal?', 
    es: '¿Cuál es tu objetivo principal?', 
    en: 'What is your main goal?' 
  },
  
  // Respostas
  answer1a: { pt: 'A Manter energia durante o dia todo', es: 'A Mantener energía durante todo el día', en: 'A Maintain energy throughout the day' },
  answer1b: { pt: 'B Melhorar a qualidade do sono', es: 'B Mejorar la calidad del sueño', en: 'B Improve sleep quality' },
  answer1c: { pt: 'C Controlar o peso', es: 'C Controlar el peso', en: 'C Control weight' },
  answer1d: { pt: 'D Fortalecer o sistema imunológico', es: 'D Fortalecer el sistema inmunológico', en: 'D Strengthen immune system' },
  
  answer2a: { pt: 'A 18-25 anos', es: 'A 18-25 años', en: 'A 18-25 years' },
  answer2b: { pt: 'B 26-35 anos', es: 'B 26-35 años', en: 'B 26-35 years' },
  answer2c: { pt: 'C 36-45 anos', es: 'C 36-45 años', en: 'C 36-45 years' },
  answer2d: { pt: 'D 46+ anos', es: 'D 46+ años', en: 'D 46+ years' },
  
  answer3a: { pt: 'A Perder peso', es: 'A Perder peso', en: 'A Lose weight' },
  answer3b: { pt: 'B Ganhar massa muscular', es: 'B Ganar masa muscular', en: 'B Gain muscle mass' },
  answer3c: { pt: 'C Melhorar o bem-estar geral', es: 'C Mejorar el bienestar general', en: 'C Improve general well-being' },
  answer3d: { pt: 'D Aumentar a performance', es: 'D Aumentar el rendimiento', en: 'D Increase performance' },
  
  // Botões
  nextButton: { pt: 'Próxima Pergunta', es: 'Siguiente Pregunta', en: 'Next Question' },
  startAnalysis: { pt: 'Começar Análise', es: 'Comenzar Análisis', en: 'Start Analysis' },
  
  // Footer
  footerText: { 
    pt: 'Análise personalizada para brasileiros nos EUA', 
    es: 'Análisis personalizado para latinos en USA', 
    en: 'Personalized analysis for Brazilians in the USA' 
  }
}

export default function AnalisePage() {
  const [language, setLanguage] = useState<Language>('pt')
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [answers, setAnswers] = useState<{ [key: string]: string }>({})

  const t = (key: keyof typeof content) => content[key]?.[language] || content[key]?.pt || key

  const questions = [
    {
      id: 1,
      question: 'question1',
      answers: [
        { key: '1a', text: 'answer1a' },
        { key: '1b', text: 'answer1b' },
        { key: '1c', text: 'answer1c' },
        { key: '1d', text: 'answer1d' }
      ]
    },
    {
      id: 2,
      question: 'question2',
      answers: [
        { key: '2a', text: 'answer2a' },
        { key: '2b', text: 'answer2b' },
        { key: '2c', text: 'answer2c' },
        { key: '2d', text: 'answer2d' }
      ]
    },
    {
      id: 3,
      question: 'question3',
      answers: [
        { key: '3a', text: 'answer3a' },
        { key: '3b', text: 'answer3b' },
        { key: '3c', text: 'answer3c' },
        { key: '3d', text: 'answer3d' }
      ]
    }
  ]

  const handleAnswer = (answerKey: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: answerKey }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const currentQuestionData = questions.find(q => q.id === currentQuestion)

  return (
    <>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #22c55e, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: #22c55e !important;
        }
        
        .question-card {
          animation: fadeIn 0.5s ease-out;
        }
        
        .answer-option {
          transition: all 0.3s ease;
        }
        
        .answer-option:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        .answer-option.selected {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          border-color: transparent;
        }
        
        @media (max-width: 768px) {
          .header-nav {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem 0;
          }
          
          .nav-buttons {
            flex-wrap: wrap;
            justify-content: center;
          }
          
          .hero-title {
            font-size: clamp(1.8rem, 6vw, 2.5rem) !important;
          }
          
          .question-card {
            margin: 1rem;
            padding: 1.5rem;
          }
        }
      `}</style>

      <main style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Header Unificado com Logo, Navegação e Idioma */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '1rem 0',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 1000
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            {/* Header Layout */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '2rem'
            }} className="header-nav">
              {/* Logo MeuPortalFit */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                flexShrink: 0
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 900,
                  fontSize: '1.2rem'
                }}>
                  M
                </div>
                <span style={{
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  MeuPortalFit
                </span>
              </div>

              {/* Navegação para os 3 Tópicos */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap'
              }} className="nav-buttons">
                <Link href="/analise" style={{ textDecoration: 'none' }}>
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.6rem 1.2rem',
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    color: 'white',
                    border: '1px solid transparent',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 600,
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
                    gap: '0.5rem',
                    padding: '0.6rem 1.2rem',
                    background: 'transparent',
                    color: '#6b7280',
                    border: '1px solid #e5e7eb',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    transition: 'all 0.3s ease'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
                    e.currentTarget.style.color = 'white'
                    e.currentTarget.style.borderColor = 'transparent'
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#6b7280'
                    e.currentTarget.style.borderColor = '#e5e7eb'
                  }}>
                    <span>🛍️</span>
                    <span>Produtos</span>
                  </button>
                </Link>

                <Link href="/suporte" style={{ textDecoration: 'none' }}>
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.6rem 1.2rem',
                    background: 'transparent',
                    color: '#6b7280',
                    border: '1px solid #e5e7eb',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    transition: 'all 0.3s ease'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
                    e.currentTarget.style.color = 'white'
                    e.currentTarget.style.borderColor = 'transparent'
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#6b7280'
                    e.currentTarget.style.borderColor = '#e5e7eb'
                  }}>
                    <span>💬</span>
                    <span>Suporte</span>
                  </button>
                </Link>
              </div>

              {/* Idioma */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                flexShrink: 0
              }}>
                <span style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: 500 }}>Idioma:</span>
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  {[
                    { code: 'pt' as Language, flag: '🇧🇷', label: 'PT' },
                    { code: 'es' as Language, flag: '🇪🇸', label: 'ES' },
                    { code: 'en' as Language, flag: '🇺🇸', label: 'EN' }
                  ].map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        padding: '0.4rem 0.8rem',
                        background: language === lang.code ? 'linear-gradient(135deg, #22c55e, #3b82f6)' : 'transparent',
                        color: language === lang.code ? 'white' : '#6b7280',
                        border: language === lang.code ? 'none' : '1px solid #e5e7eb',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
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
          </div>
        </div>

        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #f0f9ff 100%)',
          padding: '3rem 0',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Animated Blobs */}
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
            filter: 'blur(40px)',
            opacity: 0.3,
            animation: 'fadeIn 8s ease-in-out infinite',
            zIndex: 1
          }}></div>

          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 2rem',
            position: 'relative',
            zIndex: 10,
            textAlign: 'center'
          }}>
            {/* Back to Home Link */}
            <div style={{ marginBottom: '2rem' }}>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <button style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.8rem 1.5rem',
                  background: 'white',
                  color: '#6b7280',
                  border: '1px solid #e5e7eb',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)'
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)'
                }}>
                  <span>←</span>
                  <span>{t('backToHome')}</span>
                </button>
              </Link>
            </div>

            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              color: '#1f2937',
              whiteSpace: 'pre-line'
            }} className="hero-title">
              <span className="gradient-text">{t('heroTitle').split('\n')[0]}</span>
              <br />
              <span style={{ color: '#3b82f6' }}>{t('heroTitle').split('\n')[1]}</span>
            </h1>

            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              marginBottom: '2rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto 2rem',
              lineHeight: 1.6
            }}>
              {t('heroSubtitle')}
            </p>

            {/* Progress Bar */}
            <div style={{
              background: '#e5e7eb',
              borderRadius: '25px',
              height: '8px',
              marginBottom: '1rem',
              overflow: 'hidden',
              maxWidth: '400px',
              margin: '0 auto 1rem'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                height: '100%',
                width: `${(currentQuestion / questions.length) * 100}%`,
                borderRadius: '25px',
                transition: 'width 0.5s ease'
              }}></div>
            </div>

            <p style={{
              color: '#6b7280',
              fontSize: '0.9rem',
              fontWeight: 500
            }}>
              {t('progressText')} {currentQuestion} {t('progressOf')} {questions.length}
            </p>
          </div>
        </section>

        {/* Question Section */}
        <section style={{ background: 'white', padding: '2rem 0' }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            {currentQuestionData && (
              <div className="question-card" style={{
                background: 'white',
                borderRadius: '25px',
                padding: '3rem 2rem',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                border: '2px solid #f3f4f6'
              }}>
                <h2 style={{
                  fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
                  fontWeight: 700,
                  marginBottom: '2rem',
                  color: '#1f2937',
                  textAlign: 'center',
                  lineHeight: 1.4
                }}>
                  {t(currentQuestionData.question as keyof typeof content)}
                </h2>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1rem',
                  marginBottom: '2rem'
                }}>
                  {currentQuestionData.answers.map((answer, index) => (
                    <button
                      key={answer.key}
                      onClick={() => handleAnswer(answer.key)}
                      className={`answer-option ${answers[currentQuestion] === answer.key ? 'selected' : ''}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1.5rem',
                        background: answers[currentQuestion] === answer.key ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'white',
                        color: answers[currentQuestion] === answer.key ? 'white' : '#374151',
                        border: '2px solid #e5e7eb',
                        borderRadius: '15px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: 500,
                        textAlign: 'left',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                      }}
                    >
                      <span style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        background: answers[currentQuestion] === answer.key ? 'rgba(255, 255, 255, 0.2)' : '#f3f4f6',
                        color: answers[currentQuestion] === answer.key ? 'white' : '#22c55e',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.9rem'
                      }}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{t(answer.text as keyof typeof content)}</span>
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                {answers[currentQuestion] && (
                  <div style={{ textAlign: 'center' }}>
                    <button
                      onClick={nextQuestion}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        padding: '1rem 2rem',
                        background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        transition: 'all 0.3s ease',
                        boxShadow: '0 15px 35px rgba(34, 197, 94, 0.4)'
                      }} onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)'
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(34, 197, 94, 0.5)'
                      }} onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = '0 15px 35px rgba(34, 197, 94, 0.4)'
                      }}
                    >
                      <span>{currentQuestion === questions.length ? '🚀' : '→'}</span>
                      <span>{currentQuestion === questions.length ? t('startAnalysis') : t('nextButton')}</span>
                    </button>
                  </div>
                )}
              </div>
            )}
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
            <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
              {t('footerText')}
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}
