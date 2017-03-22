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
  @Input() private currentPlandId: number;

  private clientRelationshipForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.newClientRelationshipForm();
  }

  newClientRelationshipForm() {
    this.clientRelationshipForm = this.fb.group({
      RelationshipId: 0,
      ClientName: [''],
      Contact: [''],
      RelationshipDetails: [''],
      Date: ['']
    });
  }

  editClientRelationship() {
    // use setValue passing in the existing relationship item to set the form values
  }

  showClientRelationship() {
    this.clientRelationshipModal.show();
  }

  hideClientRelationship() {
    this.clientRelationshipModal.hide();
  }

}
