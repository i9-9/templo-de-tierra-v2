'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface EliminarTemploFormProps {
  id: string;
  nombre: string;
  tieneReservas: boolean;
}

export default function EliminarTemploForm({ id, nombre, tieneReservas }: EliminarTemploFormProps) {
  const router = useRouter();
  const [confirmacion, setConfirmacion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar que se haya escrito el nombre del templo correctamente
    if (confirmacion !== nombre) {
      setError('Por favor, escribe el nombre exacto del templo para confirmar');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/admin/templos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error al eliminar el templo');
      }
      
      // Redireccionar al listado de templos
      router.push('/admin/templos');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar el templo');
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div className="bg-red-50 border border-red-200 p-4 rounded">
        <p className="text-red-700 font-medium">¿Estás seguro de que quieres eliminar este templo?</p>
        <p className="text-red-600 mt-1">Esta acción no se puede deshacer.</p>
        
        {tieneReservas && (
          <p className="text-red-700 mt-2 font-bold">
            Se eliminarán también todas las reservas asociadas a este templo.
          </p>
        )}
      </div>
      
      <div>
        <label htmlFor="confirmacion" className="block text-sm font-medium text-gray-700">
          Para confirmar, escribe el nombre del templo: <strong>{nombre}</strong>
        </label>
        <input
          type="text"
          id="confirmacion"
          value={confirmacion}
          onChange={(e) => setConfirmacion(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          placeholder={nombre}
        />
      </div>
      
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
          disabled={loading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading || confirmacion !== nombre}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? 'Eliminando...' : 'Eliminar Templo'}
        </button>
      </div>
    </form>
  );
} 