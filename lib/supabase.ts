import { createClient } from '@supabase/supabase-js'

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
  created_at?: string
}

// Funções para sincronização
export const syncProductsToSupabase = async (products: Product[]) => {
  try {
    // Usar upsert para evitar conflitos
    if (products.length > 0) {
      const { data, error } = await supabase
        .from('products')
        .upsert(products, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        })
      
      if (error) {
        console.error('❌ Erro ao sincronizar produtos:', error)
        return false
      }
      
      console.log('✅ Produtos sincronizados com Supabase:', products.length)
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
    // Limpar categorias existentes
    await supabase.from('categories').delete().neq('id', '')
    
    // Inserir novas categorias
    if (categories.length > 0) {
      const { data, error } = await supabase
        .from('categories')
        .insert(categories)
      
      if (error) {
        console.error('❌ Erro ao sincronizar categorias:', error)
        return false
      }
      
      console.log('✅ Categorias sincronizadas com Supabase:', categories.length)
      return true
    }
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
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('❌ Erro ao excluir produto:', error)
      return false
    }
    
    console.log('✅ Produto excluído do Supabase:', id)
    return true
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
