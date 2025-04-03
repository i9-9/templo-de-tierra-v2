import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-4 right-4 bg-[#F5DC90]/40 backdrop-blur-sm py-4 z-50 rounded-lg border border-[#6F4C21]/20 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)]">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/logo/SVG/Asset 1.svg"
              alt="Templo de Tierra Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="font-heading text-[2.074rem] text-[#6F4C21]">
              Templo de Tierra
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-[30px]">
            <Link href="/" className="font-sans text-[1rem] text-[#6F4C21] hover:text-olive-green transition-colors">
              Inicio
            </Link>
            <Link href="/about" className="font-sans text-[1rem] text-[#6F4C21] hover:text-olive-green transition-colors">
              Sobre Nosotros
            </Link>
            <Link href="/contact" className="font-sans text-[1rem] text-[#6F4C21] hover:text-olive-green transition-colors">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 