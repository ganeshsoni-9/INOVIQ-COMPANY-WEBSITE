import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ variant = 'dark', className = '' }) => {
  return (
    <Link to="/" className={`inline-flex items-center group focus:outline-none ${className}`}>
      {/* Geometric Logo Icon */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4AF37] via-[#C9A227] to-[#F5E6B3] p-[2px] shadow-md shadow-[#D4AF37]/20 group-hover:shadow-[#D4AF37]/40 transition-shadow duration-300">
        <div className="shrink-0 flex items-center justify-center bg-[#111111] rounded-[10px] w-full h-full overflow-hidden">
          <img
            src="/logo.png"
            alt="INOVIQ Global"
            className="block w-9 h-9 object-contain object-center bg-[#111111]"
          />
        </div>
      </div>
    </Link>
  );
};

