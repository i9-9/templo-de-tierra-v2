import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experiencias Conscientes - Retiros y Talleres | Templo de Tierra',
  description: 'Descubrí nuestras experiencias de bienestar: retiros de yoga, meditación, talleres de bioconstrucción y más. Conectá con la naturaleza en Punta del Este, Uruguay.',
  keywords: [
    'retiros yoga Uruguay',
    'talleres bioconstrucción',
    'meditación Punta del Este',
    'retiros espirituales Uruguay',
    'experiencias conscientes',
    'talleres sustentabilidad'
  ],
  openGraph: {
    title: 'Experiencias Conscientes | Templo de Tierra',
    description: 'Retiros de yoga, meditación y talleres de bioconstrucción en Uruguay',
    images: ['/tdt/DSC01411.png'],
  },
  alternates: {
    canonical: '/experiencias',
  },
};

export default function ExperienciasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
