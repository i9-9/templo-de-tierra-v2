'use client';

import Navbar from './Navbar';

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F5DC90]/20">
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  );
} 