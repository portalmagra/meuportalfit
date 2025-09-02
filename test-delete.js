const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testDelete() {
  try {
    console.log('🔍 Verificando produtos antes da deleção...')
    
    // Buscar todos os produtos da categoria shot-afrodisiaco
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', 'shot-afrodisiaco')
    
    if (error) {
      console.error('❌ Erro ao buscar produtos:', error)
      return
    }
    
    console.log('📦 Produtos encontrados:', products?.length || 0)
    
    if (products && products.length > 0) {
      const productToDelete = products[0]
      console.log('🗑️ Produto para deletar:', {
        id: productToDelete.id,
        name: productToDelete.name,
        slug: productToDelete.slug
      })
      
      // Tentar deletar o produto
      console.log('🗑️ Tentando deletar produto...')
      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .eq('id', productToDelete.id)
      
      if (deleteError) {
        console.error('❌ Erro ao deletar produto:', deleteError)
        return
      }
      
      console.log('✅ Produto deletado com sucesso!')
      
      // Verificar se foi realmente deletado
      console.log('🔍 Verificando se foi deletado...')
      const { data: checkDeleted, error: checkError } = await supabase
        .from('products')
        .select('*')
        .eq('id', productToDelete.id)
      
      if (checkError) {
        console.error('❌ Erro ao verificar:', checkError)
        return
      }
      
      if (!checkDeleted || checkDeleted.length === 0) {
        console.log('✅ Confirmação: Produto foi realmente deletado!')
      } else {
        console.log('❌ Produto ainda existe no Supabase')
      }
      
    } else {
      console.log('✅ Nenhum produto encontrado para deletar')
    }
    
  } catch (error) {
    console.error('❌ Erro geral:', error)
  }
}

testDelete()
