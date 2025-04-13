import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { calcularPrecioTotal, validarFechasReserva } from '@/lib/utils/reserva';

const reservaSchema = z.object({
  temploId: z.string(),
  fechaInicio: z.string().transform((str: string) => new Date(str)),
  fechaFin: z.string().transform((str: string) => new Date(str)),
  numeroHuespedes: z.number().min(1).max(10),
  metodoPago: z.enum(['TARJETA', 'TRANSFERENCIA', 'EFECTIVO']),
  notas: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = reservaSchema.parse(body);

    // Validar fechas
    const errorFecha = validarFechasReserva(validatedData.fechaInicio, validatedData.fechaFin);
    if (errorFecha) {
      return NextResponse.json({ error: errorFecha }, { status: 400 });
    }

    // Verificar disponibilidad
    const reservasExistentes = await prisma.reserva.findMany({
      where: {
        temploId: validatedData.temploId,
        OR: [
          {
            fechaInicio: {
              lte: validatedData.fechaFin,
            },
            fechaFin: {
              gte: validatedData.fechaInicio,
            },
          },
        ],
        estado: {
          not: 'CANCELADA',
        },
      },
    });

    if (reservasExistentes.length > 0) {
      return NextResponse.json(
        { error: 'El templo no está disponible para las fechas seleccionadas' },
        { status: 400 }
      );
    }

    // Obtener el templo para calcular el precio total
    const templo = await prisma.templo.findUnique({
      where: { id: validatedData.temploId },
    });

    if (!templo) {
      return NextResponse.json({ error: 'Templo no encontrado' }, { status: 404 });
    }

    // Calcular el precio total
    const precioTotal = calcularPrecioTotal(
      templo.precio,
      validatedData.fechaInicio,
      validatedData.fechaFin
    );

    // Crear la reserva
    const reserva = await prisma.reserva.create({
      data: {
        ...validatedData,
        userId: session.user.id,
        precioTotal,
      },
    });

    return NextResponse.json(reserva);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
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