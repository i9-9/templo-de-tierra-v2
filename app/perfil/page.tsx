import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mi Perfil | Templo de Tierra',
  description: 'Gestiona tu perfil y tus reservas en Templo de Tierra.',
}

export default async function PerfilPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <main className="container mx-auto px-4 pt-[150px] pb-8">
      <div className="grid grid-cols-12 gap-8">
        {/* Columna izquierda - Perfil */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-[#F5DC90]/20 rounded-lg shadow-md overflow-hidden border border-[#6F4C21]/20 backdrop-blur-sm p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-24 h-24 mb-4">
                <Image
                  src={session.user?.image || '/default-avatar.png'}
                  alt={session.user?.name || 'Usuario'}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-heading text-[#6F4C21] mb-2">
                {session.user?.name}
              </h2>
              <p className="text-[#6F4C21]/70">
                {session.user?.email}
              </p>
            </div>

            <div className="space-y-4">
              <Link
                href="/reservas"
                className="flex items-center space-x-2 text-[#6F4C21] hover:text-[#6F4C21]/80 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                <span>Mis Reservas</span>
              </Link>

              <Link
                href="/perfil/ajustes"
                className="flex items-center space-x-2 text-[#6F4C21] hover:text-[#6F4C21]/80 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                <span>Ajustes</span>
              </Link>

              <Link
                href="/perfil/favoritos"
                className="flex items-center space-x-2 text-[#6F4C21] hover:text-[#6F4C21]/80 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>Favoritos</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Columna derecha - Contenido principal */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-[#F5DC90]/20 rounded-lg shadow-md overflow-hidden border border-[#6F4C21]/20 backdrop-blur-sm p-6">
            <h2 className="text-2xl font-heading text-[#6F4C21] mb-6">
              Bienvenido a tu perfil
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-heading text-[#6F4C21] mb-4">
                  Tus próximas reservas
                </h3>
                <p className="text-[#6F4C21]/70">
                  No tienes reservas próximas. <Link href="/templos" className="text-[#6F4C21] hover:underline">Explora nuestros templos</Link> para planificar tu próxima visita.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-heading text-[#6F4C21] mb-4">
                  Tus experiencias favoritas
                </h3>
                <p className="text-[#6F4C21]/70">
                  Aún no has guardado experiencias favoritas. <Link href="/experiencias" className="text-[#6F4C21] hover:underline">Descubre nuestras experiencias</Link> y guárdalas para más tarde.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 