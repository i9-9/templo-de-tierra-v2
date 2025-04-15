export interface User {
  id: string
  name: string | null
  email: string | null
  image: string | null
  isAdmin: boolean
}

export interface Templo {
  id: string
  nombre: string
  slug: string
  descripcion: string
  imagenes: string[]
  precio_por_noche: number
  capacidad: number
}

export interface Reserva {
  id: string
  userId: string
  temploId: string
  fechaInicio: Date
  fechaFin: Date
  estado: string
  createdAt: Date
  updatedAt: Date
  user: User
  templo: Templo
} 