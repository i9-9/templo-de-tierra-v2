import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  
  // Verificar que el usuario esté autenticado y sea admin
  if (!session || !session.user.isAdmin) {
    redirect('/auth/signin');
  }

  // Obtener estadísticas usando Prisma
  const templosCount = await prisma.templo.count();
  const reservasCount = await prisma.reserva.count();
  const usuariosCount = await prisma.user.count();

  // Obtener las últimas reservas
  const ultimasReservas = await prisma.reserva.findMany({
    take: 5,
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      templo: {
        select: {
          nombre: true
        }
      },
      user: {
        select: {
          name: true,
          email: true
        }
      }
    }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Templos</h2>
          <p className="text-3xl font-bold">{templosCount}</p>
          <Link
            href="/admin/templos"
            className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
          >
            Ver todos →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Reservas</h2>
          <p className="text-3xl font-bold">{reservasCount}</p>
          <Link
            href="/admin/reservas"
            className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
          >
            Ver todas →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Usuarios</h2>
          <p className="text-3xl font-bold">{usuariosCount}</p>
          <Link
            href="/admin/usuarios"
            className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
          >
            Ver todos →
          </Link>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Acciones rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/templos/nuevo"
            className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100"
          >
            <h3 className="font-medium">Crear nuevo templo</h3>
            <p className="text-sm text-gray-600">Agregar un nuevo templo al catálogo</p>
          </Link>
          <Link
            href="/admin/reservas"
            className="p-4 bg-green-50 rounded-lg hover:bg-green-100"
          >
            <h3 className="font-medium">Gestionar reservas</h3>
            <p className="text-sm text-gray-600">Ver y administrar todas las reservas</p>
          </Link>
        </div>
      </div>

      {/* Últimas reservas */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Últimas reservas</h2>
        {ultimasReservas.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Cliente
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Templo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Fecha
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ultimasReservas.map((reserva) => (
                  <tr key={reserva.id}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {reserva.user.name || reserva.user.email}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {reserva.templo.nombre}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(reserva.fechaInicio).toLocaleDateString()} - {new Date(reserva.fechaFin).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          reserva.estado === 'CONFIRMADA'
                            ? 'bg-green-100 text-green-800'
                            : reserva.estado === 'PENDIENTE'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {reserva.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No hay reservas recientes</p>
        )}
      </div>
    </div>
  );
} 