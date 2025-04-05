import { getAllExperiencias } from '@/lib/data'
import Image from 'next/image'

export const metadata = {
  title: 'Experiencias | Templo de Tierra',
  description: 'Descubre nuestras experiencias de bienestar, yoga, meditación y talleres de bioconstrucción en Templo de Tierra, en plena conexión con la naturaleza.',
}

export default function ExperienciasPage() {
  const experiencias = getAllExperiencias();
  
  return (
    <main className="pt-[120px] pb-16">
      {/* Encabezado */}
      <div className="grid grid-cols-12 mb-24">
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
      <div className="grid grid-cols-12 mb-16">
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
                <div className={`col-span-12 md:col-span-6 space-y-6 ${isImageRight ? 'md:order-1' : ''}`}>
                  <h2 className="text-[2rem] md:text-[2.2rem] font-heading text-[#6F4C21]">
                    {experiencia.titulo}
                  </h2>
                  
                  <div className="space-y-4 text-[#6F4C21]/80 leading-relaxed">
                    {experiencia.descripcion.split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                  
                  <div className="py-4 px-6 bg-[#F5DC90]/30 rounded-lg inline-block mt-2">
                    <p className="text-[#6F4C21] font-medium">
                      {experiencia.disponibilidad}
                    </p>
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
          <div className="bg-[#F5DC90]/20 rounded-xl p-8 md:p-12 mt-8 text-center shadow-lg">
            <h2 className="text-[1.8rem] md:text-[2.2rem] font-heading text-[#6F4C21] mb-6">
              ¿Interesado en nuestras experiencias?
            </h2>
            <p className="text-[#6F4C21]/80 mb-8 max-w-2xl mx-auto">
              Si deseas obtener más información sobre nuestras experiencias, fechas disponibles
              o quieres organizar un retiro personalizado, no dudes en contactarnos.
            </p>
            
            <a 
              href="/contacto" 
              className="inline-block bg-[#6F4C21] text-[#F5DC90] py-3 px-8 rounded-lg hover:bg-[#5A3D1A] transition-colors font-medium text-lg hover:scale-105 transition-transform duration-300"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </div>
    </main>
  );
} 