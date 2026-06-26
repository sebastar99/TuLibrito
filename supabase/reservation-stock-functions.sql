-- Funciones RPC para manejar reservas con actualización de stock

-- Función para crear reserva y disminuir stock
CREATE OR REPLACE FUNCTION create_reservation_with_stock(
  p_user_id UUID,
  p_book_id UUID,
  p_due_date TIMESTAMP WITH TIME ZONE,
  p_status TEXT,
  p_reserved_at TIMESTAMP WITH TIME ZONE,
  p_returned_at TIMESTAMP WITH TIME ZONE
)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  book_id UUID,
  due_date TIMESTAMP WITH TIME ZONE,
  status TEXT,
  reserved_at TIMESTAMP WITH TIME ZONE,
  returned_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Verificar que haya stock disponible
  IF (SELECT b.available_copies FROM books b WHERE b.id = p_book_id) <= 0 THEN
    RAISE EXCEPTION 'No hay copias disponibles';
  END IF;

  -- Disminuir el stock del libro primero
  UPDATE books b
  SET available_copies = b.available_copies - 1,
      updated_at = NOW()
  WHERE b.id = p_book_id;

  -- Crear la reserva y devolverla directamente
  INSERT INTO reservations (user_id, book_id, due_date, status, reserved_at, returned_at)
  VALUES (p_user_id, p_book_id, p_due_date, p_status, p_reserved_at, p_returned_at);

  -- Devolver la reserva creada usando los datos de inserción
  RETURN QUERY
  SELECT r.id, r.user_id, r.book_id, r.due_date, r.status, r.reserved_at, r.returned_at, r.created_at, r.updated_at
  FROM reservations r
  WHERE r.user_id = p_user_id 
    AND r.book_id = p_book_id 
    AND r.reserved_at = p_reserved_at
  ORDER BY r.created_at DESC
  LIMIT 1;
END;
$$;

-- Función para cancelar reserva y devolver stock
CREATE OR REPLACE FUNCTION cancel_reservation_with_stock(p_reservation_id UUID)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  book_id UUID,
  due_date TIMESTAMP WITH TIME ZONE,
  status TEXT,
  reserved_at TIMESTAMP WITH TIME ZONE,
  returned_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_book_id UUID;
  v_total_copies INTEGER;
  v_available_copies INTEGER;
BEGIN
  -- Obtener el book_id y datos del libro de la reserva
  SELECT r.book_id, b.total_copies, b.available_copies
  INTO v_book_id, v_total_copies, v_available_copies
  FROM reservations r
  JOIN books b ON r.book_id = b.id
  WHERE r.id = p_reservation_id;

  -- Cancelar la reserva
  UPDATE reservations r
  SET status = 'cancelled',
      updated_at = NOW()
  WHERE r.id = p_reservation_id;

  -- Devolver el stock al libro solo si no excede el total
  IF v_available_copies < v_total_copies THEN
    UPDATE books b
    SET available_copies = b.available_copies + 1,
        updated_at = NOW()
    WHERE b.id = v_book_id;
  END IF;

  RETURN QUERY
  SELECT r.id, r.user_id, r.book_id, r.due_date, r.status, r.reserved_at, r.returned_at, r.created_at, r.updated_at
  FROM reservations r
  WHERE r.id = p_reservation_id;
END;
$$;

-- Función para marcar como devuelto y devolver stock
CREATE OR REPLACE FUNCTION mark_as_returned_with_stock(p_reservation_id UUID)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  book_id UUID,
  due_date TIMESTAMP WITH TIME ZONE,
  status TEXT,
  reserved_at TIMESTAMP WITH TIME ZONE,
  returned_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_book_id UUID;
  v_total_copies INTEGER;
  v_available_copies INTEGER;
BEGIN
  -- Obtener el book_id y datos del libro de la reserva
  SELECT r.book_id, b.total_copies, b.available_copies
  INTO v_book_id, v_total_copies, v_available_copies
  FROM reservations r
  JOIN books b ON r.book_id = b.id
  WHERE r.id = p_reservation_id;

  -- Marcar como devuelto
  UPDATE reservations r
  SET status = 'returned',
      returned_at = NOW(),
      updated_at = NOW()
  WHERE r.id = p_reservation_id;

  -- Devolver el stock al libro solo si no excede el total
  IF v_available_copies < v_total_copies THEN
    UPDATE books b
    SET available_copies = b.available_copies + 1,
        updated_at = NOW()
    WHERE b.id = v_book_id;
  END IF;

  RETURN QUERY
  SELECT r.id, r.user_id, r.book_id, r.due_date, r.status, r.reserved_at, r.returned_at, r.created_at, r.updated_at
  FROM reservations r
  WHERE r.id = p_reservation_id;
END;
$$;
