import { TeamMember } from '../../../teamMember';

export interface IMentor {
    MentorshipId: number;
    MentorId: number;
    TeamMemberId: number;
    Mentor: TeamMember;
    TeamMember: TeamMember;
}

export class MentorDTO implements IMentor {
    MentorshipId: number;
    MentorId: number;
    TeamMemberId: number;
    Mentor: TeamMember;
    TeamMember: TeamMember;
}