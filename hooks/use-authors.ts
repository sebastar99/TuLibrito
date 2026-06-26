import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authorsService } from '@/services/supabase/authors.service'
import type { Author } from '@/types'

export function useAuthors() {
  return useQuery({
    queryKey: ['authors'],
    queryFn: () => authorsService.getAll(),
  })
}

export function useAuthor(id: string) {
  return useQuery({
    queryKey: ['authors', id],
    queryFn: () => authorsService.getById(id),
    enabled: !!id,
  })
}

export function useCreateAuthor() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (author: Omit<Author, 'id' | 'created_at' | 'updated_at'>) =>
      authorsService.create(author),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] })
    },
  })
}

export function useUpdateAuthor() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Author> }) =>
      authorsService.update(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['authors'] })
      queryClient.invalidateQueries({ queryKey: ['authors', variables.id] })
    },
  })
}

export function useDeleteAuthor() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => authorsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] })
    },
  })
}
