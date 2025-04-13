import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminTemplosPage() {
  const templos = await prisma.templo.findMany({
    orderBy: {
      nombre: 'asc',
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8 animate-fade-right" style={{ animationDelay: '0.1s' }}>
        <h1 className="text-3xl font-heading text-[#6F4C21]">Templos</h1>
        <Link
          href="/admin/templos/nuevo"
          className="bg-[#6F4C21] text-white px-4 py-2 rounded-md hover:bg-[#5A3B1A] transition-colors"
        >
          Nuevo Templo
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden animate-fade-up" style={{ animationDelay: '0.2s' }}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Capacidad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Destacado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {templos.map((templo, index) => (
              <tr 
                key={templo.id}
                className="animate-fade-up"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {templo.nombre}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{templo.capacidad}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ${templo.precio.toNumber()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      templo.destacado
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {templo.destacado ? 'Sí' : 'No'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Link
                    href={`/admin/templos/${templo.id}`}
                    className="text-[#6F4C21] hover:text-[#5A3B1A] mr-4"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 