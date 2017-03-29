import { Component, OnInit, Input } from '@angular/core';
import { TeamMember } from '../teamMember/';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() teamMember: TeamMember;
  private marketingAdmin = false;
  constructor() { }

  ngOnInit() {
    console.log(this.teamMember);
    this.isMentor();
  }

  isMentor() {
    if (this.teamMember.IsMentor = true) {
      this.marketingAdmin = true;
    }
  }
}
