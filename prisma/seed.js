const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Crear templos de prueba
  const templos = [
    {
      nombre: 'Templo del Sol',
      descripcion: 'Un espacio sagrado construido con técnicas ancestrales, perfecto para retiros y meditación.',
      capacidad: 4,
      precio: 150.0,
      imagen: '/templos/templo-del-sol.jpg',
    },
    {
      nombre: 'Templo de la Luna',
      descripcion: 'Un refugio tranquilo rodeado de naturaleza, ideal para prácticas de yoga y contemplación.',
      capacidad: 2,
      precio: 120.0,
      imagen: '/templos/templo-de-la-luna.jpg',
    },
    {
      nombre: 'Templo del Bosque',
      descripcion: 'Una cabaña ecológica integrada en el bosque, perfecta para reconectar con la naturaleza.',
      capacidad: 6,
      precio: 200.0,
      imagen: '/templos/templo-del-bosque.jpg',
    },
  ];

  for (const templo of templos) {
    await prisma.templo.create({
      data: templo,
    });
  }

  console.log('Base de datos poblada con éxito');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 