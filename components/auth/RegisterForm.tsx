'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

export default function RegisterForm() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string

    try {
      // NextAuth EmailProvider envía un magic link al email
      const result = await signIn('email', {
        email,
        redirect: false,
        callbackUrl: '/dashboard'
      })

      if (result?.error) {
        setError('Error al enviar el email de verificación')
      } else {
        setSuccess(true)
      }
    } catch (err: any) {
      console.error('Error registering:', err)
      setError(err.message || 'Error al crear la cuenta')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="space-y-4">
        <div className="bg-green-50 text-green-700 p-4 rounded-lg">
          <p className="font-medium">¡Email enviado!</p>
          <p className="text-sm mt-1">
            Revisa tu correo electrónico y haz clic en el enlace de verificación para completar tu registro.
          </p>
        </div>
        <Link 
          href="/auth/signin"
          className="block text-center text-sm text-amber-600 hover:text-amber-500"
        >
          Volver a iniciar sesión
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <div className="bg-blue-50 text-blue-700 p-3 rounded-lg text-sm mb-4">
        <p>Ingresa tu email y te enviaremos un enlace mágico para iniciar sesión sin necesidad de contraseña.</p>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          placeholder="tu@email.com"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
      >
        {loading ? 'Enviando...' : 'Enviar enlace de acceso'}
      </button>

      <p className="text-sm text-center text-gray-600">
        ¿Ya tienes una cuenta?{' '}
        <Link href="/auth/signin" className="text-amber-600 hover:text-amber-500">
          Inicia sesión
        </Link>
      </p>
    </form>
  )
} 