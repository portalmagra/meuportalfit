// lib/amazon-smart-search.ts

import crypto from 'crypto';

interface AmazonProduct {
  name: string;
  asin: string;
  price: string;
  rating: number;
  imageUrl: string;
  detailPageURL: string;
}

interface SearchStrategy {
  primaryTerms: string[];      // Termos principais específicos
  alternativeTerms: string[];  // Termos alternativos se não achar
  category: string;            // Categoria para filtrar
}

/**
 * Gera estratégias de busca inteligentes baseadas no perfil do usuário
 */
function generateSearchStrategy(analysis: string): SearchStrategy[] {
  const strategies: SearchStrategy[] = [];
  const analysisLower = analysis.toLowerCase();
  
  // ANSIEDADE/ESTRESSE
  if (analysisLower.includes('ansiedade') || analysisLower.includes('estresse')) {
    strategies.push({
      primaryTerms: [
        'L-Theanine 200mg capsules',
        'Ashwagandha KSM-66 extract',
        'Magnesium Glycinate anxiety',
        'GABA supplement calm'
      ],
      alternativeTerms: [
        'stress relief supplement',
        'calm anxiety natural',
        'adaptogen stress'
      ],
      category: 'HealthPersonalCare'
    });
  }
  
  // ENERGIA/FADIGA
  if (analysisLower.includes('energia') || analysisLower.includes('fadiga')) {
    strategies.push({
      primaryTerms: [
        'Vitamin B12 methylcobalamin',
        'CoQ10 energy supplement',
        'Iron supplement women',
        'Vitamin D3 5000 IU'
      ],
      alternativeTerms: [
        'energy boost women',
        'fatigue supplement',
        'morning energy vitamin'
      ],
      category: 'HealthPersonalCare'
    });
  }
  
  // SONO
  if (analysisLower.includes('sono') || analysisLower.includes('dormir')) {
    strategies.push({
      primaryTerms: [
        'Melatonin 5mg time release',
        'Magnesium Glycinate sleep',
        'Valerian root extract',
        'L-Tryptophan 500mg'
      ],
      alternativeTerms: [
        'sleep aid natural',
        'night time supplement',
        'sleep quality improve'
      ],
      category: 'HealthPersonalCare'
    });
  }
  
  // IMUNIDADE
  if (analysisLower.includes('imunidade') || analysisLower.includes('imune')) {
    strategies.push({
      primaryTerms: [
        'Vitamin C 1000mg buffered',
        'Zinc picolinate 50mg',
        'Elderberry immune support',
        'Vitamin D3 K2 combination'
      ],
      alternativeTerms: [
        'immune system boost',
        'immunity supplement daily',
        'cold flu prevention'
      ],
      category: 'HealthPersonalCare'
    });
  }
  
  // BELEZA (Pele, Cabelo, Unhas)
  if (analysisLower.includes('beleza') || analysisLower.includes('pele') || 
      analysisLower.includes('cabelo') || analysisLower.includes('unha')) {
    strategies.push({
      primaryTerms: [
        'Collagen peptides powder unflavored',
        'Biotin 10000mcg hair growth',
        'Hyaluronic acid supplement',
        'Vitamin E mixed tocopherols'
      ],
      alternativeTerms: [
        'beauty supplement women',
        'hair skin nails vitamin',
        'anti aging supplement'
      ],
      category: 'Beauty'
    });
  }
  
  // DIGESTÃO
  if (analysisLower.includes('digestão') || analysisLower.includes('intestinal')) {
    strategies.push({
      primaryTerms: [
        'Probiotics women 50 billion CFU',
        'Digestive enzymes complete',
        'Psyllium husk fiber supplement',
        'L-Glutamine gut health'
      ],
      alternativeTerms: [
        'digestive health supplement',
        'gut health probiotic',
        'bloating relief natural'
      ],
      category: 'HealthPersonalCare'
    });
  }
  
  // PESO/METABOLISMO
  if (analysisLower.includes('peso') || analysisLower.includes('metabolismo')) {
    strategies.push({
      primaryTerms: [
        'Green tea extract EGCG',
        'Apple cider vinegar capsules',
        'Chromium picolinate metabolism',
        'CLA conjugated linoleic acid'
      ],
      alternativeTerms: [
        'metabolism boost supplement',
        'weight management natural',
        'fat burner women'
      ],
      category: 'HealthPersonalCare'
    });
  }
  
  // Se nenhuma estratégia específica, usar termos gerais
  if (strategies.length === 0) {
    strategies.push({
      primaryTerms: [
        'Multivitamin women daily',
        'Omega 3 fish oil',
        'Vitamin D3 supplement',
        'Magnesium supplement'
      ],
      alternativeTerms: [
        'womens health supplement',
        'daily vitamin essential',
        'wellness supplement'
      ],
      category: 'HealthPersonalCare'
    });
  }
  
  return strategies;
}

/**
 * Executa busca inteligente e adaptativa na Amazon
 */
