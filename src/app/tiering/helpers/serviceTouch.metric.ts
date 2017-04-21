import { Injectable } from '@angular/core';
import { Score } from '../models/';

import { TierMetricBase } from './';

@Injectable()
export class ServiceTouchMetric extends TierMetricBase {

    getServiceTouchScore(displayVal: number, multiplier: number): Score {
        this.score = new Score();
        this.getCurrentBandIndex(displayVal);
        this.score.MaxValue = this.getMaxValue();
        this.score.MinValue = this.getMinValue();
        this.score.Score = this.getScoreValue();
        this.score.Weighted = this.getWeightedValue(multiplier, this.score.Score);
        this.score.ProgressPercent = this.getServiceTouchPercentage(displayVal);

        return this.score;
    }

    protected getServiceTouchPercentage(displayVal: number): number {
        return (displayVal / this.score.MaxValue) * 100;
    }
}
