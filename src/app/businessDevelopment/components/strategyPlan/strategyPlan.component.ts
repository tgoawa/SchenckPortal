import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalDirective } from 'ng2-bootstrap/modal';

import { StrategyPlanService, DropDownDataService } from '../../services';
import { TeamMemberService, TeamMember } from '../../../teamMember/';
import { IStrategyPlan, DropDownData } from '../../models';

@Component({
  selector: 'app-strategy-plan',
  templateUrl: './strategyPlan.component.html',
  styleUrls: ['./strategyPlan.component.css']
})
export class StrategyPlanComponent implements OnInit {
  @ViewChild('savePlanModal') public savePlanModal: ModalDirective;

  sideMenuItemId = 2; //Tell side menu the active menu index

  private startPlanMode = false;
  private currentPlanMode = false;
  private newActionItemMode = false;
  private mentorMode = false;
  private strategyPlanForm: FormGroup;
  private currentPlanForm: FormGroup;
  private teamMember: TeamMember;
  private marketingMemberId: number;
  private currentStrategyPlan: IStrategyPlan;
  private knownAsLookup: DropDownData[];


  constructor(private fb: FormBuilder,
    private dropDownData: DropDownDataService,
    private strategyPlanService: StrategyPlanService,
    private teamMemberService: TeamMemberService) { }

  ngOnInit() {
    this.teamMember = this.teamMemberService.teamMember;
    this.getKnownAsData();
    this.getCurrentPlan();
  }

  startPlanButton() {
    if (this.isCurrentPlanAvailable()) {
      this.showConfirmModal();
    } else {
      this.startPlanMode = true;
      this.strategyPlanForm = this.fb.group({
        PlanId: [0],
        TeamMemberId: [this.teamMember.TeamMemberId],
        MarketingMemberId: [1001],
        Title: ['', [Validators.required, Validators.maxLength(75)]],
        KnownAsId: [''],
        Famous: ['', Validators.maxLength(200)]
      });
    }
  }

  createNewPlan({ value, valid }: { value: IStrategyPlan, valid: boolean }) {
    this.strategyPlanService.createPlan(value)
      .then((data: IStrategyPlan) => this.currentStrategyPlan = data)
      .catch(this.handleError);
    this.startPlanMode = false;
    this.startEditPlan();
  }

  startEditPlan() {
    this.currentPlanMode = true;
    this.currentPlanForm = this.fb.group({
      PlanId: [this.currentStrategyPlan.PlanId],
      TeamMemberId: [this.currentStrategyPlan.TeamMemberId],
      MarketingMemberId: [this.currentStrategyPlan.MarketingMemberId],
      Title: [this.currentStrategyPlan.Title, [Validators.required, Validators.maxLength(75)]],
      KnownAsId: [this.currentStrategyPlan.KnownAsId],
      Famous: [this.currentStrategyPlan.Famous, Validators.maxLength(200)]
    });
  }

  getKnownAsData(): DropDownData[] {
    if (this.knownAsLookup === undefined) {
      this.dropDownData.getKnownAs()
        .then(data => this.knownAsLookup = data)
        .catch(this.handleError);
    }
    return this.knownAsLookup;
  }

  getCurrentPlan() {
    if (this.isMentor) {
      this.mentorMode = true;
    } else {
      this.strategyPlanService.getPlan(this.teamMember.TeamMemberId)
      .then(data => {
        console.log(data);
        this.currentStrategyPlan = data;
        this.displayCurrentPlan();
      })
      .catch(this.handleError);
    }
  }

  displayCurrentPlan() {
    if (this.isCurrentPlanAvailable()) {
      this.startEditPlan();
    }
  }

  editCurrentPlan({value, valid}: { value: IStrategyPlan, valid: boolean }) {
    this.strategyPlanService.updatePlan(value)
    .then(data => this.currentStrategyPlan = data)
    .catch(this.handleError);
  }

  isMentor(): boolean {
    return this.teamMember.IsMentor;
  }

  isCurrentPlanAvailable(): boolean {
    return this.currentStrategyPlan.PlanId !== 0;
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
