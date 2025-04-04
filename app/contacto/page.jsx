import ContactForm from '@/app/components/ui/ContactForm'
import Image from 'next/image'

export const metadata = {
  title: 'Contacto | Templo de Tierra',
  description: 'Contáctanos para solicitar información sobre nuestros templos, disponibilidad, experiencias o cualquier consulta sobre tu estancia en Templo de Tierra.',
}

export default function ContactoPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-[2.5rem] md:text-[3.5rem] font-heading text-[#6F4C21] mb-6">
            Contacto
          </h1>
          <p className="text-[#6F4C21]/80 text-lg max-w-2xl mx-auto">
            Estamos aquí para responder cualquier pregunta sobre nuestros templos, 
            disponibilidad, experiencias o para ayudarte a planificar tu estancia.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Columna del formulario */}
          <div>
            <ContactForm />
          </div>
          
          {/* Columna de información */}
          <div className="space-y-8">
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
                  <p className="text-[#6F4C21]/80">info@templodetierraarg.com</p>
                </div>
                
                <div>
                  <p className="font-medium text-[#6F4C21]">Teléfono</p>
                  <p className="text-[#6F4C21]/80">+52 123 456 7890</p>
                </div>
                
                <div>
                  <p className="font-medium text-[#6F4C21]">Ubicación</p>
                  <p className="text-[#6F4C21]/80">
                    Argentina<br />
                    (La ubicación exacta se proporciona después de la reserva)
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#F5DC90]/20 p-6 rounded-lg">
              <h2 className="text-[1.563rem] font-heading text-[#6F4C21] mb-4">Síguenos</h2>
              
              <div className="flex space-x-4">
                <a href="https://instagram.com" className="p-3 bg-white/50 rounded-full" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#6F4C21]">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
                
                <a href="https://facebook.com" className="p-3 bg-white/50 rounded-full" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#6F4C21]">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                
                <a href="https://whatsapp.com" className="p-3 bg-white/50 rounded-full" aria-label="WhatsApp">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#6F4C21]">
                    <path d="M17.6 6.8a7.8 7.8 0 0 0-5.4-2.3 7.8 7.8 0 0 0-6.8 11.5L3.5 20l4.1-1a7.8 7.8 0 0 0 3.8 1h.2a7.8 7.8 0 0 0 6-12.8Z"></path>
                    <path d="M14.5 14.2c-.2 0-1 .4-1 .9s.9.9 1 1c.7.2 1.4-.2 1.4-.7s-.5-1-1.4-1.2Z"></path>
                    <path d="M14.4 16.9c-1.3 0-2.6-.2-3.6-.9-.3-.2-1.5-1.1-2.8-2.8-.3-.5-.8-1.4-.6-2.6s.7-1.9 1-2.4c.1-.2.7-.5 1-.5.3 0 .3 0 .5.1.2 0 .5.3.8.8.3.5.9 2.3 1 2.5 0 .2.1.4 0 .6s-.2.3-.2.4l-.6.6s-.1.2 0 .3c.4.7 1 1.3 1.5 1.7.5.4 1.5.9 2 1.1.4.2.5.2.7 0s.6-.8.8-1.1c.2-.3.4-.2.6-.1s1.4.6 1.7.8c.2.1.3.2.4.3.1.4 0 1.5-.9 1.9Z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Preguntas frecuentes */}
        <div className="max-w-3xl mx-auto mt-20">
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
                restaurantes locales que sirven comida tradicional oaxaqueña.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}