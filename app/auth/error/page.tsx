'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return 'Hay un problema con la configuración del servidor.';
      case 'AccessDenied':
        return 'No tienes permiso para acceder a esta página.';
      case 'Verification':
        return 'El enlace de verificación ya no es válido o ha expirado.';
      case 'OAuthSignin':
        return 'Error al iniciar sesión con el proveedor seleccionado.';
      case 'OAuthCallback':
        return 'Error al procesar la respuesta del proveedor.';
      case 'OAuthCreateAccount':
        return 'No se pudo crear la cuenta con el proveedor seleccionado.';
      case 'EmailCreateAccount':
        return 'No se pudo crear la cuenta con el email proporcionado.';
      case 'Callback':
        return 'Error en la respuesta del servidor.';
      case 'OAuthAccountNotLinked':
        return 'El email ya está registrado con otro método de inicio de sesión.';
      case 'EmailSignin':
        return 'Error al enviar el email de inicio de sesión.';
      case 'CredentialsSignin':
        return 'Las credenciales proporcionadas no son válidas.';
      case 'SessionRequired':
        return 'Debes iniciar sesión para acceder a esta página.';
      default:
        return 'Ha ocurrido un error inesperado.';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-sand px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-earth-brown">
            Error de autenticación
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {getErrorMessage(error)}
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="text-center">
            <Link
              href="/auth/signin"
              className="font-medium text-earth-brown hover:text-earth-brown-dark"
            >
              Volver a intentar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 