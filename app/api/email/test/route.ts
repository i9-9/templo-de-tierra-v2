import { enviarEmailReserva } from '@/lib/services/email';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await enviarEmailReserva(
      'templodetierra.ashram@gmail.com', // Email real de destino
      'confirmacion',
      {
        nombreUsuario: 'Usuario de Prueba',
        nombreTemplo: 'Templo del Sol',
        fechaInicio: '2024-03-20',
        fechaFin: '2024-03-25',
        precioTotal: 1000,
        reservaId: 'test-123'
      }
    );

    return NextResponse.json({ message: 'Email de prueba enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar email de prueba:', error);
    return NextResponse.json(
      { error: 'Error al enviar email de prueba' },
      { status: 500 }
    );
  }
} 