import React from 'react';
import type { ProcessStep } from '@/types';
import { useGSAPReveal } from '@/hooks/useGSAPReveal';

interface ProcessStepRowProps {
  step: ProcessStep;
}

export const ProcessStepRow: React.FC<ProcessStepRowProps> = ({ step }) => {
  const ref = useGSAPReveal<HTMLDivElement>({ once: true, y: 24 });

  return (
    <div
      ref={ref}
      className="process-step-row grid grid-cols-[64px_1fr] md:grid-cols-[160px_1fr] gap-6 md:gap-10 items-start"
    >
      <div className="flex md:justify-center">
        <span
          aria-hidden="true"
          className="text-[56px] md:text-[88px] leading-none font-bold bg-gradient-to-br from-[#24AC7C] to-[#1a8a62] bg-clip-text text-transparent"
        >
          {step.letter}
        </span>
      </div>
      <div className="pt-2 md:pt-6">
        <h3 className="text-[22px] md:text-[28px] font-bold text-white mb-2">{step.word}</h3>
        <p className="text-[15px] md:text-[16px] leading-[1.7] text-white/60 max-w-[560px]">{step.description}</p>
      </div>
    </div>
  );
};
