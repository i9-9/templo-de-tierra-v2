import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, email, message, recaptchaToken } = await request.json();
    console.log('Datos recibidos:', { name, email, message });

    // Verificar reCAPTCHA
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    });

    const recaptchaData = await recaptchaResponse.json();
    console.log('Respuesta reCAPTCHA:', recaptchaData);

    if (!recaptchaData.success || recaptchaData.score < 0.7) {
      console.error('Error de verificación reCAPTCHA:', recaptchaData);
      return NextResponse.json(
        { error: 'Error de verificación de seguridad. Por favor, intenta nuevamente.' },
        { status: 400 }
      );
    }

    // Enviar email
    const { data, error } = await resend.emails.send({
      from: 'Templo de Tierra <templodetierra.ashram@gmail.com>',
      to: ['yvan.vrs@gmail.com'],
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error('Error al enviar email:', error);
      return NextResponse.json(
        { error: `Error al enviar el email: ${error.message}` },
        { status: 500 }
      );
    }

    console.log('Email enviado con éxito:', data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error interno del servidor:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 