'use client'

import { useState, useEffect } from 'react'
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
  question6: { 
    pt: 'Qual seu orçamento para investir em sua saúde?', 
    es: '¿Cuál es tu presupuesto para invertir en tu salud?', 
    en: 'What is your budget to invest in your health?' 
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
  answer1a: { pt: 'A Manter energia durante o dia todo (Sempre cansado)', es: 'A Mantener energía durante todo el día (Siempre cansado)', en: 'A Maintain energy throughout the day (Always tired)' },
  answer1b: { pt: 'B Melhorar a qualidade do sono (Insônia frequente)', es: 'B Mejorar la calidad del sueño (Insomnio frecuente)', en: 'B Improve sleep quality (Frequent insomnia)' },
  answer1c: { pt: 'C Controlar o peso (Já tentou de tudo)', es: 'C Controlar el peso (Ya intentaste de todo)', en: 'C Control weight (Tried everything already)' },
  answer1d: { pt: 'D Fortalecer o sistema imunológico (Sempre doente)', es: 'D Fortalecer el sistema inmunológico (Siempre enfermo)', en: 'D Strengthen immune system (Always sick)' },
  
  answer2a: { pt: 'A 18-25 anos (Vida agitada, muita energia)', es: 'A 18-25 años (Vida agitada, mucha energía)', en: 'A 18-25 years (Busy life, lots of energy)' },
  answer2b: { pt: 'B 26-35 anos (Carreira em ascensão, estresse)', es: 'B 26-35 años (Carrera en ascenso, estrés)', en: 'B 26-35 years (Rising career, stress)' },
  answer2c: { pt: 'C 36-45 anos (Equilíbrio família-trabalho)', es: 'C 36-45 años (Equilibrio familia-trabajo)', en: 'C 36-45 years (Family-work balance)' },
  answer2d: { pt: 'D 46+ anos (Foco em qualidade de vida)', es: 'D 46+ años (Enfoque en calidad de vida)', en: 'D 46+ years (Focus on quality of life)' },
  
  answer3a: { pt: 'A Perder peso (Já tentou dietas sem sucesso)', es: 'A Perder peso (Ya intentaste dietas sin éxito)', en: 'A Lose weight (Tried diets without success)' },
  answer3b: { pt: 'B Ganhar massa muscular (Quer se sentir forte)', es: 'B Ganar masa muscular (Quieres sentirte fuerte)', en: 'B Gain muscle mass (Want to feel strong)' },
  answer3c: { pt: 'C Melhorar o bem-estar geral (Quer mais qualidade de vida)', es: 'C Mejorar el bienestar general (Quieres más calidad de vida)', en: 'C Improve general well-being (Want better quality of life)' },
  answer3d: { pt: 'D Aumentar a performance (Quer ser melhor em tudo)', es: 'D Aumentar el rendimiento (Quieres ser mejor en todo)', en: 'D Increase performance (Want to be better at everything)' },
  
  answer4a: { pt: 'A Rotina caótica (Sem horários fixos)', es: 'A Rutina caótica (Sin horarios fijos)', en: 'A Chaotic routine (No fixed schedules)' },
  answer4b: { pt: 'B Rotina rígida (Muito trabalho, pouco tempo)', es: 'B Rutina rígida (Mucho trabajo, poco tiempo)', en: 'B Rigid routine (Lots of work, little time)' },
  answer4c: { pt: 'C Rotina equilibrada (Tenta manter hábitos)', es: 'C Rutina equilibrada (Intenta mantener hábitos)', en: 'C Balanced routine (Tries to maintain habits)' },
  answer4d: { pt: 'D Rotina flexível (Adapta-se às mudanças)', es: 'D Rutina flexible (Se adapta a los cambios)', en: 'D Flexible routine (Adapts to changes)' },
  
  answer5a: { pt: 'A 1-2 vezes (Ainda acredita)', es: 'A 1-2 veces (Aún cree)', en: 'A 1-2 times (Still believes)' },
  answer5b: { pt: 'B 3-5 vezes (Frustrado mas persistente)', es: 'B 3-5 veces (Frustrado pero persistente)', en: 'B 3-5 times (Frustrated but persistent)' },
  answer5c: { pt: 'C 6-10 vezes (Quase desistindo)', es: 'C 6-10 veces (Casi desistiendo)', en: 'C 6-10 times (Almost giving up)' },
  answer5d: { pt: 'D 10+ vezes (Precisa de ajuda especializada)', es: 'D 10+ veces (Necesita ayuda especializada)', en: 'D 10+ times (Needs specialized help)' },
  
  answer6a: { pt: 'A $50-100 (Investimento inicial)', es: 'A $50-100 (Inversión inicial)', en: 'A $50-100 (Initial investment)' },
  answer6b: { pt: 'B $100-200 (Compromisso médio)', es: 'B $100-200 (Compromiso medio)', en: 'B $100-200 (Medium commitment)' },
  answer6c: { pt: 'C $200-500 (Investimento sério)', es: 'C $200-500 (Inversión seria)', en: 'C $200-500 (Serious investment)' },
  answer6d: { pt: 'D $500+ (Transformação completa)', es: 'D $500+ (Transformación completa)', en: 'D $500+ (Complete transformation)' },
  
  answer7a: { pt: 'A 1-2 semanas (Resultados rápidos)', es: 'A 1-2 semanas (Resultados rápidos)', en: 'A 1-2 weeks (Quick results)' },
  answer7b: { pt: 'B 1 mês (Mudança visível)', es: 'B 1 mes (Cambio visible)', en: 'B 1 month (Visible change)' },
  answer7c: { pt: 'C 3 meses (Transformação real)', es: 'C 3 meses (Transformación real)', en: 'C 3 months (Real transformation)' },
  answer7d: { pt: 'D 6 meses (Mudança permanente)', es: 'D 6 meses (Cambio permanente)', en: 'D 6 months (Permanent change)' },
  
  answer8a: { pt: 'A Mudar hábitos alimentares (Começar hoje)', es: 'A Cambiar hábitos alimentarios (Empezar hoy)', en: 'A Change eating habits (Start today)' },
  answer8b: { pt: 'B Adicionar exercícios (Sem desculpas)', es: 'B Agregar ejercicios (Sin excusas)', en: 'B Add exercises (No excuses)' },
  answer8c: { pt: 'C Suplementação inteligente (Apoio científico)', es: 'C Suplementación inteligente (Apoyo científico)', en: 'C Smart supplementation (Scientific support)' },
  answer8d: { pt: 'D Tudo junto (Transformação completa)', es: 'D Todo junto (Transformación completa)', en: 'D Everything together (Complete transformation)' },
  
  // Botões
  nextButton: { pt: 'Próxima Pergunta', es: 'Siguiente Pregunta', en: 'Next Question' },
  startAnalysis: { pt: 'Começar Análise', es: 'Comenzar Análisis', en: 'Start Analysis' },
  
  // Área de Comentários
  commentsTitle: { pt: 'Tem algo mais que gostaria de nos contar?', es: '¿Hay algo más que te gustaría contarnos?', en: 'Is there anything else you\'d like to tell us?' },
  commentsSubtitle: { pt: 'Sua experiência é única e queremos acertar na primeira vez!', es: '¡Tu experiencia es única y queremos acertar la primera vez!', en: 'Your experience is unique and we want to get it right the first time!' },
  commentsPlaceholder: { pt: 'Conte-nos sobre produtos que não funcionaram, condições físicas específicas, situações únicas da sua rotina, ou qualquer informação que ajude a personalizar suas recomendações...', es: 'Cuéntanos sobre productos que no funcionaron, condiciones físicas específicas, situaciones únicas de tu rutina, o cualquier información que ayude a personalizar tus recomendaciones...', en: 'Tell us about products that didn\'t work, specific physical conditions, unique situations in your routine, or any information that helps personalize your recommendations...' },
  commentsLabel: { pt: 'Informações Adicionais (Opcional)', es: 'Información Adicional (Opcional)', en: 'Additional Information (Optional)' },
  skipComments: { pt: 'Pular e ver resultados', es: 'Saltar y ver resultados', en: 'Skip and see results' },
  
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
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<any>(null);

  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
    },
    {
      id: 4,
      question: 'question4',
      answers: [
        { key: '4a', text: 'answer4a' },
        { key: '4b', text: 'answer4b' },
        { key: '4c', text: 'answer4c' },
        { key: '4d', text: 'answer4d' }
      ]
    },
    {
      id: 5,
      question: 'question5',
      answers: [
        { key: '5a', text: 'answer5a' },
        { key: '5b', text: 'answer5b' },
        { key: '5c', text: 'answer5c' },
        { key: '5d', text: 'answer5d' }
      ]
    },
    {
      id: 6,
      question: 'question6',
      answers: [
        { key: '6a', text: 'answer6a' },
        { key: '6b', text: 'answer6b' },
        { key: '6c', text: 'answer6c' },
        { key: '6d', text: 'answer6d' }
      ]
    },
    {
      id: 7,
      question: 'question7',
      answers: [
        { key: '7a', text: 'answer7a' },
        { key: '7b', text: 'answer7b' },
        { key: '7c', text: 'answer7c' },
        { key: '7d', text: 'answer7d' }
      ]
    },
    {
      id: 8,
      question: 'question8',
      answers: [
        { key: '8a', text: 'answer8a' },
        { key: '8b', text: 'answer8b' },
        { key: '8c', text: 'answer8c' },
        { key: '8d', text: 'answer8d' }
      ]
    }
  ]

  const handleAnswer = (answerKey: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: answerKey }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowComments(true)
    }
  }

  const currentQuestionData = questions.find(q => q.id === currentQuestion)

  // Função para analisar o perfil do usuário
  const analyzeProfile = () => {
    console.log('🔍 analyzeProfile chamada!');
    console.log('📝 Respostas:', answers);
    console.log('💬 Comentários:', comments);
    
    // Mapear respostas para categorias
    const categoryScoring = {
      'energia': { triggers: ['1a', '2a', '3d', '4a', '5c', '6b', '7a', '8b'], weight: 1.2 },
      'sono': { triggers: ['1b', '2b', '3c', '4b', '5b', '6a', '7b', '8a'], weight: 1.1 },
      'emagrecimento': { triggers: ['1c', '2c', '3a', '4c', '5c', '6b', '7c', '8a'], weight: 1.3 },
      'imunidade': { triggers: ['1d', '2d', '3c', '4d', '5d', '6c', '7d', '8c'], weight: 1.0 },
      'hormonal': { triggers: ['1b', '2c', '3c', '4b', '5b', '6c', '7c', '8c'], weight: 1.4 },
      'ansiedade': { triggers: ['1b', '2b', '3c', '4a', '5c', '6a', '7a', '8d'], weight: 1.2 },
      'fadiga': { triggers: ['1a', '2b', '3d', '4a', '5c', '6a', '7a', '8b'], weight: 1.1 },
      'afrodisiaco': { triggers: ['1c', '2a', '3b', '4c', '5a', '6b', '7b', '8d'], weight: 1.5 }
    };

    // Calcular scores para cada categoria
    const scores: { [key: string]: number } = {};
    
    Object.entries(categoryScoring).forEach(([category, config]) => {
      let score = 0;
      config.triggers.forEach(trigger => {
        if (Object.values(answers).includes(trigger)) {
          score += config.weight;
        }
      });
      scores[category] = score;
    });

    console.log('📊 Scores calculados:', scores);

    // Ordenar categorias por score
    const sortedCategories = Object.entries(scores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);

    console.log('🏆 Top 3 categorias:', sortedCategories);

    // Criar perfil do usuário
    const userProfile = {
      primaryGoal: getPrimaryGoal(answers),
      lifestyle: getLifestyle(answers),
      budget: getBudget(answers),
      urgency: getUrgency(answers),
      commitment: getCommitment(answers)
    };

    console.log('👤 Perfil do usuário:', userProfile);

    // Definir resultados da análise
    const results = {
      userProfile,
      topCategories: sortedCategories,
      analysisDate: new Date().toISOString()
    };

    console.log('🎯 Resultados finais:', results);
    console.log('✅ Definindo showResults como true');

    setAnalysisResults(results);
    setShowResults(true);
    
    console.log('🚀 Estados atualizados!');
  };

  // Função para obter mensagem motivacional baseada no perfil
  const getMotivationalMessage = (profile: any) => {
    const messages = {
      'energia': 'Ter mais energia significa mais produtividade, melhor humor e qualidade de vida. É o primeiro passo para conquistar todos os seus objetivos!',
      'sono': 'Um sono de qualidade é fundamental para recuperação muscular, controle hormonal e saúde mental. É a base de tudo!',
      'emagrecimento': 'Perder peso de forma saudável vai te dar mais confiança, disposição e saúde. É uma transformação completa!',
      'imunidade': 'Fortalecer sua imunidade é investir na sua saúde a longo prazo. Prevenção é sempre melhor que tratamento!',
      'hormonal': 'Equilibrar seus hormônios vai transformar sua energia, humor e bem-estar. É a chave para se sentir melhor!',
      'ansiedade': 'Controlar a ansiedade vai te dar mais paz mental e qualidade de vida. É essencial para seu bem-estar!',
      'fadiga': 'Superar a fadiga vai te dar mais disposição para conquistar seus objetivos. É o que está te limitando!',
      'afrodisiaco': 'Melhorar sua libido vai fortalecer seus relacionamentos e autoestima. É um investimento em você!'
    };
    return messages[profile.primaryGoal as keyof typeof messages] || 'Este objetivo é fundamental para sua transformação e bem-estar!';
  };

  // Função para obter mensagem de benefícios baseada no perfil
  const getBenefitsMessage = (profile: any) => {
    const benefits = {
      'energia': 'Mais disposição para trabalhar, exercitar-se e aproveitar a vida. Você vai se sentir renovado!',
      'sono': 'Acordar descansado, com mais foco e menos estresse. Sua qualidade de vida vai melhorar drasticamente!',
      'emagrecimento': 'Mais confiança, saúde e disposição. Você vai se sentir mais atraente e confiante!',
      'imunidade': 'Menos resfriados, mais resistência e saúde duradoura. É proteção para toda a vida!',
      'hormonal': 'Mais energia, melhor humor e equilíbrio emocional. Você vai se sentir no controle!',
      'ansiedade': 'Mais paz mental, melhor sono e relacionamentos. A vida fica mais leve!',
      'fadiga': 'Mais disposição para conquistar seus sonhos. Nada mais vai te parar!',
      'afrodisiaco': 'Mais intimidade, confiança e satisfação. Seus relacionamentos vão florescer!'
    };
    return benefits[profile.primaryGoal as keyof typeof benefits] || 'Transformação completa em sua qualidade de vida e bem-estar!';
  };

  // Função para compartilhar
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MeuPortalFit - Análise Personalizada',
          text: `Acabei de fazer minha análise personalizada no MeuPortalFit! Minha meta: ${analysisResults?.userProfile?.primaryGoal || 'bem-estar'}. 🎯✨`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Erro ao compartilhar:', error);
      }
    } else {
      // Fallback para copiar link
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  // Função para ver sugestões de categorias
  const handleViewCategories = () => {
    // Redirecionar para página de produtos
    window.location.href = '/produtos';
  };

  // Função para comprar na Amazon
  const handleBuyOnAmazon = () => {
    // Redirecionar para Amazon com busca baseada no perfil
    const searchQuery = encodeURIComponent(analysisResults?.userProfile?.primaryGoal || 'suplementos');
    window.open(`https://www.amazon.com/s?k=${searchQuery}&tag=portal07d-20`, '_blank');
  };

  // Função para voltar ao início
  const handleGoHome = () => {
    window.location.href = '/';
  };

  // Funções auxiliares para interpretar respostas
  const getPrimaryGoal = (answers: { [key: string]: string }) => {
    const goalMap: { [key: string]: string } = {
      '1a': 'energia',
      '1b': 'sono',
      '1c': 'emagrecimento',
      '1d': 'imunidade',
      '3a': 'emagrecimento',
      '3b': 'massa muscular',
      '3c': 'bem-estar geral',
      '3d': 'performance'
    };
    
    for (const [question, answer] of Object.entries(answers)) {
      if (goalMap[answer]) {
        return goalMap[answer];
      }
    }
    return 'bem-estar geral';
  };

  const getLifestyle = (answers: { [key: string]: string }) => {
    const lifestyleMap: { [key: string]: string } = {
      '2a': 'vida agitada',
      '2b': 'carreira em ascensão',
      '2c': 'equilíbrio família-trabalho',
      '2d': 'foco em qualidade de vida'
    };
    
    return lifestyleMap[answers['2']] || 'estilo de vida equilibrado';
  };

  const getBudget = (answers: { [key: string]: string }) => {
    const budgetMap: { [key: string]: string } = {
      '6a': '$50-100',
      '6b': '$100-200',
      '6c': '$200-500',
      '6d': '$500+'
    };
    
    return budgetMap[answers['6']] || '$100-200';
  };

  const getUrgency = (answers: { [key: string]: string }) => {
    const urgencyMap: { [key: string]: string } = {
      '7a': 'imediato (1-2 semanas)',
      '7b': 'curto prazo (1 mês)',
      '7c': 'médio prazo (2-3 meses)',
      '7d': 'longo prazo (3+ meses)'
    };
    
    return urgencyMap[answers['7']] || 'médio prazo';
  };

  const getCommitment = (answers: { [key: string]: string }) => {
    const commitmentMap: { [key: string]: string } = {
      '5a': 'iniciante',
      '5b': 'intermediário',
      '5c': 'avançado',
      '5d': 'especialista'
    };
    
    return commitmentMap[answers['5']] || 'intermediário';
  };

  // Produtos recomendados baseados no perfil
  const getRecommendedProducts = (profile: any) => {
    const productDatabase = {
      'energia': [
        {
          name: 'NOW Foods L-Carnitine 500mg',
          description: 'Aminoácido essencial para produção de energia celular',
          price: '$18.99',
          rating: '4.7/5',
          image: '💪',
          url: 'https://www.amazon.com/dp/B0013OQJ7W?tag=portal07d-20'
        },
        {
          name: 'Nature Made B-Complex',
          description: 'Vitaminas B para conversão de alimentos em energia',
          price: '$12.99',
          rating: '4.6/5',
          image: '⚡',
          url: 'https://www.amazon.com/dp/B000F4WT8Y?tag=portal07d-20'
        },
        {
          name: 'Garden of Life Vitamin Code Raw B-12',
          description: 'B-12 natural para energia mental e física',
          price: '$24.99',
          rating: '4.8/5',
          image: '🧠',
          url: 'https://www.amazon.com/dp/B0013OQJ7W?tag=portal07d-20'
        },
        {
          name: 'Jarrow Formulas CoQ10 200mg',
          description: 'Coenzima Q10 para energia mitocondrial',
          price: '$29.99',
          rating: '4.7/5',
          image: '🔋',
          url: 'https://www.amazon.com/dp/B0013OQJ7W?tag=portal07d-20'
        },
        {
          name: 'Thorne Research Magnesium Bisglycinate',
          description: 'Magnésio para relaxamento muscular e recuperação',
          price: '$22.99',
          rating: '4.9/5',
          image: '💆',
          url: 'https://www.amazon.com/dp/B0013OQJ7W?tag=portal07d-20'
        },
        {
          name: 'Pure Encapsulations D-Ribose',
          description: 'Açúcar natural para produção de ATP',
          price: '$19.99',
          rating: '4.6/5',
          image: '🍯',
          url: 'https://www.amazon.com/dp/B0013OQJ7W?tag=portal07d-20'
        }
      ],
      'sono': [
        {
          name: 'Nature Made Melatonin 5mg',
          description: 'Hormônio natural para regulação do sono',
          price: '$8.99',
          rating: '4.5/5',
          image: '😴',
          url: 'https://www.amazon.com/dp/B000F4WT8Y?tag=portal07d-20'
        },
        {
          name: 'NOW Foods 5-HTP 200mg',
          description: 'Precursor da serotonina para sono profundo',
          price: '$15.99',
          rating: '4.7/5',
          image: '🌙',
          url: 'https://www.amazon.com/dp/B0013OQJ7W?tag=portal07d-20'
        },
        {
          name: 'Thorne Research Magnesium Glycinate',
          description: 'Magnésio para relaxamento e qualidade do sono',
          price: '$24.99',
          rating: '4.8/5',
          image: '💆',
          url: 'https://www.amazon.com/dp/B0013OQJ7W?tag=portal07d-20'
        },
        {
          name: 'Pure Encapsulations L-Theanine 200mg',
          description: 'Aminoácido para relaxamento mental',
          price: '$18.99',
          rating: '4.6/5',
          image: '🧘',
          url: 'https://www.amazon.com/dp/B0013OQJ7W?tag=portal07d-20'
        },
        {
          name: 'Garden of Life Sleep & Relax',
          description: 'Fórmula natural para sono reparador',
          price: '$32.99',
          rating: '4.7/5',
          image: '🌿',
          url: 'https://www.amazon.com/dp/B0013OQJ7W?tag=portal07d-20'
        },
        {
          name: 'NOW Foods Valerian Root 500mg',
          description: 'Raiz natural para indução do sono',
          price: '$12.99',
          rating: '4.4/5',
          image: '🌱',
          url: 'https://www.amazon.com/dp/B0013OQJ7W?tag=portal07d-20'
        }
      ],
      'emagrecimento': [
        {
          name: 'NOW Foods Green Tea Extract 400mg',
          description: 'Extrato de chá verde para metabolismo',
          price: '$14.99',
          rating: '4.6/5',
          image: '🍃',
          url: 'https://www.amazon.com/dp/B0013OQJ7W?tag=portal07d-20'
        },
        {
          name: 'Thorne Research Meriva-SR',
          description: 'Curcumina para controle de inflamação',
          price: '$34.99',
          rating: '4.8/5',
          image: '🟡',
          url: 'https://www.amazon.com/dp/B0013OQJ7W?tag=portal07d-20'
        },
        {
          name: 'Pure Encapsulations CLA 1000mg',
          description: 'Ácido linoleico conjugado para perda de gordura',
          price: '$28.99',
          rating: '4.7/5',
          image: '🔥',
          url: 'https://www.amazon.com/dp/B0013OQJ7W?tag=portal07d-20'
        },
        {
          name: 'Garden of Life Raw Organic Protein',
          description: 'Proteína orgânica para saciedade',
          price: '$39.99',
          rating: '4.9/5',
          image: '🥛',
          url: 'https://www.amazon.com/dp/B0013OQJ7W?tag=portal07d-20'
        },
        {
          name: 'NOW Foods Chromium Picolinate 200mcg',
          description: 'Cromo para controle de açúcar no sangue',
          price: '$9.99',
          rating: '4.5/5',
          image: '⚖️',
          url: 'https://www.amazon.com/dp/B0013OQJ7W?tag=portal07d-20'
        },
        {
          name: 'Nature Made Fish Oil 1000mg',
          description: 'Ômega-3 para saúde metabólica',
          price: '$16.99',
          rating: '4.6/5',
          image: '🐟',
          url: 'https://www.amazon.com/dp/B000F4WT8Y?tag=portal07d-20'
        }
      ],
      'imunidade': [
        {
          name: 'Nature Made Vitamin D3 2000IU',
          description: 'Vitamina D para sistema imunológico',
          price: '$11.99',
          rating: '4.7/5',
          image: '☀️',
          url: 'https://www.amazon.com/dp/B000F4WT8Y?tag=portal07d-20'
        },
        {
          name: 'NOW Foods Vitamin C 1000mg',
          description: 'Vitamina C para defesa imunológica',
          price: '$13.99',
          rating: '4.6/5',
          image: '🍊',
          url: 'https://www.amazon.com/dp/B0013OQJ7W?tag=portal07d-20'
        },
        {
          name: 'Thorne Research Zinc Picolinate',
          description: 'Zinco para função imunológica',
          price: '$19.99',
          rating: '4.8/5',
          image: '🛡️',
          url: 'https://www.amazon.com/dp/B0013OQJ7W?tag=portal07d-20'
        },
        {
          name: 'Pure Encapsulations Echinacea',
          description: 'Echinacea para suporte imunológico',
          price: '$22.99',
          rating: '4.7/5',
          image: '🌻',
          url: 'https://www.amazon.com/dp/B0013OQJ7W?tag=portal07d-20'
        },
        {
          name: 'Garden of Life Probiotics',
          description: 'Probióticos para saúde intestinal',
          price: '$29.99',
          rating: '4.9/5',
          image: '🦠',
          url: 'https://www.amazon.com/dp/B0013OQJ7W?tag=portal07d-20'
        },
        {
          name: 'NOW Foods Elderberry Extract',
          description: 'Extrato de sabugueiro para imunidade',
          price: '$17.99',
          rating: '4.6/5',
          image: '🫐',
          url: 'https://www.amazon.com/dp/B0013OQJ7W?tag=portal07d-20'
        }
      ]
    };

    const goal = profile?.primaryGoal || 'energia';
    return productDatabase[goal as keyof typeof productDatabase] || productDatabase['energia'];
  };

  // Função para obter mensagem personalizada baseada no perfil
  const getPersonalizedMessage = (profile: any) => {
    const messages = {
      'energia': {
        title: 'Entendi perfeitamente sua necessidade de energia!',
        explanation: 'Você está enfrentando fadiga constante que está impactando sua produtividade e qualidade de vida. Nossa análise identificou que você precisa de suplementos específicos para:',
        benefits: [
          'Aumentar a produção de ATP (energia celular)',
          'Melhorar a função mitocondrial',
          'Otimizar o metabolismo de carboidratos e gorduras',
          'Reduzir a fadiga mental e física'
        ],
        solution: 'Os produtos que selecionei para você são cientificamente comprovados para aumentar seus níveis de energia de forma sustentável, sem os picos e quedas dos estimulantes.'
      },
      'sono': {
        title: 'Identifiquei exatamente o que está afetando seu sono!',
        explanation: 'Sua dificuldade para dormir está comprometendo sua recuperação, humor e saúde geral. Nossa análise revelou que você precisa de suplementos para:',
        benefits: [
          'Regular o ciclo circadiano natural',
          'Aumentar a produção de melatonina',
          'Reduzir o estresse e ansiedade',
          'Melhorar a qualidade do sono profundo'
        ],
        solution: 'Os produtos recomendados trabalham em sinergia para criar as condições ideais para um sono reparador e restaurador.'
      },
      'emagrecimento': {
        title: 'Descobri a chave para seu sucesso no emagrecimento!',
        explanation: 'Seus esforços anteriores não funcionaram porque faltavam os suplementos corretos para otimizar seu metabolismo. Você precisa de produtos para:',
        benefits: [
          'Acelerar o metabolismo basal',
          'Controlar a inflamação crônica',
          'Reduzir a resistência à insulina',
          'Aumentar a queima de gordura'
        ],
        solution: 'Esta combinação específica de suplementos vai transformar seu corpo em uma máquina de queimar gordura de forma natural e saudável.'
      },
      'imunidade': {
        title: 'Identifiquei os pontos fracos do seu sistema imunológico!',
        explanation: 'Sua imunidade baixa está te deixando vulnerável a infecções frequentes. Nossa análise mostrou que você precisa de suplementos para:',
        benefits: [
          'Fortalecer as células de defesa',
          'Reduzir a inflamação crônica',
          'Melhorar a função das barreiras imunológicas',
          'Otimizar a resposta imunológica'
        ],
        solution: 'Esta combinação de vitaminas e minerais vai criar um escudo imunológico robusto para proteger sua saúde.'
      }
    };

    const goal = profile?.primaryGoal || 'energia';
    return messages[goal as keyof typeof messages] || messages['energia'];
  };

  // Função para abrir produto específico na Amazon
  const handleOpenProduct = (productUrl: string) => {
    window.open(productUrl, '_blank');
  };

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

        {/* Hero Section Mínimo Proporcional */}
        <section style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #f0f9ff 100%)',
          padding: '0.15rem 0',
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
              fontSize: 'clamp(1.4rem, 3.8vw, 2.2rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '0.4rem',
              color: '#1f2937',
              whiteSpace: 'pre-line'
            }} className="hero-title">
              <span className="gradient-text">{t('heroTitle').split('\n')[0]}</span>
              <br />
              <span style={{ color: '#3b82f6' }}>{t('heroTitle').split('\n')[1]}</span>
            </h1>

            <p style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
              marginBottom: '0.4rem',
              color: '#6b7280',
              maxWidth: '400px',
              margin: '0 auto 0.4rem',
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
            {currentQuestionData && !showComments && (
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
                      <span>{currentQuestion === questions.length ? t('nextButton') : t('nextButton')}</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Comments Section */}
            {showComments && (
              <div className="comments-card" style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem 1rem',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                border: '2px solid #f3f4f6'
              }}>
                <h2 style={{
                  fontSize: 'clamp(1.3rem, 3.5vw, 1.7rem)',
                  fontWeight: 700,
                  marginBottom: '0.8rem',
                  color: '#1f2937',
                  textAlign: 'center',
                  lineHeight: 1.3
                }}>
                  {t('commentsTitle')}
                </h2>
                
                <p style={{
                  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                  color: '#6b7280',
                  marginBottom: '1.5rem',
                  lineHeight: 1.4,
                  textAlign: 'center'
                }}>
                  {t('commentsSubtitle')}
                </p>

                <div style={{
                  marginBottom: '1.5rem'
                }}>
                  <label style={{
                    display: 'block',
                    textAlign: 'left',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: '#374151'
                  }}>
                    {t('commentsLabel')}
                  </label>
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder={t('commentsPlaceholder')}
                    style={{
                      width: '100%',
                      minHeight: '120px',
                      padding: '1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '0.9rem',
                      lineHeight: 1.5,
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}>
                  <button
                    onClick={() => {
                      // Processar análise e mostrar resultados
                      analyzeProfile();
                    }}
                    style={{
                      padding: '1rem 2rem',
                      background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '25px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 600,
                      transition: 'all 0.3s ease',
                      boxShadow: '0 10px 25px rgba(34, 197, 94, 0.4)'
                    }}
                  >
                    🎯 Ver Meus Produtos Personalizados
                  </button>
                  
                  <button
                    onClick={() => {
                      // Pular comentários e ir direto para resultados
                      analyzeProfile();
                    }}
                    style={{
                      padding: '1rem 2rem',
                      background: 'transparent',
                      color: '#6b7280',
                      border: '1px solid #e5e7eb',
                      borderRadius: '25px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 500,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {t('skipComments')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Seção de Resultados Personalizados com Produtos Específicos */}
        {showResults && (
          <div style={{
            padding: '2rem',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            marginTop: '2rem',
            textAlign: 'center'
          }}>
            {/* Cabeçalho da Análise */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '12px',
              marginBottom: '2rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              border: '3px solid #e0f2e9'
            }}>
              <h2 style={{
                fontSize: isMobile ? '1.8rem' : '2.2rem',
                color: '#059669',
                marginBottom: '1.5rem',
                fontWeight: 'bold'
              }}>
                🎯 Análise Personalizada Completa
              </h2>
              
              <div style={{
                fontSize: isMobile ? '1.1rem' : '1.3rem',
                color: '#1e293b',
                marginBottom: '1.5rem',
                fontWeight: '600'
              }}>
                💪 Sua Meta Principal: <span style={{ color: '#059669' }}>{analysisResults?.userProfile?.primaryGoal}</span>
              </div>
              
              <div style={{
                fontSize: isMobile ? '0.9rem' : '1rem',
                color: '#64748b',
                marginBottom: '1rem',
                lineHeight: '1.6'
              }}>
                💡 Por que é importante: {getMotivationalMessage(analysisResults?.userProfile)}
              </div>
              
              <div style={{
                fontSize: isMobile ? '0.9rem' : '1rem',
                color: '#64748b',
                marginBottom: '1rem',
                lineHeight: '1.6'
              }}>
                🚀 O que você vai conseguir: {getBenefitsMessage(analysisResults?.userProfile)}
              </div>
              
              <div style={{
                fontSize: isMobile ? '1rem' : '1.1rem',
                color: '#059669',
                fontWeight: '600'
              }}>
                💰 Seu investimento: {analysisResults?.userProfile?.budget}
              </div>
            </div>

            {/* Explicação Personalizada */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '12px',
              marginBottom: '2rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              textAlign: 'left'
            }}>
              <h3 style={{
                fontSize: isMobile ? '1.4rem' : '1.6rem',
                color: '#1e293b',
                marginBottom: '1rem',
                fontWeight: 'bold'
              }}>
                {getPersonalizedMessage(analysisResults?.userProfile)?.title}
              </h3>
              
              <p style={{
                fontSize: isMobile ? '1rem' : '1.1rem',
                color: '#374151',
                marginBottom: '1.5rem',
                lineHeight: '1.6'
              }}>
                {getPersonalizedMessage(analysisResults?.userProfile)?.explanation}
              </p>
              
              <ul style={{
                marginBottom: '1.5rem',
                paddingLeft: '1.5rem'
              }}>
                {getPersonalizedMessage(analysisResults?.userProfile)?.benefits.map((benefit, index) => (
                  <li key={index} style={{
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    color: '#374151',
                    marginBottom: '0.5rem',
                    lineHeight: '1.5'
                  }}>
                    ✅ {benefit}
                  </li>
                ))}
              </ul>
              
              <p style={{
                fontSize: isMobile ? '1rem' : '1.1rem',
                color: '#059669',
                fontWeight: '600',
                fontStyle: 'italic'
              }}>
                💡 {getPersonalizedMessage(analysisResults?.userProfile)?.solution}
              </p>
            </div>

            {/* Produtos Recomendados */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '12px',
              marginBottom: '2rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{
                fontSize: isMobile ? '1.4rem' : '1.6rem',
                color: '#1e293b',
                marginBottom: '1.5rem',
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                🛍️ Seus Produtos Personalizados Recomendados
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                {getRecommendedProducts(analysisResults?.userProfile).map((product, index) => (
                  <div key={index} style={{
                    border: '2px solid #e0f2e9',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    backgroundColor: '#f8fafc',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }} onClick={() => handleOpenProduct(product.url)}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '1rem'
                    }}>
                      <span style={{
                        fontSize: '2rem',
                        marginRight: '1rem'
                      }}>
                        {product.image}
                      </span>
                      <div>
                        <h4 style={{
                          fontSize: isMobile ? '1rem' : '1.1rem',
                          color: '#1e293b',
                          fontWeight: '600',
                          marginBottom: '0.5rem'
                        }}>
                          {product.name}
                        </h4>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem'
                        }}>
                          <span style={{
                            color: '#059669',
                            fontWeight: '600'
                          }}>
                            {product.price}
                          </span>
                          <span style={{
                            color: '#f59e0b',
                            fontWeight: '500'
                          }}>
                            ⭐ {product.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p style={{
                      fontSize: isMobile ? '0.9rem' : '1rem',
                      color: '#64748b',
                      lineHeight: '1.5',
                      marginBottom: '1rem'
                    }}>
                      {product.description}
                    </p>
                    
                    <button style={{
                      background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                      color: 'white',
                      padding: '0.8rem 1.5rem',
                      border: 'none',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      width: '100%'
                    }}>
                      🛒 Ver na Amazon
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div style={{
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              color: '#dc2626',
              marginBottom: '2rem',
              fontWeight: 'bold',
              padding: '1.5rem',
              backgroundColor: '#fef2f2',
              borderRadius: '12px',
              border: '3px solid #fecaca'
            }}>
              🚀 AGORA é o momento de agir! Compre já e comece sua transformação HOJE!
            </div>

            {/* Botões de Ação */}
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button onClick={handleShare} style={{
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                color: 'white',
                padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
                border: 'none',
                borderRadius: '50px',
                fontSize: isMobile ? '0.9rem' : '1rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
              }}>
                📤 Compartilhar
              </button>
              <button onClick={handleGoHome} style={{
                background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                color: 'white',
                padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
                border: 'none',
                borderRadius: '50px',
                fontSize: isMobile ? '0.9rem' : '1rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(107, 114, 128, 0.3)'
              }}>
                🏠 Voltar ao Início
              </button>
            </div>
          </div>
        )}

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

        {/* MODAL DE RESULTADOS - NOVA JANELA */}
        {showModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '90vw',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}>
              {/* Botão Fechar */}
              <button
                onClick={() => setShowModal(false)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  zIndex: 1001
                }}
              >
                ✕
              </button>

              {/* Conteúdo da Modal */}
              <div style={{ padding: '2rem' }}>
                <h2 style={{
                  fontSize: isMobile ? '1.8rem' : '2.2rem',
                  color: '#059669',
                  marginBottom: '1.5rem',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>
                  🎯 Sua Análise Personalizada
                </h2>

                {/* Explicação Personalizada */}
                <div style={{
                  backgroundColor: '#f8fafc',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  marginBottom: '2rem',
                  border: '2px solid #e0f2e9'
                }}>
                  <h3 style={{
                    fontSize: isMobile ? '1.4rem' : '1.6rem',
                    color: '#1e293b',
                    marginBottom: '1rem',
                    fontWeight: 'bold'
                  }}>
                    Identifiquei exatamente o que está afetando seu {modalContent?.userProfile?.primaryGoal}!
                  </h3>
                  
                  <p style={{
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    color: '#374151',
                    marginBottom: '1rem',
                    lineHeight: '1.6'
                  }}>
                    Sua dificuldade está comprometendo sua recuperação, humor e saúde geral. Nossa análise revelou que você precisa de suplementos para:
                  </p>
                  
                  <ul style={{
                    marginBottom: '1rem',
                    paddingLeft: '1.5rem'
                  }}>
                    <li style={{
                      fontSize: isMobile ? '0.9rem' : '1rem',
                      color: '#374151',
                      marginBottom: '0.5rem',
                      lineHeight: '1.5'
                    }}>
                      ✅ Regular o ciclo natural do seu corpo
                    </li>
                    <li style={{
                      fontSize: isMobile ? '0.9rem' : '1rem',
                      color: '#374151',
                      marginBottom: '0.5rem',
                      lineHeight: '1.5'
                    }}>
                      ✅ Aumentar sua energia e vitalidade
                    </li>
                    <li style={{
                      fontSize: isMobile ? '0.9rem' : '1rem',
                      color: '#374151',
                      marginBottom: '0.5rem',
                      lineHeight: '1.5'
                    }}>
                      ✅ Melhorar sua qualidade de vida
                    </li>
                  </ul>
                  
                  <p style={{
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    color: '#059669',
                    fontWeight: '600',
                    fontStyle: 'italic'
                  }}>
                    💡 Os produtos recomendados trabalham em sinergia para criar as condições ideais para sua transformação!
                  </p>
                </div>

                {/* Produtos Recomendados */}
                <div style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  marginBottom: '2rem',
                  border: '2px solid #e0f2e9'
                }}>
                  <h3 style={{
                    fontSize: isMobile ? '1.4rem' : '1.6rem',
                    color: '#1e293b',
                    marginBottom: '1.5rem',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>
                    🛍️ Seus Produtos Personalizados Recomendados
                  </h3>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1rem',
                    marginBottom: '2rem'
                  }}>
                    {getRecommendedProducts(modalContent?.userProfile).slice(0, 6).map((product, index) => (
                      <div key={index} style={{
                        border: '2px solid #e0f2e9',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        backgroundColor: '#f8fafc',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }} onClick={() => handleOpenProduct(product.url)}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '1rem'
                        }}>
                          <span style={{
                            fontSize: '2rem',
                            marginRight: '1rem'
                          }}>
                            {product.image}
                          </span>
                          <div>
                            <h4 style={{
                              fontSize: isMobile ? '1rem' : '1.1rem',
                              color: '#1e293b',
                              fontWeight: '600',
                              marginBottom: '0.5rem'
                            }}>
                              {product.name}
                            </h4>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '1rem'
                            }}>
                              <span style={{
                                color: '#059669',
                                fontWeight: '600'
                              }}>
                                {product.price}
                              </span>
                              <span style={{
                                color: '#f59e0b',
                                fontWeight: '500'
                              }}>
                                ⭐ {product.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p style={{
                          fontSize: isMobile ? '0.9rem' : '1rem',
                          color: '#64748b',
                          lineHeight: '1.5',
                          marginBottom: '1rem'
                        }}>
                          {product.description}
                        </p>
                        
                        <button style={{
                          background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                          color: 'white',
                          padding: '0.8rem 1.5rem',
                          border: 'none',
                          borderRadius: '25px',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          width: '100%'
                        }}>
                          🛒 Ver na Amazon
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to Action */}
                <div style={{
                  fontSize: isMobile ? '1.1rem' : '1.3rem',
                  color: '#dc2626',
                  marginBottom: '2rem',
                  fontWeight: 'bold',
                  padding: '1.5rem',
                  backgroundColor: '#fef2f2',
                  borderRadius: '12px',
                  border: '3px solid #fecaca',
                  textAlign: 'center'
                }}>
                  🚀 AGORA é o momento de agir! Compre já e comece sua transformação HOJE!
                </div>

                {/* Botões de Ação */}
                <div style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: '1rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  <button onClick={handleShare} style={{
                    background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                    color: 'white',
                    padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
                  }}>
                    📤 Compartilhar
                  </button>
                  <button onClick={() => setShowModal(false)} style={{
                    background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                    color: 'white',
                    padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(107, 114, 128, 0.3)'
                  }}>
                    🔒 Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  )
}
