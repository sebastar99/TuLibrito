'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth.context'
import { useUserReservations, useCancelReservation } from '@/hooks'
import { useModal } from '@/contexts/modal.context'
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
  const modal = useModal()

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
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center max-w-7xl">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Dashboard
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Mis Reservas</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {reservations.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                onCancel={async (id) => {
                  const confirmed = await modal.confirm({
                    title: 'Cancelar reserva',
                    description: '¿Estás seguro de cancelar esta reserva?',
                    variant: 'warning',
                    confirmText: 'Cancelar reserva',
                  })
                  if (!confirmed) return

                  try {
                    await cancelReservation.mutateAsync(id)
                    await modal.alert({
                      title: 'Reserva cancelada',
                      description: 'La reserva fue cancelada con éxito.',
                      variant: 'success',
                    })
                  } catch {
                    await modal.alert({
                      title: 'No se pudo cancelar',
                      description: 'Ocurrió un error al cancelar la reserva.',
                      variant: 'error',
                    })
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
