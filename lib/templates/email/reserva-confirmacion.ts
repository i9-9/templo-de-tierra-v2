import { baseTemplate } from './base';

interface ReservaConfirmacionProps {
  nombreUsuario: string;
  nombreTemplo: string;
  fechaInicio: string;
  fechaFin: string;
  precioTotal: number;
  reservaId: string;
  logoCid: string;
}

export const reservaConfirmacionTemplate = ({
  nombreUsuario,
  nombreTemplo,
  fechaInicio,
  fechaFin,
  precioTotal,
  reservaId,
  logoCid,
}: ReservaConfirmacionProps) => {
  const content = `
    <h2>¡Reserva Confirmada!</h2>
    
    <p>Hola ${nombreUsuario},</p>
    
    <p>Tu reserva en ${nombreTemplo} ha sido confirmada exitosamente.</p>
    
    <div class="details-box">
      <h3>Detalles de tu reserva:</h3>
      <p>Fecha de inicio: ${fechaInicio}</p>
      <p>Fecha de fin: ${fechaFin}</p>
      <p>Precio total: $${precioTotal.toFixed(2)}</p>
    </div>
    
    <p>Puedes ver los detalles de tu reserva en tu <a href="${process.env.APP_URL}/reservas/${reservaId}" style="color: #6F4C21; font-weight: bold;">panel de usuario</a>.</p>
  `;

  return baseTemplate({
    content,
    logoCid,
  });
}; 