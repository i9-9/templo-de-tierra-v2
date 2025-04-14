import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

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
      data: { estado: 'CONFIRMADA' },
      include: {
        templo: true,
        user: true,
      },
    });

    // TODO: Enviar email de confirmación al usuario
    
    // Revalidar la página de reservas
    revalidatePath('/admin/reservas');

    return Response.json({ success: true, reserva });
  } catch (error) {
    console.error('Error al confirmar la reserva:', error);
    return new Response('Error al confirmar la reserva', { status: 500 });
  }
} 