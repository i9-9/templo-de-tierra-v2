import { notFound } from 'next/navigation';
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
    capacidad: parseInt(templo.capacidad),
    precio: 0, // Campo no disponible en el esquema actual
    amenities: templo.amenities,
    camas: templo.camas ? [templo.camas] : [], // Convertir string a array
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