'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Book, X } from 'lucide-react'
import type { Favorite } from '@/types'

interface FavoriteCardProps {
  favorite: Favorite
  onRemove?: (id: string) => void
}

export function FavoriteCard({ favorite, onRemove }: FavoriteCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="aspect-[2/3] w-24 bg-muted rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
            {favorite.book?.cover_url ? (
              <img
                src={favorite.book.cover_url}
                alt={favorite.book.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <Book className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <Link href={`/books/${favorite.book_id}`}>
              <h3 className="font-semibold line-clamp-2 hover:text-primary cursor-pointer">
                {favorite.book?.title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-1">{favorite.book?.author?.name}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {favorite.book?.category?.name}
              </Badge>
            </div>
          </div>
        </div>
        {onRemove && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-4 text-destructive hover:text-destructive"
            onClick={() => onRemove(favorite.id)}
          >
            <X className="w-4 h-4 mr-2" />
            Eliminar de favoritos
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
