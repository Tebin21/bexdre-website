import React from 'react';
import { useParams } from 'react-router-dom';
import { usePageTitle } from '@/hooks/usePageTitle';
import { getProjectBySlug, getAdjacentProject } from '@/data/projects';
import { PageHero } from '@/components/ui/PageHero';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Badge } from '@/components/ui/Badge';
import { CaseStudyGallery } from '@/components/work/CaseStudyGallery';
import { ResultsStats } from '@/components/work/ResultsStats';
import { NextProjectLink } from '@/components/work/NextProjectLink';
import { useGSAPReveal } from '@/hooks/useGSAPReveal';
import NotFoundPage from './NotFoundPage';

const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);

  usePageTitle(project ? project.title : 'Case Study Not Found');
  const revealRef = useGSAPReveal<HTMLDivElement>({ selector: '.reveal-item', stagger: 0.1 });

  if (!project) return <NotFoundPage />;

  const nextProject = getAdjacentProject(project.slug);

  return (
    <>
      <PageHero
        eyebrow={project.category}
        title={project.title}
        subtitle={project.shortDescription}
        breadcrumbs={[{ label: 'Work', to: '/work' }, { label: project.title }]}
      />

      <SectionWrapper size="sm">
        <div ref={revealRef} className="max-w-[820px] mx-auto flex flex-col gap-16">
          <div className="reveal-item">
            <h2 className="text-[26px] md:text-[32px] font-bold text-white mb-4">Overview</h2>
            <p className="text-[16px] leading-[1.8] text-white/65">{project.overview}</p>
          </div>

          <div className="reveal-item grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div>
              <h2 className="text-[22px] font-bold text-white mb-4">Problem</h2>
              <p className="text-[15px] leading-[1.8] text-white/65">{project.problem}</p>
            </div>
            <div>
              <h2 className="text-[22px] font-bold text-white mb-4">Solution</h2>
              <p className="text-[15px] leading-[1.8] text-white/65">{project.solution}</p>
            </div>
          </div>

          <div className="reveal-item">
            <h2 className="text-[26px] md:text-[32px] font-bold text-white mb-6">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>

          <div className="reveal-item">
            <h2 className="text-[26px] md:text-[32px] font-bold text-white mb-6">Gallery</h2>
            <CaseStudyGallery items={project.gallery} />
          </div>

          <div className="reveal-item">
            <h2 className="text-[26px] md:text-[32px] font-bold text-white mb-6">Results</h2>
            <ResultsStats metrics={project.results} />
          </div>

          <div className="reveal-item">
            <NextProjectLink project={nextProject} />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
};

export default CaseStudyDetailPage;
