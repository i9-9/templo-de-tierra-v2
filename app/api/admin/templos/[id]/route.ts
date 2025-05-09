import { NextResponse } from 'next/server';
import { getUser } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
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
    const supabaseUser = await getUser();
    
    if (!supabaseUser) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 403 }
      );
    }
    
    // Verificar si el usuario es administrador
    const dbUser = await prisma.user.findUnique({
      where: { id: supabaseUser.id },
      select: { isAdmin: true }
    });
    
    if (!dbUser?.isAdmin) {
      return NextResponse.json(
        { error: 'Se requieren privilegios de administrador' },
        { status: 403 }
      );
    }

    // Obtener el templo por ID
    const { data, error } = await supabase
      .from('Templo')
      .select('*')
      .eq('id', resolvedParams.id)
      .single();

    if (error) {
      console.error('Error al obtener templo:', error);
      return NextResponse.json(
        { error: 'Error al obtener templo' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Templo no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ templo: data });
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
    const supabaseUser = await getUser();
    
    if (!supabaseUser) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 403 }
      );
    }
    
    // Verificar si el usuario es administrador
    const dbUser = await prisma.user.findUnique({
      where: { id: supabaseUser.id },
      select: { isAdmin: true }
    });
    
    if (!dbUser?.isAdmin) {
      return NextResponse.json(
        { error: 'Se requieren privilegios de administrador' },
        { status: 403 }
      );
    }

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
    const { data: templo, error: checkError } = await supabase
      .from('Templo')
      .select('id')
      .eq('id', resolvedParams.id)
      .single();

    if (checkError || !templo) {
      return NextResponse.json(
        { error: 'Templo no encontrado' },
        { status: 404 }
      );
    }

    // Actualizar el templo
    const { data, error } = await supabase
      .from('Templo')
      .update({
        nombre: body.nombre,
        slug: body.slug,
        descripcion: body.descripcion,
        descripcionCorta: body.descripcionCorta || body.descripcion.substring(0, 100) + '...',
        capacidad: body.capacidad || 1,
        precio: body.precio || 0,
        amenities: body.amenities || [],
        camas: body.camas || [],
        imagenPrincipal: body.imagenPrincipal || '',
        imagenes: body.imagenes || [],
        destacado: body.destacado || false
      })
      .eq('id', resolvedParams.id)
      .select()
      .single();

    if (error) {
      console.error('Error al actualizar templo:', error);
      return NextResponse.json(
        { error: 'Error al actualizar templo: ' + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ templo: data });
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
    const supabaseUser = await getUser();
    
    if (!supabaseUser) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 403 }
      );
    }
    
    // Verificar si el usuario es administrador
    const dbUser = await prisma.user.findUnique({
      where: { id: supabaseUser.id },
      select: { isAdmin: true }
    });
    
    if (!dbUser?.isAdmin) {
      return NextResponse.json(
        { error: 'Se requieren privilegios de administrador' },
        { status: 403 }
      );
    }

    // Verificar que el templo existe
    const { data: templo, error: checkError } = await supabase
      .from('Templo')
      .select('id')
      .eq('id', resolvedParams.id)
      .single();

    if (checkError || !templo) {
      return NextResponse.json(
        { error: 'Templo no encontrado' },
        { status: 404 }
      );
    }

    // Eliminar el templo
    const { error } = await supabase
      .from('Templo')
      .delete()
      .eq('id', resolvedParams.id);

    if (error) {
      console.error('Error al eliminar templo:', error);
      return NextResponse.json(
        { error: 'Error al eliminar templo: ' + error.message },
        { status: 500 }
      );
    }

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