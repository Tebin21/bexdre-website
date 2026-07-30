import type { Value } from '@/types';
import { PLACEHOLDER_COPY, placeholderList } from './placeholders';

export const OUR_STORY_COPY: string[] = [PLACEHOLDER_COPY, PLACEHOLDER_COPY];
export const MISSION_COPY: string = PLACEHOLDER_COPY;

export const VALUES: Value[] = placeholderList('Placeholder Value', 4).map((title, i) => ({
  id: `value-${i + 1}`,
  title,
  description: PLACEHOLDER_COPY,
  isPlaceholder: true,
}));
