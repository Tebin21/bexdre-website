import React from 'react';
import { Quote } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { TESTIMONIALS } from '@/data/testimonials';
import { useGSAPReveal } from '@/hooks/useGSAPReveal';

export const TestimonialsSection: React.FC = () => {
  const ref = useGSAPReveal<HTMLDivElement>({ selector: '.testimonial-card', stagger: 0.1 });

  return (
    <SectionWrapper>
      <SectionHeading eyebrow="Testimonials" title="What Clients Say" className="mb-16" />
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((testimonial) => (
          <GlassCard key={testimonial.id} className="testimonial-card flex flex-col gap-6">
            <Quote size={28} className="text-[#24AC7C]" aria-hidden="true" />
            <p className="text-[15px] leading-[1.7] text-white/70 flex-1">{testimonial.quote}</p>
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center text-[13px] font-bold text-white bg-gradient-to-br from-[#24AC7C] to-[#1a8a62]">
                {testimonial.initials}
              </span>
              <div>
                <p className="text-[14px] font-bold text-white">{testimonial.author}</p>
                <p className="text-[13px] text-white/50">
                  {testimonial.role} · {testimonial.company}
                </p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
};
