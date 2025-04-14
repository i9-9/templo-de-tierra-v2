import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar que el usuario es admin
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.email !== 'admin@templodetierra.com') {
      return new Response('No autorizado', { status: 401 });
    }

    // Actualizar el estado de la reserva
    const reserva = await prisma.reserva.update({
      where: { id: params.id },
      data: { estado: 'CANCELADA' },
      include: {
        templo: true,
        user: true,
      },
    });

    // TODO: Enviar email de cancelación al usuario
    
    // Revalidar la página de reservas
    revalidatePath('/admin/reservas');

    // Redirigir al usuario a la página de reservas
    return new Response(null, {
      status: 303,
      headers: {
        Location: '/admin/reservas',
      },
    });
  } catch (error) {
    console.error('Error al cancelar la reserva:', error);
    return new Response('Error al cancelar la reserva', { status: 500 });
  }
} 