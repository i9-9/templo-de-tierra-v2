import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/auth';
import { prisma } from '@/lib/prisma';
import { EstadoReserva, Reserva } from '@/lib/models/reserva';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import PageLayout from '../components/PageLayout';

export default async function ReservasPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <PageLayout>
        <div className="min-h-screen pt-28 px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#6F4C21]">Acceso no autorizado</h1>
            <p className="mt-2 text-[#6F4C21]/80">Debes iniciar sesión para ver tus reservas.</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  const reservas = await prisma.reserva.findMany({
    where: {
      userId: session.user.id,
      estado: { not: EstadoReserva.CANCELADA }
    },
    include: {
      templo: true,
      user: true
    },
    orderBy: {
      fechaInicio: 'desc',
    },
  });

  // Convert Decimal values to numbers
  const formattedReservas = reservas.map(reserva => ({
    ...reserva,
    precioTotal: Number(reserva.precioTotal),
    templo: {
      ...reserva.templo,
      precio: Number(reserva.templo.precio)
    }
  }));

  type FormattedReserva = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    fechaInicio: Date;
    fechaFin: Date;
    numeroHuespedes: number;
    precioTotal: number;
    estado: string;
    metodoPago: string;
    userId: string;
    temploId: string;
    templo: {
      id: string;
      nombre: string;
      precio: number;
      descripcion: string;
      capacidad: number;
      amenities: string[];
      camas: string[];
      descripcionCorta: string;
      imagenPrincipal: string;
      imagenes: string[];
      slug: string;
      createdAt: Date;
      updatedAt: Date;
    };
  };

  return (
    <PageLayout>
      <div className="min-h-screen pt-28 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-bold text-[#6F4C21]">Mis Reservas</h1>
              <p className="mt-2 text-sm text-[#6F4C21]/80">
                Lista de todas tus reservas activas y pasadas.
              </p>
            </div>
          </div>

          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow-lg ring-1 ring-[#6F4C21]/20 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-[#6F4C21]/10">
                    <thead className="bg-[#F5DC90]">
                      <tr>
                        <th scope="col" className="py-4 pl-4 pr-3 text-left text-sm font-semibold text-[#6F4C21] sm:pl-6">
                          Templo
                        </th>
                        <th scope="col" className="px-3 py-4 text-left text-sm font-semibold text-[#6F4C21]">
                          Fecha de llegada
                        </th>
                        <th scope="col" className="px-3 py-4 text-left text-sm font-semibold text-[#6F4C21]">
                          Fecha de salida
                        </th>
                        <th scope="col" className="px-3 py-4 text-left text-sm font-semibold text-[#6F4C21]">
                          Huéspedes
                        </th>
                        <th scope="col" className="px-3 py-4 text-left text-sm font-semibold text-[#6F4C21]">
                          Estado
                        </th>
                        <th scope="col" className="px-3 py-4 text-left text-sm font-semibold text-[#6F4C21]">
                          Total
                        </th>
                        <th scope="col" className="relative py-4 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Acciones</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#6F4C21]/10 bg-white">
                      {formattedReservas.map((reserva: FormattedReserva) => (
                        <tr key={reserva.id} className="hover:bg-[#F5DC90]/10">
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-[#6F4C21] sm:pl-6">
                            {reserva.templo.nombre}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-[#6F4C21]/80">
                            {format(new Date(reserva.fechaInicio), 'PPP', { locale: es })}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-[#6F4C21]/80">
                            {format(new Date(reserva.fechaFin), 'PPP', { locale: es })}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-[#6F4C21]/80">
                            {reserva.numeroHuespedes}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-[#6F4C21]/80">
                            <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                              reserva.estado === EstadoReserva.CONFIRMADA
                                ? 'bg-green-100 text-green-800'
                                : reserva.estado === EstadoReserva.PENDIENTE
                                ? 'bg-[#F5DC90] text-[#6F4C21]'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {reserva.estado}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-[#6F4C21]/80">
                            ${reserva.precioTotal.toFixed(2)}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <Link
                              href={`/reservas/${reserva.id}`}
                              className="text-[#6F4C21] hover:text-[#6F4C21]/80"
                            >
                              Ver detalles
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 