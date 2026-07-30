import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  size?: 'default' | 'sm';
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  id,
  className = '',
  size = 'default',
}) => {
  const padding = size === 'default' ? 'py-36 max-md:py-20' : 'py-20 max-md:py-12';
  return (
    <section id={id} className={`relative ${padding} ${className}`}>
      <div className="max-w-[1400px] mx-auto px-10 max-sm:px-5">
        {children}
      </div>
    </section>
  );
};
