import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalDirective } from 'ng2-bootstrap/modal';

@Component({
  selector: 'app-action-items',
  templateUrl: './actionItems.component.html',
  styleUrls: ['./actionItems.component.css']
})
export class ActionItemsComponent implements OnInit {
  @ViewChild('actionItemModal') public actionItemModal: ModalDirective;
  @Input() private currentPlanId: number;

  private actionItemForm: FormGroup;
  private modalTitle: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.newActionItemForm();
  }

  showActionItemModal() {
    this.actionItemModal.show();
  }

  hideActionItemModal() {
    this.actionItemModal.hide();
  }

  addActionItem(value) {
    console.log(value);
    //call service to add new action item
  }

  newActionItemForm() {
    this.modalTitle = 'Create';
    this.actionItemForm = this.fb.group({
      ActionItemDetails: ['', Validators.required],
      CompletionDate: ['', Validators.required],
      BusinessStrategy: ['', Validators.required],
      PlanID: this.currentPlanId
    });
  }

}

