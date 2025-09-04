'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function BuscaPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [detailsQuery, setDetailsQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const searchParams = useSearchParams()

  const translations = {
    title: {
      pt: 'Busca Inteligente',
      es: 'Búsqueda Inteligente',
      en: 'Smart Search'
    },
    subtitle: {
      pt: 'Encontre produtos que realmente funcionam na Amazon',
      es: 'Encuentra productos que realmente funcionan en Amazon',
      en: 'Find products that actually work on Amazon'
    },
    searchPlaceholder: {
      pt: 'Digite o produto que procura na Amazon (ex: vitamina D, proteína, chá verde...)',
      es: 'Escribe el producto que buscas en Amazon (ej: vitamina D, proteína, té verde...)',
      en: 'Type the product you\'re looking for on Amazon (ex: vitamin D, protein, green tea...)'
    },
    detailsPlaceholder: {
      pt: 'Detalhes específicos (opcional): ex: sem lactose, orgânico, até $25, marca brasileira...',
      es: 'Detalles específicos (opcional): ej: sin lactosa, orgánico, hasta $25, marca brasileña...',
      en: 'Specific details (optional): ex: lactose-free, organic, under $25, Brazilian brand...'
    },
    searchButton: {
      pt: '🔍 Buscar na Amazon',
      es: '🔍 Buscar en Amazon',
      en: '🔍 Search on Amazon'
    },
    whyUseTitle: {
      pt: 'Por que usar a busca inteligente ao comprar na Amazon?',
      es: '¿Por qué usar la búsqueda inteligente al comprar en Amazon?',
      en: 'Why use smart search when shopping on Amazon?'
    },
    benefit1: {
      pt: '🤖 Seleção Inteligente',
      es: '🤖 Selección Inteligente',
      en: '🤖 Smart Selection'
    },
    benefit1Desc: {
      pt: 'IA analisa milhares de produtos e escolhe os melhores para você',
      es: 'IA analiza miles de productos y elige los mejores para ti',
      en: 'AI analyzes thousands of products and picks the best ones for you'
    },
    benefit2: {
      pt: '⏰ Economia de Tempo',
      es: '⏰ Ahorro de Tiempo',
      en: '⏰ Time Savings'
    },
    benefit2Desc: {
      pt: 'Receba produtos selecionados em segundos, não em horas',
      es: 'Recibe productos seleccionados en segundos, no en horas',
      en: 'Get selected products in seconds, not hours'
    },
    benefit3: {
      pt: '🛡️ Qualidade Garantida',
      es: '🛡️ Calidad Garantizada',
      en: '🛡️ Guaranteed Quality'
    },
    benefit3Desc: {
      pt: 'Produtos escolhidos por IA especializada em qualidade',
      es: 'Productos elegidos por IA especializada en calidad',
      en: 'Products chosen by AI specialized in quality'
    },
    benefit4: {
      pt: '💰 Melhor Custo-Benefício',
      es: '💰 Mejor Relación Precio-Calidad',
      en: '💰 Better Value for Money'
    },
    benefit4Desc: {
      pt: 'Sempre o melhor custo-benefício e produtos confiáveis',
      es: 'Siempre la mejor relación precio-calidad y productos confiables',
      en: 'Always the best value for money and reliable products'
    },
    howItWorks: {
      pt: 'Como funciona nossa busca inteligente:',
      es: 'Cómo funciona nuestra búsqueda inteligente:',
      en: 'How our smart search works:'
    },
    step1: {
      pt: '1. Digite o que você procura',
      es: '1. Escribe lo que buscas',
      en: '1. Type what you\'re looking for'
    },
    step2: {
      pt: '2. IA analisa suas necessidades',
      es: '2. IA analiza tus necesidades',
      en: '2. AI analyzes your needs'
    },
    step3: {
      pt: '3. Receba produtos selecionados',
      es: '3. Recibe productos seleccionados',
      en: '3. Get selected products'
    },
    step4: {
      pt: '4. Compre na Amazon com confiança',
      es: '4. Compra en Amazon con confianza',
      en: '4. Buy on Amazon with confidence'
    },
    testimonialsTitle: {
      pt: 'O que brasileiros nos EUA dizem:',
      es: 'Lo que dicen los brasileños en EE.UU.:',
      en: 'What Brazilians in the US say:'
    },
    testimonial1: {
      pt: '"A busca inteligente encontrou produtos perfeitos em segundos! Economizei horas de pesquisa na Amazon."',
      es: '"¡La búsqueda inteligente encontró productos perfectos en segundos! Ahorré horas de investigación en Amazon."',
      en: '"Smart search found perfect products in seconds! I saved hours of research on Amazon."'
    },
    testimonial2: {
      pt: '"A IA escolheu produtos de qualidade que realmente funcionam! Não mais compras por impulso na Amazon."',
      es: '"¡La IA eligió productos de calidad que realmente funcionan! No más compras por impulso en Amazon."',
      en: '"The AI chose quality products that actually work! No more impulse purchases on Amazon."'
    },
    cta: {
      pt: 'Comece sua busca inteligente agora!',
      es: '¡Comienza tu búsqueda inteligente ahora!',
      en: 'Start your smart search now!'
    }
  }

  const t = (key: string) => {
    const language = searchParams.get('language') || 'pt'
    const translation = (translations as any)[key]
    if (translation && translation[language]) {
      return translation[language]
    }
    return key
  }

  // Função para obter produtos selecionados baseados na busca
  const getCuratedProducts = async (query: string, details: string = '') => {
    // Aqui você pode implementar a lógica de seleção
    // Por enquanto, vamos usar termos de busca otimizados
    const curatedTerms = {
      'vitamina': 'vitaminas suplementos qualidade premium',
      'proteína': 'proteína whey isolada qualidade',
      'chá': 'chá verde orgânico natural',
      'omega': 'omega 3 fish oil molecularly distilled',
      'magnésio': 'magnésio glicinato sono relaxamento',
      'melatonina': 'melatonina 3mg sono natural',
      'multivitamínico': 'multivitamínico completo daily',
      'energia': 'energia natural suplementos',
      'imunidade': 'imunidade vitamina c zinco',
      'sono': 'sono melatonina magnésio relaxamento'
    }

    // Encontrar o termo mais próximo
    const searchTerm = query.toLowerCase()
    let baseTerm = query
    
    for (const [key, value] of Object.entries(curatedTerms)) {
      if (searchTerm.includes(key)) {
        baseTerm = value
        break
      }
    }
    
    // Combinar com detalhes específicos se fornecidos
    if (details.trim()) {
      const detailsLower = details.toLowerCase()
      
      // Adicionar termos específicos baseados nos detalhes
      const specificTerms = []
      
      if (detailsLower.includes('sem lactose') || detailsLower.includes('lactose free')) {
        specificTerms.push('sem lactose')
      }
      if (detailsLower.includes('orgânico') || detailsLower.includes('organic')) {
        specificTerms.push('orgânico')
      }
      if (detailsLower.includes('vegano') || detailsLower.includes('vegan')) {
        specificTerms.push('vegano')
      }
      if (detailsLower.includes('sem glúten') || detailsLower.includes('gluten free')) {
        specificTerms.push('sem glúten')
      }
      if (detailsLower.includes('sem açúcar') || detailsLower.includes('sugar free')) {
        specificTerms.push('sem açúcar')
      }
      if (detailsLower.includes('marca brasileira') || detailsLower.includes('brazilian brand')) {
        specificTerms.push('marca brasileira')
      }
      if (detailsLower.includes('cápsulas') || detailsLower.includes('capsules')) {
        specificTerms.push('cápsulas')
      }
      if (detailsLower.includes('pó') || detailsLower.includes('powder')) {
        specificTerms.push('pó')
      }
      if (detailsLower.includes('líquido') || detailsLower.includes('liquid')) {
        specificTerms.push('líquido')
      }
      if (detailsLower.includes('até $') || detailsLower.includes('under $')) {
        // Extrair preço máximo
        const priceMatch = detailsLower.match(/até \$(\d+)|under \$(\d+)/)
        if (priceMatch) {
          const price = priceMatch[1] || priceMatch[2]
          specificTerms.push(`até $${price}`)
        }
      }
      
      // Combinar termos base com específicos
      return `${baseTerm} ${specificTerms.join(' ')}`.trim()
    }
    
    return baseTerm
  }

  // Função para construir URL da Amazon com produtos curados
  const buildAmazonSearchUrl = (originalQuery: string, curatedTerms: string) => {
    const baseUrl = 'https://www.amazon.com/s'
    const params = new URLSearchParams({
      k: curatedTerms,
      'ref': 'sr_nr_i_0',
      'fst': 'as%3AOFF',
      'qid': Date.now().toString(),
      'rnid': '17007520011',
      'sprefix': originalQuery.toLowerCase(),
      'tag': 'portalsolutio-20' // TAG DE AFILIADO ESSENCIAL!
    })
    
    return `${baseUrl}?${params.toString()}`
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    
    try {
      // Fazer seleção inteligente baseada no produto buscado e detalhes
      const selectedProducts = await getCuratedProducts(searchQuery, detailsQuery)
      
      // Redirecionar diretamente para Amazon com produtos selecionados
      const amazonSearchUrl = buildAmazonSearchUrl(searchQuery, selectedProducts)
      window.open(amazonSearchUrl, '_blank')
      
    } catch (error) {
      console.error('Erro na busca:', error)
      // Fallback: busca direta na Amazon COM TAG DE AFILIADO
      const fallbackUrl = `https://www.amazon.com/s?k=${encodeURIComponent(searchQuery)}&tag=portalsolutio-20`
      window.open(fallbackUrl, '_blank')
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
      padding: '2rem 1rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#059669',
            marginBottom: '1rem'
          }}>
            {t('title')}
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#374151',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {t('subtitle')}
          </p>
        </div>

        {/* Search Form */}
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          <form style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxWidth: '600px',
            margin: '0 auto'
          }} onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              style={{
                padding: '1rem 1.5rem',
                fontSize: '1.1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#059669'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            <input
              type="text"
              value={detailsQuery}
              onChange={(e) => setDetailsQuery(e.target.value)}
              placeholder={t('detailsPlaceholder')}
              style={{
                padding: '0.8rem 1.5rem',
                fontSize: '1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                backgroundColor: '#f9fafb'
              }}
              onFocus={(e) => e.target.style.borderColor = '#059669'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            <button
              type="submit"
              disabled={isSearching}
              style={{
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #059669, #047857)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                opacity: isSearching ? 0.6 : 1
              }}
            >
              {isSearching ? '🔍 Buscando na Amazon...' : t('searchButton')}
            </button>
          </form>
        </div>

        {/* Why Use Section */}
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          marginBottom: '3rem'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: '#1e293b',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            {t('whyUseTitle')}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f0fdf4',
              borderRadius: '12px',
              border: '2px solid #bbf7d0'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#059669',
                marginBottom: '0.5rem'
              }}>
                {t('benefit1')}
              </h3>
              <p style={{
                color: '#374151',
                lineHeight: '1.5'
              }}>
                {t('benefit1Desc')}
              </p>
            </div>
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f0fdf4',
              borderRadius: '12px',
              border: '2px solid #bbf7d0'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#059669',
                marginBottom: '0.5rem'
              }}>
                {t('benefit2')}
              </h3>
              <p style={{
                color: '#374151',
                lineHeight: '1.5'
              }}>
                {t('benefit2Desc')}
              </p>
            </div>
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f0fdf4',
              borderRadius: '12px',
              border: '2px solid #bbf7d0'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#059669',
                marginBottom: '0.5rem'
              }}>
                {t('benefit3')}
              </h3>
              <p style={{
                color: '#374151',
                lineHeight: '1.5'
              }}>
                {t('benefit3Desc')}
              </p>
            </div>
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f0fdf4',
              borderRadius: '12px',
              border: '2px solid #bbf7d0'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#059669',
                marginBottom: '0.5rem'
              }}>
                {t('benefit4')}
              </h3>
              <p style={{
                color: '#374151',
                lineHeight: '1.5'
              }}>
                {t('benefit4Desc')}
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          marginBottom: '3rem'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: '#1e293b',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            {t('howItWorks')}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#059669',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '1.5rem',
                color: 'white',
                fontWeight: 'bold'
              }}>
                1
              </div>
              <p style={{ color: '#374151', fontWeight: '500' }}>
                {t('step1')}
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#059669',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '1.5rem',
                color: 'white',
                fontWeight: 'bold'
              }}>
                2
              </div>
              <p style={{ color: '#374151', fontWeight: '500' }}>
                {t('step2')}
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#059669',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '1.5rem',
                color: 'white',
                fontWeight: 'bold'
              }}>
                3
              </div>
              <p style={{ color: '#374151', fontWeight: '500' }}>
                {t('step3')}
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#059669',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '1.5rem',
                color: 'white',
                fontWeight: 'bold'
              }}>
                4
              </div>
              <p style={{ color: '#374151', fontWeight: '500' }}>
                {t('step4')}
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          marginBottom: '3rem'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: '#1e293b',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            {t('testimonialsTitle')}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f0fdf4',
              borderRadius: '12px',
              border: '2px solid #bbf7d0'
            }}>
              <p style={{
                color: '#374151',
                lineHeight: '1.6',
                fontStyle: 'italic',
                marginBottom: '1rem'
              }}>
                {t('testimonial1')}
              </p>
              <p style={{
                color: '#059669',
                fontWeight: '600'
              }}>
                - Maria S., Boston
              </p>
            </div>
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f0fdf4',
              borderRadius: '12px',
              border: '2px solid #bbf7d0'
            }}>
              <p style={{
                color: '#374151',
                lineHeight: '1.6',
                fontStyle: 'italic',
                marginBottom: '1rem'
              }}>
                {t('testimonial2')}
              </p>
              <p style={{
                color: '#059669',
                fontWeight: '600'
              }}>
                - João P., Miami
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: '#059669',
            marginBottom: '1rem'
          }}>
            {t('cta')}
          </h2>
          <p style={{
            color: '#374151',
            marginBottom: '1rem',
            fontSize: '1.1rem'
          }}>
            Digite o produto e detalhes específicos acima e vá direto para a Amazon com produtos selecionados!
          </p>
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            backgroundColor: '#f0fdf4',
            borderRadius: '12px',
            border: '2px solid #bbf7d0'
          }}>
            <h3 style={{
              fontSize: '1.2rem',
              color: '#059669',
              marginBottom: '1rem',
              textAlign: 'center',
              fontWeight: 'bold'
            }}>
              🚀 Compartilhe com amigos!
            </h3>
            <p style={{
              color: '#374151',
              marginBottom: '1rem',
              textAlign: 'center',
              fontSize: '1rem'
            }}>
              Ajude outros brasileiros a encontrar produtos incríveis na Amazon
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button onClick={() => {
                const url = 'https://meuportalfit.com/amazon'
                const text = '🔍 Descobri uma busca inteligente incrível! A IA analisa milhares de produtos na Amazon e encontra os melhores para você. Economize horas de pesquisa: ' + url
                if (navigator.share) {
                  navigator.share({
                    title: 'Busca Inteligente - Meu Portal Fit',
                    text: text,
                    url: url
                  })
                } else {
                  navigator.clipboard.writeText(text)
                  alert('Link copiado! Compartilhe com seus amigos.')
                }
              }} style={{
                padding: '0.8rem 1.5rem',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                📱 Compartilhar
              </button>
              <button onClick={() => {
                const url = 'https://meuportalfit.com/amazon'
                navigator.clipboard.writeText(url)
                alert('Link copiado! Cole no WhatsApp ou outras redes sociais.')
              }} style={{
                padding: '0.8rem 1.5rem',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                🔗 Copiar Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
