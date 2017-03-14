import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StrategyPlanService, DropDownDataService } from '../../services';
import { KnownAsModel, IStrategyPlan } from '../../models';

@Component({
  selector: 'app-strategy-plan',
  templateUrl: './strategyPlan.component.html',
  styleUrls: ['./strategyPlan.component.css']
})
export class StrategyPlanComponent implements OnInit {

  sideMenuItemId = 2; //Tell side menu the active menu item

  private startPlanMode = false;
  private strategyPlanForm: FormGroup;
  private teamMemberId: number;
  private marketingMemberId: number;
  private knownAsLookup: KnownAsModel[];


  constructor(private fb: FormBuilder,
              private dropDownData: DropDownDataService,
              private strategyPlanService: StrategyPlanService) { }

  ngOnInit() {
  }

  startPlanButton() {
    this.dropDownData.getKnownAs().then(data => this.knownAsLookup = data).catch(this.handleError)
    this.startPlanMode = true;
     this.strategyPlanForm = this.fb.group({
      PlanId: [0],
      TeamMemberId: [this.teamMemberId],
      MarketingMemberId: [this.marketingMemberId],
      Title: ['', [Validators.required, Validators.maxLength(75)]],
      KnownAsId: [''],
      Famous: ['', Validators.maxLength(200)]
    });
  }

  startNewPlan({value, valid}: {value: IStrategyPlan, valid: boolean}) {
    console.log(value);
    // this.strategyPlanService.createPlan(strategyPlan);
    this.startPlanMode = false;
  }

  private handleError(error: any) {
     let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
   }
}
