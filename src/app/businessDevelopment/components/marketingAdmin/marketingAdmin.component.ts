import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marketing-admin',
  templateUrl: './marketingAdmin.component.html',
  styleUrls: ['./marketingAdmin.component.css']
})
export class MarketingAdminComponent implements OnInit {

  sideMenuItemId = 2; //Tell side menu the active menu index
  
  constructor() { }

  ngOnInit() {
  }

}
