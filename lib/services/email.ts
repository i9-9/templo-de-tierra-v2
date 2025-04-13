import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const prisma = new PrismaClient();

type EmailType = 'confirmation' | 'cancellation' | 'update';

type ReservaWithRelations = {
  id: string;
  temploId: string;
  userId: string;
  fechaInicio: Date;
  fechaFin: Date;
  numeroHuespedes: number;
  estado: 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA' | 'COMPLETADA';
  precioTotal: number;
  metodoPago: 'TARJETA' | 'TRANSFERENCIA' | 'EFECTIVO';
  notas: string | null;
  createdAt: Date;
  updatedAt: Date;
  templo: {
    id: string;
    nombre: string;
    descripcion: string;
    capacidad: number;
    precio: number;
    imagen: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  user: {
    id: string;
    name: string | null;
    email: string;
    password: string;
    emailVerified: Date | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
};

export async function sendReservationEmail(
  reserva: ReservaWithRelations,
  type: EmailType
) {
  if (!reserva.user.email) {
    throw new Error('User email is required to send reservation email');
  }

  const subject = {
    confirmation: 'Confirmación de Reserva - Templo de Tierra',
    cancellation: 'Cancelación de Reserva - Templo de Tierra',
    update: 'Actualización de Reserva - Templo de Tierra'
  }[type];

  const message = {
    confirmation: 'Tu reserva ha sido confirmada exitosamente.',
    cancellation: 'Tu reserva ha sido cancelada.',
    update: 'Tu reserva ha sido actualizada.'
  }[type];

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">${subject}</h1>
      <p>${message}</p>
      
      <h2 style="color: #333; margin-top: 20px;">Detalles de la Reserva</h2>
      <ul style="list-style: none; padding: 0;">
        <li><strong>Templo:</strong> ${reserva.templo.nombre}</li>
        <li><strong>Fecha de Inicio:</strong> ${reserva.fechaInicio.toLocaleDateString()}</li>
        <li><strong>Fecha de Fin:</strong> ${reserva.fechaFin.toLocaleDateString()}</li>
        <li><strong>Número de Huéspedes:</strong> ${reserva.numeroHuespedes}</li>
        <li><strong>Precio Total:</strong> $${reserva.precioTotal}</li>
        <li><strong>Método de Pago:</strong> ${reserva.metodoPago}</li>
      </ul>
      
      <p style="margin-top: 20px;">
        Si tienes alguna pregunta, no dudes en contactarnos.
      </p>
    </div>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Templo de Tierra <reservas@templodetierraarg.com>',
      to: reserva.user.email,
      subject,
      html
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
} 