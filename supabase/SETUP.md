# Configuración de Supabase

## Pasos para configurar Supabase

### 1. Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto llamado "TuLibrito"
4. Espera a que el proyecto se inicialice (puede tardar unos minutos)

### 2. Obtener credenciales

Una vez creado el proyecto:

1. Ve a **Settings** → **API**
2. Copia:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Ejecutar scripts SQL

Ve al **SQL Editor** en Supabase y ejecuta los siguientes scripts en orden:

#### 4.1. Esquema de base de datos

Ejecuta el contenido de `supabase/schema.sql`:
- Crea las tablas: profiles, authors, categories, books, reservations, favorites
- Configura relaciones (foreign keys)
- Crea índices para optimizar consultas
- Configura triggers para actualizar `updated_at` automáticamente
- Configura trigger para crear profile automáticamente al registrar usuario

#### 4.2. Row Level Security (RLS)

Ejecuta el contenido de `supabase/rls.sql`:
- Habilita RLS en todas las tablas
- Configura políticas para roles ADMIN y USER
- Asegura que los usuarios solo puedan acceder a sus propios datos
- Permite a los administradores acceder a todos los datos

### 5. Crear el primer usuario administrador

Después de configurar el esquema y RLS:

1. Ve a **Authentication** → **Users**
2. Crea un nuevo usuario manualmente
3. Ve al **SQL Editor** y ejecuta:

```sql
UPDATE profiles 
SET role = 'ADMIN' 
WHERE email = 'admin@example.com';
```

Reemplaza `admin@example.com` con el email del usuario que quieras hacer administrador.

### 6. Verificar configuración

Para verificar que todo está funcionando:

1. Inicia el proyecto: `npm run dev`
2. Navega a `http://localhost:3000`
3. Intenta registrarte con el usuario administrador
4. Verifica que el profile se creó automáticamente en la tabla `profiles`

## Estructura de la base de datos

### Tablas

- **profiles**: Información de usuarios y roles
- **authors**: Autores de libros
- **categories**: Categorías de libros
- **books**: Catálogo de libros
- **reservations**: Reservas de libros
- **favorites**: Libros favoritos de usuarios

### Relaciones

- `books.author_id` → `authors.id`
- `books.category_id` → `categories.id`
- `reservations.user_id` → `profiles.id`
- `reservations.book_id` → `books.id`
- `favorites.user_id` → `profiles.id`
- `favorites.book_id` → `books.id`

### Roles

- **USER**: Puede ver libros, reservar, cancelar reservas, gestionar favoritos y editar su perfil
- **ADMIN**: Tiene todos los permisos de USER más capacidad de gestionar libros, autores, categorías, reservas y usuarios
