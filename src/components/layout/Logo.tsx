import React from 'react';

interface LogoProps {
  className?: string;
}

// Static brand mark, no crossfade: x.png on desktop, bexdrelogo.png on mobile.
// Only one <img> is ever in the DOM flow at a time (the other is `hidden`),
// so there's no risk of both variants showing on the same breakpoint.
export const Logo: React.FC<LogoProps> = ({ className = '' }) => (
  <span className={`inline-flex items-center ${className}`}>
    <span className="sr-only">BEXDRE</span>
    <img src="/images/x.png" alt="BEXDRE" className="hidden lg:block h-9 w-9 object-contain" />
    <img src="/images/bexdrelogo.png" alt="BEXDRE" className="lg:hidden h-9 w-auto object-contain" />
  </span>
);
