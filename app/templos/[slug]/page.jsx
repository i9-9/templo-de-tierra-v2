import { getTemploBySlug, getAllTemplos } from '@/lib/data'
import { notFound } from 'next/navigation'
import TemploDetalles from '@/app/components/ui/TemploDetalles'
import { TemploJsonLd } from '@/app/components/JsonLd'
import Breadcrumbs from '@/app/components/ui/Breadcrumbs'

export async function generateMetadata({ params }) {
  const templo = getTemploBySlug(params.slug);
  
  if (!templo) {
    return {
      title: 'Templo no encontrado | Templo de Tierra',
      description: 'Lo sentimos, no pudimos encontrar el templo que estás buscando.'
    };
  }
  
  return {
    title: `${templo.nombre} | Alojamiento en Bioconstrucción`,
    description: `${templo.descripcionCorta} Un espacio único construido con técnicas ancestrales de bioconstrucción en Argentina.`,
    keywords: ["bioconstrucción", "alojamiento sostenible", "arquitectura natural", templo.nombre, "Argentina", "hospedaje ecológico", "construcción con tierra"],
    openGraph: {
      title: `${templo.nombre} | Templo de Tierra`,
      description: templo.descripcionCorta,
      images: [
        {
          url: templo.imagenPrincipal,
          width: 1200,
          height: 630,
          alt: `${templo.nombre} - Templo de Tierra`
        }
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${templo.nombre} | Templo de Tierra`,
      description: templo.descripcionCorta,
      images: [templo.imagenPrincipal],
    }
  };
}

export async function generateStaticParams() {
  const templos = getAllTemplos();
  
  return templos.map(templo => ({
    slug: templo.slug,
  }));
}

export default function TemploPage({ params }) {
  const templo = getTemploBySlug(params.slug);
  
  if (!templo) {
    notFound();
  }
  
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <Breadcrumbs 
          items={[
            { label: 'Templos', href: '/templos' },
            { label: templo.nombre }
          ]} 
        />
        <TemploDetalles templo={templo} />
        <TemploJsonLd 
          name={templo.nombre}
          description={templo.descripcion}
          images={templo.imagenes}
          capacity={templo.capacidad}
        />
      </div>
    </main>
  );
} 