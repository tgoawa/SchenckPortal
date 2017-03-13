import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-strategy-plan',
  templateUrl: './strategyPlan.component.html',
  styleUrls: ['./strategyPlan.component.css']
})
export class StrategyPlanComponent implements OnInit {

  sideMenuItemId: number = 2; //Tell side menu the active menu item

  private addPlan = false;

  constructor() { }

  ngOnInit() {
  }

  addPlanButton() {
    this.addPlan = true;
  }
}
