export type Role = 'ADMIN' | 'USER'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  role: Role
  created_at: string
  updated_at: string
}

export interface Author {
  id: string
  name: string
  bio: string | null
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  description: string | null
  created_at: string
  updated_at: string
}

export interface Book {
  id: string
  title: string
  isbn: string
  description: string | null
  cover_url: string | null
  author_id: string
  category_id: string
  total_copies: number
  available_copies: number
  published_year: number
  created_at: string
  updated_at: string
  author?: Author
  category?: Category
}

export interface Reservation {
  id: string
  user_id: string
  book_id: string
  reserved_at: string
  due_date: string
  returned_at: string | null
  status: 'active' | 'returned' | 'cancelled'
  created_at: string
  updated_at: string
  book?: Book
}

export interface Favorite {
  id: string
  user_id: string
  book_id: string
  created_at: string
  book?: Book
}
