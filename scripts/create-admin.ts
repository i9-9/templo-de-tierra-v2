const { PrismaClient } = require('@prisma/client')
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const prisma = new PrismaClient()
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

async function main() {
  try {
    // 1. Crear un nuevo usuario en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'templodetierra.ashram@gmail.com',
      password: 'TempoDeTierra2024!',
      email_confirm: true
    })

    if (authError) throw authError

    if (!authData.user) {
      throw new Error('No se pudo crear el usuario en Supabase Auth')
    }

    // 2. Actualizar el usuario en la base de datos de Prisma
    const admin = await prisma.user.upsert({
      where: {
        email: 'templodetierra.ashram@gmail.com',
      },
      update: {
        id: authData.user.id,
        name: 'Admin Templo de Tierra',
        isAdmin: true,
        emailVerified: new Date(),
      },
      create: {
        id: authData.user.id,
        name: 'Admin Templo de Tierra',
        email: 'templodetierra.ashram@gmail.com',
        isAdmin: true,
        emailVerified: new Date(),
      },
    })
    
    console.log('Admin user created/updated successfully:', admin)
    console.log('\nCredenciales de acceso:')
    console.log('Email: templodetierra.ashram@gmail.com')
    console.log('Contraseña temporal: TempoDeTierra2024!')
    console.log('\nPor favor, cambia la contraseña después del primer inicio de sesión.')
  } catch (error) {
    console.error('Error creating/updating admin user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 