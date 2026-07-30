import React from 'react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { PageHero } from '@/components/ui/PageHero';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfoCard } from '@/components/contact/ContactInfoCard';
import { CONTACT_FAQ } from '@/data/contact';
import { useGSAPReveal } from '@/hooks/useGSAPReveal';

const ContactPage: React.FC = () => {
  usePageTitle('Contact');
  const ref = useGSAPReveal<HTMLDivElement>();

  return (
    <>
      <PageHero eyebrow="Contact" title="Let's Talk" subtitle="Placeholder copy — content pending." />

      <SectionWrapper size="sm">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10">
          <ContactForm />
          <ContactInfoCard />
        </div>
      </SectionWrapper>

      <SectionWrapper size="sm">
        <h2 className="text-[26px] md:text-[32px] font-bold text-white mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="max-w-[720px] mx-auto">
          <FAQAccordion items={CONTACT_FAQ} idPrefix="contact-faq" />
        </div>
      </SectionWrapper>
    </>
  );
};

export default ContactPage;
