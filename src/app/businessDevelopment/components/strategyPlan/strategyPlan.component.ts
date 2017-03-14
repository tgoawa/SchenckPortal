import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StrategyPlanService, DropDownDataService } from '../../services';
import { TeamMemberService } from '../../../teamMember/teamMember.service';
import { KnownAsModel, IStrategyPlan } from '../../models';

@Component({
  selector: 'app-strategy-plan',
  templateUrl: './strategyPlan.component.html',
  styleUrls: ['./strategyPlan.component.css']
})
export class StrategyPlanComponent implements OnInit {

  sideMenuItemId = 2; //Tell side menu the active menu item

  private startPlanMode = false;
  private currentPlanMode = false;
  private strategyPlanForm: FormGroup;
  private currentPlanForm: FormGroup;
  private teamMemberId: number;
  private marketingMemberId: number;
  private currentStrategyPlan: IStrategyPlan;
  private knownAsLookup: KnownAsModel[];


  constructor(private fb: FormBuilder,
              private dropDownData: DropDownDataService,
              private strategyPlanService: StrategyPlanService,
              private teamMemberService: TeamMemberService) { }

  ngOnInit() {
    this.teamMemberId = this.teamMemberService.teamMember.TeamMemberId;
  }

  startPlanButton() {
    this.getKnownAsData();
    this.startPlanMode = true;
     this.strategyPlanForm = this.fb.group({
      PlanId: [0],
      TeamMemberId: [this.teamMemberId],
      MarketingMemberId: [0],
      Title: ['', [Validators.required, Validators.maxLength(75)]],
      KnownAsId: [''],
      Famous: ['', Validators.maxLength(200)]
    });
  }

  startNewPlan({value, valid}: {value: IStrategyPlan, valid: boolean}) {
    console.log(value);
    this.strategyPlanService.createPlan(value);
    this.startPlanMode = false;
  }

  startEditPlan() {
    this.getKnownAsData();
    this.currentPlanMode = true;
    // this.currentPlanForm = this.fb.group({
    //   PlanId: [this.currentStrategyPlan.PlanId],
    //   TeamMemberId: [this.currentStrategyPlan.TeamMemberId],
    //   MarketingMemberId: [this.currentStrategyPlan.MarketingMemberId],
    //   Title: [this.currentStrategyPlan.Title, [Validators.required, Validators.maxLength(75)]],
    //   KnownAsId: [this.currentStrategyPlan.KnownAsId],
    //   Famous: [this.currentStrategyPlan.Famous, Validators.maxLength(200)]
    // });
  }

  getKnownAsData(): KnownAsModel[] {
    if (this.knownAsLookup === undefined) {
      this.dropDownData.getKnownAs()
      .then(data => this.knownAsLookup = data)
      .catch(this.handleError);
    }
    return this.knownAsLookup;
  }
  
  private handleError(error: any) {
     let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
   }
}
