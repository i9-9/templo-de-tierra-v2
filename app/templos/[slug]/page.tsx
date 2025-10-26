import { notFound } from 'next/navigation'
import { getTemploBySlug, getAllTemplos } from '@/lib/templos'
import TemploDetalles from '@/app/components/ui/TemploDetalles'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all temples
export async function generateStaticParams() {
  const templos = await getAllTemplos();
  return templos.map((templo) => ({
    slug: templo.slug,
  }));
}

// Dynamic metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const templo = await getTemploBySlug(resolvedParams.slug);

  if (!templo) {
    return {
      title: 'Templo no encontrado | Templo de Tierra',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://templodetierra.com';

  return {
    title: `${templo.nombre} - Alojamiento Ecológico en Bioconstrucción | Templo de Tierra`,
    description: `${templo.descripcionCorta} Capacidad: ${templo.capacidad} personas. ${templo.amenities.slice(0, 3).join(', ')}. Reservá tu experiencia única en Uruguay.`,
    keywords: [
      templo.nombre,
      'bioconstrucción Uruguay',
      'alojamiento ecológico Punta del Este',
      'hospedaje sostenible',
      ...templo.amenities,
    ],
    openGraph: {
      title: `${templo.nombre} | Templo de Tierra`,
      description: templo.descripcionCorta,
      type: 'website',
      images: [
        {
          url: templo.imagenPrincipal,
          width: 1200,
          height: 630,
          alt: `${templo.nombre} - Vista exterior`,
        },
      ],
      url: `${baseUrl}/templos/${templo.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${templo.nombre} | Templo de Tierra`,
      description: templo.descripcionCorta,
      images: [templo.imagenPrincipal],
    },
    alternates: {
      canonical: `/templos/${templo.slug}`,
    },
  };
}

export default async function TemploPage({ params }: PageProps) {
  const resolvedParams = await params;
  const templo = await getTemploBySlug(resolvedParams.slug)
  
  if (!templo) {
    notFound()
  }

  return (
    <main className="pt-[140px] pb-16 px-[30px]">
      <div className="max-w-7xl mx-auto">
        <TemploDetalles templo={templo} />
      </div>
    </main>
  )
} 