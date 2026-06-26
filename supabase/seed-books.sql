-- Script para cargar datos de ejemplo: autores, categorías y libros

-- Insertar autores
INSERT INTO authors (name, bio) VALUES
('Gabriel García Márquez', 'Escritor colombiano, premio Nobel de Literatura en 1982.'),
('J.K. Rowling', 'Escritora británica, autora de la serie Harry Potter.'),
('George Orwell', 'Escritor inglés, autor de 1984 y Rebelión en la granja.'),
('Jane Austen', 'Escritora inglesa, autora de Orgullo y Prejuicio.'),
('Stephen King', 'Escritor estadounidense, maestro del terror y la ficción.'),
('Isabel Allende', 'Escritora chilena, autora de La casa de los espíritus.'),
('Haruki Murakami', 'Escritor japonés, autor de 1Q84 y Norwegian Wood.'),
('J.R.R. Tolkien', 'Escritor inglés, creador de El Señor de los Anillos.');

-- Insertar categorías
INSERT INTO categories (name, description) VALUES
('Ficción', 'Obras de ficción literaria y narrativa'),
('Fantasía', 'Libros de fantasía y mundos imaginarios'),
('Ciencia Ficción', 'Obras de ciencia ficción y futurismo'),
('Terror', 'Libros de terror y suspenso'),
('Romance', 'Novelas románticas y de amor'),
('Misterio', 'Libros de misterio y detectives'),
('Clásicos', 'Obras clásicas de la literatura mundial'),
('No Ficción', 'Libros de no ficción y ensayos');

-- Insertar libros (nota: necesitas los IDs de autores y categorías insertados arriba)
-- Reemplaza los UUIDs con los IDs reales después de insertar autores y categorías

-- Ejemplo de inserción de libros (ajusta los UUIDs según tus datos reales)
INSERT INTO books (title, isbn, description, cover_url, author_id, category_id, total_copies, available_copies, published_year) VALUES
('Cien años de soledad', '978-0307474728', 'Obra maestra del realismo mágico que narra la historia de la familia Buendía.', 'https://example.com/cien-anos.jpg', (SELECT id FROM authors WHERE name = 'Gabriel García Márquez'), (SELECT id FROM categories WHERE name = 'Clásicos'), 5, 5, 1967),
('Harry Potter y la piedra filosofal', '978-0590353427', 'El primer libro de la saga del joven mago Harry Potter.', 'https://example.com/harry-potter.jpg', (SELECT id FROM authors WHERE name = 'J.K. Rowling'), (SELECT id FROM categories WHERE name = 'Fantasía'), 10, 8, 1997),
('1984', '978-0451524935', 'Distopía clásica sobre un estado totalitario y vigilancia masiva.', 'https://example.com/1984.jpg', (SELECT id FROM authors WHERE name = 'George Orwell'), (SELECT id FROM categories WHERE name = 'Ciencia Ficción'), 3, 2, 1949),
('Orgullo y Prejuicio', '978-0141439518', 'Novela romántica clásica sobre Elizabeth Bennet y Mr. Darcy.', 'https://example.com/orgullo-prejuicio.jpg', (SELECT id FROM authors WHERE name = 'Jane Austen'), (SELECT id FROM categories WHERE name = 'Romance'), 4, 4, 1813),
('El resplandor', '978-0307743657', 'Novela de terror sobre un hotel aislado y su descenso a la locura.', 'https://example.com/resplandor.jpg', (SELECT id FROM authors WHERE name = 'Stephen King'), (SELECT id FROM categories WHERE name = 'Terror'), 2, 1, 1977),
('La casa de los espíritus', '978-1501117015', 'Saga familiar que abarca varias generaciones en Chile.', 'https://example.com/casa-espiritus.jpg', (SELECT id FROM authors WHERE name = 'Isabel Allende'), (SELECT id FROM categories WHERE name = 'Ficción'), 3, 3, 1982),
('Norwegian Wood', '978-0375704024', 'Novela de coming-of-age ambientada en el Japón de los años 60.', 'https://example.com/norwegian-wood.jpg', (SELECT id FROM authors WHERE name = 'Haruki Murakami'), (SELECT id FROM categories WHERE name = 'Ficción'), 2, 2, 1987),
('El Señor de los Anillos', '978-0544003415', 'Trilogía épica de fantasía sobre la lucha contra el mal.', 'https://example.com/senor-anillos.jpg', (SELECT id FROM authors WHERE name = 'J.R.R. Tolkien'), (SELECT id FROM categories WHERE name = 'Fantasía'), 4, 3, 1954);

-- Verificar los datos insertados
SELECT 'Autores:' as tipo, COUNT(*) as total FROM authors
UNION ALL
SELECT 'Categorías:', COUNT(*) FROM categories
UNION ALL
SELECT 'Libros:', COUNT(*) FROM books;
