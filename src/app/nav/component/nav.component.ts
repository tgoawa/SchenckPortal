import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { TeamMemberService, TeamMember } from '../../teamMember/';

import { MENU } from '../../app.menu';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

  private menuItems: any[] = [];
  private teamMember: TeamMember;

  constructor(private teamMemberService: TeamMemberService) { }

  ngOnInit() {
    this.createMenu();
  }


  createMenu() {
    if (environment.envName === 'dev') {
      this.menuItems = MENU;
    } else {
      for (let index = 0; index < MENU.length; index++) {
        if (MENU[index].inDev === false) {
          this.menuItems.push(MENU[index]);
        }
      }
    }
  }
  
}
