var baseTemplate = require('./base').baseTemplate;
var reservaTemplate = function (_a) {
    var nombre = _a.nombre, templo = _a.templo, fechaInicio = _a.fechaInicio, fechaFin = _a.fechaFin, precioTotal = _a.precioTotal, estado = _a.estado;
    var title = estado === 'confirmada'
        ? '¡Tu reserva ha sido confirmada!'
        : 'Tu reserva ha sido cancelada';
    var message = estado === 'confirmada'
        ? "\u00A1Hola ".concat(nombre, "! Tu reserva en ").concat(templo, " ha sido confirmada.")
        : "\u00A1Hola ".concat(nombre, "! Tu reserva en ").concat(templo, " ha sido cancelada.");
    var content = "\n    <div style=\"background-color: #f9f9f9; padding: 20px; border-radius: 10px; margin: 20px 0;\">\n      <h2 style=\"color: ".concat(estado === 'confirmada' ? '#2ecc71' : '#e74c3c', "; margin-bottom: 20px;\">\n        ").concat(title, "\n      </h2>\n      <p style=\"font-size: 16px; line-height: 1.5; color: #333;\">").concat(message, "</p>\n      <div style=\"margin: 20px 0; padding: 15px; background-color: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);\">\n        <h3 style=\"color: #2c3e50; margin-bottom: 15px;\">Detalles de la Reserva</h3>\n        <p><strong>Templo:</strong> ").concat(templo, "</p>\n        <p><strong>Fecha de inicio:</strong> ").concat(fechaInicio, "</p>\n        <p><strong>Fecha de fin:</strong> ").concat(fechaFin, "</p>\n        <p><strong>Precio total:</strong> $").concat(precioTotal.toFixed(2), "</p>\n      </div>\n      ").concat(estado === 'confirmada' ? "\n        <div style=\"margin-top: 20px;\">\n          <a href=\"/reservas\" style=\"background-color: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;\">\n            Ver mis reservas\n          </a>\n        </div>\n      " : '', "\n    </div>\n  ");
    return baseTemplate(content);
};
module.exports = { reservaTemplate: reservaTemplate };
