import { NextRequest, NextResponse } from 'next/server';
import { getProductByASIN } from '../../../lib/amazon-api';

// Dados hardcoded baseados nos kits que funcionavam antes
const fallbackProducts: { [key: string]: any } = {
  'B0CLBC7WW3': {
    name: 'BANGSON 4.0 Cu.Ft Small Refrigerator with Freezer',
    description: 'Geladeira compacta com freezer inferior, ideal para apartamentos, dormitórios e escritórios. Porta dupla em aço inoxidável, prateleira de vidro temperado.',
    price: '$265.99',
    rating: 4.2,
    reviewCount: 412,
    imageUrl: 'https://m.media-amazon.com/images/I/71QKQfKqXzL._AC_SL1500_.jpg',
    benefits: [
      'Geladeira compacta ideal para espaços pequenos',
      'Freezer inferior para melhor organização',
      'Porta dupla em aço inoxidável',
      'Prateleiras de vidro temperado',
      'Economia de energia'
    ],
    features: [
      'Capacidade: 4.0 pés cúbicos',
      'Freezer inferior',
      'Porta dupla',
      'Aço inoxidável',
      'Ideal para apartamentos'
    ]
  }
};

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    console.log('🔍 API Route: Extraindo dados da Amazon...');
    console.log('🔍 API Route: URL recebida:', url);
    
    // Extrair ASIN da URL
    const asinMatch = url.match(/\/dp\/([A-Z0-9]{10})/);
    if (!asinMatch) {
      return NextResponse.json({
        success: false,
        message: 'URL da Amazon inválida. Certifique-se de que é um link de produto.'
      }, { status: 400 });
    }

    const asin = asinMatch[1];
    console.log('📦 API Route: ASIN encontrado:', asin);

    // SEMPRE limpar URL e adicionar nossa tag correta
    let cleanUrl = url.split('?')[0]; // Remove parâmetros
    cleanUrl = cleanUrl.split('/ref=')[0]; // Remove referências
    const finalUrl = `${cleanUrl}?tag=portalsolutio-20`;

    // === DEBUG DETALHADO - VERIFICAR CREDENCIAIS ===
    console.log('🔐 API Route: Verificando credenciais...');
    console.log('🔐 API Route: AMAZON_ACCESS_KEY_ID existe:', !!process.env.AMAZON_ACCESS_KEY_ID);
    console.log('🔐 API Route: AMAZON_SECRET_ACCESS_KEY existe:', !!process.env.AMAZON_SECRET_ACCESS_KEY);
    console.log('🔐 API Route: AMAZON_ACCESS_KEY_ID length:', process.env.AMAZON_ACCESS_KEY_ID?.length);
    console.log('🔐 API Route: AMAZON_SECRET_ACCESS_KEY length:', process.env.AMAZON_SECRET_ACCESS_KEY?.length);
    
    // Buscar produto usando a API real da Amazon (agora no servidor!)
    console.log('🔎 API Route: Buscando produto na API da Amazon...');
    console.log('🔎 API Route: Chamando getProductByASIN com ASIN:', asin);
    
    const product = await getProductByASIN(asin);
    
    console.log('🔍 API Route: Resposta da API:', product);
    console.log('🔍 API Route: Tipo da resposta:', typeof product);
    console.log('🔍 API Route: Produto é null?', product === null);
    console.log('🔍 API Route: Produto tem name?', product?.name);
    console.log('🔍 API Route: Produto name é "Product"?', product?.name === 'Product');
    
    // Verificar se temos dados reais da API OU dados hardcoded
    let finalProduct = null;
    
    if (product && product.name && product.name !== 'Product') {
      console.log('✅ API Route: Produto encontrado na API com dados reais:', product);
      finalProduct = product;
    } else if (fallbackProducts[asin]) {
      console.log('✅ API Route: Usando dados hardcoded para ASIN:', asin);
      finalProduct = fallbackProducts[asin];
    }
    
    if (finalProduct) {
      console.log('✅ API Route: Produto final encontrado:', finalProduct);
      
      // Extrair benefícios e características inteligentemente
      const extractedBenefits = finalProduct.benefits || [
        'Produto original da Amazon',
        'Qualidade verificada pelos usuários',
        'Entrega rápida disponível'
      ];
      
      const extractedFeatures = finalProduct.features || [
        'Marca reconhecida',
        'Especificações técnicas reais',
        'Preço competitivo'
      ];
      
      // Adicionar benefícios específicos baseados no nome do produto (se não tiver dados hardcoded)
      if (!finalProduct.benefits) {
        const productName = finalProduct.name.toLowerCase();
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
      }
      
      return NextResponse.json({
        success: true,
        message: finalProduct.benefits ? 'Dados extraídos do banco local!' : 'Dados extraídos da API real da Amazon!',
        data: {
          name: finalProduct.name,
          description: finalProduct.description || `${finalProduct.name} - Produto original da Amazon com ASIN ${asin}.`,
          amazonUrl: finalUrl,
          currentPrice: finalProduct.price || '$0.00',
          originalPrice: finalProduct.price || '$0.00',
          rating: finalProduct.rating || 0,
          reviewCount: finalProduct.reviewCount || 0,
          imageUrl: finalProduct.imageUrl || '',
          benefits: extractedBenefits,
          features: extractedFeatures
        }
      });
    }

    // Fallback final se não tiver dados
    console.log('⚠️ API Route: Nenhum dado encontrado, usando fallback genérico...');
    return NextResponse.json({
      success: true,
      message: 'Link limpo e com sua tag portalsolutio-20! Dados básicos preenchidos.',
      data: {
        name: `Produto Amazon ${asin}`,
        description: `Descrição do produto com ASIN ${asin}`,
        amazonUrl: finalUrl,
        currentPrice: '$0.00',
        originalPrice: '$0.00',
        rating: 0,
        reviewCount: 0,
        imageUrl: '',
        benefits: ['Produto da Amazon'],
        features: ['Disponível na Amazon']
      }
    });

  } catch (error) {
    console.error('❌ API Route: Erro ao extrair dados:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro ao extrair dados da Amazon. Verifique o console para mais detalhes.',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 });
  }
}
