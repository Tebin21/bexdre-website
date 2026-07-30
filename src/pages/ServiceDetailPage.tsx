import React from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { getServiceBySlug } from '@/data/services';
import { PageHero } from '@/components/ui/PageHero';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Badge } from '@/components/ui/Badge';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { CTASection } from '@/components/ui/CTASection';
import { useGSAPReveal } from '@/hooks/useGSAPReveal';
import NotFoundPage from './NotFoundPage';

const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug);

  usePageTitle(service ? service.title : 'Service Not Found');
  const revealRef = useGSAPReveal<HTMLDivElement>({ selector: '.reveal-item', stagger: 0.1 });

  if (!service) return <NotFoundPage />;

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.title}
        subtitle={service.shortDescription}
        breadcrumbs={[{ label: 'Services', to: '/services' }, { label: service.title }]}
      />

      <SectionWrapper size="sm">
        <div ref={revealRef} className="max-w-[820px] mx-auto flex flex-col gap-16">
          <div className="reveal-item">
            <h2 className="text-[26px] md:text-[32px] font-bold text-white mb-4">Overview</h2>
            <p className="text-[16px] leading-[1.8] text-white/65">{service.overview}</p>
          </div>

          <div className="reveal-item">
            <h2 className="text-[26px] md:text-[32px] font-bold text-white mb-6">Features</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-[#24AC7C] shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-[15px] leading-[1.7] text-white/70">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal-item">
            <h2 className="text-[26px] md:text-[32px] font-bold text-white mb-6">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>

          <div className="reveal-item">
            <h2 className="text-[26px] md:text-[32px] font-bold text-white mb-6">Benefits</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-[#24AC7C] shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-[15px] leading-[1.7] text-white/70">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal-item">
            <h2 className="text-[26px] md:text-[32px] font-bold text-white mb-6">FAQ</h2>
            <FAQAccordion items={service.faq} idPrefix={`service-${service.slug}`} />
          </div>
        </div>
      </SectionWrapper>

      <CTASection />
    </>
  );
};

export default ServiceDetailPage;
