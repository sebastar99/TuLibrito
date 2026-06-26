-- Script para crear o convertir el usuario en administrador
-- Primero crea el usuario desde Authentication > Users o registrándote en la app.

INSERT INTO profiles (id, email, full_name, role)
SELECT id, email, COALESCE(raw_user_meta_data->>'full_name', 'Administrador'), 'ADMIN'
FROM auth.users
WHERE email = 'admin2@tulibrito.com'
ON CONFLICT (id) DO UPDATE
SET
  email = EXCLUDED.email,
  full_name = COALESCE(profiles.full_name, EXCLUDED.full_name),
  role = 'ADMIN',
  updated_at = NOW();

-- Verificar el cambio
SELECT id, email, full_name, role, created_at, updated_at
FROM profiles
WHERE email = 'admin2@tulibrito.com';
