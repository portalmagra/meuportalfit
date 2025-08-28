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
        detailPageURL: generateAmazonUrl('B003BUJ1TU')
      }, {
        name: 'Nordic Naturals Vitamin D3',
        asin: 'B0013HIKRI',
        price: '$13.95',
        rating: 4.7,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B0013HIKRI?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }, {
        name: 'Garden of Life Vitamin Code Raw D3',
        asin: 'B003CYTKZ0',
        price: '$17.99',
        rating: 4.5,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B003CYTKZ0?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }],
      'magnesio': [{
        name: 'NOW Foods Magnesium Glycinate',
        asin: 'B00C7K34C4',
        price: '$19.99',
        rating: 4.5,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B00C7K34C4?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }, {
        name: 'Doctors Best High Absorption Magnesium',
        asin: 'B000BD0RT0',
        price: '$15.50',
        rating: 4.4,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B000BD0RT0?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }, {
        name: 'Nature Made Magnesium',
        asin: 'B000NPYY04',
        price: '$12.99',
        rating: 4.3,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B000NPYY04?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }],
      'colageno': [{
        name: 'Sports Research Collagen Peptides',
        asin: 'B01H7FZHZM',
        price: '$29.95',
        rating: 4.4,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B01H7FZHZM?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }, {
        name: 'Vital Proteins Collagen Peptides',
        asin: 'B00K05C0HU',
        price: '$43.00',
        rating: 4.3,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B00K05C0HU?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }, {
        name: 'Ancient Nutrition Multi Collagen',
        asin: 'B01N2JO8FI',
        price: '$39.95',
        rating: 4.4,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B01N2JO8FI?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }],
      'probioticos': [{
        name: 'Garden of Life Dr. Formulated Probiotics',
        asin: 'B01E5QVHIU',
        price: '$44.95',
        rating: 4.4,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B01E5QVHIU?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }, {
        name: 'Culturelle Daily Probiotic',
        asin: 'B002VLZHIQ',
        price: '$21.99',
        rating: 4.4,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B002VLZHIQ?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }, {
        name: 'Align Probiotic Supplement',
        asin: 'B001G7QGRY',
        price: '$31.49',
        rating: 4.3,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B001G7QGRY?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }],
      'melatonina': [{
        name: 'Natrol Melatonin 5mg',
        asin: 'B000GG5YC0',
        price: '$8.99',
        rating: 4.4,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B000GG5YC0?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }, {
        name: 'NOW Foods Melatonin 3mg',
        asin: 'B0013HQG1E',
        price: '$7.99',
        rating: 4.5,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B0013HQG1E?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }],
      'biotina': [{
        name: "Nature's Bounty Biotin 10,000mcg",
        asin: 'B00029Y2WU',
        price: '$11.49',
        rating: 4.3,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B00029Y2WU?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }, {
        name: 'NOW Foods Biotin 5000mcg',
        asin: 'B0013OSRWI',
        price: '$9.99',
        rating: 4.5,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B0013OSRWI?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }],
      'ashwagandha': [{
        name: 'KSM-66 Ashwagandha',
        asin: 'B078SN9GDR',
        price: '$19.95',
        rating: 4.4,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B078SN9GDR?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }, {
        name: 'Goli Ashwagandha Gummies',
        asin: 'B085TZCQXP',
        price: '$18.98',
        rating: 4.2,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B085TZCQXP?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }],
      'omega 3': [{
        name: 'Nordic Naturals Ultimate Omega',
        asin: 'B0026RBATQ',
        price: '$39.95',
        rating: 4.6,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B0026RBATQ?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }, {
        name: 'Nature Made Fish Oil',
        asin: 'B00280M2X0',
        price: '$24.99',
        rating: 4.4,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B00280M2X0?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }],
      'complexo b': [{
        name: 'NOW Foods B-Complex',
        asin: 'B0002JIJ2A',
        price: '$14.99',
        rating: 4.5,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B0002JIJ2A?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }, {
        name: 'Nature Made Super B Complex',
        asin: 'B00280N05M',
        price: '$13.99',
        rating: 4.4,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B00280N05M?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }],
      'ferro': [{
        name: 'Nature Made Iron',
        asin: 'B000NPTXUW',
        price: '$8.99',
        rating: 4.3,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B000NPTXUW?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }],
      'zinco': [{
        name: 'NOW Foods Zinc Picolinate',
        asin: 'B0013OSQD6',
        price: '$9.99',
        rating: 4.5,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B0013OSQD6?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }],
      'digestão': [{
        name: 'Digestive Advantage Daily Probiotic',
        asin: 'B0013J3IFY',
        price: '$18.99',
        rating: 4.3,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B0013J3IFY?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }],
      'vegan': [{
        name: 'Deva Vegan Vitamins Omega-3 DHA',
        asin: 'B002XVMMMI',
        price: '$21.99',
        rating: 4.4,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B002XVMMMI?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }],
      'orgânica': [{
        name: 'Garden of Life Vitamin Code Raw One',
        asin: 'B003CYEQW8',
        price: '$34.95',
        rating: 4.5,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B003CYEQW8?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }],
      'lactose': [{
        name: 'Culturelle Digestive Health Daily Formula',
        asin: 'B000A3XCGM',
        price: '$32.99',
        rating: 4.6,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B000A3XCGM?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }],
      'algas': [{
        name: 'Nordic Naturals Algae Omega',
        asin: 'B002CQU3ZM',
        price: '$38.95',
        rating: 4.5,
        imageUrl: '',
        detailPageURL: `https://www.amazon.com/dp/B002CQU3ZM?tag=${process.env.AMAZON_ASSOCIATE_TAG}`
      }]
    };

    // Buscar matches para o termo
    const queryLower = query.toLowerCase();
    const matches: AmazonProduct[] = [];
    
    for (const [key, products] of Object.entries(searchMappings)) {
      // Busca mais flexível - palavras chave parciais
      const keyWords = key.split(' ');
      const queryWords = queryLower.split(' ');
      
      const hasMatch = keyWords.some(keyWord => 
        queryWords.some(queryWord => 
          queryWord.includes(keyWord) || keyWord.includes(queryWord)
        )
      ) || queryLower.includes(key) || key.includes(queryLower);
      
      if (hasMatch) {
        // Garantir que todos os produtos tenham URLs corretas
        const productsWithCorrectUrls = products.map(product => ({
          ...product,
          detailPageURL: generateAmazonUrl(product.asin)
        }));
        matches.push(...productsWithCorrectUrls);
      }
    }

    return matches.slice(0, maxResults);
    
  } catch (error) {
    console.error('Amazon search simulation error:', error);
    return [];
  }
}

export function generateAmazonUrl(asin: string): string {
  const associateTag = 'portal07d-20'; // Forçar tag correta
  return `https://www.amazon.com/dp/${asin}?tag=${associateTag}`;
}