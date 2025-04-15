import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/signin');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('user_id', session.user.id)
    .single();

  if (!profile?.is_admin) {
    redirect('/');
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Panel de Administración</h1>
        </div>
        <nav className="mt-4">
          <Link
            href="/admin"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/templos"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Templos
          </Link>
          <Link
            href="/admin/reservas"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Reservas
          </Link>
          <Link
            href="/admin/usuarios"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Usuarios
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
} 