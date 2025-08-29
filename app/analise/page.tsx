'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '../components/Header'

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
          .question-card {
            margin: 0.5rem;
            padding: 1rem;
          }
        }
      `}</style>

      <main style={{ position: 'relative', overflow: 'hidden', background: 'white' }}>
        {/* Header Unificado */}
        <Header language={language} onLanguageChange={setLanguage} />

        {/* Hero Section Mínimo Absoluto */}
        <section style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #f0f9ff 100%)',
          padding: '0.05rem 0',
          position: 'relative',
          overflow: 'hidden',
          minHeight: 'auto'
        }} className="hero-section">
          {/* Animated Blobs Mínimos */}
          <div style={{
            position: 'absolute',
            top: '2%',
            left: '2%',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
            filter: 'blur(15px)',
            opacity: 0.1,
            animation: 'fadeIn 8s ease-in-out infinite',
            zIndex: 1
          }}></div>

          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 1rem',
            position: 'relative',
            zIndex: 10,
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: 'clamp(1.3rem, 3.5vw, 2rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '0.3rem',
              color: '#1f2937',
              whiteSpace: 'pre-line'
            }} className="hero-title">
              <span className="gradient-text">{t('heroTitle').split('\n')[0]}</span>
              <br />
              <span style={{ color: '#3b82f6' }}>{t('heroTitle').split('\n')[1]}</span>
            </h1>

            <p style={{
              fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
              marginBottom: '0.3rem',
              color: '#6b7280',
              maxWidth: '400px',
              margin: '0 auto 0.3rem',
              lineHeight: 1.2
            }}>
              {t('heroSubtitle')}
            </p>

            {/* Progress Bar Mínimo Absoluto */}
            <div style={{
              background: '#e5e7eb',
              borderRadius: '8px',
              height: '2px',
              marginBottom: '0.1rem',
              overflow: 'hidden',
              maxWidth: '150px',
              margin: '0 auto 0.1rem'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                height: '100%',
                width: `${(currentQuestion / questions.length) * 100}%`,
                borderRadius: '8px',
                transition: 'width 0.5s ease'
              }}></div>
            </div>

            <p style={{
              color: '#6b7280',
              fontSize: '0.5rem',
              fontWeight: 500
            }}>
              {t('progressText')} {currentQuestion} {t('progressOf')} {questions.length}
            </p>
          </div>
        </section>

        {/* Question Section Ultra-Compacto */}
        <section style={{ background: 'white', padding: '0.5rem 0' }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 1rem'
          }}>
            {currentQuestionData && (
              <div className="question-card" style={{
                background: 'white',
                borderRadius: '16px',
                padding: '1.5rem 1rem',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                border: '2px solid #f3f4f6'
              }}>
                <h2 style={{
                  fontSize: 'clamp(1.2rem, 3.5vw, 1.6rem)',
                  fontWeight: 700,
                  marginBottom: '1.5rem',
                  color: '#1f2937',
                  textAlign: 'center',
                  lineHeight: 1.3
                }}>
                  {t(currentQuestionData.question as keyof typeof content)}
                </h2>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '0.8rem',
                  marginBottom: '1.5rem'
                }}>
                  {currentQuestionData.answers.map((answer, index) => (
                    <button
                      key={answer.key}
                      onClick={() => handleAnswer(answer.key)}
                      className={`answer-option ${answers[currentQuestion] === answer.key ? 'selected' : ''}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        padding: '1.2rem',
                        background: answers[currentQuestion] === answer.key ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'white',
                        color: answers[currentQuestion] === answer.key ? 'white' : '#374151',
                        border: '2px solid #e5e7eb',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        textAlign: 'left',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 3px 15px rgba(0, 0, 0, 0.08)'
                      }}
                    >
                      <span style={{
                        width: '25px',
                        height: '25px',
                        borderRadius: '50%',
                        background: answers[currentQuestion] === answer.key ? 'rgba(255, 255, 255, 0.2)' : '#f3f4f6',
                        color: answers[currentQuestion] === answer.key ? 'white' : '#22c55e',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.8rem'
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
                        gap: '0.6rem',
                        padding: '0.8rem 1.5rem',
                        background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: 700,
                        transition: 'all 0.3s ease',
                        boxShadow: '0 10px 25px rgba(34, 197, 94, 0.4)'
                      }} onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = '0 15px 30px rgba(34, 197, 94, 0.5)'
                      }} onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(34, 197, 94, 0.4)'
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

        {/* Footer Compacto */}
        <footer style={{
          background: '#1f2937',
          color: 'white',
          padding: '1.5rem 0',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 1rem'
          }}>
            <p style={{ color: '#9ca3af', fontSize: '0.8rem' }}>
              {t('footerText')}
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}
