import type { NavItem, FooterLinkGroup } from '@/types';
import { SERVICES } from './services';

export const NAV_LINKS: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
];

export const LEGAL_LINKS: NavItem[] = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms of Service', to: '/terms-of-service' },
];

export const FOOTER_NAV_GROUPS: FooterLinkGroup[] = [
  { heading: 'Navigation', links: NAV_LINKS },
  {
    heading: 'Services',
    links: SERVICES.map((service) => ({ label: service.title, to: `/services/${service.slug}` })),
  },
];
