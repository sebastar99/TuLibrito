-- Script para crear un usuario administrador
-- Primero regístrate en la aplicación con admin@tulibrito.com
-- Luego ejecuta este script para convertirlo en administrador

UPDATE profiles 
SET role = 'ADMIN' 
WHERE email = 'admin@tulibrito.com';

-- Verificar el cambio
SELECT id, email, full_name, role, created_at 
FROM profiles 
WHERE email = 'admin@tulibrito.com';
