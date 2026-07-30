import { Home, Briefcase, FolderKanban, MoreHorizontal, User, Newspaper, Mail } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { NavItem } from '@/types';

// Fixed bar height (64px) + floating gap (12px) + breathing room (20px) above it.
// Kept as a single constant so the bar's own spacing and Layout's reserved content
// padding can never silently drift apart.
export const BOTTOM_NAV_RESERVED_PX = 96;

export type BottomNavTabId = 'home' | 'services' | 'work' | 'more';

export interface BottomNavTab {
  id: BottomNavTabId;
  label: string;
  to: string;
  icon: LucideIcon;
}

export const BOTTOM_NAV_TABS: BottomNavTab[] = [
  { id: 'home', label: 'Home', to: '/', icon: Home },
  { id: 'services', label: 'Services', to: '/services', icon: Briefcase },
  { id: 'work', label: 'Work', to: '/work', icon: FolderKanban },
  { id: 'more', label: 'More', to: '#', icon: MoreHorizontal },
];

/** Everything not covered by Home/Services/Work rolls up under the "More" tab. */
export function getActiveTabId(pathname: string): BottomNavTabId {
  if (pathname === '/') return 'home';
  if (pathname === '/services' || pathname.startsWith('/services/')) return 'services';
  if (pathname === '/work' || pathname.startsWith('/work/')) return 'work';
  return 'more';
}

export interface MoreLinkItem extends NavItem {
  icon: LucideIcon;
}

export const MORE_LINKS: MoreLinkItem[] = [
  { label: 'About', to: '/about', icon: User },
  { label: 'Insights', to: '/insights', icon: Newspaper },
  { label: 'Contact', to: '/contact', icon: Mail },
];
