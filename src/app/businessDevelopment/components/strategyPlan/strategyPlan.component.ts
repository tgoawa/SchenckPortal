import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StrategyPlanService } from '../../services';
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
  private knownAsLookup: KnownAsModel[];


  constructor(private fb: FormBuilder, private strategyPlanService: StrategyPlanService) { }

  ngOnInit() {
  }

  startPlanButton() {
    this.strategyPlanService.getKnownAs().then(data => this.knownAsLookup = data).catch(this.handleError)
    this.startPlanMode = true;
     this.strategyPlanForm = this.fb.group({
      StrategyPlanId: [0],
      strategyPlanTitle: ['', [Validators.required, Validators.maxLength(75)]],
      knownAs: [''],
      famous: ['', Validators.maxLength(200)]
    });
  }

  newStrategyPlan({value, valid}: { value: IStrategyPlan, valid: boolean}) {
    console.log(value, valid);
  }

  private handleError(error: any) {
     let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
   }
}
