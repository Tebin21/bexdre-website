import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
  id?: string;
}

const paddingMap = {
  sm: 'p-5',
  md: 'p-7',
  lg: 'p-9',
};

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glow = false,
  padding = 'md',
  style,
  id,
}) => {
  const baseClasses = [
    // Full 24px backdrop-blur is expensive to sample on mobile GPUs, and GlassCard is
    // instantiated 15+ times on a single page (services/projects/differentiators/
    // testimonials grids) — halving the blur radius below `lg` cuts that GPU cost
    // substantially while staying visually close; desktop keeps the full blur.
    'backdrop-blur-md lg:backdrop-blur-xl',
    'bg-[rgba(15,20,24,0.72)]',
    'border border-white/[0.08]',
    'rounded-[28px]',
    'shadow-[0_8px_40px_rgba(0,0,0,0.32),0_0_0_1px_rgba(255,255,255,0.04)_inset]',
    'transition-all duration-[420ms] ease-[cubic-bezier(.25,.46,.45,.94)]',
    'hover:-translate-y-2 hover:scale-[1.015]',
    'hover:shadow-[0_20px_60px_rgba(0,0,0,0.45),0_0_40px_rgba(36,172,124,0.14)]',
    'hover:border-[rgba(36,172,124,0.25)]',
    paddingMap[padding],
  ];

  if (glow) {
    baseClasses.push(
      'shadow-[0_0_40px_rgba(36,172,124,0.25),0_0_80px_rgba(36,172,124,0.10)]',
    );
  }

  return (
    <div
      id={id}
      className={`${baseClasses.join(' ')} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
