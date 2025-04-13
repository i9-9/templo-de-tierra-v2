import { Prisma } from '@prisma/client';

type TemploData = {
  nombre: string;
  slug: string;
  imagenPrincipal: string;
  imagenes: string[];
  descripcion: string;
  descripcionCorta: string;
  capacidad: number;
  precio: number;
  amenities: string[];
  camas: string;
};

type ExperienciaData = {
  titulo: string;
  subtitulo: string;
  descripcion: string;
  imagen: string;
  disponibilidad: string;
};

export const templos: TemploData[] = [
  {
    nombre: 'Templo Durga',
    slug: 'templo-durga',
    imagenPrincipal: '/images/templos/durga.jpg',
    imagenes: [
      '/images/templos/durga-1.jpg',
      '/images/templos/durga-2.jpg',
      '/images/templos/durga-3.jpg'
    ],
    descripcion: 'El Templo Durga es un espacio sagrado diseñado para la transformación y el poder personal. Su arquitectura única y su energía especial lo convierten en el lugar perfecto para retiros espirituales y encuentros íntimos.',
    descripcionCorta: 'Un espacio sagrado para la transformación y el poder personal.',
    capacidad: 2,
    precio: 120.0,
    amenities: ['WiFi', 'Cocina equipada', 'Baño privado', 'Terraza'],
    camas: '1 cama matrimonial'
  },
  {
    nombre: 'Templo Rosa',
    slug: 'templo-rosa',
    imagenPrincipal: '/images/templos/rosa.jpg',
    imagenes: [
      '/images/templos/rosa-1.jpg',
      '/images/templos/rosa-2.jpg',
      '/images/templos/rosa-3.jpg'
    ],
    descripcion: 'El Templo Rosa es un santuario dedicado al amor incondicional y la creatividad. Su diseño inspirado en el corazón y su atmósfera acogedora lo hacen ideal para parejas y artistas.',
    descripcionCorta: 'Un santuario dedicado al amor incondicional y la creatividad.',
    capacidad: 2,
    precio: 200.0,
    amenities: ['WiFi', 'Cocina equipada', 'Baño privado', 'Jardín'],
    camas: '1 cama matrimonial'
  },
  {
    nombre: 'Templo del Mar',
    slug: 'templo-del-mar',
    imagenPrincipal: '/images/templos/mar.jpg',
    imagenes: [
      '/images/templos/mar-1.jpg',
      '/images/templos/mar-2.jpg',
      '/images/templos/mar-3.jpg'
    ],
    descripcion: 'El Templo del Mar es un espacio inspirado en la energía del océano, diseñado para la conexión con la naturaleza y la meditación. Sus vistas panorámicas y su diseño fluido crean una experiencia única.',
    descripcionCorta: 'Un espacio inspirado en la energía del océano y la conexión con la naturaleza.',
    capacidad: 4,
    precio: 250.0,
    amenities: ['WiFi', 'Cocina equipada', 'Baño privado', 'Terraza con vista al mar'],
    camas: '2 camas matrimoniales'
  },
  {
    nombre: 'Templo Shanti',
    slug: 'templo-shanti',
    imagenPrincipal: '/images/templos/shanti.jpg',
    imagenes: [
      '/images/templos/shanti-1.jpg',
      '/images/templos/shanti-2.jpg',
      '/images/templos/shanti-3.jpg'
    ],
    descripcion: 'El Templo Shanti es un espacio diseñado para la paz y la tranquilidad. Su arquitectura minimalista y su ubicación privilegiada lo convierten en el lugar perfecto para retiros de yoga y meditación.',
    descripcionCorta: 'Un espacio diseñado para la paz y la tranquilidad.',
    capacidad: 4,
    precio: 300.0,
    amenities: ['WiFi', 'Cocina equipada', 'Baño privado', 'Sala de meditación'],
    camas: '2 camas matrimoniales'
  }
];

export const experiencias: ExperienciaData[] = [
  {
    titulo: 'Retiro de Yoga',
    subtitulo: 'Conecta con tu ser interior',
    descripcion: 'Un retiro transformador de yoga y meditación en un entorno natural único.',
    imagen: '/images/experiencias/yoga.jpg',
    disponibilidad: 'Todo el año'
  },
  {
    titulo: 'Taller de Cerámica',
    subtitulo: 'Expresa tu creatividad',
    descripcion: 'Aprende el arte de la cerámica en un ambiente inspirador.',
    imagen: '/images/experiencias/ceramica.jpg',
    disponibilidad: 'Fines de semana'
  }
];

export function getTemploBySlug(slug: string) {
  return templos.find(templo => templo.slug === slug);
}

export function getAllTemplos() {
  return templos;
}

export function getAllExperiencias() {
  return experiencias;
} 