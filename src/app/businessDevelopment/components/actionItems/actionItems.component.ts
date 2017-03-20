import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalDirective } from 'ng2-bootstrap/modal';

@Component({
  selector: 'app-action-items',
  templateUrl: './actionItems.component.html',
  styleUrls: ['./actionItems.component.css']
})
export class ActionItemsComponent implements OnInit {
  @ViewChild('createActionItem') public createActionItem: ModalDirective;
  @Input() private currentPlanId: number;

  private newActionItem: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.newActionItemForm();
  }

  createNewActionItem() {
    this.createActionItem.show();
  }

  hideCreateActionItem() {
    this.createActionItem.hide();
  }

  addActionItem() {
    //call service to add new action item
  }

  newActionItemForm() {
    this.newActionItem = this.fb.group({
      ActionItemDetails: [''],
      CompletionDate: [''],
      BusinessStrategy: [''],
      PlanID: this.currentPlanId
    });
  }

}

