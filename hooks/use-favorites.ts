import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { favoritesService } from '@/services/supabase/favorites.service'
import type { Favorite } from '@/types'

export function useUserFavorites(userId: string) {
  return useQuery({
    queryKey: ['favorites', 'user', userId],
    queryFn: () => favoritesService.getByUserId(userId),
    enabled: !!userId,
  })
}

export function useFavorite(id: string) {
  return useQuery({
    queryKey: ['favorites', id],
    queryFn: () => favoritesService.getById(id),
    enabled: !!id,
  })
}

export function useCheckFavorite(userId: string, bookId: string) {
  return useQuery({
    queryKey: ['favorites', 'check', userId, bookId],
    queryFn: () => favoritesService.checkFavorite(userId, bookId),
    enabled: !!userId && !!bookId,
  })
}

export function useAddFavorite() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (favorite: Omit<Favorite, 'id' | 'created_at' | 'book'>) =>
      favoritesService.create(favorite),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
  })
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => favoritesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
  })
}

export function useRemoveFavoriteByUserAndBook() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ userId, bookId }: { userId: string; bookId: string }) =>
      favoritesService.removeByUserAndBook(userId, bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
  })
}
