'use client'

import { useState } from 'react'

export default function ReservaWidget({ temploId, temploNombre }) {
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
    
    // Simulación de envío - en un escenario real esto se conectaría a una API
    try {
      // Esperar 1 segundo para simular el envío
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Para fines de demostración, marcamos como exitoso
      setReservaState(prev => ({
        ...prev,
        submitting: false,
        submitted: true
      }));
      
      // En una implementación real, aquí enviarías los datos a un endpoint
      // const body = { temploId, ...reservaState };
      // fetch('/api/reservas', {method: 'POST', body: JSON.stringify(body)})
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
  
  if (reservaState.submitted) {
    return (
      <div className="p-6 bg-[#F5DC90]/20 rounded-lg border border-[#6F4C21]/20 text-center">
        <h3 className="text-[#6F4C21] font-heading text-2xl mb-4">¡Solicitud Enviada!</h3>
        <p className="text-[#6F4C21] mb-6">
          Tu solicitud de reserva para {temploNombre} ha sido recibida. 
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
    );
  }
  
  return (
    <div className="p-6 bg-[#F5DC90]/20 rounded-lg border border-[#6F4C21]/20">
      <h3 className="text-[#6F4C21] font-heading text-xl mb-4">Consultar disponibilidad</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="checkIn" className="block text-[#6F4C21] font-medium mb-1 text-sm">
              Check-in
            </label>
            <input
              id="checkIn"
              name="checkIn"
              type="date"
              required
              value={reservaState.checkIn}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border border-[#6F4C21]/20 bg-white/60 focus:outline-none focus:ring-2 focus:ring-[#6F4C21]/30"
            />
          </div>
          
          <div>
            <label htmlFor="checkOut" className="block text-[#6F4C21] font-medium mb-1 text-sm">
              Check-out
            </label>
            <input
              id="checkOut"
              name="checkOut"
              type="date"
              required
              value={reservaState.checkOut}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border border-[#6F4C21]/20 bg-white/60 focus:outline-none focus:ring-2 focus:ring-[#6F4C21]/30"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="huespedes" className="block text-[#6F4C21] font-medium mb-1 text-sm">
            Huéspedes
          </label>
          <select
            id="huespedes"
            name="huespedes"
            value={reservaState.huespedes}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded-lg border border-[#6F4C21]/20 bg-white/60 focus:outline-none focus:ring-2 focus:ring-[#6F4C21]/30"
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'persona' : 'personas'}
              </option>
            ))}
          </select>
        </div>
        
        {noches > 0 && (
          <div className="p-3 bg-white/40 rounded-lg">
            <p className="text-[#6F4C21] font-medium">
              {noches} {noches === 1 ? 'noche' : 'noches'} · {reservaState.huespedes} {reservaState.huespedes === 1 ? 'persona' : 'personas'}
            </p>
          </div>
        )}
        
        {reservaState.error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {reservaState.error}
          </div>
        )}
        
        <div>
          <button
            type="submit"
            disabled={reservaState.submitting}
            className={`w-full py-3 px-6 bg-[#6F4C21] text-[#F5DC90] rounded-lg font-medium transition-colors ${
              reservaState.submitting 
                ? 'opacity-70 cursor-not-allowed' 
                : 'hover:bg-[#5A3D1A]'
            }`}
          >
            {reservaState.submitting ? 'Enviando...' : 'Consultar disponibilidad'}
          </button>
        </div>
      </form>
    </div>
  );
} 