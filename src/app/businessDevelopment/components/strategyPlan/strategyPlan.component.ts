import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalDirective } from 'ng2-bootstrap/modal';

import { StrategyPlanService, DropDownDataService, MarketingAdminService } from '../../services';
import { TeamMemberService, TeamMember } from '../../../teamMember/';
import { IStrategyPlan, DropDownData, IMentor } from '../../models';

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
    }
  }

  getMentorshipList(mentorId: number) {
    this.adminService.getMentorshipList(mentorId)
      .then((data: IMentor[]) => {
        this.mentorshipList = data;
      })
      .catch(this.handleError);
  }

  viewMenteePlan(teamMemberId: number) {
    this.getPlan(teamMemberId);
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
        this.setPlanForm(data);
      })
      .catch(this.handleError);
  }

  setPlanForm(plan: IStrategyPlan) {
    this.planView = true;
    this.strategyPlanForm = this.fb.group({
      PlanId: [plan.PlanId],
      TeamMemberId: [plan.TeamMemberId],
      MarketingMemberId: [plan.MarketingMemberId],
      Title: [plan.Title, [Validators.required, Validators.maxLength(75)]],
      KnownAsId: [plan.KnownAsId],
      Famous: [plan.Famous, Validators.maxLength(200)]
    });

    this.currentPlan = this.strategyPlanForm.value;

    if (this.currentPlan.PlanId > 0) {
      this.planExists = true;
      this.formTitle = 'Update';
    };
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
