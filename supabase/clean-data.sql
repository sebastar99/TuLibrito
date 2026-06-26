-- Script para limpiar todos los datos existentes
-- Ejecuta esto antes de ejecutar seed-books.sql si hay datos duplicados

-- Eliminar en orden inverso para respetar foreign keys
DELETE FROM favorites;
DELETE FROM reservations;
DELETE FROM books;
DELETE FROM categories;
DELETE FROM authors;
DELETE FROM profiles;

-- Verificar que las tablas estén vacías
SELECT 'Autores:' as tipo, COUNT(*) as total FROM authors
UNION ALL
SELECT 'Categorías:', COUNT(*) FROM categories
UNION ALL
SELECT 'Libros:', COUNT(*) FROM books
UNION ALL
SELECT 'Reservas:', COUNT(*) FROM reservations
UNION ALL
SELECT 'Favoritos:', COUNT(*) FROM favorites
UNION ALL
SELECT 'Profiles:', COUNT(*) FROM profiles;
