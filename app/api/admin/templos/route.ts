import { NextResponse } from 'next/server';
import { getUser } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { prisma } from '@/lib/prisma';

// Tipo extendido para el usuario administrador
interface AdminUser {
  id: string;
  email?: string;
  isAdmin?: boolean;
}

// GET /api/admin/templos - Obtener todos los templos (para admin)
export async function GET() {
  try {
    const supabaseUser = await getUser();
    
    if (!supabaseUser) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 403 }
      );
    }
    
    // Verificar si el usuario es administrador en la base de datos
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

    // Obtener todos los templos
    const { data, error } = await supabase
      .from('Templo')
      .select('*')
      .order('nombre');

    if (error) {
      console.error('Error al obtener templos:', error);
      return NextResponse.json(
        { error: 'Error al obtener templos' },
        { status: 500 }
      );
    }

    return NextResponse.json({ templos: data });
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
    const supabaseUser = await getUser();
    
    if (!supabaseUser) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 403 }
      );
    }
    
    // Verificar si el usuario es administrador en la base de datos
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

    // Insertar el nuevo templo
    const { data, error } = await supabase
      .from('Templo')
      .insert([{
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
      }])
      .select()
      .single();

    if (error) {
      console.error('Error al crear templo:', error);
      return NextResponse.json(
        { error: 'Error al crear templo: ' + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ templo: data }, { status: 201 });
  } catch (error) {
    console.error('Error inesperado:', error);
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    );
  }
} 