import { Zap, MessageSquare, Cpu, Layers, HeartHandshake, type LucideIcon } from 'lucide-react';
import type { Differentiator } from '@/types';
import { PLACEHOLDER_COPY } from './placeholders';

export const DIFFERENTIATOR_ICON_MAP: Record<string, LucideIcon> = {
  'fast-delivery': Zap,
  'transparent-communication': MessageSquare,
  'modern-technologies': Cpu,
  'scalable-solutions': Layers,
  'long-term-support': HeartHandshake,
};

export const DIFFERENTIATORS: Differentiator[] = [
  { id: 'fast-delivery', icon: 'fast-delivery', title: 'Fast Delivery', description: PLACEHOLDER_COPY, isPlaceholder: true },
  { id: 'transparent-communication', icon: 'transparent-communication', title: 'Transparent Communication', description: PLACEHOLDER_COPY, isPlaceholder: true },
  { id: 'modern-technologies', icon: 'modern-technologies', title: 'Modern Technologies', description: PLACEHOLDER_COPY, isPlaceholder: true },
  { id: 'scalable-solutions', icon: 'scalable-solutions', title: 'Scalable Solutions', description: PLACEHOLDER_COPY, isPlaceholder: true },
  { id: 'long-term-support', icon: 'long-term-support', title: 'Long-Term Support', description: PLACEHOLDER_COPY, isPlaceholder: true },
];
