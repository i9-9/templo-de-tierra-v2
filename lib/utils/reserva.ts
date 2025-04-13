import { Prisma } from '@prisma/client';

export function calcularPrecioTotal(precioPorNoche: Prisma.Decimal, fechaInicio: Date, fechaFin: Date): number {
  const noches = Math.ceil((fechaFin.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24));
  return Number(precioPorNoche) * noches;
}

export function validarFechasReserva(fechaInicio: Date, fechaFin: Date): string | null {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  if (fechaInicio < hoy) {
    return 'La fecha de inicio no puede ser en el pasado';
  }

  if (fechaFin <= fechaInicio) {
    return 'La fecha de fin debe ser posterior a la fecha de inicio';
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