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

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await request.json();
    const reservaData: CreateReservaDTO = {
      ...body,
      userId: session.user.id,
    };

    // Validar fechas
    const errorFecha = validarFechasReserva(reservaData.fechaInicio, reservaData.fechaFin);
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
            fechaInicio: { lte: reservaData.fechaFin },
            fechaFin: { gte: reservaData.fechaInicio }
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
      new Date(reservaData.fechaInicio),
      new Date(reservaData.fechaFin),
      reservaData.numeroHuespedes
    );

    // Crear la reserva
    const reserva = await prisma.reserva.create({
      data: {
        ...reservaData,
        precioTotal,
        estado: EstadoReserva.PENDIENTE
      },
      include: {
        templo: true,
        user: true
      }
    });

    return NextResponse.json(reserva);
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 