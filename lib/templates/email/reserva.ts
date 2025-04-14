import { baseTemplate } from './base';

interface ReservaTemplateProps {
  nombre: string;
  templo: string;
  fechaInicio: string;
  fechaFin: string;
  precioTotal: number;
  estado: 'confirmada' | 'cancelada';
  logoCid: string;
}

export const reservaTemplate = ({
  nombre,
  templo,
  fechaInicio,
  fechaFin,
  precioTotal,
  estado,
  logoCid
}: ReservaTemplateProps): string => {
  const titulo = estado === 'confirmada' 
    ? '¡Tu reserva ha sido confirmada!'
    : 'Tu reserva ha sido cancelada';
  
  const mensaje = estado === 'confirmada'
    ? `Hola ${nombre},<br><br>Tu reserva en ${templo} ha sido confirmada. A continuación encontrarás los detalles de tu reserva:`
    : `Hola ${nombre},<br><br>Tu reserva en ${templo} ha sido cancelada. Aquí están los detalles de la reserva cancelada:`;

  const contenido = `
    <h2 style="color: #6F4C21; margin-top: 0;">${titulo}</h2>
    <p>${mensaje}</p>
    
    <div class="details-box">
      <h3>Detalles de la reserva</h3>
      <p><strong>Templo:</strong> ${templo}</p>
      <p><strong>Fecha de inicio:</strong> ${fechaInicio}</p>
      <p><strong>Fecha de fin:</strong> ${fechaFin}</p>
      <p><strong>Precio total:</strong> $${precioTotal.toFixed(2)}</p>
      <p class="status ${estado}">
        Estado: ${estado === 'confirmada' ? 'Confirmada' : 'Cancelada'}
      </p>
    </div>

    ${estado === 'confirmada' 
      ? `<p>Puedes ver todos los detalles de tu reserva en tu <a href="https://templo-de-tierra.com/reservas" style="color: #6F4C21; font-weight: bold;">panel de reservas</a>.</p>`
      : ''
    }
    
    <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
  `;

  return baseTemplate({ content: contenido, logoCid });
}; 