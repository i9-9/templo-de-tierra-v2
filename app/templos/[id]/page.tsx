import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/auth';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import ReservaForm from '@/app/components/ReservaForm';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TemploPage(props: PageProps) {
  const [params, searchParams] = await Promise.all([
    props.params,
    props.searchParams
  ]);

  const session = await getServerSession(authOptions);
  const templo = await prisma.templo.findUnique({
    where: { id: params.id },
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          {templo.imagen && (
            <div className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <Image
                src={templo.imagen}
                alt={templo.nombre}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-gray-900">{templo.nombre}</h1>
            <p className="mt-4 text-gray-600 whitespace-pre-line">{templo.descripcion}</p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Capacidad</h3>
                <p className="mt-1 text-lg font-semibold text-gray-900">{templo.capacidad} personas</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Precio por noche</h3>
                <p className="mt-1 text-lg font-semibold text-gray-900">${templo.precio.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Reservar ahora</h2>
          {session ? (
            <ReservaForm templo={templo} />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Debes iniciar sesión para realizar una reserva.</p>
              <a
                href="/auth/signin"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Iniciar sesión
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 