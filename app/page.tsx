export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ecfdf5, #dbeafe)',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1 style={{fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem'}}>
        MeuPortalFit
      </h1>
      <p style={{fontSize: '1.2rem', marginBottom: '2rem'}}>
        Quiz inteligente para brasileiros nos EUA
      </p>
      <button style={{
        background: '#059669',
        color: 'white',
        padding: '1rem 2rem',
        borderRadius: '8px',
        border: 'none',
        fontSize: '1rem',
        cursor: 'pointer'
      }}>
        Fazer Quiz Gratuito
      </button>
    </div>
  )
}
