const templos = [
  {
    id: 'durga',
    nombre: 'Templo Durga',
    slug: 'durga',
    imagenPrincipal: '/images/templos/durga/durga-exterior-vista-mar.png',
    imagenes: [
      '/images/templos/durga/durga-exterior-vista-mar.png',
      '/images/templos/durga/durga-interior-principal.png',
      '/images/templos/durga/durga-detalle-arquitectura.png',
      '/images/templos/durga/durga-galeria-01.png',
      '/images/templos/durga/durga-galeria-02.png',
      '/images/templos/durga/durga-galeria-03.png',
      '/images/templos/durga/durga-galeria-04.png',
      '/images/templos/durga/durga-galeria-05.png',
      '/images/templos/durga/durga-galeria-06.png',
      '/images/templos/durga/durga-galeria-07.png',
      '/images/templos/durga/durga-galeria-08.png'
    ],
    capacidad: '2 personas',
    camas: '1 cama de 2 plazas (posibilidad de agregar 1 individual)',
    amenities: ['Baño completo', 'Cocina kitchenette integrada', 'Vista al mar'],
    descripcionCorta: 'El primer sector en el que iniciamos a trabajar, con gran influencia de India, ideal para 2 personas con vista al mar.',
    descripcion: 'El primer sector en el que iniciamos a trabajar, donde materializamos la primera arcada, una gran influencia de India, que inspiró en el diseño y creación de toda la obra. Este templo lleva el nombre de una diosa hindú femenina que simboliza la fuerza, la valentía y la protección. Representa la capacidad de superar los desafíos, renacer y transformarse. Es ideal para 2 personas, con una amplia vista al mar. Tiene una cama de 2 plazas y cuenta con la posibilidad de agregar otra individual si es necesario; con un baño completo y cocina kitchenette integrada.'
  },
  {
    id: 'jaipur',
    nombre: 'Templo Jaipur',
    slug: 'jaipur',
    imagenPrincipal: '/images/templos/jaipur/jaipur-exterior-principal.jpg',
    imagenes: [
      '/images/templos/jaipur/jaipur-exterior-principal.jpg',
      '/images/templos/jaipur/jaipur-interior-principal.jpg',
      '/images/templos/jaipur/jaipur-detalle-arquitectura.jpg',
      '/images/templos/jaipur/jaipur-galeria-01.jpg',
      '/images/templos/jaipur/jaipur-galeria-02.jpg',
      '/images/templos/jaipur/jaipur-galeria-03.jpg'
    ],
    capacidad: '2 personas',
    camas: '1 cama de 2 plazas (posibilidad de agregar 1 individual)',
    amenities: ['Baño privado', 'Cocina kitchenette integrada'],
    descripcionCorta: 'Con gran impronta mística, de conexión con la espiritualidad y la introspección, ideal para 2 personas.',
    descripcion: 'Como dato de su proceso de construcción, podemos contar que inicialmente era un ambiente integrado a su templo vecino, Durga. Al que luego se decidió dividirlo y dar lugar a esta nueva habitación. Su nombre proviene de una ciudad de India, con una gran impronta mística, de conexión con la espiritualidad y la introspección. Buscamos simbolizar la creatividad, la inspiración y la expresión artística. Es ideal para 2 personas, contando con una cama de 2 plazas, y la posibilidad de agregar otra individual si es necesario. Con baño privado y cocina kitchenette integrada.'
  },
  {
    id: 'rosa',
    nombre: 'Templo Rosa',
    slug: 'rosa',
    imagenPrincipal: '/images/templos/rosa/rosa-exterior-principal.png',
    imagenes: [
      '/images/templos/rosa/rosa-exterior-principal.png',
      '/images/templos/rosa/rosa-interior-principal.png',
      '/images/templos/rosa/rosa-detalle-arquitectura.png',
      '/images/templos/rosa/rosa-galeria-01.png'
    ],
    capacidad: '2 personas',
    camas: '1 cama de 2 plazas',
    amenities: ['Baño privado', 'Pequeño living', 'Vista privilegiada'],
    descripcionCorta: 'Un espacio que simboliza el amor incondicional, ideal para venir en pareja o solo/a, con vista privilegiada.',
    descripcion: 'Este templo por sus colores y calidez, simboliza el amor incondicional, el amor propio. Es un espacio ideal para venir en pareja o solo/a, que te invita a conectar con la creatividad e inspiración, ya sea a través del arte plástico, la música, escritura o cualquier forma de expresión. Cuenta con una cama de 2 plazas con una privilegiada vista, pequeño living y baño privado.'
  },
  {
    id: 'templo-del-mar',
    nombre: 'Templo del Mar',
    slug: 'templo-del-mar',
    imagenPrincipal: '/images/templos/templo-del-mar/delmar-exterior-vista-mar.png',
    imagenes: [
      '/images/templos/templo-del-mar/delmar-exterior-vista-mar.png',
      '/images/templos/templo-del-mar/delmar-interior-principal.png',
      '/images/templos/templo-del-mar/delmar-detalle-arquitectura.png'
    ],
    capacidad: '4 personas',
    camas: '1 cama de 2 plazas, 2 camas individuales',
    amenities: ['Baño privado', 'Cocina kitchenette integrada', 'Balcones con vistas', 'Vista al mar', 'Planta alta'],
    descripcionCorta: 'Ubicado en planta alta con vista panorámica al mar, ideal para hasta 4 personas.',
    descripcion: 'Templo de inspiración divina, que simboliza la conexión con el cielo, el mar y la tierra. Está ubicado en planta alta y cuenta con acceso por la icónica escalera del lugar, que ofrece una experiencia con una vista panorámica de la zona y con una vista infinita hacia el mar, donde amanece. Es de grandes dimensiones, contando con la posibilidad de hospedar hasta 4 personas. Contiene una cama de 2 plazas, más 2 individuales, con baño y cocina kitchenette integrada. Además, tiene salida a 2 balcones, que ofrecen diferentes vistas de la zona, donde se puede ver el amanecer y atardecer.'
  },
  {
    id: 'shanti',
    nombre: 'Templo Shanti',
    slug: 'shanti',
    imagenPrincipal: '/images/templos/shanti/shanti-exterior-principal.png',
    imagenes: [
      '/images/templos/shanti/shanti-exterior-principal.png',
      '/images/templos/shanti/shanti-interior-principal.png',
      '/images/templos/shanti/shanti-detalle-arquitectura.png',
      '/images/templos/shanti/shanti-galeria-01.png',
      '/images/templos/shanti/shanti-galeria-02.png',
      '/images/templos/shanti/shanti-galeria-03.png',
      '/images/templos/shanti/shanti-galeria-04.png',
      '/images/templos/shanti/shanti-galeria-05.png',
      '/images/templos/shanti/shanti-galeria-06.png'
    ],
    capacidad: '4+ personas',
    camas: '2 camas de 2 plazas',
    amenities: ['Baño privado', 'Cocina en planta baja', 'Espacio para yoga/meditación', 'Escalera icónica'],
    descripcionCorta: 'Un espacio para la paz interior y tranquilidad, ideal para hasta 4 personas o más.',
    descripcion: 'En alusión a la paz interior y tranquilidad, este templo lleno de detalles, texturas y cálidas luces entrando por los vidrios y sus ventanas orgánicas, ofrece un espacio ideal para la relajación y la calma. Cuenta con un rincón acogedor, ideal para yoga, meditación o cualquier actividad para la conexión con uno mismo. Tiene capacidad para alojar cuatro personas o más si es necesario. Cuenta con dos camas de doble plaza, baño privado y cocina en planta baja. Su acceso, es por otra de las icónicas escaleras del lugar, que ofrece una experiencia visual e inmersiva, donde proponemos ir ascendiendo despacio para ir observando cada detalle.'
  },
];

