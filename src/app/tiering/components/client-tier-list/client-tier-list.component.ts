import { Component, OnInit } from '@angular/core';

import { ClientTierList } from '../../models/';
import { ClientTierListService } from '../../services/client-tier-list.service';

@Component({
  selector: 'app-client-tier-list',
  templateUrl: './client-tier-list.component.html',
  styleUrls: ['./client-tier-list.component.css']
})
export class ClientTierListComponent implements OnInit {

  private title: string = 'Client Tier List';
  private clientTierList: ClientTierList[];
  private currentPeriod: any[];
  menuItemId: number = 1;

  constructor(private listService: ClientTierListService) { }

  ngOnInit() {
    this.listService.getCurrentPeriod().then(data => this.currentPeriod = data);
  }

  search(val) {
    this.listService.searchClientTierList(val.clientSearch).then(data => this.clientTierList = data);
  }

}
