'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth.context'
import { useUserReservations, useCancelReservation } from '@/hooks'
import { ReservationCard } from '@/components/reservations/reservation-card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function ReservationsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { data: reservations, isLoading } = useUserReservations(user?.id || '')
  const cancelReservation = useCancelReservation()

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
          <h1 className="text-xl font-semibold">Mis Reservas</h1>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando reservas...</p>
          </div>
        ) : !reservations || reservations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tienes reservas activas.</p>
            <Link href="/catalog">
              <Button className="mt-4">Explorar catálogo</Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reservations.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                onCancel={async (id) => {
                  if (confirm('¿Estás seguro de cancelar esta reserva?')) {
                    try {
                      await cancelReservation.mutateAsync(id)
                      alert('Reserva cancelada con éxito')
                    } catch {
                      alert('Error al cancelar la reserva')
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
