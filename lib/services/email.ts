// Configurar variables de entorno
process.env.SMTP_HOST = 'smtp.gmail.com';
process.env.SMTP_PORT = '587';
process.env.SMTP_SECURE = 'false';
process.env.SMTP_USER = 'templodetierra.ashram@gmail.com';
process.env.SMTP_PASSWORD = 'seocybsvlzjirdsz';
process.env.SMTP_FROM = 'Templo de Tierra <templodetierra.ashram@gmail.com>';

import nodemailer from 'nodemailer';
import { reservaTemplate } from '../templates/email/reserva';
import fs from 'fs';
import path from 'path';

const requiredEnvVars = {
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_FROM: process.env.SMTP_FROM,
  SMTP_SECURE: process.env.SMTP_SECURE
};

const missingVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  throw new Error(`Missing SMTP configuration variables: ${missingVars.join(', ')}`);
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT!),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface ReservaEmailData {
  email: string;
  nombre: string;
  templo: string;
  fechaInicio: string;
  fechaFin: string;
  precioTotal: number;
  estado: 'confirmada' | 'cancelada';
}

export const enviarEmailReserva = async (data: ReservaEmailData) => {
  const { email, nombre, templo, fechaInicio, fechaFin, precioTotal, estado } = data;

  // Leer el logo como archivo adjunto
  const logoPath = path.join(process.cwd(), 'public', 'logo.png');
  const logoContent = fs.readFileSync(logoPath);
  const logoCid = 'logo@templo-de-tierra';

  const html = reservaTemplate({
    nombre,
    templo,
    fechaInicio,
    fechaFin,
    precioTotal,
    estado,
    logoCid
  });

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: estado === 'confirmada' ? '¡Tu reserva ha sido confirmada!' : 'Tu reserva ha sido cancelada',
    html,
    attachments: [{
      filename: 'logo.png',
      path: logoPath,
      cid: logoCid
    }]
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}; 