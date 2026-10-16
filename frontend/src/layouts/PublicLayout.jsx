import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FloatingActions } from '../components/FloatingActions';

export const PublicLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans ${pathname === '/' ? 'selection:bg-[#D4AF37] selection:text-[#0B0B0B]' : 'selection:bg-blue-600 selection:text-white'}`}>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <FloatingActions />
      <Footer />
    </div>
  );
};
