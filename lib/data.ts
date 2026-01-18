// Tipos
export interface TemploData {
  id: string;
  nombre: string;
  slug: string;
  imagenPrincipal: string;
  imagenes: string[];
  capacidad: string;
  camas: string;
  amenities: string[];
  descripcionCorta: string;
  descripcion: string;
}

export interface ExperienciaData {
  id: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  imagen: string;
  disponibilidad: string;
}

// Data imports
import { templos as templosList, experiencias as experienciasList } from './data.js';

// Re-export data
export const templos: TemploData[] = templosList as any;
export const experiencias: ExperienciaData[] = experienciasList as any;

// Helper functions
export function getTemploBySlug(slug: string): TemploData | undefined {
  return templos.find(templo => templo.slug === slug);
}

export function getAllTemplos(): TemploData[] {
  return templos;
}

export function getAllExperiencias(): ExperienciaData[] {
  return experiencias;
}