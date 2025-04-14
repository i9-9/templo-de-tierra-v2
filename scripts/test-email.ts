import { enviarEmailReserva } from '../lib/services/email';

// Configurar variables de entorno manualmente
process.env.SMTP_HOST = 'smtp.gmail.com';
process.env.SMTP_PORT = '587';
process.env.SMTP_SECURE = 'false';
process.env.SMTP_USER = 'templodetierra.ashram@gmail.com';
process.env.SMTP_PASSWORD = 'seocybsvlzjirdsz';
process.env.SMTP_FROM = 'Templo de Tierra <templodetierra.ashram@gmail.com>';
process.env.APP_URL = 'http://localhost:3000';

async function main() {
  try {
    const emailData = {
      email: 'templodetierra.ashram@gmail.com',
      nombre: 'Juan Pérez',
      templo: 'Templo de la Montaña',
      fechaInicio: '15 de marzo de 2024',
      fechaFin: '20 de marzo de 2024',
      precioTotal: 1500,
      estado: 'confirmada' as const
    };

    console.log('Enviando correo de prueba...');
    console.log('Datos de la reserva:', emailData);
    
    await enviarEmailReserva(emailData);
    console.log('Correo enviado exitosamente!');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
}

main(); 