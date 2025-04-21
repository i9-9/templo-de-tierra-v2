// Funciones de autenticación seguras para usar en el lado del cliente
import { signOut as nextAuthSignOut } from 'next-auth/react'

// Función de cierre de sesión segura para el cliente
export async function signOut() {
  return nextAuthSignOut({ callbackUrl: '/' })
} 