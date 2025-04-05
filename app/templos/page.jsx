import { getAllTemplos } from '@/lib/data'
import Card from '@/app/components/ui/Card'

export const metadata = {
  title: 'Nuestros Templos | Templo de Tierra',
  description: 'Descubre nuestra selección de templos construidos con técnicas ancestrales de bioconstrucción, cada uno con su propia esencia y carácter único.',
}

export default function TemplosPage() {
  const templos = getAllTemplos();
  
  return (
    <main className="pt-[120px] pb-16">
      <div className="grid grid-cols-12 mb-16">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 text-center">
          <h1 className="text-[2.5rem] md:text-[3.5rem] font-heading text-[#6F4C21] mb-6">
            Nuestros Templos
          </h1>
          <p className="text-[#6F4C21]/80 text-lg mx-auto">
            Cada templo en nuestra comunidad está construido a mano utilizando técnicas 
            ancestrales de bioconstrucción, incorporando materiales naturales como arcilla, 
            arena, paja y madera local.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-8 mb-16">
        {templos.map(templo => (
          <div key={templo.id} className="col-span-12 md:col-span-6 lg:col-span-4">
            <Card
              title={templo.nombre}
              description={templo.descripcionCorta}
              imageSrc={templo.imagenPrincipal}
              href={`/templos/${templo.slug}`}
              aspectRatio="3/2"
              tags={[
                `${templo.capacidad} ${templo.capacidad === 1 ? 'persona' : 'personas'}`,
                templo.amenities[0]
              ]}
            />
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3">
          <div className="bg-[#F5DC90]/20 rounded-xl p-8 md:p-12 mt-16">
            <h2 className="text-[1.953rem] md:text-[2.441rem] font-heading text-[#6F4C21] mb-6 text-center">
              ¿Por qué elegir Templo de Tierra?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/40 p-6 rounded-lg">
                <h3 className="text-[1.25rem] font-heading text-[#6F4C21] mb-3">Conexión con la naturaleza</h3>
                <p className="text-[#6F4C21]/80">
                  Nuestros templos están diseñados para integrarse perfectamente con el entorno natural,
                  permitiéndote desconectar del bullicio urbano y reconectar con la naturaleza.
                </p>
              </div>
              
              <div className="bg-white/40 p-6 rounded-lg">
                <h3 className="text-[1.25rem] font-heading text-[#6F4C21] mb-3">Construcción sostenible</h3>
                <p className="text-[#6F4C21]/80">
                  Cada estructura está construida utilizando técnicas tradicionales de bioconstrucción,
                  con materiales naturales y locales que reducen significativamente el impacto ambiental.
                </p>
              </div>
              
              <div className="bg-white/40 p-6 rounded-lg">
                <h3 className="text-[1.25rem] font-heading text-[#6F4C21] mb-3">Experiencia única</h3>
                <p className="text-[#6F4C21]/80">
                  Más que un simple alojamiento, ofrecemos una experiencia de vida que te conecta
                  con técnicas ancestrales y una forma de vivir más consciente y sostenible.
                </p>
              </div>
              
              <div className="bg-white/40 p-6 rounded-lg">
                <h3 className="text-[1.25rem] font-heading text-[#6F4C21] mb-3">Comunidad consciente</h3>
                <p className="text-[#6F4C21]/80">
                  Al hospedarte con nosotros, te conviertes en parte de una comunidad que valora
                  la sostenibilidad, el aprendizaje compartido y el respeto por la naturaleza.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 