import React, { useState, useMemo } from 'react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { PageHero } from '@/components/ui/PageHero';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { CategoryFilterTabs } from '@/components/ui/CategoryFilterTabs';
import { CTASection } from '@/components/ui/CTASection';
import { ProjectCard } from '@/components/work/ProjectCard';
import { PROJECTS } from '@/data/projects';
import { useGSAPReveal } from '@/hooks/useGSAPReveal';

const CATEGORIES = Array.from(new Set(PROJECTS.map((project) => project.category)));

const WorkHubPage: React.FC = () => {
  usePageTitle('Work');
  const [active, setActive] = useState('All');
  const ref = useGSAPReveal<HTMLDivElement>({ selector: '.project-card', stagger: 0.08 });

  const filtered = useMemo(
    () => (active === 'All' ? PROJECTS : PROJECTS.filter((project) => project.category === active)),
    [active],
  );

  return (
    <>
      <PageHero eyebrow="Work" title="Selected Case Studies" subtitle="Placeholder copy — content pending." />
      <SectionWrapper size="sm">
        <div className="mb-12">
          <CategoryFilterTabs categories={CATEGORIES} active={active} onChange={setActive} />
        </div>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </SectionWrapper>
      <CTASection />
    </>
  );
};

export default WorkHubPage;
