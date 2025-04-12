import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type ReservaWithRelations = Awaited<ReturnType<PrismaClient['reserva']['findUnique']>> & {
  templo: {
    nombre: string;
  };
  user: {
    email: string;
  } | null;
};

type EmailType = 'confirmation' | 'cancellation' | 'update';

export async function sendReservationEmail(
  reserva: ReservaWithRelations,
  type: EmailType
) {
  const subject = {
    confirmation: 'Confirmación de Reserva',
    cancellation: 'Cancelación de Reserva',
    update: 'Actualización de Reserva'
  }[type];

  const message = {
    confirmation: 'Tu reserva ha sido confirmada exitosamente.',
    cancellation: 'Tu reserva ha sido cancelada.',
    update: 'Tu reserva ha sido actualizada.'
  }[type];

  const html = `
    <h1>${subject}</h1>
    <p>${message}</p>
    <h2>Detalles de la Reserva:</h2>
    <ul>
      <li>Templo: ${reserva.templo.nombre}</li>
      <li>Fecha de Inicio: ${reserva.fechaInicio.toLocaleDateString()}</li>
      <li>Fecha de Fin: ${reserva.fechaFin.toLocaleDateString()}</li>
      <li>Número de Huéspedes: ${reserva.numeroHuespedes}</li>
      <li>Precio Total: $${reserva.precioTotal}</li>
      <li>Método de Pago: ${reserva.metodoPago}</li>
    </ul>
  `;

  if (!reserva.user?.email) {
    throw new Error('No email address found for the reservation');
  }

  await resend.emails.send({
    from: 'Templo de Tierra <noreply@templo-de-tierra.com>',
    to: reserva.user.email,
    subject,
    html
  });
} 