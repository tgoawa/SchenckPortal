import { Component, OnInit } from '@angular/core';

import { IMentor } from '../../marketingAdmin/models/mentor.dto';
import { MarketingAdminService } from '../../marketingAdmin/services/marketingAdmin.service';
import { TeamMemberService, TeamMember } from '../../../teamMember/';

@Component({
  selector: 'app-mentor-strategy-plan',
  templateUrl: './mentorStrategyPlan.component.html',
  styleUrls: ['./mentorStrategyPlan.component.css']
})
export class MentorStrategyPlanComponent implements OnInit {

  sideMenuItemId = 3; //Tell side menu the active menu index

  private teamMemberId: number;
  private mentorshipList: IMentor[];
  private menteeId: number;
  private menteeName: string;
  private viewPlan = false;

  constructor(private adminService: MarketingAdminService, private teamMemberService: TeamMemberService) { }

  ngOnInit() {
    this.teamMemberId = this.teamMemberService.teamMember.TeamMemberId;
    this.getMentorShipList();
  }

  getMentorShipList() {
    this.adminService.getMentorshipList(this.teamMemberId)
    .then((data: IMentor[]) => this.mentorshipList = data)
    .catch(this.handleError);
  }

  onViewMenteePlan(mentee: TeamMember) {
    this.viewPlan = true;
    this.menteeId = mentee.TeamMemberId;
    this.menteeName = mentee.LastFirstName;
  }

  private handleError(error: any) {
     let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
   }
}
