export interface IMentor {
    MentorshipId: number;
    MentorId: number;
    TeamMemberId: number;
}

export class MentorDTO implements IMentor {
    MentorshipId: number;
    MentorId: number;
    TeamMemberId: number;
}