// =============================================================================
// MEUPORTALFIT - CLIENTE AMAZON PRODUCT ADVERTISING API
// =============================================================================

import crypto from 'crypto';
import type { AmazonProduct, ProductVariant } from '@/types';

// Verificações de ambiente
const accessKey = process.env.AMAZON_ACCESS_KEY_ID;
const secretKey = process.env.AMAZON_SECRET_ACCESS_KEY;
const associateTag = process.env.AMAZON_ASSOCIATE_TAG || 'meuportalfit-20';
const marketplace = process.env.AMAZON_MARKETPLACE || 'webservices.amazon.com';
const region = process.env.AMAZON_REGION || 'us-east-1';

if (!accessKey || !secretKey) {
  throw new Error('Missing Amazon API credentials');
}

// -----------------------------------------------------------------------------
// CONFIGURAÇÕES DA API
// -----------------------------------------------------------------------------
const API_VERSION = '2020-10-01';
const SERVICE = 'ProductAdvertisingAPI';
const BASE_URL = `https://${marketplace}/paapi5`;

interface AmazonAPIConfig {
  accessKey: string;
  secretKey: string;
  associateTag: string;
  marketplace: string;
  region: string;
}

const config: AmazonAPIConfig = {
  accessKey: accessKey!,
  secretKey: secretKey!,
  associateTag,
  marketplace,
  region
};

// -----------------------------------------------------------------------------
// TIPOS DA API AMAZON
// -----------------------------------------------------------------------------
interface SearchRequest {
  Keywords?: string;
  SearchIndex?: string;
  ItemCount?: number;
  ItemPage?: number;
  SortBy?: string;
  MinPrice?: number;
  MaxPrice?: number;
  Brand?: string;
  Condition?: 'Any' | 'New' | 'Used' | 'Refurbished';
  DeliveryFlags?: string[];
  Availability?: 'Available' | 'IncludeOutOfStock';
  MerchantId?: 'Amazon' | 'All';
}

interface GetItemsRequest {
  ItemIds: string[];
  ItemIdType?: 'ASIN' | 'EAN' | 'UPC';
  Condition?: 'Any' | 'New' | 'Used' | 'Refurbished';
  MerchantId?: 'Amazon' | 'All';
}

interface BrowseNodesRequest {
  BrowseNodeIds: string[];
}

// -----------------------------------------------------------------------------
// ASSINATURA AWS V4
// -----------------------------------------------------------------------------
class AWSSignatureV4 {
  private accessKey: string;
  private secretKey: string;
  private region: string;
  private service: string;

  constructor(accessKey: string, secretKey: string, region: string, service: string) {
    this.accessKey = accessKey;
    this.secretKey = secretKey;
    this.region = region;
    this.service = service;
  }

