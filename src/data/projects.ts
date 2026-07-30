import type { Project } from '@/types';
import { PLACEHOLDER_COPY, placeholderList } from './placeholders';

function buildProject(
  slug: string,
  title: string,
  category: string,
  imageColor: string,
  featured: boolean,
): Project {
  return {
    slug,
    title,
    category,
    imageColor,
    shortDescription: PLACEHOLDER_COPY,
    overview: PLACEHOLDER_COPY,
    problem: PLACEHOLDER_COPY,
    solution: PLACEHOLDER_COPY,
    technologies: placeholderList('Technology', 5),
    gallery: placeholderList('Visual placeholder', 3).map((caption) => ({
      imageColor,
      caption,
    })),
    results: [
      { label: 'Performance', value: '—' },
      { label: 'Engagement', value: '—' },
      { label: 'Delivery Time', value: 'Pending' },
    ],
    featured,
    isPlaceholder: true,
  };
}

export const PROJECTS: Project[] = [
  buildProject('ecommerce-platform-redesign', 'E-Commerce Platform Redesign', 'E-Commerce', '#24AC7C', true),
  buildProject('business-management-system', 'Business Management System', 'Business Systems', '#2B8FC8', true),
  buildProject('mobile-app-experience', 'Mobile App Experience', 'Mobile Apps', '#C8862B', true),
  buildProject('brand-identity-system', 'Brand Identity System', 'Branding', '#C82B6B', true),
  buildProject('product-ui-ux-overhaul', 'Product UI/UX Overhaul', 'UI/UX Design', '#2BC8B0', false),
  buildProject('enterprise-web-platform', 'Enterprise Web Platform', 'Web Development', '#8B5CF6', false),
];

export const FEATURED_PROJECTS: Project[] = PROJECTS.filter((project) => project.featured);

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getAdjacentProject(currentSlug: string): Project {
  const index = PROJECTS.findIndex((project) => project.slug === currentSlug);
  const nextIndex = index === -1 ? 0 : (index + 1) % PROJECTS.length;
  return PROJECTS[nextIndex];
}
