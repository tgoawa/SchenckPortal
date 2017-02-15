import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-tier-list',
  templateUrl: './client-tier-list.component.html',
  styleUrls: ['./client-tier-list.component.css']
})
export class ClientTierListComponent implements OnInit {

  private title: string = 'Client Tier List';
  
  menuItemId: number = 1;

  constructor() { }

  ngOnInit() {

  }

}
