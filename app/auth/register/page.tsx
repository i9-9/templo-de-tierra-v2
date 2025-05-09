import { Metadata } from 'next'
import RegisterForm from '@/app/components/auth/RegisterForm'
import PageLayout from '@/app/components/PageLayout'

export const metadata: Metadata = {
  title: 'Registro | Templo de Tierra',
  description: 'Crea una cuenta en Templo de Tierra',
}

export default function RegisterPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-[#F5DC90]/30 p-8 rounded-lg shadow-sm border border-[#6F4C21]/10">
          <h1 className="text-2xl font-heading text-[#6F4C21] text-center mb-6">Crear Cuenta</h1>
          <RegisterForm />
        </div>
      </div>
    </PageLayout>
  )
} 