'use client'

import { useState } from 'react'
import Link from 'next/link'

type Language = 'pt' | 'es' | 'en'

interface Question {
  id: number
  pt?: string
  es?: string  
  en?: string
  text?: {
    pt: string
    es: string
    en: string
  }
  subtitle?: {
    pt: string
    es: string
    en: string
  }
  options?: {
    pt: string[]
    es: string[]
    en: string[]
  }
  answers?: {
    pt: string[]
    es: string[]
    en: string[]
  }
  type?: 'comment'
  category: 'lifestyle' | 'health' | 'budget' | 'goals' | 'additional'
}

// 8 perguntas estratégicas com gatilhos mentais
const questions: Question[] = [
  {
    id: 1,
    pt: "Qual seu maior desafio de saúde nos EUA?",
    es: "¿Cuál es tu mayor desafío de salud en USA?",
    en: "What's your biggest health challenge in the USA?",
    options: {
      pt: [
        "Manter energia durante o dia todo",
        "Controlar ansiedade e estresse",
        "Melhorar qualidade do sono",
        "Fortalecer imunidade",
        "Controlar peso de forma saudável"
      ],
      es: [
        "Mantener energía durante todo el día",
        "Controlar ansiedad y estrés",
        "Mejorar calidad del sueño",
        "Fortalecer inmunidad",
        "Controlar peso de forma saludable"
      ],
      en: [
        "Maintaining energy throughout the day",
        "Managing anxiety and stress",
        "Improving sleep quality",
        "Strengthening immunity",
        "Managing weight healthily"
      ]
    },
    category: 'health'
  },
  {
    id: 2,
    pt: "Como é sua rotina de trabalho/estudos?",
    es: "¿Cómo es tu rutina de trabajo/estudios?",
    en: "What's your work/study routine like?",
    options: {
      pt: [
        "Home office - muito sedentária",
        "Trabalho presencial - pouco tempo livre",
        "Estudante - horários irregulares",
        "Trabalho físico - muito cansaço",
        "Autônoma - horários flexíveis"
      ],
      es: [
        "Oficina en casa - muy sedentaria",
        "Trabajo presencial - poco tiempo libre",
        "Estudiante - horarios irregulares",
        "Trabajo físico - mucho cansancio",
        "Autónoma - horarios flexibles"
      ],
      en: [
        "Home office - very sedentary",
        "Office work - little free time",
        "Student - irregular schedule",
        "Physical work - very tiring",
        "Self-employed - flexible hours"
      ]
    },
    category: 'lifestyle'
  },
  {
    id: 3,
    pt: "Quanto você investe mensalmente em saúde/bem-estar?",
    es: "¿Cuánto inviertes mensualmente en salud/bienestar?",
    en: "How much do you invest monthly in health/wellness?",
    options: {
      pt: [
        "Menos de $50 - orçamento apertado",
        "$50-100 - investimento moderado",
        "$100-200 - priorizo minha saúde",
        "$200-300 - saúde é prioridade máxima",
        "Mais de $300 - sem limites para bem-estar"
      ],
      es: [
        "Menos de $50 - presupuesto ajustado",
        "$50-100 - inversión moderada",
        "$100-200 - priorizo mi salud",
        "$200-300 - salud es máxima prioridad",
        "Más de $300 - sin límites para bienestar"
      ],
      en: [
        "Less than $50 - tight budget",
        "$50-100 - moderate investment",
        "$100-200 - I prioritize my health",
        "$200-300 - health is top priority",
        "More than $300 - no limits for wellness"
      ]
    },
    category: 'budget'
  },
  {
    id: 4,
    pt: "Qual sua experiência com suplementos nos EUA?",
    es: "¿Cuál es tu experiencia con suplementos en USA?",
    en: "What's your experience with supplements in the USA?",
    options: {
      pt: [
        "Nunca usei - não sei por onde começar",
        "Já tentei alguns - resultados ruins",
        "Uso poucos - quero otimizar escolhas",
        "Uso vários - busco mais eficiência",
        "Expert - sempre teste novidades"
      ],
      es: [
        "Nunca usé - no sé por dónde empezar",
        "Ya probé algunos - malos resultados",
        "Uso pocos - quiero optimizar elecciones",
        "Uso varios - busco más eficiencia",
        "Experta - siempre pruebo novedades"
      ],
      en: [
        "Never used - don't know where to start",
        "Tried some - poor results",
        "Use few - want to optimize choices",
        "Use several - seeking more efficiency",
        "Expert - always try new things"
      ]
    },
    category: 'health'
  },
  {
    id: 5,
    pt: "Como você toma decisões de compra importantes?",
    es: "¿Cómo tomas decisiones de compra importantes?",
    en: "How do you make important purchase decisions?",
    options: {
      pt: [
        "Pesquiso tudo antes - sou muito criteriosa",
        "Confio em recomendações de amigas",
        "Leio reviews e avaliações detalhadamente",
        "Preciso de garantia e facilidade de devolução",
        "Decido rápido se faz sentido para mim"
      ],
      es: [
        "Investigo todo antes - soy muy criteriosa",
        "Confío en recomendaciones de amigas",
        "Leo reviews y evaluaciones detalladamente",
        "Necesito garantía y facilidad de devolución",
        "Decido rápido si tiene sentido para mí"
      ],
      en: [
        "Research everything - I'm very thorough",
        "Trust friends' recommendations",
        "Read reviews and ratings carefully",
        "Need warranty and easy returns",
        "Decide quickly if it makes sense to me"
      ]
    },
    category: 'lifestyle'
  },
  {
    id: 6,
    pt: "Qual seu principal objetivo de saúde para 2025?",
    es: "¿Cuál es tu principal objetivo de salud para 2025?",
    en: "What's your main health goal for 2025?",
    options: {
      pt: [
        "Ter mais energia e disposição diária",
        "Reduzir ansiedade e melhorar humor",
        "Fortalecer cabelo, pele e unhas",
        "Melhorar digestão e saúde intestinal",
        "Otimizar saúde hormonal"
      ],
      es: [
        "Tener más energía y disposición diaria",
        "Reducir ansiedad y mejorar humor",
        "Fortalecer cabello, piel y uñas",
        "Mejorar digestión y salud intestinal",
        "Optimizar salud hormonal"
      ],
      en: [
        "Have more daily energy and vitality",
        "Reduce anxiety and improve mood",
        "Strengthen hair, skin and nails",
        "Improve digestion and gut health",
        "Optimize hormonal health"
      ]
    },
    category: 'goals'
  },
  {
    id: 7,
    pt: "Como você prefere receber recomendações personalizadas?",
    es: "¿Cómo prefieres recibir recomendaciones personalizadas?",
    en: "How do you prefer to receive personalized recommendations?",
    options: {
      pt: [
        "Lista simples - 3-5 produtos essenciais",
        "Explicação detalhada - por que cada um",
        "Cronograma de uso - quando tomar cada um",
        "Comparação de preços - melhor custo-benefício",
        "Plano completo - estilo de vida integrado"
      ],
      es: [
        "Lista simple - 3-5 productos esenciales",
        "Explicación detallada - por qué cada uno",
        "Cronograma de uso - cuándo tomar cada uno",
        "Comparación de precios - mejor costo-beneficio",
        "Plan completo - estilo de vida integrado"
      ],
      en: [
        "Simple list - 3-5 essential products",
        "Detailed explanation - why each one",
        "Usage schedule - when to take each",
        "Price comparison - best value",
        "Complete plan - integrated lifestyle"
      ]
    },
    category: 'lifestyle'
  },
  {
    id: 8,
    pt: "Qual fator mais influencia sua confiança numa marca?",
    es: "¿Qué factor más influye en tu confianza en una marca?",
    en: "What factor most influences your trust in a brand?",
    options: {
      pt: [
        "Ingredientes naturais e orgânicos",
        "Certificações e testes de laboratório",
        "Avaliações de outras brasileiras/latinas",
        "Preço justo com qualidade comprovada",
        "Facilidade de compra e entrega rápida"
      ],
      es: [
        "Ingredientes naturales y orgánicos",
        "Certificaciones y tests de laboratorio",
        "Evaluaciones de otras brasileñas/latinas",
        "Precio justo con calidad comprobada",
        "Facilidad de compra y entrega rápida"
      ],
      en: [
        "Natural and organic ingredients",
        "Certifications and lab testing",
        "Reviews from other Brazilian/Latina women",
        "Fair price with proven quality",
        "Easy purchase and fast delivery"
      ]
    },
    category: 'goals'
  },
  {
    id: 9,
    type: 'comment' as const,
    text: {
      pt: "Alguma restrição ou preferência específica?",
      es: "¿Alguna restricción o preferencia específica?", 
      en: "Any specific restrictions or preferences?"
    },
    subtitle: {
      pt: "Ex: intolerância à lactose, preferência vegana, alergias, medicamentos que usa, objetivos específicos...",
      es: "Ej: intolerancia a la lactosa, preferencia vegana, alergias, medicamentos que usa, objetivos específicos...",
      en: "Ex: lactose intolerance, vegan preference, allergies, medications you take, specific goals..."
    },
    options: {
      pt: [],
      es: [],
      en: []
    },
    category: 'additional'
  }
]

