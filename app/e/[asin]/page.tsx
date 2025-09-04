'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function RedirectPage() {
  const params = useParams()
  const asin = params.asin as string

  useEffect(() => {
    if (asin) {
      // Validar se o ASIN tem 10 caracteres alfanuméricos
      if (/^[A-Z0-9]{10}$/.test(asin)) {
        // Redirecionar para Amazon com tag de afiliado
        const amazonUrl = `https://www.amazon.com/dp/${asin}?tag=portalsolutio-20`
        
        // Redirecionamento imediato
        window.location.href = amazonUrl
      } else {
        // ASIN inválido, redirecionar para página principal
        window.location.href = 'https://meuportalfit.com'
      }
    }
  }, [asin])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
      padding: '2rem'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '500px'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#059669',
          marginBottom: '1rem'
        }}>
          🔗 Redirecionando...
        </h1>
        
        <p style={{
          fontSize: '1.1rem',
          color: '#374151',
          marginBottom: '2rem',
          lineHeight: '1.5'
        }}>
          Você está sendo redirecionado para a Amazon com o produto selecionado.
          <br />
          <strong>Tag de afiliado incluída automaticamente!</strong>
        </p>
        
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <p style={{
            color: '#059669',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
          }}>
            Produto: {asin}
          </p>
          <p style={{
            color: '#6b7280',
            fontSize: '0.9rem'
          }}>
            Se não for redirecionado automaticamente, 
            <br />
            <a 
              href={`https://www.amazon.com/dp/${asin}?tag=portalsolutio-20`}
              style={{
                color: '#059669',
                textDecoration: 'underline',
                fontWeight: 'bold'
              }}
            >
              clique aqui
            </a>
          </p>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => window.location.href = 'https://meuportalfit.com'}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            🏠 Voltar ao Meu Portal Fit
          </button>
          
          <button
            onClick={() => window.location.href = `https://www.amazon.com/dp/${asin}?tag=portalsolutio-20`}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            🛒 Ir para Amazon
          </button>
        </div>
      </div>
    </div>
  )
}
