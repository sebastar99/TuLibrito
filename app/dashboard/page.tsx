'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth.context'
import { useBooks, useReservations } from '@/hooks'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Book, Heart, LogOut, Calendar, User, Users, BookOpen, Clock } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const { user, profile, loading, signOut, refreshUser } = useAuth()
  const router = useRouter()
  const { data: books } = useBooks()
  const { data: reservations } = useReservations()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div>Cargando...</div>
      </main>
    )
  }

  if (!user) {
    return null
  }

  const isAdmin = profile?.role === 'ADMIN'
  const availableBooks = books?.filter((b) => b.available_copies > 0).length || 0
  const activeReservations = reservations?.filter((r) => r.status === 'active').length || 0

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center max-w-7xl">
          <h1 className="text-xl font-semibold">TuLibrito</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {profile?.full_name || user.email}
            </span>
            <Button variant="outline" size="sm" onClick={() => signOut()}>
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
        <Card>
          <CardHeader>
            <CardTitle>Bienvenido, {profile?.full_name || 'Usuario'}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Rol: <span className="font-medium">{profile?.role}</span>
            </p>
            <p className="text-muted-foreground mt-2">
              Email: <span className="font-medium">{user.email}</span>
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4"
              onClick={async () => {
                await refreshUser()
                window.location.reload()
              }}
            >
              Refrescar perfil
            </Button>
          </CardContent>
        </Card>

        {isAdmin && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Libros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{books?.length || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Disponibles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{availableBooks}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Reservas Activas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{activeReservations}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Reservas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{reservations?.length || 0}</div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
          <Link href="/catalog">
            <Card className="transition-colors hover:bg-accent cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="w-5 h-5" />
                  Catálogo de Libros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Explora y busca libros disponibles
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/reservations">
            <Card className="transition-colors hover:bg-accent cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Mis Reservas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Gestiona tus reservas activas
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/favorites">
            <Card className="transition-colors hover:bg-accent cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Mis Favoritos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Libros guardados como favoritos
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/profile">
            <Card className="transition-colors hover:bg-accent cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Mi Perfil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Editar información de cuenta
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {isAdmin && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Panel Administrativo</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <Link href="/admin/books">
                <Card className="transition-colors hover:bg-accent cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Gestionar Libros
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      CRUD de libros
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/authors">
                <Card className="transition-colors hover:bg-accent cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Gestionar Autores
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      CRUD de autores
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/categories">
                <Card className="transition-colors hover:bg-accent cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Book className="w-5 h-5" />
                      Gestionar Categorías
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      CRUD de categorías
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/reservations">
                <Card className="transition-colors hover:bg-accent cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Gestionar Reservas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Ver y gestionar todas las reservas
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
