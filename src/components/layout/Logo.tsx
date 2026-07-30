import React from 'react';
import { useLogoMorph } from '@/hooks/useLogoMorph';

interface LogoProps {
  className?: string;
  markSize?: 'sm' | 'md' | 'navbar' | 'mobileTop';
}

// Fixed box per size — the box never changes regardless of which image is
// showing, so the x.png <-> bexdrelogo.png morph never causes layout shift.
// Boxes are square to match the source PNGs' native square canvas (displayed
// well below their native resolution, so no upscaling occurs). `navbar` is
// the large mark shown inside the desktop top nav; `mobileTop` is the large
// mark shown standalone above the page content on mobile — these are the
// only two places the animated logo renders, one or the other per viewport.
const containerSizeClasses: Record<'sm' | 'md' | 'navbar' | 'mobileTop', string> = {
  sm: 'h-9 w-[148px]',
  md: 'h-11 w-[180px]',
  navbar: 'h-[160px] w-[160px] xl:h-[200px] xl:w-[200px]',
  mobileTop: 'h-[140px] w-[140px] sm:h-[170px] sm:w-[170px]',
};

/** Animated brand mark — cycles x.png -> bexdrelogo.png -> x.png. Shared by Navbar and Footer. */
export const Logo: React.FC<LogoProps> = ({ className = '', markSize = 'sm' }) => {
  const { markRef, wordmarkRef } = useLogoMorph<HTMLImageElement>();

  return (
    <span className={`relative inline-block ${containerSizeClasses[markSize]} ${className}`}>
      <span className="sr-only">BEXDRE</span>
      <img
        ref={markRef}
        src="/images/x.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-contain opacity-100 will-change-[opacity,transform,filter]"
      />
      <img
        ref={wordmarkRef}
        src="/images/bexdrelogo.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-contain opacity-0 will-change-[opacity,transform,filter]"
      />
    </span>
  );
};
