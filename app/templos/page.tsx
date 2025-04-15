import { getAllTemplos } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Templos | Templo de Tierra',
  description: 'Descubre nuestros templos de bioconstrucción, cada uno con su propia energía y diseño único, en plena conexión con la naturaleza.',
}

export default function TemplosPage() {
  const templos = getAllTemplos();
  
  return (
    <main className="pt-[140px] pb-16 px-[30px]">
      {/* Encabezado */}
      <div className="grid grid-cols-12 mb-18">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 text-center">
          <h1 className="text-[2.5rem] md:text-[3.5rem] font-heading text-[#6F4C21] mb-6">
            Nuestros Templos
          </h1>
          <p className="text-[#6F4C21]/80 text-lg">
            Cada templo es una obra única de bioconstrucción, diseñada para ofrecerte una experiencia 
            de conexión profunda con la naturaleza y contigo mismo.
          </p>
        </div>
      </div>
      
      {/* Grid de templos */}
      <div className="grid grid-cols-12 gap-x-8 gap-y-12">
        {templos.map((templo) => (
          <div key={templo.id} className="col-span-12 md:col-span-6 lg:col-span-4">
            <Link href={`/templos/${templo.slug}`} className="group">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                <Image
                  src={templo.imagenPrincipal}
                  alt={templo.nombre}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h2 className="text-[1.5rem] font-heading text-[#6F4C21] mb-2">
                {templo.nombre}
              </h2>
              <p className="text-[#6F4C21]/70 mb-2">
                {templo.capacidad}
              </p>
              <p className="text-[#6F4C21]/80 line-clamp-2">
                {templo.descripcionCorta}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
} 