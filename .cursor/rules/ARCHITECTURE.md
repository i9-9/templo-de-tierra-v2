# Arquitectura de la Aplicación

## Visión General

Templo de Tierra es una aplicación web construida con Next.js 14, utilizando el App Router y siguiendo las mejores prácticas de desarrollo moderno. La aplicación permite a los usuarios reservar estancias en diferentes templos, gestionar sus reservas y explorar las experiencias disponibles.

## Tecnologías Principales

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Base de Datos**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Autenticación**: NextAuth.js
- **Estilos**: TailwindCSS
- **Email**: Resend
- **Seguridad**: reCAPTCHA v3
- **Deploy**: Vercel

## Estructura de Base de Datos (Supabase)

### Configuración
- Connection Pooling habilitado (puerto 6543)
- Conexión directa disponible (puerto 5432)
- Row Level Security (RLS) implementado para seguridad

### Modelos Principales
- User (autenticación y perfil)
- Templo (alojamientos)
- Reserva (reservaciones)
- Favorito (templos guardados)

## Autenticación

- NextAuth.js para manejo de sesiones
- Google OAuth como proveedor principal
- Sesiones JWT almacenadas en cookies
- Middleware para protección de rutas

## API Routes

- `/api/reservas`: Gestión de reservaciones
- `/api/templos`: CRUD de templos
- `/api/admin`: Endpoints administrativos
- `/api/email`: Servicio de emails

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

## Consideraciones de Diseño

### Navbar Fijo
La aplicación utiliza un navbar fijo en la parte superior de la pantalla. Esto tiene las siguientes implicaciones:

1. **Altura del Navbar**: El navbar tiene una altura fija de 120px (`h-[120px]`).
2. **Espaciado de Contenido**: 
   - Todas las páginas deben comenzar con un padding-top de 120px (`pt-[120px]`) para evitar que el contenido se oculte detrás del navbar.
   - Los elementos que necesiten posicionamiento absoluto o fijo deben tener en cuenta esta altura.
3. **Z-index**: El navbar tiene un z-index alto para asegurar que siempre esté por encima del contenido.
4. **Responsive**: El navbar se adapta a diferentes tamaños de pantalla, manteniendo su posición fija.

Ejemplo de implementación en páginas:
```tsx
<main className="pt-[120px]">
  {/* Contenido de la página */}
</main>
```

## Deployment (Vercel)

### Variables de Entorno
```env
DATABASE_URL=postgres://...
DIRECT_URL=postgres://...
NEXTAUTH_URL=https://...
NEXTAUTH_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
RESEND_API_KEY=...
RECAPTCHA_KEYS=...
```

### Configuración
- Build Command: `prisma generate && prisma db push && next build`
- Node.js Version: 18.x
- Framework Preset: Next.js
- Región: iad1 (US East)

### Optimizaciones
- Connection Pooling para base de datos
- Imágenes optimizadas con Next/Image
- Componentes del lado del cliente minimizados
- Caching y revalidación configurados

## Mantenimiento

### Desarrollo Local
1. Clonar repositorio
2. Instalar dependencias: `npm install`
3. Configurar variables de entorno
4. Ejecutar migraciones: `npx prisma db push`
5. Iniciar servidor: `npm run dev`

### Producción
1. Merge a main dispara deploy automático
2. Vercel ejecuta build con Prisma
3. Variables de entorno de producción aplicadas
4. Migraciones ejecutadas automáticamente

## Monitoreo

- Vercel Analytics
- Error tracking
- Logs de base de datos
- Métricas de rendimiento

## Backups

- Supabase maneja backups automáticos
- Exportación manual disponible
- Point-in-time recovery configurado 