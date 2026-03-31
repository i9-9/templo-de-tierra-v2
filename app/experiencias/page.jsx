'use client'

import { getAllExperiencias } from '@/lib/data'
import Image from 'next/image'
import Button from '@/app/components/ui/Button'

// Metadata moved to layout.tsx or handled differently for client components

export default function ExperienciasPage() {
  const experiencias = getAllExperiencias();
  
  const handleWhatsAppClick = () => {
    const mensaje = `¡Hola! Me interesa obtener más información sobre las experiencias en Templo de Tierra.

Me gustaría conocer:
• Fechas disponibles
• Precios y paquetes
• Detalles sobre las actividades
• Posibilidad de retiros personalizados

¡Gracias!`;

    const whatsappUrl = `https://wa.me/5491131032348?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <main className="pt-[140px] pb-16 px-[30px]">
      {/* Encabezado */}
      <div className="grid grid-cols-12 mb-18">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 text-center">
          <h1 className="text-[2.5rem] md:text-[3.5rem] font-heading text-[#6F4C21] mb-6">
            Experiencias Conscientes
          </h1>
          <p className="text-[#6F4C21]/80 text-lg">
            En Templo de Tierra, ofrecemos experiencias diseñadas para conectarte con la naturaleza, 
            contigo mismo y con técnicas ancestrales de construcción sostenible.
          </p>
        </div>
      </div>
      
      {/* Listado de experiencias */}
      <div className="grid grid-cols-12 mb-16 pt-24">
        {experiencias.map((experiencia, index) => {
          // Alternar la disposición de la imagen (izquierda/derecha)
          const isImageRight = index % 2 === 0;
          
          return (
            <div key={experiencia.id} className="col-span-12 mb-24 last:mb-0">
              <div className="grid grid-cols-12 gap-y-8 md:gap-y-0 md:gap-x-12 lg:gap-x-16 items-center">
                {/* Columna de imagen */}
                <div className={`col-span-12 md:col-span-6 ${isImageRight ? 'md:order-2' : ''}`}>
                  <div className="relative h-[320px] md:h-[420px] overflow-hidden rounded-xl shadow-md">
                    <Image
                      src={experiencia.imagen}
                      alt={experiencia.titulo}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority={index < 2}
                    />
                  </div>
                </div>
                
                {/* Columna de texto */}
                <div className={`col-span-12 md:col-span-6 ${isImageRight ? 'md:order-1' : ''}`}>
                  {/* Contenedor de texto con espacio entre elementos */}
                  <div className="space-y-6">
                    {/* Título y subtítulo */}
                    <div>
                      <h2 className="text-[2rem] md:text-[2.2rem] font-heading text-[#6F4C21] mb-2">
                        {experiencia.titulo}
                      </h2>
                      <p className="text-lg md:text-xl font-medium text-[#6F4C21]/70 italic">
                        {experiencia.subtitulo}
                      </p>
                    </div>
                    
                    {/* Descripción más detallada */}
                    <div className="space-y-4 text-base text-[#6F4C21]/80 leading-relaxed">
                      {experiencia.descripcion.split('\n\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                    
                    {/* Disponibilidad */}
                    <div className="py-4 bg-white rounded-lg mt-2 border border-[#6F4C21]/10">
                      <p className="text-[#6F4C21] font-medium">
                        {experiencia.disponibilidad}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* CTA Consulta */}
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3">
          <div className="bg-white rounded-xl p-8 md:p-12 mt-8 text-center shadow-lg border border-[#6F4C21]/10">
            <h2 className="text-[1.8rem] md:text-[2.2rem] font-heading text-[#6F4C21] mb-6">
              ¿Interesado en nuestras experiencias?
            </h2>
            <p className="text-[#6F4C21]/80 mb-8 max-w-2xl mx-auto">
              Si deseas obtener más información sobre nuestras experiencias, fechas disponibles
              o quieres organizar un retiro personalizado, no dudes en contactarnos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hola@templodetierra.com?subject=Consulta sobre experiencias&body=¡Hola! Me interesa obtener más información sobre las experiencias en Templo de Tierra.%0D%0A%0D%0AMe gustaría conocer:%0D%0A• Fechas disponibles%0D%0A• Precios y paquetes%0D%0A• Detalles sobre las actividades%0D%0A• Posibilidad de retiros personalizados%0D%0A%0D%0A¡Gracias!"
                className="flex-1 flex justify-center items-center py-3 px-6 border border-[#6F4C21] rounded-lg shadow-sm text-sm font-medium text-[#6F4C21] bg-white hover:bg-[#6F4C21]/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6F4C21] transition-colors"
              >
                <svg 
                  className="w-4 h-4 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Consultar por email
              </a>
              <button
                onClick={handleWhatsAppClick}
                className="flex-1 flex justify-center items-center py-3 px-6 border border-green-600 rounded-lg shadow-sm text-sm font-medium text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                <svg 
                  className="w-4 h-4 mr-2" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.700"/>
                </svg>
                Consultar por WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 