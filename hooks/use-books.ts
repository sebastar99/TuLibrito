import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { booksService } from '@/services/supabase/books.service'
import type { Book } from '@/types'

export function useBooks() {
  return useQuery({
    queryKey: ['books'],
    queryFn: () => booksService.getAll(),
  })
}

export function useBook(id: string) {
  return useQuery({
    queryKey: ['books', id],
    queryFn: () => booksService.getById(id),
    enabled: !!id,
  })
}

export function useSearchBooks(query: string) {
  return useQuery({
    queryKey: ['books', 'search', query],
    queryFn: () => booksService.search(query),
    enabled: query.length > 0,
  })
}

export function useBooksByCategory(categoryId: string) {
  return useQuery({
    queryKey: ['books', 'category', categoryId],
    queryFn: () => booksService.filterByCategory(categoryId),
    enabled: !!categoryId && categoryId !== 'all',
  })
}

export function useBooksByAuthor(authorId: string) {
  return useQuery({
    queryKey: ['books', 'author', authorId],
    queryFn: () => booksService.filterByAuthor(authorId),
    enabled: !!authorId && authorId !== 'all',
  })
}

export function useCreateBook() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (book: Omit<Book, 'id' | 'created_at' | 'updated_at' | 'author' | 'category'>) =>
      booksService.create(book),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
    },
  })
}

export function useUpdateBook() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Book> }) =>
      booksService.update(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
      queryClient.invalidateQueries({ queryKey: ['books', variables.id] })
    },
  })
}

export function useDeleteBook() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => booksService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
    },
  })
}
