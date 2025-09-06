import { createClient } from '@supabase/supabase-js'
import { generateSlug } from './slug-generator'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para as tabelas
export interface Category {
  id: string
  name: string
  description: string
  color: string
  icon: string
  created_at?: string
}

export interface Product {
  id: string
  name: string
  description: string
  category_id: string
  amazon_url: string
  current_price: string
  original_price: string
  rating: number
  review_count: number
  image_url: string
  benefits: string[]
  features: string[]
  product_url?: string
  slug?: string
  is_mentoria?: boolean
  created_at?: string
}

// Funções para sincronização
export const syncProductsToSupabase = async (products: Product[]) => {
  try {
    // Usar upsert para evitar conflitos
    if (products.length > 0) {
      // Garantir que todos os produtos tenham slug
      const productsWithSlug = products.map(product => ({
        ...product,
        slug: product.slug || generateSlug(product.name, product.id)
      }))
      
      console.log('🔗 Produtos com slug garantido:', productsWithSlug.map(p => ({ id: p.id, name: p.name, slug: p.slug })))
      
      const { data, error } = await supabase
        .from('products')
        .upsert(productsWithSlug, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        })
      
      if (error) {
        console.error('❌ Erro ao sincronizar produtos:', error)
        return false
      }
      
      console.log('✅ Produtos sincronizados com Supabase:', productsWithSlug.length)
      return true
    }
    return true
  } catch (error) {
    console.error('❌ Erro na sincronização:', error)
    return false
  }
}

export const syncCategoriesToSupabase = async (categories: Category[]) => {
  try {
    // Usar upsert para evitar conflitos
    if (categories.length > 0) {
      const { data, error } = await supabase
        .from('categories')
        .upsert(categories, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        })
      
      if (error) {
        console.error('❌ Erro ao sincronizar categorias:', error)
        return false
      }
      
      console.log('✅ Categorias sincronizadas com Supabase:', categories.length)
      return true
    }
    return true
  } catch (error) {
    console.error('❌ Erro na sincronização:', error)
    return false
  }
}

export const loadProductsFromSupabase = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('❌ Erro ao carregar produtos:', error)
      return []
    }
    
    console.log('✅ Produtos carregados do Supabase:', data?.length || 0)
    return data || []
  } catch (error) {
    console.error('❌ Erro ao carregar produtos:', error)
    return []
  }
}

export const loadCategoriesFromSupabase = async (): Promise<Category[]> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('❌ Erro ao carregar categorias:', error)
      return []
    }
    
    console.log('✅ Categorias carregadas do Supabase:', data?.length || 0)
    return data || []
  } catch (error) {
    console.error('❌ Erro ao carregar categorias:', error)
    return []
  }
}

export const addProductToSupabase = async (product: Omit<Product, 'id' | 'created_at'>) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
    
    if (error) {
      console.error('❌ Erro ao adicionar produto:', error)
      return null
    }
    
    console.log('✅ Produto adicionado ao Supabase:', data?.[0])
    return data?.[0] || null
  } catch (error) {
    console.error('❌ Erro ao adicionar produto:', error)
    return null
  }
}

export const updateProductInSupabase = async (id: string, updates: Partial<Product>) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) {
      console.error('❌ Erro ao atualizar produto:', error)
      return null
    }
    
    console.log('✅ Produto atualizado no Supabase:', data?.[0])
    return data?.[0] || null
  } catch (error) {
    console.error('❌ Erro ao atualizar produto:', error)
    return null
  }
}

export const deleteProductFromSupabase = async (id: string) => {
  try {
    console.log('🗑️ deleteProductFromSupabase chamado com ID:', id)
    
    // Primeiro, verificar se o produto existe
    const { data: existingProduct, error: checkError } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
    
    if (checkError) {
      console.error('❌ Erro ao verificar produto:', checkError)
      return false
    }
    
    if (!existingProduct || existingProduct.length === 0) {
      console.log('❌ Produto não encontrado no Supabase:', id)
      return false
    }
    
    console.log('✅ Produto encontrado no Supabase:', existingProduct[0].name)
    
    // Tentar deletar o produto
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('❌ Erro ao excluir produto:', error)
      return false
    }
    
    console.log('✅ Produto excluído do Supabase:', id)
    
    // Verificar se foi realmente deletado
    const { data: checkDeleted, error: checkDeletedError } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
    
    if (checkDeletedError) {
      console.error('❌ Erro ao verificar se foi deletado:', checkDeletedError)
      return false
    }
    
    if (!checkDeleted || checkDeleted.length === 0) {
      console.log('✅ Confirmação: Produto foi realmente deletado do Supabase')
      return true
    } else {
      console.log('❌ Produto ainda existe no Supabase após tentativa de deleção')
      return false
    }
  } catch (error) {
    console.error('❌ Erro ao excluir produto:', error)
    return false
  }
}

export const addCategoryToSupabase = async (category: Omit<Category, 'id' | 'created_at'>) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .insert([category])
      .select()
    
    if (error) {
      console.error('❌ Erro ao adicionar categoria:', error)
      return null
    }
    
    console.log('✅ Categoria adicionada ao Supabase:', data?.[0])
    return data?.[0] || null
  } catch (error) {
    console.error('❌ Erro ao adicionar categoria:', error)
    return null
  }
}
