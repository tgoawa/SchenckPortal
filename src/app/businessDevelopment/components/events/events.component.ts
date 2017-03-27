import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalDirective } from 'ng2-bootstrap/modal';
import { DropDownDataService,
          StrategyEventService } from '../../services/';
import { IStrategyEvent, DropDownData } from '../../models/';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  @ViewChild('createEventItem') public createEventItem: ModalDirective;
  @Input() private currentPlanId: number;
  @Input() private currentEvents: IStrategyEvent[];

  private eventForm: FormGroup;
  private existingEvents = false;
  private modalTitle: string;
  private isCompleted = false;
  private eventStatus: DropDownData[];

  constructor(private fb: FormBuilder, private dds: DropDownDataService, private eventService: StrategyEventService) { }

  ngOnInit() {
    this.getStatusData();
    this.isExistingEvents();
    this.newEventItemForm();
  }

  showEventModal() {
    this.createEventItem.show();
    this.modalTitle = 'Create';
  }

  hideEventModal() {
    this.createEventItem.hide();
  }

  addEventItem({value, valid}: { value: IStrategyEvent, valid: boolean} ) {
    let eventId = this.eventForm.get('EventId').value;
    if (eventId === 0) {
      this.eventService.createEvent(value)
      .then(data => {
        this.currentEvents.push(data);
        this.existingEvents = true;
      })
      .catch(this.handleError);
      this.hideEventModal();
      this.eventForm.reset();
    } else {
      this.eventService.updateEvent(value)
      .then(data => this.currentEvents = data)
      .catch(this.handleError);
      this.hideEventModal();
      this.eventForm.reset();
    }
  }

  eventSetComplete() {
    this.isCompleted = true;
  }

  newEventItemForm() {
    this.eventForm = this.fb.group({
      PlanId: this.currentPlanId,
      EventId: 0,
      Name: ['', Validators.required],
      ScheduledDate: ['', Validators.required],
      Description: ['', [Validators.required, Validators.maxLength(200)]],
      StatusId: ['', Validators.required],
      Feedback: ['']
    });
  }

  getStatusData() {
    this.dds.getEventStatuses()
    .then((data: DropDownData[]) => this.eventStatus = data)
    .catch(this.handleError);
  }

  isExistingEvents() {
    if (this.currentEvents[0].EventId !== 0) {
      this.existingEvents = true;
    }
  }
  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

}
