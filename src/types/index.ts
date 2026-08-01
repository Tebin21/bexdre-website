// Shared TypeScript types for BEXDRE website

export interface NavItem {
  label: string;
  to: string;
}

// ─── Services ───

export interface ServiceFAQItem {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  icon: string;
  title: string;
  shortDescription: string;
  overview: string;
  features: string[];
  technologies: string[];
  benefits: string[];
  faq: ServiceFAQItem[];
  isPlaceholder: true;
}

// ─── Process ───

export interface ProcessStep {
  letter: string;
  word: string;
  description: string;
  step: number;
  isPlaceholder?: boolean;
}

// ─── Work / Case Studies ───

export interface ProjectResultMetric {
  label: string;
  value: string;
}

export interface ProjectGalleryItem {
  imageColor: string;
  caption: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  imageColor: string;
  shortDescription: string;
  overview: string;
  problem: string;
  solution: string;
  technologies: string[];
  gallery: ProjectGalleryItem[];
  results: ProjectResultMetric[];
  featured: boolean;
  isPlaceholder: true;
}

// ─── Why BEXDRE ───

export interface Differentiator {
  id: string;
  icon: string;
  title: string;
  description: string;
  isPlaceholder: true;
}

// ─── Insights ───

export type InsightCategory = 'Articles' | 'Tutorials' | 'Company News' | 'Technology';

export interface InsightArticle {
  slug: string;
  title: string;
  category: InsightCategory;
  excerpt: string;
  body: string[];
  author: string;
  publishedAt: string;
  readTimeMinutes: number;
  featured: boolean;
  isPlaceholder: true;
}

// ─── About ───

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  isPlaceholder: true;
}

export interface Value {
  id: string;
  title: string;
  description: string;
  isPlaceholder: true;
}

// ─── Contact ───

export interface OfficeInfo {
  label: string;
  addressLines: string[];
  isPlaceholder: true;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  scheduleMeetingUrl: string;
  offices: OfficeInfo[];
  socials: SocialLink[];
  isPlaceholder: true;
}

// ─── Footer ───

export interface FooterLinkGroup {
  heading: string;
  links: NavItem[];
}
