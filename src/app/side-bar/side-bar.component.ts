import { Component, OnInit, Input } from '@angular/core';

import { MENU } from '../app.menu';
import { ISidebar } from './models/sideBar.model';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @Input() public menuItemId: number;
  public sideBarMenuItem: ISidebar;

  private menu = MENU;
  constructor() { }

  ngOnInit() {
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
