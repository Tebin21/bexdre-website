import type React from 'react';
import {
  Globe,
  Smartphone,
  Building2,
  Palette,
  Megaphone,
  ShoppingCart,
  type LucideIcon,
} from 'lucide-react';
import type { Service } from '@/types';
import { PLACEHOLDER_COPY, placeholderList } from './placeholders';
import { WebDevBackground } from '@/components/services/card-backgrounds/WebDevBackground';
import { MobileAppsBackground } from '@/components/services/card-backgrounds/MobileAppsBackground';
import { BusinessSystemsBackground } from '@/components/services/card-backgrounds/BusinessSystemsBackground';
import { UiUxBackground } from '@/components/services/card-backgrounds/UiUxBackground';
import { BrandingBackground } from '@/components/services/card-backgrounds/BrandingBackground';
import { EcommerceBackground } from '@/components/services/card-backgrounds/EcommerceBackground';

export const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  'web-development': Globe,
  'mobile-apps': Smartphone,
  'business-systems': Building2,
  'ui-ux-design': Palette,
  branding: Megaphone,
  'e-commerce': ShoppingCart,
};

export const SERVICE_BACKGROUND_MAP: Record<string, React.FC> = {
  'web-development': WebDevBackground,
  'mobile-apps': MobileAppsBackground,
  'business-systems': BusinessSystemsBackground,
  'ui-ux-design': UiUxBackground,
  branding: BrandingBackground,
  'e-commerce': EcommerceBackground,
};

function buildService(slug: string, icon: string, title: string): Service {
  return {
    slug,
    icon,
    title,
    shortDescription: PLACEHOLDER_COPY,
    overview: PLACEHOLDER_COPY,
    features: placeholderList('Placeholder feature', 4),
    technologies: placeholderList('Technology', 5),
    benefits: placeholderList('Placeholder benefit', 4),
    faq: placeholderList('Placeholder question', 3).map((q) => ({
      question: `${q}?`,
      answer: PLACEHOLDER_COPY,
    })),
    isPlaceholder: true,
  };
}

export const SERVICES: Service[] = [
  buildService('web-development', 'web-development', 'Web Development'),
  buildService('mobile-apps', 'mobile-apps', 'Mobile Apps'),
  buildService('business-systems', 'business-systems', 'Business Systems'),
  buildService('ui-ux-design', 'ui-ux-design', 'UI/UX Design'),
  buildService('branding', 'branding', 'Branding'),
  buildService('e-commerce', 'e-commerce', 'E-Commerce'),
];

export function getServiceBySlug(slug: string | undefined): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
