'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  });
  
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setFormStatus({
      isSubmitting: true,
      isSubmitted: false,
      error: null
    });
    
    // Simulación de envío - en un escenario real esto se conectaría a una API
    try {
      // Esperar 1 segundo para simular el envío
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Para fines de demostración, marcamos como exitoso
      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        error: null
      });
      
      // Limpiar el formulario
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: '',
      });
      
      // En una implementación real, aquí enviarías los datos a un endpoint
      // fetch('/api/contact', {method: 'POST', body: JSON.stringify(formData)})
    } catch (error) {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: 'Hubo un error al enviar el formulario. Por favor, intenta nuevamente.'
      });
    }
  };
  
  if (formStatus.isSubmitted) {
    return (
      <div className="p-8 bg-[#F5DC90]/20 rounded-lg border border-[#6F4C21]/20 text-center">
        <h3 className="text-[#6F4C21] font-heading text-2xl mb-4">¡Mensaje Enviado!</h3>
        <p className="text-[#6F4C21] mb-6">Gracias por contactarnos. Te responderemos a la brevedad.</p>
        <button 
          onClick={() => setFormStatus(prev => ({...prev, isSubmitted: false}))}
          className="bg-[#6F4C21] text-[#F5DC90] py-2 px-6 rounded-lg hover:bg-[#5A3D1A] transition-colors"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="nombre" className="block text-[#6F4C21] font-medium mb-1">
          Nombre completo
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          value={formData.nombre}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-[#6F4C21]/20 bg-[#F5DC90]/10 focus:outline-none focus:ring-2 focus:ring-[#6F4C21]/30 focus:border-[#6F4C21]/50"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-[#6F4C21] font-medium mb-1">
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-[#6F4C21]/20 bg-[#F5DC90]/10 focus:outline-none focus:ring-2 focus:ring-[#6F4C21]/30 focus:border-[#6F4C21]/50"
        />
      </div>
      
      <div>
        <label htmlFor="telefono" className="block text-[#6F4C21] font-medium mb-1">
          Teléfono (opcional)
        </label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          value={formData.telefono}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-[#6F4C21]/20 bg-[#F5DC90]/10 focus:outline-none focus:ring-2 focus:ring-[#6F4C21]/30 focus:border-[#6F4C21]/50"
        />
      </div>
      
      <div>
        <label htmlFor="mensaje" className="block text-[#6F4C21] font-medium mb-1">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="4"
          required
          value={formData.mensaje}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-[#6F4C21]/20 bg-[#F5DC90]/10 focus:outline-none focus:ring-2 focus:ring-[#6F4C21]/30 focus:border-[#6F4C21]/50"
        ></textarea>
      </div>
      
      {formStatus.error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg">
          {formStatus.error}
        </div>
      )}
      
      <div>
        <button
          type="submit"
          disabled={formStatus.isSubmitting}
          className={`w-full py-3 px-6 bg-[#6F4C21] text-[#F5DC90] rounded-lg font-medium transition-colors ${
            formStatus.isSubmitting 
              ? 'opacity-70 cursor-not-allowed' 
              : 'hover:bg-[#5A3D1A]'
          }`}
        >
          {formStatus.isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
        </button>
      </div>
    </form>
  );
} 