'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth.context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
            <Button variant="outline" onClick={() => signOut()}>
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
            <div className="mt-6">
              <p className="text-sm text-muted-foreground">
                El catálogo de libros y las funcionalidades de reservas se implementarán en las siguientes etapas.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
