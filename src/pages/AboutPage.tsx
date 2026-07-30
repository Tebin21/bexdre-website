import React from 'react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { PageHero } from '@/components/ui/PageHero';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTASection } from '@/components/ui/CTASection';
import { GlassCard } from '@/components/ui/GlassCard';
import { TeamMemberCard } from '@/components/about/TeamMemberCard';
import { OUR_STORY_COPY, MISSION_COPY, VALUES } from '@/data/about';
import { TEAM_MEMBERS } from '@/data/team';
import { useGSAPReveal } from '@/hooks/useGSAPReveal';

const AboutPage: React.FC = () => {
  usePageTitle('About');
  const storyRef = useGSAPReveal<HTMLDivElement>();
  const valuesRef = useGSAPReveal<HTMLDivElement>({ selector: '.value-card', stagger: 0.08 });
  const teamRef = useGSAPReveal<HTMLDivElement>({ selector: '.team-member-card', stagger: 0.08 });

  return (
    <>
      <PageHero eyebrow="About" title="About BEXDRE" subtitle="Placeholder copy — content pending." />

      <SectionWrapper size="sm">
        <div ref={storyRef} className="max-w-[820px] mx-auto flex flex-col gap-16">
          <div>
            <h2 className="text-[26px] md:text-[32px] font-bold text-white mb-4">Our Story</h2>
            {OUR_STORY_COPY.map((paragraph, i) => (
              <p key={i} className="text-[16px] leading-[1.8] text-white/65 mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>

          <div>
            <h2 className="text-[26px] md:text-[32px] font-bold text-white mb-4">Mission</h2>
            <p className="text-[16px] leading-[1.8] text-white/65">{MISSION_COPY}</p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper size="sm">
        <SectionHeading eyebrow="Values" title="What We Stand For" className="mb-16" />
        <div ref={valuesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((value) => (
            <GlassCard key={value.id} className="value-card flex flex-col gap-3">
              <h3 className="text-[17px] font-bold text-white">{value.title}</h3>
              <p className="text-[14px] leading-[1.7] text-white/60">{value.description}</p>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper size="sm">
        <SectionHeading eyebrow="Team" title="Meet the Team" className="mb-16" />
        <div ref={teamRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </SectionWrapper>

      <CTASection />
    </>
  );
};

export default AboutPage;
