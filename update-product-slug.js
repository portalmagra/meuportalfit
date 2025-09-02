// Script para atualizar slug do produto existente
// Produto: 1756822925433 - "Produto Amazon B0020MMCDE"

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function generateSlug(name, id) {
  // Converter para minúsculas
  let slug = name.toLowerCase()
  
  // Remover acentos
  slug = slug
    .replace(/[áàâãä]/g, 'a')
    .replace(/[éèêë]/g, 'e')
    .replace(/[íìîï]/g, 'i')
    .replace(/[óòôõö]/g, 'o')
    .replace(/[úùûü]/g, 'u')
    .replace(/[ç]/g, 'c')
  
  // Remover caracteres especiais, manter apenas letras, números, espaços e hífens
  slug = slug.replace(/[^a-z0-9\s-]/g, '')
  
  // Substituir espaços por hífens
  slug = slug.replace(/\s+/g, '-')
  
  // Remover hífens múltiplos
  slug = slug.replace(/-+/g, '-')
  
  // Remover hífens no início e fim
  slug = slug.replace(/^-+|-+$/g, '')
  
  // Adicionar ID no final para garantir unicidade
  slug = slug + '-' + id
  
  return slug
}

async function updateProductSlug() {
  try {
    console.log('🔄 Atualizando slug do produto...');
    
    // Produto que precisa ser atualizado
    const productId = '1756822925433';
    const productName = 'Produto Amazon B0020MMCDE';
    const categoryId = 'shot-afrodisiaco';
    
    // Gerar slug
    const slug = generateSlug(productName, productId);
    console.log('🔗 Slug gerado:', slug);
    
    // Atualizar produto no Supabase
    const { data, error } = await supabase
      .from('products')
      .update({ slug: slug })
      .eq('id', productId)
      .eq('category_id', categoryId);
    
    if (error) {
      console.error('❌ Erro ao atualizar produto:', error);
      return;
    }
    
    console.log('✅ Produto atualizado com sucesso!');
    console.log('🔗 Nova URL:', `/produtos/${categoryId}/${slug}`);
    
  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

updateProductSlug();
