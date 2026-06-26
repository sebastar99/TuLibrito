'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, X } from 'lucide-react'
import { formatDate } from '@/utils/date'
import type { Reservation } from '@/types'

interface ReservationCardProps {
  reservation: Reservation
  onCancel?: (id: string) => void
}

export function ReservationCard({ reservation, onCancel }: ReservationCardProps) {
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
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{reservation.book?.title}</CardTitle>
          <Badge className={statusColors[reservation.status]}>
            {statusLabels[reservation.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Reservado: {formatDate(reservation.reserved_at)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Devolución: {formatDate(reservation.due_date)}</span>
        </div>
        {reservation.status === 'active' && onCancel && (
          <Button
            variant="destructive"
            size="sm"
            className="w-full mt-4"
            onClick={() => onCancel(reservation.id)}
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar reserva
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
