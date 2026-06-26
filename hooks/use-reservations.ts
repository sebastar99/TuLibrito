import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { reservationsService } from '@/services/supabase/reservations.service'
import type { Reservation } from '@/types'

export function useReservations() {
  return useQuery({
    queryKey: ['reservations'],
    queryFn: () => reservationsService.getAll(),
  })
}

export function useUserReservations(userId: string) {
  return useQuery({
    queryKey: ['reservations', 'user', userId],
    queryFn: () => reservationsService.getByUserId(userId),
    enabled: !!userId,
  })
}

export function useReservation(id: string) {
  return useQuery({
    queryKey: ['reservations', id],
    queryFn: () => reservationsService.getById(id),
    enabled: !!id,
  })
}

export function useActiveReservations() {
  return useQuery({
    queryKey: ['reservations', 'active'],
    queryFn: () => reservationsService.getActiveReservations(),
  })
}

export function useCreateReservation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (reservation: Omit<Reservation, 'id' | 'created_at' | 'updated_at' | 'book'>) =>
      reservationsService.create(reservation),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] })
      queryClient.invalidateQueries({ queryKey: ['reservations', 'user', variables.user_id] })
      queryClient.invalidateQueries({ queryKey: ['books'] })
    },
  })
}

export function useUpdateReservation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Reservation> }) =>
      reservationsService.update(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] })
      queryClient.invalidateQueries({ queryKey: ['reservations', variables.id] })
    },
  })
}

export function useCancelReservation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => reservationsService.cancel(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] })
      queryClient.invalidateQueries({ queryKey: ['reservations', 'user'] })
      queryClient.invalidateQueries({ queryKey: ['books'] })
    },
  })
}

export function useMarkAsReturned() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => reservationsService.markAsReturned(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] })
      queryClient.invalidateQueries({ queryKey: ['books'] })
    },
  })
}
