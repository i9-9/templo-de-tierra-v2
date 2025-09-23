const { getTemploBySlug: getTemploBySlugFromData, getAllTemplos: getAllTemplosFromData } = require('./data.js');
import type { TemploData } from './data'

export interface Templo {
  id: string
  nombre: string
  slug: string
  descripcion: string
  descripcionCorta: string
  imagenes: string[]
  imagenPrincipal: string
  capacidad: string
  amenities: string[]
  camas: string
  destacado?: boolean
}

export async function getTemploBySlug(slug: string): Promise<Templo | null> {
  console.log('Using local data for templo:', slug)
  const localTemplo = getTemploBySlugFromData(slug) as TemploData | undefined
  if (localTemplo) {
    return {
      id: localTemplo.id,
      nombre: localTemplo.nombre,
      slug: localTemplo.slug,
      descripcion: localTemplo.descripcion,
      descripcionCorta: localTemplo.descripcionCorta,
      imagenes: localTemplo.imagenes,
      imagenPrincipal: localTemplo.imagenPrincipal,
      capacidad: localTemplo.capacidad,
      amenities: localTemplo.amenities,
      camas: localTemplo.camas,
      destacado: false
    }
  }
  return null
}

export async function getAllTemplos(): Promise<Templo[]> {
  console.log('Using local data for all templos')
  const localTemplos = getAllTemplosFromData() as TemploData[]
  return localTemplos.map(templo => ({
    id: templo.id,
    nombre: templo.nombre,
    slug: templo.slug,
    descripcion: templo.descripcion,
    descripcionCorta: templo.descripcionCorta,
    imagenes: templo.imagenes,
    imagenPrincipal: templo.imagenPrincipal,
    capacidad: templo.capacidad,
    amenities: templo.amenities,
    camas: templo.camas,
    destacado: false
  }))
}