const experiencias = [
  {
    id: 'retiros',
    titulo: 'Retiros de Bienestar',
    subtitulo: 'Reconexión con la naturaleza y contigo mismo',
    descripcion: 'Experiencias de desconexión del mundo digital y reconexión con uno mismo y la naturaleza. Nuestros retiros están diseñados para brindarte un espacio de introspección, descanso y aprendizaje en un entorno natural inigualable.\n\nCada retiro incluye alojamiento en nuestros templos, alimentación consciente, sesiones de meditación, yoga y talleres específicos según la temática del retiro. La experiencia es guiada por facilitadores especializados que te acompañarán en todo momento.',
    imagen: '/tdt/DSC00728.png',
    disponibilidad: 'Disponible durante todo el año bajo reserva'
  },
  {
    id: 'yoga',
    titulo: 'Clases de Yoga',
    subtitulo: 'Práctica para todos los niveles en un entorno inspirador',
    descripcion: 'Sesiones de yoga para todos los niveles en un entorno natural único, donde cada asana se vuelve una experiencia más profunda en conexión con la tierra y el aire puro.\n\nNuestras clases combinan diferentes estilos como Hatha, Vinyasa y Restaurativo, adaptándose a las necesidades de cada participante. Los instructores cuentan con amplia experiencia y formación internacional, asegurando una práctica segura y transformadora.',
    imagen: '/tdt/DSC00791.png',
    disponibilidad: 'Clases programadas semanalmente'
  },
  {
    id: 'meditacion',
    titulo: 'Meditación Guiada',
    subtitulo: 'Encuentra tu centro y cultiva la paz interior',
    descripcion: 'Aprende diversas técnicas de meditación para encontrar la paz interior y desarrollar mayor consciencia en tu vida cotidiana. Las sesiones se realizan en espacios especialmente diseñados para la introspección.\n\nLas prácticas incluyen meditación Vipassana, mindfulness, meditación con sonido y otras técnicas tradicionales. Cada sesión está diseñada para principiantes y practicantes con experiencia, ofreciendo herramientas que podrás incorporar a tu rutina diaria.',
    imagen: '/tdt/DSC02664.png',
    disponibilidad: 'Sesiones matutinas y al atardecer'
  },
  {
    id: 'talleres',
    titulo: 'Talleres de Bioconstrucción',
    subtitulo: 'Aprende a construir en armonía con el planeta',
    descripcion: 'Aprende sobre técnicas sustentables de construcción con tierra y otros materiales naturales. Estos talleres prácticos te permiten experimentar directamente con tus manos el arte de la bioconstrucción.\n\nCada taller incluye una parte teórica donde aprenderás sobre los principios y materiales de la bioconstrucción, seguida de una experiencia práctica donde podrás participar en proyectos reales. Aprenderás técnicas como el cob, superadobe, adobe, y uso de materiales reciclados.',
    imagen: '/tdt/DSC02893.png',
    disponibilidad: 'Talleres programados mensualmente'
  }
];

function getTemploBySlug(slug) {
  return templos.find(templo => templo.slug === slug);
}

function getAllTemplos() {
  return templos;
}

function getAllExperiencias() {
  return experiencias;
}

module.exports = {
  templos,
  experiencias,
  getTemploBySlug,
  getAllTemplos,
  getAllExperiencias
}; 