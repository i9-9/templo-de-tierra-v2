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

  const handleWhatsAppClick = () => {
    if (!reservaState.checkIn || !reservaState.checkOut) {
      setReservaState(prev => ({
        ...prev,
        error: 'Por favor, selecciona las fechas antes de contactar por WhatsApp.'
      }));
      return;
    }

    const checkInDate = new Date(reservaState.checkIn);
    const checkOutDate = new Date(reservaState.checkOut);
    
    const formatFechaCompleta = (date) => {
      const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
      const diaSemana = diasSemana[date.getDay()];
      const dia = date.getDate();
      const mes = meses[date.getMonth()];
      const año = date.getFullYear();
      return `${diaSemana} ${dia} de ${mes} de ${año}`;
    };

    const fechaInicio = formatFechaCompleta(checkInDate);
    const fechaFin = formatFechaCompleta(checkOutDate);
    const fechaInicioCorta = checkInDate.toLocaleDateString('es-ES');
    const fechaFinCorta = checkOutDate.toLocaleDateString('es-ES');
    
    const mensaje = `¡Hola! Me interesa hacer una reserva en ${temploNombre}.

📅 *Fechas de estadía:*
• Check-in: ${fechaInicio} (${fechaInicioCorta})
• Check-out: ${fechaFin} (${fechaFinCorta})
• Duración: ${noches} ${noches === 1 ? 'noche' : 'noches'}

👥 *Huéspedes:* ${reservaState.huespedes} ${reservaState.huespedes === 1 ? 'persona' : 'personas'}

¿Podrían confirmarme la disponibilidad y proporcionarme más información sobre precios?

¡Gracias!`;

    const whatsappUrl = `https://wa.me/5491131032348?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  if (reservaState.submitted) {
    return (
      <div className="p-6 bg-white rounded-lg border border-[#6F4C21]/20 text-center">
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
    <div className="p-6 bg-white rounded-lg border border-[#6F4C21]/20">
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
        
        <div className="space-y-3">
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
          
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="w-full flex justify-center items-center py-3 px-6 border border-green-600 rounded-lg shadow-sm text-sm font-medium text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
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
      </form>
    </div>
  );
} 