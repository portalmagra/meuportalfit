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
}

export default function MenopausaPage() {
  const [adminProducts, setAdminProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carregar produtos do localStorage com sincronização robusta
    const loadProducts = () => {
      try {
        // Tentar carregar de ambas as chaves para garantir sincronização
        let savedProducts = localStorage.getItem('adminProducts');
        if (!savedProducts) {
          savedProducts = localStorage.getItem('globalProducts');
        }
        
        console.log('🔄 Carregando produtos menopausa do localStorage:', savedProducts ? 'encontrado' : 'não encontrado')
        if (savedProducts) {
          const products = JSON.parse(savedProducts);
          // Filtrar apenas produtos da categoria 'menopausa'
          const categoryProducts = products.filter((p: Product) => p.categoryId === 'menopausa');
          console.log('🌸 Produtos da categoria menopausa:', categoryProducts.length, 'produtos')
          setAdminProducts(categoryProducts);
        }
      } catch (error) {
        console.error('❌ Erro ao carregar produtos menopausa:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
    
    // Sincronizar com mudanças de outros dispositivos
    try {
      const channel = new BroadcastChannel('admin-sync')
      console.log('📡 Escutando sincronização na página menopausa')
      
      channel.onmessage = (event) => {
        console.log('📨 Mensagem recebida menopausa:', event.data.type, event.data.action || '')
        if (event.data.type === 'products-updated') {
          const menopausaProducts = event.data.products.filter((product: any) => 
            product.categoryId === 'menopausa'
          )
          console.log('🌸 Produtos atualizados via sincronização:', menopausaProducts.length, 'produtos')
          setAdminProducts(menopausaProducts)
          
          // Atualizar localStorage local também
          localStorage.setItem('adminProducts', JSON.stringify(event.data.products))
          localStorage.setItem('globalProducts', JSON.stringify(event.data.products))
        }
      }
      
      return () => {
        console.log('🔌 Fechando canal de sincronização menopausa')
        channel.close()
      }
    } catch (error) {
      console.log('❌ BroadcastChannel não suportado na página menopausa:', error)
    }
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', fontWeight: 'bold' }}>
            🌸 Suporte para Menopausa
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: 0.9 }}>
            Produtos selecionados para apoiar sua jornada durante a transição hormonal
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
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
              ⏳
            </div>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>
              Carregando produtos...
            </p>
          </div>
        ) : adminProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h2 style={{ color: '#333', marginBottom: '20px' }}>
              🌸 Nenhum produto adicionado ainda para esta categoria
            </h2>
            <p style={{ color: '#666', marginBottom: '30px', fontSize: '1.1rem' }}>
              Nossos especialistas estão selecionando produtos específicos para suporte durante a menopausa.
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/analise" style={{
                padding: '15px 30px',
                backgroundColor: '#4ECDC4',
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
                backgroundColor: '#6c757d',
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
            <h2 style={{ color: '#333', marginBottom: '30px', textAlign: 'center' }}>
              🌸 Produtos Selecionados para Menopausa
            </h2>
            <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
              {adminProducts.map(product => (
                <div key={product.id} style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '12px',
                  padding: '20px',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s ease'
                }}>
                  {product.imageUrl && (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        marginBottom: '15px'
                      }}
                    />
                  )}
                  <h3 style={{ color: '#333', marginBottom: '10px', fontSize: '1.2rem' }}>
                    {product.name}
                  </h3>
                  <p style={{ color: '#666', marginBottom: '15px', lineHeight: '1.5' }}>
                    {product.description}
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <span style={{ color: '#4ECDC4', fontWeight: 'bold', fontSize: '1.1rem' }}>
                      {product.currentPrice}
                    </span>
                    {product.rating > 0 && (
                      <span style={{ color: '#ffc107' }}>
                        ⭐ {product.rating} ({product.reviewCount} avaliações)
                      </span>
                    )}
                  </div>

                  <a
                    href={product.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '12px',
                      backgroundColor: '#4ECDC4',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      transition: 'background-color 0.3s ease'
                    }}
                  >
                    🛒 Ver na Amazon
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
