import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import TemploForm from '@/app/components/admin/TemploForm';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `Editar Templo | Panel de Administración`
  };
}

export default async function EditarTemplo({
  params,
}: PageProps) {
  const resolvedParams = await params;
  const session = await getServerSession(authOptions);
  
  // Verificar que el usuario esté autenticado y sea admin
  if (!session || !session.user.isAdmin) {
    redirect('/auth/signin');
  }

  // Obtener el templo por ID
  const templo = await prisma.templo.findUnique({
    where: {
      id: resolvedParams.id
    }
  });

  // Si no existe el templo, mostrar 404
  if (!templo) {
    notFound();
  }

  // Convertir el objeto templo al formato esperado por el formulario
  const temploFormateado = {
    id: templo.id,
    nombre: templo.nombre,
    slug: templo.slug,
    descripcion: templo.descripcion,
    descripcionCorta: templo.descripcionCorta,
    capacidad: templo.capacidad,
    precio: parseFloat(templo.precio.toString()), // Convertir Decimal a number
    amenities: templo.amenities,
    camas: templo.camas,
    imagenPrincipal: templo.imagenPrincipal,
    imagenes: templo.imagenes,
    destacado: templo.destacado
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Editar Templo</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <TemploForm templo={temploFormateado} />
      </div>
    </div>
  );
} 