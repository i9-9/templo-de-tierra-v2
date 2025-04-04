interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function TemploJsonLd({ 
  name, 
  description, 
  images, 
  priceCurrency = "ARS",
  address,
  capacity
}: { 
  name: string; 
  description: string; 
  images: string[];
  priceCurrency?: string;
  address?: string;
  capacity?: string; 
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": name,
    "description": description,
    "image": images,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Uruguay",
      "addressLocality": address || "Uruguay"
    },
    "priceRange": "$$",
    "currenciesAccepted": priceCurrency,
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Capacidad",
        "value": capacity
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Construcción Natural",
        "value": "Bioconstrucción con tierra y materiales naturales"
      }
    ]
  };

  return <JsonLd data={jsonLd} />;
}

export function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://templodetierraarg.com/",
    "name": "Templo de Tierra",
    "description": "Alojamientos únicos en bioconstrucción, diseñados en armonía con la naturaleza.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://templodetierraarg.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return <JsonLd data={jsonLd} />;
}

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Templo de Tierra",
    "url": "https://templodetierraarg.com",
    "logo": "https://templodetierraarg.com/logo/SVG/Asset 1.svg",
    "sameAs": [
      "https://www.instagram.com/templodetierraarg/",
      "https://www.facebook.com/templodetierraarg/"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+598-123-456-7890",
      "contactType": "customer service",
      "email": "info@templodetierrauy.com",
      "availableLanguage": ["Spanish", "English"]
    }
  };

  return <JsonLd data={jsonLd} />;
} 