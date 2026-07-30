import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => (
  <nav aria-label="Breadcrumb">
    <ol className="flex flex-wrap items-center justify-center gap-2 text-[13px] text-white/55">
      {items.map((item, index) => (
        <li key={item.label} className="flex items-center gap-2">
          {index > 0 && <ChevronRight size={14} className="text-white/25" aria-hidden="true" />}
          {item.to ? (
            <Link to={item.to} className="hover:text-white/80 transition-colors duration-200">
              {item.label}
            </Link>
          ) : (
            <span aria-current="page" className="text-white/70">
              {item.label}
            </span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);
