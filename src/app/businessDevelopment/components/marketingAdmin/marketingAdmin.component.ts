import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TeamMemberService, TeamMember } from '../../../teamMember/';
import { MarketingAdminService } from '../../services/';
import { MentorDTO, IMentor } from '../../models/';

@Component({
  selector: 'app-marketing-admin',
  templateUrl: './marketingAdmin.component.html',
  styleUrls: ['./marketingAdmin.component.css']
})
export class MarketingAdminComponent implements OnInit {

  sideMenuItemId = 2; //Tell side menu the active menu index

  private teamMemberId: number;
  private mentorshipForm: FormGroup;
  private mentors: TeamMember[];
  private mentorshipList: IMentor[];
  private activeTeamMembers: TeamMember[];
  private mentorDTO = new MentorDTO();

  constructor(private fb: FormBuilder,
  private teamMember: TeamMemberService,
  private _sanitizer: DomSanitizer,
  private adminService: MarketingAdminService) { }

  ngOnInit() {
    this.teamMemberId = this.teamMember.teamMember.TeamMemberId;
    this.getMentors();
    this.getMentorshipList(this.teamMemberId);
    this.getActiveTeamMembers();
    this.setMarketingMemberForm();
  }

  getMentors() {
    this.adminService.getMentors()
    .then((data: TeamMember[]) => {
      this.mentors = data;
      console.log(this.mentors);
    })
    .catch(this.handleError);
  }

  getMentorshipList(mentorId: number) {
    this.adminService.getMentorshipList(mentorId)
    .then((data: IMentor[]) => {
      this.mentorshipList = data;
      console.log(this.mentorshipList);
    })
    .catch(this.handleError);
  }

  getActiveTeamMembers() {
    this.adminService.getActiveTeamMembers()
    .then((data: TeamMember[]) => this.activeTeamMembers = data)
    .catch(this.handleError);
  }

  setMarketingMemberForm() {
    this.mentorshipForm = this.fb.group({
      MentorshipId: 0,
      MentorId: this.teamMemberId,
      TeamMemberId: '',
    });
  }

  teamMemberListFormatter  = (data: any) : SafeHtml => {
    let html = `<span>${data.LastFirstName}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  mentorshipFormSubmit(value) {
    this.mapMentorship(value);
  }

  mapMentorship(formValue) {
    this.mentorDTO.MentorshipId = formValue.MentorshipId;
    this.mentorDTO.MentorId = formValue.MentorId;
    this.mentorDTO.TeamMemberId = formValue.TeamMemberId.TeamMemberId;
    if (this.isExistingMentorship(this.mentorDTO)) {
      alert('This mentorship already exists');
      return;
    } else {
      this.saveMentorship(this.mentorDTO);
    }
  }

  isExistingMentorship(mentorship): boolean{
    for (let index = 0; index < this.mentorshipList.length; index++) {
      if (mentorship.TeamMemberId === this.mentorshipList[index].TeamMemberId) {
        return true;
      }
    }
  }

  saveMentorship(mentorship) {
    this.adminService.createMentorship(mentorship)
    .then((data: IMentor) => {
      this.mentorshipList.push(data);
    })
    .catch(this.handleError);
  }

  removeMentorship(mentorshipId: number) {
    this.adminService.deleteMentorship(mentorshipId)
    .then(data => {
      this.mentorshipList.splice(this.findMentorshipIndex(mentorshipId), 1);
    })
    .catch(this.handleError);
  }

  findMentorshipIndex(mentorshipId: number) {
    for (let index = 0; index < this.mentorshipList.length; index ++) {
      if (mentorshipId === this.mentorshipList[index].MentorshipId) {
        return index;
      }
    }
  }
  private handleError(error: any) {
     let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
   }
}
