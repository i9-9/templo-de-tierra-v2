import { Metadata } from 'next'
import SignInForm from '@/components/auth/SignInForm'

export const metadata: Metadata = {
  title: 'Iniciar Sesión | Templo de Tierra',
  description: 'Inicia sesión en tu cuenta de Templo de Tierra',
}

export default function SignInPage() {
  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h1>
        <SignInForm />
      </div>
    </div>
  )
} 