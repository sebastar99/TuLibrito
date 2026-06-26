import { supabase } from '@/lib/supabase'
import type { Profile } from '@/types'

export const authService = {
  async signUp(email: string, password: string, fullName?: string) {
    if (!supabase) return { data: null, error: new Error('Supabase no está configurado') }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })
    return { data, error }
  },

  async signIn(email: string, password: string) {
    if (!supabase) return { data: null, error: new Error('Supabase no está configurado') }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  async signOut() {
    if (!supabase) return { error: new Error('Supabase no está configurado') }
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  async resetPassword(email: string) {
    if (!supabase) return { data: null, error: new Error('Supabase no está configurado') }
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    return { data, error }
  },

  async getProfile(userId: string): Promise<Profile | null> {
    if (!supabase) return null
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) return null
    return data
  },

  async updateProfile(userId: string, updates: Partial<Profile>) {
    if (!supabase) return { data: null, error: new Error('Supabase no está configurado') }
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    return { data, error }
  },
}
