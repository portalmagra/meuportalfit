import { NextRequest, NextResponse } from 'next/server';
import { getProductByASIN } from '../../../lib/amazon-api';

export async function GET(request: NextRequest) {
  try {
    // Testar apenas validação de credenciais primeiro
    console.log('🧪 Testando validação de credenciais da Amazon...');
    
    const credentials = {
      hasAccessKey: !!process.env.AMAZON_ACCESS_KEY_ID,
      hasSecretKey: !!process.env.AMAZON_SECRET_ACCESS_KEY,
      associateTag: process.env.AMAZON_ASSOCIATE_TAG || 'portalsolutio-20',
      accessKeyLength: process.env.AMAZON_ACCESS_KEY_ID?.length || 0,
      secretKeyLength: process.env.AMAZON_SECRET_ACCESS_KEY?.length || 0
    };
    
    console.log('🔐 Credenciais:', credentials);
    
    // Testar apenas validação de credenciais por enquanto
    console.log('🧪 Testando apenas validação de credenciais...');
    
    // Verificar se CREDENTIALS_VALID está funcionando
    const credentialsValid = !!(
      process.env.AMAZON_ACCESS_KEY_ID && 
      process.env.AMAZON_ACCESS_KEY_ID !== 'undefined' && 
      process.env.AMAZON_ACCESS_KEY_ID.length >= 20 &&
      process.env.AMAZON_SECRET_ACCESS_KEY && 
      process.env.AMAZON_SECRET_ACCESS_KEY !== 'undefined' &&
      process.env.AMAZON_SECRET_ACCESS_KEY.length >= 40
    );
    
    console.log('🔐 CREDENTIALS_VALID:', credentialsValid);
    
    if (!credentialsValid) {
      return NextResponse.json({
        success: false,
        message: 'Credenciais não válidas',
        credentials: credentials,
        credentialsValid: credentialsValid
      });
    }
    
    // Testar com um ASIN conhecido (exemplo: Kindle)
    const testASIN = 'B08N5WRWNW';
    console.log('🧪 Testando API da Amazon com ASIN:', testASIN);
    
    const product = await getProductByASIN(testASIN);
    
    if (product) {
      console.log('✅ API funcionando:', product);
      return NextResponse.json({
        success: true,
        message: 'API da Amazon funcionando perfeitamente!',
        product: product,
        credentials: credentials,
        credentialsValid: credentialsValid
      });
    } else {
      console.log('❌ API não retornou produto');
      return NextResponse.json({
        success: false,
        message: 'API da Amazon não retornou produto',
        credentials: credentials,
        credentialsValid: credentialsValid
      });
    }
  } catch (error) {
    console.error('❌ Erro ao testar API:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro ao testar API da Amazon',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      credentials: {
        hasAccessKey: !!process.env.AMAZON_ACCESS_KEY_ID,
        hasSecretKey: !!process.env.AMAZON_SECRET_ACCESS_KEY,
        associateTag: process.env.AMAZON_ASSOCIATE_TAG || 'portalsolutio-20'
      }
    }, { status: 500 });
  }
}
