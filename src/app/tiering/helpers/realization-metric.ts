import { Injectable } from '@angular/core';
import { IScore } from '../models/';

import { TierMetricBase } from './';

@Injectable()
export class RealizationMetric extends TierMetricBase{

    getRealizationScore(displayVal: number): IScore {
        this.getCurrentBandIndex(displayVal);
        this.score.MaxValue = this.getMaxValue();
        this.score.MinValue = this.getMinValue();
        this.score.Score = this.getScoreValue();
        this.score.ProgressPercent = this.getPercentage();

        return this.score;
    }
}
