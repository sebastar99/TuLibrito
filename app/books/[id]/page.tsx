'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useBook, useCreateReservation, useAddFavorite, useRemoveFavoriteByUserAndBook, useCheckFavorite } from '@/hooks'
import { useAuth } from '@/contexts/auth.context'
import { useModal } from '@/contexts/modal.context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Book, Heart, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { addDays } from 'date-fns'

export const dynamic = 'force-dynamic'

export default function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string>('')
  const router = useRouter()
  const { user } = useAuth()
  const { data: book, isLoading } = useBook(id)
  const { data: isFavorite } = useCheckFavorite(user?.id || '', id)
  const createReservation = useCreateReservation()
  const modal = useModal()
  const addFavorite = useAddFavorite()
  const removeFavorite = useRemoveFavoriteByUserAndBook()
  const [isReserving, setIsReserving] = useState(false)

  useEffect(() => {
    params.then((p) => setId(p.id))
  }, [params])

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-8">
          <p>Cargando...</p>
        </div>
      </main>
    )
  }

  if (!book) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-8">
          <p>Libro no encontrado.</p>
          <Link href="/catalog">
            <Button variant="outline" className="mt-4">
              Volver al catálogo
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/catalog">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al catálogo
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="sm">Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-[minmax(0,0.45fr)_1fr] gap-8 items-start">
          <div className="sticky top-8 aspect-[2/3] max-h-[500px] w-full bg-muted rounded-2xl flex items-center justify-center overflow-hidden shadow-lg">
            {book.cover_url ? (
              <img
                src={book.cover_url}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <Book className="w-32 h-32 text-muted-foreground" />
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
              <p className="text-xl text-muted-foreground">{book.author?.name}</p>
            </div>

            <div className="flex gap-2">
              <Badge variant="secondary">{book.category?.name}</Badge>
              <Badge variant="outline">{book.published_year}</Badge>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">ISBN: {book.isbn}</p>
              <p className="text-sm text-muted-foreground">
                Copias totales: {book.total_copies}
              </p>
              <p className="text-sm text-muted-foreground">
                Disponibles: <span className={book.available_copies > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                  {book.available_copies}
                </span>
              </p>
            </div>

            {book.description && (
              <Card>
                <CardHeader>
                  <CardTitle>Descripción</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{book.description}</p>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-3">
              <Button
                disabled={book.available_copies === 0 || isReserving}
                className="flex-1 h-12 text-base font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30"
                onClick={async () => {
                  if (!user || !book) return
                  setIsReserving(true)
                  try {
                    console.log('Creando reserva con user_id:', user.id, 'book_id:', book.id)
                    const result = await createReservation.mutateAsync({
                      user_id: user.id,
                      book_id: book.id,
                      due_date: addDays(new Date(), 14).toISOString(),
                      status: 'active',
                      reserved_at: new Date().toISOString(),
                      returned_at: null,
                    })
                    console.log('Reserva creada:', result)
                    await modal.alert({
                      title: 'Reserva creada',
                      description: 'El libro fue reservado con éxito.',
                      variant: 'success',
                    })
                  } catch (error) {
                    console.error('Error al reservar:', error)
                    await modal.alert({
                      title: 'No se pudo reservar',
                      description: 'Error al reservar el libro: ' + (error as Error).message,
                      variant: 'error',
                    })
                  } finally {
                    setIsReserving(false)
                  }
                }}
              >
                {isReserving ? 'Reservando...' : book.available_copies > 0 ? 'Reservar' : 'Sin stock'}
              </Button>
              <Button
                variant="outline"
                className="h-12 px-6 shadow-md hover:shadow-lg"
                onClick={async () => {
                  if (!user) return
                  if (isFavorite) {
                    await removeFavorite.mutateAsync({ userId: user.id, bookId: id })
                  } else {
                    await addFavorite.mutateAsync({ user_id: user.id, book_id: id })
                  }
                }}
              >
                <Heart className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                {isFavorite ? 'Guardado' : 'Guardar'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
