import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function AdminDashboard() {
  const supabase = createServerComponentClient({ cookies });

  // Obtener estadísticas
  const { data: templos } = await supabase
    .from('templos')
    .select('*', { count: 'exact' });

  const { data: reservas } = await supabase
    .from('reservas')
    .select('*', { count: 'exact' });

  const { data: usuarios } = await supabase
    .from('profiles')
    .select('*', { count: 'exact' });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Templos</h2>
          <p className="text-3xl font-bold">{templos?.length || 0}</p>
          <Link
            href="/admin/templos"
            className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
          >
            Ver todos →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Reservas</h2>
          <p className="text-3xl font-bold">{reservas?.length || 0}</p>
          <Link
            href="/admin/reservas"
            className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
          >
            Ver todas →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Usuarios</h2>
          <p className="text-3xl font-bold">{usuarios?.length || 0}</p>
          <Link
            href="/admin/usuarios"
            className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
          >
            Ver todos →
          </Link>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Acciones rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/templos/nuevo"
            className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100"
          >
            <h3 className="font-medium">Crear nuevo templo</h3>
            <p className="text-sm text-gray-600">Agregar un nuevo templo al catálogo</p>
          </Link>
          <Link
            href="/admin/reservas"
            className="p-4 bg-green-50 rounded-lg hover:bg-green-100"
          >
            <h3 className="font-medium">Gestionar reservas</h3>
            <p className="text-sm text-gray-600">Ver y administrar todas las reservas</p>
          </Link>
        </div>
      </div>
    </div>
  );
} 