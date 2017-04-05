import { Component, OnInit, Input } from '@angular/core';
import { TeamMember } from '../teamMember/';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() public teamMember: TeamMember;

  constructor() { }

  ngOnInit() {
  }

}
