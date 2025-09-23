import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/admin/templos/[id] - Obtener un templo por ID
export async function GET(
  request: Request,
  { params }: RouteContext
) {
  try {
    const resolvedParams = await params;

    // Obtener el templo por ID
    const templo = await prisma.templo.findUnique({
      where: { id: resolvedParams.id }
    });

    if (!templo) {
      return NextResponse.json(
        { error: 'Templo no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ templo });
  } catch (error) {
    console.error('Error inesperado:', error);
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/templos/[id] - Actualizar un templo
export async function PUT(
  request: Request,
  { params }: RouteContext
) {
  try {
    const resolvedParams = await params;

    // Obtener datos del body
    const body = await request.json();
    
    // Validar datos mínimos requeridos
    if (!body.nombre || !body.slug || !body.descripcion) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos (nombre, slug, descripcion)' },
        { status: 400 }
      );
    }

    // Verificar que el templo existe
    const existingTemplo = await prisma.templo.findUnique({
      where: { id: resolvedParams.id }
    });

    if (!existingTemplo) {
      return NextResponse.json(
        { error: 'Templo no encontrado' },
        { status: 404 }
      );
    }

    // Actualizar el templo
    const templo = await prisma.templo.update({
      where: { id: resolvedParams.id },
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

    return NextResponse.json({ templo });
  } catch (error) {
    console.error('Error inesperado:', error);
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/templos/[id] - Eliminar un templo
export async function DELETE(
  request: Request,
  { params }: RouteContext
) {
  try {
    const resolvedParams = await params;

    // Verificar que el templo existe
    const existingTemplo = await prisma.templo.findUnique({
      where: { id: resolvedParams.id }
    });

    if (!existingTemplo) {
      return NextResponse.json(
        { error: 'Templo no encontrado' },
        { status: 404 }
      );
    }

    // Eliminar el templo
    await prisma.templo.delete({
      where: { id: resolvedParams.id }
    });

    return NextResponse.json(
      { message: 'Templo eliminado correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error inesperado:', error);
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    );
  }
} 