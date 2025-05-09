'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/app/components/ui/Button';

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const message = searchParams?.get('message') ?? null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      });

      if (result?.error) {
        setError('Credenciales inválidas');
        return;
      }

      router.push('/dashboard');
    } catch (err) {
      console.error('Sign in error:', err);
      setError('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {message && (
          <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm border border-green-200">
            {message}
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 text-[#6F4C21] p-3 rounded-lg text-sm border border-red-200">
            {error}
          </div>
        )}
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#6F4C21]">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1 block w-full px-3 py-2 border border-[#6F4C21]/30 rounded-md shadow-sm focus:outline-none focus:ring-[#6F4C21] focus:border-[#6F4C21] bg-white/70"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[#6F4C21]">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-1 block w-full px-3 py-2 border border-[#6F4C21]/30 rounded-md shadow-sm focus:outline-none focus:ring-[#6F4C21] focus:border-[#6F4C21] bg-white/70"
          />
        </div>

        <div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>
        </div>
      </form>

      <div className="mt-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#6F4C21]/20" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#F5DC90]/30 text-[#6F4C21]/70">¿No tienes cuenta?</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link 
            href="/auth/register" 
            className="text-[#6F4C21] hover:underline font-medium"
          >
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
} 