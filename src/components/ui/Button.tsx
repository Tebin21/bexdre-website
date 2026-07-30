import React from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  /** External link (or same-page anchor) */
  href?: string;
  /** Internal route — rendered as a react-router Link */
  to?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gradient-to-br from-[#24AC7C] to-[#1a8a62] text-white shadow-[0_4px_20px_rgba(36,172,124,0.35)] hover:from-[#2BC88F] hover:to-[#22a075] hover:shadow-[0_8px_40px_rgba(36,172,124,0.55)] hover:scale-[1.04]',
  ghost:
    'bg-white/[0.06] text-white/85 border border-white/[0.08] backdrop-blur-md hover:bg-white/10 hover:border-white/[0.18] hover:scale-[1.03]',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-8 py-3.5 text-[15px]',
  lg: 'px-10 py-4 text-base',
};

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.01em] transition-all duration-300 cursor-pointer whitespace-nowrap select-none';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  href,
  to,
  className = '',
  ...props
}) => {
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
