# Arquitectura del Proyecto - Templo de Tierra

## Visión General

Templo de Tierra es una aplicación web construida con Next.js 14, utilizando el App Router y siguiendo las mejores prácticas de desarrollo moderno. La aplicación permite a los usuarios reservar estancias en diferentes templos, gestionar sus reservas y explorar las experiencias disponibles.

## Tecnologías Principales

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Base de Datos**: PostgreSQL con Prisma ORM
- **Autenticación**: NextAuth.js
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Formularios**: React Hook Form
- **Fechas**: date-fns
- **Emails**: Resend
- **Validación**: Zod

## Estructura del Proyecto

```
templo-de-tierra-v2/
├── app/                    # Directorio principal de la aplicación (Next.js App Router)
│   ├── api/               # Endpoints de la API
│   │   ├── auth/         # Endpoints de autenticación
│   │   └── reservas/     # Endpoints de reservas
│   ├── auth/             # Páginas de autenticación
│   │   ├── signin/       # Inicio de sesión
│   │   ├── signout/      # Cierre de sesión
│   │   └── register/     # Registro
│   ├── reservas/         # Páginas de reservas
│   │   ├── [id]/        # Detalles de reserva
│   │   └── page.tsx     # Lista de reservas
│   ├── templos/          # Páginas de templos
│   │   ├── [slug]/      # Detalles de templo
│   │   └── page.tsx     # Lista de templos
│   └── experiencias/     # Páginas de experiencias
├── components/           # Componentes reutilizables
│   ├── ui/              # Componentes de UI básicos
│   └── forms/           # Componentes de formularios
├── lib/                 # Utilidades y configuraciones
│   ├── auth/           # Configuración de autenticación
│   ├── prisma/         # Cliente y configuración de Prisma
│   └── models/         # Tipos y modelos de datos
├── public/             # Archivos estáticos
│   ├── images/        # Imágenes
│   └── logo/          # Logos
└── prisma/            # Esquema y migraciones de Prisma
```

## Componentes Principales

### Navegación
- `Navbar`: Barra de navegación principal con menú desplegable y autenticación
- `PageLayout`: Componente contenedor para todas las páginas
- `MobileMenu`: Menú móvil responsive

### Autenticación
- `SignInForm`: Formulario de inicio de sesión
- `RegisterForm`: Formulario de registro
- `RequireAuth`: HOC para proteger rutas privadas

### Reservas
- `ReservaDetails`: Detalles de una reserva
- `ReservasList`: Lista de reservas del usuario
- `ReservaForm`: Formulario para crear/editar reservas

### Templos
- `TemploCard`: Tarjeta de presentación de templo
- `TemploDetails`: Detalles completos de un templo
- `TemploGallery`: Galería de imágenes del templo

## Flujos de Datos

1. **Autenticación**:
   - Utiliza NextAuth.js con proveedor de credenciales
   - Almacena sesiones en la base de datos
   - Maneja tokens JWT para la autenticación

2. **Reservas**:
   - Validación de fechas y disponibilidad
   - Cálculo de precios
   - Confirmación por email
   - Estados de reserva (PENDIENTE, CONFIRMADA, CANCELADA)

3. **Templos**:
   - Información detallada
   - Galería de imágenes
   - Disponibilidad y precios
   - Características y amenidades

## Sistema de Diseño

### Colores
- Principal: `#6F4C21` (Marrón)
- Secundario: `#F5DC90` (Amarillo)
- Fondos: `#F5DC90/20` (Amarillo claro)
- Estados:
  - Éxito: Verde
  - Error: Rojo
  - Pendiente: Amarillo

### Tipografía
- Títulos: Font Heading
- Texto: Font Sans
- Tamaños responsivos

### Componentes UI
- Botones
- Inputs
- Cards
- Tablas
- Modales
- Dropdowns

## Seguridad

- Autenticación segura con NextAuth.js
- Validación de datos con Zod
- Protección CSRF
- Sanitización de inputs
- Manejo seguro de contraseñas
- Rate limiting en API endpoints

## Rendimiento

- Optimización de imágenes
- Lazy loading de componentes
- Caching de datos
- Optimización de fuentes
- Minificación de assets

## Consideraciones de Desarrollo

- TypeScript strict mode
- ESLint para calidad de código
- Prettier para formateo
- Husky para pre-commit hooks
- Testing con Jest y Testing Library
- CI/CD con GitHub Actions 