import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_mentoria', true)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Erro ao buscar produtos da mentoria:', error)
      return NextResponse.json(
        { error: 'Erro ao buscar produtos da mentoria' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Erro na API de produtos da mentoria:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
