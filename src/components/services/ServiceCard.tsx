import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/types';
import { SERVICE_BACKGROUND_MAP } from '@/data/services';
import { GlassCard } from '@/components/ui/GlassCard';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const Background = SERVICE_BACKGROUND_MAP[service.icon];

  return (
    <Link to={`/services/${service.slug}`} className="service-card block group h-full">
      <GlassCard className="h-full relative overflow-hidden">
        {Background && <Background />}
        <div className="relative z-10 flex flex-col gap-5 h-full">
          <div className="flex flex-col gap-2">
            <h3 className="text-[20px] font-bold text-white">{service.title}</h3>
            <p className="text-[15px] leading-[1.7] text-white/60">{service.shortDescription}</p>
          </div>
          <span className="mt-auto inline-flex items-center gap-2 text-[14px] font-bold text-[#24AC7C] group-hover:gap-3 transition-all duration-300">
            Learn more <ArrowRight size={16} aria-hidden="true" />
          </span>
        </div>
      </GlassCard>
    </Link>
  );
};
