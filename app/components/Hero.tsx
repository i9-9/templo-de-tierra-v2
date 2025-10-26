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
          <div className="text-center space-y-6 max-w-4xl animate-fade-up" style={{ animationDuration: '1s', animationDelay: '0.6s' }}>
            <div className="space-y-4">
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#F5DC90] leading-tight drop-shadow-2xl">
                Un santuario natural donde la sabiduría ancestral se encuentra con el presente
              </h1>
              <p className="font-sans text-base md:text-lg lg:text-xl text-[#F5DC90] drop-shadow-xl flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>Punta del Este, Uruguay</span>
              </p>
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