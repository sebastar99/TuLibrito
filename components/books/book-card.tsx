'use client'

import Link from 'next/link'
import { Book } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Book as BookType } from '@/types'

interface BookCardProps {
  book: BookType
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/books/${book.id}`}>
      <Card className="h-full transition-colors hover:bg-accent cursor-pointer">
        <CardContent className="p-4">
          <div className="aspect-[2/3] bg-muted rounded-lg flex items-center justify-center mb-4 overflow-hidden">
            {book.cover_url ? (
              <img
                src={book.cover_url}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <Book className="w-16 h-16 text-muted-foreground" />
            )}
          </div>
          <h3 className="font-semibold line-clamp-2 mb-2">{book.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{book.author?.name}</p>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              {book.category?.name}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {book.available_copies > 0 ? (
              <span className="text-green-600">{book.available_copies} disponibles</span>
            ) : (
              <span className="text-red-600">Sin stock</span>
            )}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
