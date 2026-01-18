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

        {/* Pill de ubicación arriba a la derecha */}
        <div className="absolute top-32 left-1/2 right-auto -translate-x-1/2 md:left-auto md:translate-x-0 md:top-28 md:right-8 lg:top-32 lg:right-10 z-10 animate-fade-up" style={{ animationDuration: '1s', animationDelay: '0.6s' }}>
          <div className="flex items-center gap-2 bg-warm-sand/95 backdrop-blur-sm text-earth-brown px-4 py-2 rounded-full border border-earth-brown/20 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5">
              <path fillRule="evenodd" d="M11.54 22.35a.75.75 0 0 0 .92 0C14.29 20.95 20.5 16.03 20.5 11a8.5 8.5 0 1 0-17 0c0 5.03 6.21 9.95 8.04 11.35ZM12 13.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
            </svg>
            <span className="text-sm md:text-base font-medium">Punta del Este, Uruguay</span>
          </div>
        </div>

        {/* Texto y botones */}
        {/* Mobile: centrado verticalmente todo junto */}
        <div className="absolute inset-0 flex md:hidden flex-col items-start justify-center px-8">
          <div className="text-left space-y-6 max-w-4xl animate-fade-up" style={{ animationDuration: '1s', animationDelay: '0.8s' }}>
            <h1 className="font-heading text-5xl text-[#F5DC90] leading-none drop-shadow-2xl" style={{ textShadow: '0px 2px 6px rgba(0,0,0,0.25)' }}>
              Un santuario natural donde la sabiduría ancestral se encuentra con el presente
            </h1>

            <div className="flex flex-col gap-4 justify-start items-start animate-fade-up" style={{ animationDuration: '1s', animationDelay: '1s' }}>
              <Button variant="primary" href="/templos" className="w-full min-w-[200px]">
                Ver templos
              </Button>
              <Button variant="secondary" href="/experiencias" className="w-full min-w-[200px]">
                Experiencias
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop: título abajo izquierda, botones abajo derecha */}
        <div className="hidden md:flex absolute inset-0 items-end justify-between px-[46px] pb-8 lg:pb-10">
          {/* Título a la izquierda */}
          <div className="max-w-4xl animate-fade-up" style={{ animationDuration: '1s', animationDelay: '0.8s' }}>
            <h1 className="font-heading text-4xl lg:text-5xl xl:text-6xl text-[#F5DC90] leading-none drop-shadow-2xl" style={{ textShadow: '0px 2px 6px rgba(0,0,0,0.25)' }}>
              Un santuario natural donde la sabiduría ancestral se encuentra con el presente
            </h1>
          </div>

          {/* Botones a la derecha */}
          <div className="flex flex-col gap-4 animate-fade-up" style={{ animationDuration: '1s', animationDelay: '1s' }}>
            <Button variant="primary" href="/templos" className="min-w-[200px]">
              Ver templos
            </Button>
            <Button variant="secondary" href="/experiencias" className="min-w-[200px]">
              Experiencias
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 