# TuLibrito

Sistema de gestión de reservas de biblioteca moderna construido con Next.js 15, Supabase y shadcn/ui.

## Características

- **Autenticación de usuarios**: Registro, login, recuperación de contraseña
- **Catálogo de libros**: Búsqueda, filtros por categoría y autor
- **Sistema de reservas**: Reserva de libros con fecha de devolución automática
- **Favoritos**: Guardar libros como favoritos
- **Perfil de usuario**: Edición de información personal
- **Panel administrativo**: Estadísticas del sistema
- **CRUD administrativo**: Gestión completa de libros, autores, categorías y reservas
- **Diseño responsive**: Optimizado para todos los dispositivos
- **UI moderna**: Componentes shadcn/ui con TailwindCSS

## Stack Tecnológico

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Estilos**: TailwindCSS, shadcn/ui
- **Backend**: Supabase (Base de datos, Auth, Storage)
- **State Management**: React Context API
- **Data Fetching**: TanStack Query (React Query)
- **Validación**: Zod
- **Fechas**: date-fns

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/sebastar99/TuLibrito.git
cd TuLibrito
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

4. Configurar Supabase:
   - Crear un proyecto en [Supabase](https://supabase.com)
   - Ejecutar el script SQL en `supabase/schema.sql`
   - Copiar las credenciales al archivo `.env`

5. Ejecutar el servidor de desarrollo:
```bash
npm run dev
```

6. Abrir [http://localhost:3000](http://localhost:3000)

## Configuración de Supabase

Sigue los pasos detallados en `supabase/SETUP.md` para configurar correctamente tu proyecto de Supabase.

## Scripts Disponibles

- `npm run dev` - Iniciar servidor de desarrollo
- `npm run build` - Compilar para producción
- `npm start` - Iniciar servidor de producción
- `npm run lint` - Ejecutar ESLint

## Estructura del Proyecto

```
TuLibrito/
├── app/                    # Páginas Next.js
│   ├── admin/             # Páginas administrativas
│   ├── books/             # Detalle de libro
│   ├── catalog/           # Catálogo de libros
│   ├── dashboard/         # Dashboard principal
│   ├── favorites/         # Favoritos del usuario
│   ├── login/             # Página de login
│   ├── profile/           # Perfil de usuario
│   ├── register/          # Página de registro
│   └── reservations/      # Reservas del usuario
├── components/            # Componentes React
│   ├── books/            # Componentes de libros
│   ├── favorites/        # Componentes de favoritos
│   ├── landing/          # Componentes de landing
│   ├── reservations/     # Componentes de reservas
│   └── ui/               # Componentes shadcn/ui
├── contexts/             # Contextos React
├── hooks/                # Custom hooks (TanStack Query)
├── services/             # Servicios de Supabase
├── supabase/             # Scripts y configuración de Supabase
├── types/                # Definiciones de tipos TypeScript
├── utils/                # Utilidades
└── lib/                  # Configuraciones de librerías
```

## Roles de Usuario

- **USER**: Puede reservar libros, gestionar favoritos, ver su perfil
- **ADMIN**: Tiene acceso a todas las funciones de USER más el panel administrativo y CRUD completo

## Usuarios de Prueba

Para probar la aplicación, puedes usar los siguientes usuarios de prueba:

### Administrador
- **Email**: `admin2@tulibrito.com`
- **Contraseña**: `123456`
- **Rol**: ADMIN
- **Acceso**: Panel administrativo completo (libros, autores, categorías, reservas)

### Usuario Normal
- **Email**: `usuario@tulibrito.com`
- **Contraseña**: `123456`
- **Rol**: USER
- **Acceso**: Catálogo, reservas, favoritos, perfil

**Nota**: Estos usuarios deben ser creados ejecutando los scripts SQL en Supabase SQL Editor:
1. Registrar los usuarios desde la aplicación (`/register`)
2. Ejecutar `supabase/create-admin.sql` para dar rol de administrador al usuario admin2@tulibrito.com

## Despliegue

### Vercel

1. Conectar el repositorio a Vercel
2. Configurar las variables de entorno en Vercel
3. Desplegar automáticamente

### Variables de Entorno Requeridas

- `NEXT_PUBLIC_SUPABASE_URL` - URL del proyecto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Clave anónima de Supabase

## Configuración de Base de Datos

Para configurar correctamente la base de datos de Supabase, ejecuta los siguientes scripts SQL en el SQL Editor de Supabase en el orden indicado:

### Paso 1: Crear estructura de la base de datos
Ejecuta `supabase/schema.sql` para crear todas las tablas necesarias.

### Paso 2: Configurar políticas RLS
Ejecuta `supabase/rls.sql` para configurar las políticas de seguridad a nivel de fila. Esto permite que el usuario `admin2@tulibrito.com` tenga acceso administrativo.

### Paso 3: Activar trigger automático de profiles
Ejecuta `supabase/update-trigger.sql` para activar el trigger que crea automáticamente el profile cuando un usuario se registra.

### Paso 4: Activar gestión automática de stock
Ejecuta `supabase/reservation-stock-functions.sql` para crear las funciones RPC que gestionan automáticamente el stock de libros al reservar, cancelar o devolver.

### Paso 5: Cargar libros de ejemplo (opcional)
Ejecuta `supabase/seed-books.sql` para cargar libros de ejemplo con imágenes reales de Open Library.

### Paso 6: Limpiar datos existentes (opcional)
Si necesitas limpiar todos los datos existentes, ejecuta `supabase/clean-data.sql` antes de cargar nuevos datos.

### Paso 7: Crear usuario administrador
1. Regístrate en la aplicación con el email `admin2@tulibrito.com` y contraseña `123456`
2. Ejecuta `supabase/create-admin.sql` para dar rol de administrador al usuario registrado

**Nota importante**: Los scripts deben ejecutarse en el orden indicado para evitar errores de dependencia entre tablas y políticas.
