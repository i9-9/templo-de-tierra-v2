import ContactForm from '@/app/components/ui/ContactForm'
import Image from 'next/image'
import Button from '@/app/components/ui/Button'

export const metadata = {
  title: 'Contacto | Templo de Tierra',
  description: 'Contáctanos para solicitar información sobre nuestros templos, disponibilidad, experiencias o cualquier consulta sobre tu estancia en Templo de Tierra.',
}

export default function ContactoPage() {
  return (
    <main className="container mx-auto px-4 pt-[150px] pb-16">
      <div className="grid grid-cols-12 mb-16">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 text-center">
          <h1 className="text-[2.5rem] md:text-[3.5rem] font-heading text-[#6F4C21] mb-6">
            Contacto
          </h1>
          <p className="text-[#6F4C21]/80 text-lg">
            Estamos aquí para responder cualquier pregunta sobre nuestros templos, 
            disponibilidad, experiencias o para ayudarte a planificar tu estancia.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-12 mb-16">
        {/* Columna del formulario */}
        <div className="col-span-12 lg:col-span-6">
          <ContactForm />
        </div>
        
        {/* Columna de información */}
        <div className="col-span-12 lg:col-span-6 space-y-8">
          <div className="relative h-[300px] overflow-hidden rounded-xl mb-8">
            <Image
              src="/tdt/DSC00678.png"
              alt="Paisaje de Templo de Tierra"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          
          <div className="bg-[#F5DC90]/20 p-6 rounded-lg">
            <h2 className="text-[1.563rem] font-heading text-[#6F4C21] mb-4">Información de contacto</h2>
            
            <div className="space-y-4">
              <div>
                <p className="font-medium text-[#6F4C21]">Correo electrónico</p>
                <p className="text-[#6F4C21]/80">templodetierra.ashram@gmail.com</p>
              </div>
              
              <div>
                <p className="font-medium text-[#6F4C21]">Teléfono</p>
                <p className="text-[#6F4C21]/80">+54 9 11 3103-2348</p>
              </div>
              
              <div>
                <p className="font-medium text-[#6F4C21]">Ubicación</p>
                <p className="text-[#6F4C21]/80">
                  Punta del Este, Uruguay<br />
                  (La ubicación exacta se proporciona después de la reserva)
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#F5DC90]/20 p-6 rounded-lg">
            <h2 className="text-[1.563rem] font-heading text-[#6F4C21] mb-4">Síguenos</h2>
            
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/templodetierra.uy/" className="p-3 bg-white/50 rounded-full" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#6F4C21]">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              
              <a href="https://wa.me/5491131032348" className="p-3 bg-white/50 rounded-full" aria-label="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#6F4C21]">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Preguntas frecuentes */}
      <div className="grid grid-cols-12 mt-20">
        <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3">
          <h2 className="text-[2.074rem] font-heading text-[#6F4C21] mb-8 text-center">
            Preguntas frecuentes
          </h2>
          
          <div className="space-y-6">
            <div className="bg-[#F5DC90]/10 p-6 rounded-lg">
              <h3 className="text-[1.25rem] font-heading text-[#6F4C21] mb-2">¿Cómo puedo llegar a Templo de Tierra?</h3>
              <p className="text-[#6F4C21]/80">
                Después de confirmar tu reserva, te proporcionaremos instrucciones detalladas sobre cómo llegar. 
                Estamos ubicados en un hermoso entorno natural. Puedes llegar en transporte 
                público o privado desde la ciudad más cercana.
              </p>
            </div>
            
            <div className="bg-[#F5DC90]/10 p-6 rounded-lg">
              <h3 className="text-[1.25rem] font-heading text-[#6F4C21] mb-2">¿Qué debo llevar para mi estancia?</h3>
              <p className="text-[#6F4C21]/80">
                Recomendamos traer ropa cómoda, repelente de insectos natural, protector solar, sombrero, 
                sandalias, traje de baño, toalla para la playa, linterna y cualquier medicamento personal 
                que puedas necesitar. Proporcionamos ropa de cama, toallas y artículos de baño básicos.
              </p>
            </div>
            
            <div className="bg-[#F5DC90]/10 p-6 rounded-lg">
              <h3 className="text-[1.25rem] font-heading text-[#6F4C21] mb-2">¿Hay acceso a internet?</h3>
              <p className="text-[#6F4C21]/80">
                Disponemos de Wi-Fi en áreas comunes, aunque la conexión puede ser limitada debido a nuestra 
                ubicación remota. Te invitamos a aprovechar esta oportunidad para desconectar digitalmente 
                y reconectar con la naturaleza.
              </p>
            </div>
            
            <div className="bg-[#F5DC90]/10 p-6 rounded-lg">
              <h3 className="text-[1.25rem] font-heading text-[#6F4C21] mb-2">¿Ofrecen alimentación?</h3>
              <p className="text-[#6F4C21]/80">
                Ofrecemos desayunos opcionales con productos locales y orgánicos. Algunos templos cuentan 
                con cocina equipada para que puedas preparar tus propias comidas. También podemos recomendar 
                restaurantes locales que sirven comida tradicional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}