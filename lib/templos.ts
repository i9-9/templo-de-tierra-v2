import { createClient } from '@supabase/supabase-js'

export interface Templo {
  id: string
  nombre: string
  slug: string
  descripcion: string
  imagenes: string[]
  precio_por_noche: number
  capacidad: number
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function getTemploBySlug(slug: string): Promise<Templo | null> {
  try {
    const { data, error } = await supabase
      .from('Templo')
      .select(`
        id,
        nombre,
        slug,
        descripcion,
        imagenes,
        precio_por_noche,
        capacidad
      `)
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Error fetching templo:', error.message)
      return null
    }

    if (!data) {
      console.error('No templo found with slug:', slug)
      return null
    }

    // Validar que los datos requeridos estén presentes
    if (!data.id || !data.nombre || !data.slug || !data.descripcion) {
      console.error('Invalid templo data:', data)
      return null
    }

    // Asegurar que imagenes sea un array
    const imagenes = Array.isArray(data.imagenes) ? data.imagenes : []

    return {
      ...data,
      imagenes,
      precio_por_noche: Number(data.precio_por_noche) || 0,
      capacidad: Number(data.capacidad) || 1
    }
  } catch (error) {
    console.error('Unexpected error fetching templo:', error)
    return null
  }
}

export async function getAllTemplos(): Promise<Templo[]> {
  try {
    const { data, error } = await supabase
      .from('Templo')
      .select(`
        id,
        nombre,
        slug,
        descripcion,
        imagenes,
        precio_por_noche,
        capacidad
      `)
      .order('nombre')

    if (error) {
      console.error('Error fetching templos:', error.message)
      return []
    }

    if (!data || !Array.isArray(data)) {
      console.error('Invalid templos data:', data)
      return []
    }

    return data.map(templo => ({
      ...templo,
      imagenes: Array.isArray(templo.imagenes) ? templo.imagenes : [],
      precio_por_noche: Number(templo.precio_por_noche) || 0,
      capacidad: Number(templo.capacidad) || 1
    }))
  } catch (error) {
    console.error('Unexpected error fetching templos:', error)
    return []
  }
} 