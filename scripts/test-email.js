require('dotenv').config();
const nodemailer = require('nodemailer');
const { format } = require('date-fns');
const { es } = require('date-fns/locale');

// Crear fechas para la reserva
const hoy = new Date();
const dentroDeSiete = new Date();
dentroDeSiete.setDate(hoy.getDate() + 7);

// Formatear las fechas en español
const fechaInicio = format(hoy, 'dd/MM/yyyy', { locale: es });
const fechaFin = format(dentroDeSiete, 'dd/MM/yyyy', { locale: es });

// Configurar transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Crear contenido del email
const createEmailContent = (data) => {
  const { nombre, templo, fechaInicio, fechaFin, precioTotal, estado } = data;
  const title = estado === 'confirmada' ? '¡Tu reserva ha sido confirmada!' : 'Tu reserva ha sido cancelada';
  const message = estado === 'confirmada'
    ? `¡Hola ${nombre}! Tu reserva en ${templo} ha sido confirmada.`
    : `¡Hola ${nombre}! Tu reserva en ${templo} ha sido cancelada.`;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Templo de Tierra</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 20px auto; padding: 20px; background-color: white; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #eee; }
          .content { padding: 20px 0; }
          .details { margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-radius: 8px; }
          .footer { text-align: center; padding: 20px 0; border-top: 2px solid #eee; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="color: ${estado === 'confirmada' ? '#2ecc71' : '#e74c3c'}">${title}</h1>
          </div>
          <div class="content">
            <p style="font-size: 16px; line-height: 1.5; color: #333;">${message}</p>
            <div class="details">
              <h3 style="color: #2c3e50; margin-bottom: 15px;">Detalles de la Reserva</h3>
              <p><strong>Templo:</strong> ${templo}</p>
              <p><strong>Fecha de inicio:</strong> ${fechaInicio}</p>
              <p><strong>Fecha de fin:</strong> ${fechaFin}</p>
              <p><strong>Precio total:</strong> $${precioTotal.toFixed(2)}</p>
            </div>
            ${estado === 'confirmada' ? `
              <div style="text-align: center; margin-top: 20px;">
                <a href="/reservas" style="background-color: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Ver mis reservas
                </a>
              </div>
            ` : ''}
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Templo de Tierra. Todos los derechos reservados.</p>
            <p>Si tienes alguna pregunta, contáctanos a <a href="mailto:templodetierra.ashram@gmail.com">templodetierra.ashram@gmail.com</a></p>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Datos de prueba
const testData = {
  email: 'templodetierra.ashram@gmail.com',
  nombre: 'Usuario de Prueba',
  templo: 'Templo de Tierra',
  fechaInicio,
  fechaFin,
  precioTotal: 1000,
  estado: 'confirmada',
};

async function main() {
  try {
    console.log('Enviando correo de prueba...');
    console.log('Datos:', testData);

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: testData.email,
      subject: testData.estado === 'confirmada' ? '¡Tu reserva ha sido confirmada!' : 'Tu reserva ha sido cancelada',
      html: createEmailContent(testData),
    };

    await transporter.sendMail(mailOptions);
    console.log('Correo enviado exitosamente!');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
}

main(); 