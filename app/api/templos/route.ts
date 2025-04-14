import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const templos = await prisma.templo.findMany({
      select: {
        id: true,
        nombre: true,
        slug: true,
        capacidad: true,
      },
      orderBy: {
        nombre: 'asc',
      },
    });

    return NextResponse.json(templos);
  } catch (error) {
    console.error('Error al obtener los templos:', error);
    return NextResponse.json(
      { error: 'Error al obtener los templos' },
      { status: 500 }
    );
  }
} 