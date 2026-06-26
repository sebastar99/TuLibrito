import { z } from 'zod'

export const authSchema = {
  signIn: z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  }),
  
  signUp: z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    fullName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  }),
  
  resetPassword: z.object({
    email: z.string().email('Email inválido'),
  }),
  
  updateProfile: z.object({
    fullName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
  }),
}

export const bookSchema = {
  create: z.object({
    title: z.string().min(1, 'El título es requerido'),
    isbn: z.string().min(1, 'El ISBN es requerido'),
    description: z.string().optional(),
    cover_url: z.string().url('URL inválida').optional().or(z.literal('')),
    author_id: z.string().uuid('ID de autor inválido'),
    category_id: z.string().uuid('ID de categoría inválido'),
    total_copies: z.number().int().min(1, 'Debe haber al menos 1 copia'),
    available_copies: z.number().int().min(0, 'Las copias disponibles no pueden ser negativas'),
    published_year: z.number().int().min(1000).max(2100).optional(),
  }),
  
  update: z.object({
    title: z.string().min(1, 'El título es requerido').optional(),
    isbn: z.string().min(1, 'El ISBN es requerido').optional(),
    description: z.string().optional(),
    cover_url: z.string().url('URL inválida').optional().or(z.literal('')),
    author_id: z.string().uuid('ID de autor inválido').optional(),
    category_id: z.string().uuid('ID de categoría inválido').optional(),
    total_copies: z.number().int().min(1, 'Debe haber al menos 1 copia').optional(),
    available_copies: z.number().int().min(0, 'Las copias disponibles no pueden ser negativas').optional(),
    published_year: z.number().int().min(1000).max(2100).optional(),
  }),
}

export const authorSchema = {
  create: z.object({
    name: z.string().min(1, 'El nombre es requerido'),
    bio: z.string().optional(),
  }),
  
  update: z.object({
    name: z.string().min(1, 'El nombre es requerido').optional(),
    bio: z.string().optional(),
  }),
}

export const categorySchema = {
  create: z.object({
    name: z.string().min(1, 'El nombre es requerido'),
    description: z.string().optional(),
  }),
  
  update: z.object({
    name: z.string().min(1, 'El nombre es requerido').optional(),
    description: z.string().optional(),
  }),
}

export const reservationSchema = {
  create: z.object({
    user_id: z.string().uuid('ID de usuario inválido'),
    book_id: z.string().uuid('ID de libro inválido'),
    due_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Fecha de devolución inválida',
    }),
  }),
}
