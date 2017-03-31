import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalDirective } from 'ng2-bootstrap/modal';

import { IStrategyPlan, StrategyPlan } from '../models/strategyPlan.model';
import { StrategyPlanService } from '../services/strategyPlan.service';
import { DropDownDataService } from '../../planLookups/services/dropDownData.service';
import { DropDownData } from '../../planLookups/models/dropDownData.model';

@Component({
  selector: 'app-plan-header',
  templateUrl: './planHeader.component.html',
  styleUrls: ['./planHeader.component.css']
})
export class PlanHeaderComponent implements OnInit {
  @ViewChild('CreatePlanModal') public CreatePlanModal: ModalDirective;
  @ViewChild('CompletePlanModal') public CompletePlanModal: ModalDirective;
  @Input() private teamMemberId: number;

  private planHeaderForm: FormGroup;
  private createPlanForm: FormGroup;
  private knownAsLookup: DropDownData[];

  private currentPlan: IStrategyPlan;

  private isCurrentPlan = false;

  constructor(private fb: FormBuilder,
  private planService: StrategyPlanService,
  private dropDownData: DropDownDataService) { };

  ngOnInit() {
    this.bindCreateForm();
    this.getKnownAs();
    this.getPlan();
  }

  onCreatePlan(value) {
    this.mapFormToPlanHeader(value);
    this.mapTeamMemberToPlan();
    this.createPlan();
    this.hideCreatePlanModal();
    this.bindCreateForm();
  }

  onEditPlan(value) {
    this.mapFormToPlanHeader(value);
    this.updatePlan();
  }

  onCompletePlan() {
    this.showCompletePlanModal();
  }

  onConfirmCompletePlan() {
    this.mapFormToPlanHeader(this.planHeaderForm.value);
    this.completePlan();
    this.planHeaderForm.reset();
    this.hideCompletePlanModal();
  }

  mapFormToPlanHeader(formValue) {
    this.currentPlan.Title = formValue.Title;
    this.currentPlan.KnownAsId = formValue.KnownAsId;
    this.currentPlan.Famous = formValue.Famous;
  }

  mapTeamMemberToPlan() {
    this.currentPlan.TeamMemberId = this.teamMemberId;
  }

  bindCreateForm() {
    this.createPlanForm = this.fb.group({
      Title: ['', [Validators.required, Validators.maxLength(75)]],
      KnownAsId: [''],
      Famous: ['', [Validators.maxLength(200)]]
    });
  }

  bindEditForm() {
    console.log(this.knownAsLookup);
    this.planHeaderForm = this.fb.group({
      Title: [this.currentPlan.Title, [Validators.required, Validators.maxLength(75)]],
      KnownAsId: [this.currentPlan.KnownAsId],
      Famous: [this.currentPlan.Famous, [Validators.maxLength(200)]]
    });
  }

  displayCreatePlanModal() {
    if (this.currentPlan.PlanId === 0) {
      this.showCreatePlanModal();
    } else {
      this.isCurrentPlan = true;
      this.bindEditForm();
      this.getKnownAs();
    }
  }

  // calls to service

  getPlan() {
    this.planService.getPlan(this.teamMemberId)
      .then((data: IStrategyPlan) => {
        this.currentPlan = data;
        this.displayCreatePlanModal();
      })
      .catch(this.handleError);
  }

  getKnownAs() {
    this.dropDownData.getKnownAs()
    .then(data => this.knownAsLookup = data)
    .catch(this.handleError);
  }

  createPlan() {
    this.planService.createPlan(this.currentPlan)
      .then((data: IStrategyPlan) => {
        this.currentPlan = data;
        this.getPlan();
      })
      .catch(this.handleError);
  }

  updatePlan() {
    this.planService.updatePlan(this.currentPlan)
      .then((data: IStrategyPlan) => this.currentPlan = data)
      .catch(this.handleError);
  }

  completePlan() {
    this.planService.completePlan(this.currentPlan.PlanId)
      .then(data => {
        this.getPlan();
      })
      .catch(this.handleError);
  }

  // show and hide for modals

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
