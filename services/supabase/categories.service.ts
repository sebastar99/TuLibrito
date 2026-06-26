import { supabase } from '@/lib/supabase'
import type { Category } from '@/types'

export const categoriesService = {
  async getAll(): Promise<Category[]> {
    if (!supabase) return []
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data
  },

  async getById(id: string): Promise<Category | null> {
    if (!supabase) return null
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) return null
    return data
  },

  async create(category: Omit<Category, 'id' | 'created_at' | 'updated_at'>) {
    if (!supabase) return { data: null, error: new Error('Supabase no está configurado') }
    const { data, error } = await supabase
      .from('categories')
      .insert(category)
      .select()
      .single()
    
    return { data, error }
  },

  async update(id: string, updates: Partial<Category>) {
    if (!supabase) return { data: null, error: new Error('Supabase no está configurado') }
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    return { data, error }
  },

  async delete(id: string) {
    if (!supabase) return { error: new Error('Supabase no está configurado') }
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)
    
    return { error }
  },
}
