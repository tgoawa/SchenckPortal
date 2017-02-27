import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { TeamMember, TeamMemberService } from './';

import { Cookie } from 'ng2-cookies';

@Injectable()
export class TeamMemberResolver implements Resolve<TeamMember> {
    constructor(private service: TeamMemberService) {}

    resolve() {
        let userName = Cookie.get('user');
        return this.service.getTeamMember(userName);
    }
}
