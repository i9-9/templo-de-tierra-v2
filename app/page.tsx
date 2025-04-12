import Hero from './components/Hero'
import Link from 'next/link'
import Image from 'next/image'
import { getAllTemplos } from '@/lib/data'
import { Metadata } from 'next'
import Button from '@/app/components/ui/Button'
import AnimateOnScroll from '@/app/components/ui/AnimateOnScroll'

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
  const templos = getAllTemplos();
  // Filtramos los templos destacados (Durga y Shanti)
  const templosDestacados = templos.filter(templo => templo.id === 'durga' || templo.id === 'shanti');
  // Filtramos otros templos para mostrar en formato más simple
  const otrosTemplos = templos.filter(templo => templo.id !== 'durga' && templo.id !== 'shanti');
  
  return (
    <main>
      <Hero />
      
      {/* Templos Destacados */}
      <section className="w-full py-24 mt-8">
        <AnimateOnScroll animationClass="fadeUp" delay={0}>
          <div className="text-center mb-16">
            <h2 className="text-[2.5rem] font-heading text-[#6F4C21] mb-6">
              Templos Destacados
            </h2>
            <p className="text-[#6F4C21]/80 text-lg">
              Cada templo tiene su propia esencia y carácter único, diseñado para proporcionar
              una experiencia inolvidable en armonía con la naturaleza.
            </p>
          </div>
        </AnimateOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {templosDestacados.map((templo, index) => (
            <AnimateOnScroll 
              key={templo.id}
              animationClass="fadeUp" 
              delay={0.2 + (index * 0.15)}
            >
              <div className="relative z-10 h-full">
                {/* Efecto de gradiente para destacar */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#D8A34B] via-[#F5DC90] to-[#D8A34B] rounded-xl opacity-70 blur-sm -z-10"></div>
                
                <div className="transform hover:scale-[1.02] transition-transform duration-300 h-full">
                  <Link 
                    href={`/templos/${templo.slug}`}
                    className="block group overflow-hidden rounded-lg border border-[#6F4C21]/20 shadow-md transition-all duration-300 hover:shadow-lg h-full flex flex-col"
                  >
                    {/* Sección de imagen */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#F5DC90]/10">
                      <Image
                        src={templo.imagenPrincipal}
                        alt={templo.nombre}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-110"
                        priority
                        quality={90}
                      />
                      <div className="absolute top-3 right-3 bg-[#D8A34B] text-white py-1 px-3 rounded-full text-sm font-medium shadow-md z-10">
                        Destacado
                      </div>
                    </div>
                    
                    {/* Sección de contenido */}
                    <div className="p-6 bg-[#F5DC90]/40 backdrop-blur-sm flex-grow flex flex-col">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="inline-block text-xs px-2 py-1 rounded-full bg-[#6F4C21]/10 text-[#6F4C21]">
                          {templo.capacidad}
                        </span>
                        <span className="inline-block text-xs px-2 py-1 rounded-full bg-[#6F4C21]/10 text-[#6F4C21]">
                          ⭐ {templo.amenities[0]}
                        </span>
                      </div>
                      
                      <h3 className="font-heading text-[1.26rem] text-[#6F4C21] mb-2 leading-tight">
                        {templo.nombre}
                      </h3>
                      
                      <p className="font-sans text-sm text-[#6F4C21]/80 line-clamp-3 mb-4 flex-grow">
                        {templo.descripcionCorta}
                      </p>
                      
                      <div className="mt-auto flex items-center justify-end">
                        <Button variant="tertiary" className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                          Ver más →
                        </Button>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>
      
      {/* Otros templos en cards más pequeñas */}
      {otrosTemplos.length > 0 && (
        <div className="grid grid-cols-12 gap-4 mb-16">
          <div className="col-span-12 animate-fade-up" style={{ animationDuration: '0.7s', animationDelay: '0.5s' }}>
            <h3 className="text-[1.5rem] font-heading text-[#6F4C21] mb-6 text-center">
              Otros templos disponibles
            </h3>
          </div>
          
          {otrosTemplos.map((templo, index) => (
            <div 
              key={templo.id}
              className="col-span-12 sm:col-span-6 md:col-span-4 animate-fade-up"
              style={{ 
                animationDuration: '0.7s',
                animationDelay: `${0.6 + (index * 0.1)}s`
              }}
            >
              <Link 
                href={`/templos/${templo.slug}`}
                className="block group overflow-hidden rounded-lg border border-[#6F4C21]/10 hover:border-[#6F4C21]/30 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-row"
              >
                <div className="relative w-1/3 overflow-hidden bg-[#F5DC90]/10">
                  <Image
                    src={templo.imagenPrincipal}
                    alt={templo.nombre}
                    fill
                    sizes="(max-width: 768px) 33vw, 20vw"
                    className="object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                </div>
                <div className="p-3 flex-grow bg-[#F5DC90]/30 backdrop-blur-sm">
                  <h4 className="font-heading text-[1rem] text-[#6F4C21] leading-tight mb-1">
                    {templo.nombre}
                  </h4>
                  <p className="text-xs text-[#6F4C21]/70 mb-1">
                    {templo.capacidad}
                  </p>
                  <div className="text-right mt-1">
                    <Button variant="tertiary" className="text-xs group-hover:translate-x-1 transition-transform duration-300">
                      Ver →
                    </Button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
      
      <div className="grid grid-cols-12 mb-16">
        <div className="col-span-12 text-center animate-fade-up" style={{ animationDuration: '0.7s', animationDelay: '0.8s' }}>
          <Button variant="secondary" href="/templos">
            Ver todos los templos
          </Button>
        </div>
      </div>
      
      {/* CTA Experiencias */}
      <div className="mb-16 px-4 md:px-6 lg:px-8">
        <div className="bg-[#F5DC90]/20 rounded-xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <AnimateOnScroll animationClass="fadeRight">
              <div className="relative rounded-lg overflow-hidden shadow-lg aspect-[4/3]">
                <Image
                  src="/tdt/DSC01411.png"
                  alt="Experiencias en Templo de Tierra"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animationClass="fadeLeft">
              <div className="flex flex-col justify-center space-y-6">
                <h2 className="text-[1.8rem] md:text-[2.2rem] font-heading text-[#6F4C21]">
                  Descubre Nuestras Experiencias
                </h2>
                <p className="text-[#6F4C21]/80 text-lg">
                  Complementa tu estancia con nuestras experiencias diseñadas para conectarte con la naturaleza, 
                  contigo mismo y con técnicas ancestrales de construcción sostenible.
                </p>
                
                <ul className="space-y-3 text-[#6F4C21]/80">
                  {['Retiros de bienestar', 'Clases de yoga', 'Meditación guiada', 'Talleres de bioconstrucción'].map((item, index) => (
                    <AnimateOnScroll 
                      key={index}
                      animationClass="fadeLeft"
                      delay={0.2 + (index * 0.15)}
                    >
                      <li className="flex items-center gap-2">
                        <span className="text-[#6F4C21] transform transition-all hover:scale-125 duration-300">✓</span>
                        <span>{item}</span>
                      </li>
                    </AnimateOnScroll>
                  ))}
                </ul>
                
                <AnimateOnScroll animationClass="fadeUp" delay={0.4}>
                  <div className="pt-4">
                    <Button variant="primary" href="/experiencias">
                      Explorar experiencias
                    </Button>
                  </div>
                </AnimateOnScroll>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
      
      {/* Contacto CTA */}
      <div className="mb-16 px-4 md:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#F5DC90]/20 to-[#F5DC90]/40 rounded-xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-24 bg-[#6F4C21]/5 rounded-full -translate-x-12 -translate-y-12"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#6F4C21]/5 rounded-full translate-x-16 translate-y-16"></div>
          
          <div className="relative z-10">
            <AnimateOnScroll animationClass="fadeUp">
              <h2 className="text-[1.8rem] md:text-[2.2rem] font-heading text-[#6F4C21] mb-4">
                ¿Tienes alguna pregunta?
              </h2>
            </AnimateOnScroll>
            
            <AnimateOnScroll animationClass="fadeUp" delay={0.2}>
              <p className="text-[#6F4C21]/80 text-lg mb-8">
                Estamos aquí para ayudarte a planificar tu estadía perfecta
              </p>
            </AnimateOnScroll>
            
            <AnimateOnScroll animationClass="fadeUp" delay={0.4}>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <Button href="/contacto" variant="primary">
                  Contáctanos
                </Button>
                <Button href="/templos" variant="secondary">
                  Ver templos disponibles
                </Button>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </main>
  );
}
