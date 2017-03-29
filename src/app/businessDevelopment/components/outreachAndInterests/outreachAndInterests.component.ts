import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalDirective } from 'ng2-bootstrap/modal';

@Component({
  selector: 'app-outreach-interests',
  templateUrl: './outreachAndInterests.component.html',
  styleUrls: ['./outreachAndInterests.component.css']
})
export class OutreachInterestsComponent implements OnInit {
  @ViewChild('communityModal') public communityModal: ModalDirective; 
  constructor() { }

  ngOnInit() {
  }

  showCommunityModal() {
    this.communityModal.show();
  }

  hideCommunityModal() {
    this.communityModal.hide();
  }

}