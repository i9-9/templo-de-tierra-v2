'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { usePathname } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isContactPage = pathname === '/contacto';

  if (isContactPage) {
    return (
      <SessionProvider>
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          scriptProps={{
            async: false,
            defer: false,
            appendTo: 'head',
            nonce: undefined,
          }}
        >
          {children}
        </GoogleReCaptchaProvider>
      </SessionProvider>
    );
  }

  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
} 