import type { ProcessStep } from '@/types';
import { PLACEHOLDER_COPY } from './placeholders';

export const PROCESS_STEPS: ProcessStep[] = [
  { step: 1, letter: 'D', word: 'Discover', description: PLACEHOLDER_COPY, isPlaceholder: true },
  { step: 2, letter: 'P', word: 'Plan', description: PLACEHOLDER_COPY, isPlaceholder: true },
  { step: 3, letter: 'D', word: 'Design', description: PLACEHOLDER_COPY, isPlaceholder: true },
  { step: 4, letter: 'B', word: 'Build', description: PLACEHOLDER_COPY, isPlaceholder: true },
  { step: 5, letter: 'L', word: 'Launch', description: PLACEHOLDER_COPY, isPlaceholder: true },
  { step: 6, letter: 'S', word: 'Support', description: PLACEHOLDER_COPY, isPlaceholder: true },
];
