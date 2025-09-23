/**
 * Valida que todas las variables de entorno necesarias estén presentes.
 * @throws Error si alguna variable requerida no está definida
 */
export function validateEnv() {
  const requiredEnvVars = [
    // Database
    'DATABASE_URL',

    // Aplicación básica
    'NODE_ENV'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(
      `Faltan las siguientes variables de entorno: ${missingVars.join(', ')}. ` +
      'Por favor, revisa el archivo docs/environment-variables.md para más información.'
    );
  }
} 