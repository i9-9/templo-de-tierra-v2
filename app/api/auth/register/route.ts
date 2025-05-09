import { NextResponse } from 'next/server'
import { signUpWithEmail } from '@/lib/auth.server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body
    
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email y contraseña son requeridos' },
        { status: 400 }
      )
    }
    
    const result = await signUpWithEmail(email, password)
    
    if (!result.user) {
      return NextResponse.json(
        { message: 'Error al crear el usuario' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Usuario creado exitosamente', userId: result.user.id },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error en el registro:', error)
    
    let message = 'Error al crear la cuenta'
    let status = 500
    
    if (error.message?.includes('already exists')) {
      message = 'El correo electrónico ya está registrado'
      status = 409
    }
    
    return NextResponse.json({ message }, { status })
  }
} 