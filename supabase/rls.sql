-- Row Level Security Policies

-- Habilitar RLS en todas las tablas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes antes de crear nuevas
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update any profile" ON profiles;

DROP POLICY IF EXISTS "Authenticated users can view authors" ON authors;
DROP POLICY IF EXISTS "Admins can create authors" ON authors;
DROP POLICY IF EXISTS "Admins can update authors" ON authors;
DROP POLICY IF EXISTS "Admins can delete authors" ON authors;

DROP POLICY IF EXISTS "Authenticated users can view categories" ON categories;
DROP POLICY IF EXISTS "Admins can create categories" ON categories;
DROP POLICY IF EXISTS "Admins can update categories" ON categories;
DROP POLICY IF EXISTS "Admins can delete categories" ON categories;

DROP POLICY IF EXISTS "Authenticated users can view books" ON books;
DROP POLICY IF EXISTS "Admins can create books" ON books;
DROP POLICY IF EXISTS "Admins can update books" ON books;
DROP POLICY IF EXISTS "Admins can delete books" ON books;

DROP POLICY IF EXISTS "Users can view own reservations" ON reservations;
DROP POLICY IF EXISTS "Admins can view all reservations" ON reservations;
DROP POLICY IF EXISTS "Users can create reservations" ON reservations;
DROP POLICY IF EXISTS "Admins can create reservations" ON reservations;
DROP POLICY IF EXISTS "Users can cancel own reservations" ON reservations;
DROP POLICY IF EXISTS "Admins can update any reservation" ON reservations;

DROP POLICY IF EXISTS "Users can view own favorites" ON favorites;
DROP POLICY IF EXISTS "Admins can view all favorites" ON favorites;
DROP POLICY IF EXISTS "Users can create favorites" ON favorites;
DROP POLICY IF EXISTS "Users can delete own favorites" ON favorites;
DROP POLICY IF EXISTS "Admins can delete any favorite" ON favorites;

-- POLÍTICAS PARA PROFILES

-- Permitir a usuarios ver su propio perfil
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Permitir a usuarios actualizar su propio perfil
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Permitir a ADMIN ver todos los perfiles
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (auth.email() = 'admin2@tulibrito.com');

-- Permitir a ADMIN actualizar cualquier perfil
CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE
  USING (auth.email() = 'admin2@tulibrito.com');

-- POLÍTICAS PARA AUTHORS

-- Permitir lectura a todos los usuarios autenticados
CREATE POLICY "Authenticated users can view authors"
  ON authors FOR SELECT
  USING (auth.role() = 'authenticated');

-- Permitir a ADMIN crear autores
CREATE POLICY "Admins can create authors"
  ON authors FOR INSERT
  WITH CHECK (auth.email() = 'admin2@tulibrito.com');

-- Permitir a ADMIN actualizar autores
CREATE POLICY "Admins can update authors"
  ON authors FOR UPDATE
  USING (auth.email() = 'admin2@tulibrito.com');

-- Permitir a ADMIN eliminar autores
CREATE POLICY "Admins can delete authors"
  ON authors FOR DELETE
  USING (auth.email() = 'admin2@tulibrito.com');

-- POLÍTICAS PARA CATEGORIES

-- Permitir lectura a todos los usuarios autenticados
CREATE POLICY "Authenticated users can view categories"
  ON categories FOR SELECT
  USING (auth.role() = 'authenticated');

-- Permitir a ADMIN crear categorías
CREATE POLICY "Admins can create categories"
  ON categories FOR INSERT
  WITH CHECK (auth.email() = 'admin2@tulibrito.com');

-- Permitir a ADMIN actualizar categorías
CREATE POLICY "Admins can update categories"
  ON categories FOR UPDATE
  USING (auth.email() = 'admin2@tulibrito.com');

-- Permitir a ADMIN eliminar categorías
CREATE POLICY "Admins can delete categories"
  ON categories FOR DELETE
  USING (auth.email() = 'admin2@tulibrito.com');

-- POLÍTICAS PARA BOOKS

-- Permitir lectura a todos los usuarios autenticados
CREATE POLICY "Authenticated users can view books"
  ON books FOR SELECT
  USING (auth.role() = 'authenticated');

-- Permitir a ADMIN crear libros
CREATE POLICY "Admins can create books"
  ON books FOR INSERT
  WITH CHECK (auth.email() = 'admin2@tulibrito.com');

-- Permitir a ADMIN actualizar libros
CREATE POLICY "Admins can update books"
  ON books FOR UPDATE
  USING (auth.email() = 'admin2@tulibrito.com');

-- Permitir a ADMIN eliminar libros
CREATE POLICY "Admins can delete books"
  ON books FOR DELETE
  USING (auth.email() = 'admin2@tulibrito.com');

-- POLÍTICAS PARA RESERVATIONS

-- Permitir a usuarios ver sus propias reservas
CREATE POLICY "Users can view own reservations"
  ON reservations FOR SELECT
  USING (auth.uid() = user_id);

-- Permitir a ADMIN ver todas las reservas
CREATE POLICY "Admins can view all reservations"
  ON reservations FOR SELECT
  USING (auth.email() = 'admin2@tulibrito.com');

-- Permitir a usuarios crear reservas
CREATE POLICY "Users can create reservations"
  ON reservations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Permitir a ADMIN crear reservas
CREATE POLICY "Admins can create reservations"
  ON reservations FOR INSERT
  WITH CHECK (auth.email() = 'admin2@tulibrito.com');

-- Permitir a usuarios cancelar sus propias reservas activas
CREATE POLICY "Users can cancel own reservations"
  ON reservations FOR UPDATE
  USING (
    auth.uid() = user_id
    AND status = 'active'
  )
  WITH CHECK (
    auth.uid() = user_id
    AND status = 'cancelled'
  );

-- Permitir a ADMIN actualizar cualquier reserva
CREATE POLICY "Admins can update any reservation"
  ON reservations FOR UPDATE
  USING (auth.email() = 'admin2@tulibrito.com');

-- POLÍTICAS PARA FAVORITES

-- Permitir a usuarios ver sus propios favoritos
CREATE POLICY "Users can view own favorites"
  ON favorites FOR SELECT
  USING (auth.uid() = user_id);

-- Permitir a ADMIN ver todos los favoritos
CREATE POLICY "Admins can view all favorites"
  ON favorites FOR SELECT
  USING (auth.email() = 'admin2@tulibrito.com');

-- Permitir a usuarios crear favoritos
CREATE POLICY "Users can create favorites"
  ON favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Permitir a usuarios eliminar sus propios favoritos
CREATE POLICY "Users can delete own favorites"
  ON favorites FOR DELETE
  USING (auth.uid() = user_id);

-- Permitir a ADMIN eliminar cualquier favorito
CREATE POLICY "Admins can delete any favorite"
  ON favorites FOR DELETE
  USING (auth.email() = 'admin2@tulibrito.com');
