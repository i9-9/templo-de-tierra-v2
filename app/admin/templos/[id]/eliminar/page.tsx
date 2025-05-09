import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import EliminarTemploForm from '@/app/components/admin/EliminarTemploForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EliminarTemplo({
  params,
}: PageProps) {
  const resolvedParams = await params;
  const session = await getServerSession(authOptions);
  
  // Verificar que el usuario esté autenticado y sea admin
  if (!session || !session.user.isAdmin) {
    redirect('/auth/signin');
  }

  // Obtener el templo por ID
  const templo = await prisma.templo.findUnique({
    where: {
      id: resolvedParams.id
    },
    include: {
      reservas: {
        select: {
          id: true
        }
      }
    }
  });

  // Si no existe el templo, mostrar 404
  if (!templo) {
    notFound();
  }

  const tieneReservas = templo.reservas.length > 0;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Eliminar Templo</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div className="flex items-center">
            {templo.imagenPrincipal && (
              <div className="relative w-16 h-16 rounded-lg mr-4 overflow-hidden">
                <Image 
                  src={templo.imagenPrincipal} 
                  alt={templo.nombre} 
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold">{templo.nombre}</h2>
              <p className="text-gray-600">Slug: {templo.slug}</p>
            </div>
          </div>
          
          {tieneReservas ? (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Advertencia:</strong> Este templo tiene {templo.reservas.length} reservas asociadas. Al eliminarlo, también se eliminarán todas sus reservas.
                  </p>
                </div>
              </div>
            </div>
          ) : null}
          
          <EliminarTemploForm 
            id={templo.id} 
            nombre={templo.nombre}
            tieneReservas={tieneReservas} 
          />
          
          <div className="border-t pt-4 mt-4">
            <Link 
              href="/admin/templos" 
              className="text-blue-600 hover:text-blue-800"
            >
              ← Volver a la lista de templos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 