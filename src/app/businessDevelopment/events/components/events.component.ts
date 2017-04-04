import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalDirective } from 'ng2-bootstrap/modal';
import { DropDownDataService } from '../../planLookups/services/dropDownData.service';
import { IStrategyEvent } from '../models/strategyEvent.model';
import { StrategyEventService } from '../services/strategyEvent.service';
import { DropDownData } from '../../planLookups/models/dropDownData.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  @ViewChild('EventItemModal') public EventItemModal: ModalDirective;
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

  newEvent() {
    this.modalTitle = 'Create';
    this.newEventItemForm();
    this.EventItemModal.show();
  }

  editEvent(event) {
    this.modalTitle = 'Update';
    this.editEventForm(event);
    this.EventItemModal.show();
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

  editEventForm(event: IStrategyEvent) {
    this.eventForm = this.fb.group({
      PlanId: event.PlanId,
      EventId: event.EventId,
      Name: [event.Name, Validators.required],
      ScheduledDate: [event.ScheduledDate, Validators.required],
      Description: [event.Description, [Validators.required, Validators.maxLength(200)]],
      StatusId: [event.StatusId, Validators.required],
      Feedback: [event.Feedback]
    });
  }

  addEventItem({ value, valid }: { value: IStrategyEvent, valid: boolean }) {
    let eventId = this.eventForm.get('EventId').value;
    // if (eventId === 0) {
    //   this.eventService.createEvent(value)
    //     .then(data => {
    //       this.currentEvents.push(data);
    //       this.existingEvents = true;
    //     })
    //     .catch(this.handleError);
    //   this.hideEventModal();
    //   this.eventForm.reset();
    // } else {
    //   this.eventService.updateEvent(value)
    //     .then(data => this.currentEvents = data)
    //     .catch(this.handleError);
    //   this.hideEventModal();
    //   this.eventForm.reset();
    // }
  }

  eventSetComplete() {
    this.isCompleted = true;
  }

  hideEventModal() {
    this.EventItemModal.hide();
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

}
