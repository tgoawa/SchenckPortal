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
  @ViewChild('EditPlanModal') public EditPlanModal: ModalDirective;
  @Input() public currentPlan = <IStrategyPlan>null;
  @Input() public teamMemberId: number;
  @Input() public knownAsLookup: DropDownData[];

  public planHeaderForm: FormGroup;

  constructor(private fb: FormBuilder,
  private planService: StrategyPlanService,
  private dropDownData: DropDownDataService) { };

  ngOnInit() {
    this.bindEditForm();
  }

  onEditPlan(value) {
    this.mapFormToPlanHeader(value);
    this.updatePlan();
    this.hideEditPlanModal();
  }

  mapFormToPlanHeader(formValue) {
    this.currentPlan.Title = formValue.Title;
    this.currentPlan.KnownAsId = formValue.KnownAsId;
    this.currentPlan.Famous = formValue.Famous;
  }

  bindEditForm() {
    this.planHeaderForm = this.fb.group({
      Title: [this.currentPlan.Title, [Validators.required, Validators.maxLength(75)]],
      KnownAsId: [this.currentPlan.KnownAsId],
      Famous: [this.currentPlan.Famous, [Validators.maxLength(200)]]
    });
  }

  editPlanHeader() {
    this.showEditPlanModal();
  }

  // calls to service

  updatePlan() {
    this.planService.updatePlan(this.currentPlan)
      .then(data => this.currentPlan = new StrategyPlan())
      .catch(this.handleError);
  }

  // show and hide for modals

  showEditPlanModal() {
    this.EditPlanModal.show();
  }

  hideEditPlanModal() {
    this.EditPlanModal.hide();
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
