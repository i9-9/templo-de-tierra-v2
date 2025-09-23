import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const templos = await prisma.templo.findMany({
      orderBy: { nombre: 'asc' }
    });
    return NextResponse.json(templos);
  } catch (error) {
    console.error('Error fetching templos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templos' },
      { status: 500 }
    );
  }
} 