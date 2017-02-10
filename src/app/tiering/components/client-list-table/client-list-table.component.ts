import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-list-table',
  templateUrl: './client-list-table.component.html',
  styleUrls: ['./client-list-table.component.css']
})
export class ClientListTableComponent implements OnInit {

  private clientTierList: any[] = [];
  private isSearched: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
