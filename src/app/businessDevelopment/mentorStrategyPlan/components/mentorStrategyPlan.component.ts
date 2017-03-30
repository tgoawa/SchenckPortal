import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mentor-strategy-plan',
  templateUrl: './mentorStrategyPlan.component.html',
  styleUrls: ['./mentorStrategyPlan.component.css']
})
export class MentorStrategyPlanComponent implements OnInit {

  sideMenuItemId = 3; //Tell side menu the active menu index
  constructor() { }

  ngOnInit() {
  }

}
