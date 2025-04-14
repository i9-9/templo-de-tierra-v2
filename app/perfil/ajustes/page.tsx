import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Ajustes | Templo de Tierra',
  description: 'Gestiona tus preferencias y configuración de cuenta.',
}

export default async function AjustesPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <main className="container mx-auto px-4 pt-[150px] pb-8">
      <div className="grid grid-cols-12 gap-8">
        {/* Columna izquierda - Navegación */}
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
                href="/perfil"
                className="flex items-center space-x-2 text-[#6F4C21] hover:text-[#6F4C21]/80 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span>Mi Perfil</span>
              </Link>

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

        {/* Columna derecha - Ajustes */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-[#F5DC90]/20 rounded-lg shadow-md overflow-hidden border border-[#6F4C21]/20 backdrop-blur-sm p-6">
            <h2 className="text-2xl font-heading text-[#6F4C21] mb-6">
              Ajustes de cuenta
            </h2>
            
            <div className="space-y-8">
              {/* Información personal */}
              <div>
                <h3 className="text-lg font-heading text-[#6F4C21] mb-4">
                  Información personal
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#6F4C21]/80 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={session.user?.name || ''}
                      className="w-full px-4 py-2 rounded-lg border border-[#6F4C21]/20 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#6F4C21]/20"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#6F4C21]/80 mb-1">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      value={session.user?.email || ''}
                      className="w-full px-4 py-2 rounded-lg border border-[#6F4C21]/20 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#6F4C21]/20"
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* Preferencias */}
              <div>
                <h3 className="text-lg font-heading text-[#6F4C21] mb-4">
                  Preferencias
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="notifications"
                      className="h-4 w-4 text-[#6F4C21] focus:ring-[#6F4C21]/20 border-[#6F4C21]/20 rounded"
                    />
                    <label htmlFor="notifications" className="ml-2 block text-sm text-[#6F4C21]/80">
                      Recibir notificaciones por correo electrónico
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="newsletter"
                      className="h-4 w-4 text-[#6F4C21] focus:ring-[#6F4C21]/20 border-[#6F4C21]/20 rounded"
                    />
                    <label htmlFor="newsletter" className="ml-2 block text-sm text-[#6F4C21]/80">
                      Suscribirse al boletín de noticias
                    </label>
                  </div>
                </div>
              </div>

              {/* Privacidad */}
              <div>
                <h3 className="text-lg font-heading text-[#6F4C21] mb-4">
                  Privacidad
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="profileVisibility"
                      className="h-4 w-4 text-[#6F4C21] focus:ring-[#6F4C21]/20 border-[#6F4C21]/20 rounded"
                    />
                    <label htmlFor="profileVisibility" className="ml-2 block text-sm text-[#6F4C21]/80">
                      Hacer mi perfil visible para otros usuarios
                    </label>
                  </div>
                </div>
              </div>

              {/* Acciones */}
              <div className="pt-4">
                <button
                  type="button"
                  className="w-full px-4 py-2 bg-[#6F4C21] text-[#F5DC90] rounded-lg hover:bg-[#6F4C21]/90 transition-colors"
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 