const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function debugDelete() {
  try {
    console.log('🔍 Debug detalhado da deleção...')
    console.log('🔑 Supabase URL:', supabaseUrl ? '✅ Configurado' : '❌ Não configurado')
    console.log('🔑 Supabase Key:', supabaseAnonKey ? '✅ Configurado' : '❌ Não configurado')
    
    // Buscar todos os produtos
    console.log('\n📦 Buscando todos os produtos...')
    const { data: allProducts, error: allError } = await supabase
      .from('products')
      .select('*')
    
    if (allError) {
      console.error('❌ Erro ao buscar todos os produtos:', allError)
      return
    }
    
    console.log('📦 Total de produtos no Supabase:', allProducts?.length || 0)
    
    if (allProducts && allProducts.length > 0) {
      allProducts.forEach((product, index) => {
        console.log(`   ${index + 1}. ${product.name} (ID: ${product.id}, Categoria: ${product.category_id})`)
      })
      
      // Tentar deletar o primeiro produto
      const productToDelete = allProducts[0]
      console.log(`\n🗑️ Tentando deletar: ${productToDelete.name} (ID: ${productToDelete.id})`)
      
      // Verificar se existe antes
      const { data: checkBefore, error: checkBeforeError } = await supabase
        .from('products')
        .select('*')
        .eq('id', productToDelete.id)
      
      if (checkBeforeError) {
        console.error('❌ Erro ao verificar antes:', checkBeforeError)
        return
      }
      
      console.log('✅ Produto existe antes da deleção:', checkBefore?.length > 0)
      
      // Tentar deletar
      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .eq('id', productToDelete.id)
      
      if (deleteError) {
        console.error('❌ Erro na deleção:', deleteError)
        console.error('❌ Detalhes do erro:', {
          code: deleteError.code,
          message: deleteError.message,
          details: deleteError.details,
          hint: deleteError.hint
        })
        return
      }
      
      console.log('✅ Deleção executada sem erro')
      
      // Verificar se foi deletado
      const { data: checkAfter, error: checkAfterError } = await supabase
        .from('products')
        .select('*')
        .eq('id', productToDelete.id)
      
      if (checkAfterError) {
        console.error('❌ Erro ao verificar depois:', checkAfterError)
        return
      }
      
      if (!checkAfter || checkAfter.length === 0) {
        console.log('✅ Produto foi realmente deletado!')
      } else {
        console.log('❌ Produto ainda existe após deleção')
        console.log('❌ Produto encontrado:', checkAfter[0])
      }
      
    } else {
      console.log('✅ Nenhum produto encontrado para deletar')
    }
    
  } catch (error) {
    console.error('❌ Erro geral:', error)
  }
}

debugDelete()
