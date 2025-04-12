import { Decimal } from '@prisma/client/runtime/library';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
type PrismaReserva = Awaited<ReturnType<typeof prisma.reserva.findUnique>>;

export const EstadoReserva = {
  PENDIENTE: 'PENDIENTE',
  CONFIRMADA: 'CONFIRMADA',
  CANCELADA: 'CANCELADA',
  COMPLETADA: 'COMPLETADA'
} as const;

export type EstadoReserva = typeof EstadoReserva[keyof typeof EstadoReserva];

export const MetodoPago = {
  TARJETA: 'TARJETA',
  TRANSFERENCIA: 'TRANSFERENCIA',
  EFECTIVO: 'EFECTIVO'
} as const;

export type MetodoPago = typeof MetodoPago[keyof typeof MetodoPago];

export interface Reserva extends Omit<NonNullable<PrismaReserva>, 'templo' | 'precioTotal'> {
  precioTotal: Decimal;
  templo?: {
    id: string;
    nombre: string;
    precio: Decimal;
    capacidad: number;
  };
}

export interface CreateReservaDTO {
  temploId: string;
  userId: string;
  fechaInicio: Date;
  fechaFin: Date;
  numeroHuespedes: number;
  metodoPago: MetodoPago;
  notas?: string;
}

export interface UpdateReservaDTO {
  estado?: EstadoReserva;
  notas?: string;
}

// Validación de fechas
export function validarFechasReserva(fechaInicio: Date, fechaFin: Date): string | null {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  if (fechaInicio < hoy) {
    return 'La fecha de inicio no puede ser en el pasado';
  }

  if (fechaFin <= fechaInicio) {
    return 'La fecha de fin debe ser posterior a la fecha de inicio';
  }

  // Mínimo 1 noche, máximo 30 noches
  const noches = Math.ceil((fechaFin.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24));
  if (noches < 1) {
    return 'La estadía mínima es de 1 noche';
  }
  if (noches > 30) {
    return 'La estadía máxima es de 30 noches';
  }

  return null;
}

// Cálculo de precio
export function calcularPrecioTotal(
  precioBase: Decimal | number,
  fechaInicio: Date,
  fechaFin: Date,
  numeroHuespedes: number
): number {
  const noches = Math.ceil((fechaFin.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24));
  const precio = typeof precioBase === 'number' ? precioBase : Number(precioBase);
  return precio * noches * numeroHuespedes;
} 