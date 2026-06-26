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
      .neq('status', 'cancelled')
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
    
    // Primero verificar que haya stock disponible
    const { data: book, error: bookError } = await supabase
      .from('books')
      .select('available_copies')
      .eq('id', reservation.book_id)
      .single()
    
    if (bookError || !book) return { data: null, error: bookError || new Error('Libro no encontrado') }
    if (book.available_copies <= 0) return { data: null, error: new Error('No hay copias disponibles') }
    
    // Crear la reserva y disminuir el stock en una transacción
    const { data, error } = await supabase.rpc('create_reservation_with_stock', {
      p_user_id: reservation.user_id,
      p_book_id: reservation.book_id,
      p_due_date: reservation.due_date,
      p_status: reservation.status,
      p_reserved_at: reservation.reserved_at,
      p_returned_at: reservation.returned_at
    })
    
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
    console.log('Cancelando reserva:', id)
    const { data, error } = await supabase.rpc('cancel_reservation_with_stock', {
      p_reservation_id: id
    })
    console.log('Resultado cancelación:', { data, error })
    
    return { data, error }
  },

  async markAsReturned(id: string) {
    if (!supabase) return { data: null, error: new Error('Supabase no está configurado') }
    const { data, error } = await supabase.rpc('mark_as_returned_with_stock', {
      p_reservation_id: id
    })
    
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