  sign(request: {
    method: string;
    url: string;
    headers: Record<string, string>;
    body: string;
  }): Record<string, string> {
    const now = new Date();
    const dateStamp = now.toISOString().replace(/[:\-]|\.\d{3}/g, '').slice(0, 8);
    const amzDate = now.toISOString().replace(/[:\-]|\.\d{3}/g, '').slice(0, 15) + 'Z';

    // Adiciona headers necessários
    const headers = {
      ...request.headers,
      'host': marketplace,
      'x-amz-date': amzDate,
      'x-amz-target': `com.amazon.paapi5.v1.ProductAdvertisingAPIv1.${request.headers['x-amz-target']?.split('.').pop() || ''}`,
    };

    // Cria canonical request
    const canonicalUri = new URL(request.url).pathname;
    const canonicalQueryString = '';
    const canonicalHeaders = Object.keys(headers)
      .sort()
      .map(key => `${key.toLowerCase()}:${headers[key]}`)
      .join('\n') + '\n';
    const signedHeaders = Object.keys(headers)
      .sort()
      .map(key => key.toLowerCase())
      .join(';');

    const payloadHash = crypto
      .createHash('sha256')
      .update(request.body)
      .digest('hex');

    const canonicalRequest = [
      request.method,
      canonicalUri,
      canonicalQueryString,
      canonicalHeaders,
      signedHeaders,
      payloadHash
    ].join('\n');

    // Cria string to sign
    const algorithm = 'AWS4-HMAC-SHA256';
    const credentialScope = `${dateStamp}/${this.region}/${this.service}/aws4_request`;
    const stringToSign = [
      algorithm,
      amzDate,
      credentialScope,
      crypto.createHash('sha256').update(canonicalRequest).digest('hex')
    ].join('\n');

    // Calcula signature
    const kDate = crypto
      .createHmac('sha256', `AWS4${this.secretKey}`)
      .update(dateStamp)
      .digest();
    const kRegion = crypto
      .createHmac('sha256', kDate)
      .update(this.region)
      .digest();
    const kService = crypto
      .createHmac('sha256', kRegion)
      .update(this.service)
      .digest();
    const kSigning = crypto
      .createHmac('sha256', kService)
      .update('aws4_request')
      .digest();
    const signature = crypto
      .createHmac('sha256', kSigning)
      .update(stringToSign)
      .digest('hex');

    // Authorization header
    const authorizationHeader = `${algorithm} Credential=${this.accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    return {
      ...headers,
      'Authorization': authorizationHeader
    };
  }
}

// -----------------------------------------------------------------------------
// CLIENTE AMAZON API
// -----------------------------------------------------------------------------
class AmazonProductAPI {
  private signer: AWSSignatureV4;
  private baseURL: string;

  constructor(config: AmazonAPIConfig) {
    this.signer = new AWSSignatureV4(
      config.accessKey,
      config.secretKey,
      config.region,
      SERVICE
    );
    this.baseURL = BASE_URL;
  }

  private async makeRequest(operation: string, requestBody: any): Promise<any> {
    const url = `${this.baseURL}/${operation.toLowerCase()}`;
    const body = JSON.stringify({
      ...requestBody,
      PartnerTag: config.associateTag,
      PartnerType: 'Associates',
      Marketplace: `www.amazon.com`,
      Resources: this.getDefaultResources()
    });

    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Encoding': 'amz-1.0',
      'X-Amz-Target': `com.amazon.paapi5.v1.ProductAdvertisingAPIv1.${operation}`,
    };

    try {
      const signedHeaders = this.signer.sign({
        method: 'POST',
        url,
        headers,
        body
      });

      const response = await fetch(url, {
        method: 'POST',
        headers: signedHeaders,
        body
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Amazon API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Amazon API Request Error:', error);
      throw error;
    }
  }

  private getDefaultResources(): string[] {
    return [
      'Images.Primary.Large',
      'Images.Variants.Large',
      'ItemInfo.Title',
      'ItemInfo.Features',
      'ItemInfo.ProductInfo',
      'ItemInfo.TechnicalInfo',
      'ItemInfo.ManufactureInfo',
      'ItemInfo.ByLineInfo',
      'ItemInfo.Classifications',
      'Offers.Listings.Price',
      'Offers.Listings.Availability',
      'Offers.Listings.Condition',
      'Offers.Listings.DeliveryInfo',
      'Offers.Listings.MerchantInfo',
      'Offers.Summaries.HighestPrice',
      'Offers.Summaries.LowestPrice',
      'CustomerReviews.StarRating',
      'CustomerReviews.Count',
      'BrowseNodeInfo.BrowseNodes',
      'VariationSummary.Price.HighestPrice',
      'VariationSummary.Price.LowestPrice',
    ];
  }

  /**
   * Busca produtos por keywords
   */
  async searchItems(request: SearchRequest): Promise<any> {
    const searchRequest = {
      SearchIndex: request.SearchIndex || 'All',
      Keywords: request.Keywords,
      ItemCount: Math.min(request.ItemCount || 10, 50),
      ItemPage: request.ItemPage || 1,
      SortBy: request.SortBy,
      MinPrice: request.MinPrice,
      MaxPrice: request.MaxPrice,
      Brand: request.Brand,
      Condition: request.Condition || 'New',
      DeliveryFlags: request.DeliveryFlags,
      Availability: request.Availability || 'Available',
      MerchantId: request.MerchantId || 'All'
    };

    // Remove propriedades undefined
    Object.keys(searchRequest).forEach(key => {
      if (searchRequest[key as keyof typeof searchRequest] === undefined) {
        delete searchRequest[key as keyof typeof searchRequest];
      }
    });

    return this.makeRequest('SearchItems', searchRequest);
  }

  /**
   * Obtém detalhes de produtos específicos por ASIN
   */
  async getItems(request: GetItemsRequest): Promise<any> {
    const getItemsRequest = {
      ItemIds: request.ItemIds,
      ItemIdType: request.ItemIdType || 'ASIN',
      Condition: request.Condition || 'New',
      MerchantId: request.MerchantId || 'All'
    };

    return this.makeRequest('GetItems', getItemsRequest);
  }

  /**
   * Obtém variações de um produto
   */
  async getVariations(asin: string): Promise<any> {
    const variationRequest = {
      ASIN: asin,
      VariationCount: 20,
      VariationPage: 1
    };

    return this.makeRequest('GetVariations', variationRequest);
  }

  /**
   * Obtém informações de browse nodes (categorias)
   */
  async getBrowseNodes(request: BrowseNodesRequest): Promise<any> {
    return this.makeRequest('GetBrowseNodes', request);
  }
}

// -----------------------------------------------------------------------------
// INSTÂNCIA DA API
// -----------------------------------------------------------------------------
export const amazonAPI = new AmazonProductAPI(config);

// -----------------------------------------------------------------------------
// FUNÇÕES DE ALTO NÍVEL
// -----------------------------------------------------------------------------

/**
 * Busca produtos para wellness/suplementos
 */
export async function searchWellnessProducts(
  keywords: string,
  options: {
    maxPrice?: number;
    minPrice?: number;
    sortBy?: 'Price:LowToHigh' | 'Price:HighToLow' | 'Relevance' | 'Featured' | 'CustomerReviews';
    itemCount?: number;
    page?: number;
  } = {}
): Promise<AmazonProduct[]> {
  try {
    const searchRequest: SearchRequest = {
      Keywords: keywords,
      SearchIndex: 'HealthPersonalCare',
      ItemCount: options.itemCount || 20,
      ItemPage: options.page || 1,
      SortBy: options.sortBy || 'Relevance',
      MinPrice: options.minPrice,
      MaxPrice: options.maxPrice,
      Condition: 'New',
      MerchantId: 'All',
      Availability: 'Available'
    };

    const response = await amazonAPI.searchItems(searchRequest);

    if (!response.SearchResult?.Items) {
      return [];
    }

    return response.SearchResult.Items.map((item: any) => 
      transformAmazonItem(item)
    ).filter(Boolean);

  } catch (error) {
    console.error('Error searching wellness products:', error);
    return [];
  }
}

/**
 * Obtém detalhes de produtos específicos
 */
export async function getProductDetails(asins: string[]): Promise<AmazonProduct[]> {
  try {
    if (asins.length === 0) return [];

    const response = await amazonAPI.getItems({
      ItemIds: asins,
      ItemIdType: 'ASIN'
    });

    if (!response.ItemsResult?.Items) {
      return [];
    }

    return response.ItemsResult.Items.map((item: any) => 
      transformAmazonItem(item)
    ).filter(Boolean);

  } catch (error) {
    console.error('Error getting product details:', error);
    return [];
  }
}

/**
 * Busca produtos recomendados para um perfil específico
 */
export async function getRecommendedProducts(
  searchTerms: string[],
  priceRange: { min: number; max: number },
  preferences: {
    brands?: string[];
    avoidKeywords?: string[];
    categories?: string[];
  } = {}
): Promise<AmazonProduct[]> {
  const allProducts: AmazonProduct[] = [];

  try {
    // Busca para cada termo de pesquisa
    for (const term of searchTerms.slice(0, 3)) { // Limita a 3 termos para não exceder rate limits
      const products = await searchWellnessProducts(term, {
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
        itemCount: 10,
        sortBy: 'CustomerReviews'
      });

      allProducts.push(...products);
    }

    // Remove duplicatas por ASIN
    const uniqueProducts = allProducts.filter((product, index, self) =>
      index === self.findIndex(p => p.asin === product.asin)
    );

    // Filtra por preferências
    let filteredProducts = uniqueProducts;

    // Remove produtos com keywords indesejadas
    if (preferences.avoidKeywords && preferences.avoidKeywords.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        const productText = `${product.title} ${product.description || ''} ${product.features?.join(' ') || ''}`.toLowerCase();
        return !preferences.avoidKeywords!.some(keyword => 
          productText.includes(keyword.toLowerCase())
        );
      });
    }

    // Prioriza marcas preferidas
    if (preferences.brands && preferences.brands.length > 0) {
      filteredProducts.sort((a, b) => {
        const aBrandMatch = preferences.brands!.some(brand => 
          a.brand?.toLowerCase().includes(brand.toLowerCase())
        );
        const bBrandMatch = preferences.brands!.some(brand => 
          b.brand?.toLowerCase().includes(brand.toLowerCase())
        );
        
        if (aBrandMatch && !bBrandMatch) return -1;
        if (!aBrandMatch && bBrandMatch) return 1;
        return 0;
      });
    }

    // Ordena por rating e número de reviews
    filteredProducts.sort((a, b) => {
      const scoreA = (a.rating || 0) * Math.log(Math.max(a.review_count || 1, 1));
      const scoreB = (b.rating || 0) * Math.log(Math.max(b.review_count || 1, 1));
      return scoreB - scoreA;
    });

    return filteredProducts.slice(0, 20); // Retorna top 20

  } catch (error) {
    console.error('Error getting recommended products:', error);
    return [];
  }
}

/**
 * Gera link de afiliado Amazon
 */
export function generateAffiliateLink(asin: string, tag: string = associateTag): string {
  const baseUrl = 'https://www.amazon.com/dp/';
  return `${baseUrl}${asin}?tag=${tag}&linkCode=ogi&th=1&psc=1`;
}

/**
 * Extrai ASIN de uma URL Amazon
 */
export function extractASINFromUrl(url: string): string | null {
  const asinPatterns = [
    /\/dp\/([A-Z0-9]{10})/,
    /\/product\/([A-Z0-9]{10})/,
    /\/asin\/([A-Z0-9]{10})/,
    /[?&]asin=([A-Z0-9]{10})/
  ];

  for (const pattern of asinPatterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

// -----------------------------------------------------------------------------
// TRANSFORMAÇÕES DE DADOS
// -----------------------------------------------------------------------------

/**
 * Transforma item da API Amazon em formato interno
 */
function transformAmazonItem(item: any): AmazonProduct | null {
  try {
    const asin = item.ASIN;
    if (!asin) return null;

    const itemInfo = item.ItemInfo || {};
    const offers = item.Offers || {};
    const images = item.Images || {};
    const customerReviews = item.CustomerReviews || {};

    // Preço
    let price = 0;
    if (offers.Listings && offers.Listings.length > 0) {
      const listing = offers.Listings[0];
      if (listing.Price?.Amount) {
        price = listing.Price.Amount;
      }
    }

    // Imagens
    const primaryImage = images.Primary?.Large?.URL || '';
    const variantImages: string[] = [];
    if (images.Variants) {
      images.Variants.forEach((variant: any) => {
        if (variant.Large?.URL) {
          variantImages.push(variant.Large.URL);
        }
      });
    }

    // Features
    const features: string[] = [];
    if (itemInfo.Features?.DisplayValues) {
      features.push(...itemInfo.Features.DisplayValues);
    }

    // Categorias
    const categories: string[] = [];
    if (item.BrowseNodeInfo?.BrowseNodes) {
      item.BrowseNodeInfo.BrowseNodes.forEach((node: any) => {
        if (node.DisplayName) {
          categories.push(node.DisplayName);
        }
      });
    }

    // Especificações
    const specifications: Record<string, string> = {};
    if (itemInfo.TechnicalInfo?.DisplayValues) {
      itemInfo.TechnicalInfo.DisplayValues.forEach((spec: any, index: number) => {
        const label = itemInfo.TechnicalInfo.Labels?.[index]?.DisplayValue || `spec_${index}`;
        specifications[label] = spec.DisplayValue;
      });
    }

    return {
      id: asin, // Usando ASIN como ID temporário
      asin,
      title: itemInfo.Title?.DisplayValue || '',
      description: itemInfo.Features?.DisplayValues?.join('. ') || '',
      brand: itemInfo.ByLineInfo?.Brand?.DisplayValue || '',
      manufacturer: itemInfo.ByLineInfo?.Manufacturer?.DisplayValue || '',
      price,
      currency: 'USD' as const,
      list_price: offers.Summaries?.[0]?.HighestPrice?.Amount,
      prime_eligible: offers.Listings?.[0]?.DeliveryInfo?.IsPrimeEligible || false,
      in_stock: offers.Listings?.[0]?.Availability?.Type === 'Now' || false,
      primary_image_url: primaryImage,
      image_urls: [primaryImage, ...variantImages].filter(Boolean),
      main_category: categories[0] || '',
      sub_categories: categories.slice(1),
      department: itemInfo.Classifications?.ProductGroup?.DisplayValue || '',
      product_group: itemInfo.Classifications?.ProductGroup?.DisplayValue || '',
      rating: customerReviews.StarRating?.Value || 0,
      review_count: customerReviews.Count || 0,
      features,
      specifications,
      amazon_url: `https://www.amazon.com/dp/${asin}`,
      affiliate_url: generateAffiliateLink(asin),
      keywords: extractKeywordsFromProduct(itemInfo.Title?.DisplayValue || '', features),
      last_updated: new Date().toISOString(),
      last_price_check: new Date().toISOString(),
      sync_status: 'synced' as const,
      click_count: 0,
      conversion_count: 0,
      recommendation_count: 0,
      popularity_score: calculatePopularityScore(customerReviews),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      availability_message: offers.Listings?.[0]?.Availability?.Message || '',
      discount_percentage: calculateDiscountPercentage(price, offers.Summaries?.[0]?.HighestPrice?.Amount)
    };

  } catch (error) {
    console.error('Error transforming Amazon item:', error);
    return null;
  }
}

