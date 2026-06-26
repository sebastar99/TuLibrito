'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth.context'
import { useBooks, useCreateBook, useUpdateBook, useDeleteBook, useCategories, useAuthors } from '@/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Plus, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function AdminBooksPage() {
  const router = useRouter()
  const { user, profile } = useAuth()
  const { data: books, isLoading } = useBooks()
  const { data: categories } = useCategories()
  const { data: authors } = useAuthors()
  const createBook = useCreateBook()
  const updateBook = useUpdateBook()
  const deleteBook = useDeleteBook()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<null | { id: string; title: string; isbn: string; author_id: string | null; category_id: string | null; description: string | null; cover_url: string | null; published_year: number; total_copies: number; available_copies: number }>(null)
  const [formData, setFormData] = useState({
    title: '',
    isbn: '',
    author_id: '',
    category_id: '',
    description: '',
    cover_url: '',
    published_year: new Date().getFullYear(),
    total_copies: 1,
    available_copies: 1,
  })

  useEffect(() => {
    if (!user || profile?.role !== 'ADMIN') {
      router.push('/dashboard')
    }
  }, [user, profile, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingBook) {
      await updateBook.mutateAsync({ id: editingBook.id, updates: formData })
    } else {
      await createBook.mutateAsync(formData)
    }
    setIsDialogOpen(false)
    setEditingBook(null)
    setFormData({
      title: '',
      isbn: '',
      author_id: '',
      category_id: '',
      description: '',
      cover_url: '',
      published_year: new Date().getFullYear(),
      total_copies: 1,
      available_copies: 1,
    })
  }

  const handleEdit = (book: { id: string; title: string; isbn: string; author_id: string | null; category_id: string | null; description: string | null; cover_url: string | null; published_year: number; total_copies: number; available_copies: number }) => {
    setEditingBook(book)
    setFormData({
      title: book.title,
      isbn: book.isbn,
      author_id: book.author_id ?? '',
      category_id: book.category_id ?? '',
      description: book.description ?? '',
      cover_url: book.cover_url ?? '',
      published_year: book.published_year,
      total_copies: book.total_copies,
      available_copies: book.available_copies,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar este libro?')) {
      await deleteBook.mutateAsync(id)
    }
  }

  if (!user || profile?.role !== 'ADMIN') {
    return null
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center max-w-7xl">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Dashboard
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Gestión de Libros</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Libros</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Button onClick={() => {
              setEditingBook(null)
              setIsDialogOpen(true)
            }}>
              <Plus className="w-4 h-4 mr-2" />
              Agregar Libro
            </Button>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingBook ? 'Editar Libro' : 'Agregar Libro'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="isbn">ISBN</Label>
                  <Input
                    id="isbn"
                    value={formData.isbn}
                    onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Autor</Label>
                  <Select value={formData.author_id || ''} onValueChange={(value) => setFormData({ ...formData, author_id: value as string })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar autor" />
                    </SelectTrigger>
                    <SelectContent>
                      {authors?.map((author) => (
                        <SelectItem key={author.id} value={author.id}>
                          {author.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Select value={formData.category_id || ''} onValueChange={(value) => setFormData({ ...formData, category_id: value as string })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cover_url">URL de portada</Label>
                  <Input
                    id="cover_url"
                    value={formData.cover_url}
                    onChange={(e) => setFormData({ ...formData, cover_url: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="published_year">Año de publicación</Label>
                    <Input
                      id="published_year"
                      type="number"
                      value={formData.published_year}
                      onChange={(e) => setFormData({ ...formData, published_year: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="total_copies">Copias totales</Label>
                    <Input
                      id="total_copies"
                      type="number"
                      value={formData.total_copies}
                      onChange={(e) => setFormData({ ...formData, total_copies: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">{editingBook ? 'Actualizar' : 'Crear'}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando libros...</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {books?.map((book) => (
              <Card key={book.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">{book.author?.name}</p>
                      <p className="text-sm text-muted-foreground">{book.category?.name}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Disponibles: {book.available_copies} / {book.total_copies}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(book)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(book.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
