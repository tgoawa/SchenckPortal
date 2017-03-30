import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalDirective } from 'ng2-bootstrap/modal';

import { IStrategyPlan, StrategyPlan } from '../models/strategyPlan.model';
import { StrategyPlanService } from '../services/strategyPlan.service';

@Component({
  selector: 'app-plan-header',
  templateUrl: './planHeader.component.html',
  styleUrls: ['./planHeader.component.css']
})
export class PlanHeaderComponent implements OnInit {
  @ViewChild('CreatePlanModal') public CreatePlanModal: ModalDirective;

  private planHeaderForm: FormGroup;
  private teamMemberId: number;
  private currentPlan: IStrategyPlan;

  constructor(private fb: FormBuilder, private planService: StrategyPlanService) { };

  ngOnInit() {
    this.getPlan();
  }

  completePlan() {
    this.planService.completePlan(this.currentPlan.PlanId)
    .catch(this.handleError);
  }

  onCreatePlan(value) {
    this.mapFormToPlanHeader(value);
    this.createPlan();
  }

  onEditPlan(value) {
    this.mapFormToPlanHeader(value);
    this.updatePlan();
  }

  mapFormToPlanHeader(formValue) {
    this.currentPlan.Title = formValue.Title;
    this.currentPlan.KnownAsId = formValue.KnownAsId;
    this.currentPlan.Famous = formValue.Famouse;
  }

  bindEditForm() {
    this.planHeaderForm = this.fb.group({
      Title: [this.currentPlan.Title, [Validators.required, Validators.maxLength(75)]],
      KnownAsId: [this.currentPlan.KnownAsId],
      Famous: [this.currentPlan.Famous, [Validators.maxLength(200)]]
    });
  }

  // calls to service

  getPlan() {
    this.planService.getPlan(this.teamMemberId)
    .then((data: IStrategyPlan) => this.currentPlan = data)
    .catch(this.handleError);
  }

  createPlan() {
    this.planService.createPlan(this.currentPlan)
    .then((data: IStrategyPlan) => this.currentPlan = data)
    .catch(this.handleError);
  }

  updatePlan() {
    this.planService.updatePlan(this.currentPlan)
    .then((data: IStrategyPlan) => this.currentPlan = data)
    .catch(this.handleError);
  }

  // show and hide for modals

  showCreatePlanModal() {
    this.CreatePlanModal.show();
  }

  hideCreatePlanModal() {
    this.CreatePlanModal.hide();
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
