import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import TemploForm from '@/app/components/admin/TemploForm';

export default async function NuevoTemplo() {
  const session = await getServerSession(authOptions);
  
  // Verificar que el usuario esté autenticado y sea admin
  if (!session || !session.user.isAdmin) {
    redirect('/auth/signin');
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Crear Nuevo Templo</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <TemploForm />
      </div>
    </div>
  );
} 