import { Injectable } from '@angular/core';
import { Score } from '../models/';

import { TierMetricBase } from './';

@Injectable()
export class RealizationMetric extends TierMetricBase{

    getRealizationScore(displayVal: number): Score {
        this.score = new Score();
        this.getCurrentBandIndex(displayVal);
        this.score.MaxValue = this.getMaxValue();
        this.score.MinValue = this.getMinValue();
        this.score.Score = this.getScoreValue();
        this.score.ProgressPercent = this.getPercentage(displayVal);

        return this.score;
    }
}
