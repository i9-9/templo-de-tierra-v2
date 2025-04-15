'use client'

import Image from 'next/image'
import Gallery from './Gallery'
import { useState } from 'react'

export default function TemploDetalles({ templo }) {
  if (!templo) return null;
  
  const [reservaState, setReservaState] = useState({
    checkIn: '',
    checkOut: '',
    huespedes: 2,
    submitted: false,
    submitting: false,
    error: null,
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservaState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setReservaState(prev => ({
      ...prev,
      submitting: true,
      error: null
    }));
    
    if (!reservaState.checkIn || !reservaState.checkOut) {
      setReservaState(prev => ({
        ...prev,
        submitting: false,
        error: 'Por favor, selecciona las fechas de check-in y check-out.'
      }));
      return;
    }
    
    // Validación básica de fechas
    const checkInDate = new Date(reservaState.checkIn);
    const checkOutDate = new Date(reservaState.checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkInDate < today) {
      setReservaState(prev => ({
        ...prev,
        submitting: false,
        error: 'La fecha de check-in no puede ser en el pasado.'
      }));
      return;
    }
    
    if (checkOutDate <= checkInDate) {
      setReservaState(prev => ({
        ...prev,
        submitting: false,
        error: 'La fecha de check-out debe ser posterior a la de check-in.'
      }));
      return;
    }
    
    try {
      // Esperar 1 segundo para simular el envío
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setReservaState(prev => ({
        ...prev,
        submitting: false,
        submitted: true
      }));
    } catch (error) {
      setReservaState(prev => ({
        ...prev,
        submitting: false,
        error: 'Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente.'
      }));
    }
  };
  
  // Cálculo de noches
  const calcularNoches = () => {
    if (!reservaState.checkIn || !reservaState.checkOut) return 0;
    
    const checkInDate = new Date(reservaState.checkIn);
    const checkOutDate = new Date(reservaState.checkOut);
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  const noches = calcularNoches();
  
  return (
    <div className="grid grid-cols-12 gap-x-8 gap-y-6">
      {/* Columna izquierda (8/12 en desktop) con galería e info */}
      <div className="col-span-12 lg:col-span-8 space-y-8">
        <h1 className="text-[2.5rem] font-heading text-[#6F4C21] mb-2">{templo.nombre}</h1>
        
        {/* Galería de imágenes */}
        <Gallery images={templo.imagenes} />
        
        {/* Información principal */}
        <div className="border-t border-b border-[#6F4C21]/10 py-6 my-6">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6 md:col-span-4">
              <p className="text-sm text-[#6F4C21]/70">Capacidad</p>
              <p className="text-lg font-medium text-[#6F4C21]">{templo.capacidad}</p>
            </div>
            
            <div className="col-span-6 md:col-span-4">
              <p className="text-sm text-[#6F4C21]/70">Camas</p>
              <p className="text-lg font-medium text-[#6F4C21]">{templo.camas}</p>
            </div>
            
            <div className="col-span-12 md:col-span-4">
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
          <div className="grid grid-cols-12 gap-4">
            {templo.amenities.map((amenity, index) => (
              <div key={index} className="col-span-12 md:col-span-6 flex items-center gap-2">
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
      
      {/* Columna derecha (4/12 en desktop) con widget de reserva */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        <div className="sticky top-[136px]">
          {reservaState.submitted ? (
            <div className="p-6 bg-[#F5DC90]/20 rounded-lg border border-[#6F4C21]/20 text-center">
              <h3 className="text-[#6F4C21] font-heading text-2xl mb-4">¡Solicitud Enviada!</h3>
              <p className="text-[#6F4C21] mb-6">
                Tu solicitud de reserva para {templo.nombre} ha sido recibida. 
                Te contactaremos pronto para confirmar disponibilidad.
              </p>
              <div className="p-4 bg-white/40 rounded-lg mb-6 text-left">
                <p className="mb-2"><strong>Check-in:</strong> {new Date(reservaState.checkIn).toLocaleDateString('es-ES')}</p>
                <p className="mb-2"><strong>Check-out:</strong> {new Date(reservaState.checkOut).toLocaleDateString('es-ES')}</p>
                <p className="mb-2"><strong>Noches:</strong> {noches}</p>
                <p><strong>Huéspedes:</strong> {reservaState.huespedes}</p>
              </div>
              <button 
                onClick={() => setReservaState(prev => ({...prev, submitted: false}))}
                className="bg-[#6F4C21] text-[#F5DC90] py-2 px-6 rounded-lg hover:bg-[#5A3D1A] transition-colors"
              >
                Realizar otra consulta
              </button>
            </div>
          ) : (
            <div className="p-6 bg-[#F5DC90]/20 rounded-lg border border-[#6F4C21]/20">
              <h3 className="text-[#6F4C21] font-heading text-2xl mb-6">Solicitar reserva</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {reservaState.error && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                    {reservaState.error}
                  </div>
                )}
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#6F4C21]">
                    Fecha de llegada
                  </label>
                  <input
                    type="date"
                    name="checkIn"
                    value={reservaState.checkIn}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#6F4C21]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F4C21]/20"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#6F4C21]">
                    Fecha de salida
                  </label>
                  <input
                    type="date"
                    name="checkOut"
                    value={reservaState.checkOut}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#6F4C21]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F4C21]/20"
                    min={reservaState.checkIn || new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#6F4C21]">
                    Número de huéspedes
                  </label>
                  <select
                    name="huespedes"
                    value={reservaState.huespedes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#6F4C21]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F4C21]/20"
                  >
                    {[1, 2, 3, 4].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'huésped' : 'huéspedes'}</option>
                    ))}
                  </select>
                </div>
                
                {noches > 0 && (
                  <div className="p-4 bg-white/40 rounded-lg">
                    <p className="text-[#6F4C21]">
                      <span className="font-medium">{noches}</span> {noches === 1 ? 'noche' : 'noches'}
                    </p>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={reservaState.submitting}
                  className="w-full bg-[#6F4C21] text-[#F5DC90] py-3 rounded-lg hover:bg-[#5A3D1A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {reservaState.submitting ? 'Enviando...' : 'Solicitar reserva'}
                </button>
              </form>
            </div>
          )}
          
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
              Estamos ubicados en un hermoso entorno natural en Uruguay.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 