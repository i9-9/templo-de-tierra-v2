import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Tipo extendido para el usuario administrador
interface AdminUser {
  id: string;
  email?: string;
  isAdmin?: boolean;
}

// GET /api/admin/templos - Obtener todos los templos
export async function GET() {
  try {
    // Obtener todos los templos
    const templos = await prisma.templo.findMany({
      orderBy: { nombre: 'asc' }
    });

    return NextResponse.json({ templos });
  } catch (error) {
    console.error('Error inesperado:', error);
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    );
  }
}

// POST /api/admin/templos - Crear un nuevo templo
export async function POST(request: Request) {
  try {
    // Obtener datos del body
    const body = await request.json();
    
    // Validar datos mínimos requeridos
    if (!body.nombre || !body.slug || !body.descripcion) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos (nombre, slug, descripcion)' },
        { status: 400 }
      );
    }

    // Crear el nuevo templo
    const templo = await prisma.templo.create({
      data: {
        nombre: body.nombre,
        slug: body.slug,
        descripcion: body.descripcion,
        descripcionCorta: body.descripcionCorta || body.descripcion.substring(0, 100) + '...',
        capacidad: body.capacidad?.toString() || '1',
        amenities: body.amenities || [],
        camas: body.camas?.toString() || '',
        imagenPrincipal: body.imagenPrincipal || '',
        imagenes: body.imagenes || [],
        destacado: body.destacado || false
      }
    });

    return NextResponse.json({ templo }, { status: 201 });
  } catch (error) {
    console.error('Error inesperado:', error);
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    );
  }
} 