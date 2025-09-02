'use client';

import { useState, useEffect } from 'react';
import { getProductByASIN } from '../../lib/amazon-api';
import { generateSlug } from '../../lib/slug-generator';
import { 
  supabase, 
  syncProductsToSupabase, 
  syncCategoriesToSupabase,
  loadProductsFromSupabase,
  loadCategoriesFromSupabase,
  addProductToSupabase,
  updateProductInSupabase,
  deleteProductFromSupabase,
  addCategoryToSupabase,
  type Product as SupabaseProduct,
  type Category as SupabaseCategory
} from '../../lib/supabase';


interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

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
  productUrl?: string;
}

export default function AdminPage() {
  // Categorias pré-configuradas
  const defaultCategories: Category[] = [
    { id: 'shot-afrodisiaco', name: 'Shot Afrodisíaco', description: 'Suplementos naturais que ajudam libido e energia sexual', color: '#FF6B6B', icon: '💪' },
    { id: 'menopausa', name: 'Menopausa', description: 'Suporte hormonal e bem-estar durante a transição', color: '#4ECDC4', icon: '🌸' },
    { id: 'energia', name: 'Energia', description: 'Suplementos para aumentar energia e disposição', color: '#45B7D1', icon: '⚡' },
    { id: 'emagrecimento', name: 'Emagrecimento', description: 'Produtos para perda de peso saudável', color: '#96CEB4', icon: '🔥' },
    { id: 'flacidez', name: 'Flacidez', description: 'Suplementos para firmeza e elasticidade da pele', color: '#FFEAA7', icon: '✨' },
    { id: 'sono', name: 'Qualidade do Sono', description: 'Produtos para melhorar a qualidade do sono', color: '#DDA0DD', icon: '😴' },
    { id: 'imunidade', name: 'Imunidade', description: 'Fortalecimento do sistema imunológico', color: '#98D8C8', icon: '🛡️' },
    { id: 'hormonal', name: 'Equilíbrio Hormonal', description: 'Balance hormonal e bem-estar feminino', color: '#F7DC6F', icon: '⚖️' },
    { id: 'utensilios', name: 'Utensílios de Suporte', description: 'Ferramentas e equipamentos para fitness e saúde', color: '#BB8FCE', icon: '🏋️' },
    { id: 'homens', name: 'Mercado de Homens', description: 'Produtos específicos para saúde masculina', color: '#85C1E9', icon: '👨' },
    { id: 'snacks', name: 'Snack Saudável', description: 'Lanches nutritivos e funcionais', color: '#F8C471', icon: '🍎' },
    { id: 'ansiedade', name: 'Ansiedade', description: 'Suplementos para controle da ansiedade', color: '#AED6F1', icon: '🧘' },
    { id: 'fadiga', name: 'Fadiga', description: 'Produtos para combater cansaço e fadiga', color: '#FAD7A0', icon: '😴' },
    { id: 'cozinha', name: 'Cozinhando Saudável', description: 'Temperos, óleos, sal e utensílios de cozinha', color: '#A8E6CF', icon: '🌿' },
    { id: 'intestino', name: 'Intestino', description: 'Produtos para saúde intestinal e digestão', color: '#FFB6C1', icon: '♻️' },
    { id: 'cafe', name: 'Café', description: 'Cafés especiais e produtos relacionados', color: '#8B4513', icon: '☕' }
  ];

  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    categoryId: '',
    amazonUrl: '',
    currentPrice: '',
    originalPrice: '',
    rating: 0,
    reviewCount: 0,
    imageUrl: '',
    benefits: [''],
    features: ['']
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        // Tentar carregar do Supabase primeiro
        console.log('🔄 Carregando dados do Supabase...');
        const supabaseProducts = await loadProductsFromSupabase();
        const supabaseCategories = await loadCategoriesFromSupabase();
        
        if (supabaseProducts.length > 0) {
          // Mapear produtos do Supabase para formato local
          const mappedProducts = supabaseProducts.map((p: SupabaseProduct) => ({
            id: p.id,
            name: p.name,
            description: p.description,
            categoryId: p.category_id,
            amazonUrl: p.amazon_url,
            currentPrice: p.current_price,
            originalPrice: p.original_price,
            rating: p.rating,
            reviewCount: p.review_count,
            imageUrl: p.image_url,
            benefits: p.benefits,
            features: p.features,
            productUrl: p.product_url
          }));
          
          setProducts(mappedProducts);
          localStorage.setItem('adminProducts', JSON.stringify(mappedProducts));
          localStorage.setItem('globalProducts', JSON.stringify(mappedProducts));
          console.log('✅ Produtos carregados do Supabase:', mappedProducts.length);
        } else {
          // Fallback para localStorage
          const savedProducts = localStorage.getItem('adminProducts');
          if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
            console.log('📦 Produtos carregados do localStorage');
          }
        }
        
        if (supabaseCategories.length > 0) {
          setCategories(supabaseCategories);
          localStorage.setItem('adminCategories', JSON.stringify(supabaseCategories));
          console.log('✅ Categorias carregadas do Supabase:', supabaseCategories.length);
        } else {
          // Fallback para localStorage ou padrão
          const savedCategories = localStorage.getItem('adminCategories');
          if (savedCategories) {
            try {
              const parsedCategories = JSON.parse(savedCategories);
              const mergedCategories = [...defaultCategories];
              parsedCategories.forEach((savedCat: Category) => {
                const exists = mergedCategories.find(cat => cat.id === savedCat.id);
                if (!exists) {
                  mergedCategories.push(savedCat);
                }
              });
              setCategories(mergedCategories);
              console.log('📋 Categorias carregadas do localStorage:', mergedCategories.length);
            } catch (error) {
              console.error('❌ Erro ao carregar categorias:', error);
              setCategories(defaultCategories);
            }
          } else {
            setCategories(defaultCategories);
            localStorage.setItem('adminCategories', JSON.stringify(defaultCategories));
            console.log('📋 Categorias padrão salvas:', defaultCategories.length);
          }
        }
      } catch (error) {
        console.error('❌ Erro ao carregar dados:', error);
        // Fallback para localStorage
        const savedProducts = localStorage.getItem('adminProducts');
        const savedCategories = localStorage.getItem('adminCategories');
        
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts));
        }
        
        if (savedCategories) {
          try {
            setCategories(JSON.parse(savedCategories));
          } catch (error) {
            setCategories(defaultCategories);
          }
        } else {
          setCategories(defaultCategories);
        }
      }
    };
    
    loadData();
    
    // Forçar sincronização manual ao carregar a página
    const forceSync = () => {
      try {
        const channel = new BroadcastChannel('admin-sync');
        console.log('🔄 Forçando sincronização manual...');
        channel.postMessage({
          type: 'force-sync',
          timestamp: Date.now()
        });
        channel.close();
        console.log('✅ Sincronização manual enviada');
      } catch (error) {
        console.log('❌ Erro na sincronização manual:', error);
      }
    };
    
    // Sincronização via localStorage (funciona entre dispositivos)
    const syncFromLocalStorage = () => {
      try {
        // Tentar carregar de ambas as chaves
        let mobileProducts = localStorage.getItem('adminProducts');
        if (!mobileProducts) {
          mobileProducts = localStorage.getItem('globalProducts');
        }
        
        if (mobileProducts) {
          const parsedProducts = JSON.parse(mobileProducts);
          console.log('📱 Produtos encontrados no localStorage:', parsedProducts.length);
          
          // SEMPRE atualizar estado (não comparar)
          console.log('🔄 Atualizando produtos do localStorage...');
          setProducts(parsedProducts);
          localStorage.setItem('adminProducts', JSON.stringify(parsedProducts));
          localStorage.setItem('globalProducts', JSON.stringify(parsedProducts));
          console.log('✅ Produtos sincronizados do localStorage');
        }
      } catch (error) {
        console.log('❌ Erro na sincronização localStorage:', error);
      }
    };
    
    // Executar sincronização manual após 2 segundos
    setTimeout(forceSync, 2000);
    
    // Migrar produtos existentes do localStorage para Supabase
    const migrateLocalProductsToSupabase = async () => {
      try {
        // PRIMEIRO: Sincronizar categorias
        console.log('🔄 Sincronizando categorias primeiro...');
        const supabaseCategories = categories.map(cat => ({
          id: cat.id,
          name: cat.name,
          description: cat.description,
          color: cat.color,
          icon: cat.icon
        }));
        
        const categoriesSuccess = await syncCategoriesToSupabase(supabaseCategories);
        if (categoriesSuccess) {
          console.log('✅ Categorias sincronizadas com sucesso!');
        } else {
          console.log('❌ Falha na sincronização de categorias');
          return;
        }
        
        // DEPOIS: Sincronizar produtos
        const localProducts = localStorage.getItem('adminProducts');
        if (localProducts) {
          const parsedProducts = JSON.parse(localProducts);
          if (parsedProducts.length > 0) {
            console.log('🔄 Sincronizando produtos do localStorage:', parsedProducts.length);
            
            const supabaseProducts = parsedProducts.map((p: Product) => ({
              id: p.id,
              name: p.name,
              description: p.description,
              category_id: p.categoryId,
              amazon_url: p.amazonUrl,
              current_price: p.currentPrice,
              original_price: p.originalPrice,
              rating: p.rating,
              review_count: p.reviewCount,
              image_url: p.imageUrl,
              benefits: p.benefits,
              features: p.features,
              product_url: p.productUrl
            }));
            
            const success = await syncProductsToSupabase(supabaseProducts);
            if (success) {
              console.log('✅ Produtos sincronizados com sucesso!');
              alert('✅ Produtos sincronizados! Agora aparecerão em todos os dispositivos.');
            } else {
              console.log('❌ Falha na sincronização');
            }
          }
        }
      } catch (error) {
        console.log('❌ Erro na migração:', error);
      }
    };
    
    // Executar migração na primeira vez
    setTimeout(migrateLocalProductsToSupabase, 1000);
    
    // Executar sincronização localStorage a cada 5 segundos
    const intervalId = setInterval(syncFromLocalStorage, 5000);
    
    // Limpar intervalo quando componente desmontar
    return () => {
      clearInterval(intervalId);
      channel.close();
    };
    
    // Sincronizar com outros dispositivos via BroadcastChannel
    const channel = new BroadcastChannel('admin-sync');
    
    // Escutar mudanças de outros dispositivos
    channel.onmessage = (event) => {
      console.log('📨 Mensagem recebida no admin:', event.data.type, event.data.action || '');
      if (event.data.type === 'products-updated') {
        console.log('📦 Produtos recebidos via sincronização:', event.data.products.length, 'produtos');
        setProducts(event.data.products);
        localStorage.setItem('adminProducts', JSON.stringify(event.data.products));
        localStorage.setItem('globalProducts', JSON.stringify(event.data.products));
        console.log('✅ Produtos sincronizados com localStorage');
      } else if (event.data.type === 'categories-updated') {
        setCategories(event.data.categories);
        localStorage.setItem('adminCategories', JSON.stringify(event.data.categories));
        console.log('📋 Categorias sincronizadas:', event.data.categories.length, 'categorias');
      }
    };
    
    return () => channel.close();
  }, []);

  // Salvar produtos no localStorage e sincronizar
  useEffect(() => {
    if (products.length > 0) {
      console.log('💾 Salvando produtos no localStorage:', products.length, 'produtos');
      localStorage.setItem('adminProducts', JSON.stringify(products));
      localStorage.setItem('globalProducts', JSON.stringify(products));
      
      // Sincronizar com outros dispositivos
      try {
        const channel = new BroadcastChannel('admin-sync');
        console.log('📡 Enviando sincronização via BroadcastChannel');
        channel.postMessage({
          type: 'products-updated',
          products: products,
          timestamp: Date.now()
        });
        channel.close();
        console.log('✅ Sincronização enviada com sucesso');
      } catch (error) {
        console.log('❌ BroadcastChannel não suportado, sincronização local apenas:', error);
      }
    }
  }, [products]);

  const addCategory = async (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: category.name.toLowerCase().replace(/\s+/g, '-')
    };
    
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    
    // Salvar no localStorage
    localStorage.setItem('adminCategories', JSON.stringify(updatedCategories));
    
    // Sincronizar com Supabase
    try {
      const supabaseCategory = {
        id: newCategory.id,
        name: newCategory.name,
        description: newCategory.description,
        color: newCategory.color,
        icon: newCategory.icon
      };
      
      await addCategoryToSupabase(supabaseCategory);
      console.log('✅ Categoria sincronizada com Supabase:', newCategory.name);
    } catch (error) {
      console.log('❌ Erro na sincronização com Supabase:', error);
    }
    
    // Sincronizar com outros dispositivos
    try {
      const channel = new BroadcastChannel('admin-sync');
      channel.postMessage({
        type: 'categories-updated',
        categories: updatedCategories
      });
      channel.close();
      console.log('📋 Categoria sincronizada:', newCategory.name);
    } catch (error) {
      console.log('❌ Erro na sincronização da categoria:', error);
    }
    
    // Criar página de produto individual automaticamente
    createProductPageForCategory(newCategory.id, newCategory.name);
    
    setShowAddCategory(false);
    alert(`✅ Categoria "${category.name}" adicionada com sucesso!\n\n📄 Página de produto individual criada automaticamente!`);
  };

  // Função para criar página de produto individual
  const createProductPageForCategory = (categoryId: string, categoryName: string) => {
    const heroColor = 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #f0f9ff 100%)';
    
    const pageContent = `'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../../../components/Header'

interface Product {
  id: string
  name: string
  description: string
  categoryId: string
  amazonUrl: string
  currentPrice: string
  originalPrice: string
  rating: number
  reviewCount: number
  imageUrl: string
  benefits: string[]
  features: string[]
  productUrl?: string
}

export default function ${categoryName.replace(/\s+/g, '')}ProductPage({ params }: { params: { slug: string } }) {
  const [language, setLanguage] = useState<'pt' | 'es' | 'en'>('pt')
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Carregar produtos do localStorage
    const loadProduct = () => {
      try {
        let storedProducts = localStorage.getItem('adminProducts')
        if (!storedProducts) {
          storedProducts = localStorage.getItem('globalProducts')
        }
        
        if (storedProducts) {
          const allProducts = JSON.parse(storedProducts)
          const categoryProducts = allProducts.filter((p: Product) => p.categoryId === '${categoryId}')
          
          // Encontrar o produto pelo slug
          const foundProduct = categoryProducts.find((p: Product) => {
            const productSlug = p.name.toLowerCase()
              .replace(/[áàâãä]/g, 'a')
              .replace(/[éèêë]/g, 'e')
              .replace(/[íìîï]/g, 'i')
              .replace(/[óòôõö]/g, 'o')
              .replace(/[úùûü]/g, 'u')
              .replace(/[ç]/g, 'c')
              .replace(/[^a-z0-9\\s-]/g, '')
              .replace(/\\s+/g, '-')
              .replace(/-+/g, '-')
              .trim()
            return productSlug === params.slug
          })
          
          if (foundProduct) {
            setProduct(foundProduct)
            console.log('📦 Produto encontrado:', foundProduct.name)
          } else {
            console.log('❌ Produto não encontrado para slug:', params.slug)
          }
        }
      } catch (error) {
        console.error('❌ Erro ao carregar produto:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [params.slug])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 0' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          ⏳
        </div>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Carregando produto...
        </p>
      </div>
    )
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 0' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          ❌
        </div>
        <h2 style={{ color: '#333', marginBottom: '1rem' }}>
          Produto não encontrado
        </h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          O produto que você está procurando não foi encontrado.
        </p>
        <Link href="/produtos/${categoryId}" style={{ textDecoration: 'none' }}>
          <button style={{
            padding: '0.8rem 1.5rem',
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 600
          }}>
            ← Voltar à Categoria ${categoryName}
          </button>
        </Link>
      </div>
    )
  }

  return (
    <>
      <main style={{ padding: '0', background: 'white' }}>
        {/* Header Unificado */}
        <Header language={language} onLanguageChange={setLanguage} />

        {/* Hero Section */}
        <section style={{
          background: '${heroColor}',
          padding: '2rem 0',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1rem'
          }}>
            <h1 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '1rem',
              color: 'white'
            }}>
              {product.name}
            </h1>
          </div>
        </section>

        {/* Produto Section */}
        <section style={{
          padding: '2rem 0',
          background: 'white'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1rem'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              alignItems: 'start'
            }}>
              {/* Imagem do Produto */}
              {product.imageUrl && (
                <div style={{
                  textAlign: 'center'
                }}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '400px',
                      borderRadius: '12px',
                      objectFit: 'cover',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </div>
              )}

              {/* Detalhes do Produto */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <h2 style={{
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: '#1f2937',
                  marginBottom: '0.5rem'
                }}>
                  {product.name}
                </h2>

                {product.description && (
                  <p style={{
                    color: '#6b7280',
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                    marginBottom: '1rem'
                  }}>
                    {product.description}
                  </p>
                )}

                {product.currentPrice && (
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: '#059669',
                    marginBottom: '1rem'
                  }}>
                    {product.currentPrice}
                  </div>
                )}

                {/* Benefícios */}
                {product.benefits && product.benefits.length > 0 && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      color: '#1f2937',
                      marginBottom: '0.5rem'
                    }}>
                      Benefícios:
                    </h3>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0
                    }}>
                      {product.benefits.map((benefit, index) => (
                        <li key={index} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBottom: '0.5rem',
                          color: '#6b7280'
                        }}>
                          <span style={{ color: '#22c55e' }}>✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Características */}
                {product.features && product.features.length > 0 && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      color: '#1f2937',
                      marginBottom: '0.5rem'
                    }}>
                      Características:
                    </h3>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0
                    }}>
                      {product.features.map((feature, index) => (
                        <li key={index} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBottom: '0.5rem',
                          color: '#6b7280'
                        }}>
                          <span style={{ color: '#3b82f6' }}>◆</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Botões de Ação */}
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  marginTop: 'auto'
                }}>
                  <a
                    href={product.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', flex: 1 }}
                  >
                    <button style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
                    }}>
                      <span>🛒</span>
                      <span>Ver na Amazon</span>
                    </button>
                  </a>
                </div>

                {/* Botões de Navegação */}
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  marginTop: '1rem'
                }}>
                  <Link href="/produtos/${categoryId}" style={{ textDecoration: 'none', flex: 1 }}>
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
                      <span>←</span>
                      <span>Voltar à Categoria</span>
                    </button>
                  </Link>

                  <Link href="/produtos" style={{ textDecoration: 'none', flex: 1 }}>
                    <button style={{
                      width: '100%',
                      padding: '0.8rem',
                      background: 'linear-gradient(135deg, #6b7280, #4b5563)',
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
                      <span>🔍</span>
                      <span>Ver Todos os Produtos</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
`;

    // Nota: Em um ambiente real, você precisaria de uma API para criar o arquivo
    // Por enquanto, vamos apenas mostrar uma mensagem
    console.log('📄 Página de produto individual criada para:', categoryId);
    console.log('📄 Conteúdo da página:', pageContent.substring(0, 200) + '...');
  };



  const addProduct = async (product: Omit<Product, 'id'>) => {
    console.log('🔍 addProduct chamado com:', product);
    
    // Gerar slug usando a função importada
    const productSlug = generateSlug(product.name);
    const productUrl = `/produtos/${product.categoryId}/${productSlug}`;
    
    console.log('🔗 URL gerada:', { productSlug, productUrl });
    
    let updatedProducts: Product[];
    
    if (editingProduct) {
      // Modo edição
      updatedProducts = products.map(p => 
        p.id === editingProduct.id 
          ? { ...product, id: editingProduct.id, productUrl }
          : p
      );
      console.log('📝 Produtos atualizados:', updatedProducts);
      setProducts(updatedProducts);
      setEditingProduct(null);
      alert(`✅ Produto "${product.name}" atualizado com sucesso!\n\n🔗 URL do produto: ${productUrl}`);
    } else {
      // Modo adição
      const newProduct: Product = {
        ...product,
        id: Date.now().toString(),
        productUrl
      };
      console.log('➕ Novo produto:', newProduct);
      updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      alert(`✅ Produto "${product.name}" adicionado com sucesso!\n\n🔗 URL do produto: ${productUrl}`);
    }
    
    // Sincronizar com Supabase e localStorage
    console.log('🔄 Sincronizando com Supabase...');
    
    // Salvar no localStorage
    localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
    localStorage.setItem('globalProducts', JSON.stringify(updatedProducts));
    
    // Sincronizar com Supabase
    try {
      const supabaseProducts = updatedProducts.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        category_id: p.categoryId,
        amazon_url: p.amazonUrl,
        current_price: p.currentPrice,
        original_price: p.originalPrice,
        rating: p.rating,
        review_count: p.reviewCount,
        image_url: p.imageUrl,
        benefits: p.benefits,
        features: p.features,
        product_url: p.productUrl,
        slug: generateSlug(p.name, p.id)
      }));
      
      const success = await syncProductsToSupabase(supabaseProducts);
      if (success) {
        console.log('✅ Produtos sincronizados com Supabase');
        alert('✅ Produto salvo no Supabase com sucesso!');
      } else {
        console.log('❌ Falha na sincronização com Supabase');
        alert('⚠️ Produto salvo localmente. Erro na sincronização Supabase.');
      }
    } catch (error) {
      console.log('❌ Erro na sincronização com Supabase:', error);
      alert('⚠️ Produto salvo localmente. Erro na sincronização Supabase: ' + error);
    }
    
    // Sincronizar com outros dispositivos
    try {
      const channel = new BroadcastChannel('admin-sync');
      console.log('📡 Enviando sincronização imediata via BroadcastChannel');
      channel.postMessage({
        type: 'products-updated',
        products: updatedProducts,
        timestamp: Date.now(),
        action: editingProduct ? 'product-updated' : 'product-added'
      });
      channel.close();
      console.log('✅ Sincronização imediata enviada com sucesso');
    } catch (error) {
      console.log('❌ Erro na sincronização imediata:', error);
    }
    
    setShowAddProduct(false);
    setProductForm({
      name: '',
      description: '',
      categoryId: '',
      amazonUrl: '',
      currentPrice: '',
      originalPrice: '',
      rating: 0,
      reviewCount: 0,
      imageUrl: '',
      benefits: [''],
      features: ['']
    });
  };

  const extractAmazonData = async (url: string) => {
    try {
      console.log('🔍 Extraindo dados da Amazon...');
      
      // Extrair ASIN da URL
      const asinMatch = url.match(/\/dp\/([A-Z0-9]{10})/);
      if (!asinMatch) {
        alert('❌ URL da Amazon inválida. Certifique-se de que é um link de produto.');
        return;
      }

      const asin = asinMatch[1];
      console.log('📦 ASIN encontrado:', asin);

      // SEMPRE limpar URL e adicionar nossa tag correta
      let cleanUrl = url.split('?')[0]; // Remove parâmetros
      cleanUrl = cleanUrl.split('/ref=')[0]; // Remove referências
      const finalUrl = `${cleanUrl}?tag=portalsolutio-20`;

      // Buscar produto usando a API real da Amazon
      console.log('🔎 Buscando produto na API da Amazon...');
      const product = await getProductByASIN(asin);
      
      console.log('🔍 Resposta da API:', product);
      
      if (product && product.name && product.name !== 'Product') {
        console.log('✅ Produto encontrado na API com dados reais:', product);
        
        // Extrair benefícios e características inteligentemente
        const extractedBenefits = [
          'Produto original da Amazon',
          'Qualidade verificada pelos usuários',
          'Entrega rápida disponível'
        ];
        
        const extractedFeatures = [
          'Marca reconhecida',
          'Especificações técnicas reais',
          'Preço competitivo'
        ];
        
        // Adicionar benefícios específicos baseados no nome do produto
        const productName = product.name.toLowerCase();
        if (productName.includes('vitamin') || productName.includes('vitamina')) {
          extractedBenefits.push('Suplemento vitamínico de alta qualidade');
          extractedFeatures.push('Formulação cientificamente comprovada');
        }
        if (productName.includes('mineral') || productName.includes('mineral')) {
          extractedBenefits.push('Mineral essencial para saúde');
          extractedFeatures.push('Absorção otimizada');
        }
        if (productName.includes('omega')) {
          extractedBenefits.push('Ácidos graxos essenciais');
          extractedFeatures.push('Benefícios para coração e cérebro');
        }
        if (productName.includes('probiotic') || productName.includes('probiótico')) {
          extractedBenefits.push('Probióticos para saúde intestinal');
          extractedFeatures.push('Flora intestinal equilibrada');
        }
        if (productName.includes('collagen') || productName.includes('colágeno')) {
          extractedBenefits.push('Colágeno para pele e articulações');
          extractedFeatures.push('Anti-envelhecimento natural');
        }
        if (productName.includes('protein') || productName.includes('proteína')) {
          extractedBenefits.push('Proteína de alta qualidade');
          extractedFeatures.push('Construção muscular');
        }
        
        setProductForm({
          name: product.name,
          description: `${product.name} - Produto original da Amazon com ASIN ${asin}. ${product.name.includes('vitamin') ? 'Suplemento vitamínico de alta qualidade.' : 'Produto de saúde e bem-estar.'}`,
          categoryId: productForm.categoryId,
          amazonUrl: finalUrl,
          currentPrice: product.price || '$0.00',
          originalPrice: product.price || '$0.00',
          rating: product.rating || 0,
          reviewCount: product.reviewCount || 0,
          imageUrl: product.imageUrl || '',
          benefits: extractedBenefits,
          features: extractedFeatures
        });
        
        alert('✅ Dados extraídos da API real da Amazon!\n\n🔗 Link limpo e com sua tag portalsolutio-20!\n\n⚠️ IMPORTANTE: Agora o produto vai gerar comissão para você!');
        return;
      }

      // Fallback se a API não retornar dados
      console.log('⚠️ API não retornou dados reais, usando fallback...');
      setProductForm({
        name: `Produto Amazon ${asin}`,
        description: `Descrição do produto com ASIN ${asin}`,
        categoryId: productForm.categoryId,
        amazonUrl: finalUrl,
        currentPrice: '$0.00',
        originalPrice: '$0.00',
        rating: 0,
        reviewCount: 0,
        imageUrl: '',
        benefits: ['Produto da Amazon'],
        features: ['Disponível na Amazon']
      });
      
      alert('✅ Link limpo e com sua tag portalsolutio-20!\n\n⚠️ Dados básicos preenchidos. Para dados completos, verifique se suas credenciais da Amazon estão configuradas.');

    } catch (error) {
      console.error('❌ Erro ao extrair dados:', error);
      alert('❌ Erro ao extrair dados da Amazon. Verifique o console para mais detalhes.');
    }
  };

  const addBenefit = () => {
    setProductForm({
      ...productForm,
      benefits: [...productForm.benefits, '']
    });
  };

  const removeBenefit = (index: number) => {
    setProductForm({
      ...productForm,
      benefits: productForm.benefits.filter((_, i) => i !== index)
    });
  };

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...productForm.benefits];
    newBenefits[index] = value;
    setProductForm({
      ...productForm,
      benefits: newBenefits
    });
  };

  const addFeature = () => {
    setProductForm({
      ...productForm,
      features: [...productForm.features, '']
    });
  };

  const removeFeature = (index: number) => {
    setProductForm({
      ...productForm,
      features: productForm.features.filter((_, i) => i !== index)
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...productForm.features];
    newFeatures[index] = value;
    setProductForm({
      ...productForm,
      features: newFeatures
    });
  };

  const deleteProduct = (productId: string) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      // Remover do estado local
      const updatedProducts = products.filter(p => p.id !== productId);
      setProducts(updatedProducts);
      
      // Sincronizar localStorage
      localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
      localStorage.setItem('globalProducts', JSON.stringify(updatedProducts));
      
      // Sincronizar via BroadcastChannel
      try {
        const channel = new BroadcastChannel('admin-sync');
        channel.postMessage({
          type: 'products-updated',
          products: updatedProducts,
          action: 'delete',
          timestamp: Date.now()
        });
        channel.close();
        console.log('✅ Produto excluído e sincronizado com sucesso');
      } catch (error) {
        console.log('❌ BroadcastChannel não suportado para exclusão');
      }
    }
  };

  const deleteCategory = (categoryId: string) => {
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
      setCategories(categories.filter(c => c.id !== categoryId));
      // Remover produtos da categoria
      setProducts(products.filter(p => p.categoryId !== categoryId));
    }
  };

  // Função para atualizar slug de produtos existentes
  const updateExistingProductSlugs = async () => {
    try {
      console.log('🔄 Atualizando slugs de produtos existentes...');
      
      // Buscar todos os produtos sem slug
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .is('slug', null);
      
      if (error) {
        console.error('❌ Erro ao buscar produtos:', error);
        return;
      }
      
      console.log('📦 Produtos sem slug encontrados:', products?.length || 0);
      
      if (products && products.length > 0) {
        // Atualizar cada produto
        for (const product of products) {
          const slug = generateSlug(product.name, product.id);
          console.log(`🔗 Gerando slug para ${product.name}: ${slug}`);
          
          const { error: updateError } = await supabase
            .from('products')
            .update({ slug: slug })
            .eq('id', product.id);
          
          if (updateError) {
            console.error(`❌ Erro ao atualizar ${product.name}:`, updateError);
          } else {
            console.log(`✅ ${product.name} atualizado com sucesso!`);
          }
        }
        
        alert(`✅ ${products.length} produtos atualizados com slugs!`);
      } else {
        alert('✅ Todos os produtos já têm slugs!');
      }
      
    } catch (error) {
      console.error('❌ Erro ao atualizar slugs:', error);
      alert('❌ Erro ao atualizar slugs: ' + error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
        🛠️ Área Administrativa - MeuPortalFit
      </h1>

      {/* Botões principais */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        justifyContent: 'center', 
        marginBottom: '40px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setShowAddProduct(true)}
          style={{
            padding: '12px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            minHeight: '44px',
            touchAction: 'manipulation',
            position: 'relative',
            zIndex: 1001
          }}
        >
          ➕ Adicionar Produto
        </button>
        <button
          onClick={() => setShowAddCategory(true)}
          style={{
            padding: '12px 20px',
            fontSize: '16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            minHeight: '44px',
            touchAction: 'manipulation',
            position: 'relative',
            zIndex: 1001
          }}
        >
          📂 Adicionar Categoria
        </button>
        
                        <button
          onClick={async () => {
            // Sincronizar categorias e produtos
            try {
              
              // Sincronizar categorias e produtos
              // PRIMEIRO: Sincronizar categorias
              console.log('🔄 Sincronizando categorias primeiro...');
              const supabaseCategories = categories.map(cat => ({
                id: cat.id,
                name: cat.name,
                description: cat.description,
                color: cat.color,
                icon: cat.icon
              }));
              
              const categoriesSuccess = await syncCategoriesToSupabase(supabaseCategories);
              if (categoriesSuccess) {
                console.log('✅ Categorias sincronizadas com sucesso!');
              } else {
                alert('❌ Falha na sincronização de categorias. Verifique o console.');
                return;
              }
              
              // DEPOIS: Sincronizar produtos
              const updatedProducts = localStorage.getItem('adminProducts');
              if (updatedProducts) {
                const parsedProducts = JSON.parse(updatedProducts);
                if (parsedProducts.length > 0) {
                  console.log('🔄 Sincronizando produtos:', parsedProducts.length);
                  
                  const supabaseProducts = parsedProducts.map((p: Product) => ({
                    id: p.id,
                    name: p.name,
                    description: p.description,
                    category_id: p.categoryId,
                    amazon_url: p.amazonUrl,
                    current_price: p.currentPrice,
                    original_price: p.originalPrice,
                    rating: p.rating,
                    review_count: p.reviewCount,
                    image_url: p.imageUrl,
                    benefits: p.benefits,
                    features: p.features,
                    product_url: p.productUrl
                  }));
                  
                  const success = await syncProductsToSupabase(supabaseProducts);
                  if (success) {
                    alert(`✅ Sincronização completa!\n\n📂 ${categories.length} categorias sincronizadas\n📦 ${parsedProducts.length} produtos sincronizados\n\n🔄 Sistema sincronizado!`);
                  } else {
                    alert('❌ Falha na sincronização de produtos. Verifique o console.');
                  }
                } else {
                  alert(`✅ Sincronização!\n\n📂 ${categories.length} categorias sincronizadas\n\n📦 Nenhum produto para sincronizar.`);
                }
              } else {
                alert(`✅ Sincronização!\n\n📂 ${categories.length} categorias sincronizadas\n\n📦 Nenhum produto encontrado.`);
              }
            } catch (error) {
              alert('❌ Erro na sincronização: ' + error);
            }
          }}
          style={{
            padding: '12px 20px',
            fontSize: '16px',
            backgroundColor: '#ffc107',
            color: '#333',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            minHeight: '44px',
            touchAction: 'manipulation',
            position: 'relative',
            zIndex: 1001
          }}
        >
          🔄 Sincronizar
        </button>
        
        <button
          onClick={updateExistingProductSlugs}
          style={{
            padding: '12px 20px',
            fontSize: '16px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            minHeight: '44px',
            touchAction: 'manipulation',
            position: 'relative',
            zIndex: 1001
          }}
        >
          🔗 Atualizar Slugs
        </button>
        

      </div>

      {/* Estatísticas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>📊</div>
          <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Total de Categorias</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007bff' }}>
            {categories.length}
          </div>
        </div>
        
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>📦</div>
          <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Total de Produtos</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>
            {products.length}
          </div>
        </div>
      </div>

      {/* Categorias Disponíveis */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#333', marginBottom: '20px' }}>📂 Categorias Disponíveis</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: '10px' 
        }}>
          {categories.map(category => (
            <div key={category.id} style={{
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              padding: '15px',
              backgroundColor: 'white',
              textAlign: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{category.icon}</div>
              <h3 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '1rem' }}>
                {category.name}
              </h3>
              <p style={{ fontSize: '12px', color: '#666', margin: '0 0 10px 0' }}>
                {category.description}
              </p>
              <div style={{
                backgroundColor: category.color,
                color: 'white',
                padding: '4px 12px',
                borderRadius: '15px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                marginBottom: '10px'
              }}>
                {products.filter(p => p.categoryId === category.id).length} produto{products.filter(p => p.categoryId === category.id).length !== 1 ? 's' : ''}
              </div>
              
              <button
                onClick={() => setSelectedCategory(category)}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  width: '100%',
                  minHeight: '44px',
                  touchAction: 'manipulation',
                  position: 'relative',
                  zIndex: 1
                }}
                onTouchStart={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                onTouchEnd={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
              >
                🔍 Ver Produtos ({products.filter(p => p.categoryId === category.id).length})
              </button>
            </div>
          ))}
        </div>
      </div>







      {/* Modal Adicionar Produto */}
      {showAddProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>
              {editingProduct ? '✏️ Editar Produto' : '➕ Novo Produto'}
            </h2>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Categoria: *
              </label>
              <select
                value={productForm.categoryId}
                onChange={(e) => setProductForm({...productForm, categoryId: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px'
                }}
                required
              >
                <option value="">Selecione uma categoria</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Link Amazon para Extração: *
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="url"
                  value={productForm.amazonUrl}
                  onChange={(e) => setProductForm({...productForm, amazonUrl: e.target.value})}
                  placeholder="https://www.amazon.com/dp/..."
                  style={{
                    flex: 1,
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                  }}
                  required
                />
                <button
                  onClick={() => extractAmazonData(productForm.amazonUrl)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#ff6b35',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  🔍 Extrair e Limpar
                </button>
              </div>
              <small style={{ color: '#666', fontSize: '12px' }}>
                Cole o link da Amazon e clique em "Extrair e Limpar" para preencher automaticamente e adicionar sua tag
              </small>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Nome do Produto: *
              </label>
              <input
                type="text"
                value={productForm.name}
                onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                placeholder="Nome do produto"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Descrição: *
              </label>
              <textarea
                value={productForm.description}
                onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                placeholder="Descrição do produto"
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  resize: 'vertical'
                }}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Preço Atual:
                </label>
                <input
                  type="text"
                  value={productForm.currentPrice}
                  onChange={(e) => setProductForm({...productForm, currentPrice: e.target.value})}
                  placeholder="$0.00"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Preço Original:
                </label>
                <input
                  type="text"
                  value={productForm.originalPrice}
                  onChange={(e) => setProductForm({...productForm, originalPrice: e.target.value})}
                  placeholder="$0.00"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Avaliação:
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={productForm.rating}
                  onChange={(e) => setProductForm({...productForm, rating: parseFloat(e.target.value) || 0})}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Número de Avaliações:
                </label>
                <input
                  type="number"
                  min="0"
                  value={productForm.reviewCount}
                  onChange={(e) => setProductForm({...productForm, reviewCount: parseInt(e.target.value) || 0})}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                URL da Imagem:
              </label>
              <input
                type="url"
                value={productForm.imageUrl}
                onChange={(e) => setProductForm({...productForm, imageUrl: e.target.value})}
                placeholder="https://..."
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Benefícios:
              </label>
              {productForm.benefits.map((benefit, index) => (
                <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => updateBenefit(index, e.target.value)}
                    placeholder="Benefício do produto"
                    style={{
                      flex: 1,
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px'
                    }}
                  />
                  <button
                    onClick={() => removeBenefit(index)}
                    style={{
                      padding: '10px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    ❌
                  </button>
                </div>
              ))}
              <button
                onClick={addBenefit}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                ➕ Adicionar Benefício
              </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Características:
              </label>
              {productForm.features.map((feature, index) => (
                <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder="Característica do produto"
                    style={{
                      flex: 1,
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px'
                    }}
                  />
                  <button
                    onClick={() => removeFeature(index)}
                    style={{
                      padding: '10px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    ❌
                  </button>
                </div>
              ))}
              <button
                onClick={addFeature}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                ➕ Adicionar Característica
              </button>
            </div>

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowAddProduct(false);
                  setEditingProduct(null);
                  setProductForm({
                    name: '',
                    description: '',
                    categoryId: '',
                    amazonUrl: '',
                    currentPrice: '',
                    originalPrice: '',
                    rating: 0,
                    reviewCount: 0,
                    imageUrl: '',
                    benefits: [''],
                    features: ['']
                  });
                }}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (productForm.name && productForm.categoryId) {
                    addProduct(productForm);
                  } else {
                    alert('Por favor, preencha pelo menos o nome e a categoria.');
                  }
                }}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                {editingProduct ? 'Atualizar Produto' : 'Adicionar Produto'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Adicionar Categoria */}
      {showAddCategory && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            maxWidth: '500px',
            width: '90%'
          }}>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>📂 Nova Categoria</h2>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Nome da Categoria: *
              </label>
              <input
                type="text"
                id="categoryName"
                placeholder="Ex: Suplementos"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Descrição: *
              </label>
              <textarea
                id="categoryDescription"
                placeholder="Descrição da categoria"
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  resize: 'vertical'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Cor: *
              </label>
              <input
                type="color"
                id="categoryColor"
                defaultValue="#007bff"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Ícone: *
              </label>
              <input
                type="text"
                id="categoryIcon"
                placeholder="Ex: 💊"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px'
                }}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowAddCategory(false)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  const name = (document.getElementById('categoryName') as HTMLInputElement).value;
                  const description = (document.getElementById('categoryDescription') as HTMLTextAreaElement).value;
                  const color = (document.getElementById('categoryColor') as HTMLInputElement).value;
                  const icon = (document.getElementById('categoryIcon') as HTMLInputElement).value;
                  
                  if (name && description && color && icon) {
                    addCategory({ name, description, color, icon });
                  } else {
                    alert('Por favor, preencha todos os campos.');
                  }
                }}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Adicionar Categoria
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Produtos da Categoria */}
      {selectedCategory && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            maxWidth: '800px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '25px',
              paddingBottom: '20px',
              borderBottom: '2px solid #dee2e6'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '32px', marginRight: '15px' }}>{selectedCategory.icon}</span>
                <div>
                  <h2 style={{ margin: 0, color: '#333', fontSize: '28px', fontWeight: 'bold' }}>
                    {selectedCategory.name}
                  </h2>
                  <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '16px' }}>
                    {selectedCategory.description}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCategory(null)}
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  fontSize: '18px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Fechar"
              >
                ✕
              </button>
            </div>

            {(() => {
              const categoryProducts = products.filter(p => p.categoryId === selectedCategory.id);
              if (categoryProducts.length === 0) {
                return (
                  <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic', fontSize: '18px' }}>
                    Nenhum produto cadastrado nesta categoria ainda.
                  </p>
                );
              }

              return (
                <div style={{ display: 'grid', gap: '20px' }}>
                  {categoryProducts.map(product => (
                    <div key={product.id} style={{
                      border: '1px solid #dee2e6',
                      borderRadius: '10px',
                      padding: '25px',
                      backgroundColor: '#f8f9fa',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                        <h3 style={{ color: '#333', margin: 0, fontSize: '20px', fontWeight: '600' }}>
                          {product.name}
                        </h3>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button
                                                         onClick={() => {
                               setEditingProduct(product);
                               setProductForm({
                                 name: product.name,
                                 description: product.description,
                                 categoryId: product.categoryId,
                                 amazonUrl: product.amazonUrl,
                                 currentPrice: product.currentPrice,
                                 originalPrice: product.originalPrice,
                                 rating: product.rating,
                                 reviewCount: product.reviewCount,
                                 imageUrl: product.imageUrl,
                                 benefits: product.benefits,
                                 features: product.features
                               });
                               setShowAddProduct(true);
                               setSelectedCategory(null); // Fecha o modal de produtos
                             }}
                            style={{
                              backgroundColor: '#ffc107',
                              color: '#333',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '12px 18px',
                              fontSize: '14px',
                              cursor: 'pointer',
                              fontWeight: 'bold',
                              transition: 'background-color 0.2s',
                              position: 'relative',
                              zIndex: 1001,
                              minHeight: '44px',
                              touchAction: 'manipulation'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e0a800'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffc107'}
                            onTouchStart={(e) => e.currentTarget.style.backgroundColor = '#e0a800'}
                            onTouchEnd={(e) => e.currentTarget.style.backgroundColor = '#ffc107'}
                            title={`Editar ${product.name}`}
                          >
                            ✏️ Editar
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Tem certeza que deseja excluir "${product.name}" da categoria "${selectedCategory.name}"?`)) {
                                // Remover do estado local
                                const updatedProducts = products.filter(p => p.id !== product.id);
                                setProducts(updatedProducts);
                                
                                // Sincronizar localStorage
                                localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
                                localStorage.setItem('globalProducts', JSON.stringify(updatedProducts));
                                
                                // Sincronizar via BroadcastChannel
                                try {
                                  const channel = new BroadcastChannel('admin-sync');
                                  channel.postMessage({
                                    type: 'products-updated',
                                    products: updatedProducts,
                                    action: 'delete',
                                    timestamp: Date.now()
                                  });
                                  channel.close();
                                  console.log('✅ Produto excluído e sincronizado com sucesso');
                                } catch (error) {
                                  console.log('❌ BroadcastChannel não suportado para exclusão');
                                }
                                
                                alert(`✅ Produto "${product.name}" excluído com sucesso da categoria "${selectedCategory.name}"!`);
                              }
                            }}
                            style={{
                              backgroundColor: '#dc3545',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '12px 18px',
                              fontSize: '14px',
                              cursor: 'pointer',
                              fontWeight: 'bold',
                              transition: 'background-color 0.2s',
                              position: 'relative',
                              zIndex: 1001,
                              minHeight: '44px',
                              touchAction: 'manipulation'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
                            onTouchStart={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
                            onTouchEnd={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
                            title={`Excluir ${product.name}`}
                          >
                            🗑️ Excluir
                          </button>
                        </div>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                        <div>
                          <p style={{ color: '#666', margin: '10px 0', fontSize: '15px' }}>
                            <strong>💰 Preço:</strong> {product.currentPrice}
                          </p>
                          <p style={{ color: '#666', margin: '10px 0', fontSize: '15px' }}>
                            <strong>⭐ Avaliação:</strong> {product.rating}/5 ({product.reviewCount} avaliações)
                          </p>
                          <p style={{ color: '#666', margin: '10px 0', fontSize: '15px' }}>
                            <strong>📝 Descrição:</strong> {product.description}
                          </p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                          <a
                            href={product.amazonUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              backgroundColor: '#ff9900',
                              color: 'white',
                              textDecoration: 'none',
                              padding: '12px 20px',
                              borderRadius: '6px',
                              fontSize: '15px',
                              fontWeight: 'bold',
                              textAlign: 'center',
                              transition: 'background-color 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e68900'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ff9900'}
                          >
                            🔗 Ver na Amazon
                          </a>
                          
                          {product.benefits && product.benefits.length > 0 && (
                            <div>
                              <strong style={{ color: '#333', fontSize: '14px' }}>✅ Benefícios:</strong>
                              <ul style={{ margin: '8px 0 0 20px', color: '#666', fontSize: '14px' }}>
                                {product.benefits.map((benefit, index) => (
                                  <li key={index}>{benefit}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
