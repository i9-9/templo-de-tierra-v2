import TemploForm from '@/app/components/admin/TemploForm';
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

  // Templo de ejemplo (sin conexión a DB)
  const temploFormateado = {
    id: resolvedParams.id,
    nombre: 'Templo',
    slug: 'templo',
    descripcion: 'Descripción del templo',
    descripcionCorta: 'Descripción corta',
    capacidad: 2,
    precio: 0,
    amenities: [],
    camas: [],
    imagenPrincipal: '',
    imagenes: [],
    destacado: false
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