const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Crear admin user
  const hashedPassword = await hash('admin123', 12);
  await prisma.user.upsert({
    where: { email: 'admin@templodetierra.com' },
    update: {},
    create: {
      email: 'admin@templodetierra.com',
      name: 'Admin',
      password: hashedPassword,
    },
  });

  // Crear templos de prueba
  const templos = [
    {
      id: 'durga',
      nombre: 'Templo Durga',
      slug: 'durga',
      descripcion: 'El primer sector en el que iniciamos a trabajar, donde materializamos la primera arcada, una gran influencia de India, que inspiró en el diseño y creación de toda la obra. Este templo lleva el nombre de una diosa hindú femenina que simboliza la fuerza, la valentía y la protección. Representa la capacidad de superar los desafíos, renacer y transformarse. Es ideal para 2 personas, con una amplia vista al mar. Tiene una cama de 2 plazas y cuenta con la posibilidad de agregar otra individual si es necesario; con un baño completo y cocina kitchenette integrada.',
      descripcionCorta: 'Templo ideal para 2 personas con vista al mar',
      capacidad: 2,
      precio: 120.0,
      imagenPrincipal: '/durga/DSC00841.png',
      imagenes: ['/durga/DSC00841.png', '/durga/DSC00846.png', '/durga/DSC00805-2.png'],
      amenities: ['WiFi', 'Cocina', 'Baño privado'],
      camas: ['1 cama de 2 plazas', '1 individual opcional'],
    },
    {
      id: 'rosa',
      nombre: 'Templo Rosa',
      slug: 'rosa',
      descripcion: 'Este templo por sus colores y calidez, simboliza el amor incondicional, el amor propio. Es un espacio ideal para venir en pareja o solo/a, que te invita a conectar con la creatividad e inspiración, ya sea a través del arte plástico, la música, escritura o cualquier forma de expresión. Cuenta con una cama de 2 plazas con una privilegiada vista, pequeño living y baño privado.',
      descripcionCorta: 'Templo ideal para parejas o solos/as',
      capacidad: 2,
      precio: 200.0,
      imagenPrincipal: '/rosa/IMG_2885.png',
      imagenes: ['/rosa/IMG_2885.png'],
      amenities: ['WiFi', 'Baño privado', 'Vista al mar'],
      camas: ['1 cama de 2 plazas'],
    },
    {
      id: 'templo-del-mar',
      nombre: 'Templo del Mar',
      slug: 'templo-del-mar',
      descripcion: 'Templo de inspiración divina, que simboliza la conexión con el cielo, el mar y la tierra. Está ubicado en planta alta y cuenta con acceso por la icónica escalera del lugar, que ofrece una experiencia con una vista panorámica de la zona y con una vista infinita hacia el mar, donde amanece. Es de grandes dimensiones, contando con la posibilidad de hospedar hasta 4 personas. Contiene una cama de 2 plazas, más 2 individuales, con baño y cocina kitchenette integrada. Además, tiene salida a 2 balcones, que ofrecen diferentes vistas de la zona, donde se puede ver el amanecer y atardecer.',
      descripcionCorta: 'Templo con vista panorámica al mar',
      capacidad: 4,
      precio: 250.0,
      imagenPrincipal: '/delmar/DSC02707.png',
      imagenes: ['/delmar/DSC02707.png'],
      amenities: ['WiFi', 'Cocina', 'Baño privado', '2 balcones'],
      camas: ['1 cama de 2 plazas', '2 camas individuales'],
    },
    {
      id: 'shanti',
      nombre: 'Templo Shanti',
      slug: 'shanti',
      descripcion: 'En alusión a la paz interior y tranquilidad, este templo lleno de detalles, texturas y cálidas luces entrando por los vidrios y sus ventanas orgánicas, ofrece un espacio ideal para la relajación y la calma. Cuenta con un rincón acogedor, ideal para yoga, meditación o cualquier actividad para la conexión con uno mismo. Tiene capacidad para alojar cuatro personas o más si es necesario. Cuenta con dos camas de doble plaza, baño privado y cocina en planta baja. Su acceso, es por otra de las icónicas escaleras del lugar, que ofrece una experiencia visual e inmersiva, donde proponemos ir ascendiendo despacio para ir observando cada detalle.',
      descripcionCorta: 'Templo ideal para relajación y meditación',
      capacidad: 4,
      precio: 300.0,
      imagenPrincipal: '/shanti/DSC02685.png',
      imagenes: ['/shanti/DSC02685.png'],
      amenities: ['WiFi', 'Cocina', 'Baño privado', 'Espacio para yoga'],
      camas: ['2 camas de 2 plazas'],
    }
  ];

  // Primero, eliminar todos los templos existentes
  await prisma.templo.deleteMany();

  // Luego, crear los nuevos templos
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