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
  },
  {
    src: '/hero/mobile-hero4.png',
    alt: 'Templo de Tierra - Vista móvil 4'
  }
]

export default function Hero() {
  return (
    <section className="h-screen">
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-12 md:col-span-6 bg-[#F5DC90] flex items-center justify-center p-6">
          <div className="max-w-2xl">
            <h1 className="font-heading text-[5.16rem] text-[#6F4C21] ">
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
        <div className="col-span-12 md:col-span-6 relative h-full p-4 md:p-0 md:pt-4 md:pr-4 md:pb-4">
          <div className="absolute inset-4 mt-[96px] bg-[#F5DC90]/10 z-10 rounded-lg border border-[#6F4C21]/20"></div>
          <div className="absolute inset-4 mt-[96px] overflow-hidden rounded-lg h-[calc(100%-96px-32px)]">
            <div className="md:hidden h-full">
              <ImageCarousel images={mobileHeroImages} />
            </div>
            <div className="hidden md:block h-full">
              <ImageCarousel images={heroImages} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 