'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth.context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Book, Heart, LogOut, Calendar, User } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const { user, profile, loading, signOut } = useAuth()
  const router = useRouter()

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

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">BookReserve</h1>
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
      <div className="container mx-auto px-6 py-8">
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
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
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
      </div>
    </main>
  )
}
