import { notFound } from 'next/navigation'
import { getTemploBySlug } from '@/lib/templos'
import TemploDetalles from '@/app/components/ui/TemploDetalles'

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
    <main className="pt-[140px] pb-16 px-[30px]">
      <div className="max-w-7xl mx-auto">
        <TemploDetalles templo={templo} />
      </div>
    </main>
  )
} 