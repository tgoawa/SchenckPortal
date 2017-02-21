import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { IClientVal, IScore } from '../../models/';
import { ClientTierAnalysisService } from '../../services/';
import { TierHelper } from '../../helpers';

@Component({
  selector: 'app-client-tier-details',
  templateUrl: './client-tier-details.component.html',
  styleUrls: ['./client-tier-details.component.css'],
})
export class ClientTierDetailsComponent implements OnInit {
  menuItemId: number = 1;

  private title: string = 'Client Tier Analysis';
  private parentAnalysisData: IClientVal;
  private displayData: IClientVal;
  private clientTierScore: any;
  private errorMessage: any = '';
  billings: IScore[];

  constructor(private clientTierAnalysisService: ClientTierAnalysisService,
  private route: ActivatedRoute,
  private tierhelper: TierHelper) { }

  ngOnInit() {
    this.parentAnalysisData = this.route.snapshot.data['parentAnalysisData'];
    this.billings = this.route.snapshot.data['clientScore'];
    this.displayData = this.parentAnalysisData;
    this.getScores(this.displayData);
  }
  getScores(displayData: IClientVal) {
   this.clientTierScore = this.tierhelper.getTierScore(displayData, this.billings);
   console.log(this.clientTierScore);
  }
  reset() {
    this.displayData = this.parentAnalysisData;
  }

}
