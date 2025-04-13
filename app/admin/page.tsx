import { prisma } from '@/lib/prisma';
import { formatearFecha, formatearPrecio } from '@/lib/utils/reserva';

export default async function AdminDashboard() {
  // Get statistics
  const [
    totalReservas,
    reservasPendientes,
    reservasConfirmadas,
    totalTemplos,
    totalUsuarios,
    reservasRecientes,
  ] = await Promise.all([
    prisma.reserva.count(),
    prisma.reserva.count({ where: { estado: 'PENDIENTE' } }),
    prisma.reserva.count({ where: { estado: 'CONFIRMADA' } }),
    prisma.templo.count(),
    prisma.user.count(),
    prisma.reserva.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        templo: true,
        user: true,
      },
    }),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-heading text-[#6F4C21] mb-8 animate-fade-right" style={{ animationDelay: '0.1s' }}>
        Dashboard
      </h1>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-lg font-medium text-gray-600">Total Reservas</h3>
          <p className="text-3xl font-bold text-[#6F4C21]">{totalReservas}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-lg font-medium text-gray-600">Reservas Pendientes</h3>
          <p className="text-3xl font-bold text-yellow-600">{reservasPendientes}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg font-medium text-gray-600">Reservas Confirmadas</h3>
          <p className="text-3xl font-bold text-green-600">{reservasConfirmadas}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <h3 className="text-lg font-medium text-gray-600">Total Templos</h3>
          <p className="text-3xl font-bold text-[#6F4C21]">{totalTemplos}</p>
        </div>
      </div>

      {/* Recent Reservations */}
      <div className="bg-white rounded-lg shadow-md p-6 animate-fade-up" style={{ animationDelay: '0.6s' }}>
        <h2 className="text-xl font-medium text-[#6F4C21] mb-4">Reservas Recientes</h2>
        <div className="overflow-x-auto">
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservasRecientes.map((reserva, index) => (
                <tr 
                  key={reserva.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${0.7 + index * 0.1}s` }}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 