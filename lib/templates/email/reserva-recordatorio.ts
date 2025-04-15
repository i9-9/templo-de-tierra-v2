import { baseTemplate } from './base';

interface ReservaRecordatorioProps {
  nombreUsuario: string;
  nombreTemplo: string;
  fechaInicio: string;
  fechaFin: string;
  diasRestantes: number;
  reservaId: string;
  logoCid: string;
}

export const reservaRecordatorioTemplate = ({
  nombreUsuario,
  nombreTemplo,
  fechaInicio,
  fechaFin,
  diasRestantes,
  reservaId,
  logoCid,
}: ReservaRecordatorioProps) => {
  const content = `
    <h2>Recordatorio de tu próxima reserva</h2>
    
    <p>Hola ${nombreUsuario},</p>
    
    <p>Tu reserva en ${nombreTemplo} está próxima a comenzar.</p>
    
    <div class="details-box">
      <h3>Detalles de tu reserva:</h3>
      <p>Fecha de inicio: ${fechaInicio}</p>
      <p>Fecha de fin: ${fechaFin}</p>
      <p>Días restantes: ${diasRestantes}</p>
    </div>
    
    <p>Te recomendamos revisar los detalles de tu reserva y preparar todo lo necesario para tu estadía.</p>
    
    <p>Puedes ver los detalles completos en tu <a href="${process.env.APP_URL}/reservas/${reservaId}" style="color: #6F4C21; font-weight: bold;">panel de usuario</a>.</p>
  `;

  return baseTemplate({
    content,
    logoCid,
  });
}; 