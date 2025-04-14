import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import PageLayout from '@/app/components/PageLayout';
import SignInForm from '@/app/auth/signin/SignInForm';

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return (
    <PageLayout>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-24 bg-warm-sand">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className=" mt-10 text-center text-2xl font-bold   leading-9 tracking-tight text-earth-brown">
            Iniciar sesión
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <SignInForm />
        </div>
      </div>
    </PageLayout>
  );
} 