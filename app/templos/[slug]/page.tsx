import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ImageGallery from '@/app/components/ImageGallery';
import ReservaForm from '@/app/components/ReservaForm';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const templo = await prisma.templo.findUnique({
    where: { slug: params.slug },
    select: { nombre: true, descripcion: true, imagenes: true }
  });

  if (!templo) {
    return {
      title: 'Templo no encontrado | Templo de Tierra',
      description: 'El templo que buscas no existe o ha sido eliminado.'
    };
  }

  return {
    title: `${templo.nombre} | Templo de Tierra`,
    description: templo.descripcion,
    openGraph: {
      images: templo.imagenes[0] ? [templo.imagenes[0]] : []
    }
  };
}

export default async function TemploPage({ params }: PageProps) {
  const templo = await prisma.templo.findUnique({
    where: { slug: params.slug },
    select: {
      id: true,
      nombre: true,
      descripcion: true,
      capacidad: true,
      precio: true,
      amenities: true,
      camas: true,
      descripcionCorta: true,
      imagenPrincipal: true,
      imagenes: true,
      slug: true
    }
  });

  if (!templo) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-[150px]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ImageGallery images={templo.imagenes} />
          </div>
          <div>
            <h1 className="text-4xl font-heading mb-4">{templo.nombre}</h1>
            <p className="text-lg mb-6">{templo.descripcion}</p>
            
            <div className="mb-8">
              <h2 className="text-2xl font-heading mb-4">Amenidades</h2>
              <ul className="grid grid-cols-2 gap-4">
                {templo.amenities.map((amenity, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-[#F5DC90]">•</span>
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-heading mb-4">Configuración de camas</h2>
              <ul className="space-y-2">
                {templo.camas.map((cama, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-[#F5DC90]">•</span>
                    {cama}
                  </li>
                ))}
              </ul>
            </div>

            <ReservaForm 
              temploId={templo.id}
              precioPorNoche={Number(templo.precio)}
              capacidad={templo.capacidad}
              nombre={templo.nombre}
            />
          </div>
        </div>
      </div>
    </main>
  );
} 