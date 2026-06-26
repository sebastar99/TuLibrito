'use client'

import { useState } from 'react'
import { useBooks, useCategories, useAuthors, useSearchBooks, useBooksByCategory, useBooksByAuthor } from '@/hooks'
import { BookCard } from '@/components/books/book-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, X } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedAuthor, setSelectedAuthor] = useState('all')

  const { data: books, isLoading: booksLoading } = useBooks()
  const { data: categories } = useCategories()
  const { data: authors } = useAuthors()
  const { data: searchResults, isLoading: searchLoading } = useSearchBooks(searchQuery)
  const { data: categoryBooks, isLoading: categoryLoading } = useBooksByCategory(selectedCategory)
  const { data: authorBooks, isLoading: authorLoading } = useBooksByAuthor(selectedAuthor)

  let displayBooks = books || []
  let isLoading = booksLoading

  if (searchQuery) {
    displayBooks = searchResults || []
    isLoading = searchLoading
  } else if (selectedCategory !== 'all') {
    displayBooks = categoryBooks || []
    isLoading = categoryLoading
  } else if (selectedAuthor !== 'all') {
    displayBooks = authorBooks || []
    isLoading = authorLoading
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedAuthor('all')
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center max-w-7xl">
          <h1 className="text-xl font-semibold">Catálogo de Libros</h1>
          <Link href="/dashboard">
            <Button variant="outline">Volver al Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por título o ISBN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            {(searchQuery || selectedCategory !== 'all' || selectedAuthor !== 'all') && (
              <Button variant="ghost" onClick={clearFilters}>
                <X className="w-4 h-4 mr-2" />
                Limpiar filtros
              </Button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value || 'all')} disabled={!!searchQuery}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedAuthor} onValueChange={(value) => setSelectedAuthor(value || 'all')} disabled={!!searchQuery}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Autor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los autores</SelectItem>
                {authors?.map((author) => (
                  <SelectItem key={author.id} value={author.id}>
                    {author.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando libros...</p>
          </div>
        ) : displayBooks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No se encontraron libros.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {displayBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
