import { supabase } from '@/lib/supabase'
import type { Favorite } from '@/types'

export const favoritesService = {
  async getByUserId(userId: string): Promise<Favorite[]> {
    if (!supabase) return []
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        *,
        book:books(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getById(id: string): Promise<Favorite | null> {
    if (!supabase) return null
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        *,
        book:books(*)
      `)
      .eq('id', id)
      .single()
    
    if (error) return null
    return data
  },

  async create(favorite: Omit<Favorite, 'id' | 'created_at' | 'book'>) {
    if (!supabase) return { data: null, error: new Error('Supabase no está configurado') }
    const { data, error } = await supabase
      .from('favorites')
      .insert(favorite)
      .select()
      .single()
    
    return { data, error }
  },

  async delete(id: string) {
    if (!supabase) return { error: new Error('Supabase no está configurado') }
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('id', id)
    
    return { error }
  },

  async checkFavorite(userId: string, bookId: string): Promise<boolean> {
    if (!supabase) return false
    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('book_id', bookId)
      .single()
    
    if (error) return false
    return !!data
  },

  async removeByUserAndBook(userId: string, bookId: string) {
    if (!supabase) return { error: new Error('Supabase no está configurado') }
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('book_id', bookId)
    
    return { error }
  },
}
