import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { enviarEmailReserva } from '@/lib/services/email';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verificar que el usuario es admin
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.email !== 'admin@templodetierra.com') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { id } = await params;

    // Actualizar el estado de la reserva
    const reserva = await prisma.reserva.update({
      where: { id },
      data: { estado: 'CONFIRMADA' },
      include: {
        templo: true,
        user: true,
      },
    });

    // Verificar que el usuario tiene un email antes de enviar la notificación
    if (reserva.user.email) {
      // Enviar email de confirmación al usuario
      await enviarEmailReserva({
        email: reserva.user.email,
        nombre: reserva.user.name || 'Usuario',
        templo: reserva.templo.nombre,
        fechaInicio: reserva.fechaInicio.toISOString(),
        fechaFin: reserva.fechaFin.toISOString(),
        precioTotal: Number(reserva.precioTotal),
        estado: 'confirmada'
      });
    }

    // Retornar respuesta de éxito con redirección
    return NextResponse.json(
      { success: true, reserva },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al confirmar la reserva:', error);
    return NextResponse.json(
      { error: 'Error al confirmar la reserva' },
      { status: 500 }
    );
  }
}

