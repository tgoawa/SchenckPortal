import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TeamMember, TeamMemberService } from '../teamMember/';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  private teamMember: TeamMember;
  constructor(private route: ActivatedRoute, private teamMemberService: TeamMemberService) { }

  ngOnInit() {
    this.teamMember = this.route.snapshot.data['teamMemberData'];
    this.teamMemberService.teamMember = this.teamMember;
    console.log(this.teamMember);
  }

}
