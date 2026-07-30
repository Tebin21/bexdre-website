import type { ContactInfo, SocialLink, ServiceFAQItem } from '@/types';
import { PLACEHOLDER_COPY, placeholderList } from './placeholders';

// TODO: real social handles — hrefs are intentionally '#' until accounts exist.
export const SOCIAL_LINKS: SocialLink[] = [
  { id: 'x', label: 'X (Twitter)', href: '#' },
  { id: 'linkedin', label: 'LinkedIn', href: '#' },
  { id: 'instagram', label: 'Instagram', href: '#' },
  { id: 'github', label: 'GitHub', href: '#' },
];

export const CONTACT_INFO: ContactInfo = {
  email: 'hello@bexdre.com', // TODO: confirm real inbox
  phone: '+1 (555) 010-0100', // 555-prefixed placeholder number
  whatsapp: '#', // TODO: real WhatsApp business number/link — no account exists yet.
  scheduleMeetingUrl: '#', // TODO: real scheduling link (Calendly/Cal.com) — no integration exists yet.
  offices: [
    {
      label: 'Headquarters',
      addressLines: ['Placeholder Street Address', 'Placeholder City, State ZIP'],
      isPlaceholder: true,
    },
  ],
  socials: SOCIAL_LINKS,
  isPlaceholder: true,
};

export const CONTACT_FAQ: ServiceFAQItem[] = placeholderList('Placeholder question', 4).map((q) => ({
  question: `${q}?`,
  answer: PLACEHOLDER_COPY,
}));
