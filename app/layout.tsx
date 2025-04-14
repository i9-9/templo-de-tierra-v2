import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import Navbar from "./components/Navbar";
import { WebsiteJsonLd, OrganizationJsonLd } from "./components/JsonLd";
import { Providers } from "./providers";
import { defaultMetadata } from "@/app/metadata";
import SchemaOrg from "@/app/components/SchemaOrg";
import { validateEnv } from '@/lib/utils/env';

const inter = Inter({ subsets: ['latin'] });

// Validar variables de entorno al iniciar
validateEnv();

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="geo.region" content="UY" />
        <meta name="geo.placename" content="Uruguay" />
        <SchemaOrg type="Organization" />
      </head>
      <body className="min-h-screen bg-warm-sand text-earth-brown">
        <Providers>
          <Navbar />
          <main>
            {children}
          </main>
          <WebsiteJsonLd />
          <OrganizationJsonLd />
        </Providers>
      </body>
    </html>
  );
}
