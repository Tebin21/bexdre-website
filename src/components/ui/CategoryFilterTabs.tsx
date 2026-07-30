import React from 'react';

interface CategoryFilterTabsProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

/**
 * Client-side filter tabs — no query params, purely local state in the parent hub page.
 * These are toggle buttons that filter an adjacent grid in place (not a WAI-ARIA Tabs
 * widget, which would require arrow-key roving focus over separate tabpanels), so they
 * use a plain group + aria-pressed rather than role="tablist"/"tab".
 */
export const CategoryFilterTabs: React.FC<CategoryFilterTabsProps> = ({ categories, active, onChange }) => (
  <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Filter by category">
    {['All', ...categories].map((category) => {
      const isActive = active === category;
      return (
        <button
          key={category}
          type="button"
          aria-pressed={isActive}
          onClick={() => onChange(category)}
          className={[
            'px-4 py-2 rounded-full text-[13px] font-bold uppercase tracking-wide transition-all duration-200 border',
            isActive
              ? 'bg-[#24AC7C] text-white border-transparent'
              : 'bg-white/[0.04] text-white/60 border-white/[0.08] hover:text-white hover:border-white/[0.18]',
          ].join(' ')}
        >
          {category}
        </button>
      );
    })}
  </div>
);
