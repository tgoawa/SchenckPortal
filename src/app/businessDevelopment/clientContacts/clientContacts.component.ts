import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ModalDirective } from 'ng2-bootstrap/modal';

@Component({
  selector: 'app-client-contacts',
  templateUrl: './clientContacts.component.html',
  styleUrls: ['./clientContacts.component.css']
})
export class ClientContactsComponent implements OnInit {
  @ViewChild('clientRelationshipModal') public clientRelationshipModal: ModalDirective;
  @Input() private currentPlanId: number;
  @Input() private currentRelationships: any[];

  private clientRelationshipForm: FormGroup;
  private modalTitle = 'Create';
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

  showClientRelationship() {
    this.clientRelationshipModal.show();
  }

  hideClientRelationship() {
    this.clientRelationshipModal.hide();
  }

}
