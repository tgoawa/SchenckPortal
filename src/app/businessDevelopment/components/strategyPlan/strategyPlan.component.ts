import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-strategy-plan',
  templateUrl: './strategyPlan.component.html',
  styleUrls: ['./strategyPlan.component.css']
})
export class StrategyPlanComponent implements OnInit {

  sideMenuItemId: number = 2; //Tell side menu the active menu item

  private addPlanMode = false;
  private strategyPlanForm: FormGroup;


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.strategyPlanForm = this.fb.group({
      StrategyPlanId: [0],
      strategyPlanTitle: ['', [Validators.required, Validators.maxLength(75)]],
      knownAs: [''],
      famous: ['']
    });
  }

  addPlanButton() {
    this.addPlanMode = true;
  }
}
