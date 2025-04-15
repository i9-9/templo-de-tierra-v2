"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ReservaFormProps {
  temploId: string;
  precioPorNoche: number;
  capacidad: number;
  nombre: string;
}

export default function ReservaForm({ temploId, precioPorNoche, capacidad, nombre }: ReservaFormProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [huespedes, setHuespedes] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!session) {
      router.push('/auth/signin');
      return;
    }

    if (!startDate || !endDate) {
      setError('Por favor selecciona las fechas de tu estadía');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          temploId,
          startDate,
          endDate,
          huespedes,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la reserva');
      }

      router.push('/reservas');
    } catch (err) {
      setError('Error al crear la reserva. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const calcularTotal = () => {
    if (!startDate || !endDate) return 0;
    const noches = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return noches * precioPorNoche;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Fecha de llegada
        </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-earth-brown focus:ring-earth-brown sm:text-sm"
          placeholderText="Selecciona fecha de llegada"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Fecha de salida
        </label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate || new Date()}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-earth-brown focus:ring-earth-brown sm:text-sm"
          placeholderText="Selecciona fecha de salida"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Número de huéspedes
        </label>
        <select
          value={huespedes}
          onChange={(e) => setHuespedes(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-earth-brown focus:ring-earth-brown sm:text-sm"
        >
          {Array.from({ length: capacidad }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? 'huésped' : 'huéspedes'}
            </option>
          ))}
        </select>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between text-sm">
          <span>Precio por noche:</span>
          <span>${precioPorNoche.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold mt-2">
          <span>Total:</span>
          <span>${calcularTotal().toLocaleString()}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-earth-brown hover:bg-earth-brown-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-earth-brown disabled:opacity-50"
      >
        {isLoading ? 'Reservando...' : 'Reservar ahora'}
      </button>
    </form>
  );
} 