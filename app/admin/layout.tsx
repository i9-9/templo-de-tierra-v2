import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { UserIcon, HomeIcon, CalendarIcon, UsersIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Verificar que el usuario esté autenticado
  if (!session) {
    redirect('/auth/signin');
  }

  // Verificar que el usuario sea administrador
  if (!session.user.isAdmin) {
    redirect('/');
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Templo de Tierra</h1>
          <p className="text-sm text-gray-600">Panel de Administración</p>
        </div>
        
        <div className="p-4 border-b">
          <div className="flex items-center">
            {session.user.image ? (
              <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                <Image 
                  src={session.user.image} 
                  alt={session.user.name || 'Avatar'} 
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <UserIcon className="w-6 h-6 text-gray-500" />
              </div>
            )}
            <div>
              <p className="font-medium text-gray-800">{session.user.name}</p>
              <p className="text-xs text-gray-500">Administrador</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4">
          <div className="space-y-1">
            <Link
              href="/admin"
              className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded-md group"
            >
              <HomeIcon className="w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-700" />
              Dashboard
            </Link>
            <Link
              href="/admin/templos"
              className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded-md group"
            >
              <HomeIcon className="w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-700" />
              Templos
            </Link>
            <Link
              href="/admin/reservas"
              className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded-md group"
            >
              <CalendarIcon className="w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-700" />
              Reservas
            </Link>
            <Link
              href="/admin/usuarios"
              className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded-md group"
            >
              <UsersIcon className="w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-700" />
              Usuarios
            </Link>
          </div>
          
          <div className="pt-4 mt-4 border-t">
            <Link
              href="/api/auth/signout"
              className="flex items-center px-2 py-2 text-red-600 hover:bg-red-50 rounded-md group"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3 text-red-500" />
              Cerrar Sesión
            </Link>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow">
          <div className="py-4 px-6">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              ← Volver al sitio
            </Link>
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 