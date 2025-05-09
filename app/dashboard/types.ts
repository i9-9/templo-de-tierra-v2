import { Decimal } from '@prisma/client/runtime/library'

export interface User {
  id: string
  name: string | null
  email: string | null
  image: string | null
  emailVerified: Date | null
  isAdmin: boolean
  createdAt: Date
}

export interface Templo {
  id: string
  nombre: string
  slug: string
  descripcion: string
  descripcionCorta: string
  capacidad: number
  precio: Decimal
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
  precioTotal: Decimal
  estado: 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA'
  metodoPago: 'TARJETA' | 'TRANSFERENCIA' | 'EFECTIVO'
  notas?: string
  temploId: string
  userId: string
  createdAt: Date
  updatedAt: Date
  user: User
  templo: Templo
} 