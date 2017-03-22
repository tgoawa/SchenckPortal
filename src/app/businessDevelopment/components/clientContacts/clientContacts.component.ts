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
      ClientName: [''],
      Contact: [''],
      RelationshipDetails: [''],
      Date: ['']
    });
  }

  addClientRelationship() {
    this.clientRelationshipModal.show();
  }

  hideClientRelationship() {
    this.clientRelationshipModal.hide();
  }

}
