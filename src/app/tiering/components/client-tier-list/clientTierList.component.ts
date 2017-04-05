import { Component, OnInit } from '@angular/core';

import { ClientTierList } from '../../models/';
import { ClientTierListService } from '../../services/clientTierList.service';

import { IPeriod } from '../../models/currentPeriod.model';

@Component({
  selector: 'app-client-tier-list',
  templateUrl: './clientTierList.component.html',
  styleUrls: ['./clientTierList.component.css']
})
export class ClientTierListComponent implements OnInit {

  public sideMenuItemId: number = 1; //Tell side menu the active menu item
  public isLoading: Boolean;
  public clientTierList: ClientTierList[];
  public currentPeriod: IPeriod;
  public clientSearch: string;

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
