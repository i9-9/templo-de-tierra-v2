"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { CreateReservaDTO, MetodoPago, validarFechasReserva, calcularPrecioTotal } from '@/lib/models/reserva';
import { Decimal } from '@prisma/client/runtime/library';

interface Templo {
  id: string;
  nombre: string;
  descripcion: string;
  descripcionCorta: string;
  capacidad: number;
  precio: Decimal | number;
  imagenPrincipal: string;
  imagenes: string[];
  amenities: string[];
  camas: string[];
  slug: string;
}

interface ReservaFormProps {
  templo: Templo;
}

export default function ReservaForm({ templo }: ReservaFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<CreateReservaDTO, 'userId'>>({
    temploId: templo.id,
    fechaInicio: new Date(),
    fechaFin: new Date(),
    numeroHuespedes: 1,
    metodoPago: MetodoPago.TARJETA,
    notas: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validar fechas
      const errorFecha = validarFechasReserva(formData.fechaInicio, formData.fechaFin);
      if (errorFecha) {
        setError(errorFecha);
        return;
      }

      // Convert dates to ISO strings for API
      const reservaData = {
        ...formData,
        fechaInicio: formData.fechaInicio.toISOString(),
        fechaFin: formData.fechaFin.toISOString(),
      };

      const response = await fetch('/api/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservaData),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      router.push('/reservas');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la reserva');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numeroHuespedes' ? parseInt(value) : value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: new Date(value),
    }));
  };

  const precioTotal = calcularPrecioTotal(
    templo.precio,
    formData.fechaInicio,
    formData.fechaFin,
    formData.numeroHuespedes
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fechaInicio" className="block text-sm font-medium text-[#6F4C21]/70">
            Fecha de llegada
          </label>
          <input
            type="date"
            id="fechaInicio"
            name="fechaInicio"
            value={formData.fechaInicio.toISOString().split('T')[0]}
            onChange={handleDateChange}
            className="mt-1 block w-full rounded-md border-[#6F4C21]/20 bg-transparent shadow-sm focus:border-[#D8A34B] focus:ring-[#D8A34B] text-[#6F4C21]"
            required
          />
        </div>

        <div>
          <label htmlFor="fechaFin" className="block text-sm font-medium text-[#6F4C21]/70">
            Fecha de salida
          </label>
          <input
            type="date"
            id="fechaFin"
            name="fechaFin"
            value={formData.fechaFin.toISOString().split('T')[0]}
            onChange={handleDateChange}
            className="mt-1 block w-full rounded-md border-[#6F4C21]/20 bg-transparent shadow-sm focus:border-[#D8A34B] focus:ring-[#D8A34B] text-[#6F4C21]"
            required
          />
        </div>

        <div>
          <label htmlFor="numeroHuespedes" className="block text-sm font-medium text-[#6F4C21]/70">
            Número de huéspedes
          </label>
          <input
            type="number"
            id="numeroHuespedes"
            name="numeroHuespedes"
            min="1"
            max={templo.capacidad}
            value={formData.numeroHuespedes}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-[#6F4C21]/20 bg-transparent shadow-sm focus:border-[#D8A34B] focus:ring-[#D8A34B] text-[#6F4C21]"
            required
          />
        </div>

        <div>
          <label htmlFor="metodoPago" className="block text-sm font-medium text-[#6F4C21]/70">
            Método de pago
          </label>
          <select
            id="metodoPago"
            name="metodoPago"
            value={formData.metodoPago}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-[#6F4C21]/20 bg-transparent shadow-sm focus:border-[#D8A34B] focus:ring-[#D8A34B] text-[#6F4C21]"
            required
          >
            {Object.values(MetodoPago).map((metodo) => (
              <option key={metodo} value={metodo}>
                {metodo.charAt(0).toUpperCase() + metodo.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="notas" className="block text-sm font-medium text-[#6F4C21]/70">
          Notas adicionales
        </label>
        <textarea
          id="notas"
          name="notas"
          rows={3}
          value={formData.notas}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-[#6F4C21]/20 bg-transparent shadow-sm focus:border-[#D8A34B] focus:ring-[#D8A34B] text-[#6F4C21]"
        />
      </div>

      <div className="bg-[#6F4C21]/5 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-[#6F4C21]">Resumen de la reserva</h3>
        <div className="mt-4 space-y-2">
          <p className="text-sm text-[#6F4C21]/80">
            Precio por noche: ${templo.precio.toFixed(2)}
          </p>
          <p className="text-sm text-[#6F4C21]/80">
            Número de noches: {Math.ceil((formData.fechaFin.getTime() - formData.fechaInicio.getTime()) / (1000 * 60 * 60 * 24))}
          </p>
          <p className="text-sm text-[#6F4C21]/80">
            Número de huéspedes: {formData.numeroHuespedes}
          </p>
          <p className="text-lg font-bold text-[#6F4C21] mt-4">
            Total: ${precioTotal.toFixed(2)}
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 text-white bg-[#D8A34B] hover:bg-[#6F4C21] rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Procesando...' : 'Confirmar reserva'}
      </button>
    </form>
  );
} 