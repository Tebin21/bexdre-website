import type { TeamMember } from '@/types';
import { PLACEHOLDER_COPY } from './placeholders';

export const TEAM_MEMBERS: TeamMember[] = [
  { id: 'team-member-1', name: 'Team Member 1', role: 'Founder & CEO', bio: PLACEHOLDER_COPY, initials: 'T1', isPlaceholder: true },
  { id: 'team-member-2', name: 'Team Member 2', role: 'Design Lead', bio: PLACEHOLDER_COPY, initials: 'T2', isPlaceholder: true },
  { id: 'team-member-3', name: 'Team Member 3', role: 'Engineering Lead', bio: PLACEHOLDER_COPY, initials: 'T3', isPlaceholder: true },
  { id: 'team-member-4', name: 'Team Member 4', role: 'Client Success', bio: PLACEHOLDER_COPY, initials: 'T4', isPlaceholder: true },
];
