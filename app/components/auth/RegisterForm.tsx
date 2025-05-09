'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '@/app/components/ui/Button'

export default function RegisterForm() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Error al crear la cuenta')
      }

      router.push('/auth/signin?message=Cuenta creada exitosamente. Por favor inicia sesión.')
    } catch (err: any) {
      console.error('Error registering:', err)
      setError(err.message || 'Error al crear la cuenta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-[#6F4C21] p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#6F4C21]">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="mt-1 block w-full rounded-md border border-[#6F4C21]/30 px-3 py-2 shadow-sm focus:border-[#6F4C21] focus:outline-none focus:ring-1 focus:ring-[#6F4C21] bg-white/70"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-[#6F4C21]">
          Contraseña
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          minLength={6}
          className="mt-1 block w-full rounded-md border border-[#6F4C21]/30 px-3 py-2 shadow-sm focus:border-[#6F4C21] focus:outline-none focus:ring-1 focus:ring-[#6F4C21] bg-white/70"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#6F4C21]">
          Confirmar Contraseña
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          required
          minLength={6}
          className="mt-1 block w-full rounded-md border border-[#6F4C21]/30 px-3 py-2 shadow-sm focus:border-[#6F4C21] focus:outline-none focus:ring-1 focus:ring-[#6F4C21] bg-white/70"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Creando cuenta...' : 'Crear cuenta'}
      </Button>

      <p className="text-sm text-center text-[#6F4C21]/80">
        ¿Ya tienes una cuenta?{' '}
        <Link href="/auth/signin" className="text-[#6F4C21] hover:underline font-medium">
          Inicia sesión
        </Link>
      </p>
    </form>
  )
} 