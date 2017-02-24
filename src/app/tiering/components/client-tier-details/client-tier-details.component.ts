import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { IClientVal, ClientVal, IScore, ScoreRanges, Scores } from '../../models/';
import { ClientTierAnalysisService } from '../../services/';
import { TierHelper } from '../../helpers';

@Component({
  selector: 'app-client-tier-details',
  templateUrl: './client-tier-details.component.html',
  styleUrls: ['./client-tier-details.component.css'],
})
export class ClientTierDetailsComponent implements OnInit {
  menuItemId: number = 1;
  scoreRanges: Scores;

  billingVal: number;
  realizationVal: number;
  workTimingVal: number;
  serviceTouch: number;
  payment: number;

  private title: string = 'Tiering Calculator';
  private parentAnalysisData: IClientVal;
  private displayData: IClientVal;
  private clientTierScore: any;
  private errorMessage: any = '';
  

  constructor(private clientTierAnalysisService: ClientTierAnalysisService,
  private route: ActivatedRoute,
  private tierhelper: TierHelper) { }

  ngOnInit() {
    this.scoreRanges = new Scores();
    this.displayData = new ClientVal();

    this.parentAnalysisData = this.route.snapshot.data['parentAnalysisData'];
    this.scoreRanges.Billing = this.route.snapshot.data['billingScore'];
    this.scoreRanges.Realization = this.route.snapshot.data['realizationScore'];
    this.scoreRanges.Multiplier = this.route.snapshot.data['multiplierScore'];
    this.scoreRanges.WorkTiming = this.route.snapshot.data['workTiming'];
    this.scoreRanges.ServiceTouch = this.route.snapshot.data['serviceTouch'];
    this.scoreRanges.Payment = this.route.snapshot.data['paymentScore'];
    this.scoreRanges.Tier = this.route.snapshot.data['tierScore'];

    console.log(this.scoreRanges.ServiceTouch);

    this.displayData.Billings = this.parentAnalysisData.Billings;
    this.displayData.PaymentTimeliness = this.parentAnalysisData.PaymentTimeliness;
    this.displayData.PeakPercent = this.parentAnalysisData.PeakPercent;
    this.displayData.Realization = this.parentAnalysisData.Realization;
    this.displayData.ServiceTouchCount = this.parentAnalysisData.ServiceTouchCount;
    this.getScores(this.displayData);
  }
  getScores(displayData: IClientVal) {
   this.clientTierScore = this.tierhelper.getClientScore(displayData, this.scoreRanges);
  }

  updateBilling() {
    this.displayData.Billings = this.billingVal;
    this.clientTierScore = this.tierhelper.getClientScore(this.displayData, this.scoreRanges);
  }

  updateRealization() {
    this.displayData.Realization = this.realizationVal / 100;
    this.clientTierScore = this.tierhelper.getClientScore(this.displayData, this.scoreRanges);
  }

  updateWorkTiming() {
    this.displayData.PeakPercent = this.workTimingVal / 100;
    this.clientTierScore = this.tierhelper.getClientScore(this.displayData, this.scoreRanges);
  }

  updateService() {
    this.displayData.ServiceTouchCount = this.serviceTouch;
    this.clientTierScore = this.tierhelper.getClientScore(this.displayData, this.scoreRanges);
  }

  updatePayment() {
    this.displayData.PaymentTimeliness = this.payment;
    this.clientTierScore = this.tierhelper.getClientScore(this.displayData, this.scoreRanges);
  }

  reset() {
    this.displayData.Billings = this.parentAnalysisData.Billings;
    this.displayData.PaymentTimeliness = this.parentAnalysisData.PaymentTimeliness;
    this.displayData.PeakPercent = this.parentAnalysisData.PeakPercent;
    this.displayData.Realization = this.parentAnalysisData.Realization;
    this.displayData.ServiceTouchCount = this.parentAnalysisData.ServiceTouchCount;
     this.getScores(this.displayData);
  }

}
