import React from 'react';
import { Badge } from './Badge';
import { Breadcrumbs } from './Breadcrumbs';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  size?: 'default' | 'sm';
  breadcrumbs?: BreadcrumbItem[];
}

/** Hero band for every hub/detail page below Home — clears the floating pill Navbar itself, so it never needs SectionWrapper's own top padding. */
export const PageHero: React.FC<PageHeroProps> = ({ eyebrow, title, subtitle, size = 'default', breadcrumbs }) => {
  const titleSize = size === 'sm' ? 'text-[32px] md:text-[40px]' : 'text-[40px] md:text-[56px]';

  return (
    <section className="relative pt-[160px] pb-16 md:pt-[180px] md:pb-20 lg:pt-[165px] xl:pt-[180px]">
      <div className="max-w-[1400px] mx-auto px-10 max-sm:px-5">
        <div className="flex flex-col items-center text-center gap-5 max-w-[760px] mx-auto">
          {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
          {eyebrow && <Badge>{eyebrow}</Badge>}
          <h1 className={`${titleSize} leading-[1.1] tracking-[-0.02em] font-bold text-white`}>{title}</h1>
          {subtitle && <p className="text-[16px] md:text-[18px] leading-[1.7] text-white/65">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
};
