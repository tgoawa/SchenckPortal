import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';

import { environment } from '../../../environments/environment.qa';

import { MENU } from '../../app.menu';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

  private menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = MENU;
  }

  isDevEnvironment(): boolean {
    return environment.envName === 'dev';
  }

  createMenu() {
    if (this.isDevEnvironment() === false) {
      for (let index = 0; index < MENU.length; index ++) {
        if (MENU[index].isDev === true) {
          this.menuItems[index] = MENU[index];
        } else {
          this.menuItems = MENU;
        }
      }
    }
  }
}
