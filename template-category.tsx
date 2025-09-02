// Template padrão para botões de produto
const productButtonsTemplate = (categoryName: string, product: any) => `
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginTop: 'auto'
                  }}>
                    <a 
                      href={\`/produtos/${categoryName}/\${product.slug || product.id}\`} 
                      style={{ 
                        textDecoration: 'none', 
                        flex: 1,
                        display: 'block',
                        cursor: 'pointer'
                      }}
                    >
                      <button style={{
                        width: '100%',
                        padding: '0.8rem',
                        background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem'
                      }}>
                        <span>📄</span>
                        <span>Ver Detalhes</span>
                      </button>
                    </a>
                    
                    <a
                      href={product.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none', flex: 1 }}
                    >
                      <button style={{
                        width: '100%',
                        padding: '0.8rem',
                        background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem'
                      }}>
                        <span>🛒</span>
                        <span>Amazon</span>
                      </button>
                    </a>
                  </div>
`;
