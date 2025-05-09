import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default async function AdminTemplos() {
  const session = await getServerSession(authOptions);
  
  // Verificar que el usuario esté autenticado y sea admin
  if (!session || !session.user.isAdmin) {
    redirect('/auth/signin');
  }

  // Obtener la lista de templos usando Prisma
  const templos = await prisma.templo.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestionar Templos</h1>
        <Link
          href="/admin/templos/nuevo"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Crear nuevo templo
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Capacidad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Destacado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {templos.length > 0 ? (
              templos.map((templo) => (
                <tr key={templo.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {templo.imagenPrincipal && (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                          <Image 
                            src={templo.imagenPrincipal} 
                            alt={templo.nombre} 
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {templo.nombre}
                        </div>
                        <div className="text-sm text-gray-500">
                          {templo.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{templo.capacidad}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${parseFloat(templo.precio.toString()).toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        templo.destacado
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {templo.destacado ? 'Sí' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/templos/${templo.id}/editar`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <PencilIcon className="w-5 h-5" />
                        <span className="sr-only">Editar</span>
                      </Link>
                      <Link
                        href={`/admin/templos/${templo.id}/eliminar`}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="w-5 h-5" />
                        <span className="sr-only">Eliminar</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No hay templos registrados. <Link href="/admin/templos/nuevo" className="text-blue-600 hover:underline">Crear uno nuevo</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 