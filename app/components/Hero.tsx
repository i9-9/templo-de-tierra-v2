'use client'

import ImageCarousel from './ui/ImageCarousel'
import Button from './ui/Button'

const heroImages = [
  {
    src: '/hero/desktop-hero.png',
    alt: 'Templo de Tierra - Vista 1'
  },
  {
    src: '/hero/desktop-hero2.png',
    alt: 'Templo de Tierra - Vista 2'
  },
  {
    src: '/hero/desktop-hero3.png',
    alt: 'Templo de Tierra - Vista 3'
  },
  {
    src: '/hero/desktop-hero4.png',
    alt: 'Templo de Tierra - Vista 4'
  }
]

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-30px)] pt-[116px] w-full">
      {/* Contenedor principal con máximo ancho y centrado */}
      <div className="w-full px-[30px]">
        <div className="w-full">
          {/* Imagen a pantalla completa */}
          <div className="relative w-full h-[calc(100vh-146px)] rounded-lg overflow-hidden shadow-md animate-fade-up" style={{ animationDuration: '1s', animationDelay: '0.4s' }}>
            <div className="relative w-full h-full">
              <ImageCarousel 
                images={heroImages} 
                imageClassName="object-cover w-full h-full" 
              />
              {/* Overlay gradiente para mejorar legibilidad del texto */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/50 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Contenedor de texto y botones - ahora como barra horizontal */}
        <div className="absolute left-[30px] right-[30px] bottom-0 animate-fade-up" style={{ animationDuration: '1s', animationDelay: '0.6s' }}>
          <div className="backdrop-blur-md bg-[#F5DC90]/60 py-3 px-4 md:px-8 border-t border-[#6F4C21]/20">
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
              <h2 className="font-heading text-2xl md:text-2xl lg:text-3xl text-[#6F4C21] leading-tight text-left animate-fade-right md:whitespace-nowrap" style={{ animationDuration: '1s', animationDelay: '0.8s' }}>
                Un santuario natural donde la sabiduría ancestral se encuentra con el presente
              </h2>
              <div className="flex gap-4 animate-fade-left" style={{ animationDuration: '1s', animationDelay: '1s' }}>
                <Button variant="primary" href="/templos">
                  Ver templos
                </Button>
                <Button variant="secondary" href="/experiencias">
                  Experiencias
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 