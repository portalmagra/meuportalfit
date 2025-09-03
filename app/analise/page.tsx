'use client'

import { useState, useEffect } from 'react'

// Traduções
const translations = {
  // Headers e Títulos
  pageTitle: { pt: 'Avaliação Personalizada', es: 'Evaluación Personalizada', en: 'Personalized Evaluation' },
  heroTitle: { 
    pt: 'Avaliação Gratuita\nfeita por Inteligência Artificial', 
    es: 'Evaluación Gratuita\nhecha por Inteligencia Artificial', 
    en: 'Free Evaluation\nmade by Artificial Intelligence' 
  },
  heroSubtitle: { 
    pt: 'Personalizada para brasileiros nos EUA', 
    es: 'Personalizada para latinos en USA', 
    en: 'Personalized for Brazilians in the USA' 
  },
  
  // Navegação
  backToHome: { pt: '← Voltar para home', es: '← Volver a inicio', en: '← Back to home' },
  
  // Progresso
  progressText: { pt: '', es: '', en: '' },
  progressOf: { pt: 'de', es: 'de', en: 'of' },
  
  // Perguntas Estratégicas com Gatilhos Mentais
  question1: { 
    pt: 'Qual seu maior desafio de saúde nos EUA? (Selecione o que mais te incomoda)', 
    es: '¿Cuál es tu mayor desafío de salud en USA? (Selecciona lo que más te molesta)', 
    en: 'What is your biggest health challenge in the USA? (Select what bothers you most)' 
  },
  question2: { 
    pt: 'Qual sua faixa etária e estilo de vida?', 
    es: '¿Cuál es tu rango de edad y estilo de vida?', 
    en: 'What is your age range and lifestyle?' 
  },
  question3: { 
    pt: 'Qual seu objetivo principal? (Seja específico)', 
    es: '¿Cuál es tu objetivo principal? (Sé específico)', 
    en: 'What is your main goal? (Be specific)' 
  },
  question4: { 
    pt: 'Como é sua rotina atual? (Honestidade é fundamental)', 
    es: '¿Cómo es tu rutina actual? (La honestidad es fundamental)', 
    en: 'How is your current routine? (Honesty is fundamental)' 
  },
  question5: { 
    pt: 'Quantas vezes você tentou e falhou? (Não se culpe)', 
    es: '¿Cuántas veces has intentado y fallado? (No te culpes)', 
    en: 'How many times have you tried and failed? (Don\'t blame yourself)' 
  },
  question7: { 
    pt: 'Em quanto tempo você quer ver resultados?', 
    es: '¿En cuánto tiempo quieres ver resultados?', 
    en: 'How soon do you want to see results?' 
  },
  question8: { 
    pt: 'O que você está disposto a fazer AGORA para mudar?', 
    es: '¿Qué estás dispuesto a hacer AHORA para cambiar?', 
    en: 'What are you willing to do NOW to change?' 
  },
  
  // Respostas Estratégicas com Gatilhos Mentais
  answer1a: { pt: 'Manter energia durante o dia todo (Sempre cansado)', es: 'Mantener energía durante todo el día (Siempre cansado)', en: 'Maintain energy throughout the day (Always tired)' },
  answer1b: { pt: 'Melhorar a qualidade do sono (Insônia frequente)', es: 'Mejorar la calidad del sueño (Insomnio frecuente)', en: 'Improve sleep quality (Frequent insomnia)' },
  answer1c: { pt: 'Controlar o peso (Já tentou de tudo)', es: 'Controlar el peso (Ya intentaste de todo)', en: 'Control weight (Tried everything already)' },
  answer1d: { pt: 'Fortalecer o sistema imunológico (Sempre doente)', es: 'Fortalecer el sistema inmunológico (Siempre enfermo)', en: 'Strengthen immune system (Always sick)' },
  
  answer2a: { pt: '18-25 anos (Vida agitada, muita energia)', es: '18-25 años (Vida agitada, mucha energía)', en: '18-25 years (Busy life, lots of energy)' },
  answer2b: { pt: '26-35 anos (Carreira em ascensão, estresse)', es: '26-35 años (Carrera en ascenso, estrés)', en: '26-35 years (Rising career, stress)' },
  answer2c: { pt: '36-45 anos (Equilíbrio família-trabalho)', es: '36-45 años (Equilibrio familia-trabajo)', en: '36-45 years (Family-work balance)' },
  answer2d: { pt: '46+ anos (Foco em qualidade de vida)', es: '46+ años (Enfoque en calidad de vida)', en: '46+ years (Focus on quality of life)' },
  
  answer3a: { pt: 'Perder peso (Já tentou dietas sem sucesso)', es: 'Perder peso (Ya intentaste dietas sin éxito)', en: 'Lose weight (Tried diets without success)' },
  answer3b: { pt: 'Ganhar massa muscular (Quer se sentir forte)', es: 'Ganar masa muscular (Quieres sentirte fuerte)', en: 'Gain muscle mass (Want to feel strong)' },
  answer3c: { pt: 'Melhorar o bem-estar geral (Quer mais qualidade de vida)', es: 'Mejorar el bienestar general (Quieres más calidad de vida)', en: 'Improve general well-being (Want better quality of life)' },
  answer3d: { pt: 'Aumentar a performance (Quer ser melhor em tudo)', es: 'Aumentar el rendimiento (Quieres ser mejor en todo)', en: 'Increase performance (Want to be better at everything)' },
  
  answer4a: { pt: 'Rotina caótica (Sem horários fixos)', es: 'Rutina caótica (Sin horarios fijos)', en: 'Chaotic routine (No fixed schedules)' },
  answer4b: { pt: 'Rotina rígida (Muito trabalho, pouco tempo)', es: 'Rutina rígida (Mucho trabajo, poco tiempo)', en: 'Rigid routine (Lots of work, little time)' },
  answer4c: { pt: 'Rotina equilibrada (Tenta manter hábitos)', es: 'Rutina equilibrada (Intenta mantener hábitos)', en: 'Balanced routine (Tries to maintain habits)' },
  answer4d: { pt: 'Rotina flexível (Adapta-se às mudanças)', es: 'Rutina flexible (Se adapta a los cambios)', en: 'Flexible routine (Adapts to changes)' },
  
  answer5a: { pt: '1-2 vezes (Ainda acredita)', es: '1-2 veces (Aún cree)', en: '1-2 times (Still believes)' },
  answer5b: { pt: '3-5 vezes (Frustrado mas persistente)', es: '3-5 veces (Frustrado pero persistente)', en: '3-5 times (Frustrated but persistent)' },
  answer5c: { pt: '6-10 vezes (Quase desistindo)', es: '6-10 veces (Casi desistiendo)', en: '6-10 times (Almost giving up)' },
  answer5d: { pt: '10+ vezes (Precisa de ajuda especializada)', es: '10+ veces (Necesita ayuda especializada)', en: '10+ times (Needs specialized help)' },
  
  answer7a: { pt: '1-2 semanas (Resultados rápidos)', es: '1-2 semanas (Resultados rápidos)', en: '1-2 weeks (Quick results)' },
  answer7b: { pt: '1 mês (Mudança visível)', es: '1 mes (Cambio visible)', en: '1 month (Visible change)' },
  answer7c: { pt: '3 meses (Transformação real)', es: '3 meses (Transformación real)', en: '3 months (Real transformation)' },
  answer7d: { pt: '6 meses (Mudança permanente)', es: '6 meses (Cambio permanente)', en: '6 months (Permanent change)' },
  
  answer8a: { pt: 'Mudar hábitos alimentares (Começar hoje)', es: 'Cambiar hábitos alimentarios (Empezar hoy)', en: 'Change eating habits (Start today)' },
  answer8b: { pt: 'Adicionar exercícios (Sem desculpas)', es: 'Agregar ejercicios (Sin excusas)', en: 'Add exercises (No excuses)' },
  answer8c: { pt: 'Suplementação inteligente (Apoio científico)', es: 'Suplementación inteligente (Apoyo científico)', en: 'Smart supplementation (Scientific support)' },
  answer8d: { pt: 'Tudo junto (Transformação completa)', es: 'Todo junto (Transformación completa)', en: 'Everything together (Complete transformation)' },
  
  // Botões
  nextButton: { pt: 'Próxima', es: 'Siguiente', en: 'Next' },
  seeResults: { pt: 'Ver Resultados', es: 'Ver Resultados', en: 'See Results' },
  backButton: { pt: 'Anterior', es: 'Anterior', en: 'Previous' },
  restartButton: { pt: 'Recomeçar', es: 'Reiniciar', en: 'Restart' },
  
  // Informações Adicionais
  additionalInfo: { pt: 'Informações Adicionais', es: 'Información Adicional', en: 'Additional Information' },
  optional: { pt: '(Opcional)', es: '(Opcional)', en: '(Optional)' },
  additionalInfoPlaceholder: { 
    pt: 'Conte-nos mais sobre seus objetivos, rotina, ou qualquer informação que possa ajudar na análise...', 
    es: 'Cuéntanos más sobre tus objetivos, rutina, o cualquier información que pueda ayudar en el análisis...', 
    en: 'Tell us more about your goals, routine, or any information that can help with the analysis...' 
  },
  
  // Menu
  menuTitle: { pt: 'Menu', es: 'Menú', en: 'Menu' },
  languageTitle: { pt: 'Idioma', es: 'Idioma', en: 'Language' },
  contactUs: { pt: 'Fale Conosco', es: 'Contáctanos', en: 'Contact Us' }
}

