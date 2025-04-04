'use client'

import Link from 'next/link'
import Image from 'next/image'
import MobileMenu from './MobileMenu'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Handle animation states when menu opens/closes
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
    } else {
      // Keep animating state true during close animation
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 500) // Match this with your animation duration
      
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  return (
    <nav className={`fixed top-4 left-4 right-4 z-50 py-4 rounded-lg border border-[#6F4C21]/20 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] transition-all duration-500 ease-in-out ${
      isOpen 
        ? 'bg-[#F5DC90] h-[calc(100vh-32px)] top-4 left-4 right-4' 
        : 'bg-[#F5DC90]/40 backdrop-blur-sm'
    }`}>
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between px-8 md:px-8">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/logo/SVG/Asset 1.svg"
              alt="Templo de Tierra Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="font-heading text-[1.8rem] md:text-[1.8rem] text-[#6F4C21]">
              Templo de Tierra
            </span>
          </Link>
          <div className="hidden lg:flex items-center space-x-[30px]">
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
          <div className="lg:hidden">
            <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>

        <div className={`transition-all duration-500 ease-in-out transform overflow-hidden ${
          isOpen 
            ? 'max-h-[calc(100vh-150px)] opacity-100 translate-y-0' 
            : 'max-h-0 opacity-0 -translate-y-4'
        } ${isAnimating ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          <div className="pt-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-8 md:px-8">
              {/* Primera columna */}
              <div className="space-y-8">
                <div className={`transform transition-all duration-500 ease-in-out ${
                  isOpen ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 -translate-y-8'
                }`}>
                  <h3 className="font-heading text-[2.177rem] text-[#6F4C21] mb-4">Explorar</h3>
                  <ul className="space-y-4">
                    <li className={`transform transition-all duration-500 ease-in-out ${
                      isOpen ? 'opacity-100 translate-x-0 delay-150' : 'opacity-0 -translate-x-4 delay-100'
                    }`}>
                      <a href="/about" className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline">
                        Sobre Nosotros
                      </a>
                    </li>
                    <li className={`transform transition-all duration-500 ease-in-out ${
                      isOpen ? 'opacity-100 translate-x-0 delay-200' : 'opacity-0 -translate-x-4 delay-80'
                    }`}>
                      <a href="/services" className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline">
                        Servicios
                      </a>
                    </li>
                    <li className={`transform transition-all duration-500 ease-in-out ${
                      isOpen ? 'opacity-100 translate-x-0 delay-250' : 'opacity-0 -translate-x-4 delay-60'
                    }`}>
                      <a href="/retreats" className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline">
                        Retiros
                      </a>
                    </li>
                  </ul>
                </div>

                <div className={`transform transition-all duration-500 ease-in-out ${
                  isOpen ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 -translate-y-8 delay-25'
                }`}>
                  <h3 className="font-heading text-[2.177rem] text-[#6F4C21] mb-4">Experiencias</h3>
                  <ul className="space-y-4">
                    <li className={`transform transition-all duration-500 ease-in-out ${
                      isOpen ? 'opacity-100 translate-x-0 delay-300' : 'opacity-0 -translate-x-4 delay-0'
                    }`}>
                      <a href="/ceremonies" className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline">
                        Ceremonias
                      </a>
                    </li>
                    <li className={`transform transition-all duration-500 ease-in-out ${
                      isOpen ? 'opacity-100 translate-x-0 delay-350' : 'opacity-0 -translate-x-4'
                    }`}>
                      <a href="/workshops" className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline">
                        Talleres
                      </a>
                    </li>
                    <li className={`transform transition-all duration-500 ease-in-out ${
                      isOpen ? 'opacity-100 translate-x-0 delay-400' : 'opacity-0 -translate-x-4'
                    }`}>
                      <a href="/events" className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline">
                        Eventos
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Segunda columna */}
              <div className="space-y-8">
                <div className={`transform transition-all duration-500 ease-in-out ${
                  isOpen ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 -translate-y-8'
                }`}>
                  <h3 className="font-heading text-[2.177rem] text-[#6F4C21] mb-4">Contacto</h3>
                  <ul className="space-y-4">
                    <li className={`transform transition-all duration-500 ease-in-out ${
                      isOpen ? 'opacity-100 translate-x-0 delay-450' : 'opacity-0 -translate-x-4'
                    }`}>
                      <a href="/contact" className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline">
                        Contáctanos
                      </a>
                    </li>
                    <li className={`transform transition-all duration-500 ease-in-out ${
                      isOpen ? 'opacity-100 translate-x-0 delay-500' : 'opacity-0 -translate-x-4'
                    }`}>
                      <a href="/faq" className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline">
                        Preguntas Frecuentes
                      </a>
                    </li>
                  </ul>
                </div>

                <div className={`transform transition-all duration-500 ease-in-out ${
                  isOpen ? 'opacity-100 translate-y-0 delay-400' : 'opacity-0 -translate-y-8'
                }`}>
                  <h3 className="font-heading text-[2.177rem] text-[#6F4C21] mb-4">Recursos</h3>
                  <ul className="space-y-4">
                    <li className={`transform transition-all duration-500 ease-in-out ${
                      isOpen ? 'opacity-100 translate-x-0 delay-550' : 'opacity-0 -translate-x-4'
                    }`}>
                      <a href="/blog" className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline">
                        Blog
                      </a>
                    </li>
                    <li className={`transform transition-all duration-500 ease-in-out ${
                      isOpen ? 'opacity-100 translate-x-0 delay-600' : 'opacity-0 -translate-x-4'
                    }`}>
                      <a href="/gallery" className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline">
                        Galería
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 