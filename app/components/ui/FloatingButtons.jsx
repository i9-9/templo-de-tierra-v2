'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(true)
  const [showButtons, setShowButtons] = useState(false)
  const pathname = usePathname()

  // Mostrar botones en página principal después de pasar el hero
  useEffect(() => {
    if (pathname === '/') {
      const handleScroll = () => {
        // Calcular altura del hero (ahora ocupa toda la pantalla)
        const heroHeight = window.innerHeight
        
        if (window.scrollY > heroHeight) {
          setShowButtons(true)
        } else {
          setShowButtons(false)
        }
      }

      // Inicialmente ocultos en la landing
      setShowButtons(false)
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    } else {
      // En otras páginas, mostrar siempre
      setShowButtons(true)
    }
  }, [pathname])

  const handleWhatsAppClick = () => {
    let mensaje = ''

    if (pathname?.includes('/templos/') && pathname !== '/templos') {
      mensaje = `¡Hola! Me interesa hacer una reserva en este templo.

Me gustaría conocer:
• Disponibilidad de fechas
• Precios y tarifas
• Detalles del alojamiento
• Proceso de reserva

¡Gracias!`
    } else if (pathname?.includes('/experiencias')) {
      mensaje = `¡Hola! Me interesa obtener más información sobre las experiencias en Templo de Tierra.

Me gustaría conocer:
• Fechas disponibles
• Precios y paquetes
• Detalles sobre las actividades
• Posibilidad de retiros personalizados

¡Gracias!`
    } else {
      mensaje = `¡Hola! Me interesa obtener más información sobre Templo de Tierra.

Me gustaría conocer:
• Disponibilidad de templos
• Precios y tarifas
• Experiencias disponibles
• Ubicación y cómo llegar

¡Gracias!`
    }

    const whatsappUrl = `https://wa.me/5491131032348?text=${encodeURIComponent(mensaje)}`
    window.open(whatsappUrl, '_blank')
  }

  if (!isVisible || !showButtons) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-up" style={{ animationDuration: '0.5s' }}>
      <div className="bg-white/95 backdrop-blur-sm border border-[#6F4C21]/20 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] rounded-lg p-3 flex items-center space-x-3 transition-all duration-500 ease-in-out">
        {/* Botón Reservar - solo en página principal */}
        {pathname === '/' && (
          <Link
            href="/templos"
            className="bg-[#6F4C21] hover:bg-[#5A3D1A] text-[#F5DC90] px-4 py-2.5 rounded-lg font-sans text-sm font-medium flex items-center space-x-2 transition-all duration-300 relative group"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z" />
            </svg>
            <span>Reservar ahora</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F5DC90] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        )}

        {/* Botón WhatsApp */}
        <button
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition-all duration-300 relative group"
          title="Contactar por WhatsApp"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.700"/>
          </svg>
        </button>

        {/* Botón Cerrar */}
        <button
          onClick={() => setIsVisible(false)}
          className="text-[#6F4C21] hover:text-[#5A3D1A] p-2 rounded-lg hover:bg-gray-50 transition-all duration-300 relative group"
          title="Cerrar"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
} 