import { createClient } from '@supabase/supabase-js';

// Validar variables de entorno
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL');
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Crear y configurar el cliente de Supabase
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);

// Helper para cargar imágenes a Storage
export async function uploadImage(file: File, bucket: string, folder: string): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;
    
    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);
    
    if (error) {
      console.error('Error uploading file:', error);
      return null;
    }
    
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  } catch (error) {
    console.error('Error in uploadImage:', error);
    return null;
  }
}

// Helper para eliminar imágenes del Storage
export async function deleteImage(url: string, bucket: string): Promise<boolean> {
  try {
    // Extraer la ruta relativa desde la URL
    const urlObj = new URL(url);
    const pathnameParts = urlObj.pathname.split('/');
    const filePath = pathnameParts.slice(pathnameParts.indexOf(bucket) + 1).join('/');
    
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);
    
    if (error) {
      console.error('Error deleting file:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in deleteImage:', error);
    return false;
  }
} 