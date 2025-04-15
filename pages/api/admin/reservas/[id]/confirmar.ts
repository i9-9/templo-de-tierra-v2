import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { enviarEmailReserva } from '@/lib/services/email';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verificar que el usuario es admin
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user || session.user.email !== 'admin@templodetierra.com') {
      return res.status(401).json({ error: 'No autorizado' });
    }

    const { id } = req.query;

    // Actualizar el estado de la reserva
    const reserva = await prisma.reserva.update({
      where: { id: id as string },
      data: { estado: 'CONFIRMADA' },
      include: {
        templo: true,
        user: true,
      },
    });

    // Verificar que el usuario tiene un email antes de enviar la notificación
    if (reserva.user.email) {
      // Enviar email de confirmación al usuario
      await enviarEmailReserva({
        email: reserva.user.email,
        nombre: reserva.user.name || 'Usuario',
        templo: reserva.templo.nombre,
        fechaInicio: reserva.fechaInicio.toISOString(),
        fechaFin: reserva.fechaFin.toISOString(),
        precioTotal: Number(reserva.precioTotal),
        estado: 'confirmada'
      });
    }

    // Redirigir al usuario a la página de reservas
    res.redirect(303, '/admin/reservas');
  } catch (error) {
    console.error('Error al confirmar la reserva:', error);
    res.status(500).json({ error: 'Error al confirmar la reserva' });
  }
} 