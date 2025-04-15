import { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { addDays, isBefore, isAfter } from 'date-fns';

export function calcularPrecioTotal(precioPorNoche: number | Decimal, fechaInicio: Date, fechaFin: Date): number {
  const diferenciaDias = Math.ceil((fechaFin.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24));
  const precio = typeof precioPorNoche === 'number' ? precioPorNoche : precioPorNoche.toNumber();
  return precio * diferenciaDias;
}

export function validarFechasReserva(fechaInicio: Date, fechaFin: Date): string | null {
  const hoy = new Date();
  const fechaInicioDate = new Date(fechaInicio);
  const fechaFinDate = new Date(fechaFin);

  // Validar que las fechas sean futuras
  if (isBefore(fechaInicioDate, hoy) || isBefore(fechaFinDate, hoy)) {
    return 'Las fechas de reserva deben ser futuras';
  }

  // Validar que la fecha de fin sea posterior a la fecha de inicio
  if (isBefore(fechaFinDate, fechaInicioDate)) {
    return 'La fecha de fin debe ser posterior a la fecha de inicio';
  }

  // Validar que la reserva no exceda los 30 días
  const fechaMaxima = addDays(fechaInicioDate, 30);
  if (isAfter(fechaFinDate, fechaMaxima)) {
    return 'La reserva no puede exceder los 30 días';
  }

  return null;
}

export function formatearFecha(fecha: Date): string {
  return fecha.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

export function formatearPrecio(precio: Prisma.Decimal): string {
  return `$${Number(precio).toFixed(2)}`;
} 