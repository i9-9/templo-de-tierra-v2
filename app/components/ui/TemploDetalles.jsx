'use client'

import Image from 'next/image'
import Gallery from './Gallery'
import ReservaWidget from './ReservaWidget'

export default function TemploDetalles({ templo }) {
  if (!templo) return null;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Columna izquierda (2/3 en desktop) con galería e info */}
      <div className="lg:col-span-2 space-y-8">
        <h1 className="text-[2.5rem] font-heading text-[#6F4C21] mb-2">{templo.nombre}</h1>
        
        {/* Galería de imágenes */}
        <Gallery images={templo.imagenes} />
        
        {/* Información principal */}
        <div className="border-t border-b border-[#6F4C21]/10 py-6 my-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-[#6F4C21]/70">Capacidad</p>
              <p className="text-lg font-medium text-[#6F4C21]">{templo.capacidad} personas</p>
            </div>
            
            <div>
              <p className="text-sm text-[#6F4C21]/70">Camas</p>
              <p className="text-lg font-medium text-[#6F4C21]">{templo.camas}</p>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <p className="text-sm text-[#6F4C21]/70">Tipo</p>
              <p className="text-lg font-medium text-[#6F4C21]">Alojamiento en bioconstrucción</p>
            </div>
          </div>
        </div>
        
        {/* Descripción completa */}
        <div className="prose prose-stone max-w-none">
          <h2 className="text-[1.77rem] font-heading text-[#6F4C21] mb-4">Acerca de este espacio</h2>
          <div className="text-[#6F4C21]/90 leading-relaxed space-y-4">
            {templo.descripcion.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        
        {/* Amenities */}
        <div className="mt-8">
          <h2 className="text-[1.77rem] font-heading text-[#6F4C21] mb-4">Lo que este lugar ofrece</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templo.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#F5DC90]/50 flex items-center justify-center">
                  <span className="text-[#6F4C21]">✓</span>
                </div>
                <span className="text-[#6F4C21]">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Normas */}
        <div className="mt-8">
          <h2 className="text-[1.77rem] font-heading text-[#6F4C21] mb-4">Normas de la estancia</h2>
          <div className="space-y-3 text-[#6F4C21]/90">
            <p>• Check-in: 15:00 - 20:00</p>
            <p>• Check-out: antes de las 12:00</p>
            <p>• No se permiten mascotas</p>
            <p>• No se permiten fiestas ni eventos</p>
            <p>• Prohibido fumar</p>
          </div>
        </div>
      </div>
      
      {/* Columna derecha (1/3 en desktop) con widget de reserva */}
      <div className="lg:col-span-1 space-y-6">
        <div className="sticky top-24">
          <ReservaWidget temploId={templo.id} temploNombre={templo.nombre} />
          
          <div className="mt-8 p-6 bg-[#F5DC90]/10 rounded-lg border border-[#6F4C21]/10">
            <h3 className="text-[#6F4C21] font-heading text-xl mb-4">Ubicación</h3>
            <div className="aspect-video relative rounded-lg overflow-hidden mb-4">
              <Image 
                src="/tdt/DSC02885.png" 
                alt="Mapa de ubicación"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            </div>
            <p className="text-[#6F4C21]/90 text-sm">
              La ubicación exacta se compartirá una vez que se confirme la reserva.
              Estamos ubicados en un hermoso entorno natural en Argentina.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 