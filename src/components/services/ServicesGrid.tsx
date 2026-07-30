import React from 'react';
import type { Service } from '@/types';
import { ServiceCard } from './ServiceCard';

interface ServicesGridProps {
  services: Service[];
}

/** Shared by the Home preview and the Services hub page. */
export const ServicesGrid: React.FC<ServicesGridProps> = ({ services }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {services.map((service) => (
      <ServiceCard key={service.slug} service={service} />
    ))}
  </div>
);
