import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Templo de Tierra | Alojamientos Sostenibles',
    short_name: 'Templo de Tierra',
    description: 'Alojamientos únicos en bioconstrucción, diseñados en armonía con la naturaleza en Uruguay',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF5E8',
    theme_color: '#6F4C21',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
