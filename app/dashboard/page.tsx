import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Reserva } from './types'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  // Obtener estadísticas básicas
  const [templosCount, reservasCount, usuariosCount] = await Promise.all([
    prisma.templo.count(),
    prisma.reserva.count(),
    prisma.user.count(),
  ])

  // Obtener las últimas reservas
  const reservas = await prisma.reserva.findMany({
    take: 5,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      templo: true,
      user: true,
    },
  })

  // Convertir las fechas y decimales a los tipos correctos
  const ultimasReservas = reservas.map(reserva => ({
    ...reserva,
    fechaInicio: new Date(reserva.fechaInicio),
    fechaFin: new Date(reserva.fechaFin),
    createdAt: new Date(reserva.createdAt),
    updatedAt: new Date(reserva.updatedAt),
    templo: {
      ...reserva.templo,
      createdAt: new Date(reserva.templo.createdAt),
      updatedAt: new Date(reserva.templo.updatedAt),
    },
    user: {
      ...reserva.user,
      createdAt: new Date(reserva.user.createdAt),
      emailVerified: reserva.user.emailVerified ? new Date(reserva.user.emailVerified) : null,
    }
  })) as Reserva[]

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Bienvenido, {session?.user?.name || 'Administrador'}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Templos</dt>
                  <dd className="text-lg font-medium text-gray-900">{templosCount}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Reservas</dt>
                  <dd className="text-lg font-medium text-gray-900">{reservasCount}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Usuarios</dt>
                  <dd className="text-lg font-medium text-gray-900">{usuariosCount}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Últimas Reservas</h3>
          <div className="mt-5">
            <div className="flow-root">
              <ul role="list" className="-my-5 divide-y divide-gray-200">
                {ultimasReservas.map((reserva: Reserva) => (
                  <li key={reserva.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {reserva.user.name || reserva.user.email}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {reserva.templo.nombre}
                        </p>
                      </div>
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {new Date(reserva.fechaInicio).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 