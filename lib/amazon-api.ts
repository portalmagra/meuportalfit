import crypto from 'crypto';

interface AmazonProduct {
  name: string;
  asin: string;
  price: string;
  rating: number;
  imageUrl: string;
  detailPageURL: string;
}

// Simulação temporária da busca Amazon até resolver integração completa
export async function searchAmazonProducts(query: string, maxResults: number = 5): Promise<AmazonProduct[]> {
  try {
    console.log(`🔍 Simulating Amazon search for: "${query}"`);
    
    // Mapear termos de busca para ASINs conhecidos
    const searchMappings: Record<string, AmazonProduct[]> = {
      'vitamina d3': [{
        name: 'NOW Foods Vitamin D3 2000 IU',
        asin: 'B003BUJ1TU',
        price: '$9.99',
        rating: 4.6,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B003BUJ1TU?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }],
      'magnesio': [{
        name: 'NOW Foods Magnesium Glycinate',
        asin: 'B00C7K34C4',
        price: '$19.99',
        rating: 4.5,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B00C7K34C4?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }],
      'colageno': [{
        name: 'Sports Research Collagen Peptides',
        asin: 'B01H7FZHZM',
        price: '$29.95',
        rating: 4.4,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B01H7FZHZM?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }],
      'probioticos': [{
        name: 'Garden of Life Dr. Formulated Probiotics',
        asin: 'B01E5QVHIU',
        price: '$44.95',
        rating: 4.4,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B01E5QVHIU?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }],
      'melatonina': [{
        name: 'Natrol Melatonin 5mg',
        asin: 'B000GG5YC0',
        price: '$8.99',
        rating: 4.4,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B000GG5YC0?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }],
      'cerave': [{
        name: 'CeraVe Daily Moisturizing Lotion',
        asin: 'B00TTD9BRC',
        price: '$13.99',
        rating: 4.5,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B00TTD9BRC?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }],
      'biotina': [{
        name: "Nature's Bounty Biotin 10,000mcg",
        asin: 'B00029Y2WU',
        price: '$11.49',
        rating: 4.3,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B00029Y2WU?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }]
    };

    // Buscar matches para o termo
    const queryLower = query.toLowerCase();
    const matches: AmazonProduct[] = [];
    
    for (const [key, products] of Object.entries(searchMappings)) {
      if (queryLower.includes(key) || key.includes(queryLower)) {
        matches.push(...products);
      }
    }

    return matches.slice(0, maxResults);
    
  } catch (error) {
    console.error('Amazon search simulation error:', error);
    return [];
  }
}

export function generateAmazonUrl(asin: string): string {
  const associateTag = process.env.AMAZON_ASSOCIATE_TAG || 'portal07d-20';
  return `https://www.amazon.com/dp/${asin}?tag=${associateTag}`;
}