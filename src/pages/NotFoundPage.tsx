import React from 'react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { Button } from '@/components/ui/Button';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

const NotFoundPage: React.FC = () => {
  usePageTitle('Page Not Found');

  return (
    <SectionWrapper>
      <div className="flex flex-col items-center text-center gap-6 py-20">
        <h1 className="text-[96px] md:text-[140px] leading-none font-bold tracking-[-0.03em] bg-gradient-to-br from-[#24AC7C] to-[#1a8a62] bg-clip-text text-transparent">
          404
        </h1>
        <p className="text-[18px] text-white/70 max-w-[440px]">
          We couldn't find the page you're looking for.
        </p>
        <Button to="/" variant="primary" size="md">
          Back to Home
        </Button>
      </div>
    </SectionWrapper>
  );
};

export default NotFoundPage;
