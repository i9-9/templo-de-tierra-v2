'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createBrowserClient } from '@supabase/ssr';
import { uploadImage } from '@/lib/supabase';

interface TemploFormProps {
  templo?: {
    id: string;
    nombre: string;
    slug: string;
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
  const [imageUploading, setImageUploading] = useState(false);

  const [formData, setFormData] = useState({
    nombre: templo?.nombre || '',
    slug: templo?.slug || '',
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

  const [amenity, setAmenity] = useState('');
  const [cama, setCama] = useState('');

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nombre = e.target.value;
    setFormData({ 
      ...formData, 
      nombre,
      // Solo generar el slug automáticamente si no hay uno ya o si es un templo nuevo
      slug: !templo || formData.slug === '' ? generateSlug(nombre) : formData.slug 
    });
  };

  const addAmenity = () => {
    if (amenity.trim() !== '' && !formData.amenities.includes(amenity.trim())) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, amenity.trim()]
      });
      setAmenity('');
    }
  };

  const removeAmenity = (index: number) => {
    const newAmenities = [...formData.amenities];
    newAmenities.splice(index, 1);
    setFormData({ ...formData, amenities: newAmenities });
  };

  const addCama = () => {
    if (cama.trim() !== '' && !formData.camas.includes(cama.trim())) {
      setFormData({
        ...formData,
        camas: [...formData.camas, cama.trim()]
      });
      setCama('');
    }
  };

  const removeCama = (index: number) => {
    const newCamas = [...formData.camas];
    newCamas.splice(index, 1);
    setFormData({ ...formData, camas: newCamas });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isPrincipal: boolean) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setImageUploading(true);
    try {
      const file = e.target.files[0];
      const url = await uploadImage(file, 'templos', 'imagenes');
      
      if (url) {
        if (isPrincipal) {
          setFormData({ ...formData, imagenPrincipal: url });
        } else {
          setFormData({ ...formData, imagenes: [...formData.imagenes, url] });
        }
      }
    } catch (err) {
      setError('Error al subir la imagen');
      console.error(err);
    } finally {
      setImageUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...formData.imagenes];
    newImages.splice(index, 1);
    setFormData({ ...formData, imagenes: newImages });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!formData.nombre || !formData.slug || !formData.descripcion) {
        throw new Error('Los campos nombre, slug y descripción son obligatorios');
      }

      // Asegurarnos que descripcionCorta tenga un valor
      if (!formData.descripcionCorta) {
        formData.descripcionCorta = formData.descripcion.substring(0, 100) + '...';
      }

      const endpoint = templo 
        ? `/api/admin/templos/${templo.id}` 
        : '/api/admin/templos';
      
      const method = templo ? 'PUT' : 'POST';
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al guardar el templo');
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            value={formData.nombre}
            onChange={handleNombreChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
            Slug (URL)
          </label>
          <input
            type="text"
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
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
            Precio por noche
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
          Imagen Principal
        </label>
        <div className="mt-1 flex items-center">
          {formData.imagenPrincipal && (
            <div className="relative w-32 h-32 rounded-lg overflow-hidden mr-4">
              <Image
                src={formData.imagenPrincipal}
                alt="Imagen principal"
                fill
                className="object-cover"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, true)}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Galería de Imágenes
        </label>
        <div className="mt-1 grid grid-cols-2 md:grid-cols-4 gap-4">
          {formData.imagenes.map((imagen, index) => (
            <div key={index} className="relative">
              <div className="relative w-full h-32 rounded-lg overflow-hidden">
                <Image
                  src={imagen}
                  alt={`Imagen ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
          <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, false)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Amenities
        </label>
        <div className="mt-1 flex items-center space-x-2">
          <input
            type="text"
            value={amenity}
            onChange={(e) => setAmenity(e.target.value)}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Agregar amenity..."
          />
          <button
            type="button"
            onClick={addAmenity}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Agregar
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.amenities.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
            >
              {item}
              <button
                type="button"
                onClick={() => removeAmenity(index)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Camas
        </label>
        <div className="mt-1 flex items-center space-x-2">
          <input
            type="text"
            value={cama}
            onChange={(e) => setCama(e.target.value)}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Agregar cama..."
          />
          <button
            type="button"
            onClick={addCama}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Agregar
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.camas.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
            >
              {item}
              <button
                type="button"
                onClick={() => removeCama(index)}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={formData.destacado}
            onChange={(e) => setFormData({ ...formData, destacado: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">Destacar este templo</span>
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading || imageUploading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Guardar Templo'}
        </button>
      </div>
    </form>
  );
} 