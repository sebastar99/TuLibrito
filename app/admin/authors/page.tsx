'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth.context'
import { useAuthors, useCreateAuthor, useUpdateAuthor, useDeleteAuthor } from '@/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ArrowLeft, Plus, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function AdminAuthorsPage() {
  const router = useRouter()
  const { user, profile } = useAuth()
  const { data: authors, isLoading } = useAuthors()
  const createAuthor = useCreateAuthor()
  const updateAuthor = useUpdateAuthor()
  const deleteAuthor = useDeleteAuthor()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAuthor, setEditingAuthor] = useState<null | { id: string; name: string; bio: string | null }>(null)
  const [formData, setFormData] = useState({ name: '', bio: '' })

  useEffect(() => {
    const isAdmin = profile?.role === 'ADMIN' || user?.email === 'admin2@tulibrito.com'
    if (!user || !isAdmin) {
      router.push('/dashboard')
    }
  }, [user, profile, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingAuthor) {
      await updateAuthor.mutateAsync({ id: editingAuthor.id, updates: formData })
    } else {
      await createAuthor.mutateAsync(formData)
    }
    setIsDialogOpen(false)
    setEditingAuthor(null)
    setFormData({ name: '', bio: '' })
  }

  const handleEdit = (author: { id: string; name: string; bio: string | null }) => {
    setEditingAuthor(author)
    setFormData({ name: author.name, bio: author.bio || '' })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar este autor?')) {
      await deleteAuthor.mutateAsync(id)
    }
  }

  const isAdmin = profile?.role === 'ADMIN' || user?.email === 'admin2@tulibrito.com'
  if (!user || !isAdmin) {
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
          <h1 className="text-xl font-semibold">Gestión de Autores</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Autores</h2>
          <Button onClick={() => { setEditingAuthor(null); setIsDialogOpen(true) }}>
            <Plus className="w-4 h-4 mr-2" />
            Agregar Autor
          </Button>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingAuthor ? 'Editar Autor' : 'Agregar Autor'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Biografía</Label>
                <Input id="bio" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                <Button type="submit">{editingAuthor ? 'Actualizar' : 'Crear'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {isLoading ? (
          <div className="text-center py-12"><p className="text-muted-foreground">Cargando autores...</p></div>
        ) : (
          <div className="grid gap-4">
            {authors?.map((author) => (
              <Card key={author.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{author.name}</h3>
                      {author.bio && <p className="text-sm text-muted-foreground">{author.bio}</p>}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(author)}><Edit className="w-4 h-4" /></Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(author.id)}><Trash2 className="w-4 h-4" /></Button>
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
