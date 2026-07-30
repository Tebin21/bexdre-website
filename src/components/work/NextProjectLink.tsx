import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Project } from '@/types';

interface NextProjectLinkProps {
  project: Project;
}

export const NextProjectLink: React.FC<NextProjectLinkProps> = ({ project }) => (
  <Link
    to={`/work/${project.slug}`}
    className="group flex items-center justify-between gap-6 rounded-[28px] border border-white/[0.08] bg-[rgba(15,20,24,0.72)] backdrop-blur-xl p-8 hover:border-[rgba(36,172,124,0.25)] transition-all duration-300"
  >
    <div>
      <p className="text-[13px] font-bold uppercase tracking-widest text-white/50 mb-2">Next Project</p>
      <p className="text-[22px] md:text-[28px] font-bold text-white">{project.title}</p>
    </div>
    <ArrowRight
      size={28}
      className="text-[#24AC7C] shrink-0 group-hover:translate-x-1 transition-transform duration-300"
      aria-hidden="true"
    />
  </Link>
);
