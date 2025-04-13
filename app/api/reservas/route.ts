import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/auth';
import { CreateReservaDTO, EstadoReserva, validarFechasReserva, calcularPrecioTotal } from '@/lib/models/reserva';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const reservas = await prisma.reserva.findMany({
      where: {
        userId: session.user.id,
        estado: { not: EstadoReserva.CANCELADA }
      },
      include: {
        templo: true,
      },
      orderBy: {
        fechaInicio: 'asc',
      },
    });

    return NextResponse.json(reservas);
  } catch (error) {
    console.error('Error al obtener las reservas:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    console.error('No session or user ID:', session);
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    console.log('Session user ID:', session.user.id);
    
    // Verify user exists in database
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, email: true }
    });

    if (!user) {
      console.error('User not found in database:', session.user.id);
      return new NextResponse('Usuario no encontrado en la base de datos', { status: 404 });
    }

    console.log('Found user:', user);

    const body = await request.json();
    const reservaData: Omit<CreateReservaDTO, 'userId'> = body;

    // Convert string dates to Date objects
    const fechaInicio = new Date(reservaData.fechaInicio);
    const fechaFin = new Date(reservaData.fechaFin);

    // Validar fechas
    const errorFecha = validarFechasReserva(fechaInicio, fechaFin);
    if (errorFecha) {
      return new NextResponse(errorFecha, { status: 400 });
    }

    // Verificar disponibilidad del templo
    const reservasExistentes = await prisma.reserva.findMany({
      where: {
        temploId: reservaData.temploId,
        estado: { not: EstadoReserva.CANCELADA },
        OR: [
          {
            fechaInicio: { lte: fechaFin },
            fechaFin: { gte: fechaInicio }
          }
        ]
      },
    });

    if (reservasExistentes.length > 0) {
      return new NextResponse('El templo no está disponible para las fechas seleccionadas', { status: 400 });
    }

    // Obtener el templo para calcular el precio
    const templo = await prisma.templo.findUnique({
      where: { id: reservaData.temploId }
    });

    if (!templo) {
      return new NextResponse('Templo no encontrado', { status: 404 });
    }

    // Calcular el precio total
    const precioTotal = calcularPrecioTotal(
      Number(templo.precio),
      fechaInicio,
      fechaFin,
      reservaData.numeroHuespedes
    );

    console.log('Creating reservation with user ID:', user.id);

    // Crear la reserva
    const reserva = await prisma.reserva.create({
      data: {
        temploId: reservaData.temploId,
        userId: user.id,
        fechaInicio,
        fechaFin,
        numeroHuespedes: reservaData.numeroHuespedes,
        metodoPago: reservaData.metodoPago,
        precioTotal,
        estado: EstadoReserva.PENDIENTE,
        notas: reservaData.notas
      },
      include: {
        templo: true,
        user: true
      }
    });

    return NextResponse.json(reserva);
  } catch (error) {
    console.error('Error detallado al crear la reserva:', {
      error,
      session: session?.user,
      stack: error instanceof Error ? error.stack : undefined
    });
    
    if (error instanceof Error) {
      return new NextResponse(`Error al crear la reserva: ${error.message}`, { status: 500 });
    }
    return new NextResponse('Error interno del servidor', { status: 500 });
  }
} 