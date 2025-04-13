import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { EstadoReserva } from '@/lib/models/reserva';
import { sendReservationEmail } from '@/lib/services/email';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = request.nextUrl.pathname.split('/').pop();
    if (!id) {
      return Response.json({ error: 'ID no proporcionado' }, { status: 400 });
    }

    const reserva = await prisma.reserva.findUnique({
      where: { id },
      include: {
        templo: true,
        user: true,
      },
    });

    if (!reserva) {
      return Response.json({ error: 'Reserva no encontrada' }, { status: 404 });
    }

    return Response.json(reserva);
  } catch (error) {
    console.error('Error al obtener la reserva:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = request.nextUrl.pathname.split('/').pop();
    if (!id) {
      return Response.json({ error: 'ID no proporcionado' }, { status: 400 });
    }

    const body = await request.json();
    const reserva = await prisma.reserva.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!reserva) {
      return Response.json({ error: 'Reserva no encontrada' }, { status: 404 });
    }

    const updatedReserva = await prisma.reserva.update({
      where: { id },
      data: body,
      include: {
        templo: true,
        user: true,
      },
    });

    if (body.estado && body.estado !== reserva.estado) {
      await sendReservationEmail(
        {
          ...updatedReserva,
          precioTotal: Number(updatedReserva.precioTotal),
          templo: {
            ...updatedReserva.templo,
            precio: Number(updatedReserva.templo.precio),
          },
        },
        body.estado === "CONFIRMADA" ? "confirmation" : "update"
      );
    }

    return Response.json(updatedReserva);
  } catch (error) {
    console.error('Error al actualizar la reserva:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = request.nextUrl.pathname.split('/').pop();
    if (!id) {
      return Response.json({ error: 'ID no proporcionado' }, { status: 400 });
    }

    const reserva = await prisma.reserva.findUnique({
      where: { id },
      include: {
        user: true,
        templo: true,
      },
    });

    if (!reserva) {
      return Response.json({ error: 'Reserva no encontrada' }, { status: 404 });
    }

    const updatedReserva = await prisma.reserva.update({
      where: { id },
      data: { estado: 'CANCELADA' },
      include: {
        templo: true,
        user: true,
      },
    });

    const reservaForEmail = {
      ...updatedReserva,
      precioTotal: Number(updatedReserva.precioTotal),
      templo: {
        ...updatedReserva.templo,
        precio: Number(updatedReserva.templo.precio),
      },
    };

    try {
      await sendReservationEmail(reservaForEmail, 'cancellation');
    } catch (emailError) {
      console.error('Error sending cancellation email:', emailError);
    }

    return Response.json(updatedReserva);
  } catch (error) {
    console.error('Error al cancelar la reserva:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}