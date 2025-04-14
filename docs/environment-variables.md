# Variables de Entorno

Este documento describe todas las variables de entorno necesarias para el funcionamiento de la aplicación.

## Configuración de Base de Datos

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DATABASE_URL` | URL de conexión a la base de datos PostgreSQL | `postgresql://user:password@localhost:5432/templo_de_tierra?schema=public` |

## Configuración de SMTP (Email)

### Configuración para Gmail
Para usar Gmail como servidor SMTP, sigue estos pasos:

1. **Habilitar la verificación en dos pasos**:
   - Ve a tu cuenta de Google
   - Ve a "Seguridad"
   - Activa la "Verificación en dos pasos"

2. **Crear una Contraseña de aplicación**:
   - Ve a tu cuenta de Google
   - Ve a "Seguridad"
   - Busca "Contraseñas de aplicación"
   - Selecciona "Otras (Nombre personalizado)"
   - Dale un nombre como "Templo de Tierra SMTP"
   - Google te dará una contraseña de 16 caracteres

3. **Configurar las variables de entorno**:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `SMTP_HOST` | Servidor SMTP para Gmail | `smtp.gmail.com` |
| `SMTP_PORT` | Puerto del servidor SMTP para Gmail | `587` |
| `SMTP_SECURE` | Indica si se usa SSL/TLS | `false` |
| `SMTP_USER` | Tu dirección de Gmail | `tu-email@gmail.com` |
| `SMTP_PASSWORD` | La contraseña de 16 caracteres que te dio Google | `xxxx xxxx xxxx xxxx` |
| `SMTP_FROM` | Dirección de email del remitente | `Templo de Tierra <tu-email@gmail.com>` |

## Configuración de NextAuth (Autenticación)

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `NEXTAUTH_URL` | URL base de la aplicación | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Clave secreta para NextAuth | `tu-clave-secreta` |

## Configuración de OAuth (Google)

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `GOOGLE_CLIENT_ID` | ID del cliente de Google OAuth | `tu-client-id.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Secreto del cliente de Google OAuth | `tu-client-secret` |

## Configuración de Recaptcha

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Clave del sitio para Google Recaptcha | `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI` |
| `RECAPTCHA_SECRET_KEY` | Clave secreta para Google Recaptcha | `6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe` |

## Configuración de Stripe (Pagos)

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `STRIPE_SECRET_KEY` | Clave secreta de Stripe | `sk_test_51...` |
| `STRIPE_WEBHOOK_SECRET` | Secreto para webhooks de Stripe | `whsec_...` |
| `STRIPE_PUBLISHABLE_KEY` | Clave pública de Stripe | `pk_test_51...` |

## Configuración de Cloudinary (Almacenamiento de Imágenes)

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `CLOUDINARY_CLOUD_NAME` | Nombre de la nube en Cloudinary | `tu-cloud-name` |
| `CLOUDINARY_API_KEY` | Clave API de Cloudinary | `tu-api-key` |
| `CLOUDINARY_API_SECRET` | Secreto API de Cloudinary | `tu-api-secret` |

## Configuración de la Aplicación

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `NODE_ENV` | Entorno de ejecución | `development` o `production` |
| `APP_URL` | URL base de la aplicación | `https://templodetierra.com` |

## Ejemplo de Archivo .env

```env
# Base de Datos
DATABASE_URL="postgresql://user:password@localhost:5432/templo_de_tierra?schema=public"

# SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-email@gmail.com
SMTP_PASSWORD=xxxx xxxx xxxx xxxx
SMTP_FROM=Templo de Tierra <tu-email@gmail.com>

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-clave-secreta

# Google OAuth
GOOGLE_CLIENT_ID=tu-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu-client-secret

# Recaptcha
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
RECAPTCHA_SECRET_KEY=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe

# Stripe
STRIPE_SECRET_KEY=sk_test_51...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PUBLISHABLE_KEY=pk_test_51...

# Cloudinary
CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret

# Aplicación
NODE_ENV=development
APP_URL=http://localhost:3000
```

## Notas Importantes

1. **Seguridad**: Nunca compartas o commits archivos `.env` que contengan valores reales.
2. **Desarrollo**: Usa el archivo `.env.example` como plantilla para crear tu `.env` local.
3. **Producción**: Asegúrate de configurar todas las variables necesarias en tu entorno de producción.
4. **Validación**: La aplicación valida la presencia de estas variables al iniciar. 