'use client';

import Script from 'next/script';
import { Templo } from '@prisma/client';

interface SchemaOrgProps {
  templo?: Templo;
  type?: 'WebSite' | 'Organization' | 'Place';
}

export default function SchemaOrg({ templo, type = 'WebSite' }: SchemaOrgProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://templodetierra.com';

  const getSchema = () => {
    switch (type) {
      case 'Place':
        if (!templo) return null;
        return {
          '@context': 'https://schema.org',
          '@type': 'Place',
          name: templo.nombre,
          description: templo.descripcion,
          image: templo.imagenes[0],
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'UY',
          },
          amenityFeature: templo.amenities.map((amenidad: string) => ({
            '@type': 'LocationFeatureSpecification',
            name: amenidad,
          })),
          maximumAttendeeCapacity: templo.capacidad,
          priceRange: '$$$',
        };
      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Templo de Tierra',
          url: baseUrl,
          logo: `${baseUrl}/logo/SVG/Asset 1.svg`,
          sameAs: [
            'https://www.instagram.com/templodetierra',
            'https://www.facebook.com/templodetierra',
          ],
        };
      default:
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Templo de Tierra',
          url: baseUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${baseUrl}/templos?search={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        };
    }
  };

  const schema = getSchema();
  if (!schema) return null;

  return (
    <Script
      id="schema-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
} 