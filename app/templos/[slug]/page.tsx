import { notFound } from 'next/navigation'
import { getTemploBySlug } from '@/lib/templos'
import ImageGallery from '@/app/components/ImageGallery'
import ReservaForm from '@/app/components/ReservaForm'

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const metadata = {
  title: 'Templo | Templo de Tierra',
  description: 'Descubre este templo único de bioconstrucción, diseñado para ofrecerte una experiencia de conexión profunda con la naturaleza.',
}

export default async function TemploPage({ params }: PageProps) {
  const resolvedParams = await params;
  const templo = await getTemploBySlug(resolvedParams.slug)
  
  if (!templo) {
    notFound()
  }

  return (
    <div className="bg-warm-sand min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h1 className="text-4xl font-bold text-earth-brown mb-4">{templo.nombre}</h1>
            <p className="text-gray-700 mb-6">{templo.descripcion}</p>
            
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-earth-brown mb-4">Galería</h2>
              <ImageGallery images={templo.imagenes} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-earth-brown mb-4">Reservar</h2>
            <ReservaForm 
              temploId={templo.id}
              precioPorNoche={templo.precio_por_noche}
              capacidad={templo.capacidad}
              nombre={templo.nombre}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 