import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { APP_CONFIG, SchenckAppConfig } from '../../../app.config';

import { IClientVal, ClientVal, IScore, ScoreRanges, Scores, ITiering } from '../../models/';
import { ClientTierAnalysisService } from '../../services/';
import {
  ClientTierMetricHelper,
  BillingMetric,
  RealizationMetric,
  MultiplierMetric,
  TimingMetric,
  ServiceTouchMetric,
  PaymentMetric,
  TierScoreMetric
} from '../../helpers';

@Component({
  selector: 'app-client-tier-details',
  templateUrl: './clientTierDetails.component.html',
  styleUrls: ['./clientTierDetails.component.css'],
})
export class ClientTierDetailsComponent implements OnInit {
  menuItemId: number = 1;

  billingVal: any;
  realizationVal: any;
  workTimingVal: any;
  serviceTouch: any;
  payment: any;

  private parentAnalysisData: IClientVal;
  private displayData: IClientVal;
  private scoreRanges: Scores;
  private clientTierScore: ITiering;
  private clientTierHelper;
  private errorMessage: any = '';


  constructor(private clientTierAnalysisService: ClientTierAnalysisService,
    private route: ActivatedRoute, @Inject(APP_CONFIG) private config) { }

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


    this.clientTierHelper = new ClientTierMetricHelper(new BillingMetric(this.scoreRanges.Billing),
      new RealizationMetric(this.scoreRanges.Realization),
      new MultiplierMetric(this.scoreRanges.Multiplier),
      new TimingMetric(this.scoreRanges.WorkTiming),
      new ServiceTouchMetric(this.scoreRanges.ServiceTouch),
      new PaymentMetric(this.scoreRanges.Payment),
      new TierScoreMetric(this.scoreRanges.Tier));


    this.displayData.Billings = this.parentAnalysisData.Billings;
    this.displayData.PaymentTimeliness = this.parentAnalysisData.PaymentTimeliness;
    this.displayData.PeakPercent = this.parentAnalysisData.PeakPercent;
    this.displayData.Realization = this.parentAnalysisData.Realization;
    this.displayData.ServiceTouchCount = this.parentAnalysisData.ServiceTouchCount;

    this.clientTierScore = this.clientTierHelper.getTier(this.displayData);
  }

  updateBilling() {
    if (isNaN(this.billingVal) || (this.billingVal < 0)) {
      alert(this.config.calcErrorMessage);
    } else {
      this.displayData.Billings = this.billingVal;
      this.billingVal = '';
      this.clientTierScore = this.clientTierHelper.getTier(this.displayData);
    }
  }

  updateRealization() {
    if (isNaN(this.realizationVal) || (this.realizationVal < 0)) {
      alert(this.config.calcErrorMessage);
    } else {
      this.displayData.Realization = this.realizationVal;
      this.realizationVal = '';
      this.clientTierScore = this.clientTierHelper.getTier(this.displayData);
    }
  }

  updateWorkTiming() {
    if (isNaN(this.workTimingVal) || (this.workTimingVal < 0)) {
      alert(this.config.calcErrorMessage);
    } else {
      this.displayData.PeakPercent = this.workTimingVal;
      this.workTimingVal = '';
      this.clientTierScore = this.clientTierHelper.getTier(this.displayData);
    }
  }

  updateService() {
    if (isNaN(this.serviceTouch) || (this.serviceTouch < 0)) {
      alert(this.config.calcErrorMessage);
    } else {
      this.displayData.ServiceTouchCount = this.serviceTouch;
      this.serviceTouch = '';
      this.clientTierScore = this.clientTierHelper.getTier(this.displayData);
    }
  }

  updatePayment() {
    if (isNaN(this.payment) || (this.payment < 0)) {
      alert(this.config.calcErrorMessage);
    } else {
      this.displayData.PaymentTimeliness = this.payment;
      this.payment = '';
      this.clientTierScore = this.clientTierHelper.getTier(this.displayData);
    }
  }

  reset() {
    this.displayData.Billings = this.parentAnalysisData.Billings;
    this.displayData.PaymentTimeliness = this.parentAnalysisData.PaymentTimeliness;
    this.displayData.PeakPercent = this.parentAnalysisData.PeakPercent;
    this.displayData.Realization = this.parentAnalysisData.Realization;
    this.displayData.ServiceTouchCount = this.parentAnalysisData.ServiceTouchCount;

    this.clientTierScore = this.clientTierHelper.getTier(this.displayData);
  }

}
