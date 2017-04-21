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
  public sideMenuItemId: number = 1; //Tell side menu the active menu item
  public billingValue: any;
  public realizationValue: any;
  public workTimingValue: any;
  public serviceTouch: any;
  public payment: any;
  public parentAnalysisData: IClientVal;
  public displayData: IClientVal;
  public clientTierScore: ITiering;

  private scoreRanges: Scores;
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

      this.setClientData();

  }

  updateBilling() {
    if ((this.billingValue === '') || (this.billingValue < 0)) {
      alert(this.config.calcErrorMessage);
    } else {
      this.displayData.Billings = this.billingValue;
      this.clientTierScore = this.clientTierHelper.getTier(this.displayData);
    }
  }

  updateRealization() {
    if ((this.realizationValue === '') || (this.realizationValue < 0)) {
      alert(this.config.calcErrorMessage);
    } else {
      this.displayData.Realization = this.realizationValue;
      this.clientTierScore = this.clientTierHelper.getTier(this.displayData);
    }
  }

  updateWorkTiming() {
    if ((this.workTimingValue === '') || (this.workTimingValue < 0)) {
      alert(this.config.calcErrorMessage);
    } else {
      this.displayData.PeakPercent = this.workTimingValue;
      this.clientTierScore = this.clientTierHelper.getTier(this.displayData);
    }
  }

  updateService() {
    if ((this.serviceTouch === '') || (this.serviceTouch < 0)) {
      alert(this.config.calcErrorMessage);
    } else {
      this.displayData.ServiceTouchCount = this.serviceTouch;
      this.clientTierScore = this.clientTierHelper.getTier(this.displayData);
    }
  }

  updatePayment() {
    if ((this.payment === '') || (this.payment < 0)) {
      alert(this.config.calcErrorMessage);
    } else {
      this.displayData.PaymentTimeliness = this.payment;
      this.clientTierScore = this.clientTierHelper.getTier(this.displayData);
    }
  }

  setClientData() {
    this.displayData.Billings = this.parentAnalysisData.Billings;
    this.displayData.PaymentTimeliness = this.parentAnalysisData.PaymentTimeliness;
    this.displayData.PeakPercent = this.parentAnalysisData.PeakPercent;
    this.displayData.Realization = this.parentAnalysisData.Realization;
    this.displayData.ServiceTouchCount = this.parentAnalysisData.ServiceTouchCount;

    this.billingValue = '';
    this.realizationValue = '';
    this.workTimingValue = '';
    this.serviceTouch = '';
    this.payment = '';

    this.clientTierScore = this.clientTierHelper.getTier(this.displayData);
  }

  doesClientHaveChildren(): boolean {
    return this.parentAnalysisData.Children.length > 0;
  }

  reset() {
    this.setClientData();
  }

}
