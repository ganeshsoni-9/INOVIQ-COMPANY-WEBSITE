import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight, Search, Layers } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-slate-50 px-4 py-20 text-center">
      <div className="max-w-lg mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-xl">
        <span className="text-6xl sm:text-7xl font-extrabold font-mono text-blue-600 block mb-4 tracking-tighter">
          404
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit'] mb-3">
          Page Not Found
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed mb-8">
          The requested URL does not exist or has been relocated within the INOVIQ Global portal. Explore our main sections below.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            to="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
          >
            <Layers className="w-4 h-4" />
            <span>Browse Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
