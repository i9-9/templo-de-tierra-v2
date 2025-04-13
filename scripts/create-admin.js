const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await hash('admin123', 12);
  
  const user = await prisma.user.upsert({
    where: { email: 'admin@templodetierra.com' },
    update: {},
    create: {
      email: 'admin@templodetierra.com',
      name: 'Admin',
      password: hashedPassword,
    },
  });

  console.log('Admin user created:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 