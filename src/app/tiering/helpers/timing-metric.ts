import { Injectable } from '@angular/core';
import { IScore } from '../models/';

import { TierMetricBase } from './';

export class TimingMetric extends TierMetricBase {

    getTimingScore(displayVal: number, multiplier: number): IScore {
        this.getCurrentBandIndex(displayVal);
        this.score.MaxValue = this.getMaxValue();
        this.score.MinValue = this.getMinValue();
        this.score.Score = this.getScoreValue();
        this.score.Weighted = this.getWeightedValue(multiplier, this.score.Score);
        this.score.ProgressPercent = this.getWorkTimingPercentage(displayVal);

        return this.score;
    }

    protected getWorkTimingPercentage(displayVal: number): number {
        let denominator = this.score.MaxValue - this.score.MinValue;
        let numerator = this.score.MaxValue - displayVal;
        return numerator / denominator;
    }
}
