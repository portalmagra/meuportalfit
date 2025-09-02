'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  amazonUrl: string;
  currentPrice: string;
  originalPrice: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  benefits: string[];
  features: string[];
  slug?: string;
}

export default function ShotAfrodisiacoPage() {
  const [adminProducts, setAdminProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Carregar produtos do localStorage
    const savedProducts = localStorage.getItem('globalProducts');
    if (savedProducts) {
      const products = JSON.parse(savedProducts);
      // Filtrar apenas produtos da categoria 'shot-afrodisiaco'
      const categoryProducts = products.filter((p: Product) => p.categoryId === 'shot-afrodisiaco');
      setAdminProducts(categoryProducts);
    }
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #ec4899, #be185d)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', fontWeight: 'bold' }}>
            💪 Suporte para Shot Afrodisíaco
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: 0.9 }}>
            Produtos selecionados para aumentar libido e energia sexual
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/analise" style={{
              padding: '15px 30px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              border: '2px solid rgba(255,255,255,0.3)',
              fontWeight: 'bold',
              transition: 'all 0.3s ease'
            }}>
              🧠 Avaliação Personalizada
            </Link>
            <Link href="/produtos" style={{
              padding: '15px 30px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              border: '2px solid rgba(255,255,255,0.3)',
              fontWeight: 'bold',
              transition: 'all 0.3s ease'
            }}>
              🛍️ Ver Todas as Categorias
            </Link>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {adminProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h2 style={{ color: '#333', marginBottom: '20px' }}>
              💪 Nenhum produto adicionado ainda para esta categoria
            </h2>
            <p style={{ color: '#666', marginBottom: '30px', fontSize: '1.1rem' }}>
              Nossos especialistas estão selecionando produtos específicos para aumentar libido e energia sexual.
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/analise" style={{
                padding: '15px 30px',
                backgroundColor: '#ec4899',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}>
                🧠 Fazer Avaliação Personalizada
              </Link>
              <Link href="/produtos" style={{
                padding: '15px 30px',
                backgroundColor: '#be185d',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}>
                🔍 Buscar Produtos
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '40px', fontSize: '2rem' }}>
              💪 Produtos Disponíveis
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              {adminProducts.map((product) => (
                <div key={product.id} style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '25px',
                  backgroundColor: 'white',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s ease'
                }}>
                  <h3 style={{ color: '#333', marginBottom: '15px', fontSize: '1.3rem', fontWeight: 'bold' }}>
                    {product.name}
                  </h3>
                  
                  <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.6' }}>
                    {product.description}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                      <p style={{ color: '#333', fontWeight: 'bold', fontSize: '1.2rem' }}>
                        💰 {product.currentPrice}
                      </p>
                      <p style={{ color: '#666', fontSize: '0.9rem' }}>
                        ⭐ {product.rating}/5 ({product.reviewCount} avaliações)
                      </p>
                    </div>
                  </div>

                  {product.benefits && product.benefits.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                      <h4 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>✅ Benefícios:</h4>
                      <ul style={{ margin: 0, paddingLeft: '20px', color: '#666' }}>
                        {product.benefits.map((benefit, index) => (
                          <li key={index} style={{ marginBottom: '5px' }}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {product.features && product.features.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                      <h4 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>🔧 Características:</h4>
                      <ul style={{ margin: 0, paddingLeft: '20px', color: '#666' }}>
                        {product.features.map((feature, index) => (
                          <li key={index} style={{ marginBottom: '5px' }}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginTop: 'auto'
                  }}>
                    <a 
                      href={`/produtos/shot-afrodisiaco/${product.slug || product.id}`} 
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
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
