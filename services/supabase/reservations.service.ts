import { supabase } from '@/lib/supabase'
import type { Reservation } from '@/types'

export const reservationsService = {
  async getAll(): Promise<Reservation[]> {
    if (!supabase) return []
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
    if (!supabase) return []
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
    if (!supabase) return null
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
    if (!supabase) return { data: null, error: new Error('Supabase no está configurado') }
    const { data, error } = await supabase
      .from('reservations')
      .insert(reservation)
      .select()
      .single()
    
    return { data, error }
  },

  async update(id: string, updates: Partial<Reservation>) {
    if (!supabase) return { data: null, error: new Error('Supabase no está configurado') }
    const { data, error } = await supabase
      .from('reservations')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    return { data, error }
  },

  async cancel(id: string) {
    if (!supabase) return { data: null, error: new Error('Supabase no está configurado') }
    const { data, error } = await supabase
      .from('reservations')
      .update({ status: 'cancelled' })
      .eq('id', id)
      .select()
      .single()
    
    return { data, error }
  },

  async markAsReturned(id: string) {
    if (!supabase) return { data: null, error: new Error('Supabase no está configurado') }
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
    if (!supabase) return []
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
