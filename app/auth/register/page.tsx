import { Metadata } from 'next'
import RegisterForm from '@/components/auth/RegisterForm'
import PageLayout from '@/app/components/PageLayout'

export const metadata: Metadata = {
  title: 'Registro | Templo de Tierra',
  description: 'Crea una cuenta en Templo de Tierra',
}

export default function RegisterPage() {
  return (
    <PageLayout>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-24 bg-warm-sand">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-earth-brown">
            Crear cuenta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <RegisterForm />
        </div>
      </div>
    </PageLayout>
  )
} 