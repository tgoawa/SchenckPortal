import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalDirective } from 'ng2-bootstrap/modal';

import { TeamMemberService, TeamMember } from '../../../teamMember/';
import { StrategyPlanService } from '../../planHeader/services/strategyPlan.service';
import { IStrategyPlan, StrategyPlan } from '../../planHeader/models/strategyPlan.model';
import { DropDownDataService } from '../../planLookups/services/dropDownData.service';
import { DropDownData } from '../../planLookups/models/dropDownData.model';

@Component({
  selector: 'app-individual-strategy-plan',
  templateUrl: './individualStrategyPlan.component.html',
  styleUrls: ['./individualStrategyPlan.component.css']
})
export class IndividualStrategyPlanComponent implements OnInit {
  @ViewChild('CreatePlanModal') public CreatePlanModal: ModalDirective;
  @ViewChild('CompletePlanModal') public CompletePlanModal: ModalDirective;

  public sideMenuItemId = 2; //Tell side menu the active menu index
  public currentPlan: IStrategyPlan;
  public knownAsLookup: DropDownData[];
  public mentorName: string;
  public createPlanForm: FormGroup;
  public teamMemberId: number;

  constructor(private fb: FormBuilder,
              private teamMemberService: TeamMemberService,
              private strategyPlanService: StrategyPlanService,
              private dropDownData: DropDownDataService) { }

  ngOnInit() {
    this.bindCreateForm();
    this.teamMemberId = this.teamMemberService.teamMember.TeamMemberId;
    this.getKnownAs();
    this.getPlan();
  }

  getKnownAs() {
    this.dropDownData.getKnownAs()
      .then(data => this.knownAsLookup = data)
      .catch(this.handleError);
  }

  getPlan() {
    this.strategyPlanService.getPlan(this.teamMemberId)
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
      .then(data => {
        this.currentPlan = new StrategyPlan();
        this.getPlan();
      })
      .catch(this.handleError);
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
    this.hideCompletePlanModal();
    this.getPlan();
  }

  mapFormToPlanHeader(formValue) {
    this.currentPlan.Title = formValue.Title;
    this.currentPlan.KnownAsId = formValue.KnownAsId;
    this.currentPlan.Famous = formValue.Famous;
  }

  mapTeamMemberToPlan() {
    this.currentPlan.TeamMemberId = this.teamMemberId;
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
