export enum EstadoReserva {
  PENDIENTE = 'PENDIENTE',
  CONFIRMADA = 'CONFIRMADA',
  CANCELADA = 'CANCELADA'
}

export enum MetodoPago {
  TARJETA = 'TARJETA',
  TRANSFERENCIA = 'TRANSFERENCIA',
  EFECTIVO = 'EFECTIVO'
}

export interface User {
  id: string
  name?: string
  email?: string
  emailVerified?: Date
  image?: string
  createdAt: Date
}

export interface Templo {
  id: string
  nombre: string
  slug: string
  descripcion: string
  descripcionCorta: string
  capacidad: number
  precio: number
  amenities: string[]
  camas: string[]
  imagenPrincipal: string
  imagenes: string[]
  destacado: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Reserva {
  id: string
  fechaInicio: Date
  fechaFin: Date
  numeroHuespedes: number
  precioTotal: number
  estado: EstadoReserva
  metodoPago: MetodoPago
  notas?: string
  temploId: string
  userId: string
  createdAt: Date
  updatedAt: Date
  templo?: Templo
}

export interface Favorito {
  id: string
  temploId: string
  userId: string
  createdAt: Date
  templo?: Templo
} 