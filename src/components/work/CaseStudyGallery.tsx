import React from 'react';
import type { ProjectGalleryItem } from '@/types';

interface CaseStudyGalleryProps {
  items: ProjectGalleryItem[];
}

export const CaseStudyGallery: React.FC<CaseStudyGalleryProps> = ({ items }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {items.map((item, index) => (
      <div
        key={index}
        className="h-[160px] rounded-2xl flex items-end p-4 border border-white/[0.08]"
        style={{ background: `linear-gradient(135deg, ${item.imageColor}40 0%, ${item.imageColor}0d 100%)` }}
      >
        <span className="text-[12px] text-white/50">{item.caption}</span>
      </div>
    ))}
  </div>
);
