import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TeamMemberService, TeamMember } from '../../../teamMember/';
import { MarketingAdminService } from '../../services/';

@Component({
  selector: 'app-marketing-admin',
  templateUrl: './marketingAdmin.component.html',
  styleUrls: ['./marketingAdmin.component.css']
})
export class MarketingAdminComponent implements OnInit {

  sideMenuItemId = 2; //Tell side menu the active menu index

  private teamMemberId: number;
  private marketingMemberList: FormGroup;
  private teamMemberForm: FormGroup;
  private mentors: TeamMember[];
  private activeTeamMembers: TeamMember[];

  constructor(private fb: FormBuilder,
  private teamMember: TeamMemberService,
  private _sanitizer: DomSanitizer,
  private adminService: MarketingAdminService) { }

  ngOnInit() {
    this.teamMemberId = this.teamMember.teamMember.TeamMemberId;
    this.getMentors();
    this.getActiveTeamMembers();
    this.setMarketingMemberForm();
    this.setTeamMemberForm();
  }

  getMentors() {
    this.adminService.getMentors()
    .then((data: TeamMember[]) => this.mentors = data)
    .catch(this.handleError);
  }

  getActiveTeamMembers() {
    this.adminService.getActiveTeamMembers()
    .then((data: TeamMember[]) => this.activeTeamMembers = data)
    .catch(this.handleError);
  }

  setMarketingMemberForm() {
    this.marketingMemberList = this.fb.group({
      marketingMember: this.teamMemberId,
    });
  }

  setTeamMemberForm() {
    this.teamMemberForm = this.fb.group({
      TeamMember: ''
    });
  }

  teamMemberListFormatter  = (data: any) : SafeHtml => {
    let html = `<span>${data.LastFirstName}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  assignTeamMember(value) {
    console.log(value.TeamMember.TeamMemberId);
  }

  private handleError(error: any) {
     let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
   }
}
