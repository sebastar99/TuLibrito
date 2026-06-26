'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth.context'
import { useReservations, useCancelReservation, useMarkAsReturned } from '@/hooks'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, X, Check } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/utils/date'

export const dynamic = 'force-dynamic'

export default function AdminReservationsPage() {
  const router = useRouter()
  const { user, profile } = useAuth()
  const { data: reservations, isLoading } = useReservations()
  const cancelReservation = useCancelReservation()
  const markAsReturned = useMarkAsReturned()

  useEffect(() => {
    if (!user || profile?.role !== 'ADMIN') {
      router.push('/dashboard')
    }
  }, [user, profile, router])

  const handleCancel = async (id: string) => {
    if (confirm('¿Estás seguro de cancelar esta reserva?')) {
      await cancelReservation.mutateAsync(id)
    }
  }

  const handleReturn = async (id: string) => {
    if (confirm('¿Estás seguro de marcar esta reserva como devuelta?')) {
      await markAsReturned.mutateAsync(id)
    }
  }

  if (!user || profile?.role !== 'ADMIN') {
    return null
  }

  const statusColors = {
    active: 'bg-green-500',
    returned: 'bg-blue-500',
    cancelled: 'bg-red-500',
  }

  const statusLabels = {
    active: 'Activa',
    returned: 'Devuelto',
    cancelled: 'Cancelada',
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
          <h1 className="text-xl font-semibold">Gestión de Reservas</h1>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">Todas las Reservas</h2>

        {isLoading ? (
          <div className="text-center py-12"><p className="text-muted-foreground">Cargando reservas...</p></div>
        ) : (
          <div className="grid gap-4">
            {reservations?.map((reservation) => (
              <Card key={reservation.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{reservation.book?.title}</h3>
                        <Badge className={statusColors[reservation.status]}>
                          {statusLabels[reservation.status]}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Usuario: {reservation.user_id}</p>
                      <p className="text-sm text-muted-foreground">Reservado: {formatDate(reservation.reserved_at)}</p>
                      <p className="text-sm text-muted-foreground">Devolución: {formatDate(reservation.due_date)}</p>
                    </div>
                    {reservation.status === 'active' && (
                      <div className="flex gap-2">
                        <Button variant="destructive" size="sm" onClick={() => handleCancel(reservation.id)}>
                          <X className="w-4 h-4 mr-2" />
                          Cancelar
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleReturn(reservation.id)}>
                          <Check className="w-4 h-4 mr-2" />
                          Marcar devuelto
                        </Button>
                      </div>
                    )}
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
