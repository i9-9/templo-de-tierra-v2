import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { formatearFecha, formatearPrecio } from '@/lib/utils/reserva';

export default async function ReservasPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/auth/signin');
  }

  const reservas = await prisma.reserva.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      templo: true,
    },
    orderBy: {
      fechaInicio: 'desc',
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading text-[#6F4C21] mb-8">Mis Reservas</h1>
      
      {reservas.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No tienes reservas aún.</p>
          <a
            href="/templos"
            className="mt-4 inline-block bg-[#6F4C21] text-white py-2 px-4 rounded-md hover:bg-[#5A3B1A]"
          >
            Explorar templos
          </a>
        </div>
      ) : (
        <div className="grid gap-6">
          {reservas.map((reserva) => (
            <div
              key={reserva.id}
              className="bg-white rounded-lg shadow-md p-6 border border-[#F5DC90]/20"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-medium text-[#6F4C21]">
                    {reserva.templo.nombre}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {formatearFecha(reserva.fechaInicio)} - {formatearFecha(reserva.fechaFin)}
                  </p>
                  <p className="text-gray-600">
                    {reserva.numeroHuespedes}{' '}
                    {reserva.numeroHuespedes === 1 ? 'huésped' : 'huéspedes'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium text-[#6F4C21]">
                    {formatearPrecio(reserva.precioTotal)}
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm ${
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
                </div>
              </div>
              {reserva.notas && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Notas:</span> {reserva.notas}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 