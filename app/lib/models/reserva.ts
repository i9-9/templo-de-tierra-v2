import { Decimal } from '@prisma/client/runtime/library';

export interface Reserva {
  id: string;
  temploId: string;
  userId: string;
  fechaInicio: Date;
  fechaFin: Date;
  numeroHuespedes: number;
  estado: 'pendiente' | 'confirmada' | 'cancelada' | 'completada';
  precioTotal: number;
  metodoPago: 'tarjeta' | 'transferencia';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateReservaDTO {
  temploId: string;
  userId: string;
  fechaInicio: string;
  fechaFin: string;
  numeroHuespedes: number;
  metodoPago: 'tarjeta' | 'transferencia';
}

export function validarFechasReserva(fechaInicio: Date | string, fechaFin: Date | string): string | null {
  const inicio = typeof fechaInicio === 'string' ? new Date(fechaInicio) : fechaInicio;
  const fin = typeof fechaFin === 'string' ? new Date(fechaFin) : fechaFin;
  
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  if (inicio < hoy) {
    return 'La fecha de inicio no puede ser anterior a hoy';
  }

  if (fin <= inicio) {
    return 'La fecha de fin debe ser posterior a la fecha de inicio';
  }

  return null;
}

export function calcularPrecioTotal(
  precio: Decimal | number,
  fechaInicio: Date,
  fechaFin: Date,
  numeroHuespedes: number
): number {
  const noches = Math.ceil((fechaFin.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24));
  const precioPorNoche = typeof precio === 'number' ? precio : precio.toNumber();
  return precioPorNoche * noches * numeroHuespedes;
} 