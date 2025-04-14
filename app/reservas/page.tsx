import ReservasList from '@/app/components/ReservasList';

export default function ReservasPage() {
  return (
    <div className="container mx-auto px-4 pt-[150px] pb-8">
      <h1 className="text-3xl font-heading text-[#6F4C21] mb-8">Mis Reservas</h1>
      <ReservasList />
    </div>
  );
} 