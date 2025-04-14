import { baseEmailTemplate } from './base';

interface ReservaRecordatorioProps {
  nombreUsuario: string;
  nombreTemplo: string;
  fechaInicio: string;
  fechaFin: string;
  diasRestantes: number;
  reservaId: string;
}

export const reservaRecordatorioTemplate = ({
  nombreUsuario,
  nombreTemplo,
  fechaInicio,
  fechaFin,
  diasRestantes,
  reservaId,
}: ReservaRecordatorioProps) => {
  const title = 'Recordatorio de tu próxima reserva';
  const content = `
    Hola ${nombreUsuario},
    
    Tu reserva en ${nombreTemplo} está próxima a comenzar.
    
    Detalles de tu reserva:
    - Fecha de inicio: ${fechaInicio}
    - Fecha de fin: ${fechaFin}
    - Días restantes: ${diasRestantes}
    
    Te recomendamos revisar los detalles de tu reserva y preparar todo lo necesario para tu estadía.
  `;

  return baseEmailTemplate({
    title,
    content,
    buttonText: 'Ver detalles de la reserva',
    buttonUrl: `${process.env.APP_URL}/reservas/${reservaId}`,
  });
}; 