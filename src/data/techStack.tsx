import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiTailwindcss,
  SiFigma,
  SiFlutter,
  SiSwift,
  SiShopify,
  SiWordpress,
  SiPostgresql,
  SiVercel,
} from 'react-icons/si';
import type { LogoItem } from '@/components/ui/LogoLoop';

export const TECH_STACK_LOGOS: LogoItem[] = [
  { node: <SiReact />, title: 'React' },
  { node: <SiNextdotjs />, title: 'Next.js' },
  { node: <SiTypescript />, title: 'TypeScript' },
  { node: <SiNodedotjs />, title: 'Node.js' },
  { node: <SiTailwindcss />, title: 'Tailwind CSS' },
  { node: <SiFigma />, title: 'Figma' },
  { node: <SiFlutter />, title: 'Flutter' },
  { node: <SiSwift />, title: 'Swift' },
  { node: <SiShopify />, title: 'Shopify' },
  { node: <SiWordpress />, title: 'WordPress' },
  { node: <SiPostgresql />, title: 'PostgreSQL' },
  { node: <SiVercel />, title: 'Vercel' },
];
