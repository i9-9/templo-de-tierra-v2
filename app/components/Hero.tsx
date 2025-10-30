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
    <section className="relative min-h-screen w-full">
      {/* Imagen a full width */}
      <div className="relative w-full h-screen overflow-hidden animate-fade-up" style={{ animationDuration: '1s', animationDelay: '0.4s' }}>
        <div className="relative w-full h-full">
          <ImageCarousel 
            images={heroImages} 
            imageClassName="object-cover w-full h-full" 
          />
          {/* Overlay gradiente más fuerte para mejor legibilidad del texto */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/70 via-[#000000]/30 to-transparent"></div>
        </div>

        {/* Texto y botones centrados sobre la imagen */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8">
          <div className="text-center space-y-8 max-w-4xl animate-fade-up" style={{ animationDuration: '1s', animationDelay: '0.6s' }}>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#F5DC90] leading-tight drop-shadow-2xl" style={{ textShadow: '0px 2px 6px rgba(0,0,0,0.25)' }}>
              Un santuario natural donde la sabiduría ancestral se encuentra con el presente
            </h1>
            <div className="flex items-center justify-center gap-2 text-[#F5DC90] text-base md:text-lg -mt-2 -mb-2" style={{ textShadow: '0px 2px 6px rgba(0,0,0,0.25)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <path fillRule="evenodd" d="M11.54 22.35a.75.75 0 0 0 .92 0C14.29 20.95 20.5 16.03 20.5 11a8.5 8.5 0 1 0-17 0c0 5.03 6.21 9.95 8.04 11.35ZM12 13.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
              </svg>
              <span>Punta del Este, Uruguay</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDuration: '1s', animationDelay: '0.8s' }}>
              <Button variant="primary" href="/templos" className="w-full sm:w-auto min-w-[200px]">
                Ver templos
              </Button>
              <Button variant="secondary" href="/experiencias" className="w-full sm:w-auto min-w-[200px]">
                Experiencias
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 