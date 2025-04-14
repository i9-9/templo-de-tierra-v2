import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { validarFechasReserva } from '@/lib/utils/reserva';
import { EstadoReserva } from '@/lib/models/reserva';
import { enviarEmailReserva } from '@/lib/services/email';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { temploId, fechaInicio, fechaFin, numeroHuespedes, metodoPago, notas } = body;

    // Validar fechas
    if (!validarFechasReserva(new Date(fechaInicio), new Date(fechaFin))) {
      return NextResponse.json(
        { error: 'Las fechas de reserva no son válidas' },
        { status: 400 }
      );
    }

    // Obtener el templo para calcular el precio total
    const templo = await prisma.templo.findUnique({
      where: { id: temploId }
    });

    if (!templo) {
      return NextResponse.json(
        { error: 'Templo no encontrado' },
        { status: 404 }
      );
    }

    // Calcular el precio total
    const dias = Math.ceil((new Date(fechaFin).getTime() - new Date(fechaInicio).getTime()) / (1000 * 60 * 60 * 24));
    const precioTotal = templo.precio.mul(dias);

    // Crear la reserva
    const reserva = await prisma.reserva.create({
      data: {
        temploId,
        userId: session.user.id,
        fechaInicio: new Date(fechaInicio),
        fechaFin: new Date(fechaFin),
        numeroHuespedes,
        precioTotal,
        metodoPago,
        notas,
        estado: EstadoReserva.PENDIENTE
      },
      include: {
        templo: true,
        user: true
      }
    });

    // Enviar email de notificación
    try {
      await enviarEmailReserva({
        nombreUsuario: session.user.name || 'Usuario',
        emailUsuario: session.user.email || '',
        nombreTemplo: templo.nombre,
        fechaInicio: new Date(fechaInicio),
        fechaFin: new Date(fechaFin),
        numeroHuespedes,
        precioTotal: precioTotal.toNumber(),
        estado: EstadoReserva.PENDIENTE
      });
    } catch (error) {
      console.error('Error al enviar el email de notificación:', error);
    }

    return NextResponse.json(reserva);
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    return NextResponse.json(
      { error: 'Error al crear la reserva' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (userId && userId !== session.user.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
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

    return NextResponse.json(reservas);
  } catch (error) {
    console.error('Error al obtener las reservas:', error);
    return NextResponse.json(
      { error: 'Error al obtener las reservas' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const reservaId = searchParams.get('id');

    if (!reservaId) {
      return NextResponse.json(
        { error: 'ID de reserva no proporcionado' },
        { status: 400 }
      );
    }

    // Verificar que la reserva pertenece al usuario
    const reserva = await prisma.reserva.findUnique({
      where: { id: reservaId },
      include: { 
        templo: true,
        user: true
      }
    });

    if (!reserva) {
      return NextResponse.json(
        { error: 'Reserva no encontrada' },
        { status: 404 }
      );
    }

    if (reserva.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    // Solo se pueden cancelar reservas pendientes o confirmadas
    if (reserva.estado !== EstadoReserva.PENDIENTE && reserva.estado !== EstadoReserva.CONFIRMADA) {
      return NextResponse.json(
        { error: 'No se puede cancelar esta reserva' },
        { status: 400 }
      );
    }

    // Actualizar el estado de la reserva
    const reservaActualizada = await prisma.reserva.update({
      where: { id: reservaId },
      data: {
        estado: EstadoReserva.CANCELADA
      },
      include: {
        templo: true,
        user: true
      }
    });

    // Enviar email de notificación
    try {
      await enviarEmailReserva({
        nombreUsuario: reserva.user.name || 'Usuario',
        emailUsuario: reserva.user.email || '',
        nombreTemplo: reserva.templo.nombre,
        fechaInicio: reserva.fechaInicio,
        fechaFin: reserva.fechaFin,
        numeroHuespedes: reserva.numeroHuespedes,
        precioTotal: reserva.precioTotal.toNumber(),
        estado: EstadoReserva.CANCELADA
      });
    } catch (error) {
      console.error('Error al enviar el email de notificación:', error);
    }

    return NextResponse.json(reservaActualizada);
  } catch (error) {
    console.error('Error al cancelar la reserva:', error);
    return NextResponse.json(
      { error: 'Error al cancelar la reserva' },
      { status: 500 }
    );
  }
} 