import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { IClientVal, IScore, ScoreRanges, Scores } from '../../models/';
import { ClientTierAnalysisService } from '../../services/';
import { TierHelper } from '../../helpers';

@Component({
  selector: 'app-client-tier-details',
  templateUrl: './client-tier-details.component.html',
  styleUrls: ['./client-tier-details.component.css'],
})
export class ClientTierDetailsComponent implements OnInit {
  menuItemId: number = 1;

  private title: string = 'Tiering Calculator';
  private parentAnalysisData: IClientVal;
  private displayData: IClientVal;
  private clientTierScore: any;
  private errorMessage: any = '';
  

  constructor(private clientTierAnalysisService: ClientTierAnalysisService,
  private route: ActivatedRoute,
  private tierhelper: TierHelper) { }

  ngOnInit() {
    let scoreRanges: Scores = new Scores();

    this.parentAnalysisData = this.route.snapshot.data['parentAnalysisData'];
    scoreRanges.Billing = this.route.snapshot.data['billingScore'];
    scoreRanges.Realization = this.route.snapshot.data['realizationScore'];
    scoreRanges.Multiplier = this.route.snapshot.data['multiplierScore'];
    scoreRanges.WorkTiming = this.route.snapshot.data['workTiming'];
    scoreRanges.ServiceTouch = this.route.snapshot.data['serviceTouch'];
    scoreRanges.Payment = this.route.snapshot.data['paymentScore'];
    scoreRanges.Tier = this.route.snapshot.data['tierScore'];
    console.log(scoreRanges);
    this.displayData = this.parentAnalysisData;
    this.getScores(this.displayData, scoreRanges);
  }
  getScores(displayData: IClientVal, scoreRanges: Scores) {
   this.clientTierScore = this.tierhelper.getClientScore(displayData, scoreRanges);
  }

  reset() {
    this.displayData = this.parentAnalysisData;
  }

}
