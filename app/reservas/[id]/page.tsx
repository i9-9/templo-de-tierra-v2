import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/auth';
import { prisma } from '@/lib/prisma';
import { EstadoReserva } from '@/lib/models/reserva';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';
import ReservaDetails from './ReservaDetails';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ReservaPage(props: PageProps) {
  const [params, searchParams] = await Promise.all([
    props.params,
    props.searchParams
  ]);
  
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Acceso no autorizado</h1>
          <p className="mt-2 text-gray-600">Debes iniciar sesión para ver los detalles de la reserva.</p>
        </div>
      </div>
    );
  }

  const reserva = await prisma.reserva.findUnique({
    where: {
      id: params.id,
      userId: session.user.id,
    },
    include: {
      templo: true,
    },
  });

  if (!reserva) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Reserva no encontrada</h1>
          <p className="mt-2 text-gray-600">La reserva que buscas no existe o no tienes acceso a ella.</p>
          <Link
            href="/reservas"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Volver a mis reservas
          </Link>
        </div>
      </div>
    );
  }

  return <ReservaDetails reserva={reserva} />;
} 