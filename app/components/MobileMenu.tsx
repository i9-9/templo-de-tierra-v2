'use client'

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Templo {
  id: string;
  nombre: string;
  slug: string;
  capacidad: number;
}

interface MobileMenuProps {
  isOpen: boolean;
  isAnimating: boolean;
  templos: Templo[];
  onClose: () => void;
}

export default function MobileMenu({ isOpen, isAnimating, templos, onClose }: MobileMenuProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

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
            <div className={`transform transition-all duration-500 ease-in-out ${
              isOpen ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 -translate-y-8'
            }`}>
              <h3 className="font-heading text-[2.177rem] text-[#6F4C21] mb-4">Navegar</h3>
              <ul className="space-y-4">
                <li className={`transform transition-all duration-500 ease-in-out ${
                  isOpen ? 'opacity-100 translate-x-0 delay-150' : 'opacity-0 -translate-x-4 delay-100'
                }`}>
                  <button onClick={() => handleLinkClick('/')} className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline">
                    Inicio
                  </button>
                </li>
                <li className={`transform transition-all duration-500 ease-in-out ${
                  isOpen ? 'opacity-100 translate-x-0 delay-200' : 'opacity-0 -translate-x-4 delay-80'
                }`}>
                  <button onClick={() => handleLinkClick('/templos')} className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline">
                    Todos los templos
                  </button>
                </li>
                <li className={`transform transition-all duration-500 ease-in-out ${
                  isOpen ? 'opacity-100 translate-x-0 delay-250' : 'opacity-0 -translate-x-4 delay-60'
                }`}>
                  <button onClick={() => handleLinkClick('/experiencias')} className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline">
                    Experiencias
                  </button>
                </li>
                <li className={`transform transition-all duration-500 ease-in-out ${
                  isOpen ? 'opacity-100 translate-x-0 delay-300' : 'opacity-0 -translate-x-4 delay-40'
                }`}>
                  <button onClick={() => handleLinkClick('/contacto')} className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline">
                    Contacto
                  </button>
                </li>
                {status === 'authenticated' ? (
                  <>
                    {session?.user?.email === 'admin@templodetierra.com' && (
                      <li className={`transform transition-all duration-500 ease-in-out ${
                        isOpen ? 'opacity-100 translate-x-0 delay-350' : 'opacity-0 -translate-x-4 delay-20'
                      }`}>
                        <button onClick={() => handleLinkClick('/admin')} className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline">
                          Panel Admin
                        </button>
                      </li>
                    )}
                    <li className={`transform transition-all duration-500 ease-in-out ${
                      isOpen ? 'opacity-100 translate-x-0 delay-350' : 'opacity-0 -translate-x-4 delay-20'
                    }`}>
                      <button onClick={() => handleLinkClick('/reservas')} className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline">
                        Mis reservas
                      </button>
                    </li>
                    <li className={`transform transition-all duration-500 ease-in-out ${
                      isOpen ? 'opacity-100 translate-x-0 delay-400' : 'opacity-0 -translate-x-4'
                    }`}>
                      <button
                        onClick={handleSignOut}
                        className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline"
                      >
                        Cerrar sesión
                      </button>
                    </li>
                  </>
                ) : (
                  <li className={`transform transition-all duration-500 ease-in-out ${
                    isOpen ? 'opacity-100 translate-x-0 delay-350' : 'opacity-0 -translate-x-4 delay-20'
                  }`}>
                    <button onClick={() => handleLinkClick('/auth/signin')} className="font-sans text-[1.26rem] text-[#6F4C21] hover:underline">
                      Iniciar sesión
                    </button>
                  </li>
                )}
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