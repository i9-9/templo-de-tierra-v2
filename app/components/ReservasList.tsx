'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { formatearFecha, formatearPrecio } from '@/lib/utils/reserva';
import { EstadoReserva } from '@/lib/models/reserva';
import { Decimal } from '@prisma/client/runtime/library';

interface Reserva {
  id: string;
  fechaInicio: Date;
  fechaFin: Date;
  numeroHuespedes: number;
  precioTotal: Decimal;
  estado: EstadoReserva;
  templo: {
    nombre: string;
    imagen: string;
  };
}

export default function ReservasList() {
  const { data: session } = useSession();
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await fetch('/api/reservas');
        if (!response.ok) {
          throw new Error('Error al obtener las reservas');
        }
        const data = await response.json();
        setReservas(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar las reservas');
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchReservas();
    }
  }, [session]);

  const handleCancelarReserva = async (reservaId: string) => {
    try {
      const response = await fetch(`/api/reservas?id=${reservaId}`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        throw new Error('Error al cancelar la reserva');
      }

      const reservaActualizada = await response.json();
      setReservas(reservas.map(r => r.id === reservaId ? reservaActualizada : r));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cancelar la reserva');
    }
  };

  if (!session) {
    return (
      <div className="text-center py-8">
        <p className="text-[#6F4C21] mb-4">Debes iniciar sesión para ver tus reservas</p>
        <a
          href="/auth/signin"
          className="inline-flex items-center px-4 py-2 border border-[#6F4C21]/20 text-sm font-medium rounded-md shadow-sm text-[#6F4C21] bg-[#F5DC90] hover:bg-[#F5DC90]/80"
        >
          Iniciar sesión
        </a>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6F4C21]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (reservas.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-[#6F4C21]">No tienes reservas aún</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reservas.map((reserva) => (
        <div
          key={reserva.id}
          className="bg-[#F5DC90]/20 rounded-lg shadow-md overflow-hidden border border-[#6F4C21]/20 backdrop-blur-sm"
        >
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-heading text-[#6F4C21]">{reserva.templo.nombre}</h3>
                <p className="text-sm text-[#6F4C21]/70">
                  {formatearFecha(new Date(reserva.fechaInicio))} - {formatearFecha(new Date(reserva.fechaFin))}
                </p>
                <p className="text-sm text-[#6F4C21]/70">
                  {reserva.numeroHuespedes} {reserva.numeroHuespedes === 1 ? 'huésped' : 'huéspedes'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-heading text-[#6F4C21]">
                  {formatearPrecio(reserva.precioTotal)}
                </p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  reserva.estado === EstadoReserva.CONFIRMADA
                    ? 'bg-[#6F4C21]/10 text-[#6F4C21]'
                    : reserva.estado === EstadoReserva.PENDIENTE
                    ? 'bg-[#D8A34B]/20 text-[#6F4C21]'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {reserva.estado}
                </span>
              </div>
            </div>
            {(reserva.estado === EstadoReserva.PENDIENTE || reserva.estado === EstadoReserva.CONFIRMADA) && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleCancelarReserva(reserva.id)}
                  className="inline-flex items-center px-3 py-1 border border-[#6F4C21]/20 text-sm font-medium rounded-md text-[#6F4C21] bg-[#F5DC90]/40 hover:bg-[#F5DC90]/60 transition-colors"
                >
                  Cancelar reserva
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
} 