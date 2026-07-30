import React from 'react';

interface LogoProps {
  className?: string;
  markSize?: 'sm' | 'md';
}

const markSizeClasses: Record<'sm' | 'md', string> = {
  sm: 'w-9 h-9 text-sm',
  md: 'w-11 h-11 text-base',
};

/** Shared "B" wordmark — used by both Navbar and Footer. */
export const Logo: React.FC<LogoProps> = ({ className = '', markSize = 'sm' }) => (
  <span className={`inline-flex items-center gap-3 ${className}`}>
    <span
      className={`${markSizeClasses[markSize]} rounded-xl flex items-center justify-center text-white font-bold bg-gradient-to-br from-[#24AC7C] to-[#1a8a62] shadow-[0_0_20px_rgba(36,172,124,0.4)]`}
    >
      B
    </span>
    <span className="text-xl font-bold tracking-[-0.05em] text-white">BEXDRE</span>
  </span>
);