/**
 * Extrai keywords relevantes do produto
 */
function extractKeywordsFromProduct(title: string, features: string[]): string[] {
  const text = `${title} ${features.join(' ')}`.toLowerCase();
  const keywords = new Set<string>();

  // Keywords comuns de wellness/suplementos
  const wellnessKeywords = [
    'vitamin', 'mineral', 'supplement', 'organic', 'natural', 'protein', 'omega',
    'probiotics', 'antioxidant', 'collagen', 'biotin', 'magnesium', 'calcium',
    'iron', 'zinc', 'b12', 'vitamin d', 'vitamin c', 'multivitamin', 'gummies',
    'capsules', 'tablets', 'powder', 'liquid', 'gmo-free', 'gluten-free',
    'third-party tested', 'usda organic', 'non-gmo'
  ];

  wellnessKeywords.forEach(keyword => {
    if (text.includes(keyword)) {
      keywords.add(keyword);
    }
  });

  // Extrai palavras do título
  title.split(/\s+/).forEach(word => {
    const cleanWord = word.replace(/[^\w]/g, '').toLowerCase();
    if (cleanWord.length > 3 && !['the', 'and', 'for', 'with', 'from'].includes(cleanWord)) {
      keywords.add(cleanWord);
    }
  });

  return Array.from(keywords).slice(0, 20);
}

