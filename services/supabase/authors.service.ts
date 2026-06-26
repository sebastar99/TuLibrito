import { supabase } from '@/lib/supabase'
import type { Author } from '@/types'

export const authorsService = {
  async getAll(): Promise<Author[]> {
    const { data, error } = await supabase
      .from('authors')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data
  },

  async getById(id: string): Promise<Author | null> {
    const { data, error } = await supabase
      .from('authors')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) return null
    return data
  },

  async create(author: Omit<Author, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('authors')
      .insert(author)
      .select()
      .single()
    
    return { data, error }
  },

  async update(id: string, updates: Partial<Author>) {
    const { data, error } = await supabase
      .from('authors')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    return { data, error }
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('authors')
      .delete()
      .eq('id', id)
    
    return { error }
  },
}
