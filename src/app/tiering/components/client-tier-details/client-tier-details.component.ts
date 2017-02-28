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

  billingVal: any;
  realizationVal: any;
  workTimingVal: any;
  serviceTouch: any;
  payment: any;

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

    this.displayData.Billings = this.parentAnalysisData.Billings;
    this.displayData.PaymentTimeliness = this.parentAnalysisData.PaymentTimeliness;
    this.displayData.PeakPercent = this.parentAnalysisData.PeakPercent;
    this.displayData.Realization = this.parentAnalysisData.Realization * 100;
    this.displayData.ServiceTouchCount = this.parentAnalysisData.ServiceTouchCount;
    this.getScores(this.displayData);

  }
  getScores(displayData: IClientVal) {
   this.clientTierScore = this.tierhelper.getClientScore(displayData, this.scoreRanges);
  }

  updateBilling() {
    if (!isNaN(this.billingVal)) {
        this.displayData.Billings = this.billingVal;
        this.billingVal = '';
    }
    this.clientTierScore = this.tierhelper.getClientScore(this.displayData, this.scoreRanges);
  }

  updateRealization() {
    if (!isNaN(this.realizationVal)) {
      this.displayData.Realization = this.realizationVal;
      this.realizationVal = '';
    }
    this.clientTierScore = this.tierhelper.getClientScore(this.displayData, this.scoreRanges);
  }

  updateWorkTiming() {
    if (!isNaN(this.workTimingVal)) {
      this.displayData.PeakPercent = this.workTimingVal / 100;
      this.workTimingVal = '';
    }
    this.clientTierScore = this.tierhelper.getClientScore(this.displayData, this.scoreRanges);
  }

  updateService() {
    if (!isNaN(this.serviceTouch)) {
      this.displayData.ServiceTouchCount = this.serviceTouch;
      this.serviceTouch = '';
    }
    this.clientTierScore = this.tierhelper.getClientScore(this.displayData, this.scoreRanges);
  }

  updatePayment() {
    if (!isNaN(this.payment)) {
      this.displayData.PaymentTimeliness = this.payment;
      this.payment = '';
    }
    this.clientTierScore = this.tierhelper.getClientScore(this.displayData, this.scoreRanges);
  }

  reset() {
    this.displayData.Billings = this.parentAnalysisData.Billings;
    this.displayData.PaymentTimeliness = this.parentAnalysisData.PaymentTimeliness;
    this.displayData.PeakPercent = this.parentAnalysisData.PeakPercent;
    this.displayData.Realization = this.parentAnalysisData.Realization * 100;
    this.displayData.ServiceTouchCount = this.parentAnalysisData.ServiceTouchCount;
     this.getScores(this.displayData);
  }

}
