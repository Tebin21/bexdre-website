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
    <picture className="hidden lg:block">
      <source srcSet="/images/x.webp" type="image/webp" />
      <img src="/images/x-opt.png" alt="BEXDRE" width={320} height={320} className="h-9 w-9 object-contain" />
    </picture>
    <picture className="lg:hidden">
      <source srcSet="/images/bexdrelogo.webp" type="image/webp" />
      <img
        src="/images/bexdrelogo-opt.png"
        alt="BEXDRE"
        width={800}
        height={800}
        className="h-9 w-auto object-contain"
      />
    </picture>
  </span>
);