export default function AnalisePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: string]: string }>({})
  const [language, setLanguage] = useState('pt')
  const [comments, setComments] = useState('')
  const [showComments, setShowComments] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const t = (key: string) => {
    const translation = translations[key as keyof typeof translations]
    if (translation && typeof translation === 'object' && language in translation) {
      return translation[language as keyof typeof translation]
    }
    return key
  }

  // Perguntas estratégicas com traduções
  const getQuestions = () => [
    { 
      id: '1', 
      text: t('question1'), 
      options: [t('answer1a'), t('answer1b'), t('answer1c'), t('answer1d')] 
    },
    { 
      id: '2', 
      text: t('question2'), 
      options: [t('answer2a'), t('answer2b'), t('answer2c'), t('answer2d')] 
    },
    { 
      id: '3', 
      text: t('question3'), 
      options: [t('answer3a'), t('answer3b'), t('answer3c'), t('answer3d')] 
    },
    { 
      id: '4', 
      text: t('question4'), 
      options: [t('answer4a'), t('answer4b'), t('answer4c'), t('answer4d')] 
    },
    { 
      id: '5', 
      text: t('question5'), 
      options: [t('answer5a'), t('answer5b'), t('answer5c'), t('answer5d')] 
    },
    { 
      id: '7', 
      text: t('question7'), 
      options: [t('answer7a'), t('answer7b'), t('answer7c'), t('answer7d')] 
    },
    { 
      id: '8', 
      text: t('question8'), 
      options: [t('answer8a'), t('answer8b'), t('answer8c'), t('answer8d')] 
    }
  ]

  const questions = getQuestions()

  // Detectar se é mobile
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Função para analisar o perfil
  const analyzeProfile = async () => {
    setLoading(true)
    
    try {
      const answersParam = encodeURIComponent(JSON.stringify(answers))
      const commentsParam = encodeURIComponent(comments)
      
      // Redirecionar para a página de resultados
      window.location.href = `/resultados?answers=${answersParam}&comments=${commentsParam}`
    } catch (error) {
      console.error('Erro ao redirecionar:', error)
      setLoading(false)
    }
  }

  const handleAnswer = (questionId: string, answer: string) => {
    // Encontrar o índice da opção selecionada
    const currentQuestionObj = questions.find(q => q.id === questionId)
    const optionIndex = currentQuestionObj?.options.indexOf(answer) || 0
    const answerKey = String.fromCharCode(97 + optionIndex) // 'a', 'b', 'c', 'd'
    
    setAnswers(prev => ({ ...prev, [questionId]: answerKey }))
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setShowComments(true)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      // Na última pergunta, chamar analyzeProfile
      analyzeProfile()
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleStartOver = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setComments('')
    setShowComments(false)
  }

  return (
    <>
      <main style={{ position: 'relative', overflow: 'hidden', background: 'white' }}>
        {/* Header */}
        <header style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '1rem 0',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 1000
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexShrink: 0 }}>
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
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                {/* Menu Hamburger */}
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '3px',
                      padding: '0.5rem',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      width: '20px',
                      height: '2px',
                      background: '#6b7280',
                      borderRadius: '1px'
                    }}></div>
                    <div style={{
                      width: '20px',
                      height: '2px',
                      background: '#6b7280',
                      borderRadius: '1px'
                    }}></div>
                    <div style={{
                      width: '20px',
                      height: '2px',
                      background: '#6b7280',
                      borderRadius: '1px'
                    }}></div>
                  </button>
                  
                  {/* Menu Dropdown */}
                  {showMenu && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      background: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      padding: '1rem',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                      minWidth: '200px',
                      zIndex: 1000
                    }}>
                      <div style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '0.8rem'
                      }}>
                        {t('languageTitle')}
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                        <button
                          onClick={() => {
                            setLanguage('pt')
                            setShowMenu(false)
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem',
                            background: language === 'pt' ? '#f0fdf4' : 'transparent',
                            color: language === 'pt' ? '#22c55e' : '#6b7280',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: language === 'pt' ? '600' : '400'
                          }}
                        >
                          <span>🇧🇷</span>
                          <span>Português</span>
                        </button>
                        
                        <button
                          onClick={() => {
                            setLanguage('es')
                            setShowMenu(false)
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem',
                            background: language === 'es' ? '#f0fdf4' : 'transparent',
                            color: language === 'es' ? '#22c55e' : '#6b7280',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: language === 'es' ? '600' : '400'
                          }}
                        >
                          <span>🇪🇸</span>
                          <span>Español</span>
                        </button>
                        
                        <button
                          onClick={() => {
                            setLanguage('en')
                            setShowMenu(false)
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem',
                            background: language === 'en' ? '#f0fdf4' : 'transparent',
                            color: language === 'en' ? '#22c55e' : '#6b7280',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: language === 'en' ? '600' : '400'
                          }}
                        >
                          <span>🇺🇸</span>
                          <span>English</span>
                        </button>
                      </div>
                      
                      <div style={{
                        borderTop: '1px solid #e5e7eb',
                        paddingTop: '0.8rem'
                      }}>
                        <a href="https://wa.me/17862535032?text=Olá! Gostaria de saber mais sobre o MeuPortalFit." target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                          <button style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem',
                            background: 'linear-gradient(135deg, #25d366, #128c7e)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            width: '100%',
                            justifyContent: 'center'
                          }}>
                            <span>💬</span>
                            <span>{t('contactUs')}</span>
                          </button>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #f0f9ff 100%)',
          padding: '2rem 0',
          position: 'relative',
          overflow: 'hidden',
          minHeight: 'auto'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem', position: 'relative', zIndex: 10, textAlign: 'center' }}>
            <h1 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '0.5rem',
              color: '#1f2937',
              whiteSpace: 'pre-line'
            }}>
              <span style={{ background: 'linear-gradient(135deg, #22c55e, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {t('heroTitle').split('\n')[0]}
              </span>
              <br />
              <span style={{ color: '#3b82f6' }}>
                {t('heroTitle').split('\n')[1]}
              </span>
            </h1>
            
            {/* Progress simples - apenas se não for a primeira pergunta */}
            {currentQuestion > 0 && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
                fontSize: '1rem',
                color: '#6b7280',
                fontWeight: '500'
              }}>
                <span>{currentQuestion + 1} {t('progressOf')} {questions.length}</span>
              </div>
            )}
          </div>
        </section>

        {/* Quiz Section */}
        <section style={{ background: 'white', padding: '1rem 0' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
            {!showComments ? (
              <div>
                {/* Question */}
                <div style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '12px',
                  marginBottom: '2rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  border: '3px solid #e0f2e9'
                }}>
                  <h2 style={{
                    fontSize: isMobile ? '1.4rem' : '1.6rem',
                    color: '#1e293b',
                    marginBottom: '2rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    lineHeight: '1.4'
                  }}>
                    {t(`question${questions[currentQuestion].id}`)}
                  </h2>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1rem'
                  }}>
                    {questions[currentQuestion].options.map((option: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(questions[currentQuestion].id, option)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          padding: '1.5rem',
                          background: answers[questions[currentQuestion].id] === String.fromCharCode(97 + index) ? '#f0fdf4' : 'white',
                          border: answers[questions[currentQuestion].id] === String.fromCharCode(97 + index) ? '3px solid #22c55e' : '2px solid #e0f2e9',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          fontWeight: '500',
                          color: '#374151',
                          transition: 'all 0.3s ease',
                          textAlign: 'left',
                          width: '100%'
                        }}
                      >
                        <div style={{
                          width: '40px',
                          height: '40px',
                          background: answers[questions[currentQuestion].id] === String.fromCharCode(97 + index) ? 'linear-gradient(135deg, #22c55e, #16a34a)' : '#f8fafc',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: answers[questions[currentQuestion].id] === String.fromCharCode(97 + index) ? 'white' : '#6b7280',
                          fontWeight: 'bold',
                          fontSize: '1.1rem',
                          border: answers[questions[currentQuestion].id] === String.fromCharCode(97 + index) ? 'none' : '2px solid #e0f2e9'
                        }}>
                          {String.fromCharCode(97 + index)}
                        </div>
                        <span style={{ flex: 1 }}>{option}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Navigation Buttons */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '2rem'
                }}>
                  <button
                    onClick={handleBack}
                    disabled={currentQuestion === 0}
                    style={{
                      padding: '1rem 2rem',
                      background: currentQuestion === 0 ? '#f3f4f6' : 'linear-gradient(135deg, #6b7280, #4b5563)',
                      color: currentQuestion === 0 ? '#9ca3af' : 'white',
                      border: 'none',
                      borderRadius: '25px',
                      cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
                      fontSize: '1rem',
                      fontWeight: 600,
                      transition: 'all 0.3s ease',
                      opacity: currentQuestion === 0 ? 0.5 : 1
                    }}
                  >
                    ← {t('backButton')}
                  </button>
                  
                  <button
                    onClick={handleNext}
                    disabled={loading || !answers[questions[currentQuestion].id]}
                    style={{
                      padding: '1rem 2rem',
                      background: loading || !answers[questions[currentQuestion].id] ? '#f3f4f6' : 'linear-gradient(135deg, #22c55e, #16a34a)',
                      color: loading || !answers[questions[currentQuestion].id] ? '#9ca3af' : 'white',
                      border: 'none',
                      borderRadius: '25px',
                      cursor: loading || !answers[questions[currentQuestion].id] ? 'not-allowed' : 'pointer',
                      fontSize: '1rem',
                      fontWeight: 600,
                      transition: 'all 0.3s ease',
                      opacity: loading || !answers[questions[currentQuestion].id] ? 0.5 : 1,
                      boxShadow: loading || !answers[questions[currentQuestion].id] ? 'none' : '0 10px 25px rgba(34, 197, 94, 0.4)'
                    }}
                  >
                    {loading ? 'Analisando...' : (currentQuestion === questions.length - 1 ? t('seeResults') : t('nextButton'))}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Additional Information */}
                <div style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '12px',
                  marginBottom: '2rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  border: '3px solid #e0f2e9'
                }}>
                  <h2 style={{
                    fontSize: isMobile ? '1.4rem' : '1.6rem',
                    color: '#1e293b',
                    marginBottom: '1.5rem',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>
                    {t('additionalInfo')}
                  </h2>
                  
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder={t('additionalInfoPlaceholder')}
                    style={{
                      width: '100%',
                      minHeight: '120px',
                      padding: '1rem',
                      border: '2px solid #e0f2e9',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      lineHeight: '1.5'
                    }}
                  />
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '2rem'
                  }}>
                    <button
                      onClick={analyzeProfile}
                      disabled={loading}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '1rem 2rem',
                        background: loading ? '#ccc' : 'linear-gradient(135deg, #22c55e, #16a34a)',
                        color: loading ? '#666' : 'white',
                        border: 'none',
                        borderRadius: '25px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontSize: '1rem',
                        fontWeight: 600,
                        transition: 'all 0.3s ease',
                        boxShadow: loading ? 'none' : '0 10px 25px rgba(34, 197, 94, 0.4)'
                      }}
                    >
                      {loading ? 'Processando...' : t('seeResults')}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
