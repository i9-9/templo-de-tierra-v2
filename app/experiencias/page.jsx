import { getAllExperiencias } from '@/lib/data'
import Image from 'next/image'

export const metadata = {
  title: 'Experiencias | Templo de Tierra',
  description: 'Descubre nuestras experiencias de bienestar, yoga, meditación y talleres de bioconstrucción en Templo de Tierra, en plena conexión con la naturaleza.',
}

export default function ExperienciasPage() {
  const experiencias = getAllExperiencias();
  
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-[2.5rem] md:text-[3.5rem] font-heading text-[#6F4C21] mb-6">
            Experiencias Conscientes
          </h1>
          <p className="text-[#6F4C21]/80 text-lg max-w-2xl mx-auto">
            En Templo de Tierra, ofrecemos experiencias diseñadas para conectarte con la naturaleza, 
            contigo mismo y con técnicas ancestrales de construcción sostenible.
          </p>
        </div>
        
        <div className="space-y-24 mb-16">
          {experiencias.map((experiencia, index) => {
            // Alternar la disposición de la imagen (izquierda/derecha)
            const isImageRight = index % 2 === 0;
            
            return (
              <div key={experiencia.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Columna de imagen */}
                <div className={isImageRight ? 'lg:order-2' : ''}>
                  <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-xl">
                    <Image
                      src={experiencia.imagen}
                      alt={experiencia.titulo}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                
                {/* Columna de texto */}
                <div className={`space-y-6 ${isImageRight ? 'lg:order-1 lg:pr-12' : 'lg:pl-12'}`}>
                  <h2 className="text-[2.177rem] font-heading text-[#6F4C21]">
                    {experiencia.titulo}
                  </h2>
                  
                  <div className="space-y-4 text-[#6F4C21]/80 leading-relaxed">
                    {experiencia.descripcion.split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                  
                  <div className="py-4 px-6 bg-[#F5DC90]/30 rounded-lg inline-block">
                    <p className="text-[#6F4C21] font-medium">
                      {experiencia.disponibilidad}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* CTA Consulta */}
        <div className="bg-[#F5DC90]/20 rounded-xl p-8 md:p-12 mt-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[1.953rem] md:text-[2.441rem] font-heading text-[#6F4C21] mb-6">
              ¿Interesado en nuestras experiencias?
            </h2>
            <p className="text-[#6F4C21]/80 mb-8 max-w-2xl mx-auto">
              Si deseas obtener más información sobre nuestras experiencias, fechas disponibles
              o quieres organizar un retiro personalizado, no dudes en contactarnos.
            </p>
            
            <a 
              href="/contacto" 
              className="inline-block bg-[#6F4C21] text-[#F5DC90] py-3 px-8 rounded-lg hover:bg-[#5A3D1A] transition-colors font-medium text-lg"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </div>
    </main>
  );
} 