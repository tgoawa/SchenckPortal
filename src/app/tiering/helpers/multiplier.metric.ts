import { Injectable } from '@angular/core';
import { Score } from '../models/';

import { TierMetricBase } from './';

@Injectable()
export class MultiplierMetric extends TierMetricBase {

    getMultiplierScore(billingScore: number, realizationScore: number): Score {
        this.score = new Score();
        this.score.Weighted = this.getWeightedValue(billingScore, realizationScore);
        this.getCurrentBandIndex(this.score.Weighted);
        this.score.MaxValue = this.getMaxValue();
        this.score.MinValue = this.getMinValue();
        this.score.Score = this.getScoreValue();
        this.score.ProgressPercent = this.getPercentage(this.score.Weighted);

        return this.score;
    }

    protected getWeightedValue(billingScore: number, realizationScore: number): number {
        return billingScore * realizationScore;
    }
}
