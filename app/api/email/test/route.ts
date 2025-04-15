import { enviarEmailReserva } from '@/lib/services/email';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await enviarEmailReserva({
      email: 'templodetierra.ashram@gmail.com',
      nombre: 'Usuario de Prueba',
      templo: 'Templo del Sol',
      fechaInicio: '2024-03-20',
      fechaFin: '2024-03-25',
      precioTotal: 1000,
      estado: 'confirmada'
    });

    return NextResponse.json({ message: 'Email de prueba enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar email de prueba:', error);
    return NextResponse.json(
      { error: 'Error al enviar email de prueba' },
      { status: 500 }
    );
  }
} 