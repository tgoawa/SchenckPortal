import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalDirective } from 'ng2-bootstrap/modal';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  @ViewChild('createEventItem') public createEventItem: ModalDirective;
  @Input() private currentPlanId: number;

  private newEventItem: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.newEventItemForm();
  }

  createNewEventItem() {
    this.createEventItem.show();
  }

  hideNewEventItem() {
    this.createEventItem.hide();
  }

  addEventItem() {
    //call service to add new event item
  }

  newEventItemForm() {
    this.newEventItem = this.fb.group({
      EventItemName: [''],
      EventDate: [''],
      EventDescription: [''],
      Status: [''],
      EventFeedback: ['']
    });
  }

}
