import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { DropDownData } from '../../planLookups/models/dropDownData.model';

@Component({
  selector: 'app-action-items',
  templateUrl: './actionItems.component.html',
  styleUrls: ['./actionItems.component.css']
})
export class ActionItemsComponent implements OnInit {
  @ViewChild('actionItemModal') public actionItemModal: ModalDirective;
  @Input() public currentPlanId: number;
  public industryTeams: DropDownData;
  public actionItemForm: FormGroup;
  public modalTitle: string;

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

