-- Row Level Security Policies

-- Habilitar RLS en todas las tablas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

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
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- Permitir a ADMIN actualizar cualquier perfil
CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- POLÍTICAS PARA AUTHORS

-- Permitir lectura a todos los usuarios autenticados
CREATE POLICY "Authenticated users can view authors"
  ON authors FOR SELECT
  USING (auth.role() = 'authenticated');

-- Permitir a ADMIN crear autores
CREATE POLICY "Admins can create authors"
  ON authors FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- Permitir a ADMIN actualizar autores
CREATE POLICY "Admins can update authors"
  ON authors FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- Permitir a ADMIN eliminar autores
CREATE POLICY "Admins can delete authors"
  ON authors FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- POLÍTICAS PARA CATEGORIES

-- Permitir lectura a todos los usuarios autenticados
CREATE POLICY "Authenticated users can view categories"
  ON categories FOR SELECT
  USING (auth.role() = 'authenticated');

-- Permitir a ADMIN crear categorías
CREATE POLICY "Admins can create categories"
  ON categories FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- Permitir a ADMIN actualizar categorías
CREATE POLICY "Admins can update categories"
  ON categories FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- Permitir a ADMIN eliminar categorías
CREATE POLICY "Admins can delete categories"
  ON categories FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- POLÍTICAS PARA BOOKS

-- Permitir lectura a todos los usuarios autenticados
CREATE POLICY "Authenticated users can view books"
  ON books FOR SELECT
  USING (auth.role() = 'authenticated');

-- Permitir a ADMIN crear libros
CREATE POLICY "Admins can create books"
  ON books FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- Permitir a ADMIN actualizar libros
CREATE POLICY "Admins can update books"
  ON books FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- Permitir a ADMIN eliminar libros
CREATE POLICY "Admins can delete books"
  ON books FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- POLÍTICAS PARA RESERVATIONS

-- Permitir a usuarios ver sus propias reservas
CREATE POLICY "Users can view own reservations"
  ON reservations FOR SELECT
  USING (auth.uid() = user_id);

-- Permitir a ADMIN ver todas las reservas
CREATE POLICY "Admins can view all reservations"
  ON reservations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- Permitir a usuarios crear reservas
CREATE POLICY "Users can create reservations"
  ON reservations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Permitir a ADMIN crear reservas
CREATE POLICY "Admins can create reservations"
  ON reservations FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

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
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- POLÍTICAS PARA FAVORITES

-- Permitir a usuarios ver sus propios favoritos
CREATE POLICY "Users can view own favorites"
  ON favorites FOR SELECT
  USING (auth.uid() = user_id);

-- Permitir a ADMIN ver todos los favoritos
CREATE POLICY "Admins can view all favorites"
  ON favorites FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

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
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );
