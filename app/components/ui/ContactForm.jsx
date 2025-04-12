'use client'

import { useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const { executeRecaptcha } = useGoogleReCaptcha();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      if (!executeRecaptcha) {
        console.error('reCAPTCHA no está listo');
        throw new Error('reCAPTCHA no está listo');
      }

      const recaptchaToken = await executeRecaptcha('contact_form');
      console.log('Token reCAPTCHA obtenido');
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error('Error en la respuesta:', data.error);
        setStatus('error');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setStatus('error');
    }
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#6F4C21] mb-2">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-[#6F4C21]/20 rounded-lg focus:ring-2 focus:ring-[#6F4C21]/20 focus:border-[#6F4C21] outline-none"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#6F4C21] mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-[#6F4C21]/20 rounded-lg focus:ring-2 focus:ring-[#6F4C21]/20 focus:border-[#6F4C21] outline-none"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#6F4C21] mb-2">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-2 border border-[#6F4C21]/20 rounded-lg focus:ring-2 focus:ring-[#6F4C21]/20 focus:border-[#6F4C21] outline-none"
        />
      </div>
      
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-[#6F4C21] text-white py-3 px-6 rounded-lg hover:bg-[#5A3D1A] transition-colors disabled:opacity-50"
      >
        {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
      </button>

      {status === 'success' && (
        <p className="text-green-600 text-center">
          ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
        </p>
      )}

      {status === 'error' && (
        <p className="text-red-600 text-center">
          Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.
        </p>
      )}
    </form>
  );
} 