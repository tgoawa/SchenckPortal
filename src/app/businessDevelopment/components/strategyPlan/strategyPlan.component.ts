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

  private mentorMode = false;
  private planMode = false;
  private displayPlanHeader = false;
  private strategyPlanForm: FormGroup;
  private teamMember: TeamMember;
  private marketingMemberId: number;
  private currentStrategyPlan: IStrategyPlan;
  private knownAsLookup: DropDownData[];
  private mentorshipList: IMentor[];
  private menteeId: number;
  private mentorId = 0;
  private formTitle = 'Create';


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

  setView(teamMember: TeamMember) {
    if (this.isMentor(teamMember)) {
      this.getMentorshipList(teamMember.TeamMemberId);
      this.mentorId = this.teamMember.TeamMemberId;
      this.mentorMode = true;
    } else {
      this.getPlan(teamMember.TeamMemberId);
      this.planMode = true;
    }
  }

  startNewPlan() {
    if (this.strategyPlanForm !== undefined) {
      this.showConfirmModal();
    } else {
      this.displayPlanHeader = true;
      this.formTitle = 'Create';
      this.setForm();
    }
  }

  startEditPlan(plan: IStrategyPlan) {
    this.displayPlanHeader = true;
    this.formTitle = 'Update';
    this.strategyPlanForm = this.fb.group({
      PlanId: [plan.PlanId],
      TeamMemberId: [plan.TeamMemberId],
      MarketingMemberId: [plan.MarketingMemberId],
      Title: [plan.Title, [Validators.required, Validators.maxLength(75)]],
      KnownAsId: [plan.KnownAsId],
      Famous: [plan.Famous, Validators.maxLength(200)]
    });
  }

  getKnownAsData(): DropDownData[] {
      this.dropDownData.getKnownAs()
        .then(data => this.knownAsLookup = data)
        .catch(this.handleError);
    return this.knownAsLookup;
  }

  getPlan(teamMemberId: number)  {
    this.strategyPlanService.getPlan(teamMemberId)
    .then((data: IStrategyPlan) => {
      this.currentStrategyPlan = data;
       this.displayCurrentPlan(data);
    })
    .catch(this.handleError);
  }

  getMentorshipList(teamMemberId: number) {
    this.adminService.getMentorshipList(teamMemberId)
    .then((data: IMentor[]) => this.mentorshipList = data)
    .catch(this.handleError);
  }

  displayCurrentPlan(plan: IStrategyPlan) {
    if (this.isCurrentPlanAvailable(plan)) {
      this.startEditPlan(plan);
    }
  }

  createPlan({ value, valid }: { value: IStrategyPlan, valid: boolean }) {
    if (value.PlanId === 0) {
      this.strategyPlanService.createPlan(value)
      .then((data: IStrategyPlan) => this.displayCurrentPlan(data))
      .catch(this.handleError);
    } else {
      this.strategyPlanService.updatePlan(value)
    .then(data => this.currentStrategyPlan = data)
    .catch(this.handleError);
    }
  }
  
  isMentor(teamMember): boolean {
    return this.teamMember.IsMentor;
  }

  isCurrentPlanAvailable(plan: IStrategyPlan): boolean {
    return plan.PlanId > 0;
  }

  showConfirmModal() {
    this.savePlanModal.show();
  }

  hideConfirmModal() {
    this.savePlanModal.hide();
  }

  viewPlan(menteeId: number) {
    this.menteeId = menteeId;
    this.planMode = true;
    this.getPlan(this.menteeId);
  }

  setForm() {
    this.strategyPlanForm = this.fb.group({
        PlanId: [0],
        TeamMemberId: [this.menteeId],
        MarketingMemberId: [this.mentorId],
        Title: ['', [Validators.required, Validators.maxLength(75)]],
        KnownAsId: [''],
        Famous: ['', Validators.maxLength(200)]
      });
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
