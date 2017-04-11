import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { DropDownDataService } from '../../planLookups/services/dropDownData.service';
import { IStrategyEvent } from '../models/strategyEvent.model';
import { StrategyEventService } from '../services/strategyEvent.service';
import { DropDownData } from '../../planLookups/models/dropDownData.model';

import { APP_CONFIG, SchenckAppConfig } from '../../../app.config';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  @ViewChild('CreateEventModal') public CreateEventModal: ModalDirective;
  @ViewChild('EditEventModal') public EditEventModal: ModalDirective;

  @Input() public currentPlanId: number;
  public currentEvents: IStrategyEvent[];

  public eventForm: FormGroup;
  public EditEventForm: FormGroup;
  public existingEvents = false;
  public modalTitle: string;
  public isCompleted = false;
  public eventStatus: DropDownData[];

  constructor(private fb: FormBuilder,
  private dds: DropDownDataService, 
  private eventService: StrategyEventService, @Inject(APP_CONFIG) private config) { }

  ngOnInit() {
    this.getStatusData();
    this.getPlanEvents();
    this.newEventItemForm();
    this.editEventForm();

  }

  getStatusData() {
    this.dds.getEventStatuses()
      .then((data: DropDownData[]) => this.eventStatus = data)
      .catch(this.handleError);
  }

  getPlanEvents() {
    this.eventService.getEvents(this.currentPlanId)
    .then((data: IStrategyEvent[]) => {
      this.currentEvents = data;
      this.isExistingEvents();
    })
    .catch(this.handleError);
  }

  isExistingEvents() {
    if (this.currentEvents[0].EventId === 0) {
      this.currentEvents.pop();
      this.existingEvents = false;
    } else {
      this.existingEvents = true;
    }
  }

  onNewEvent() {
    this.newEventItemForm();
    this.showCreateModal();
  }

  onEditItem(event: IStrategyEvent) {
    this.setEditForm(event);
    this.showEditModal();
  }

  newEventItemForm() {
    this.eventForm = this.fb.group({
      PlanId: this.currentPlanId,
      EventId: 0,
      Name: ['', Validators.required],
      DisplayScheduledDate: ['', Validators.required],
      Description: ['', [Validators.required, Validators.maxLength(200)]],
      StatusId: ['', Validators.required],
      Feedback: ['']
    });
  }

  editEventForm() {
    this.EditEventForm = this.fb.group({
      PlanId: this.currentPlanId,
      EventId: 0,
      Name: ['', Validators.required],
      DisplayScheduledDate: ['', Validators.required],
      Description: ['', [Validators.required, Validators.maxLength(200)]],
      StatusId: ['', Validators.required],
      Feedback: ['']
    });
  }

  setEditForm(event: IStrategyEvent) {
    this.EditEventForm.patchValue({
      PlanId: event.PlanId,
      EventId: event.EventId,
      Name: event.Name,
      DisplayScheduledDate: event.DisplayScheduledDate,
      Description: event.Description,
      StatusId: event.StatusId,
      Feedback: event.Feedback
    });
  }

  editFormChanged() {
    return this.EditEventForm.pristine && this.EditEventForm.valid;
  }

  onAddEvent(value) {
    this.addEvent(value);
    this.hideCreateModal();
    this.eventForm.reset();
  }

  onEditEvent(value) {
    this.editEvent(value);
    this.hideEditModal();
    this.EditEventForm.reset();
  }

  addEvent(value) {
    this.eventService.createEvent(value)
    .then(data => {
      if (data.EventId > 0) {
        this.getPlanEvents();
      } else {
        alert(this.config.serverErrorMessage);
      }
    })
    .catch(this.handleError);
  }

  editEvent(value) {
    this.eventService.updateEvent(value)
    .then(data => {
      if (data === true) {
        this.getPlanEvents();
      } else {
        alert(this.config.serverErrorMessage);
      }
    })
    .catch(this.handleError);
  }

  eventSetComplete() {
    this.isCompleted = true;
  }

  // Modals

  showCreateModal() {
    this.CreateEventModal.show();
  }

  hideCreateModal() {
    this.CreateEventModal.hide();
  }

  showEditModal() {
    this.EditEventModal.show();
  }

  hideEditModal() {
    this.EditEventModal.hide();
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

}
