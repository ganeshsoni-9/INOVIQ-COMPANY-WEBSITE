import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight, Search, Layers } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#0B0B0B] px-4 py-20 text-center">
      <div className="max-w-lg mx-auto bg-[#171717] p-8 sm:p-12 rounded-3xl border border-[#3A321C] shadow-2xl">
        <span className="text-6xl sm:text-7xl font-extrabold font-mono bg-gradient-to-r from-[#D4AF37] via-[#F5E6B3] to-[#C9A227] bg-clip-text text-transparent block mb-4 tracking-tighter">
          404
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] mb-3">
          Page Not Found
        </h1>

        <p className="text-sm text-[#B5B5B5] leading-relaxed mb-8">
          The requested URL does not exist or has been relocated within the INOVIQ Global portal. Explore our main sections below.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C9A227] hover:from-[#F5E6B3] hover:to-[#D4AF37] text-[#0B0B0B] font-bold text-xs shadow-md shadow-[#D4AF37]/10 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            to="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#111111] hover:bg-[#1a1a1a] text-[#E0E0E0] border border-[#3A321C] hover:border-[#D4AF37] hover:text-[#D4AF37] font-semibold text-xs transition-colors"
          >
            <Layers className="w-4 h-4" />
            <span>Browse Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
