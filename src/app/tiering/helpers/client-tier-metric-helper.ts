import { Injectable } from '@angular/core';

import { Tiering, IClientVal } from '../models/';

import { BillingMetric,
        RealizationMetric,
        MultiplierMetric,
        TimingMetric,
        ServiceTouchMetric,
        PaymentMetric,
        TierScoreMetric } from './';

@Injectable()
export class ClientTierMetricHelper {

    private multiplierValue: number;
    private clientTier;

    constructor(private billings: BillingMetric,
                private realization: RealizationMetric,
                private multiplier: MultiplierMetric,
                private timing: TimingMetric,
                private serviceTouch: ServiceTouchMetric,
                private payment: PaymentMetric,
                private tierScore: TierScoreMetric ) {
                    this.clientTier = new Tiering();
                }

    getTier(displayValues: IClientVal): Tiering {
        this.clientTier.BillingScore = this.billings.getBillingScore(displayValues.Billings);
        this.clientTier.RealizationScore = this.realization.getRealizationScore(displayValues.Realization);
        this.clientTier.MultiplierScore = this.multiplier.getMultiplierScore(this.clientTier.BillingScore.Score, this.clientTier.RealizationScore.Score);
        this.multiplierValue = this.clientTier.MultiplierScore.Score;
        this.clientTier.TimelinessScore = this.timing.getTimingScore(displayValues.PeakPercent, this.multiplierValue);
        this.clientTier.ServiceTouchesScore = this.serviceTouch.getServiceTouchScore(displayValues.ServiceTouchCount, this.multiplierValue);
        this.clientTier.PaymentScore = this.payment.getPaymentScore(displayValues.PaymentTimeliness, this.multiplierValue);

        this.clientTier.Tier = this.tierScore.getTierScore(this.calculateTotalScore(this.clientTier));

        return this.clientTier;
    }

    calculateTotalScore(metric: Tiering): number {
        return this.clientTier.BillingScore.Weighted +
                this.clientTier.MultiplierScore.Weighted +
                this.clientTier.TimelinessScore.Weighted +
                this.clientTier.ServiceTouchesScore.Weighted +
                this.clientTier.PaymentScore.Weighted;
    }
}