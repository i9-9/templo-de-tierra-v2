import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { WebsiteJsonLd, OrganizationJsonLd } from "./components/JsonLd";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Templo de Tierra | Alojamientos Sostenibles en Bioconstrucción",
    template: "%s | Templo de Tierra"
  },
  description: "Alojamientos únicos en bioconstrucción, diseñados en armonía con la naturaleza. Una experiencia sostenible en Uruguay.",
  keywords: ["bioconstrucción", "alojamiento sostenible", "arquitectura natural", "ecoturismo", "Uruguay", "construcción con tierra", "turismo consciente"],
  authors: [{ name: "Templo de Tierra" }],
  creator: "Templo de Tierra",
  publisher: "Templo de Tierra",
  robots: "index, follow",
  alternates: {
    canonical: "https://templodetierraarg.com"
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://templodetierraarg.com",
    title: "Templo de Tierra | Alojamientos Sostenibles en Bioconstrucción",
    description: "Alojamientos únicos en bioconstrucción, diseñados en armonía con la naturaleza. Una experiencia sostenible en Uruguay.",
    siteName: "Templo de Tierra",
    images: [
      {
        url: "/tdt/DSC00678.png",
        width: 1200,
        height: 630,
        alt: "Templo de Tierra - Alojamientos en bioconstrucción"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Templo de Tierra | Alojamientos Sostenibles en Bioconstrucción",
    description: "Alojamientos únicos en bioconstrucción, diseñados en armonía con la naturaleza. Una experiencia sostenible en Uruguay.",
    images: ["/tdt/DSC00678.png"]
  }
};

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
      </head>
      <body className={inter.className}>
        <Navbar />
        <div className="mx-[30px]">
          {children}
        </div>
        <WebsiteJsonLd />
        <OrganizationJsonLd />
      </body>
    </html>
  );
}
