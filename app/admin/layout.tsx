import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  
  // Check if user is admin
  if (!session?.user || session.user.email !== 'admin@templodetierra.com') {
    redirect('/');
  }

  return (
    <div className="relative min-h-screen bg-[#6F4C21]">
      {/* Main container that starts below the navbar */}
      <div className="absolute inset-0 top-[100px] z-0">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-[#6F4C21] text-white">
            <div className="p-6">
              <h1 className="text-2xl font-heading">Admin Panel</h1>
            </div>
            <nav>
              <Link
                href="/admin"
                className="block py-3 px-6 text-[15px] hover:bg-[#5A3B1A] transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/reservas"
                className="block py-3 px-6 text-[15px] hover:bg-[#5A3B1A] transition-colors"
              >
                Reservas
              </Link>
              <Link
                href="/admin/templos"
                className="block py-3 px-6 text-[15px] hover:bg-[#5A3B1A] transition-colors"
              >
                Templos
              </Link>
              <Link
                href="/admin/usuarios"
                className="block py-3 px-6 text-[15px] hover:bg-[#5A3B1A] transition-colors"
              >
                Usuarios
              </Link>
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1 p-8 overflow-y-auto bg-gray-50">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 