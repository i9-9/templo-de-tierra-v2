import { createTransport } from 'nodemailer';

if (!process.env.SMTP_USER) throw new Error('SMTP_USER is not defined');
if (!process.env.SMTP_HOST) throw new Error('SMTP_HOST is not defined');
if (!process.env.SMTP_PORT) throw new Error('SMTP_PORT is not defined');
if (!process.env.SMTP_PASSWORD) throw new Error('SMTP_PASSWORD is not defined');
if (!process.env.SMTP_FROM_NAME) throw new Error('SMTP_FROM_NAME is not defined');

export const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });

    console.log('Message sent: %s', info.messageId);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
} 