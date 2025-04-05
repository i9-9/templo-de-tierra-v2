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
    <section className="h-[calc(100vh-30px)] pt-[116px] relative">
      {/* Imagen a pantalla completa */}
      <div className="absolute inset-x-[30px] top-[116px] bottom-0 max-w-[1440px] mx-auto left-0 right-0 rounded-lg overflow-hidden shadow-md">
        <div className="relative w-full h-full">
          <ImageCarousel 
            images={heroImages} 
            imageClassName="object-cover w-full h-full" 
          />
          {/* Overlay gradiente para mejorar legibilidad del texto */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/50 via-transparent to-transparent"></div>
        </div>
        
        {/* Contenedor de texto y botones - ahora como barra horizontal */}
        <div className="absolute left-0 right-0 bottom-0">
          <div className="backdrop-blur-md bg-[#F5DC90]/60 py-3 px-4 md:px-8 border-t border-[#6F4C21]/20">
            <div className="flex items-center justify-between flex-nowrap">
              <h2 className="font-heading text-base md:text-xl lg:text-2xl text-[#6F4C21] leading-tight flex-1 mr-4">
                Un santuario natural donde la sabiduría ancestral se encuentra con el presente
              </h2>
              <div className="flex gap-3 shrink-0">
                <Button href="/templos" variant="primary" className="text-sm md:text-base py-1.5 px-3 md:py-2 md:px-4">
                  Nuestros templos
                </Button>
                <Button href="/experiencias" variant="secondary" className="text-sm md:text-base py-1.5 px-3 md:py-2 md:px-4">
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