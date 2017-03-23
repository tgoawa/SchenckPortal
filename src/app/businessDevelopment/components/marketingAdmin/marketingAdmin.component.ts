import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TeamMemberService } from '../../../teamMember/teamMember.service';

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

  public teamMemberList = [{
    id: 1,
    name: 'Test 1000'
  }, {
    id: 2,
    name: 'test 20001'
  }, {
    id: 3,
    name: 'test 30001'
  }
  ];

  constructor(private fb: FormBuilder, private teamMember: TeamMemberService, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.teamMemberId = this.teamMember.teamMember.TeamMemberId;
    this.setMarketingMemberForm();
    this.setTeamMemberForm();
  }

  setMarketingMemberForm() {
    this.marketingMemberList = this.fb.group({
      marketingMember: this.teamMemberId
    });
  }

  setTeamMemberForm() {
    this.teamMemberForm = this.fb.group({
      TeamMember: ''
    });
  }

  teamMemberListFormatter  = (data: any) : SafeHtml => {
    let html = `<span>${data.name}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  assignTeamMember(value) {
    console.log(value.TeamMember.id);
  }
}
