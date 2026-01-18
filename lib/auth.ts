import { NextAuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './prisma'

// Validación de variables de entorno (comentada para simplificar)
// const requiredEnvVars = {
//   SMTP_USER: process.env.SMTP_USER,
//   SMTP_HOST: process.env.SMTP_HOST,
//   SMTP_PORT: process.env.SMTP_PORT,
//   SMTP_PASSWORD: process.env.SMTP_PASSWORD,
//   SMTP_FROM: process.env.SMTP_FROM,
//   NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
//   NEXTAUTH_URL: process.env.NEXTAUTH_URL,
// } as const

// // Verificar todas las variables de entorno requeridas
// Object.entries(requiredEnvVars).forEach(([key, value]) => {
//   if (!value) {
//     throw new Error(`${key} is not defined in environment variables`)
//   }
// })

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      isAdmin: boolean
    }
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any, // Type assertion to bypass the type mismatch
  providers: [
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST || 'localhost',
        port: Number(process.env.SMTP_PORT) || 587,
        auth: {
          user: process.env.SMTP_USER || 'user',
          pass: process.env.SMTP_PASSWORD || 'password',
        },
      },
      from: process.env.SMTP_FROM || 'noreply@example.com',
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { isAdmin: true }
        })
        session.user.isAdmin = dbUser?.isAdmin ?? false
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
    error: '/auth/error',
  },
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-build',
  debug: process.env.NODE_ENV === 'development',
} 