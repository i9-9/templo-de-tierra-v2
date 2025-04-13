'use client';

import Navigation from './Navigation';

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-yellow-50">
      <Navigation />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
} 