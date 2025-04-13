import { prisma } from '@/lib/prisma'
import Card from '@/app/components/ui/Card'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/app/components/ui/Button'

export const metadata = {
  title: 'Nuestros Templos | Templo de Tierra',
  description: 'Descubre nuestra selección de templos construidos con técnicas ancestrales de bioconstrucción, cada uno con su propia esencia y carácter único.',
}

interface Templo {
  id: string;
  nombre: string;
  descripcionCorta: string;
  capacidad: string;
  imagenPrincipal: string;
  amenities: string[];
  slug: string;
  precio: string;
}

export default async function TemplosPage() {
  const templos = await prisma.templo.findMany({
    select: {
      id: true,
      nombre: true,
      descripcionCorta: true,
      capacidad: true,
      imagenPrincipal: true,
      amenities: true,
      slug: true,
      precio: true,
    }
  });
  
  // Convert Decimal values to numbers
  const formattedTemplos = templos.map(templo => ({
    ...templo,
    precio: Number(templo.precio)
  }));
  
  return (
    <main className="pt-[120px] pb-16">
      <div className="grid grid-cols-12 mb-16">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 text-center">
          <h1 className="text-[2.5rem] md:text-[3.5rem] font-heading text-[#6F4C21] mb-6">
            Nuestros Templos
          </h1>
          <p className="text-[#6F4C21]/80 text-lg mx-auto">
            Cada templo en nuestra comunidad está construido a mano utilizando técnicas 
            ancestrales de bioconstrucción, incorporando materiales naturales como arcilla, 
            arena, paja y madera local.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-8 mb-16">
        {formattedTemplos.map(templo => {
          // Verificamos si es uno de los templos destacados
          const isDestacado = templo.id === 'durga' || templo.id === 'shanti';
          
          return (
            <div 
              key={templo.id} 
              className={`col-span-12 md:col-span-6 lg:col-span-4 ${isDestacado ? 'relative z-10' : ''}`}
            >
              {isDestacado && (
                <div className="absolute -inset-1 bg-gradient-to-r from-[#D8A34B] via-[#F5DC90] to-[#D8A34B] rounded-xl opacity-70 blur-sm -z-10"></div>
              )}
              <div className={`${isDestacado ? 'transform hover:scale-[1.02] transition-transform duration-300' : ''} h-full`}>
                <Link 
                  href={`/templos/${templo.slug}`}
                  className="block group overflow-hidden rounded-lg border border-[#6F4C21]/20 shadow-md transition-all duration-300 hover:shadow-lg h-full flex flex-col"
                >
                  {/* Sección de imagen */}
                  <div className="relative w-full aspect-[3/2] overflow-hidden bg-[#F5DC90]/10">
                    <Image
                      src={templo.imagenPrincipal}
                      alt={templo.nombre}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-110"
                      priority
                      quality={90}
                    />
                    {isDestacado && (
                      <div className="absolute top-3 right-3 bg-[#D8A34B] text-white py-1 px-3 rounded-full text-sm font-medium shadow-md z-10">
                        Destacado
                      </div>
                    )}
                  </div>
                  
                  {/* Sección de contenido */}
                  <div className="p-6 bg-[#F5DC90]/40 backdrop-blur-sm flex-grow flex flex-col">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="inline-block text-xs px-2 py-1 rounded-full bg-[#6F4C21]/10 text-[#6F4C21]">
                        {templo.capacidad}
                      </span>
                      <span className="inline-block text-xs px-2 py-1 rounded-full bg-[#6F4C21]/10 text-[#6F4C21]">
                        {isDestacado ? '⭐ Destacado' : templo.amenities[0]}
                      </span>
                    </div>
                    
                    <h3 className="font-heading text-[1.26rem] text-[#6F4C21] mb-2 leading-tight">
                      {templo.nombre}
                    </h3>
                    
                    <p className="font-sans text-sm text-[#6F4C21]/80 line-clamp-3 mb-4 flex-grow">
                      {templo.descripcionCorta}
                    </p>
                    
                    <div className="flex flex-col gap-4">
                      <Button variant="primary" className="w-full">
                        Ver detalles
                      </Button>
                      <Button variant="secondary" className="w-full">
                        Reservar visita
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3">
          <div className="bg-[#F5DC90]/20 rounded-xl p-8 md:p-12 mt-16">
            <h2 className="text-[1.953rem] md:text-[2.441rem] font-heading text-[#6F4C21] mb-6 text-center">
              ¿Por qué elegir Templo de Tierra?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/40 p-6 rounded-lg">
                <h3 className="text-[1.25rem] font-heading text-[#6F4C21] mb-3">Conexión con la naturaleza</h3>
                <p className="text-[#6F4C21]/80">
                  Nuestros templos están diseñados para integrarse perfectamente con el entorno natural,
                  permitiéndote desconectar del bullicio urbano y reconectar con la naturaleza.
                </p>
              </div>
              
              <div className="bg-white/40 p-6 rounded-lg">
                <h3 className="text-[1.25rem] font-heading text-[#6F4C21] mb-3">Construcción sostenible</h3>
                <p className="text-[#6F4C21]/80">
                  Cada estructura está construida utilizando técnicas tradicionales de bioconstrucción,
                  con materiales naturales y locales que reducen significativamente el impacto ambiental.
                </p>
              </div>
              
              <div className="bg-white/40 p-6 rounded-lg">
                <h3 className="text-[1.25rem] font-heading text-[#6F4C21] mb-3">Experiencia única</h3>
                <p className="text-[#6F4C21]/80">
                  Más que un simple alojamiento, ofrecemos una experiencia de vida que te conecta
                  con técnicas ancestrales y una forma de vivir más consciente y sostenible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 