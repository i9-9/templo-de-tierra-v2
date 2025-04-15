import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import TemploForm from '@/app/components/admin/TemploForm';

export default async function EditarTemploPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createServerComponentClient({ cookies });

  const { data: templo } = await supabase
    .from('templos')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!templo) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Editar Templo</h1>
      <TemploForm templo={templo} />
    </div>
  );
} 