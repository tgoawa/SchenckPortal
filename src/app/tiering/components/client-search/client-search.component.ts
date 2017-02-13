import { Component, OnInit } from '@angular/core';

import { ClientTierListService } from '../../services/client-tier-list.service';

@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.css']
})
export class ClientSearchComponent implements OnInit {

  private title: string = 'Client Search';
  constructor(private clientTierListService: ClientTierListService) { }

  ngOnInit() {
  }

  search(val) {
    this.clientTierListService.searchClientTierList(val.clientSearch);
  }
}
