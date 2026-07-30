import React from 'react';
import { Badge } from './Badge';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  as = 'h2',
  className = '',
}) => {
  const Heading = as;
  const alignClasses = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';

  return (
    <div className={`flex flex-col gap-5 max-w-[720px] ${alignClasses} ${className}`}>
      {eyebrow && <Badge>{eyebrow}</Badge>}
      <Heading className="text-[32px] md:text-[42px] leading-[1.15] tracking-[-0.02em] font-bold text-white">
        {title}
      </Heading>
      {subtitle && <p className="text-[16px] md:text-[18px] leading-[1.7] text-white/65">{subtitle}</p>}
    </div>
  );
};
