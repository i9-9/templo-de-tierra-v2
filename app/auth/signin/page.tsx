import { Metadata } from 'next'
import { Suspense } from 'react'
import SignInForm from '@/app/components/auth/SignInForm'
import PageLayout from '@/app/components/PageLayout'

export const metadata: Metadata = {
  title: 'Iniciar Sesión | Templo de Tierra',
  description: 'Inicia sesión en tu cuenta de Templo de Tierra',
}

export default function SignInPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-[#F5DC90]/30 p-8 rounded-lg shadow-sm border border-[#6F4C21]/10">
          <h1 className="text-2xl font-heading text-[#6F4C21] text-center mb-6">Iniciar Sesión</h1>
          <Suspense fallback={<div>Cargando...</div>}>
            <SignInForm />
          </Suspense>
        </div>
      </div>
    </PageLayout>
  )
} 