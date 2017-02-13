import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ClientTierList } from '../../models/clientTierList.model';
import { ClientTierListService } from '../../services/client-tier-list.service'

@Component({
  selector: 'app-client-list-table',
  templateUrl: './client-list-table.component.html',
  styleUrls: ['./client-list-table.component.css']
})
export class ClientListTableComponent implements OnInit {

  private clientTierList: Observable<ClientTierList[]>;
  private isSearched: boolean = false;
  constructor(private clientTierListService: ClientTierListService) { }

  ngOnInit() {
    this.clientTierList = this.clientTierListService.clientTierList;
  }

}
