import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-client-contacts',
  templateUrl: './clientContacts.component.html',
  styleUrls: ['./clientContacts.component.css']
})
export class ClientContactsComponent implements OnInit {
  @ViewChild('clientRelationshipModal') public clientRelationshipModal: ModalDirective;
  @Input() public currentPlanId: number;
  @Input() public currentRelationships: any[];

  public clientRelationshipForm: FormGroup;
  public modalTitle = 'Create';
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.newClientRelationshipForm();
  }

  newClientRelationshipForm() {
    this.modalTitle = 'Create';
    this.clientRelationshipForm = this.fb.group({
      PlanId: this.currentPlanId,
      RelationshipId: 0,
      ClientName: ['', Validators.required],
      Contact: ['', Validators.required],
      RelationshipDetails: ['', [Validators.required, Validators.maxLength(200)]],
      Date: ['', Validators.required]
    });
  }

  editClientRelationship() {
    this.modalTitle = 'Update';
    this.clientRelationshipForm = this.fb.group({
      PlanId: this.currentPlanId,
      RelationshipId: 0,
      ClientName: ['', Validators.required],
      Contact: ['', Validators.required],
      RelationshipDetails: ['', [Validators.required, Validators.maxLength(200)]],
      Date: ['', Validators.required]
    });
    this.showClientRelationship();
  }

  onAddClientRelationship() {
    // client relationship form submit
  }

  showClientRelationship() {
    this.clientRelationshipModal.show();
  }

  hideClientRelationship() {
    this.clientRelationshipModal.hide();
  }

}