export async function searchAmazonProductsSmart(
  analysis: string,
  maxResults: number = 6
): Promise<AmazonProduct[]> {
  const strategies = generateSearchStrategy(analysis);
  let allProducts: AmazonProduct[] = [];
  let searchAttempts = 0;
  const maxAttempts = 15;
  
  console.log('🎯 Estratégias de busca geradas:', strategies.length);
  
  // Tentar buscar com termos primários primeiro
  for (const strategy of strategies) {
    if (allProducts.length >= maxResults || searchAttempts >= maxAttempts) break;
    
    // Buscar com termos primários
    for (const term of strategy.primaryTerms) {
      if (allProducts.length >= maxResults || searchAttempts >= maxAttempts) break;
      
      searchAttempts++;
      console.log(`🔍 Buscando: "${term}" (tentativa ${searchAttempts})`);
      
      try {
        const products = await callAmazonAPI(term, strategy.category, 3);
        
        if (products && products.length > 0) {
          // Filtrar duplicatas por ASIN
          const newProducts = products.filter(p => 
            !allProducts.some(existing => existing.asin === p.asin)
          );
          
          allProducts.push(...newProducts);
          console.log(`✅ Encontrados ${newProducts.length} produtos únicos`);
        }
      } catch (error) {
        console.warn(`⚠️ Erro na busca: ${error.message}`);
      }
    }
    
    // Se ainda não tem produtos suficientes, tentar termos alternativos
    if (allProducts.length < maxResults) {
      for (const term of strategy.alternativeTerms) {
        if (allProducts.length >= maxResults || searchAttempts >= maxAttempts) break;
        
        searchAttempts++;
        console.log(`🔄 Busca alternativa: "${term}"`);
        
        try {
          const products = await callAmazonAPI(term, strategy.category, 2);
          
          if (products && products.length > 0) {
            const newProducts = products.filter(p => 
              !allProducts.some(existing => existing.asin === p.asin)
            );
            
            allProducts.push(...newProducts);
            console.log(`✅ Encontrados ${newProducts.length} produtos alternativos`);
          }
        } catch (error) {
          console.warn(`⚠️ Erro na busca alternativa: ${error.message}`);
        }
      }
    }
  }
  
  // Ordenar por relevância/rating
  allProducts.sort((a, b) => b.rating - a.rating);
  
  // Retornar apenas a quantidade solicitada
  const finalProducts = allProducts.slice(0, maxResults);
  
  console.log(`📦 Total de produtos encontrados: ${finalProducts.length}/${maxResults}`);
  
  // Se não encontrou produtos suficientes, buscar termos super genéricos
  if (finalProducts.length < maxResults) {
    console.log('⚠️ Poucos produtos encontrados, buscando termos genéricos...');
    
    const genericTerms = [
      'bestseller supplement women',
      'vitamin women health',
      'natural supplement daily',
      'wellness vitamin pack'
    ];
    
    for (const term of genericTerms) {
      if (finalProducts.length >= maxResults) break;
      
      try {
        const products = await callAmazonAPI(term, 'HealthPersonalCare', 2);
        if (products) {
          const newProducts = products.filter(p => 
            !finalProducts.some(existing => existing.asin === p.asin)
          );
          finalProducts.push(...newProducts.slice(0, maxResults - finalProducts.length));
        }
      } catch (error) {
        console.warn(`⚠️ Erro na busca genérica: ${error.message}`);
      }
    }
  }
  
  return finalProducts;
}

/**
 * Chama a API da Amazon com os parâmetros corretos
 */
async function callAmazonAPI(
  searchTerm: string,
  category: string,
  itemCount: number
): Promise<AmazonProduct[] | null> {
  const AWS_ACCESS_KEY = process.env.AMAZON_ACCESS_KEY_ID;
  const AWS_SECRET_KEY = process.env.AMAZON_SECRET_ACCESS_KEY;
  const ASSOCIATE_TAG = process.env.AMAZON_ASSOCIATE_TAG || 'portal07d-20';
  
  if (!AWS_ACCESS_KEY || !AWS_SECRET_KEY) {
    console.log('⚠️ Credenciais da Amazon não configuradas');
    return null;
  }
  
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  const dateStamp = amzDate.slice(0, 8);
  
  const payload = {
    Keywords: searchTerm,
    Resources: [
      'Images.Primary.Large',
      'ItemInfo.Title',
      'ItemInfo.Features',
      'Offers.Listings.Price',
      'CustomerReviews.StarRating',
      'DetailPageURL'
    ],
    PartnerTag: ASSOCIATE_TAG,
    PartnerType: 'Associates',
    Marketplace: 'www.amazon.com',
    ItemCount: itemCount,
    SearchIndex: category,
    MinReviewsRating: 3.5, // Apenas produtos bem avaliados
    Availability: 'Available' // Apenas produtos disponíveis
  };
  
  // [Código de assinatura AWS continua o mesmo...]
  // ... implementação da assinatura e chamada HTTP ...
  
  try {
    // Fazer a chamada para a API
    const response = await fetch('https://webservices.amazon.com/paapi5/searchitems', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-amz-date': amzDate,
        // ... outros headers com assinatura
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      console.error('Amazon API error:', response.status);
      return null;
    }
    
    const data = await response.json();
    
    if (data.SearchResult?.Items?.length) {
      return data.SearchResult.Items.map((item: any) => ({
        name: item.ItemInfo?.Title?.DisplayValue || 'Produto',
        asin: item.ASIN,
        price: item.Offers?.Listings?.[0]?.Price?.DisplayAmount || '$0.00',
        rating: item.CustomerReviews?.StarRating?.Value || 4.0,
        imageUrl: item.Images?.Primary?.Large?.URL || '',
        detailPageURL: item.DetailPageURL || `https://www.amazon.com/dp/${item.ASIN}?tag=${ASSOCIATE_TAG}`
      }));
    }
    
    return null;
  } catch (error) {
    console.error('Erro na chamada da API:', error);
    return null;
  }
}