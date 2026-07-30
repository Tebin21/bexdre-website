import React from 'react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ProjectCard } from '@/components/work/ProjectCard';
import { FEATURED_PROJECTS } from '@/data/projects';
import { useGSAPReveal } from '@/hooks/useGSAPReveal';

export const SelectedProjectsSection: React.FC = () => {
  const ref = useGSAPReveal<HTMLDivElement>({ selector: '.project-card', stagger: 0.1 });

  return (
    <SectionWrapper>
      <SectionHeading eyebrow="Our Work" title="Selected Projects" className="mb-16" />
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FEATURED_PROJECTS.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <Button to="/work" variant="ghost" size="md">
          View All Projects
        </Button>
      </div>
    </SectionWrapper>
  );
};
