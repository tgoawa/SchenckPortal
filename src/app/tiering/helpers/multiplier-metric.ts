import { Injectable } from '@angular/core';
import { IScore } from '../models/';

import { TierMetricBase } from './';

@Injectable()
export class MultiplierMetric extends TierMetricBase {

    getMultiplierScore(billingScore: number, realizationScore: number): IScore {
        this.score.Weighted = billingScore * realizationScore;
        this.getCurrentBandIndex(this.score.Weighted);
        this.score.MaxValue = this.getMaxValue();
        this.score.MinValue = this.getMinValue();
        this.score.Score = this.getScoreValue();
        this.score.ProgressPercent = this.getPercentage();

        return this.score;
    }
}
