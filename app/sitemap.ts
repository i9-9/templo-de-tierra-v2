import { MetadataRoute } from 'next';
import { getAllTemplos } from '@/lib/data';

const baseUrl = 'https://templodetierrauy.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const templos = getAllTemplos();

  // URLs estáticas
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/templos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/experiencias`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ] as MetadataRoute.Sitemap;

  // URLs dinámicas para los templos
  const temploRoutes = templos.map((templo) => ({
    url: `${baseUrl}/templos/${templo.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  })) as MetadataRoute.Sitemap;

  return [...staticRoutes, ...temploRoutes];
} 