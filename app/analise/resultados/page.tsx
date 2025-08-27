'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface Product {
  name: string
  description: string
  asin: string
  price: string
  rating: number
  category: string
  benefits: string[]
  amazonUrl: string
  savings: number
}

interface AnalysisResult {
  success: boolean
  analysis: string
  profile: {
    language: string
    budget: string
    totalQuestions: number
  }
  recommendations: Product[]
  summary: {
    totalProducts: number
    totalSavings: number
    averageRating: number
  }
}

export default function ResultadosPage() {
  const [results, setResults] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const searchParams = useSearchParams()

  useEffect(() => {
    const data = searchParams.get('data')
    if (data) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(data))
        setResults(parsedData)
      } catch (err) {
        setError('Erro ao carregar resultados')
      }
    } else {
      setError('Nenhum dado encontrado')
    }
    setLoading(false)
  }, [searchParams])

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #f0f9ff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div>Carregando resultados...</div>
      </div>
    )
  }

  if (error || !results) {
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
          padding: '2rem',
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>
            Ops! Algo deu errado
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            {error}
          </p>
          <Link href="/analise">
            <button style={{
              background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer'
            }}>
              Fazer Nova Análise
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const { analysis, recommendations, summary } = results

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #f0f9ff 100%)',
      padding: '2rem 1rem'
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <div style={{
          background: 'rgba(34, 197, 94, 0.1)',
          borderRadius: '50px',
          padding: '0.5rem 1.5rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          border: '1px solid rgba(34, 197, 94, 0.2)'
        }}>
          <span>🎉</span>
          <span style={{ color: '#15803d', fontWeight: 600 }}>
            Análise Completa!
          </span>
        </div>

        <h1 style={{
          background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '2.5rem',
          fontWeight: 900,
          marginBottom: '1rem'
        }}>
          Seus Produtos Ideais
        </h1>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '1rem 1.5rem',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#22c55e' }}>
              ${summary.totalSavings}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
              Economia Total
            </div>
          </div>
          
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '1rem 1.5rem',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#3b82f6' }}>
              {summary.totalProducts}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
              Produtos Selecionados
            </div>
          </div>
          
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '1rem 1.5rem',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#f59e0b' }}>
              {summary.averageRating.toFixed(1)} ⭐
            </div>
            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
              Avaliação Média
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Análise Personalizada */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '3rem',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            color: '#1f2937',
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🧠 Sua Análise Personalizada
          </h2>
          
          <div style={{
            background: '#f8fafc',
            borderRadius: '15px',
            padding: '1.5rem',
            borderLeft: '4px solid #22c55e'
          }}>
            <p style={{
              color: '#374151',
              lineHeight: 1.6,
              fontSize: '1.1rem',
              margin: 0
            }}>
              {analysis}
            </p>
          </div>
        </div>

        {/* Produtos Recomendados */}
        <div style={{
          marginBottom: '3rem'
        }}>
          <h2 style={{
            color: '#1f2937',
            fontSize: '1.8rem',
            fontWeight: 700,
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            🛍️ Seus Produtos Recomendados
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {recommendations.map((product, index) => (
              <div key={product.asin} style={{
                background: 'white',
                borderRadius: '20px',
                padding: '1.5rem',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                position: 'relative',
                border: index === 0 ? '2px solid #22c55e' : '1px solid #f3f4f6'
              }}>
                {index === 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '20px',
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    color: 'white',
                    padding: '0.3rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}>
                    #1 RECOMENDADO
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <div style={{
                      background: '#f3f4f6',
                      color: '#6b7280',
                      fontSize: '0.7rem',
                      padding: '0.2rem 0.8rem',
                      borderRadius: '20px',
                      display: 'inline-block',
                      marginBottom: '0.5rem'
                    }}>
                      {product.category}
                    </div>
                    
                    <h3 style={{
                      color: '#1f2937',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      marginBottom: '0.5rem',
                      lineHeight: 1.3
                    }}>
                      {product.name}
                    </h3>
                  </div>
                  
                  <div style={{
                    background: '#fef3c7',
                    color: '#d97706',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    padding: '0.3rem 0.8rem',
                    borderRadius: '10px'
                  }}>
                    -{product.savings}%
                  </div>
                </div>

                <p style={{
                  color: '#6b7280',
                  fontSize: '0.9rem',
                  marginBottom: '1rem',
                  lineHeight: 1.4
                }}>
                  {product.description}
                </p>

                {/* Benefícios */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    {product.benefits.slice(0, 3).map((benefit, i) => (
                      <span key={i} style={{
                        background: '#ecfdf5',
                        color: '#065f46',
                        fontSize: '0.75rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '10px',
                        border: '1px solid #d1fae5'
                      }}>
                        ✓ {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Preço e Avaliação */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <div>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 900,
                      color: '#1f2937'
                    }}>
                      {product.price}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#6b7280'
                    }}>
                      Amazon Prime
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      marginBottom: '0.2rem'
                    }}>
                      <span style={{ color: '#f59e0b' }}>
                        {'★'.repeat(Math.floor(product.rating))}
                      </span>
                      <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                        {product.rating}
                      </span>
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#6b7280'
                    }}>
                      Milhares de reviews
                    </div>
                  </div>
                </div>

                {/* Botão de Compra */}
                <a 
                  href={product.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <button style={{
                    width: '100%',
                    background: index === 0 
                      ? 'linear-gradient(135deg, #22c55e, #16a34a)' 
                      : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: '1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease'
                  }}>
                    🛒 Comprar na Amazon
                    <span style={{ fontSize: '0.8rem' }}>→</span>
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2rem',
          textAlign: 'center',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{
            color: '#1f2937',
            fontSize: '1.3rem',
            fontWeight: 700,
            marginBottom: '1rem'
          }}>
            💡 Dica Importante
          </h3>
          
          <p style={{
            color: '#6b7280',
            marginBottom: '2rem',
            lineHeight: 1.6
          }}>
            Estes produtos foram selecionados especificamente para seu perfil. 
            Recomendamos começar com 1-2 produtos e avaliar os resultados antes de adicionar outros.
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <Link href="/analise">
              <button style={{
                background: 'white',
                color: '#6b7280',
                padding: '1rem 2rem',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                fontWeight: 600
              }}>
                🔄 Nova Análise
              </button>
            </Link>
            
            <Link href="/">
              <button style={{
                background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700
              }}>
                🏠 Voltar ao Início
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}