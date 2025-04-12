import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Reservas | Templo de Tierra",
  description: "Reserva tu estadía en nuestros templos de bioconstrucción. Vive una experiencia única en armonía con la naturaleza.",
};

export default function ReservasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 