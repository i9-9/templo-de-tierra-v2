import { prisma } from '@/lib/prisma';
import { formatearFecha, formatearPrecio } from '@/lib/utils/reserva';
import Link from 'next/link';

export default async function AdminReservasPage() {
  const reservas = await prisma.reserva.findMany({
    include: {
      templo: true,
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-heading text-[#6F4C21] mb-8 animate-fade-right" style={{ animationDelay: '0.1s' }}>
        Reservas
      </h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden animate-fade-up" style={{ animationDelay: '0.2s' }}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Templo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usuario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fechas
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reservas.map((reserva, index) => (
              <tr 
                key={reserva.id}
                className="animate-fade-up"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {reserva.templo.nombre}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{reserva.user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatearFecha(reserva.fechaInicio)} - {formatearFecha(reserva.fechaFin)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatearPrecio(reserva.precioTotal)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      reserva.estado === 'CONFIRMADA'
                        ? 'bg-green-100 text-green-800'
                        : reserva.estado === 'PENDIENTE'
                        ? 'bg-yellow-100 text-yellow-800'
                        : reserva.estado === 'CANCELADA'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {reserva.estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    {reserva.estado === 'PENDIENTE' && (
                      <>
                        <form action={`/api/admin/reservas/${reserva.id}/confirmar`} method="POST">
                          <button
                            type="submit"
                            className="text-green-600 hover:text-green-800 font-medium"
                          >
                            Confirmar
                          </button>
                        </form>
                        <form action={`/api/admin/reservas/${reserva.id}/cancelar`} method="POST">
                          <button
                            type="submit"
                            className="text-red-600 hover:text-red-800 font-medium"
                          >
                            Cancelar
                          </button>
                        </form>
                      </>
                    )}
                    <Link
                      href={`/admin/reservas/${reserva.id}`}
                      className="text-[#6F4C21] hover:text-[#5A3B1A] font-medium"
                    >
                      Ver detalles
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 