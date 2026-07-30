import type { Testimonial } from '@/types';
import { PLACEHOLDER_COPY } from './placeholders';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'client-a',
    quote: PLACEHOLDER_COPY,
    author: 'Client A',
    role: 'Placeholder Role',
    company: 'Placeholder Company',
    initials: 'CA',
    isPlaceholder: true,
  },
  {
    id: 'client-b',
    quote: PLACEHOLDER_COPY,
    author: 'Client B',
    role: 'Placeholder Role',
    company: 'Placeholder Company',
    initials: 'CB',
    isPlaceholder: true,
  },
  {
    id: 'client-c',
    quote: PLACEHOLDER_COPY,
    author: 'Client C',
    role: 'Placeholder Role',
    company: 'Placeholder Company',
    initials: 'CC',
    isPlaceholder: true,
  },
];
