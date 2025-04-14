'use client'

import Link from 'next/link'
import Image from 'next/image'
import MobileMenu from './MobileMenu'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { prisma } from '@/lib/prisma'

interface Templo {
  id: string;
  nombre: string;
  slug: string;
  capacidad: number;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showTemplosMenu, setShowTemplosMenu] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [templos, setTemplos] = useState<Templo[]>([])
  const { data: session, status } = useSession()

  // Cargar templos al montar el componente
  useEffect(() => {
    const fetchTemplos = async () => {
      try {
        const response = await fetch('/api/templos')
        const data = await response.json()
        setTemplos(data)
      } catch (error) {
        console.error('Error al cargar los templos:', error)
      }
    }

    fetchTemplos()
  }, [])

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

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  return (
    <nav className="fixed top-4 left-4 right-4 md:left-[30px] md:right-[30px] z-50 py-4 rounded-lg border border-[#6F4C21]/20 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] transition-all duration-500 ease-in-out animate-fade-down bg-[#F5DC90]/80 backdrop-blur-sm">
      <div className="w-full">
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
            <Link 
              href="/" 
              className="font-sans text-[1rem] text-[#6F4C21] hover:text-olive-green transition-colors duration-300 relative group"
            >
              Inicio
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-olive-green transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <div className="relative group">
              <button 
                className="font-sans text-[1rem] text-[#6F4C21] hover:text-olive-green transition-colors duration-300 flex items-center gap-1 relative group"
                onMouseEnter={() => setShowTemplosMenu(true)}
                onMouseLeave={() => setShowTemplosMenu(false)}
                aria-expanded={showTemplosMenu}
                aria-haspopup="true"
                aria-label="Menú de templos"
              >
                Templos
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 transition-transform duration-300 ${showTemplosMenu ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-olive-green transition-all duration-300 group-hover:w-full"></span>
              </button>
              {/* Dropdown menu */}
              <div 
                className={`absolute top-full left-0 bg-[#F5DC90] rounded-lg shadow-lg py-2 w-56 transition-all duration-300 ${showTemplosMenu ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                onMouseEnter={() => setShowTemplosMenu(true)}
                onMouseLeave={() => setShowTemplosMenu(false)}
                role="menu"
                aria-orientation="vertical"
              >
                <div className="py-1 px-4 font-medium text-[#6F4C21]/70 text-sm">
                  Nuestros templos
                </div>
                {templos.map(templo => (
                  <Link 
                    key={templo.id}
                    href={`/templos/${templo.slug}`} 
                    className="block px-4 py-2 text-[#6F4C21] hover:bg-[#F5DC90]/60 transition-colors duration-300"
                    role="menuitem"
                  >
                    {templo.nombre} ({templo.capacidad})
                  </Link>
                ))}
                <div className="border-t border-[#6F4C21]/20 my-1"></div>
                <Link 
                  href="/templos" 
                  className="block px-4 py-2 text-[#6F4C21] hover:bg-[#F5DC90]/60 transition-colors duration-300 font-medium"
                  role="menuitem"
                >
                  Ver todos los templos
                </Link>
              </div>
            </div>
            <Link 
              href="/experiencias" 
              className="font-sans text-[1rem] text-[#6F4C21] hover:text-olive-green transition-colors duration-300 relative group"
            >
              Experiencias
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-olive-green transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/contacto" 
              className="font-sans text-[1rem] text-[#6F4C21] hover:text-olive-green transition-colors duration-300 relative group"
            >
              Contacto
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-olive-green transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {status === 'authenticated' ? (
              <div className="relative group">
                <button 
                  className="font-sans text-[1rem] text-[#6F4C21] hover:text-olive-green transition-colors duration-300 flex items-center gap-1 relative group"
                  onMouseEnter={() => setShowUserMenu(true)}
                  onMouseLeave={() => setShowUserMenu(false)}
                  aria-expanded={showUserMenu}
                  aria-haspopup="true"
                  aria-label="Menú de usuario"
                >
                  {session.user?.name}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-olive-green transition-all duration-300 group-hover:w-full"></span>
                </button>
                <div 
                  className={`absolute top-full right-0 bg-[#F5DC90] rounded-lg shadow-lg py-2 w-48 transition-all duration-300 ${showUserMenu ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                  onMouseEnter={() => setShowUserMenu(true)}
                  onMouseLeave={() => setShowUserMenu(false)}
                  role="menu"
                  aria-orientation="vertical"
                >
                  <Link 
                    href="/reservas" 
                    className="block px-4 py-2 text-[#6F4C21] hover:bg-[#F5DC90]/60 transition-colors duration-300"
                    role="menuitem"
                  >
                    Mis reservas
                  </Link>
                  <Link 
                    href="/perfil" 
                    className="block px-4 py-2 text-[#6F4C21] hover:bg-[#F5DC90]/60 transition-colors duration-300"
                    role="menuitem"
                  >
                    Mi perfil
                  </Link>
                  <div className="border-t border-[#6F4C21]/20 my-1"></div>
                  <button 
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-[#6F4C21] hover:bg-[#F5DC90]/60 transition-colors duration-300"
                    role="menuitem"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                href="/auth/signin" 
                className="font-sans text-[1rem] text-[#6F4C21] hover:text-olive-green transition-colors duration-300 relative group"
              >
                Iniciar sesión
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-olive-green transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
          </div>
          <button 
            className="lg:hidden text-[#6F4C21] focus:outline-none relative w-6 h-6"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
          >
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              {/* Línea superior */}
              <span className={`block absolute w-6 h-0.5 bg-[#6F4C21] transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}></span>
              {/* Línea media */}
              <span className={`block absolute w-6 h-0.5 bg-[#6F4C21] transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              {/* Línea inferior */}
              <span className={`block absolute w-6 h-0.5 bg-[#6F4C21] transform transition-all duration-300 ${isOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}></span>
            </div>
          </button>
        </div>
      </div>
      <MobileMenu 
        isOpen={isOpen} 
        isAnimating={isAnimating} 
        templos={templos} 
        onClose={() => setIsOpen(false)} 
      />
    </nav>
  )
}