'use client'

import Button from './ui/Button'
import ImageCarousel from './ui/ImageCarousel'

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

const mobileHeroImages = [
  {
    src: '/hero/mobile-hero.png',
    alt: 'Templo de Tierra - Vista móvil 1'
  },
  {
    src: '/hero/mobile-hero2.png',
    alt: 'Templo de Tierra - Vista móvil 2'
  },
  {
    src: '/hero/mobile-hero3.png',
    alt: 'Templo de Tierra - Vista móvil 3'
  }
]

export default function Hero() {
  return (
    <section className="h-screen pt-[116px] pb-[116px]">
      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-12 h-full">
        <div className="col-span-6 bg-[#F5DC90] flex items-center justify-center p-6">
          <div className="w-full max-w-xl px-4 md:px-6 lg:px-8">
            <h1 className="font-heading text-[4.3rem] text-[#6F4C21] mb-6 leading-[1.1]">
              Templo de Tierra
            </h1>
            <p className="font-sans text-[1.44rem] text-[#6F4C21] tracking-tight mb-[30px]">
              Un santuario natural donde la sabiduría ancestral se encuentra con el presente
            </p>
            <div className="flex gap-4">
              <Button href="/templos" variant="primary">
                Conoce nuestros templos
              </Button>
              <Button href="/experiencias" variant="secondary">
                Experiencias
              </Button>
            </div>
          </div>
        </div>
        
        <div className="col-span-6 relative h-full px-4">
          <div className="absolute inset-x-4 inset-y-0 bg-[#F5DC90]/10 z-10 rounded-lg border border-[#6F4C21]/20"></div>
          <div className="absolute inset-x-4 inset-y-0 overflow-hidden rounded-lg">
            <ImageCarousel 
              images={heroImages} 
              imageClassName="object-cover w-full h-full" 
            />
          </div>
        </div>
      </div>
      
      {/* Mobile Layout - grid de 12 columnas */}
      <div className="md:hidden grid grid-cols-12 gap-4 h-[calc(100vh-232px)] container mx-auto px-4 my-2">
        {/* Text Content Row - Reducir aún más para dar más espacio a la imagen */}
        <div className="col-span-12 h-[15%] min-h-[160px] relative">
          <div className="absolute inset-0 bg-[#F5DC90] z-10 rounded-lg border border-[#6F4C21]/20 shadow-lg"></div>
          <div className="absolute inset-0 rounded-lg py-3 flex items-center">
            <div className="relative z-20 w-full px-4 md:px-8">
              <h1 className="font-heading text-[2.1rem] text-[#6F4C21] mb-1 leading-[1.1]">
                Templo de Tierra
              </h1>
              <p className="font-sans text-[0.9rem] text-[#6F4C21] tracking-tight mb-2">
                Un santuario natural donde la sabiduría ancestral se encuentra con el presente
              </p>
              <div className="flex gap-2 scale-[0.85] origin-top-left">
                <Button href="/templos" variant="primary">
                  Nuestros templos
                </Button>
                <Button href="/experiencias" variant="secondary">
                  Experiencias
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Images Row - Aumentar considerablemente la altura */}
        <div className="col-span-12 h-[85%] relative">
          <div className="absolute inset-0 bg-[#F5DC90]/10 z-10 rounded-lg border border-[#6F4C21]/20 shadow-lg"></div>
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <ImageCarousel 
              images={mobileHeroImages}
              imageClassName="object-cover w-full h-full" 
            />
          </div>
        </div>
      </div>
    </section>
  )
} 