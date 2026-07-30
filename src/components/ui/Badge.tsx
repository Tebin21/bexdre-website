import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, className = '' }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase border bg-[rgba(36,172,124,0.12)] border-[rgba(36,172,124,0.25)] text-[#24AC7C] ${className}`}
  >
    {children}
  </span>
);
