import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Project } from '@/types';
import { Badge } from '@/components/ui/Badge';

interface ProjectCardProps {
  project: Project;
}

/** Shared by the Home "Selected Projects" preview and the Work hub page. */
export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <Link
    to={`/work/${project.slug}`}
    className="project-card group block h-full rounded-[28px] overflow-hidden border border-white/[0.08] bg-[rgba(15,20,24,0.72)] backdrop-blur-md lg:backdrop-blur-xl transition-all duration-[420ms] ease-[cubic-bezier(.25,.46,.45,.94)] hover:-translate-y-2 hover:border-[rgba(36,172,124,0.25)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
  >
    <div
      className="h-[200px] w-full"
      style={{ background: `linear-gradient(135deg, ${project.imageColor}40 0%, ${project.imageColor}0d 100%)` }}
      aria-hidden="true"
    />
    <div className="p-7 flex flex-col gap-3">
      <Badge>{project.category}</Badge>
      <h3 className="text-[20px] font-bold text-white">{project.title}</h3>
      <p className="text-[15px] leading-[1.7] text-white/60">{project.shortDescription}</p>
      <span className="mt-2 inline-flex items-center gap-2 text-[14px] font-bold text-[#24AC7C] group-hover:gap-3 transition-all duration-300">
        View Case Study <ArrowRight size={16} aria-hidden="true" />
      </span>
    </div>
  </Link>
);
