'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale';
import { Prisma } from '@prisma/client';
import { calcularPrecioTotal, validarFechasReserva, formatearPrecio } from '@/lib/utils/reserva';

const reservaSchema = z.object({
  fechaInicio: z.date(),
  fechaFin: z.date(),
  numeroHuespedes: z.number().min(1).max(10),
  metodoPago: z.enum(['TARJETA', 'TRANSFERENCIA', 'EFECTIVO']),
  notas: z.string().optional(),
});

type ReservaFormData = z.infer<typeof reservaSchema>;

interface ReservaFormProps {
  temploId: string;
  precioPorNoche: Prisma.Decimal;
  onSubmit: (data: ReservaFormData) => Promise<void>;
}

export default function ReservaForm({ temploId, precioPorNoche, onSubmit }: ReservaFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [errorFecha, setErrorFecha] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReservaFormData>({
    resolver: zodResolver(reservaSchema),
  });

  const fechaInicio = watch('fechaInicio');
  const fechaFin = watch('fechaFin');
  const numeroHuespedes = watch('numeroHuespedes');

  const actualizarPrecioTotal = (inicio: Date | undefined, fin: Date | undefined) => {
    if (!inicio || !fin) {
      setPrecioTotal(0);
      setErrorFecha(null);
      return;
    }

    const error = validarFechasReserva(inicio, fin);
    setErrorFecha(error);

    if (!error) {
      const total = calcularPrecioTotal(precioPorNoche, inicio, fin);
      setPrecioTotal(total);
    } else {
      setPrecioTotal(0);
    }
  };

  const onFormSubmit = async (data: ReservaFormData) => {
    if (errorFecha) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Error al crear la reserva:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Fechas de estadía</label>
        <div className="mt-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <DatePicker
              selected={fechaInicio}
              onChange={(date) => {
                setValue('fechaInicio', date as Date);
                actualizarPrecioTotal(date as Date, fechaFin);
              }}
              selectsStart
              startDate={fechaInicio}
              endDate={fechaFin}
              minDate={new Date()}
              locale={es}
              dateFormat="dd/MM/yyyy"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#6F4C21] focus:ring-[#6F4C21]"
              placeholderText="Fecha de llegada"
            />
          </div>
          <div>
            <DatePicker
              selected={fechaFin}
              onChange={(date) => {
                setValue('fechaFin', date as Date);
                actualizarPrecioTotal(fechaInicio, date as Date);
              }}
              selectsEnd
              startDate={fechaInicio}
              endDate={fechaFin}
              minDate={fechaInicio}
              locale={es}
              dateFormat="dd/MM/yyyy"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#6F4C21] focus:ring-[#6F4C21]"
              placeholderText="Fecha de salida"
            />
          </div>
        </div>
        {errorFecha && (
          <p className="mt-1 text-sm text-red-600">{errorFecha}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Número de huéspedes</label>
        <select
          {...register('numeroHuespedes', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6F4C21] focus:ring-[#6F4C21]"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? 'huésped' : 'huéspedes'}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Método de pago</label>
        <select
          {...register('metodoPago')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6F4C21] focus:ring-[#6F4C21]"
        >
          <option value="TARJETA">Tarjeta de crédito/débito</option>
          <option value="TRANSFERENCIA">Transferencia bancaria</option>
          <option value="EFECTIVO">Efectivo</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notas adicionales</label>
        <textarea
          {...register('notas')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6F4C21] focus:ring-[#6F4C21]"
          placeholder="¿Alguna preferencia o requerimiento especial?"
        />
      </div>

      <div className="bg-[#F5DC90]/20 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-[#6F4C21]">Resumen de la reserva</h3>
        <div className="mt-2 space-y-2">
          <p className="text-sm text-gray-600">
            Precio por noche: {formatearPrecio(precioPorNoche)}
          </p>
          <p className="text-sm text-gray-600">
            Noches: {fechaInicio && fechaFin ? Math.ceil((fechaFin.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24)) : 0}
          </p>
          <p className="text-lg font-medium text-[#6F4C21]">
            Total: {formatearPrecio(new Prisma.Decimal(precioTotal))}
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !!errorFecha}
        className="w-full bg-[#6F4C21] text-white py-2 px-4 rounded-md hover:bg-[#5A3B1A] focus:outline-none focus:ring-2 focus:ring-[#6F4C21] focus:ring-offset-2 disabled:opacity-50"
      >
        {isSubmitting ? 'Reservando...' : 'Confirmar reserva'}
      </button>
    </form>
  );
} 