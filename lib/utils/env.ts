/**
 * Valida que todas las variables de entorno necesarias estén presentes.
 * @throws Error si alguna variable requerida no está definida
 */
export function validateEnv() {
  const requiredEnvVars = [
    // Supabase
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',

    // SMTP
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_SECURE',
    'SMTP_USER',
    'SMTP_PASSWORD',
    'SMTP_FROM',

    // NextAuth
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET',

    // Recaptcha
    'NEXT_PUBLIC_RECAPTCHA_SITE_KEY',
    'RECAPTCHA_SECRET_KEY',

    // Stripe
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'STRIPE_PUBLISHABLE_KEY',

    // Cloudinary
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',

    // Aplicación
    'NODE_ENV',
    'APP_URL'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(
      `Faltan las siguientes variables de entorno: ${missingVars.join(', ')}. ` +
      'Por favor, revisa el archivo docs/environment-variables.md para más información.'
    );
  }
} 