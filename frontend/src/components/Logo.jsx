import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ variant = 'dark', className = '' }) => {
  const isDark = variant === 'dark'; // on dark backgrounds
  const isLight = variant === 'light'; // on light backgrounds

  return (
    <Link to="/" className={`inline-flex items-center gap-3 group focus:outline-none ${className}`}>
      {/* Geometric Logo Icon */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-400 p-[2px] shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow duration-300">
      
 







<div className="group w-12 h-12 shrink-0 rounded-full border-2 border-black overflow-hidden bg-black box-border flex items-center justify-center">
  <img
    src="/invoiq.png"
    alt="INOVIQ Global Pvt. Ltd."
    className="block w-full h-full object-contain object-center"
  />
</div>








      </div>

      {/* Brand Text */}
      <div className="flex flex-col text-left">
        <span
          className={`font-extrabold tracking-wider text-xl leading-none font-['Outfit'] ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          INOVIQ
          <span className="text-blue-500 font-bold ml-1">GLOBAL</span>
        </span>
        <span
          className={`text-[9px] font-semibold tracking-[0.22em] uppercase mt-0.5 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          PVT. LTD.
        </span>
      </div>
    </Link>
  );
};
