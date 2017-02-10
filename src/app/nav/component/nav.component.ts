import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';

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

}
