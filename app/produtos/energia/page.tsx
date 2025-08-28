'use client'

import Link from 'next/link'
import { useState } from 'react'

interface Product {
  id: string
  name: string
  description: string
  price: string
  originalPrice: string
  rating: number
  reviewCount: number
  image: string
  asin: string
  benefits: string[]
  features: string[]
  amazonUrl: string
  prime: boolean
  savings: number
}

interface ProductKit {
  id: string
  name: string
  description: string
  products: Product[]
  totalPrice: string
  originalTotalPrice: string
  savings: number
  benefits: string[]
  image: string
}

const products: Product[] = [
  {
    id: '1',
    name: 'Creatina Monohidratada Premium',
    description: 'Creatina pura para ganho de força e massa muscular',
    price: '$24.99',
    originalPrice: '$39.99',
    rating: 4.8,
    reviewCount: 1247,
    image: '/images/products/creatina.jpg',
    asin: 'B08N5WRWNW',
    benefits: ['Aumenta força muscular', 'Melhora performance', 'Recuperação rápida'],
    features: ['5g por dose', 'Sem aditivos', 'Testado em laboratório'],
    amazonUrl: 'https://amazon.com/dp/B08N5WRWNW',
    prime: true,
    savings: 37
  },
  {
    id: '2',
    name: 'BCAA Aminoácidos Essenciais',
    description: 'Blend de aminoácidos para recuperação muscular e energia',
    price: '$32.99',
    originalPrice: '$49.99',
    rating: 4.6,
    reviewCount: 892,
    image: '/images/products/bcaa.jpg',
    asin: 'B08N5WRWNX',
    benefits: ['Recuperação muscular', 'Reduz fadiga', 'Preserva massa magra'],
    features: ['2:1:1 ratio', 'Sabor natural', 'Sem açúcar'],
    amazonUrl: 'https://amazon.com/dp/B08N5WRWNX',
    prime: true,
    savings: 34
  },
  {
    id: '3',
    name: 'Pré-treino Energético Natural',
    description: 'Fórmula natural para energia e foco durante treinos',
    price: '$28.99',
    originalPrice: '$44.99',
    rating: 4.7,
    reviewCount: 1563,
    image: '/images/products/pre-treino.jpg',
    asin: 'B08N5WRWNY',
    benefits: ['Energia sustentada', 'Foco mental', 'Sem crash'],
    features: ['Cafeína natural', 'B-vitaminas', 'Aminoácidos'],
    amazonUrl: 'https://amazon.com/dp/B08N5WRWNY',
    prime: true,
    savings: 36
  },
  {
    id: '4',
    name: 'Proteína Whey Isolada',
    description: 'Proteína de alta qualidade para construção muscular',
    price: '$45.99',
    originalPrice: '$69.99',
    rating: 4.9,
    reviewCount: 2341,
    image: '/images/products/whey.jpg',
    asin: 'B08N5WRWNZ',
    benefits: ['Construção muscular', 'Recuperação rápida', 'Baixo teor de gordura'],
    features: ['25g por dose', 'Baixo lactose', 'Múltiplos sabores'],
    amazonUrl: 'https://amazon.com/dp/B08N5WRWNZ',
    prime: true,
    savings: 34
  }
]

const kits: ProductKit[] = [
  {
    id: 'kit1',
    name: 'Kit Performance Completo',
    description: 'Combinação perfeita para maximizar seus resultados no treino',
    products: [products[0], products[1], products[2]],
    totalPrice: '$79.99',
    originalTotalPrice: '$129.99',
    savings: 38,
    benefits: ['Ganho de força', 'Recuperação otimizada', 'Energia sustentada'],
    image: '/images/kits/performance-kit.jpg'
  },
  {
    id: 'kit2',
    name: 'Kit Iniciante',
    description: 'Essenciais para começar sua jornada fitness',
    products: [products[0], products[3]],
    totalPrice: '$64.99',
    originalTotalPrice: '$99.99',
    savings: 35,
    benefits: ['Fundação muscular', 'Recuperação básica', 'Custo-benefício'],
    image: '/images/kits/beginner-kit.jpg'
  }
]

