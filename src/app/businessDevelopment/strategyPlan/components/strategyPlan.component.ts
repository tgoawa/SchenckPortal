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
  private formTitle: string;
  private isMentorView = false;
  private isPlanView = false;
  private isPlanExists = false;
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

  // general view functionality

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
        this.determineFormToUse();
        this.setPlanForm();
      })
      .catch(this.handleError);
  }

  showConfirmModal() {
    this.savePlanModal.show();
  }

  hideConfirmModal() {
    this.savePlanModal.hide();
  }

  // setup the view for mentor or teammember
  setView(teamMember: TeamMember) {
    if (teamMember.IsMentor === true) {
      this.mentorPage(teamMember);
    } else {
      this.teamMemberPage(teamMember);
    }
  }

  mentorPage(teamMember: TeamMember) {
    this.isMentorView = true;
    this.getMentorshipList(teamMember.TeamMemberId);
    this.mentorId = teamMember.TeamMemberId;
  }

  teamMemberPage(teamMember: TeamMember) {
    this.isMentorView = false;
    this.getPlan(teamMember.TeamMemberId);
    this.mentorId = 0;
  }

  // Mentor view functionality

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

  // form functions

  determineFormToUse() {
    if (this.currentPlan.PlanId > 0) {
      this.isPlanView = true;
      this.isPlanExists = true;
      this.formTitle = 'Update';
    } else {
      this.isPlanExists = false;
      this.formTitle = 'Create';
      this.currentPlan.TeamMemberId = this.teamMember.TeamMemberId;
      this.currentPlan.MarketingMemberId = this.mentorId;
    }
  }

  setPlanForm() {
    this.strategyPlanForm = this.fb.group({
      PlanId: [this.currentPlan.PlanId],
      TeamMemberId: [this.currentPlan.TeamMemberId],
      MarketingMemberId: [this.currentPlan.MarketingMemberId],
      Title: [this.currentPlan.Title, [Validators.required, Validators.maxLength(75)]],
      KnownAsId: [this.currentPlan.KnownAsId],
      Famous: [this.currentPlan.Famous, Validators.maxLength(200)]
    });
  }

  createPlan({ value, valid }: { value: IStrategyPlan, valid: boolean }) {
    this.strategyPlanService.createPlan(value)
      .then((data: IStrategyPlan) => {
        console.log(data);
        this.currentPlan = data;
        this.determineFormToUse();
        this.setPlanForm();
      })
      .catch(this.handleError);
  }

  completePlan() {
    this.strategyPlanService.completePlan(this.currentPlan.PlanId);
    this.currentPlan.PlanId = 0;
    this.isPlanView = false;
    this.strategyPlanForm.reset();
    this.hideConfirmModal();
  }

  newPlan() {
    if (this.currentPlan.PlanId > 0) {
      this.isFormDirty();
      this.showConfirmModal();
    } else {
      this.isPlanView = true;
    }
  }

  isFormDirty() {
    if (this.strategyPlanForm.dirty === true) {
      alert('Please save changes before proceeding');
    }
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
