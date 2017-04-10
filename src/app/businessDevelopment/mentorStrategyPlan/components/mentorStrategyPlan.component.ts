import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { IMentor } from '../../marketingAdmin/models/mentor.dto';
import { MarketingAdminService } from '../../marketingAdmin/services/marketingAdmin.service';
import { StrategyPlanService } from '../../planHeader/services/strategyPlan.service';
import { IStrategyPlan, StrategyPlan } from '../../planHeader/models/strategyPlan.model';
import { TeamMemberService, TeamMember } from '../../../teamMember/';
import { DropDownDataService } from '../../planLookups/services/dropDownData.service';
import { DropDownData } from '../../planLookups/models/dropDownData.model';

@Component({
  selector: 'app-mentor-strategy-plan',
  templateUrl: './mentorStrategyPlan.component.html',
  styleUrls: ['./mentorStrategyPlan.component.css']
})
export class MentorStrategyPlanComponent implements OnInit {
  @ViewChild('CreatePlanModal') public CreatePlanModal: ModalDirective;
  @ViewChild('CompletePlanModal') public CompletePlanModal: ModalDirective;

  public sideMenuItemId = 3; //Tell side menu the active menu index
  public mentorshipList: IMentor[];
  public menteeId: number;
  public menteeName: string;
  public currentPlan: IStrategyPlan;
  public createPlanForm: FormGroup;
  public knownAsLookup: DropDownData[];

  private teamMemberId: number;

  constructor(private fb: FormBuilder,
    private adminService: MarketingAdminService,
    private teamMemberService: TeamMemberService,
    private strategyPlanService: StrategyPlanService,
    private dropDownData: DropDownDataService) { }

  ngOnInit() {
    this.bindCreateForm();
    this.getKnownAs();
    this.teamMemberId = this.teamMemberService.teamMember.TeamMemberId;
    this.getMentorShipList();
  }

  getMentorShipList() {
    this.adminService.getMentorshipList(this.teamMemberId)
      .then((data: IMentor[]) => this.mentorshipList = data)
      .catch(this.handleError);
  }

  getKnownAs() {
    this.dropDownData.getKnownAs()
      .then(data => this.knownAsLookup = data)
      .catch(this.handleError);
  }

  getPlan() {
    this.strategyPlanService.getPlan(this.menteeId)
      .then((data: IStrategyPlan) => {
        this.currentPlan = data;
        if (this.currentPlan.PlanId === 0) {
          this.showCreatePlanModal();
        }
      })
      .catch(this.handleError);
  }

  bindCreateForm() {
    this.createPlanForm = this.fb.group({
      Title: ['', [Validators.required, Validators.maxLength(75)]],
      KnownAsId: [''],
      Famous: ['', [Validators.maxLength(200)]]
    });
  }

  createPlan() {
    this.strategyPlanService.createPlan(this.currentPlan)
      .then((data: IStrategyPlan) => {
        this.getPlan();
      })
      .catch(this.handleError);
  }

  completePlan() {
    this.strategyPlanService.completePlan(this.currentPlan.PlanId)
      .then()
      .catch(this.handleError);
  }

  onViewMenteePlan(mentee: TeamMember) {
    this.currentPlan = new StrategyPlan();
    this.menteeId = mentee.TeamMemberId;
    this.menteeName = mentee.LastFirstName;
    this.getPlan();
  }

  onCreatePlan(value) {
    this.mapFormToPlanHeader(value);
    this.mapTeamMemberToPlan();
    this.createPlan();
    this.hideCreatePlanModal();
    this.bindCreateForm();
  }

  onCompletePlan() {
    this.showCompletePlanModal();
  }

  onConfirmCompletePlan() {
    this.completePlan();
    this.currentPlan = new StrategyPlan();
    this.hideCompletePlanModal();
  }

  mapFormToPlanHeader(formValue) {
    this.currentPlan.Title = formValue.Title;
    this.currentPlan.KnownAsId = formValue.KnownAsId;
    this.currentPlan.Famous = formValue.Famous;
  }

  mapTeamMemberToPlan() {
    this.currentPlan.TeamMemberId = this.menteeId;
  }

  // modal functions

  showCreatePlanModal() {
    this.CreatePlanModal.show();
  }

  hideCreatePlanModal() {
    this.CreatePlanModal.hide();
  }

  showCompletePlanModal() {
    this.CompletePlanModal.show();
  }

  hideCompletePlanModal() {
    this.CompletePlanModal.hide();
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
