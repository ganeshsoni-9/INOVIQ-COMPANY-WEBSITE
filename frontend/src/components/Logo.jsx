import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ variant = 'dark', className = '', imgClassName = '' }) => {
  return (
    <Link to="/" className={`inline-flex items-center group focus:outline-none ${className}`}>
      <img
        src="/logo.png"
        alt="INOVIQ Global"
        className={`h-12 sm:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-105 ${imgClassName}`}
      />
    </Link>
  );
};