/**
 * Calcula score de popularidade baseado em reviews
 */
function calculatePopularityScore(reviews: any): number {
  const rating = reviews.StarRating?.Value || 0;
  const count = reviews.Count || 0;
  
  // Score baseado em rating e número de reviews
  const ratingScore = rating * 20; // 0-100
  const countScore = Math.min(Math.log(count + 1) * 10, 50); // Max 50 points
  
  return Math.round(ratingScore + countScore);
}

/**
 * Calcula percentual de desconto
 */
function calculateDiscountPercentage(currentPrice: number, listPrice: number): number {
  if (!currentPrice || !listPrice || listPrice <= currentPrice) return 0;
  return Math.round(((listPrice - currentPrice) / listPrice) * 100);
}

// -----------------------------------------------------------------------------
// CACHE E RATE LIMITING
// -----------------------------------------------------------------------------
const requestCache = new Map<string, { data: any; timestamp: number }>();
const rateLimitTracker = new Map<string, number[]>();

/**
 * Implementa rate limiting simples
 */
function checkRateLimit(operation: string, maxRequests: number = 10, windowMinutes: number = 1): boolean {
  const now = Date.now();
  const windowMs = windowMinutes * 60 * 1000;
  
  if (!rateLimitTracker.has(operation)) {
    rateLimitTracker.set(operation, []);
  }
  
  const requests = rateLimitTracker.get(operation)!;
  
  // Remove requests antigas
  const validRequests = requests.filter(timestamp => now - timestamp < windowMs);
  
  if (validRequests.length >= maxRequests) {
    return false;
  }
  
  // Adiciona nova request
  validRequests.push(now);
  rateLimitTracker.set(operation, validRequests);
  
  return true;
}

