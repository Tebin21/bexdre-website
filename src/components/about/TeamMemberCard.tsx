import React from 'react';
import type { TeamMember } from '@/types';
import { GlassCard } from '@/components/ui/GlassCard';

interface TeamMemberCardProps {
  member: TeamMember;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => (
  <GlassCard className="team-member-card flex flex-col items-center text-center gap-4">
    <span className="w-16 h-16 rounded-full flex items-center justify-center text-[18px] font-bold text-white bg-gradient-to-br from-[#24AC7C] to-[#1a8a62]">
      {member.initials}
    </span>
    <div>
      <p className="text-[17px] font-bold text-white">{member.name}</p>
      <p className="text-[13px] text-[#24AC7C] font-bold uppercase tracking-wide mt-1">{member.role}</p>
    </div>
    <p className="text-[14px] leading-[1.7] text-white/55">{member.bio}</p>
  </GlassCard>
);
