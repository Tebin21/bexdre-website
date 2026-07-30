import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { CONTACT_INFO } from '@/data/contact';

export const ContactInfoCard: React.FC = () => (
  <GlassCard className="flex flex-col gap-8">
    <div className="flex items-start gap-4">
      <Mail size={20} className="text-[#24AC7C] mt-1 shrink-0" aria-hidden="true" />
      <div>
        <p className="text-[13px] font-bold uppercase tracking-widest text-white/50 mb-1">Email</p>
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="text-[15px] text-white hover:text-[#24AC7C] transition-colors duration-200"
        >
          {CONTACT_INFO.email}
        </a>
      </div>
    </div>

    <div className="flex items-start gap-4">
      <Phone size={20} className="text-[#24AC7C] mt-1 shrink-0" aria-hidden="true" />
      <div>
        <p className="text-[13px] font-bold uppercase tracking-widest text-white/50 mb-1">Phone</p>
        <a
          href={`tel:${CONTACT_INFO.phone}`}
          className="text-[15px] text-white hover:text-[#24AC7C] transition-colors duration-200"
        >
          {CONTACT_INFO.phone}
        </a>
      </div>
    </div>

    {CONTACT_INFO.offices.map((office) => (
      <div key={office.label} className="flex items-start gap-4">
        <MapPin size={20} className="text-[#24AC7C] mt-1 shrink-0" aria-hidden="true" />
        <div>
          <p className="text-[13px] font-bold uppercase tracking-widest text-white/50 mb-1">{office.label}</p>
          {office.addressLines.map((line) => (
            <p key={line} className="text-[15px] text-white/70">
              {line}
            </p>
          ))}
        </div>
      </div>
    ))}

    <div>
      <p className="text-[13px] font-bold uppercase tracking-widest text-white/50 mb-3">Follow Us</p>
      <SocialLinks links={CONTACT_INFO.socials} />
    </div>
  </GlassCard>
);
