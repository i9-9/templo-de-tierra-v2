// Tipos para data.js
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
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: string;
  incluye: string[];
  imagen: string;
}