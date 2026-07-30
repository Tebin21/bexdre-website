import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { ServiceFAQItem } from '@/types';

interface FAQAccordionProps {
  items: ServiceFAQItem[];
  idPrefix?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items, idPrefix = 'faq' }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col divide-y divide-white/[0.08] border-y border-white/[0.08]">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${idPrefix}-button-${index}`;
        const panelId = `${idPrefix}-panel-${index}`;

        return (
          <div key={buttonId}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-4 py-6 text-left"
              >
                <span className="text-[16px] md:text-[18px] font-bold text-white">{item.question}</span>
                <ChevronDown
                  size={20}
                  aria-hidden="true"
                  className={`shrink-0 text-white/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-6 text-[15px] leading-[1.7] text-white/65"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
};
