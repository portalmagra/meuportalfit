'use client';

import { useState, useEffect } from 'react';
import { getProductByASIN } from '../../lib/amazon-api';

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
    { id: 'cozinha', name: 'Cozinhando Saudável', description: 'Temperos, óleos e utensílios para cozinha saudável', color: '#ABEBC6', icon: '🍳' }
  ];

  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
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
    // Carregar produtos do localStorage
    const savedProducts = localStorage.getItem('adminProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
    
    // Salvar categorias no localStorage
    localStorage.setItem('adminCategories', JSON.stringify(defaultCategories));
  }, []);

  // Salvar produtos no localStorage
  useEffect(() => {
    localStorage.setItem('adminProducts', JSON.stringify(products));
    // Também salvar na chave global para outras páginas
    localStorage.setItem('globalProducts', JSON.stringify(products));
  }, [products]);

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: category.name.toLowerCase().replace(/\s+/g, '-')
    };
    setCategories([...categories, newCategory]);
    setShowAddCategory(false);
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString()
    };
    setProducts([...products, newProduct]);
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
    alert(`✅ Produto "${product.name}" adicionado com sucesso!`);
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
      
      if (product && !product.asin.startsWith('SEARCH')) {
        console.log('✅ Produto encontrado na API:', product);
        
        setProductForm({
          name: product.name,
          description: `Produto Amazon com ASIN ${asin}. ${product.name}`,
          categoryId: productForm.categoryId,
          amazonUrl: finalUrl,
          currentPrice: product.price,
          originalPrice: product.price,
          rating: product.rating,
          reviewCount: product.reviewCount || 0,
          imageUrl: product.imageUrl,
          benefits: [
            'Produto original da Amazon',
            'Qualidade verificada pelos usuários',
            'Entrega rápida disponível',
            'Garantia do fabricante',
            'Avaliações positivas'
          ],
          features: [
            'Marca reconhecida',
            'Especificações técnicas reais',
            'Preço competitivo',
            'Disponível para envio imediato',
            'Suporte ao cliente'
          ]
        });
        
        alert('✅ Dados extraídos da API real da Amazon!\n\n🔗 Link limpo e com sua tag portalsolutio-20!\n\n⚠️ IMPORTANTE: Agora o produto vai gerar comissão para você!');
        return;
      }

      // Fallback se a API não retornar dados
      console.log('⚠️ API não retornou dados, usando fallback...');
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
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const deleteCategory = (categoryId: string) => {
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
      setCategories(categories.filter(c => c.id !== categoryId));
      // Remover produtos da categoria
      setProducts(products.filter(p => p.categoryId !== categoryId));
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
        🛠️ Área Administrativa - MeuPortalFit
      </h1>

      {/* Botões principais */}
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '40px' }}>
        <button
          onClick={() => setShowAddProduct(true)}
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          ➕ Adicionar Produto
        </button>
        <button
          onClick={() => setShowAddCategory(true)}
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          📂 Adicionar Categoria
        </button>
      </div>

      {/* Estatísticas */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px', 
        marginBottom: '40px' 
      }}>
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
          border: '1px solid #dee2e6'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#495057' }}>📊 Total de Categorias</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#007bff' }}>
            {categories.length} / {defaultCategories.length}
          </p>
          <small style={{ color: '#666' }}>Debug: {JSON.stringify(categories.map(c => c.name))}</small>
        </div>
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
          border: '1px solid #dee2e6'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#495057' }}>📦 Total de Produtos</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#28a745' }}>
            {products.length}
          </p>
        </div>
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
          border: '1px solid #dee2e6'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#495057' }}>🔗 Links Amazon</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#ff6b35' }}>
            {products.filter(p => p.amazonUrl).length}
          </p>
        </div>
      </div>

      {/* Resumo de Produtos */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#333', marginBottom: '20px' }}>📦 Resumo de Produtos</h2>
        {products.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
            Nenhum produto cadastrado ainda. Adicione seu primeiro produto!
          </p>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '15px' 
          }}>
            {categories.map(category => {
              const categoryProducts = products.filter(p => p.categoryId === category.id);
              return (
                <div key={category.id} style={{
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  padding: '20px',
                  backgroundColor: 'white',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '10px' }}>{category.icon}</div>
                  <h3 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '1.1rem' }}>
                    {category.name}
                  </h3>
                  <div style={{
                    backgroundColor: category.color,
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    marginBottom: '15px'
                  }}>
                    {categoryProducts.length} produto{categoryProducts.length !== 1 ? 's' : ''}
                  </div>
                  {categoryProducts.length > 0 && (
                    <>
                      <div style={{ fontSize: '12px', color: '#666', marginBottom: '15px' }}>
                        Último: {categoryProducts[categoryProducts.length - 1].name}
                      </div>
                      <button
                        onClick={() => setSelectedCategory(category)}
                        style={{
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '10px 20px',
                          fontSize: '14px',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          transition: 'background-color 0.2s',
                          width: '100%'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
                      >
                        🔍 Ver Produtos ({categoryProducts.length})
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>



      {/* Lista de Categorias */}
      <div>
        <h2 style={{ color: '#333', marginBottom: '20px' }}>📂 Categorias Disponíveis ({categories.length})</h2>
        {categories.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
            Carregando categorias...
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
            {categories.map(category => (
              <div key={category.id} style={{
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: 'white',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                      <span style={{ fontSize: '24px', marginRight: '10px' }}>{category.icon}</span>
                      {category.name}
                    </h3>
                    <p style={{ margin: '0 0 10px 0', color: '#666' }}>{category.description}</p>
                    <span style={{
                      backgroundColor: category.color,
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      {products.filter(p => p.categoryId === category.id).length} produtos
                    </span>
                  </div>
                  <button
                    onClick={() => deleteCategory(category.id)}
                    style={{
                      padding: '8px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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
            <h2 style={{ marginBottom: '20px', color: '#333' }}>➕ Novo Produto</h2>
            
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
                onClick={() => setShowAddProduct(false)}
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
                Adicionar Produto
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
          zIndex: 1000
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
                        <button
                          onClick={() => {
                            if (confirm(`Tem certeza que deseja excluir "${product.name}" da categoria "${selectedCategory.name}"?`)) {
                              setProducts(products.filter(p => p.id !== product.id));
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
                            transition: 'background-color 0.2s'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
                          title={`Excluir ${product.name}`}
                        >
                          🗑️ Excluir
                        </button>
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
