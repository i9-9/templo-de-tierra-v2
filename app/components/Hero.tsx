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
    <section className="h-screen">
      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-12 h-full">
        <div className="col-span-6 bg-[#F5DC90] flex items-center justify-center p-6">
          <div className="max-w-2xl">
            <h1 className="font-heading text-[4.3rem] text-[#6F4C21] mb-6 leading-[1.1]">
              Templo de Tierra
            </h1>
            <p className="font-sans text-[1.44rem] text-[#6F4C21] tracking-tight mb-[30px]">
              Un santuario natural donde la sabiduría ancestral se encuentra con el presente
            </p>
            <div className="flex gap-4">
              <Button href="/about" variant="primary">
                Conócenos
              </Button>
              <Button href="/contact" variant="secondary">
                Conoce más
              </Button>
            </div>
          </div>
        </div>
        
        <div className="col-span-6 relative h-full p-0 pt-4 pr-4 pb-4">
          <div className="absolute inset-4 mt-[96px] bg-[#F5DC90]/10 z-10 rounded-lg border border-[#6F4C21]/20"></div>
          <div className="absolute inset-4 mt-[96px] overflow-hidden rounded-lg h-[calc(100%-96px-32px)]">
            <ImageCarousel 
              images={heroImages} 
              imageClassName="object-cover w-full h-full" 
            />
          </div>
        </div>
      </div>
      
      {/* Mobile Layout - aligned in first column */}
      <div className="md:hidden flex flex-col h-[calc(100vh-96px-16px)] gap-4 mt-[96px] mx-4">
        {/* First Row - Text Content (1/4) */}
        <div className="relative h-1/4 min-h-[200px]">
          <div className="absolute inset-0 bg-[#F5DC90] z-10 rounded-lg border border-[#6F4C21]/20 shadow-lg"></div>
          <div className="absolute inset-0 rounded-lg py-6 flex items-center">
            <div className="relative z-20 w-full px-8">
              <h1 className="font-heading text-[2.5rem] text-[#6F4C21] mb-3 leading-[1.1]">
                Templo de Tierra
              </h1>
              <p className="font-sans text-[1rem] text-[#6F4C21] tracking-tight mb-4">
                Un santuario natural donde la sabiduría ancestral se encuentra con el presente
              </p>
              <div className="flex gap-2 scale-90 origin-top-left mt-2">
                <Button href="/about" variant="primary">
                  Conócenos
                </Button>
                <Button href="/contact" variant="secondary">
                  Conoce más
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Second Row - Images (3/4) */}
        <div className="relative h-3/4">
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