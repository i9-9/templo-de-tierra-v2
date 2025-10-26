"use client";

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ReservaFormProps {
  temploId: string;
  capacidad: string;
  nombre: string;
}

export default function ReservaForm({ temploId, capacidad, nombre }: ReservaFormProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [huespedes, setHuespedes] = useState(1);
  const [error, setError] = useState('');

  // Extraer número de capacidad del string (ej: "2 personas" -> 2)
  const getCapacidadNumber = () => {
    if (!capacidad || typeof capacidad !== 'string') {
      return 4; // default 4 si capacidad no es válida
    }
    const match = capacidad.match(/\d+/);
    return match ? parseInt(match[0]) : 4; // default 4 si no se puede parsear
  };

  const handleWhatsAppClick = () => {
    setError('');
    if (!startDate || !endDate) {
      setError('Por favor seleccioná las fechas de tu estadía antes de contactar por WhatsApp');
      return;
    }

    const noches = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const fechaInicio = startDate.toLocaleDateString('es-ES');
    const fechaFin = endDate.toLocaleDateString('es-ES');
    
    const mensaje = `¡Hola! Me interesa hacer una reserva en ${nombre}.

📅 Fechas: ${fechaInicio} - ${fechaFin} (${noches} ${noches === 1 ? 'noche' : 'noches'})
👥 Huéspedes: ${huespedes} ${huespedes === 1 ? 'persona' : 'personas'}
👥 Capacidad: ${capacidad || 'No especificada'}

¿Podrían confirmarme la disponibilidad y brindarme más información sobre precios?

¡Gracias!`;

    const whatsappUrl = `https://wa.me/5491140753025?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, '_blank');
  };

  const capacidadNumber = getCapacidadNumber();

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="space-y-8">
        <div className="space-y-2">
          <label className="block text-lg font-medium text-earth-brown mb-3">
            Fecha de llegada
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            className="w-full px-4 py-4 text-lg border-2 border-earth-brown/20 rounded-lg focus:border-earth-brown focus:ring-0 focus:outline-none transition-colors duration-200 bg-white/80 backdrop-blur-sm"
            placeholderText="Seleccioná fecha de llegada"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium text-earth-brown mb-3">
            Fecha de salida
          </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate || new Date()}
            className="w-full px-4 py-4 text-lg border-2 border-earth-brown/20 rounded-lg focus:border-earth-brown focus:ring-0 focus:outline-none transition-colors duration-200 bg-white/80 backdrop-blur-sm"
            placeholderText="Seleccioná fecha de salida"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium text-earth-brown mb-3">
            Número de huéspedes
          </label>
          <select
            value={huespedes}
            onChange={(e) => setHuespedes(Number(e.target.value))}
            className="w-full px-4 py-4 text-lg border-2 border-earth-brown/20 rounded-lg focus:border-earth-brown focus:ring-0 focus:outline-none transition-colors duration-200 bg-white/80 backdrop-blur-sm"
          >
            {Array.from({ length: capacidadNumber }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'huésped' : 'huéspedes'}
              </option>
            ))}
          </select>
        </div>

        <div className="border-t border-earth-brown/20 pt-6">
          <div className="flex items-center space-x-2 text-earth-brown/80">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-lg font-medium">Capacidad: {capacidad || 'No especificada'}</span>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="w-full py-4 px-6 text-lg font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-600/30 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-3"
          >
            <svg 
              className="w-6 h-6" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.700"/>
            </svg>
            <span>Consultar disponibilidad por WhatsApp</span>
          </button>
          
          <p className="text-sm text-earth-brown/60 text-center mt-4">
            Te responderemos a la brevedad con disponibilidad y precios
          </p>
        </div>
      </div>
    </div>
  );
} 