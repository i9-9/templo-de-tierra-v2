import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import ReservaForm from '@/app/components/ReservaForm';
import Link from 'next/link';

interface PageProps {
  params: { slug: string };
}

export default async function TemploPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  const templo = await prisma.templo.findUnique({
    where: { slug: params.slug },
    select: {
      id: true,
      nombre: true,
      descripcion: true,
      capacidad: true,
      precio: true,
      amenities: true,
      camas: true,
      descripcionCorta: true,
      imagenPrincipal: true,
      imagenes: true,
      slug: true,
    }
  });

  if (!templo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Templo no encontrado</h1>
          <p className="mt-2 text-gray-600">El templo que buscas no existe o ha sido eliminado.</p>
        </div>
      </div>
    );
  }

  // Convert Decimal to number for client components
  const temploForClient = {
    ...templo,
    precio: Number(templo.precio),
  };

  return (
    <main className="pt-[120px] pb-16">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link 
                href="/" 
                className="text-[#6F4C21]/60 hover:text-[#6F4C21] text-sm font-medium"
              >
                Inicio
              </Link>
            </li>
            <li>
              <svg className="h-5 w-5 text-[#6F4C21]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li>
              <Link 
                href="/templos" 
                className="text-[#6F4C21]/60 hover:text-[#6F4C21] text-sm font-medium"
              >
                Templos
              </Link>
            </li>
            <li>
              <svg className="h-5 w-5 text-[#6F4C21]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li>
              <span className="text-[#6F4C21] text-sm font-medium">
                {temploForClient.nombre}
              </span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            {temploForClient.imagenPrincipal && (
              <div className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <Image
                  src={temploForClient.imagenPrincipal}
                  alt={temploForClient.nombre}
                  width={800}
                  height={450}
                  className="object-cover w-full h-full"
                  priority
                  quality={90}
                />
              </div>
            )}
            
            {temploForClient.imagenes && temploForClient.imagenes.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {temploForClient.imagenes.map((imagen: string, index: number) => (
                  <div key={index} className="relative aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                    <Image
                      src={imagen}
                      alt={`${temploForClient.nombre} - Imagen ${index + 1}`}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                      quality={90}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8">
              <h1 className="text-[2.5rem] font-heading text-[#6F4C21] mb-4">{temploForClient.nombre}</h1>
              <p className="text-[#6F4C21]/80 whitespace-pre-line">{temploForClient.descripcion}</p>
              
              <div className="mt-8 grid grid-cols-2 gap-6 border-t border-b border-[#6F4C21]/10 py-6">
                <div>
                  <h3 className="text-sm font-medium text-[#6F4C21]/70">Capacidad</h3>
                  <p className="mt-1 text-lg font-medium text-[#6F4C21]">{temploForClient.capacidad} personas</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#6F4C21]/70">Precio por noche</h3>
                  <p className="mt-1 text-lg font-medium text-[#6F4C21]">${temploForClient.precio.toFixed(2)}</p>
                </div>
              </div>

              {temploForClient.amenities.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-[#6F4C21] mb-4">Amenidades</h3>
                  <ul className="grid grid-cols-2 gap-3">
                    {temploForClient.amenities.map((amenity: string, index: number) => (
                      <li key={index} className="flex items-center text-[#6F4C21]/80">
                        <svg className="h-5 w-5 text-[#D8A34B] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {temploForClient.camas.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-[#6F4C21] mb-4">Configuración de camas</h3>
                  <ul className="space-y-2">
                    {temploForClient.camas.map((cama: string, index: number) => (
                      <li key={index} className="text-[#6F4C21]/80 flex items-center">
                        <svg className="h-5 w-5 text-[#D8A34B] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {cama}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="lg:sticky lg:top-[120px] lg:self-start">
            <div className="bg-[#FDF6E3] rounded-xl shadow-md p-8 border border-[#6F4C21]/10">
              <h2 className="text-[2rem] font-heading text-[#6F4C21] mb-8">Reservar ahora</h2>
              {session ? (
                <ReservaForm templo={temploForClient} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-[#6F4C21]/80 mb-4">Debes iniciar sesión para realizar una reserva.</p>
                  <Link
                    href="/auth/signin"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#D8A34B] hover:bg-[#6F4C21] transition-colors duration-200"
                  >
                    Iniciar sesión
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 