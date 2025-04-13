import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/auth';
import { prisma } from '@/lib/prisma';
import { EstadoReserva } from '@/lib/models/reserva';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';
import ReservaDetails from './ReservaDetails';
import PageLayout from '../../components/PageLayout';


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
      <PageLayout>
        <div className="min-h-screen pt-28 px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#6F4C21]">Acceso no autorizado</h1>
            <p className="mt-2 text-[#6F4C21]/80">Debes iniciar sesión para ver los detalles de la reserva.</p>
          </div>
        </div>
      </PageLayout>
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
      <PageLayout>
        <div className="min-h-screen pt-28 px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#6F4C21]">Reserva no encontrada</h1>
            <p className="mt-2 text-[#6F4C21]/80">La reserva que buscas no existe o no tienes acceso a ella.</p>
            <Link
              href="/reservas"
              className="mt-4 inline-flex items-center px-4 py-2 border border-[#6F4C21]/20 text-sm font-medium rounded-md shadow-sm text-[#6F4C21] bg-[#F5DC90] hover:bg-[#F5DC90]/80"
            >
              Volver a mis reservas
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Convert Decimal to number before passing to client component
  const reservaWithNumberPrice = {
    ...reserva,
    precioTotal: Number(reserva.precioTotal),
    fechaInicio: reserva.fechaInicio.toISOString(),
    fechaFin: reserva.fechaFin.toISOString(),
    createdAt: reserva.createdAt.toISOString(),
    updatedAt: reserva.updatedAt.toISOString(),
  };

  return (
    <PageLayout>
      <div className="min-h-screen pt-28 px-8">
        <ReservaDetails reserva={reservaWithNumberPrice} />
      </div>
    </PageLayout>
  );
} 