export default function EnergiaPage() {
  const [selectedTab, setSelectedTab] = useState<'produtos' | 'kits'>('produtos')

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link href="/produtos" className="text-white hover:text-yellow-100 transition-colors">
              ← Voltar às Categorias
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              💪 Energia & Performance
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Suplementos premium para aumentar sua energia, resistência e performance física
            </p>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setSelectedTab('produtos')}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  selectedTab === 'produtos'
                    ? 'bg-white text-orange-600'
                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                }`}
              >
                🛍️ Produtos Individuais
              </button>
              <button
                onClick={() => setSelectedTab('kits')}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  selectedTab === 'kits'
                    ? 'bg-white text-orange-600'
                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                }`}
              >
                📦 Kits Recomendados
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Content */}
          {selectedTab === 'produtos' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Produtos Individuais
                </h2>
                <p className="text-lg text-gray-600">
                  Escolha os produtos que melhor se adequam às suas necessidades
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                    {/* Product Image */}
                    <div className="h-48 bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                      <div className="text-6xl">{product.name.includes('Creatina') ? '💪' : product.name.includes('BCAA') ? '🏃' : product.name.includes('Pré-treino') ? '⚡' : '🥛'}</div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          -{product.savings}%
                        </span>
                        {product.prime && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Prime
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{product.description}</p>

                      {/* Benefits */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Benefícios:</h4>
                        <div className="space-y-1">
                          {product.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center text-xs text-gray-600">
                              <span className="text-green-500 mr-2">✓</span>
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Características:</h4>
                        <div className="flex flex-wrap gap-1">
                          {product.features.map((feature, index) => (
                            <span
                              key={index}
                              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center mb-4">
                        <div className="flex items-center">
                          <span className="text-yellow-400 mr-1">{'★'.repeat(Math.floor(product.rating))}</span>
                          <span className="text-sm text-gray-600">{product.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500 ml-2">({product.reviewCount} reviews)</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                          <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <a
                        href={product.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-center py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200"
                      >
                        🛒 Comprar na Amazon
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'kits' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Kits Recomendados
                </h2>
                <p className="text-lg text-gray-600">
                  Combinações perfeitas para maximizar seus resultados
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {kits.map((kit) => (
                  <div key={kit.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                    {/* Kit Header */}
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold mb-2">{kit.name}</h3>
                        <p className="text-lg opacity-90">{kit.description}</p>
                      </div>
                    </div>

                    {/* Kit Content */}
                    <div className="p-6">
                      {/* Products in Kit */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Produtos Incluídos:</h4>
                        <div className="space-y-3">
                          {kit.products.map((product) => (
                            <div key={product.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                              <div className="w-10 h-10 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-lg">{product.name.includes('Creatina') ? '💪' : product.name.includes('BCAA') ? '🏃' : product.name.includes('Pré-treino') ? '⚡' : '🥛'}</span>
                              </div>
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900">{product.name}</h5>
                                <p className="text-sm text-gray-600">{product.description}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium text-gray-900">{product.price}</div>
                                <div className="text-xs text-gray-500 line-through">{product.originalPrice}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Benefícios do Kit:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {kit.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-600">
                              <span className="text-green-500 mr-2">✓</span>
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg mb-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-2xl font-bold text-gray-900">{kit.totalPrice}</span>
                            <span className="text-lg text-gray-500 line-through ml-2">{kit.originalTotalPrice}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">-{kit.savings}%</div>
                            <div className="text-sm text-gray-600">Economia total</div>
                          </div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <a
                        href={`https://amazon.com/s?k=${kit.products.map(p => p.name).join('+')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-center py-4 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 text-lg"
                      >
                        🛒 Ver Kit na Amazon
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">
            Precisa de ajuda para escolher?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Nossa análise de IA personalizada pode identificar exatamente quais produtos de energia você precisa
          </p>
          <div className="space-x-4">
            <Link href="/analise">
              <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                🧠 Fazer Análise IA
              </button>
            </Link>
            <Link href="/suporte">
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors">
                💬 Falar com Especialista
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
