'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

interface TemploFormProps {
  templo?: {
    id: string;
    nombre: string;
    descripcion: string;
    descripcionCorta: string;
    capacidad: number;
    precio: number;
    amenities: string[];
    camas: string[];
    imagenPrincipal: string;
    imagenes: string[];
    destacado: boolean;
  };
}

export default function TemploForm({ templo }: TemploFormProps) {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nombre: templo?.nombre || '',
    descripcion: templo?.descripcion || '',
    descripcionCorta: templo?.descripcionCorta || '',
    capacidad: templo?.capacidad || 2,
    precio: templo?.precio || 0,
    amenities: templo?.amenities || [],
    camas: templo?.camas || [],
    imagenPrincipal: templo?.imagenPrincipal || '',
    imagenes: templo?.imagenes || [],
    destacado: templo?.destacado || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (templo) {
        // Actualizar templo existente
        const { error } = await supabase
          .from('templos')
          .update(formData)
          .eq('id', templo.id);

        if (error) throw error;
      } else {
        // Crear nuevo templo
        const { error } = await supabase
          .from('templos')
          .insert([formData]);

        if (error) throw error;
      }

      router.push('/admin/templos');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar el templo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          type="text"
          id="nombre"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="descripcionCorta" className="block text-sm font-medium text-gray-700">
          Descripción Corta
        </label>
        <textarea
          id="descripcionCorta"
          value={formData.descripcionCorta}
          onChange={(e) => setFormData({ ...formData, descripcionCorta: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          required
        />
      </div>

      <div>
        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
          Descripción Completa
        </label>
        <textarea
          id="descripcion"
          value={formData.descripcion}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={5}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="capacidad" className="block text-sm font-medium text-gray-700">
            Capacidad
          </label>
          <input
            type="number"
            id="capacidad"
            value={formData.capacidad}
            onChange={(e) => setFormData({ ...formData, capacidad: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="1"
            required
          />
        </div>

        <div>
          <label htmlFor="precio" className="block text-sm font-medium text-gray-700">
            Precio por Noche
          </label>
          <input
            type="number"
            id="precio"
            value={formData.precio}
            onChange={(e) => setFormData({ ...formData, precio: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="0"
            step="0.01"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Destacado
        </label>
        <div className="mt-1">
          <input
            type="checkbox"
            checked={formData.destacado}
            onChange={(e) => setFormData({ ...formData, destacado: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
} 