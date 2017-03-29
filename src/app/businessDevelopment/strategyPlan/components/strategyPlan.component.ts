import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalDirective } from 'ng2-bootstrap/modal';

import { StrategyPlanService } from '../services/strategyPlan.service';
import { DropDownDataService } from '../../planLookups/services/dropDownData.service';
import { MarketingAdminService } from '../../marketingAdmin/services/marketingAdmin.service';
import { TeamMemberService, TeamMember } from '../../../teamMember/';
import { IStrategyPlan } from '../models/strategyPlan.model';
import { DropDownData } from '../../planLookups/models/dropDownData.model';
import { IMentor } from '../../marketingAdmin/models/mentor.dto';

@Component({
  selector: 'app-strategy-plan',
  templateUrl: './strategyPlan.component.html',
  styleUrls: ['./strategyPlan.component.css']
})
export class StrategyPlanComponent implements OnInit {
  @ViewChild('savePlanModal') public savePlanModal: ModalDirective;

  sideMenuItemId = 2; //Tell side menu the active menu index

  private teamMember: TeamMember;
  private knownAsLookup: DropDownData[];
  private formTitle = 'Create';
  private mentorView = false;
  private planView = false;
  private planExists = false;
  private mentorshipList: IMentor[];
  private strategyPlanForm: FormGroup;
  private currentPlan: IStrategyPlan;
  private mentorId: number;
  private currentTeamMember: string;

  constructor(private fb: FormBuilder,
    private dropDownData: DropDownDataService,
    private strategyPlanService: StrategyPlanService,
    private teamMemberService: TeamMemberService,
    private adminService: MarketingAdminService) { }

  ngOnInit() {
    this.teamMember = this.teamMemberService.teamMember;
    this.getKnownAsData();
    this.setView(this.teamMember);
  }

  isMentor(teamMember: TeamMember) {
    return teamMember.IsMentor;
  }

  setView(teamMember: TeamMember) {
    if (this.isMentor(teamMember)) {
      this.mentorView = true;
      this.getMentorshipList(teamMember.TeamMemberId);
      this.mentorId = teamMember.TeamMemberId;
    } else {
      this.mentorView = false;
      this.getPlan(teamMember.TeamMemberId);
    }
  }

  getMentorshipList(mentorId: number) {
    this.adminService.getMentorshipList(mentorId)
      .then((data: IMentor[]) => {
        this.mentorshipList = data;
      })
      .catch(this.handleError);
  }

  viewMenteePlan(teamMember: TeamMember) {
    this.getPlan(teamMember.TeamMemberId);
    this.currentTeamMember = teamMember.LastFirstName;
  }

  getKnownAsData(): DropDownData[] {
    this.dropDownData.getKnownAs()
      .then(data => this.knownAsLookup = data)
      .catch(this.handleError);
    return this.knownAsLookup;
  }

  getPlan(teamMemberId: number) {
    this.strategyPlanService.getPlan(teamMemberId)
      .then((data: IStrategyPlan) => {
        this.currentPlan = data;
        if (this.currentPlan.PlanId === 0) {
          this.currentPlan.TeamMemberId = teamMemberId;
          this.currentPlan.MarketingMemberId = this.mentorId;
        }
        this.setPlanForm(this.currentPlan);
      })
      .catch(this.handleError);
  }

  setPlanForm(plan: IStrategyPlan) {
    this.planView = true;
    this.strategyPlanForm = this.fb.group({
      PlanId: [plan.PlanId],
      TeamMemberId: [plan.TeamMemberId],
      MarketingMemberId: 100,
      Title: [plan.Title, [Validators.required, Validators.maxLength(75)]],
      KnownAsId: [plan.KnownAsId],
      Famous: [plan.Famous, Validators.maxLength(200)]
    });

    if (this.currentPlan.PlanId > 0) {
      this.planExists = true;
      this.formTitle = 'Update';
    } else {
      this.planExists = false;
      this.formTitle = 'Create';
    }
  }

 createPlan({ value, valid }: { value: IStrategyPlan, valid: boolean }) {
    this.strategyPlanService.createPlan(value)
      .then((data: IStrategyPlan) => {
        console.log(data);
        this.currentPlan = data;
        this.setPlanForm(this.currentPlan);
      })
      .catch(this.handleError);
  }

  // completePlan(planId: number) {
  //   this.strategyPlanService.completePlan(planId)
  //   .then(this.getPlan())
  //   this.hideConfirmModal();
  // }

  newPlan() {
    if (this.currentPlan.PlanId > 0) {
      this.showConfirmModal();
    } else {
      //confirm plan functionality
    }
  }

  showConfirmModal() {
    this.savePlanModal.show();
  }

  hideConfirmModal() {
    this.savePlanModal.hide();
  }
  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
