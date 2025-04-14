import { baseEmailTemplate } from './base';

interface ReservaCancelacionProps {
  nombreUsuario: string;
  nombreTemplo: string;
  fechaInicio: string;
  fechaFin: string;
  motivo?: string;
}

export const reservaCancelacionTemplate = ({
  nombreUsuario,
  nombreTemplo,
  fechaInicio,
  fechaFin,
  motivo,
}: ReservaCancelacionProps) => {
  const title = 'Reserva Cancelada';
  const content = `
    Hola ${nombreUsuario},
    
    Tu reserva en ${nombreTemplo} ha sido cancelada.
    
    Detalles de la reserva cancelada:
    - Fecha de inicio: ${fechaInicio}
    - Fecha de fin: ${fechaFin}
    ${motivo ? `- Motivo: ${motivo}` : ''}
    
    Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.
  `;

  return baseEmailTemplate({
    title,
    content,
    buttonText: 'Ver más reservas',
    buttonUrl: `${process.env.APP_URL}/reservas`,
  });
}; 