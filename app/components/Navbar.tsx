'use client'

import Link from 'next/link'
import Image from 'next/image'
import MobileMenu from './MobileMenu'
import { useState, useEffect } from 'react'
import { getAllTemplos } from '@/lib/data'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showTemplosMenu, setShowTemplosMenu] = useState(false)
  const templos = getAllTemplos()

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
    <nav className={`fixed top-4 left-[30px] right-[30px] z-50 py-4 rounded-lg border border-[#6F4C21]/20 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] transition-all duration-500 ease-in-out animate-fade-down ${
      isOpen 
        ? 'bg-[#F5DC90] h-[calc(100vh-32px)] top-4 left-[30px] right-[30px]' 
        : 'bg-[#F5DC90]/80'
    }`} style={{ animationDuration: '0.6s', animationDelay: '0.1s' }}>
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between px-4 md:px-4">
          <Link href="/" className="flex items-center gap-4 animate-fade-right" style={{ animationDuration: '0.6s', animationDelay: '0.2s' }}>
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
          <div className="hidden lg:flex items-center space-x-[30px] animate-fade-left" style={{ animationDuration: '0.6s', animationDelay: '0.3s' }}>
            <Link href="/" className="font-sans text-[1rem] text-[#6F4C21] hover:text-olive-green transition-colors">
              Inicio
            </Link>
            <div className="relative group">
              <button 
                className="font-sans text-[1rem] text-[#6F4C21] hover:text-olive-green transition-colors flex items-center gap-1"
                onMouseEnter={() => setShowTemplosMenu(true)}
                onMouseLeave={() => setShowTemplosMenu(false)}
              >
                Templos
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Dropdown menu */}
              <div 
                className={`absolute top-full left-0 bg-[#F5DC90] rounded-lg shadow-lg py-2 w-56 transition-all duration-200 ${showTemplosMenu ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                onMouseEnter={() => setShowTemplosMenu(true)}
                onMouseLeave={() => setShowTemplosMenu(false)}
              >
                <div className="py-1 px-4 font-medium text-[#6F4C21]/70 text-sm">
                  Nuestros templos
                </div>
                {templos.map(templo => (
                  <Link 
                    key={templo.id}
                    href={`/templos/${templo.slug}`} 
                    className="block px-4 py-2 text-[#6F4C21] hover:bg-[#F5DC90]/60 transition-colors"
                  >
                    {templo.nombre} ({templo.capacidad})
                  </Link>
                ))}
                <div className="border-t border-[#6F4C21]/20 my-1"></div>
                <Link 
                  href="/templos" 
                  className="block px-4 py-2 text-[#6F4C21] hover:bg-[#F5DC90]/60 transition-colors font-medium"
                >
                  Ver todos los templos
                </Link>
              </div>
            </div>
            <Link href="/experiencias" className="font-sans text-[1rem] text-[#6F4C21] hover:text-olive-green transition-colors">
              Experiencias
            </Link>
            <Link href="/contacto" className="font-sans text-[1rem] text-[#6F4C21] hover:text-olive-green transition-colors">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-4">
              {/* Primera columna - Navegación principal */}
              <div className="space-y-8">
                <div className={`transform transition-all duration-500 ease-in-out ${
                  isOpen ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 -translate-y-8'
                }`}>
                  <h3 className="font-heading text-[2.177rem] text-[#6F4C21] mb-4">Navegar</h3>
                  <ul className="space-y-4">
                    <li className={`transform transition-all duration-500 ease-in-out ${
                      isOpen ? 'opacity-100 translate-x-0 delay-150' : 'opacity-0 -translate-x-4 delay-100'
                    }`}>
                      <Link href="/" className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline">
                        Inicio
                      </Link>
                    </li>
                    <li className={`transform transition-all duration-500 ease-in-out ${
                      isOpen ? 'opacity-100 translate-x-0 delay-200' : 'opacity-0 -translate-x-4 delay-80'
                    }`}>
                      <Link href="/templos" className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline">
                        Todos los templos
                      </Link>
                    </li>
                    <li className={`transform transition-all duration-500 ease-in-out ${
                      isOpen ? 'opacity-100 translate-x-0 delay-250' : 'opacity-0 -translate-x-4 delay-60'
                    }`}>
                      <Link href="/experiencias" className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline">
                        Experiencias
                      </Link>
                    </li>
                    <li className={`transform transition-all duration-500 ease-in-out ${
                      isOpen ? 'opacity-100 translate-x-0 delay-300' : 'opacity-0 -translate-x-4 delay-40'
                    }`}>
                      <Link href="/contacto" className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline">
                        Contacto
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Conéctate */}
                <div className={`transform transition-all duration-500 ease-in-out ${
                  isOpen ? 'opacity-100 translate-y-0 delay-400' : 'opacity-0 -translate-y-8 delay-25'
                }`}>
                  <h3 className="font-heading text-[2.177rem] text-[#6F4C21] mb-4">Conéctate</h3>
                  <ul className="space-y-4">
                    <li className={`transform transition-all duration-500 ease-in-out ${
                      isOpen ? 'opacity-100 translate-x-0 delay-450' : 'opacity-0 -translate-x-4 delay-0'
                    }`}>
                      <a href="https://instagram.com" className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline" target="_blank" rel="noopener noreferrer">
                        Instagram
                      </a>
                    </li>
                    <li className={`transform transition-all duration-500 ease-in-out ${
                      isOpen ? 'opacity-100 translate-x-0 delay-500' : 'opacity-0 -translate-x-4'
                    }`}>
                      <a href="https://facebook.com" className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline" target="_blank" rel="noopener noreferrer">
                        Facebook
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Segunda columna - Templos */}
              <div className="space-y-8">
                <div className={`transform transition-all duration-500 ease-in-out ${
                  isOpen ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 -translate-y-8'
                }`}>
                  <h3 className="font-heading text-[2.177rem] text-[#6F4C21] mb-4">Nuestros Templos</h3>
                  <ul className="space-y-4">
                    {templos.map((templo, index) => (
                      <li 
                        key={templo.id}
                        className={`transform transition-all duration-500 ease-in-out ${
                          isOpen ? 'opacity-100 translate-x-0 delay-' + (450 + index * 50) : 'opacity-0 -translate-x-4'
                        }`}
                      >
                        <Link href={`/templos/${templo.slug}`} className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline">
                          {templo.nombre} <span className="text-sm text-[#6F4C21]/70">({templo.capacidad})</span>
                        </Link>
                      </li>
                    ))}
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