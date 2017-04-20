import { Injectable } from '@angular/core';
import { Score } from '../models/';

import { TierMetricBase } from './';

@Injectable()
export class TimingMetric extends TierMetricBase {

    getTimingScore(displayVal: number, multiplier: number): Score {
        this.score = new Score();
        this.getCurrentBandIndex(displayVal);
        this.score.MaxValue = this.getMaxValue();
        this.score.MinValue = this.getMinValue();
        this.score.Score = this.getScoreValue();
        this.score.Weighted = this.getWeightedValue(multiplier, this.score.Score);
        this.score.ProgressPercent = this.getWorkTimingPercentage(displayVal);

        return this.score;
    }

    private getWorkTimingPercentage(displayVal: number): number {
        let denominator = this.score.MaxValue - this.score.MinValue;
        let numerator = this.score.MaxValue - displayVal;
        return (numerator / denominator) * 100;
    }

    protected islowerThanBand(displayVal: number): boolean {
        return displayVal > this.scoreRange[0].MinValue;
    }

    protected isHigherThanBand(displayVal: number): boolean {
        return displayVal < this.scoreRange[this.scoreRange.length - 1].MaxValue;
    }

    protected isInBand(displayVal: number, index: number): boolean {
        return displayVal >= this.scoreRange[index].MinValue && displayVal <= this.scoreRange[index].MaxValue;
    }
}
