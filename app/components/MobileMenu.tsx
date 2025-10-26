'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Templo {
  id: string;
  nombre: string;
  slug: string;
  capacidad: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  isAnimating: boolean;
  templos: Templo[];
  onClose: () => void;
}

export default function MobileMenu({ isOpen, isAnimating, templos, onClose }: MobileMenuProps) {
  const router = useRouter();

  const handleLinkClick = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <div className={`lg:hidden transition-all duration-500 ease-in-out transform overflow-hidden ${
      isOpen 
        ? 'max-h-[calc(100vh-150px)] opacity-100 translate-y-0' 
        : 'max-h-0 opacity-0 -translate-y-4'
    } ${isAnimating ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div className="pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-4">
          {/* Primera columna - Navegación principal */}
          <div className="space-y-8">
            {/* Navegar */}
            <div 
              className={`transform transition-all duration-400 ease-out ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{ transitionDelay: isOpen ? '50ms' : '0ms' }}
            >
              <h3 className="font-heading text-[2.177rem] text-[#6F4C21] mb-4">Navegar</h3>
              <ul className="space-y-3">
                <li 
                  className={`transform transition-all duration-300 ease-out ${
                    isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'
                  }`}
                  style={{ transitionDelay: isOpen ? '150ms' : '0ms' }}
                >
                  <button onClick={() => handleLinkClick('/')} className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline">
                    Inicio
                  </button>
                </li>
                <li 
                  className={`transform transition-all duration-300 ease-out ${
                    isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'
                  }`}
                  style={{ transitionDelay: isOpen ? '220ms' : '0ms' }}
                >
                  <button onClick={() => handleLinkClick('/templos')} className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline">
                    Todos los templos
                  </button>
                </li>
                <li 
                  className={`transform transition-all duration-300 ease-out ${
                    isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'
                  }`}
                  style={{ transitionDelay: isOpen ? '290ms' : '0ms' }}
                >
                  <button onClick={() => handleLinkClick('/experiencias')} className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline">
                    Experiencias
                  </button>
                </li>
                <li 
                  className={`transform transition-all duration-300 ease-out ${
                    isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'
                  }`}
                  style={{ transitionDelay: isOpen ? '360ms' : '0ms' }}
                >
                  <button onClick={() => handleLinkClick('/contacto')} className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline">
                    Contacto
                  </button>
                </li>
              </ul>
            </div>

            {/* Conéctate */}
            <div 
              className={`transform transition-all duration-400 ease-out ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{ transitionDelay: isOpen ? `${430 + (templos.length * 70) + 140}ms` : '0ms' }}
            >
              <h3 className="font-heading text-[2.177rem] text-[#6F4C21] mb-4">Conéctate</h3>
              <ul className="space-y-3">
                <li 
                  className={`transform transition-all duration-300 ease-out ${
                    isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'
                  }`}
                  style={{ transitionDelay: isOpen ? `${430 + (templos.length * 70) + 210}ms` : '0ms' }}
                >
                  <a href="https://instagram.com/templodetierra" className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Segunda columna - Templos */}
          <div className="space-y-8">
            <div 
              className={`transform transition-all duration-400 ease-out ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              style={{ transitionDelay: isOpen ? '430ms' : '0ms' }}
            >
              <h3 className="font-heading text-[2.177rem] text-[#6F4C21] mb-4">Nuestros Templos</h3>
              <ul className="space-y-3">
                {templos.map((templo, index) => (
                  <li 
                    key={templo.id}
                    className={`transform transition-all duration-300 ease-out ${
                      isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'
                    }`}
                    style={{ transitionDelay: isOpen ? `${500 + index * 70}ms` : '0ms' }}
                  >
                    <button onClick={() => handleLinkClick(`/templos/${templo.slug}`)} className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline">
                      {templo.nombre} <span className="text-sm text-[#6F4C21]/70">({templo.capacidad})</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 