export default function AnalysisPage() {
  const [language, setLanguage] = useState<Language>('pt')
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [comments, setComments] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const currentQuestion = questions[currentStep]
  const isLastQuestion = currentStep === questions.length - 1
  const progress = ((currentStep + 1) / questions.length) * 100

  const handleAnswer = async (optionIndex: number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: optionIndex }
    setAnswers(newAnswers)

    if (isLastQuestion) {
      // Enviar para análise
      setIsAnalyzing(true)
      
      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            answers: newAnswers,
            comments: comments.trim(),
            language: language
          })
        })

        const result = await response.json()
        
        if (result.success) {
          // Redirecionar para página de resultados
          const queryData = encodeURIComponent(JSON.stringify(result))
          window.location.href = `/analise/resultados?data=${queryData}`
        } else {
          alert('Erro na análise. Tente novamente.')
          setIsAnalyzing(false)
        }
      } catch (error) {
        console.error('Erro:', error)
        alert('Erro de conexão. Tente novamente.')
        setIsAnalyzing(false)
      }
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleCommentSubmit = async () => {
    if (isLastQuestion) {
      setIsAnalyzing(true)
      
      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            answers: answers,
            comments: comments.trim(),
            language: language
          })
        })

        const result = await response.json()
        
        if (result.success) {
          window.location.href = `/analise/resultados?data=${encodeURIComponent(JSON.stringify(result))}`
        }
      } catch (error) {
        console.error('Error:', error)
        setIsAnalyzing(false)
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  if (isAnalyzing) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #f0f9ff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '3rem',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          maxWidth: '500px'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid #f3f4f6',
            borderTop: '4px solid #22c55e',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 2rem'
          }}></div>
          <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>
            🧠 Analisando seu perfil...
          </h2>
          <p style={{ color: '#6b7280' }}>
            Nossa IA está processando suas respostas para encontrar os produtos ideais para você.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #f0f9ff 100%)',
        padding: '2rem 1rem'
      }}>
        {/* Header */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <Link href="/" style={{
            textDecoration: 'none',
            color: '#6b7280',
            fontSize: '0.9rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            ← Voltar para home
          </Link>
          
          <h1 style={{
            background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '2rem',
            fontWeight: 900,
            marginBottom: '0.5rem'
          }}>
            Descubra Seus Produtos Ideais
          </h1>
          
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
            {language === 'pt' && 'Análise personalizada gratuita - apenas 2-3 minutos'}
            {language === 'es' && 'Análisis personalizado gratuito - solo 2-3 minutos'}
            {language === 'en' && 'Free personalized analysis - just 2-3 minutes'}
          </p>

          {/* Progress Bar */}
          <div style={{
            width: '100%',
            height: '8px',
            background: '#f3f4f6',
            borderRadius: '10px',
            overflow: 'hidden',
            marginBottom: '1rem'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
              borderRadius: '10px',
              transition: 'width 0.3s ease'
            }}></div>
          </div>
          
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
            Pergunta {currentStep + 1} de {questions.length}
          </p>
        </div>

        {/* Question Card */}
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          background: 'white',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            color: '#1f2937',
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
{currentQuestion.text?.[language] || currentQuestion[language as keyof Question]}
          </h2>

          {currentQuestion.subtitle && (
            <p style={{
              color: '#6b7280',
              fontSize: '0.9rem',
              textAlign: 'center',
              marginBottom: '2rem',
              lineHeight: '1.5'
            }}>
              {currentQuestion.subtitle[language]}
            </p>
          )}

          {currentQuestion.type === 'comment' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder={
                  language === 'pt' ? 'Digite aqui suas restrições, alergias, preferências...' :
                  language === 'es' ? 'Escriba aquí sus restricciones, alergias, preferencias...' :
                  'Write here your restrictions, allergies, preferences...'
                }
                style={{
                  width: '100%',
                  minHeight: '120px',
                  padding: '1rem',
                  border: '2px solid #f3f4f6',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#22c55e'}
                onBlur={(e) => e.target.style.borderColor = '#f3f4f6'}
              />
              
              <button
                onClick={handleCommentSubmit}
                disabled={isAnalyzing}
                style={{
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  opacity: isAnalyzing ? 0.7 : 1
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {isAnalyzing ? '🔍 Analisando...' : 
                 language === 'pt' ? '🚀 Finalizar Análise' :
                 language === 'es' ? '🚀 Finalizar Análisis' :
                 '🚀 Complete Analysis'}
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {currentQuestion.options && currentQuestion.options[language].map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                style={{
                  padding: '1rem 1.5rem',
                  border: '2px solid #f3f4f6',
                  borderRadius: '12px',
                  background: 'white',
                  color: '#1f2937',
                  fontSize: '1rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#22c55e'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#f3f4f6'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <span style={{ fontWeight: 600, color: '#22c55e', marginRight: '1rem' }}>
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '2rem'
          }}>
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              style={{
                padding: '0.8rem 1.5rem',
                background: currentStep === 0 ? '#f9fafb' : 'white',
                color: currentStep === 0 ? '#9ca3af' : '#6b7280',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                cursor: currentStep === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              ← Anterior
            </button>
            
            <div style={{
              color: '#6b7280',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center'
            }}>
              🔒 Dados seguros e privados
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          maxWidth: '600px',
          margin: '2rem auto 0',
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '0.8rem'
        }}>
          <p>✅ Análise 100% gratuita • ⚡ Resultados em segundos • 🛡️ Recomendações personalizadas</p>
        </div>
      </div>
    </>
  )
}
