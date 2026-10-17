import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ variant = 'dark', className = '', imgClassName = '' }) => {
  return (
    <Link
  to="/"
  className={`inline-flex items-center group focus:outline-none ${className}`}
>
  <img
    src="/logo.png"
    alt="INOVIQ Global"
    className={`h-20 sm:h-24 w-36 sm:w-44 object-contain object-center transition-transform duration-200 group-hover:scale-105 ${imgClassName}`}
  />
</Link>
  );
};

