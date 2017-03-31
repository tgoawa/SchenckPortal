import { Component, OnInit } from '@angular/core';

import { TeamMemberService, TeamMember } from '../../../teamMember/';

@Component({
  selector: 'app-individual-strategy-plan',
  templateUrl: './individualStrategyPlan.component.html',
  styleUrls: ['./individualStrategyPlan.component.css']
})
export class IndividualStrategyPlanComponent implements OnInit {

  sideMenuItemId = 2; //Tell side menu the active menu index
  private teamMemberId: number;
  
  constructor(private teamMemberService: TeamMemberService) { }

  ngOnInit() {
    this.teamMemberId = this.teamMemberService.teamMember.TeamMemberId;
  }

}
