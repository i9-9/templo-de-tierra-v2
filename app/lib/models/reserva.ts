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
  fechaInicio: Date;
  fechaFin: Date;
  numeroHuespedes: number;
  metodoPago: 'tarjeta' | 'transferencia';
} 