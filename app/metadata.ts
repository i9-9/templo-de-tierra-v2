import { Metadata } from 'next';

const defaultTitle = 'Templo de Tierra - Espacios Sagrados para tu Bienestar';
const defaultDescription = 'Descubre nuestros templos sagrados, espacios diseñados para la meditación, el yoga y el bienestar. Reserva tu experiencia única en un entorno natural y tranquilo.';

export const defaultMetadata: Metadata = {
  title: defaultTitle,
  description: defaultDescription,
  keywords: ['templo', 'meditación', 'yoga', 'bienestar', 'retiro', 'espacio sagrado', 'reservas'],
  authors: [{ name: 'Templo de Tierra' }],
  creator: 'Templo de Tierra',
  publisher: 'Templo de Tierra',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://templodetierra.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_UY',
    url: '/',
    title: defaultTitle,
    description: defaultDescription,
    siteName: 'Templo de Tierra',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Templo de Tierra',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export function generateMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description?: string;
  path?: string;
} = {}): Metadata {
  const metadata = { ...defaultMetadata };

  if (title) {
    metadata.title = `${title} | Templo de Tierra`;
  }

  if (description) {
    metadata.description = description;
  }

  if (path) {
    metadata.alternates = {
      canonical: path,
    };
    metadata.openGraph = {
      ...metadata.openGraph,
      url: path,
    };
  }

  return metadata;
} 