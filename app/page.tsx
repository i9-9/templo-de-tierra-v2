import Hero from './components/Hero'
import Link from 'next/link'
import Image from 'next/image'
import { getAllTemplos } from '@/lib/data'
import Card from '@/app/components/ui/Card'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Templo de Tierra | Alojamientos Sostenibles en Bioconstrucción",
  description: "Templo de Tierra ofrece alojamientos únicos construidos con técnicas ancestrales de bioconstrucción en Uruguay. Vive una experiencia sostenible en armonía con la naturaleza.",
  keywords: ["bioconstrucción", "alojamiento sostenible", "arquitectura natural", "construcción con tierra", "Uruguay", "ecoturismo", "templos", "hospedaje ecológico"],
  openGraph: {
    title: "Templo de Tierra | Alojamientos Sostenibles en Bioconstrucción",
    description: "Templo de Tierra ofrece alojamientos únicos construidos con técnicas ancestrales de bioconstrucción en Uruguay. Vive una experiencia sostenible en armonía con la naturaleza.",
    images: [
      {
        url: "/tdt/DSC02909.png", 
        width: 1200,
        height: 630,
        alt: "Templo de Tierra - Vista principal"
      }
    ]
  }
};

export default function Home() {
  const templos = getAllTemplos().slice(0, 3); // Solo mostrar 3 templos en la página principal
  
  return (
    <main>
      <Hero />
      
      {/* Templos Destacados */}
      <section className="w-full py-24 mt-8 overflow-hidden">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 text-center mb-16 transform transition-all duration-1000 animate-fade-in-up">
            <h2 className="text-[2.5rem] font-heading text-[#6F4C21] mb-6">
              Templos Destacados
            </h2>
            <p className="text-[#6F4C21]/80 text-lg mx-auto">
              Cada templo tiene su propia esencia y carácter único, diseñado para proporcionar
              una experiencia inolvidable en armonía con la naturaleza.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-12 gap-8 mb-12">
          {templos.map((templo, index) => (
            <div 
              key={templo.id}
              className="col-span-12 md:col-span-4 transform transition-all duration-1000"
              style={{ 
                animationDelay: `${(index + 1) * 0.2}s`,
                animationFillMode: 'both',
                animation: 'fade-in-up 0.8s ease-out'
              }}
            >
              <Card
                title={templo.nombre}
                description={templo.descripcionCorta}
                imageSrc={templo.imagenPrincipal}
                href={`/templos/${templo.slug}`}
                aspectRatio="3/2"
                tags={[templo.capacidad, templo.amenities[0]]}
              />
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-12">
          <div className="col-span-12 text-center transform transition-all duration-1000 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <Link 
              href="/templos" 
              className="inline-block border-2 border-[#6F4C21] text-[#6F4C21] py-3 px-8 rounded-lg hover:bg-[#6F4C21] hover:text-[#F5DC90] transition-colors font-medium hover:scale-105 transition-transform duration-300"
            >
              Ver todos los templos
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Experiencias */}
      <section className="w-full py-24 bg-[#F5DC90]/20 overflow-hidden">
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 md:col-span-6 md:col-start-1 relative aspect-[16/9] rounded-lg overflow-hidden mb-6 shadow-lg">
            <Image
              src="/tdt/DSC01411.png"
              alt="Experiencias en Templo de Tierra"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          
          <div className="col-span-12 md:col-span-6 space-y-6 transform transition-all duration-1000 animate-fade-in-right">
            <h2 className="text-[2.5rem] font-heading text-[#6F4C21]">
              Descubre Nuestras Experiencias
            </h2>
            <p className="text-[#6F4C21]/80 text-lg">
              Complementa tu estancia con nuestras experiencias diseñadas para 
              conectarte con la naturaleza, contigo mismo y con técnicas ancestrales 
              de construcción sostenible.
            </p>
            <ul className="space-y-3 text-[#6F4C21]/80">
              {['Retiros de bienestar', 'Clases de yoga', 'Meditación guiada', 'Talleres de bioconstrucción'].map((item, index) => (
                <li 
                  key={index} 
                  className="flex items-center gap-2 transform transition-all"
                  style={{ 
                    animationDelay: `${1 + (index * 0.15)}s`,
                    animationFillMode: 'both',
                    animation: 'fade-in-right 0.5s ease-out'
                  }}
                >
                  <span className="text-[#6F4C21] transform transition-all hover:scale-125 duration-300">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 transform transition-all duration-500" style={{ animationDelay: '1.6s', animationFillMode: 'both', animation: 'bounce-in 0.8s ease-out' }}>
              <Link 
                href="/experiencias" 
                className="inline-block bg-[#6F4C21] text-[#F5DC90] py-3 px-8 rounded-lg hover:bg-[#5A3D1A] transition-colors font-medium hover:scale-105 transition-transform duration-300"
              >
                Explorar experiencias
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contacto CTA */}
      <section className="w-full py-24 bg-[#6F4C21] overflow-hidden">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 text-center transform transition-all duration-1000 animate-fade-in-up">
            <h2 className="text-[2.5rem] font-heading text-[#F5DC90] mb-6">
              ¿Listo para una experiencia única?
            </h2>
            <p className="text-[#F5DC90]/90 text-lg mb-8">
              Contáctanos para consultar disponibilidad o resolver cualquier duda.
              Estamos aquí para ayudarte a planificar tu estancia perfecta.
            </p>
            <Link 
              href="/contacto" 
              className="inline-block bg-[#F5DC90] text-[#6F4C21] py-3 px-8 rounded-lg hover:bg-[#F5E8C7] transition-colors font-medium text-lg hover:scale-105 transition-transform duration-300"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
