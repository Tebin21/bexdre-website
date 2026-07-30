import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { PageHero } from '@/components/ui/PageHero';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { PLACEHOLDER_COPY } from '@/data/placeholders';

const SECTIONS = [
  'Acceptance of Terms',
  'Use of Services',
  'Intellectual Property',
  'Limitation of Liability',
  'Governing Law',
];

const TermsOfServicePage: React.FC = () => {
  usePageTitle('Terms of Service');

  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" size="sm" />
      <SectionWrapper size="sm">
        <div className="max-w-[720px] mx-auto flex flex-col gap-10">
          <div className="flex items-start gap-3 rounded-2xl border border-amber-500/25 bg-amber-500/[0.08] p-5">
            <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-[14px] leading-[1.7] text-amber-200/90">
              This page contains placeholder content and does not constitute a legal document.
            </p>
          </div>

          <p className="text-[14px] text-white/50">Last updated: Placeholder date</p>

          {SECTIONS.map((heading) => (
            <div key={heading}>
              <h2 className="text-[22px] font-bold text-white mb-3">{heading}</h2>
              <p className="text-[15px] leading-[1.8] text-white/65">{PLACEHOLDER_COPY}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
};

export default TermsOfServicePage;
