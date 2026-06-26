'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth.context'
import { useUserFavorites, useRemoveFavorite } from '@/hooks'
import { FavoriteCard } from '@/components/favorites/favorite-card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function FavoritesPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { data: favorites, isLoading } = useUserFavorites(user?.id || '')
  const removeFavorite = useRemoveFavorite()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Dashboard
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Mis Favoritos</h1>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando favoritos...</p>
          </div>
        ) : !favorites || favorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tienes libros favoritos.</p>
            <Link href="/catalog">
              <Button className="mt-4">Explorar catálogo</Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => (
              <FavoriteCard
                key={favorite.id}
                favorite={favorite}
                onRemove={async (id) => {
                  if (confirm('¿Estás seguro de eliminar este libro de favoritos?')) {
                    try {
                      await removeFavorite.mutateAsync(id)
                      alert('Eliminado de favoritos')
                    } catch {
                      alert('Error al eliminar de favoritos')
                    }
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
