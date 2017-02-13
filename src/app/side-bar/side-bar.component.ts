import { Component, OnInit, Input } from '@angular/core';

import { MENU } from '../app.menu';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  @Input() menuItemId: number;
  private menu = MENU;
  private sideBarMenuItem = {};
  constructor() { }

  ngOnInit() {
    console.log(this.menuItemId);
    this.setSideBarMenu(this.menu);
  }

  setSideBarMenu(menuItem) {
    for (let x = 0; x <= menuItem.length; x++)
    {
      if (menuItem[x].id === this.menuItemId) {
        this.sideBarMenuItem = menuItem[x];
        break;
      }
    }
  }
}
