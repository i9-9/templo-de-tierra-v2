import { MetadataRoute } from 'next';
import { getAllTemplos } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://templodetierra.com';
  const templos = getAllTemplos();

  const routes = [
    '',
    '/templos',
    '/experiencias',
    '/contacto',
    '/auth/signin',
    '/auth/register',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const temploRoutes = templos.map((templo) => ({
    url: `${baseUrl}/templos/${templo.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...routes, ...temploRoutes];
} 