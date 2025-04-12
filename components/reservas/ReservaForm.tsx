'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { CreateReservaDTO, MetodoPago } from '@/lib/models/reserva';
import Button from '../ui/Button';

interface ReservaFormProps {
  onSubmit: (reserva: CreateReservaDTO) => Promise<void>;
}

export default function ReservaForm({ onSubmit }: ReservaFormProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateReservaDTO>({
    temploId: '',
    userId: session?.user?.id || '',
    fechaInicio: new Date(),
    fechaFin: new Date(),
    numeroHuespedes: 1,
    metodoPago: MetodoPago.TARJETA,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error al crear la reserva:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numeroHuespedes' ? parseInt(value) : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700">
          Fecha de inicio
        </label>
        <input
          type="date"
          id="fechaInicio"
          name="fechaInicio"
          value={formData.fechaInicio.toISOString().split('T')[0]}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label htmlFor="fechaFin" className="block text-sm font-medium text-gray-700">
          Fecha de fin
        </label>
        <input
          type="date"
          id="fechaFin"
          name="fechaFin"
          value={formData.fechaFin.toISOString().split('T')[0]}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label htmlFor="numeroHuespedes" className="block text-sm font-medium text-gray-700">
          Número de huéspedes
        </label>
        <input
          type="number"
          id="numeroHuespedes"
          name="numeroHuespedes"
          min="1"
          value={formData.numeroHuespedes}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label htmlFor="metodoPago" className="block text-sm font-medium text-gray-700">
          Método de pago
        </label>
        <select
          id="metodoPago"
          name="metodoPago"
          value={formData.metodoPago}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        >
          <option value={MetodoPago.TARJETA}>Tarjeta de crédito</option>
          <option value={MetodoPago.TRANSFERENCIA}>Transferencia bancaria</option>
          <option value={MetodoPago.EFECTIVO}>Efectivo</option>
        </select>
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={loading}
      >
        {loading ? 'Creando reserva...' : 'Crear reserva'}
      </Button>
    </form>
  );
} 