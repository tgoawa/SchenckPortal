import { Injectable } from '@angular/core';
import { IScore } from '../models/';

import { TierMetricBase } from './';

export class PaymentMetric extends TierMetricBase {

    getPaymentScore(displayVal: number, multiplier: number): IScore {
        this.getCurrentBandIndex(displayVal);
        this.score.MaxValue = this.getMaxValue();
        this.score.MinValue = this.getMinValue();
        this.score.Score = this.getScoreValue();
        this.score.Weighted = this.getWeightedValue(multiplier, this.score.Score);
        this.score.ProgressPercent = this.getPaymentPercentage(displayVal);

        return this.score;
    }

    protected getPaymentPercentage(displayVal: number): number {
        let denominator = this.score.MaxValue - this.score.MinValue;
        let numerator = this.score.MaxValue - displayVal;
        return numerator / denominator;
    }
}
