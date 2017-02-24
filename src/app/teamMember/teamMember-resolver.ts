import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { TeamMember, TeamMemberService } from './';

@Injectable()
export class TeamMemberResolver implements Resolve<TeamMember> {
    constructor(private service: TeamMemberService) {}

    resolve() {
        let userName = localStorage.getItem('user');
        return this.service.getTeamMember(userName);
    }
}
