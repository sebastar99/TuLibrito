import { supabase } from '@/lib/supabase'
import type { Author } from '@/types'

export const authorsService = {
  async getAll(): Promise<Author[]> {
    if (!supabase) return []
    const { data, error } = await supabase
      .from('authors')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data
  },

  async getById(id: string): Promise<Author | null> {
    if (!supabase) return null
    const { data, error } = await supabase
      .from('authors')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) return null
    return data
  },

  async create(author: Omit<Author, 'id' | 'created_at' | 'updated_at'>) {
    if (!supabase) return { data: null, error: new Error('Supabase no está configurado') }
    const { data, error } = await supabase
      .from('authors')
      .insert(author)
      .select()
      .single()
    
    return { data, error }
  },

  async update(id: string, updates: Partial<Author>) {
    if (!supabase) return { data: null, error: new Error('Supabase no está configurado') }
    const { data, error } = await supabase
      .from('authors')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    return { data, error }
  },

  async delete(id: string) {
    if (!supabase) return { error: new Error('Supabase no está configurado') }
    const { error } = await supabase
      .from('authors')
      .delete()
      .eq('id', id)
    
    return { error }
  },
}