/**
 * Cache com TTL para respostas da API
 */
export function getCachedAPIResponse(key: string, ttlMinutes: number = 15): any | null {
  const cached = requestCache.get(key);
  
  if (!cached) return null;
  
  const age = (Date.now() - cached.timestamp) / (1000 * 60);
  
  if (age > ttlMinutes) {
    requestCache.delete(key);
    return null;
  }
  
  return cached.data;
}

export function setCachedAPIResponse(key: string, data: any): void {
  requestCache.set(key, {
    data,
    timestamp: Date.now()
  });
  
  // Limita tamanho do cache
  if (requestCache.size > 200) {
    const firstKey = requestCache.keys().next().value;
    requestCache.delete(firstKey);
  }
}

// -----------------------------------------------------------------------------
// HEALTH CHECK
// -----------------------------------------------------------------------------
export async function testAmazonAPIConnection(): Promise<boolean> {
  try {
    const response = await amazonAPI.searchItems({
      Keywords: 'vitamin',
      SearchIndex: 'HealthPersonalCare',
      ItemCount: 1
    });
    
    return !!response.SearchResult;
  } catch (error) {
    console.error('Amazon API connection test failed:', error);
    return false;
  }
}

// -----------------------------------------------------------------------------
// EXPORTS
// -----------------------------------------------------------------------------
export default amazonAPI;