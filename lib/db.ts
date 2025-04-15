import { supabase } from './supabase'
import { Templo, Reserva, User, Favorito, EstadoReserva, MetodoPago } from '@/lib/models'

// Funciones para Templos
export async function getAllTemplos(): Promise<Templo[]> {
  const { data, error } = await supabase
    .from('templos')
    .select('*')
  
  if (error) throw error
  return data || []
}

export async function getTemploBySlug(slug: string): Promise<Templo | null> {
  const { data, error } = await supabase
    .from('templos')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) throw error
  return data
}

// Funciones para Reservas
export async function createReserva(reserva: Omit<Reserva, 'id' | 'createdAt' | 'updatedAt'>): Promise<Reserva> {
  const { data, error } = await supabase
    .from('reservas')
    .insert(reserva)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function getReservasByUser(userId: string): Promise<Reserva[]> {
  const { data, error } = await supabase
    .from('reservas')
    .select('*, templo:templos(*)')
    .eq('userId', userId)
  
  if (error) throw error
  return data || []
}

// Funciones para Favoritos
export async function addFavorito(temploId: string, userId: string): Promise<Favorito> {
  const { data, error } = await supabase
    .from('favoritos')
    .insert({ temploId, userId })
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function removeFavorito(temploId: string, userId: string): Promise<void> {
  const { error } = await supabase
    .from('favoritos')
    .delete()
    .eq('temploId', temploId)
    .eq('userId', userId)
  
  if (error) throw error
}

export async function getFavoritosByUser(userId: string): Promise<Favorito[]> {
  const { data, error } = await supabase
    .from('favoritos')
    .select('*, templo:templos(*)')
    .eq('userId', userId)
  
  if (error) throw error
  return data || []
}

// Funciones para Usuarios
export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
} 