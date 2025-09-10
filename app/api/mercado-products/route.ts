import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Como o Supabase está com credenciais placeholder, vamos retornar dados mock
    // que simulam produtos selecionados para o mercado
    const mockProducts = [
      {
        id: '1',
        name: 'Whey Protein Premium',
        description: 'Proteína de alta qualidade para ganho de massa muscular',
        categoryId: 'mercado',
        amazonUrl: 'https://amazon.com/whey-protein',
        currentPrice: 'R$ 89,90',
        originalPrice: 'R$ 129,90',
        rating: 4.8,
        reviewCount: 1250,
        imageUrl: 'https://via.placeholder.com/300x300/FF8C42/FFFFFF?text=Whey+Protein',
        benefits: ['Ganho de massa muscular', 'Recuperação pós-treino', 'Alta qualidade'],
        features: ['25g de proteína por dose', 'Sabor chocolate', 'Sem lactose'],
        is_mentoria: true,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Multivitamínico Completo',
        description: 'Suplemento com todas as vitaminas essenciais',
        categoryId: 'mercado',
        amazonUrl: 'https://amazon.com/multivitaminico',
        currentPrice: 'R$ 45,90',
        originalPrice: 'R$ 65,90',
        rating: 4.6,
        reviewCount: 890,
        imageUrl: 'https://via.placeholder.com/300x300/FF8C42/FFFFFF?text=Multivitamínico',
        benefits: ['Energia e disposição', 'Sistema imunológico', 'Bem-estar geral'],
        features: ['30 vitaminas e minerais', 'Cápsulas pequenas', 'Fácil absorção'],
        is_mentoria: true,
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Ômega 3 Premium',
        description: 'Ácidos graxos essenciais para saúde cardiovascular',
        categoryId: 'mercado',
        amazonUrl: 'https://amazon.com/omega3',
        currentPrice: 'R$ 67,90',
        originalPrice: 'R$ 89,90',
        rating: 4.7,
        reviewCount: 650,
        imageUrl: 'https://via.placeholder.com/300x300/FF8C42/FFFFFF?text=Ômega+3',
        benefits: ['Saúde cardiovascular', 'Função cerebral', 'Anti-inflamatório'],
        features: ['1000mg por cápsula', 'Óleo de peixe puro', 'Sem metais pesados'],
        is_mentoria: true,
        created_at: new Date().toISOString()
      }
    ]
    
    return NextResponse.json(mockProducts)
  } catch (error) {
    console.error('Erro na API de produtos do mercado:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
