import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Favoritos | Templo de Tierra',
  description: 'Tus templos y experiencias favoritas guardadas.',
}

export default async function FavoritosPage() {
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
                href="/perfil/ajustes"
                className="flex items-center space-x-2 text-[#6F4C21] hover:text-[#6F4C21]/80 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                <span>Ajustes</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Columna derecha - Favoritos */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-[#F5DC90]/20 rounded-lg shadow-md overflow-hidden border border-[#6F4C21]/20 backdrop-blur-sm p-6">
            <h2 className="text-2xl font-heading text-[#6F4C21] mb-6">
              Tus favoritos
            </h2>
            
            <div className="space-y-8">
              {/* Templos favoritos */}
              <div>
                <h3 className="text-lg font-heading text-[#6F4C21] mb-4">
                  Templos favoritos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Ejemplo de templo favorito */}
                  <div className="bg-white/50 rounded-lg overflow-hidden border border-[#6F4C21]/20">
                    <div className="relative h-48">
                      <Image
                        src="/tdt/DSC00678.png"
                        alt="Templo favorito"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-heading text-[#6F4C21] mb-2">
                        Templo del Sol
                      </h4>
                      <p className="text-[#6F4C21]/70 text-sm mb-4">
                        Un espacio luminoso y acogedor con vistas panorámicas al mar.
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-[#6F4C21] font-medium">
                          $120/noche
                        </span>
                        <button className="text-[#6F4C21] hover:text-[#6F4C21]/80 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experiencias favoritas */}
              <div>
                <h3 className="text-lg font-heading text-[#6F4C21] mb-4">
                  Experiencias favoritas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Ejemplo de experiencia favorita */}
                  <div className="bg-white/50 rounded-lg overflow-hidden border border-[#6F4C21]/20">
                    <div className="relative h-48">
                      <Image
                        src="/tdt/DSC00678.png"
                        alt="Experiencia favorita"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-heading text-[#6F4C21] mb-2">
                        Meditación al amanecer
                      </h4>
                      <p className="text-[#6F4C21]/70 text-sm mb-4">
                        Comienza tu día con una meditación guiada al amanecer.
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-[#6F4C21] font-medium">
                          $50/persona
                        </span>
                        <button className="text-[#6F4C21] hover:text-[#6F4C21]/80 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 