import { signIn, signOut, useSession } from 'next-auth/react';
import { User } from '@/lib/models/User';

export const useAuth = () => {
  const { data: session, status } = useSession();

  const handleSignIn = async (email: string, password: string) => {
    return signIn('credentials', { email, password, redirect: false });
  };

  const handleSignOut = async () => {
    return signOut({ redirect: false });
  };

  return {
    user: session?.user as User | undefined,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    signIn: handleSignIn,
    signOut: handleSignOut,
  };
}; 