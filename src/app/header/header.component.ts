import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { TeamMemberService } from '../teamMember/';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private firstName: string;
  private lastName: string;

  constructor(private teamMemberService: TeamMemberService) { }

  ngOnInit() {
    // this.firstName = this.teamMemberService.teamMember.FirstName;
    // this.lastName = this.teamMemberService.teamMember.LastName;
  }

}
