import { Injectable } from '@angular/core';
import { IScore } from '../models/';

import { TierMetricBase } from './';

@Injectable()
export class BillingMetric extends TierMetricBase {

    getBillingScore(displayVal: number): IScore {
        this.getCurrentBandIndex(displayVal);
        this.score.MaxValue = this.getMaxValue();
        this.score.MinValue = this.getMinValue();
        this.score.Score = this.getScoreValue();
        this.score.Weighted = this.score.Score;
        this.score.ProgressPercent = this.getPercentage();

        return this.score;
    }
}
