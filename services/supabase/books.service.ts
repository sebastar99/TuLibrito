import { supabase } from '@/lib/supabase'
import type { Book } from '@/types'

export const booksService = {
  async getAll(): Promise<Book[]> {
    const { data, error } = await supabase
      .from('books')
      .select(`
        *,
        author:authors(*),
        category:categories(*)
      `)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getById(id: string): Promise<Book | null> {
    const { data, error } = await supabase
      .from('books')
      .select(`
        *,
        author:authors(*),
        category:categories(*)
      `)
      .eq('id', id)
      .single()
    
    if (error) return null
    return data
  },

  async search(query: string): Promise<Book[]> {
    const { data, error } = await supabase
      .from('books')
      .select(`
        *,
        author:authors(*),
        category:categories(*)
      `)
      .or(`title.ilike.%${query}%,isbn.ilike.%${query}%`)
      .order('title')
    
    if (error) throw error
    return data
  },

  async filterByCategory(categoryId: string): Promise<Book[]> {
    const { data, error } = await supabase
      .from('books')
      .select(`
        *,
        author:authors(*),
        category:categories(*)
      `)
      .eq('category_id', categoryId)
      .order('title')
    
    if (error) throw error
    return data
  },

  async filterByAuthor(authorId: string): Promise<Book[]> {
    const { data, error } = await supabase
      .from('books')
      .select(`
        *,
        author:authors(*),
        category:categories(*)
      `)
      .eq('author_id', authorId)
      .order('title')
    
    if (error) throw error
    return data
  },

  async create(book: Omit<Book, 'id' | 'created_at' | 'updated_at' | 'author' | 'category'>) {
    const { data, error } = await supabase
      .from('books')
      .insert(book)
      .select()
      .single()
    
    return { data, error }
  },

  async update(id: string, updates: Partial<Book>) {
    const { data, error } = await supabase
      .from('books')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    return { data, error }
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', id)
    
    return { error }
  },

  async updateAvailableCopies(id: string, change: number) {
    const { data, error } = await supabase.rpc('update_book_copies', {
      book_id: id,
      change: change,
    })
    
    return { data, error }
  },
}
