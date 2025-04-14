import { baseEmailTemplate } from './base';

interface ReservaConfirmacionProps {
  nombreUsuario: string;
  nombreTemplo: string;
  fechaInicio: string;
  fechaFin: string;
  precioTotal: number;
  reservaId: string;
}

export const reservaConfirmacionTemplate = ({
  nombreUsuario,
  nombreTemplo,
  fechaInicio,
  fechaFin,
  precioTotal,
  reservaId,
}: ReservaConfirmacionProps) => {
  const title = '¡Reserva Confirmada!';
  const content = `
    Hola ${nombreUsuario},
    
    Tu reserva en ${nombreTemplo} ha sido confirmada exitosamente.
    
    Detalles de tu reserva:
    - Fecha de inicio: ${fechaInicio}
    - Fecha de fin: ${fechaFin}
    - Precio total: $${precioTotal}
    
    Puedes ver los detalles de tu reserva en tu panel de usuario.
  `;

  return baseEmailTemplate({
    title,
    content,
    buttonText: 'Ver mi reserva',
    buttonUrl: `${process.env.APP_URL}/reservas/${reservaId}`,
  });
}; 