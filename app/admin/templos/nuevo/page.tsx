import TemploForm from '@/app/components/admin/TemploForm';

export default async function NuevoTemplo() {

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Crear Nuevo Templo</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <TemploForm />
      </div>
    </div>
  );
} 