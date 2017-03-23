import { Component, OnInit } from '@angular/core';
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
  
  constructor(private fb: FormBuilder, private teamMember: TeamMemberService) { }

  ngOnInit() {
    this.teamMemberId = this.teamMember.teamMember.TeamMemberId;
    this.setMarketingMemberForm();
  }

  setMarketingMemberForm() {
    this.marketingMemberList = this.fb.group({
      marketingMember: this.teamMemberId
    });
  }
}
