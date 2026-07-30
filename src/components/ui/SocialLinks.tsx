import React from 'react';
import type { SocialLink } from '@/types';

const MONOGRAM_MAP: Record<string, string> = {
  x: 'X',
  linkedin: 'in',
  instagram: 'IG',
  github: 'GH',
};

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ links, className = '' }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    {links.map((social) => {
      const monogram = MONOGRAM_MAP[social.id] ?? social.label.slice(0, 2).toUpperCase();
      return (
        <a
          key={social.id}
          href={social.href}
          // The visible monogram must be a substring of the accessible name (WCAG 2.5.3
          // Label in Name), otherwise voice-control users saying "click IG" get no match.
          aria-label={`${monogram} — ${social.label}`}
          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white/80 bg-white/[0.06] border border-white/[0.08] hover:bg-white/10 hover:border-[rgba(36,172,124,0.3)] hover:text-white hover:scale-110 transition-all duration-200"
        >
          {monogram}
        </a>
      );
    })}
  </div>
);
