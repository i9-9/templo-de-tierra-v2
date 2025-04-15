import { baseTemplate } from './base';

interface ReservaCancelacionProps {
  nombreUsuario: string;
  nombreTemplo: string;
  fechaInicio: string;
  fechaFin: string;
  motivo?: string;
  logoCid: string;
}

export const reservaCancelacionTemplate = ({
  nombreUsuario,
  nombreTemplo,
  fechaInicio,
  fechaFin,
  motivo,
  logoCid,
}: ReservaCancelacionProps) => {
  const content = `
    <h2>Reserva Cancelada</h2>
    
    <p>Hola ${nombreUsuario},</p>
    
    <p>Tu reserva en ${nombreTemplo} ha sido cancelada.</p>
    
    <div class="details-box">
      <h3>Detalles de la reserva cancelada:</h3>
      <p>Fecha de inicio: ${fechaInicio}</p>
      <p>Fecha de fin: ${fechaFin}</p>
      ${motivo ? `<p>Motivo: ${motivo}</p>` : ''}
    </div>
    
    <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
  `;

  return baseTemplate({
    content,
    logoCid,
  });
}; 