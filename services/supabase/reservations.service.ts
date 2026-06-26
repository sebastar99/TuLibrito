import { supabase } from '@/lib/supabase'
import type { Reservation } from '@/types'

export const reservationsService = {
  async getAll(): Promise<Reservation[]> {
    const { data, error } = await supabase
      .from('reservations')
      .select(`
        *,
        book:books(*)
      `)
      .order('reserved_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getByUserId(userId: string): Promise<Reservation[]> {
    const { data, error } = await supabase
      .from('reservations')
      .select(`
        *,
        book:books(*)
      `)
      .eq('user_id', userId)
      .order('reserved_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getById(id: string): Promise<Reservation | null> {
    const { data, error } = await supabase
      .from('reservations')
      .select(`
        *,
        book:books(*)
      `)
      .eq('id', id)
      .single()
    
    if (error) return null
    return data
  },

  async create(reservation: Omit<Reservation, 'id' | 'created_at' | 'updated_at' | 'book'>) {
    const { data, error } = await supabase
      .from('reservations')
      .insert(reservation)
      .select()
      .single()
    
    return { data, error }
  },

  async update(id: string, updates: Partial<Reservation>) {
    const { data, error } = await supabase
      .from('reservations')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    return { data, error }
  },

  async cancel(id: string) {
    const { data, error } = await supabase
      .from('reservations')
      .update({ status: 'cancelled' })
      .eq('id', id)
      .select()
      .single()
    
    return { data, error }
  },

  async markAsReturned(id: string) {
    const { data, error } = await supabase
      .from('reservations')
      .update({ 
        status: 'returned',
        returned_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    return { data, error }
  },

  async getActiveReservations(): Promise<Reservation[]> {
    const { data, error } = await supabase
      .from('reservations')
      .select(`
        *,
        book:books(*)
      `)
      .eq('status', 'active')
      .order('due_date', { ascending: true })
    
    if (error) throw error
    return data
  },
}
