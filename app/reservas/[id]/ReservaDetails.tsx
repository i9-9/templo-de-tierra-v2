'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EstadoReserva, MetodoPago } from '@/lib/models/reserva';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';
import { Decimal } from '@prisma/client/runtime/library';

interface Reserva {
  id: string;
  temploId: string;
  userId: string;
  fechaInicio: Date;
  fechaFin: Date;
  numeroHuespedes: number;
  estado: EstadoReserva;
  precioTotal: Decimal;
  metodoPago: MetodoPago;
  notas?: string | null;
  createdAt: Date;
  updatedAt: Date;
  templo: {
    nombre: string;
  };
}

interface ReservaDetailsProps {
  reserva: Reserva;
}

export default function ReservaDetails({ reserva }: ReservaDetailsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCancelar = async () => {
    if (!confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/reservas/${reserva.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      router.push('/reservas');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cancelar la reserva');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Detalles de la reserva
            </h3>
            <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold leading-5 ${
              reserva.estado === EstadoReserva.CONFIRMADA
                ? 'bg-green-100 text-green-800'
                : reserva.estado === EstadoReserva.PENDIENTE
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {reserva.estado}
            </span>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Templo</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {reserva.templo.nombre}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Fechas</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {format(new Date(reserva.fechaInicio), 'PPP', { locale: es })} -{' '}
                {format(new Date(reserva.fechaFin), 'PPP', { locale: es })}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Número de huéspedes</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {reserva.numeroHuespedes}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Método de pago</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {reserva.metodoPago}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Precio total</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                ${reserva.precioTotal.toFixed(2)}
              </dd>
            </div>
            {reserva.notas && (
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Notas adicionales</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {reserva.notas}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      <div className="mt-8 flex space-x-4">
        <Link
          href="/reservas"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Volver a mis reservas
        </Link>
        {reserva.estado !== EstadoReserva.CANCELADA && (
          <button
            onClick={handleCancelar}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Cancelando...' : 'Cancelar reserva'}
          </button>
        )}
      </div>
    </div>
  );
} 