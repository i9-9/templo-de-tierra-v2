"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import DatePicker from 'react-datepicker';
import { es } from 'date-fns/locale';
import { EstadoReserva, MetodoPago } from '@/lib/models/reserva';
import { validarFechasReserva, calcularPrecioTotal } from '@/lib/utils/reserva';
import "react-datepicker/dist/react-datepicker.css";

interface ReservaFormProps {
  temploId: string;
  precioPorNoche: number;
  capacidad: number;
  nombre: string;
}

export default function ReservaForm({ temploId, precioPorNoche, capacidad, nombre }: ReservaFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    temploId,
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

      // Validar número de huéspedes
      if (formData.numeroHuespedes > capacidad) {
        setError(`El templo tiene una capacidad máxima de ${capacidad} huéspedes`);
        return;
      }

      // Calcular precio total
      const precioTotal = calcularPrecioTotal(
        precioPorNoche,
        formData.fechaInicio,
        formData.fechaFin
      );

      // Convert dates to ISO strings for API
      const reservaData = {
        ...formData,
        fechaInicio: formData.fechaInicio.toISOString(),
        fechaFin: formData.fechaFin.toISOString(),
        precioTotal,
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

  const handleDateChange = (date: Date | null, field: 'fechaInicio' | 'fechaFin') => {
    if (date) {
      setFormData(prev => ({
        ...prev,
        [field]: date,
      }));
    }
  };

  if (!session) {
    return (
      <div className="text-center py-8">
        <p className="text-[#6F4C21] mb-4">Debes iniciar sesión para realizar una reserva</p>
        <a
          href="/auth/signin"
          className="inline-flex items-center px-4 py-2 border border-[#6F4C21]/20 text-sm font-medium rounded-md shadow-sm text-[#6F4C21] bg-[#F5DC90] hover:bg-[#F5DC90]/80"
        >
          Iniciar sesión
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fechaInicio" className="block text-sm font-medium text-[#6F4C21]">
            Fecha de llegada
          </label>
          <DatePicker
            selected={formData.fechaInicio}
            onChange={(date) => handleDateChange(date, 'fechaInicio')}
            className="mt-1 block w-full rounded-md border-[#6F4C21]/20 shadow-sm focus:border-[#6F4C21] focus:ring-[#6F4C21] text-base py-3 px-4"
            dateFormat="dd/MM/yyyy"
            locale={es}
            minDate={new Date()}
          />
        </div>

        <div>
          <label htmlFor="fechaFin" className="block text-sm font-medium text-[#6F4C21]">
            Fecha de salida
          </label>
          <DatePicker
            selected={formData.fechaFin}
            onChange={(date) => handleDateChange(date, 'fechaFin')}
            className="mt-1 block w-full rounded-md border-[#6F4C21]/20 shadow-sm focus:border-[#6F4C21] focus:ring-[#6F4C21] text-base py-3 px-4"
            dateFormat="dd/MM/yyyy"
            locale={es}
            minDate={formData.fechaInicio}
          />
        </div>
      </div>

      <div>
        <label htmlFor="numeroHuespedes" className="block text-sm font-medium text-[#6F4C21]">
          Número de huéspedes
        </label>
        <select
          id="numeroHuespedes"
          name="numeroHuespedes"
          value={formData.numeroHuespedes}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-[#6F4C21]/20 shadow-sm focus:border-[#6F4C21] focus:ring-[#6F4C21] text-base py-3 px-4"
        >
          {[...Array(capacidad)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} {i + 1 === 1 ? 'huésped' : 'huéspedes'}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="metodoPago" className="block text-sm font-medium text-[#6F4C21]">
          Método de pago
        </label>
        <select
          id="metodoPago"
          name="metodoPago"
          value={formData.metodoPago}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-[#6F4C21]/20 shadow-sm focus:border-[#6F4C21] focus:ring-[#6F4C21] text-base py-3 px-4"
        >
          <option value={MetodoPago.TARJETA}>Tarjeta de crédito/débito</option>
          <option value={MetodoPago.TRANSFERENCIA}>Transferencia bancaria</option>
          <option value={MetodoPago.EFECTIVO}>Efectivo</option>
        </select>
      </div>

      <div>
        <label htmlFor="notas" className="block text-sm font-medium text-[#6F4C21]">
          Notas adicionales (opcional)
        </label>
        <textarea
          id="notas"
          name="notas"
          rows={3}
          value={formData.notas}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-[#6F4C21]/20 shadow-sm focus:border-[#6F4C21] focus:ring-[#6F4C21] text-base py-3 px-4"
          placeholder="Alguna preferencia o requerimiento especial..."
        />
      </div>

      <div className="bg-[#F5DC90]/20 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-[#6F4C21]">Resumen de la reserva</h3>
        <div className="mt-2 space-y-2">
          <p className="text-sm text-[#6F4C21]/80">
            Templo: <span className="font-medium">{nombre}</span>
          </p>
          <p className="text-sm text-[#6F4C21]/80">
            Precio por noche: <span className="font-medium">${precioPorNoche}</span>
          </p>
          <p className="text-sm text-[#6F4C21]/80">
            Noches: <span className="font-medium">
              {Math.ceil((formData.fechaFin.getTime() - formData.fechaInicio.getTime()) / (1000 * 60 * 60 * 24))}
            </span>
          </p>
          <p className="text-lg font-medium text-[#6F4C21]">
            Total: <span className="font-bold">
              ${calcularPrecioTotal(precioPorNoche, formData.fechaInicio, formData.fechaFin)}
            </span>
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6F4C21] hover:bg-[#5A3B1A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6F4C21] disabled:opacity-50"
      >
        {loading ? 'Procesando...' : 'Confirmar reserva'}
      </button>
    </form>
  );
} 