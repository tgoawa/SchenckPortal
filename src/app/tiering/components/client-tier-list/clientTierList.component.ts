import { Component, OnInit } from '@angular/core';

import { ClientTierList } from '../../models/';
import { ClientTierListService } from '../../services/clientTierList.service';

@Component({
  selector: 'app-client-tier-list',
  templateUrl: './clientTierList.component.html',
  styleUrls: ['./clientTierList.component.css']
})
export class ClientTierListComponent implements OnInit {

  private clientTierList: ClientTierList[];
  private currentPeriod: any[];
  private isLoading: Boolean;
  menuItemId: number = 1;

  constructor(private listService: ClientTierListService) { }

  ngOnInit() {
    this.listService.getCurrentPeriod().then(data => this.currentPeriod = data);
  }

  search(val) {
    this.isLoading = true;
    this.listService.searchClientTierList(val.clientSearch)
    .then(data => {
      this.clientTierList = data;
      this.isLoading = false;
    });
  }

}
