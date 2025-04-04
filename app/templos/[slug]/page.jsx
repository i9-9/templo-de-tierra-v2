import { getTemploBySlug, getAllTemplos } from '@/lib/data'
import { notFound } from 'next/navigation'
import TemploDetalles from '@/app/components/ui/TemploDetalles'

export async function generateMetadata({ params }) {
  const templo = getTemploBySlug(params.slug);
  
  if (!templo) {
    return {
      title: 'Templo no encontrado | Templo de Tierra',
      description: 'Lo sentimos, no pudimos encontrar el templo que estás buscando.'
    };
  }
  
  return {
    title: `${templo.nombre} | Templo de Tierra`,
    description: templo.descripcionCorta,
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
      <TemploDetalles templo={templo} />
    </main>
  );
} 